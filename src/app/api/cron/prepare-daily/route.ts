import { NextRequest, NextResponse } from "next/server";
import { assertCronAuthorization } from "@/lib/outreach/auth";
import { prepareDailyBatch } from "@/lib/outreach/service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    assertCronAuthorization(request);
    return NextResponse.json(await prepareDailyBatch());
  } catch (error) {
    const message = error instanceof Error ? error.message : "Cron failed.";
    if (message === "UNAUTHORIZED") return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    if (message === "NO_ELIGIBLE_LEADS") return NextResponse.json({ ok: true, prepared: false });
    console.error("[outreach:cron]", error);
    return NextResponse.json({ error: "Cron failed." }, { status: 500 });
  }
}
