import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import crypto from "crypto";

// Verify Whop Webhook Signature
const verifySignature = (payload: string, signature: string, secret: string) => {
  const hmac = crypto.createHmac("sha256", secret);
  const digest = hmac.update(payload).digest("hex");
  return digest === signature;
};

export async function POST(request: Request) {
  const payload = await request.text();
  const signature = request.headers.get("x-whop-signature");
  const webhookSecret = process.env.WHOP_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return NextResponse.json({ error: "Missing signature or secret" }, { status: 400 });
  }

  // Optional: Verify signature if you have the secret
  // const isValid = verifySignature(payload, signature, webhookSecret);
  // if (!isValid) {
  //   return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  // }

  try {
    const event = JSON.parse(payload);
    const { action, data } = event;

    console.log(`Received Whop event: ${action}`, data);

    const email = data.email;
    const whopUserId = data.user_id;

    if (!email) {
      return NextResponse.json({ error: "No email in payload" }, { status: 400 });
    }

    if (action === "membership.activated") {
      await prisma.user.update({
        where: { email },
        data: { 
          role: "PRO",
          whopUserId: whopUserId 
        },
      });
      console.log(`User ${email} promoted to PRO`);
    } else if (action === "membership.deactivated") {
      await prisma.user.update({
        where: { email },
        data: { role: "FREE" },
      });
      console.log(`User ${email} reverted to FREE`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook processing error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
