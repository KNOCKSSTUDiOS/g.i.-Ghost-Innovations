// G.I. BILLING — Stripe Integration
// Handles checkout sessions + webhook subscription activation.

import Stripe from "stripe";
import { registerIdentity } from "../gi-access/admin-auth";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function createCheckoutSession(userId: string, tier: string) {
  const priceMap: Record<string, string> = {
    ASSIST: process.env.PRICE_ASSIST_ID!,
    CONTROL: process.env.PRICE_CONTROL_ID!,
    CREATOR: process.env.PRICE_CREATOR_ID!,
    OEM: process.env.PRICE_OEM_ID!
  };

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    customer_email: `${userId}@example.com`,
    line_items: [
      {
        price: priceMap[tier],
        quantity: 1
      }
    ],
    success_url: process.env.SUCCESS_URL!,
    cancel_url: process.env.CANCEL_URL!,
    metadata: { userId, tier }
  });

  return session.url;
}

// Webhook: activates subscription
export async function handleStripeWebhook(event: Stripe.Event) {
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const userId = session.metadata?.userId!;
    const tier = session.metadata?.tier!;

    // Register identity
    registerIdentity({
      user_id: userId,
      role: tier === "OEM" ? "FOUNDER" : tier === "CREATOR" ? "CREATOR" : "CONTROL",
      tier: tier as any,
      status: "ACTIVE",
      expires: "NEVER",
      permissions: ["FULL_PLATFORM"]
    });

    return { ok: true };
  }

  return { ok: false };
}

