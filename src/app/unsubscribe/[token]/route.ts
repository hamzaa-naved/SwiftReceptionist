import { NextRequest, NextResponse } from "next/server";
import { suppressDemo } from "@/lib/outreach/service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest, context: RouteContext<"/unsubscribe/[token]">) {
  const { token } = await context.params;
  await suppressDemo(token);
  return new NextResponse("You have been unsubscribed from Swift Receptionist outreach emails.", {
    status: 200,
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
  });
}
