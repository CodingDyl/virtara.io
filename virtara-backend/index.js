const express = require('express');
const fetch = require('node-fetch');
const dotenv = require('dotenv');
const cors = require('cors');
const { handleLead, handleNewsletter } = require('./lead');

dotenv.config();
const app = express();
app.use(express.json({ limit: '32kb' }));

app.use(cors({
    origin: ['http://localhost:5173', 'https://virtara.co.za', 'https://www.virtara.co.za'],
    methods: ['POST'],
    credentials: true
}));

app.post('/api/lead', handleLead);

app.post('/api/subscribe', async (req, res) => {
  const { email, name } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    const response = await fetch('https://api.sender.net/v2/subscribers', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.SENDER_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        firstname: name || '',
        groups: [process.env.SENDER_LIST_ID],
        tags: ['website-health-check'],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.log('Sender error:', errorText);
      return res.status(500).json({ message: 'Subscription failed' });
    }

    return res.status(200).json({ message: 'Email subscribed successfully' });
  } catch (error) {
    console.error('Error subscribing email:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/api/newsletter', handleNewsletter);

/**
 * Deprecated. The forms now post to /api/lead, so nothing in the current site
 * calls this. It stays only until the deployed site has been replaced (an old
 * cached page would otherwise lose its form), and it is locked down meanwhile:
 * it used to send any caller's raw HTML as info@virtara.co.za, which is a
 * phishing tool. Now everything is escaped (only line breaks survive), the
 * subject is prefixed so it cannot pass for anything else, sizes are capped,
 * and it is rate limited. Each use is logged; delete it once the log is quiet.
 */
const SEND_EMAIL_WINDOW_MS = 10 * 60_000;
const SEND_EMAIL_MAX = 5;
const sendEmailHits = new Map();

function allowSendEmail(ip, now = Date.now()) {
  if (sendEmailHits.size > 5000) sendEmailHits.clear();
  const hits = (sendEmailHits.get(ip) || []).filter((at) => now - at < SEND_EMAIL_WINDOW_MS);
  const allowed = hits.length < SEND_EMAIL_MAX;
  if (allowed) hits.push(now);
  sendEmailHits.set(ip, hits);
  return allowed;
}

function escapeForEmail(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

app.post('/api/send-email', async (req, res) => {
  const { subject, message } = req.body || {};
  const ip = String(req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown').split(',')[0].trim();
  console.warn('DEPRECATED /api/send-email used; the site should be posting to /api/lead');

  if (typeof subject !== 'string' || typeof message !== 'string' || !subject.trim() || !message.trim()) {
    return res.status(400).json({ message: 'Subject and message are required' });
  }
  if (subject.length > 150 || message.length > 6000) {
    return res.status(413).json({ message: 'Too long' });
  }
  if (!allowSendEmail(ip)) {
    return res.status(429).json({ message: 'Too many messages. Please try again later.' });
  }

  // The old forms wrote <br /> for line breaks; that is the only markup kept.
  const html = escapeForEmail(message.replace(/<br\s*\/?>/gi, '\n')).replace(/\n/g, '<br>');
  const safeSubject = `[Website form] ${subject.replace(/[\r\n]+/g, ' ').trim()}`.slice(0, 200);

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Contact Form <info@virtara.co.za>',
        to: 'info@virtara.co.za',
        subject: safeSubject,
        html,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.log('Resend error:', errorText.slice(0, 300));
      return res.status(500).json({ message: 'Failed to send email' });
    }

    return res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Add this for local running
if (!process.env.VERCEL) {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  }

module.exports = app;