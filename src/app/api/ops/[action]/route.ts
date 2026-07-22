import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { assertOperationsAuthorization } from "@/lib/outreach/auth";
import { createPreviewForBusiness, prepareDailyBatch, previewBatch, sendBatch, sendSingle } from "@/lib/outreach/service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const businessSchema = z.object({ business: z.string().trim().min(2).max(160) });
const batchSchema = z.object({ batchId: z.string().uuid() });

export async function POST(request: NextRequest, context: RouteContext<"/api/ops/[action]">) {
  try {
    assertOperationsAuthorization(request);
    const { action } = await context.params;
    const body: unknown = await request.json().catch(() => ({}));
    if (action === "prepare-daily-batch") return NextResponse.json(await prepareDailyBatch());
    if (action === "preview-batch") return NextResponse.json(await previewBatch(batchSchema.parse(body).batchId));
    if (action === "send-batch") return NextResponse.json(await sendBatch(batchSchema.parse(body).batchId));
    if (action === "create-demo") return NextResponse.json(await createPreviewForBusiness(businessSchema.parse(body).business));
    if (action === "send-demo") {
      const preview = await createPreviewForBusiness(businessSchema.parse(body).business);
      await sendSingle(preview);
      return NextResponse.json({ ok: true, preview });
    }
    return NextResponse.json({ error: "Unknown operation." }, { status: 404 });
  } catch (error) {
    return operationError(error);
  }
}

function operationError(error: unknown) {
  const message = error instanceof Error ? error.message : "Operation failed.";
  if (message === "UNAUTHORIZED") return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  if (message === "LEAD_NOT_FOUND") return NextResponse.json({ error: "No matching lead was found." }, { status: 404 });
  if (message === "AMBIGUOUS_LEAD") return NextResponse.json({ error: "More than one lead matches; use the exact business name." }, { status: 409 });
  if (message === "NO_ELIGIBLE_LEADS") return NextResponse.json({ error: "No eligible leads remain." }, { status: 409 });
  console.error("[outreach:ops]", error);
  return NextResponse.json({ error: "Operation failed." }, { status: 500 });
}
