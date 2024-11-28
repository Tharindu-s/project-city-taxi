"use client";
import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { resetPassword } from "@/actions/actions"; // The server action

const ResetPasswordForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      setMessage("Invalid or missing token.");
      return;
    }

    try {
      const result = await resetPassword(token, password);
      if (result.success) {
        setMessage("Password reset successfully!");
        router.push("/login");
      } else {
        setMessage(result.message || "Something went wrong.");
      }
    } catch (error) {
      console.error(error);
      setMessage("Error resetting password.");
    }
  };

  return (
    <div>
      <h1>Reset Your Password</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          New Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default function ResetPassword() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
