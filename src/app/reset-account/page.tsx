"use client";
import { useState } from "react";
import { generateResetToken } from "@/actions/actions";
import toast from "react-hot-toast";

export default function RequestResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await generateResetToken(email);
      toast.success("The reset link has been sent to your email.");
      setMessage(response.message);
    } catch (error) {
      toast.error("Failed to send reset link.");
      setMessage("Failed to send reset link.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Request Password Reset</h1>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send Reset Link</button>
      </form>
      {message && <p>{message}</p>} {/* Display success/error message */}
    </div>
  );
}
