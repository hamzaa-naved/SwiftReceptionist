# Wiring an ElevenLabs agent into a swiftreceptionist.com demo link

**Status: not built.** The demo pipeline currently serves Retell agents only. This documents the work required.

## How it works today

A demo link is `/demo/[token]`. The token resolves to a lead row in Neon Postgres, and `src/app/api/demo/[token]/call/route.ts` mints a Retell web call:

```ts
const demo = await resolveDemo(token);
const agentId = (demo.retell_agent_id as string | null) ?? process.env.RETELL_DEMO_AGENT_ID;
const response = await client.call.createWebCall({ agent_id: agentId, retell_llm_dynamic_variables: {...} });
return NextResponse.json({ accessToken: response.access_token });
```

Agent selection is entirely database-driven — no code change or deploy is needed to point a lead at a different agent.

The browser side goes through a provider abstraction at `src/lib/integrations/voice/`:

- `types.ts` — the `VoiceAdapter` interface (`providerName`, `isConfigured()`, `start()`, `stop()`)
- `index.ts` — selects an adapter from `NEXT_PUBLIC_VOICE_PROVIDER`
- `retell.ts`, `vapi.ts` — implementations

The abstraction was built for exactly this. Adding a provider is one adapter file plus a switch case.

## What's needed

**1. Schema.** Add to `outreach_leads`:

```sql
ALTER TABLE outreach_leads ADD COLUMN elevenlabs_agent_id text;
ALTER TABLE outreach_leads ADD COLUMN voice_provider text NOT NULL DEFAULT 'retell';
```

Include both columns in the `resolveDemo` SELECT in `src/lib/outreach/service.ts`.

**2. Fork the call route.** Branch on `demo.voice_provider`. ElevenLabs does not use Retell's access-token model — the server requests a signed URL:

```
GET https://api.elevenlabs.io/v1/convai/conversation/get-signed-url?agent_id={id}
header: xi-api-key: {ELEVENLABS_API_KEY}
```

Return `{ signedUrl, dynamicVariables }` instead of `{ accessToken }`. Keep `checkDemoRateLimit` on both paths — these links are public and long-lived, and the rate limiter is the only thing capping spend.

**3. Write `elevenlabs.ts`.** Implement `VoiceAdapter` using `@elevenlabs/client`:

```ts
const conversation = await Conversation.startSession({
  signedUrl,
  dynamicVariables,
  onStatusChange: ({ status }) => { /* map to VoiceSessionState */ },
  onModeChange: ({ mode }) => events.onStateChange(mode === 'speaking' ? 'speaking' : 'listening'),
});
```

Map ElevenLabs statuses onto the existing `VoiceSessionState` union so the demo UI needs no changes. Enforce `maxDurationSeconds` in the adapter, as `retell.ts` does with its stop timer.

**4. Register it** in `index.ts`, and select the adapter per demo rather than per deployment — the current `NEXT_PUBLIC_VOICE_PROVIDER` env var is global, which won't work once both providers are live. The provider should come from the API response alongside the credential.

## Dynamic variables

Hope's placeholders are `{{business_name}}` and `{{business_location}}`. The Retell route already assembles equivalent values from the lead row and `getDemoProfile()` — reuse that assembly rather than writing a second one.

## Estimated scope

Roughly an hour: two columns, one route fork, one adapter file, one switch case. The abstraction already exists; this is filling it in.

Verify against a preview deployment before promoting — the existing check runs every live demo link and confirms both page and voice return 200.
