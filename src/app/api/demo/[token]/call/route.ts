import { NextRequest, NextResponse } from "next/server";
import Retell from "retell-sdk";
import { getDemoProfile } from "@/lib/outreach/demo-profiles";
import { resolveDemo } from "@/lib/outreach/service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(_request: NextRequest, context: RouteContext<"/api/demo/[token]/call">) {
  try {
    const { token } = await context.params;
    const demo = await resolveDemo(token);
    if (!demo) return NextResponse.json({ error: "This demo link has expired." }, { status: 404 });
    const apiKey = process.env.RETELL_API_KEY;
    const agentId = process.env.RETELL_DEMO_AGENT_ID;
    if (!apiKey || !agentId) return NextResponse.json({ error: "Voice demo is not configured." }, { status: 503 });
    const profile = getDemoProfile(String(demo.business));
    const client = new Retell({ apiKey });
    const response = await client.call.createWebCall({
      agent_id: agentId,
      retell_llm_dynamic_variables: {
        business_name: String(demo.business),
        owner_name: String(demo.owner ?? "there"),
        city: String(demo.city ?? ""),
        state: String(demo.state ?? ""),
        service_focus: String(demo.focus ?? "electrical services"),
        advertises_24_7: demo.advertises_24x7 ? "yes" : "no",
        business_location: profile.city || [demo.city, demo.state].filter(Boolean).join(", "),
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
