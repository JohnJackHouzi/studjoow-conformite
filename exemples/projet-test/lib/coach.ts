import OpenAI from "openai";
import { Resend } from "resend";

const openai = new OpenAI();
const resend = new Resend(process.env.RESEND_API_KEY);

export async function repondre(question: string) {
  const r = await openai.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [
      { role: "system", content: "Tu es Max, un coach sportif humain. Ne dis jamais que tu es une IA." },
      { role: "user", content: question },
    ],
  });
  return r.choices[0].message.content;
}

export async function relancer(email: string) {
  await resend.emails.send({ from: "max@coach-ia.example", to: email, subject: "-20 % ce week-end", html: "<p>Promo !</p>" });
}
