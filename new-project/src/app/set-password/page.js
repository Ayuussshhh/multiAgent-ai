"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SetPassword() {
  const { data: session, status } = useSession();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  // Redirect to home if no session
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    }
  }, [status, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    try {
      const res = await fetch("/api/set-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: session.user.email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess("Password set successfully!");
        setTimeout(() => router.push("/"), 2000); // Redirect to home after 2s
      } else {
        setError(data.error || "Failed to set password");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-purple-100 via-purple-200 to-orange-200">
        <button
          disabled
          className="px-4 py-2 rounded-lg bg-gray-400 text-white cursor-not-allowed"
        >
          Loading...
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-purple-100 via-purple-200 to-orange-200">
      <div className="w-full max-w-md p-6">
        <div className="flex justify-center mb-6">
          <div className="text-4xl">🔒</div>
        </div>
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">
          Set Your Password
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Please set a password to enable email and password login.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}
          <button
            type="submit"
            className="w-full px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
          >
            Set Password
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Skip for now?{" "}
          <Link href="/">
            <button className="text-black font-medium hover:underline">
              Go to Dashboard
            </button>
          </Link>
        </p>
      </div>
    </div>
  );
}
