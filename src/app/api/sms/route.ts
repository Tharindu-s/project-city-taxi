// app/api/send-sms/route.ts

import { NextResponse } from "next/server";
import twilio from "twilio";

// Your Twilio credentials
const accountSid = process.env.TWILIO_ACCOUNT_SID as string; // Type assertion to string
const authToken = process.env.TWILIO_AUTH_TOKEN as string; // Type assertion to string
const client = twilio(accountSid, authToken);

export async function POST(req: Request) {
  try {
    const { to, message }: { to: string; message: string } = await req.json(); // Type for expected request body

    const sms = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER, // Your Twilio phone number from .env.local
      to: to, // The phone number to send the message to
    });

    return NextResponse.json({ success: true, sms });
  } catch (error) {
    console.error("Error sending SMS:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
