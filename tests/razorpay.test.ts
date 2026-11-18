import { createHmac } from "node:crypto";
import { beforeEach, describe, expect, it } from "vitest";
import { onlinePaymentAvailable, verifyCheckoutSignature, verifyWebhookSignature } from "@/lib/server/razorpay";

beforeEach(() => {
  process.env.RAZORPAY_MAIN_KEY_ID = "rzp_test_main";
  process.env.RAZORPAY_MAIN_KEY_SECRET = "main-secret";
  process.env.RAZORPAY_MAIN_WEBHOOK_SECRET = "main-hook";
});

const hmac = (secret: string, body: string) => createHmac("sha256", secret).update(body).digest("hex");

describe("checkout signature", () => {
  it("accepts Razorpay's signature for this order and payment", () => {
    const sig = hmac("main-secret", "order_A|pay_B");
    expect(verifyCheckoutSignature("main", "order_A", "pay_B", sig)).toBe(true);
  });

  it("rejects a signature for a different payment", () => {
    const sig = hmac("main-secret", "order_A|pay_OTHER");
    expect(verifyCheckoutSignature("main", "order_A", "pay_B", sig)).toBe(false);
  });

  it("rejects non-hex and wrong-length input without throwing", () => {
    expect(verifyCheckoutSignature("main", "order_A", "pay_B", "zz")).toBe(false);
    expect(verifyCheckoutSignature("main", "order_A", "pay_B", "abcd")).toBe(false);
  });
});

describe("webhook signature", () => {
  const body = JSON.stringify({ event: "payment.captured" });

  it("accepts the branch's own webhook signature", () => {
    expect(verifyWebhookSignature("main", body, hmac("main-hook", body))).toBe(true);
  });

  it("rejects a body changed after signing", () => {
    expect(verifyWebhookSignature("main", body + " ", hmac("main-hook", body))).toBe(false);
  });

  it("rejects everything for a branch with no webhook secret", () => {
    const saved = process.env.RAZORPAY_MAIN_WEBHOOK_SECRET;
    delete process.env.RAZORPAY_MAIN_WEBHOOK_SECRET;
    expect(verifyWebhookSignature("main", body, hmac("", body))).toBe(false);
    process.env.RAZORPAY_MAIN_WEBHOOK_SECRET = saved;
  });
});

describe("online payment availability", () => {
  it("is on only for branches with keys", () => {
    expect(onlinePaymentAvailable("main")).toBe(true);
    const saved = process.env.RAZORPAY_MAIN_KEY_ID;
    delete process.env.RAZORPAY_MAIN_KEY_ID;
    expect(onlinePaymentAvailable("main")).toBe(false);
    process.env.RAZORPAY_MAIN_KEY_ID = saved;
  });
});
