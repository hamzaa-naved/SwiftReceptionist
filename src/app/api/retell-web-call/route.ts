import { NextRequest, NextResponse } from "next/server";
import { demoLeads } from "@/content/demo-leads";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, { count: number; windowStart: number }>();

function safeValue(value: unknown, max = 80): string {
  return typeof value === "string"
    ? value.replace(/[<>{}[\]\\]/g, "").trim().slice(0, max)
    : "";
}

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now - entry.windowStart > WINDOW_MS) {
    hits.set(ip, { count: 1, windowStart: now });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "Too many demo attempts. Please try again shortly." }, { status: 429 });
  }

  const apiKey = process.env.RETELL_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "The voice demo is being configured." }, { status: 503 });
  }

  const body = (await request.json().catch(() => ({}))) as {
    variables?: Record<string, unknown>;
  };
  const variables = body.variables ?? {};
  const businessName = safeValue(variables.businessName) || "the business";
  const city = safeValue(variables.city, 40);
  const niche = safeValue(variables.niche, 40) || "electrical";
  const lead = demoLeads.find(
    (item) => item.business.toLowerCase() === businessName.toLowerCase(),
  );
  const agentId =
    lead?.agentId ?? process.env.RETELL_VOICE_AGENT_ID ?? "agent_296cc3bdf0d5948c755d932b43";
  const dynamicVariables = {
    company_name: lead?.business ?? businessName,
    city: lead?.city || city,
    niche,
  };

  const retell = await fetch("https://api.retellai.com/v2/create-web-call", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      agent_id: agentId,
      retell_llm_dynamic_variables: dynamicVariables,
      metadata: { source: "swiftreceptionist.com-demo" },
    }),
  });

  const payload = await retell.json().catch(() => ({}));
  if (!retell.ok || typeof payload.access_token !== "string") {
    console.error("[retell] create web call failed", retell.status);
    return NextResponse.json({ error: "Couldn't start the receptionist. Please try again." }, { status: 502 });
  }

  return NextResponse.json({ access_token: payload.access_token });
}
