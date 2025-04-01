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

app.post('/api/send-email', async (req, res) => {
  const { subject, message } = req.body;
  
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
        subject: subject,
        html: message,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.log('Resend error:', errorText);
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