import { NextResponse } from "next/server";
import { onlinePaymentAvailable } from "@/lib/server/razorpay";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Which branches can take online payment right now (keys configured). */
export function GET() {
  return NextResponse.json({ main: onlinePaymentAvailable("main") });
}
