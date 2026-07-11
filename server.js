require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Endpoint to receive messages
app.post('/send-message', async (req, res) => {
    const { name, email, subject, message, timestamp } = req.body;
    // Basic validation
    if (!name || !email || !subject || !message) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    // Setup transporter
    let transporter;
    try {
        transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT) || 587,
            secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });
    } catch (err) {
        console.error('Failed to create transporter', err);
        return res.status(500).json({ error: 'Email configuration error' });
    }

    const mailOptions = {
        from: `${process.env.FROM_NAME || 'Portfolio'} <${process.env.FROM_EMAIL}>`,
        to: process.env.DEST_EMAIL || 'shamshadansari43984@gmail.com',
        subject: `[Portfolio Contact] ${subject}`,
        text: `Name: ${name}\nEmail: ${email}\nTimestamp: ${timestamp}\n\nMessage:\n${message}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ success: true });
    } catch (error) {
        console.error('Error sending email', error);
        res.status(500).json({ error: 'Failed to send email' });
    }
});

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});
