"use client";
import Signin from "../app/signin/page";
import { signIn, signOut, useSession } from "next-auth/react";
import { FaGoogle } from "react-icons/fa";
import { Github } from "lucide-react";

export default function Signup() {
  const { data: session, status } = useSession();
  const [email, setEmail] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      signIn("email", { email });
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

  if (session) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-purple-100 via-purple-200 to-orange-200">
        <div className="text-center">
          <p className="text-gray-700 mb-4">You are already signed in!</p>
          <button
            onClick={() => signOut()}
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-purple-100 via-purple-200 to-orange-200">
      <div className="w-full max-w-md p-6">
        <div className="flex justify-center mb-6">
          <div className="text-4xl">❤️</div>
        </div>
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">
          Create your account
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <button
            onClick={() => signIn("google")}
            className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-100 transition"
          >
            <FaGoogle className="text-[#4285F4] mr-2" /> Continue with Google
          </button>
          <button
            onClick={() => signIn("github")}
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
          />
          <div className="flex items-center">
            <input type="checkbox" id="terms" className="mr-2" required />
            <label htmlFor="terms" className="text-sm text-gray-600">
              I agree to our Terms of Service and Privacy Policy
            </label>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
          >
            Continue
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <button
            onClick={() => signIn()}
            className="text-black font-medium hover:underline"
          >
            Log in
          </button>
        </p>
      </div>
    </div>
  );
}
