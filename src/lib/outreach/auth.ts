import "server-only";
import { timingSafeEqual } from "crypto";
import { NextRequest } from "next/server";

export function assertOperationsAuthorization(request: NextRequest) {
  const expected = process.env.OUTREACH_OPERATIONS_KEY;
  const supplied = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ?? "";
  if (!expected || !safeEqual(supplied, expected)) throw new Error("UNAUTHORIZED");
}

export function assertCronAuthorization(request: NextRequest) {
  const expected = process.env.CRON_SECRET;
  const supplied = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ?? "";
  if (!expected || !safeEqual(supplied, expected)) throw new Error("UNAUTHORIZED");
}

function safeEqual(value: string, expected: string) {
  const a = Buffer.from(value);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}
