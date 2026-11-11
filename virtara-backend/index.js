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