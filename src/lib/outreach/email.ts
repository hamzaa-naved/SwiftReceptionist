import "server-only";
import type { EmailPreview, Lead } from "./types";

const FOOTER = "Swift Receptionist · 1001 S Main St, Ste 500, Kalispell, MT 59901";

function safeCity(lead: Lead) {
  if (!lead.city || lead.city.trim().toLowerCase() === lead.state?.trim().toLowerCase()) return null;
  return lead.city.trim();
}

export function makePreview(lead: Lead, demo: EmailPreview["demo"]): EmailPreview {
  const firstName = lead.owner?.trim().split(/\s+/)[0] ?? "there";
  const city = safeCity(lead);
  const detail = lead.advertises24x7
    ? "You advertise 24/7 service, so a missed after-hours call can become the next electrician's job."
    : city
      ? `I put together a quick example for ${lead.business} in ${city}.`
      : `I put together a quick example for ${lead.business}.`;
  const subject = lead.advertises24x7
    ? `A live after-hours call demo for ${lead.business}`
    : `A quick receptionist demo for ${lead.business}`;
  const text = [
    `Hi ${firstName},`,
    "",
    detail,
    "",
    `Here is a private demo of what an AI receptionist could sound like for ${lead.business}:`,
    demo.url,
    "",
    "You can interrupt it and test it like a customer would. If it is not useful, no worries.",
    "",
    "— Hamza at Swift Receptionist",
    FOOTER,
    `Not relevant? Unsubscribe: ${demo.url.replace("/demo/", "/unsubscribe/")}`,
  ].join("\n");
  const html = `<p>Hi ${escapeHtml(firstName)},</p><p>${escapeHtml(detail)}</p><p>Here is a private demo of what an AI receptionist could sound like for <strong>${escapeHtml(lead.business)}</strong>:</p><p><a href="${demo.url}">Try the ${escapeHtml(lead.business)} demo</a></p><p>You can interrupt it and test it like a customer would. If it is not useful, no worries.</p><p>— Hamza at Swift Receptionist</p><hr><p style="font-size:12px;color:#666">${FOOTER}<br><a href="${demo.url.replace("/demo/", "/unsubscribe/")}">Unsubscribe</a></p>`;
  return { lead, demo, subject, text, html };
}

export async function sendEmail(preview: EmailPreview) {
  const token = process.env.HOSTINGER_MAIL_API_TOKEN;
  const mailboxId = process.env.HOSTINGER_MAILBOX_ID;
  const baseUrl = process.env.HOSTINGER_MAIL_API_BASE_URL;
  if (!token || !mailboxId || !baseUrl) throw new Error("Hostinger Mail is not configured.");
  const response = await fetch(`${baseUrl.replace(/\/$/, "")}/api/v1/mailboxes/${mailboxId}/send`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      to: [preview.lead.email],
      subject: preview.subject,
      text: preview.text,
      html: preview.html,
      displayName: "Hamza at Swift Receptionist",
    }),
  });
  if (!response.ok) throw new Error(`Hostinger Mail returned ${response.status}.`);
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char] ?? char);
}
