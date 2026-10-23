import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST() {
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price: process.env.STRIPE_PRICE_ID!, quantity: 1 }],
    success_url: "https://coach-ia.example/merci",
    cancel_url: "https://coach-ia.example/",
  });
  return Response.redirect(session.url!, 303);
}
