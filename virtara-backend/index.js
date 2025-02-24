const express = require('express');
const fetch = require('node-fetch');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

dotenv.config();
const app = express();
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173' || 'https://www.virtara.co.za', // Allow only your Vite frontend
    methods: ['POST'], // Allow POST requests
  }));

app.use(express.static(path.join(__dirname, 'files')));

app.post('/api/subscribe', async (req, res) => {
    const {email, name} = req.body;

    if (!email) {
        return res.status(400).json({message: 'Email is required'});
    }

    try {
        const subscribeResponse = await fetch(`https://api.sender.net/v2/subscribers`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.SENDER_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                firstname: name || '',
                groups: [process.env.SENDER_LIST_ID]
            }),
        });
        
        if (!subscribeResponse.ok) { 
            const errorData = await subscribeResponse.json();
            return res.status(500).json({message: errorData.message});
        }

        // // ================ Send Welcome Email ================
        // const pdfLink = `http://localhost:3000/virtara_website_health_check.pdf`;
        // const emailResponse = await fetch(`https://api.sender.net/v2/emails`, {
        //     method: 'POST',
        //     headers: {
        //         'Authorization': `Bearer ${process.env.SENDER_API_KEY}`,
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         from: { email: 'info@virtara.co.za', name: 'Dylan @ Virtara' },
        //         to: [{ email }],
        //         subject: 'Your 5-Minute Website Health Check',
        //         html: `
        //           <p>Hey ${name || 'there'},</p>
        //           <p>Thanks for subscribing! Here’s your <a href="${pdfLink}">5-Minute Website Health Check</a> to get your site in top shape.</p>
        //           <p>Cheers,<br>Dylan, Your Digital Pathfinder</p>
        //         `,
        //     }),
        // });

        // if (!emailResponse.ok) {
        //     const errorData = await emailResponse.json();   
        //     return res.status(500).json({message: errorData.message});
        // }

        return res.status(200).json({message: 'Email subscribed successfully'});
    } catch (error) {
        console.error('Error subscribing email:', error);
        return res.status(500).json({message: 'Internal server error'});
    }
});

module.exports = app;