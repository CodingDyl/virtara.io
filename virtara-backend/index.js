const express = require('express');
const fetch = require('node-fetch');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();
app.use(express.json());

app.use(cors({
    origin: ['http://localhost:5173', 'https://virtara.co.za', 'https://www.virtara.co.za'],
    methods: ['POST'],
    credentials: true
}));

// Website checklist follow-up sequence, sent through Resend scheduled sending.
// This copy is the source of truth (docs/audit/2026-11-11-checklist-email-sequence.md mirrors it).
const CHECKLIST_URL = 'https://virtara-backend.vercel.app/files/website-health-check.pdf';
const AUDIT_URL = 'https://virtara.co.za/resources/audit';
const DAY_MS = 24 * 60 * 60 * 1000;

const sequenceEmails = (safeName, email) => {
  const hi = `<p>Hi ${safeName},</p>`;
  const footer = `<p style="color:#666;font-size:13px">You're getting this because you downloaded the Virtara website checklist. Unsubscribe: <a href="https://virtara.co.za/unsubscribe?email=${encodeURIComponent(email)}">https://virtara.co.za/unsubscribe</a></p>`;
  const sign = (extra = '') => `<p>Regards,<br>Dylan, Virtara${extra}</p>`;
  return [
    {
      days: 0,
      subject: 'Your 5-Minute Website Health Check',
      html: `${hi}<p>Thanks for asking for the checklist. Here it is:</p><p><a href="${CHECKLIST_URL}"><strong>Download the 5-Minute Website Health Check</strong></a></p><p>How to use it:</p><ol><li>Have your own website open, on both your laptop and your phone.</li><li>Go through the five questions and tick each one honestly.</li><li>Add up your score at the end.</li></ol><p>If you land on 3 or lower, that's not a verdict on your business. It usually means a handful of fixable things are sitting between your website and your next enquiry.</p><p>In a few days I'll send you a short note on the three checks people most often get stuck on, and how to fix them.</p><p>If you get stuck anywhere, reply to this email. It comes straight to me.</p>${sign()}${footer}`,
    },
    {
      days: 3,
      subject: 'Three checks on the list that cost you enquiries',
      html: `${hi}<p>Did you get through the checklist? If you haven't yet, it's still five minutes: <a href="${CHECKLIST_URL}">${CHECKLIST_URL}</a></p><p>Three of the five checks are the ones we'd look at first on any site, because they sit directly between a visitor and an enquiry.</p><p><strong>1. Your site is slow to load (check 1)</strong><br>If a page takes a long time to show up, many people leave before they see anything. Test yours on Google's PageSpeed Insights, on your phone's connection, not your office wifi. The usual causes are heavy images and cheap hosting. Compressing the biggest images is often the quickest win.</p><p><strong>2. People can't find you on Google (check 3)</strong><br>Search for your business type plus your city, the way a customer would, for example "plumber Durban". If you're nowhere on the first page, you're invisible to people who were ready to buy. Start with the basics: a Google Business Profile that is complete, your town or suburb named on the page, and a page for each service you offer.</p><p><strong>3. There's no obvious next step (check 4)</strong><br>Open your homepage and ask: if I had ten seconds, what would I click? If the answer isn't one clear button such as "Request a quote" or "Call us", visitors have to work out what to do, and many won't. One main action, repeated in the right places, beats five options.</p><p>If any of these came up on your checklist, you don't have to fix them alone. In a few days I'll tell you how we can look at your site with you, at no cost.</p>${sign()}${footer}`,
    },
    {
      days: 7,
      subject: 'A free 30-minute look at your website',
      html: `${hi}<p>A week ago you ran our health check on your website. Whatever score you got, the next question is usually "what do I fix first?"</p><p>That's what our website audit is for. It's a 30-minute session, and it's free. We go through your site with you, find the issues that are costing you enquiries, and give you a short plan in order of priority.</p><p><a href="${AUDIT_URL}"><strong>Book your free website audit</strong></a></p><p>What happens:</p><ul><li>You pick a date and time that suits you.</li><li>We look at your site beforehand, so the call isn't spent on basics.</li><li>You leave with a plan you can act on yourself, or with us. There's no obligation either way.</li></ul><p>If now isn't the right time, that's fine. The checklist is yours to keep and reuse whenever you update the site.</p>${sign()}${footer}`,
    },
  ];
};

// Failures are logged only; the caller never waits on or reports them.
const sendChecklistSequence = async (email, name, returning) => {
  const safeName = escapeHtml(typeof name === 'string' ? name.trim().slice(0, 100) : '') || 'there';
  const emails = sequenceEmails(safeName, email);
  for (const { days, subject, html } of returning ? emails.slice(0, 1) : emails) {
    try {
      const payload = {
        from: 'Virtara <info@virtara.co.za>',
        reply_to: 'info@virtara.co.za',
        to: email,
        subject,
        html,
      };
      if (days > 0) payload.scheduled_at = new Date(Date.now() + days * DAY_MS).toISOString();
      const r = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      if (!r.ok) console.log(`Resend sequence day ${days} error:`, await r.text());
    } catch (err) {
      console.error(`Error sending sequence day ${days}:`, err);
    }
  }
};

app.post('/api/subscribe', async (req, res) => {
  const { email, name, returning } = req.body;
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

    await sendChecklistSequence(email, name, returning === true);

    return res.status(200).json({ message: 'Email subscribed successfully' });
  } catch (error) {
    console.error('Error subscribing email:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

const EMAIL_SHAPE = /^[^\s@<>",;]+@[^\s@<>",;]+\.[^\s@<>",;]+$/;

const escapeHtml = (value) =>
  String(value ?? '').replace(/[&<>"']/g, (c) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[c]);

app.post('/api/send-email', async (req, res) => {
  const { subject, message, replyTo, name } = req.body;
  const validReplyTo =
    typeof replyTo === 'string' && replyTo.length <= 254 && EMAIL_SHAPE.test(replyTo.trim())
      ? replyTo.trim()
      : null;

  // Add this debug log
  console.log('API Key present:', !!process.env.RESEND_API_KEY);

  try {
    const payload = {
      from: 'Contact Form <info@virtara.co.za>',
      to: 'info@virtara.co.za',
      subject: subject,
      html: message,
    };
    if (validReplyTo) payload.reply_to = validReplyTo;

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.log('Resend error:', errorText);
      return res.status(500).json({ message: 'Failed to send email' });
    }

    // Auto-reply to the visitor. Fixed copy only: nothing from the request
    // except the HTML-escaped name, so this cannot be used to send arbitrary text.
    if (validReplyTo) {
      try {
        const safeName = escapeHtml(typeof name === 'string' ? name.trim().slice(0, 100) : '') || 'there';
        const reply = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Virtara <info@virtara.co.za>',
            to: validReplyTo,
            subject: "We've got your message",
            html: `<p>Hi ${safeName},</p><p>Thanks for getting in touch with Virtara. We've received your enquiry and will reply within one business day. If it's urgent, call or WhatsApp +27 72 327 1040.</p>`,
          }),
        });
        if (!reply.ok) {
          console.log('Resend auto-reply error:', await reply.text());
        }
      } catch (replyError) {
        console.error('Error sending auto-reply:', replyError);
      }
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