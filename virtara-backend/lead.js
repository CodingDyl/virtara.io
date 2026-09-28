const fetch = require('node-fetch');

/**
 * POST /api/lead: every form on virtara.co.za posts here.
 *
 * The lead goes to Virtec (the CRM) with this site's key, which never reaches
 * the browser. If Virtec cannot take it, the team gets an email instead, so a
 * lead is never lost to a CRM outage or a missing key. Everything a visitor
 * typed is escaped before it goes into that email.
 *
 * Env: VIRTEC_BASE_URL, VIRTARA_SITE_LEADS_KEY (for Virtec), RESEND_API_KEY
 * (fallback email), SENDER_API_KEY and SENDER_LIST_ID (health check signups).
 */

const SOURCES = ['start-a-project', 'contact', 'seo', 'starter', 'professional', 'enterprise', 'health-check', 'audit'];
const EMAIL = /^[^\s@<>"',;]{1,64}@[^\s@<>"',;]{1,190}\.[A-Za-z]{2,24}$/;
const LIMITS = { name: 120, email: 254, phone: 40, company: 160, website: 300, message: 4000, page: 200 };

// Per-instance, per-IP: 5 submissions in 10 minutes. Enough for a person who
// fixes a typo, not for a script.
const WINDOW_MS = 10 * 60_000;
const MAX_PER_WINDOW = 5;
const recent = new Map();

function allow(ip, now = Date.now()) {
  if (recent.size > 5000) recent.clear();
  const hits = (recent.get(ip) || []).filter((at) => now - at < WINDOW_MS);
  if (hits.length >= MAX_PER_WINDOW) {
    recent.set(ip, hits);
    return false;
  }
  hits.push(now);
  recent.set(ip, hits);
  return true;
}

function text(value, max) {
  if (typeof value !== 'string') return undefined;
  const cleaned = value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').trim();
  return cleaned ? cleaned.slice(0, max) : undefined;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
}

/** The lead in Virtec's shape, or a list of problems. */
function readLead(body) {
  const errors = [];
  const source = text(body.source, 40);
  if (!SOURCES.includes(source)) errors.push('Unknown form');
  const name = text(body.name, LIMITS.name);
  if (!name) errors.push('Please add your name');
  const email = text(body.email, LIMITS.email);
  if (!email || !EMAIL.test(email)) errors.push('Please add a valid email address');

  const details = {};
  if (body.details && typeof body.details === 'object' && !Array.isArray(body.details)) {
    for (const [key, value] of Object.entries(body.details).slice(0, 12)) {
      if (!/^[a-zA-Z][a-zA-Z0-9_-]{0,39}$/.test(key)) continue;
      const cleaned = text(typeof value === 'string' ? value : String(value ?? ''), 300);
      if (cleaned) details[key] = cleaned;
    }
  }

  let utm;
  if (body.utm && typeof body.utm === 'object') {
    utm = {};
    for (const key of ['source', 'medium', 'campaign']) {
      const value = text(body.utm[key], 100);
      if (value) utm[key] = value;
    }
    if (Object.keys(utm).length === 0) utm = undefined;
  }

  // Virtec only stores a real web address. Anything else a visitor typed in
  // the website box is kept as an answer rather than failing the lead.
  let website = text(body.website, LIMITS.website);
  if (website) {
    try {
      const url = new URL(/^https?:\/\//i.test(website) ? website : `https://${website}`);
      if (!/^https?:$/.test(url.protocol) || !url.hostname.includes('.')) throw new Error('not a site');
      website = url.toString();
    } catch {
      if (Object.keys(details).length < 12) details.websiteGiven = website;
      website = undefined;
    }
  }

  const lead = {
    source,
    name,
    email: email && email.toLowerCase(),
    phone: text(body.phone, LIMITS.phone),
    company: text(body.company, LIMITS.company),
    website,
    message: text(body.message, LIMITS.message),
    details,
    consent: body.consent === true,
    utm,
    page: text(body.page, LIMITS.page),
  };
  return { lead: errors.length ? undefined : lead, errors };
}

async function sendToVirtec(lead) {
  const base = process.env.VIRTEC_BASE_URL;
  const key = process.env.VIRTARA_SITE_LEADS_KEY;
  if (!base || !key) return { ok: false, reason: 'Virtec is not configured' };

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  try {
    const response = await fetch(new URL('/api/inbound/leads', base).toString(), {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(lead),
      redirect: 'manual',
      signal: controller.signal,
    });
    if (response.status === 200 || response.status === 201) return { ok: true, ...(await response.json()) };
    const detail = (await response.text()).slice(0, 300);
    return { ok: false, reason: `Virtec answered ${response.status}: ${detail}` };
  } catch (error) {
    return { ok: false, reason: `Virtec unreachable: ${error.message}` };
  } finally {
    clearTimeout(timer);
  }
}

async function emailTeam(lead, reason) {
  if (!process.env.RESEND_API_KEY) return false;
  const rows = [
    ['Name', lead.name],
    ['Email', lead.email],
    ['Phone', lead.phone],
    ['Company', lead.company],
    ['Website', lead.website],
    ...Object.entries(lead.details),
    ['Page', lead.page],
  ].filter(([, value]) => value);
  const html = [
    `<h2>New website lead: ${escapeHtml(lead.source)}</h2>`,
    `<p style="color:#888">Not saved in Virtec (${escapeHtml(reason)}). Add it by hand.</p>`,
    '<table cellpadding="4">',
    ...rows.map(([label, value]) => `<tr><td><strong>${escapeHtml(label)}</strong></td><td>${escapeHtml(value)}</td></tr>`),
    '</table>',
    lead.message ? `<p style="white-space:pre-wrap">${escapeHtml(lead.message)}</p>` : '',
  ].join('');

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'Website Leads <info@virtara.co.za>',
        to: 'info@virtara.co.za',
        reply_to: lead.email,
        subject: `New website lead (${lead.source}): ${lead.name}`.replace(/[\r\n]+/g, ' ').slice(0, 150),
        html,
      }),
    });
    if (!response.ok) console.error('Lead fallback email failed:', (await response.text()).slice(0, 300));
    return response.ok;
  } catch (error) {
    console.error('Lead fallback email failed:', error.message);
    return false;
  }
}

async function subscribeToHealthCheck(lead) {
  if (!process.env.SENDER_API_KEY) return;
  try {
    const response = await fetch('https://api.sender.net/v2/subscribers', {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.SENDER_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: lead.email,
        firstname: lead.name,
        groups: process.env.SENDER_LIST_ID ? [process.env.SENDER_LIST_ID] : [],
        tags: ['website-health-check'],
      }),
    });
    if (!response.ok) console.error('Sender subscribe failed:', (await response.text()).slice(0, 300));
  } catch (error) {
    console.error('Sender subscribe failed:', error.message);
  }
}

async function handleLead(req, res) {
  const body = req.body && typeof req.body === 'object' ? req.body : {};

  // Hidden field people never see. A bot that fills it gets a normal answer
  // and nothing is saved.
  if (typeof body.hp === 'string' && body.hp.trim() !== '') {
    return res.status(200).json({ ok: true });
  }

  const ip = String(req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown').split(',')[0].trim();
  if (!allow(ip)) {
    return res.status(429).json({ message: 'Too many submissions. Please try again in a few minutes.' });
  }

  const { lead, errors } = readLead(body);
  if (!lead) return res.status(400).json({ message: errors.join('. ') });

  const [virtec] = await Promise.all([
    sendToVirtec(lead),
    lead.source === 'health-check' && body.subscribe === true ? subscribeToHealthCheck(lead) : Promise.resolve(),
  ]);
  if (virtec.ok) return res.status(200).json({ ok: true });

  console.error('Lead not saved in Virtec:', virtec.reason);
  const emailed = await emailTeam(lead, virtec.reason);
  if (emailed) return res.status(200).json({ ok: true });

  return res.status(502).json({ message: 'We could not send that just now. Please email info@virtara.co.za.' });
}

module.exports = { handleLead, readLead };
