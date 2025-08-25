"use client";

import { signIn, useSession } from "next-auth/react";
import { FaGoogle } from "react-icons/fa";
import { Github } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Signin() {
  const { data: session, status } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  // Redirect to dashboard if session exists
  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (result?.error) {
      setError("Invalid email or password");
    } else {
      router.push("/");
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
          <div className="text-4xl">🔑</div>
        </div>
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">
          Log in to your account
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <button
            type="button"
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-100 transition"
          >
            <FaGoogle className="text-[#4285F4] mr-2" /> Continue with Google
          </button>

          <button
            type="button"
            onClick={() => signIn("github", { callbackUrl: "/" })}
            className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-100 transition"
          >
            <Github className="text-black mr-2 w-5 h-5" /> Continue with GitHub
          </button>

          <div className="text-center text-gray-500 my-4">OR</div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
          >
            Log in
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Don’t have an account?{" "}
          <Link href="/signup">
            <button className="text-black font-medium hover:underline">
              Sign up
            </button>
          </Link>
        </p>
      </div>
    </div>
  );
}
