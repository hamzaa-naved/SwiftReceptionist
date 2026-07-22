# Swift Receptionist — Marketing Site

The conversion-focused marketing site for [swiftreceptionist.com](https://swiftreceptionist.com):
24/7 AI receptionists for local service businesses. Built to turn skeptical
cold-outreach traffic into booked demo calls.

Primary niche: **electrical contractors**; secondary: **garage door repair**.

## Personalized demo outreach

The outreach system uses one Retell demo agent and injects each lead's business details into a short-lived web call. It is inactive until the environment variables in `.env.example` are configured.

1. Install Neon Postgres from the Vercel Marketplace, then set `DATABASE_URL`.
2. Reconnect Hostinger Mail to `hamza@swiftreceptionist.org`, create an API token, and set the three `HOSTINGER_MAIL_*` values.
3. Add the existing Retell agent ID and API key, then run `pnpm outreach:migrate` followed by `pnpm outreach:import <remaining-leads.xlsx>`.
4. Use authenticated `POST /api/ops/prepare-daily-batch` to prepare 25 emails, `preview-batch` to inspect them, and `send-batch` only after approval. Individual calls use `create-demo` and `send-demo`.

**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · shadcn/ui ·
Motion (Framer Motion) · MDX · deployed on Vercel.

---

## Quick start

```bash
npm install
cp .env.example .env.local   # optional — the site runs with zero keys
npm run dev                  # http://localhost:3000
```

`npm run build` produces the production build; `npm run lint` runs ESLint.

## What's here

| Route | Purpose |
| --- | --- |
| `/` | Full conversion narrative: hero, problem, ROI calculator, demo block, comparison table, niche grid, FAQ, risk reversal |
| `/industries` + `/industries/[slug]` | **Data-driven niche landing pages** — the cold-outreach landing targets |
| `/demo` | Personalized interactive demo (`?biz=&city=&niche=`), voice via Vapi + text-chat fallback |
| `/pricing` | Hidden-price strategy: value framing, receptionist-salary anchor, pricing FAQ |
| `/how-it-works` | 3-step setup + detail cards |
| `/results` | Case study slots — renders honest empty state until real proof exists |
| `/about`, `/blog`, `/contact` | Trust, SEO content (MDX), booking embed + lead form |
| `/privacy`, `/terms` | Legal drafts (see launch checklist) |
| `/api/lead` | Lead capture: zod validation, honeypot, rate limit, CRM webhook + email fan-out |

Everything prerenders statically except `/api/lead`.

## Adding a niche (~5 minutes)

1. Copy `src/content/niches/electrical.ts` to `src/content/niches/<slug>.ts`
2. Edit every field (headline, pains, call script, FAQ, ROI defaults, …) —
   the `Niche` type in `types.ts` documents each one
3. Register it in `src/content/niches/index.ts`

That's it. The landing page, industries index, homepage niche grid,
sitemap, JSON-LD, and demo personalization all pick it up automatically.
Cold outreach can then link to `/industries/<slug>` or
`/demo?biz=Acme%20Electric&city=Tulsa&niche=<slug>`.

## Adding a blog post

Drop an `.mdx` file into `src/content/blog` with frontmatter:

```yaml
---
title: "Post title"
description: "Meta description"
date: "2026-07-01"
niche: "garage-door"   # optional — cross-links the industry page
---
```

## Integrations (all swappable, all optional)

Each external service sits behind a small adapter in
`src/lib/integrations/`. The UI never imports a vendor SDK directly.

| Integration | Adapter | Env vars | Unconfigured behavior |
| --- | --- | --- | --- |
| Voice demo | `voice/` (Vapi live, Retell stub) | `NEXT_PUBLIC_VAPI_PUBLIC_KEY`, `NEXT_PUBLIC_VAPI_ASSISTANT_ID` | Demo falls back to text chat |
| Booking | `booking.ts` (Cal.com / Calendly iframe) | `NEXT_PUBLIC_BOOKING_URL` | Contact page leads with the form |
| Analytics | `analytics.ts` (Plausible / GA4) | `NEXT_PUBLIC_ANALYTICS_PROVIDER` + provider vars | Events log in dev, no-op in prod |
| CRM / email | inside `api/lead/route.ts` | `CRM_WEBHOOK_URL`, `RESEND_API_KEY`, `LEAD_NOTIFY_EMAIL` | Leads logged to server console |

Full variable reference with comments: [.env.example](./.env.example).

### Analytics events already wired

`cta_book_call`, `cta_try_demo` (with `location` prop on every placement),
`calculator_used`, `calculator_shared`, `demo_voice_started/ended`,
`demo_chat_started`, `demo_mode_toggled`, `lead_form_submitted`,
`faq_opened`, `exit_cta_shown/clicked` — enough to see the whole funnel
and A/B test against it.

## Deploying to Vercel

1. Push this repo to GitHub and import it in Vercel — zero config needed;
   the build works with no env vars set
2. Add env vars from `.env.example` as you procure accounts (each one
   lights up its feature independently)
3. Point `swiftreceptionist.com` at the project
4. For the `demo.` subdomain: add `demo.swiftreceptionist.com` as a domain
   and rewrite it to `/demo` (or just keep linking to `/demo` — the page
   doesn't care which host serves it)

## Launch checklist (things that need YOU)

- [ ] **Vapi**: create the demo assistant, set matching session/duration
      limits in the dashboard, add the two `NEXT_PUBLIC_VAPI_*` vars
- [ ] **Cal.com**: create a 15-min event type, set `NEXT_PUBLIC_BOOKING_URL`
- [ ] **Analytics**: pick Plausible (default recommendation) or GA4
- [ ] **Leads**: set `CRM_WEBHOOK_URL` and/or Resend vars — until then
      leads only appear in server logs
- [ ] **Legal identity**: replace the `[BRACKETED]` fields in
      `src/lib/site.ts` (entity name, address, phone) — required for
      CAN-SPAM compliance and basic trust
- [ ] **Legal review**: `/privacy` and `/terms` are working drafts marked
      `[REVIEW REQUIRED]` — have a lawyer look before launch
- [ ] **About page**: add the founder's real name/photo when ready — it
      measurably helps trust with owner-operators
- [ ] **Results**: add case studies to `src/app/results/page.tsx` only
      with written client permission (the empty state is honest until then)
- [ ] **Proof strip**: swap the homepage niche strip for real client
      logos/stats when you have permission to show them

## Design system — "The Dispatch Board"

High-vis industrial, grounded in the trades this sells to (electrical
contractors, garage door techs). Tokens live in `src/app/globals.css`:

- **Color:** `--graphite-*` (breaker-panel charcoal grounds), `--concrete-*`
  (shop-floor off-white), `--volt-400` `#FFC400` (rationed safety-yellow
  accent — CTAs always pair it with graphite text for WCAG AA), `--live-500`
  `#2FBF71` (LED green, status only). The legacy `--ink-*/--flame-*/--paper*`
  names remain as documented aliases of these tokens.
- **Type:** Barlow Condensed (display, uppercase), Barlow (body), IBM Plex
  Mono (timestamps, prices, labels — the dispatch-log texture). All via
  `next/font`.
- **Layout:** flat panels (2–4px radii, chunky borders, near-flat shadows)
  and gapless spec-sheet grids instead of floating rounded cards.
- **Signature element:** the **Call Board** — the hero renders incoming
  calls as dispatch-log rows whose LED flips RINGING → ANSWERED with the
  booked outcome. The LED + mono-label device recurs as every section
  kicker, and call transcripts are styled as call logs.

Motion respects `prefers-reduced-motion` throughout.
