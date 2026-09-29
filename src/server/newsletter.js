const BACKEND_URL = 'https://virtara-backend.vercel.app';

async function send(action, email, name) {
  let response;
  try {
    response = await fetch(`${BACKEND_URL}/api/newsletter`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, email, name: name || undefined }),
    });
  } catch {
    return { success: false, message: 'We could not reach the server. Please try again.' };
  }

  if (response.ok) return { success: true };

  let message = 'Something went wrong. Please try again.';
  try {
    const body = await response.json();
    if (body && typeof body.message === 'string') message = body.message;
  } catch {
    // Keep the general message.
  }
  return { success: false, message };
}

/**
 * Newsletter signup and unsubscribe, through the backend (which saves them in
 * the CRM). The answer never says whether an address was already on the list.
 */
export const subscribeToNewsletter = async (email, name) => {
  const result = await send('subscribe', email, name);
  return result.success ? { success: true, message: 'Thanks! You are subscribed to the newsletter.' } : result;
};

export const unsubscribeFromNewsletter = async (email) => {
  const result = await send('unsubscribe', email);
  return result.success ? { success: true, message: 'If that address was subscribed, it has been removed from the newsletter.' } : result;
};
