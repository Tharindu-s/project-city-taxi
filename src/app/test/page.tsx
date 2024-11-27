"use client";
import { useState } from "react";

const TestSMS = () => {
  const [to, setTo] = useState("");
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResponse(null);

    try {
      const res = await fetch("/api/sms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to, message }),
      });

      const data = await res.json();
      if (data.success) {
        setResponse("SMS sent successfully!");
      } else {
        setResponse(`Failed to send SMS: ${data.error}`);
      }
    } catch (error) {
      setResponse(`Error: ${(error as Error).message}`);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Test SMS Sending</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label>
            To (Phone Number):
            <input
              type="text"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="+1234567890"
              required
              style={{
                display: "block",
                marginTop: "0.5rem",
                padding: "0.5rem",
                width: "100%",
              }}
            />
          </label>
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label>
            Message:
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Your message here..."
              required
              style={{
                display: "block",
                marginTop: "0.5rem",
                padding: "0.5rem",
                width: "100%",
                height: "100px",
              }}
            />
          </label>
        </div>
        <button
          type="submit"
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#0070f3",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Send SMS
        </button>
      </form>
      {response && (
        <p
          style={{
            marginTop: "1rem",
            color: response.includes("successfully") ? "green" : "red",
          }}
        >
          {response}
        </p>
      )}
    </div>
  );
};

export default TestSMS;
