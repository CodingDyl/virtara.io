const BACKEND_URL = 'https://virtara-backend.vercel.app';
const UTM_KEY = 'virtara-utm';

/**
 * Remember the campaign a visitor arrived from, so a lead sent three pages
 * later still says where it came from. Called once when the app loads.
 * Storage can be unavailable (private windows, blocked cookies), which only
 * means the lead goes without its campaign.
 */
export function rememberUtm() {
  try {
    const params = new URLSearchParams(window.location.search);
    const utm = {
      source: params.get('utm_source') || undefined,
      medium: params.get('utm_medium') || undefined,
      campaign: params.get('utm_campaign') || undefined,
    };
    if (utm.source || utm.medium || utm.campaign) sessionStorage.setItem(UTM_KEY, JSON.stringify(utm));
  } catch {
    // No storage: nothing to remember.
  }
}

function rememberedUtm() {
  try {
    const stored = sessionStorage.getItem(UTM_KEY);
    return stored ? JSON.parse(stored) : undefined;
  } catch {
    return undefined;
  }
}

/** A form answer as short text, or undefined when there is nothing to say. */
function answer(value) {
  if (value === true) return 'Yes';
  if (value === false || value === null || value === undefined) return undefined;
  if (Array.isArray(value)) return value.length ? value.join(', ') : undefined;
  const text = String(value).trim();
  return text || undefined;
}

/**
 * Sends a form to Virtara's backend, which saves it in the CRM (and emails
 * the team if the CRM is unreachable).
 *
 * `contact` holds the fields the CRM knows by name; `answers` is everything
 * else the form asked, kept as labelled answers. Throws with a message a
 * visitor can read when it fails.
 */
export default async function submitLead(source, contact, answers = {}, options = {}) {
  const details = {};
  for (const [key, value] of Object.entries(answers)) {
    const text = answer(value);
    if (text) details[key] = text.slice(0, 300);
  }

  const response = await fetch(`${BACKEND_URL}/api/lead`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      source,
      name: contact.name,
      email: contact.email,
      phone: contact.phone || undefined,
      company: contact.company || undefined,
      website: contact.website || undefined,
      message: contact.message || undefined,
      details,
      consent: options.consent === true,
      subscribe: options.subscribe === true,
      utm: rememberedUtm(),
      page: window.location.pathname,
      hp: contact.hp || undefined,
    }),
  });

  if (!response.ok) {
    let message = 'Something went wrong. Please try again, or email info@virtara.co.za.';
    try {
      const body = await response.json();
      if (body && typeof body.message === 'string') message = body.message;
    } catch {
      // Keep the general message.
    }
    throw new Error(message);
  }
  return response.json();
}
