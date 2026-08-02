import { NextRequest, NextResponse } from "next/server";
import Retell from "retell-sdk";
import { getDemoProfile } from "@/lib/outreach/demo-profiles";
import { resolveDemo } from "@/lib/outreach/service";
import { checkDemoRateLimit } from "@/lib/outreach/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Starts a Retell web call for a demo token.
 *
 * Agent selection is entirely database-driven: a lead either has its own
 * dedicated agent (built by scripts/demo.mjs) or falls back to the shared
 * demo agent, which is personalised at call time via dynamic variables.
 */
export async function POST(request: NextRequest, context: RouteContext<"/api/demo/[token]/call">) {
  try {
    const { token } = await context.params;

    const demo = await resolveDemo(token);
    if (!demo) return NextResponse.json({ error: "This demo link has expired." }, { status: 404 });

    // Cost control: these links are public and long-lived.
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    const limit = await checkDemoRateLimit(token, ip);
    if (!limit.allowed) {
      return NextResponse.json({ error: limit.message }, { status: 429 });
    }

    const apiKey = process.env.RETELL_API_KEY;
    const agentId = (demo.retell_agent_id as string | null) ?? process.env.RETELL_DEMO_AGENT_ID;
    if (!apiKey || !agentId) {
      return NextResponse.json({ error: "Voice demo is not configured." }, { status: 503 });
    }

    const profile = getDemoProfile(demo);
    const text = (v: unknown, fallback = "") =>
      typeof v === "string" && v.trim() ? v.trim() : fallback;

    const client = new Retell({ apiKey });
    const response = await client.call.createWebCall({
      agent_id: agentId,
      retell_llm_dynamic_variables: {
        business_name: text(demo.business, "this business"),
        owner_name: text(demo.owner, "there"),
        city: text(demo.city),
        state: text(demo.state),
        service_focus: text(demo.focus, "their services"),
        advertises_24_7: demo.advertises_24x7 ? "yes" : "no",
        business_location: profile.city,
        business_services: profile.services,
        demo_qualification_focus: profile.qualificationFocus,
        demo_test_scenarios: profile.testScenarios,
      },
    });
    return NextResponse.json({ accessToken: response.access_token });
  } catch (error) {
    console.error("[outreach:retell]", error);
    return NextResponse.json({ error: "Couldn't start the voice demo." }, { status: 502 });
  }
}
