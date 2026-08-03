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

/**
 * Turn a plain-text body into a simple, safe HTML part.
 *
 * Sending text-only means bare URLs are only clickable if the recipient's
 * client happens to auto-linkify them. Several don't, and a demo link that
 * can't be clicked is a wasted send. Every message therefore goes out
 * multipart, with real anchors.
 *
 * Deliberately plain: system fonts, no images, no tracking pixel, no tables.
 * Cold outreach that looks like a marketing template gets filtered.
 */
const BODY_STYLE =
  "font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;" +
  "font-size:15px;line-height:1.65;color:#1a1a1a";

export function textToHtml(text: string): string {
  const escape = (v: string) =>
    v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const paragraphs = text.trim().split(/\n{2,}/).map((block) => {
    const withLinks = escape(block)
      .replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" style="color:#1a56db">$1</a>')
      .replace(/\n/g, "<br>");
    return `<p>${withLinks}</p>`;
  });
  return `<div style="${BODY_STYLE}">${paragraphs.join("")}</div>`;
}

/**
 * Low-level send through the Hostinger Mail API.
 *
 * Note: the Hostinger endpoint rejects In-Reply-To and References headers, so
 * messages sent this way cannot thread as true replies. Use it for first
 * contact and notifications; reply to a live conversation from the mailbox.
 */
export async function sendRawEmail(options: {
  to: string;
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
  displayName?: string;
}) {
  const token = process.env.HOSTINGER_MAIL_API_TOKEN;
  const mailboxId = process.env.HOSTINGER_MAILBOX_ID;
  const baseUrl = process.env.HOSTINGER_MAIL_API_BASE_URL;
  if (!token || !mailboxId || !baseUrl) throw new Error("Hostinger Mail is not configured.");
  const response = await fetch(`${baseUrl.replace(/\/$/, "")}/api/v1/mailboxes/${mailboxId}/send`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      to: [options.to],
      subject: options.subject,
      text: options.text,
      // Always multipart — never let a link ship unclickable.
      html: options.html ?? textToHtml(options.text),
      ...(options.replyTo ? { replyTo: options.replyTo } : {}),
      displayName: options.displayName ?? "Swift Receptionist",
    }),
  });
  if (!response.ok) {
    throw new Error(`Hostinger Mail returned ${response.status}: ${(await response.text()).slice(0, 200)}`);
  }
}

/** Outreach batch send. Routed through sendRawEmail so there is one send path. */
export async function sendEmail(preview: EmailPreview) {
  await sendRawEmail({
    to: preview.lead.email,
    subject: preview.subject,
    text: preview.text,
    html: preview.html,
    displayName: "Hamza at Swift Receptionist",
  });
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char] ?? char);
}
