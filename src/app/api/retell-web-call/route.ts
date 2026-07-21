import { NextRequest, NextResponse } from "next/server";

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
  const normalizedBusinessName = businessName.toLowerCase();
  const isBobScott = normalizedBusinessName === "bob scott light, power, sign";
  const isDelSol = normalizedBusinessName === "del sol electric, llc";
  const agentId = isDelSol
    ? process.env.RETELL_DEL_SOL_AGENT_ID ?? "agent_269605b91fcc387240ac673b3c"
    : process.env.RETELL_VOICE_AGENT_ID ?? "agent_296cc3bdf0d5948c755d932b43";
  const dynamicVariables = isBobScott
    ? {
        company_name: "Bob Scott Light, Power & Sign",
        owner_name: "Bob",
        city: "Hollywood",
        service_area: "South Florida",
        published_hours: "Hours not published",
        services: "commercial building lighting, tennis court lights, commercial sign lighting, parking-lot lighting",
        differentiator: "commercial lighting specialists serving South Florida since 1973",
        caller_scenario: "a property manager reporting a parking-lot light outage",
        booking_mode: "simulated",
        niche,
      }
    : isDelSol
      ? {
          company_name: "Del Sol Electric, LLC",
          owner_name: "Wigberto",
          agent_name: "Avery",
          city: "Gainesville",
          service_area: "Gainesville, Florida",
          published_hours: "24/7 emergency service",
          services: "electrical troubleshooting and repair, electrical installation, emergency electrical response",
          differentiator: "active Florida Certified Electrical Contractor based in Gainesville",
          caller_scenario: "a homeowner reporting sparks and a burning smell near a breaker panel after hours",
          booking_mode: "simulated",
          niche,
        }
    : {
        company_name: businessName,
        city,
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
