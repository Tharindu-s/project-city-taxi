// pages/api/send-sms.js (or .ts if you're using TypeScript)

import type { NextApiRequest, NextApiResponse } from 'next';
import twilio from 'twilio';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const { to, message } = req.body;

  if (!to || !message) {
    return res.status(400).json({ message: 'To and Message are required' });
  }

  // Twilio credentials
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = twilio(accountSid, authToken);

  try {
    const messageResponse = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER, // Your Twilio phone number
      to: to, // The destination phone number
    });

    return res.status(200).json({ message: 'SMS sent successfully', sid: messageResponse.sid });
  } catch (error) {
    return res.status(500).json({ message: 'Error sending SMS', error });
  }
}
