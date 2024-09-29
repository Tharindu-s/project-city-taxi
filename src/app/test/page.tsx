"use client";

import { useState } from "react";

export default function SmsSender() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const sendSMS = async () => {
    try {
      const response = await fetch("/api/sms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ to: phoneNumber, message }),
      });

      const data = await response.json();
      if (data.success) {
        setStatus("SMS sent successfully!");
      } else {
        setStatus(`Failed to send SMS: ${data.error}`);
      }
    } catch (error) {
      console.error("Error:", error);
      setStatus("Error sending SMS.");
    }
  };

  return (
    <div>
      <h1>Send SMS</h1>
      <input
        type="text"
        placeholder="Enter phone number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <textarea
        placeholder="Enter your message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendSMS}>Send SMS</button>
      {status && <p>{status}</p>}
    </div>
  );
}
