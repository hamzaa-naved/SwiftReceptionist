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
    const business = String(demo.business);
    const normalizedBusiness = business.trim().toLowerCase();
    const personalizedAgentIds: Record<string, string | undefined> = {
      "neighbors electric": process.env.RETELL_NEIGHBORS_ELECTRIC_AGENT_ID,
      "kingdom electric inc": "agent_61ff9d9676636de50f1db22fea",
      "dial one electrical services": "agent_0b30525c2f2e67a827f2cbeb19",
      "morrison electric": "agent_63353a6b955b19e94dc60067be",
      "north springs electric": "agent_445198df316b40e5ba4d814fe5",
      "dean's electrical service": "agent_48161f3dc2c2d223afe45fe602",
      "buac electric": process.env.RETELL_BUAC_ELECTRIC_AGENT_ID,
    };
    const agentId = personalizedAgentIds[normalizedBusiness] ?? process.env.RETELL_DEMO_AGENT_ID;
    if (!apiKey || !agentId) return NextResponse.json({ error: "Voice demo is not configured." }, { status: 503 });
    const profile = getDemoProfile(business);
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
