---
name: hope-blueprint
description: The verified build recipe for Swift Receptionist's best AI phone receptionist — "Hope" (Battle Electric, ElevenLabs). Use this whenever building, cloning, tuning or quoting an AI receptionist demo for an electrical contractor, when the user says "build a demo for [electrician]", "make another Hope", "build an agent for this lead", names an electrical business to pitch, asks to make an agent sound more human or fix hiccups/latency, or asks what settings Hope uses. Also use when wiring an ElevenLabs agent into a swiftreceptionist.com demo link. Covers the exact prompt architecture, per-node voice modulation, turn-taking config, latency tuning and the receptionist research the personality is built from.
---

# The Hope Blueprint

Hope is the reference build — the best AI receptionist Swift Receptionist has produced. This skill exists so every future agent starts from her, not from scratch.

**Reference implementation:** `agent_5501kz8ht502eq2sj3xn6v17zvby` (Battle Electric, LLC). Verified live 5 Aug 2026. Scope: electrical contractors on ElevenLabs.

Read `docs/hope-blueprint/references/hope-config.json` for the complete verified config, including the full system prompt and all twelve workflow nodes. Read `docs/hope-blueprint/references/receptionist-research.md` for why the personality is shaped the way it is. Read `docs/hope-blueprint/references/demo-link-wiring.md` when connecting an agent to a swiftreceptionist.com link.

## The one idea that makes Hope work

Most voice agents are a list of rules. Hope is a person with traits, and the good behaviour falls out of the traits.

This isn't a stylistic preference — it's the difference between an agent that follows a rule until it hits an edge case it wasn't given, and one that reasons from character. "Capture the caller's name early" is a rule an agent forgets under pressure. "You just find it odd talking to a stranger for four minutes" is a disposition that survives a caller who's shouting.

So the prompt opens with **`# Who you are`** and the line *"Four things are just true about you. Not rules you follow — how you are."* Everything the receptionist research says top performers do gets translated into a trait before it goes in.

If you find yourself writing ALWAYS or NEVER inside the character section, you've slipped back into rules. Guardrails belong in the guardrails section; character belongs in character.

## When a business name arrives

A name is the whole trigger. Everything below runs before a single config field is touched, because an agent built on thin research sounds generic no matter how well it's tuned — and the owner hears that in about ten seconds.

**Step 1 — the lead record first.** Before searching the web, check what's already known. The lead lists (`ELECTRICAL_MASTER_TRUE.xlsx` and the `outreach_leads` table) carry business, owner, city, state, phone, website, rating, niche and the 24/7 flag. If the user attaches a file, read that too. This is the cheapest source and it's already been cleaned.

Match on business name, disambiguating by city when several are close. Note anything missing — those gaps are the web search's job.

**Step 2 — then the web, properly.** Fetch their actual site, not just search snippets. What you're looking for, in rough priority:

- **Specialisms** — the two or three things they clearly lead with. This matters more than anything else, because hearing their own niche described back is what makes the demo land.
- **Owner names** and who runs what. Use them in the pricing line so it sounds like a real colleague.
- **Licence number**, phone, exact address
- **Service area by county**, not just city
- **Hours**, and whether emergency really is 24/7
- **Review count and rating** — check Google, Yelp and BBB, since sites overstate
- **Anything that changes local urgency** — insurer deadlines, storm season, permit rules. One such fact earns an intake question no competitor's demo will ask.

**Step 3 — reconcile, and trust the site over the sheet.** Lead data goes stale. This has bitten before: a lead was flagged as not advertising 24/7 when the site said otherwise, and another had "Texas" sitting in the city column. Where they disagree, the site wins — and correct the lead record so the error doesn't propagate.

Be careful with aggregator sites. Several trade brands run near-identical sites across many regions; confirm you have the right location by cross-checking address and phone against a review profile.

**Step 4 — only now, build.** Follow the build sequence below with the researched facts. Never fill a gap with a plausible guess: an invented licence number or owner name is worse than omitting it, because the owner will notice immediately and the whole demo loses credibility.

**Step 5 — attach the demo link.** Mint a swiftreceptionist.com demo link and point it at the agent. For ElevenLabs agents this needs `voice_provider = 'elevenlabs'` and `elevenlabs_agent_id` set on the lead row — see `references/demo-link-wiring.md`. Send the branded link, not the ElevenLabs one.

## Build sequence

Order matters. Skipping research and going straight to config produces a generic agent wearing the client's name.

**1. Research is already done** if you followed the protocol above. If not, go back and do it — this is the step that separates a demo that lands from one that sounds generic.

**2. Write the prompt in the section order below.** Character first, mechanics second, facts third, safety fourth, guardrails last.

**3. Build the workflow.** Twelve nodes; full topology in `docs/hope-blueprint/references/hope-config.json`. The shape is deliberate: safety and hazard are separate destinations reachable from *every* service node, because a routine call can turn dangerous mid-sentence.

**4. Apply the tuning tables** — global first, then per-node overrides.

**5. Verify.** Four checks, listed at the end.

Everything needed to rebuild Hope byte-for-byte lives in the reference files — full prompt, all node prompts, verbatim edge conditions, node positions, evaluation criteria with their goal prompts, and the data-collection schema. `scripts/verify_blueprint.mjs` proves this holds.

## Prompt architecture

| Section | Purpose |
|---|---|
| `# Who you are` | The four traits. Character, not rules. |
| `# How you talk` | Speech mechanics — fillers, self-correction, turn length |
| `# You know the time` | Real-time awareness, after-hours handling |
| `# [Business name]` | Verified facts only |
| `# Safety overrides everything` | Hazard protocol; overrides all other behaviour |
| `# What you dig for` | Service-specific intake questions |
| `# When you mishear` | Three-strike escalation |
| `# Guardrails` | Never-invent list, AI disclosure, demo disclosure |
| `# Tools` | When to use each |

### The four traits

These came out of the receptionist research (`docs/hope-blueprint/references/receptionist-research.md`). Reuse the *shape* for any agent; rewrite the specifics for the business.

**1. She wants to know who she's talking to.** Name capture framed as instinct rather than procedure. Immediate name capture is the single highest-converting move a CSR makes, but as a rule it gets dropped under pressure. As a personality trait it survives.

**2. Nothing surprises her, and that turns out to be the kindest thing about her.** *"Oh yeah, we get these all the time."* To a frightened caller this is worth more than anything else in the call — it says you're not in weird, expensive, unheard-of trouble. Put it in the hazard and urgent nodes explicitly, gated on being true.

**3. Confident about what she knows, completely relaxed about what she doesn't.** This replaces hedging. Pricing is the test case: *"Richard gives you the number himself once he's had eyes on it — and the quote doesn't cost you anything."* Once, warmly, no cringing. The framing that makes it land: *"Confidence isn't pretending to know things. It's being unbothered about the edges of what you know."*

**4. She's glad they called.** Comes out at the end, with their name.

### Speech mechanics that matter most

**Think out loud.** Dead air is the most robotic thing an agent does. Fillers while reasoning — *"Mm, gimme a sec—"*, *"ooh, okay—"*.

**React before answering.** *"Oh no—"*, *"oof"*, then the answer. Humans emote first.

**Self-correct sometimes.** *"Is that the— sorry, is it the main breaker or a—?"* Immaculate speech reads as synthetic.

**One question at a time, never stacked.** Never make a caller repeat themselves. Never reuse an acknowledgement in the same call.

## Verified tuning

Every value below is live on Hope as of 5 Aug 2026.

### Global

| Setting | Value | Why |
|---|---|---|
| `tts.model_id` | `eleven_v3_conversational` | The expressiveness *is* the human-likeness. Don't trade it for Flash. |
| `tts.stability` | `0.42` | Below 0.40 v3 artifacts, and artifacts read as glitches. 0.42 keeps range without wobble. |
| `tts.speed` | `1.02` | Barely quick. Reads as engaged. |
| `tts.similarity_boost` | `0.78` | |
| `tts.expressive_mode` | `true` | Required for audio tags |
| `tts.optimize_streaming_latency` | `3` | Balance point |
| `tts.text_normalisation_type` | `elevenlabs` | Reliable number and address handling |
| `turn.turn_model` | `turn_v3` | Newest turn-taking model |
| `turn.turn_eagerness` | `eager` (global) | Overridden per node — see below |
| `turn.speculative_turn` | `true` | Cuts perceived latency |
| `turn.turn_timeout` | `8` | |
| `turn.interruption_ignore_terms` | 27 backchannels | Stops "yeah"/"mhm" halting her mid-sentence |
| `turn.transcribe_on_disabled_interruptions` | `true` | Still captures what they said |
| `turn.soft_timeout_config` | 2.5s, 7 fillers, randomised | The thinking-out-loud layer |
| `agent.disable_first_message_interruptions` | `true` | Greeting completes |
| `prompt.ignore_default_personality` | `true` | **Critical.** Strips ElevenLabs' baseline persona so only your character remains. |
| `prompt.timezone` | Business's real zone | Enables genuine after-hours awareness |
| `prompt.llm` | `gpt-5.6-terra` | Mid-tier — see model note |
| `prompt.temperature` | `0.55` | |
| `prompt.cascade_timeout_seconds` | `5` | Falls back fast instead of leaving a gap |
| `vad.background_voice_detection` | `true` | Ignores TV and other voices |
| `conversation.background_sound` | `typing` @ `0.22` | Subtle office presence |
| `asr.keywords` | 29 trade and local terms | Biases recognition toward vocabulary that actually appears |
| `privacy.record_voice` | `true` | **Without this there is no review loop.** |

### Per-node modulation

This is the layer almost nobody builds, and it is most of what makes her feel real. A person doesn't sound the same reading a safety instruction as chatting about a Tesla charger.

| Node | Stability | Speed | Eagerness |
|---|---|---|---|
| triage | *(global)* | *(global)* | eager |
| safety | 0.78 | 0.90 | patient |
| hazard | 0.62 | 0.95 | patient |
| urgent | 0.48 | 1.00 | patient |
| residential | 0.34 | 1.03 | patient |
| commercial | 0.46 | 1.00 | patient |
| existing_job | 0.46 | 0.98 | patient |
| pricing | 0.40 | 1.02 | normal |
| message | 0.44 | 0.98 | patient |
| recap | 0.50 | 0.98 | patient |

Two rules generate this table. **Stability rises and speed falls as stakes rise** — safety is the most controlled, residential the most expressive. **Eagerness goes patient wherever she's capturing data**, so she never cuts someone off mid-phone-number; eager only where snappiness helps, which is the greeting.

`commercial` and `existing_job` also run `gemini-3.5-flash` per-node — they're structured intake rather than personality moments, and the cheaper model handles them fine.

### Model selection

Verified pricing via the ElevenLabs LLM usage calculator:

| Model | $/min | Verdict |
|---|---|---|
| `gpt-5.6-sol` | $0.112 | Latency for reasoning a receptionist doesn't use |
| **`gpt-5.6-terra`** | **$0.045** | **Correct choice** |
| `gpt-5.6-luna` | $0.0045 | Too small — drops instructions under a 12-node workflow |

Small models are tempting at a tenth the price, but this agent holds a workflow, six audio-tag rules, a never-invent list and time awareness simultaneously. A dropped instruction here means an invented price.

## Latency

The dominant cost is **prompt length, not model choice**. Past roughly 2,000 tokens, time-to-first-token becomes audible, and every turn pays it.

Hope's prompt is **6,878 characters (~1,720 tokens)** — comfortably under the threshold. That is the budget to build to. If a new agent's prompt exceeds ~8,000 characters, trim redundancy between sections rather than character; the business-facts block is usually the least-spoken content and the first thing to cut.

Two constraints worth knowing:

`max_soft_timeouts_per_generation` **cannot be set below the number of filler messages** — the API clamps it. With 7 fillers it forces 7. This doesn't matter in practice because `cascade_timeout_seconds: 5` fires before a third filler could land, capping the real ceiling at two.

**"Gimme a sec" is a time promise**, which ElevenLabs guidance warns against since real latency is unpredictable. Hope uses them deliberately — they suit a bubbly persona and the cascade keeps them honest. A considered deviation, not an oversight.

## Verification

Run all four before sending a link to a prospect.

**Brand leak.** Re-read the *saved* agent and search every string — global prompt, all node prompts, first message — for any other company's name, phone or URL. Cloning has leaked a competitor's brand into a live demo more than once, including a verbatim scripted line naming the wrong company. Check the saved object, not what you sent.

**Tuning persisted.** Workflow node overrides have silently failed to save on this API — per-node TTS and eagerness were both reported as applied when only two nodes had actually taken them. Re-read the agent and confirm the per-node table above really landed. Never trust the write echo alone on workflow updates.

**Prompt length.** Measure it — `len(prompt)` in characters, not an eyeball estimate. Target 6,000–8,000. Estimating this by eye has produced errors of 20% or more in both directions.

**Listen to it.** No configuration check substitutes for hearing the agent. This is the step most likely to be skipped and the only one that catches tone problems.

## Honest limits

Worth saying to a prospect rather than hiding.

Hope **cannot complete steps 4–5 of the standard 6-step contractor booking script** — offering two specific time slots and quoting the trip fee. She has no calendar and no pricing authority. That's correct for a demo, but it means the demo does lead capture, not booking. The paid product needs calendar integration and trip-fee permission to reach the 70–80% booking rate trained human CSRs hit on residential electrical.

Still unbuilt on Hope: custom guardrails (a content guardrail on DIY electrical instructions would *enforce* what the prompt merely asks), post-call webhook, and simulation tests.

## Cloning for a new electrician

`docs/hope-blueprint/scripts/build_agent.mjs` automates most of this — it duplicates Hope, swaps facts, applies the tuning tables and runs the brand-leak audit. Run it with the researched facts rather than reconstructing config by hand.

Doing it manually:

1. Duplicate Hope.
2. Replace every Battle Electric fact — name, owners, licence, phone, counties, specialisms, hours, timezone.
3. Rewrite trait 3's pricing line to name the actual owner.
4. Swap ASR keywords: keep generic electrical terms, replace business name, owner names, county names and licence number.
5. Update `{{business_name}}` and `{{business_location}}` placeholders.
6. Adjust the safety section only if the trade differs — for electrical it transfers as-is.
7. Run all four verification steps.

The traits, workflow topology, tuning tables and speech mechanics carry over unchanged. Only facts and vocabulary change.
