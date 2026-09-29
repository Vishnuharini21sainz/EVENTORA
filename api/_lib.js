const crypto = require('crypto');

const OFFICE_EMAIL = process.env.EVENTORA_OFFICE_EMAIL || 'vishnuharini07@gmail.com';
const OFFICE_PHONE = process.env.EVENTORA_OFFICE_PHONE || '9940058091';

// In-memory storage for this demo/serverless deployment.
// For durable production tracking, connect a database later.
const events = global.__EVENTORA_EVENTS__ || new Map();
global.__EVENTORA_EVENTS__ = events;

function esc(value) {
  return String(value ?? '').replace(/[&<>\"]/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
  }[char]));
}

async function sendEmail(event) {
  if (!process.env.RESEND_API_KEY) {
    return { sent: false, reason: 'RESEND_API_KEY not configured' };
  }

  const from = process.env.EVENTORA_FROM_EMAIL || 'EVENTORA <onboarding@resend.dev>';
  const subject = `New EVENTORA brief ${event.id} — ${event.type}`;
  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.6">
      <h2>New EVENTORA Event Brief</h2>
      <p><b>Application:</b> ${esc(event.id)}</p>
      <p><b>Client:</b> ${esc(event.name)}<br>
      <b>Email:</b> ${esc(event.email)}<br>
      <b>Phone:</b> ${esc(event.phone)}</p>
      <p><b>Event:</b> ${esc(event.type)}<br>
      <b>Date:</b> ${esc(event.date)}<br>
      <b>Guests:</b> ${esc(event.guests)}<br>
      <b>Budget:</b> ${esc(event.budget)}</p>
      <p><b>Event DNA:</b> ${esc(event.mood)} · ${esc(event.moment)}</p>
      <p><b>Catering:</b> ${esc(event.catering)}</p>
      <p><b>Requirements:</b><br>${esc(event.requirements)}</p>
      <p><b>Afterglow:</b> ${event.afterglow ? 'Yes' : 'No'}</p>
    </div>`;

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [OFFICE_EMAIL],
      reply_to: event.email,
      subject,
      html,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Email service failed: ${text}`);
  }

  return { sent: true, to: OFFICE_EMAIL };
}

async function createEvent(body) {
  const id = `EVT-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;
  const event = {
    id,
    ...body,
    status: 'NEW',
    createdAt: new Date().toISOString(),
  };
  events.set(id, event);

  let email = { sent: false };
  try {
    email = await sendEmail(event);
  } catch (error) {
    console.error(error.message);
    email = { sent: false, reason: error.message };
  }

  return { ...event, email };
}

module.exports = { OFFICE_EMAIL, OFFICE_PHONE, events, createEvent };
