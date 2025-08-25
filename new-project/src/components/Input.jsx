"use client";
import React, { useState } from "react";
import { Paperclip, Globe, Palette, Send } from "lucide-react";
import { useSession, signIn } from "next-auth/react";

const Input = ({ className = "" }) => {
  const { data: session } = useSession();
  const [query, setQuery] = useState("");
  const [showSignupModal, setShowSignupModal] = useState(false);

  const handleSend = () => {
    if (!session) {
      setShowSignupModal(true);
      return;
    }
    // If authenticated, do something with the query
    console.log("Query sent by:", session.user.email, "→", query);
    setQuery("");
  };

  return (
    <div className={`p-4 w-full max-w-3xl mx-auto ${className}`}>
      <div className="relative">
        <div className="relative flex flex-col border border-gray-400 rounded-xl bg-white">
          <div className="overflow-y-auto">
            <textarea
              rows={2}
              style={{ overflow: "hidden", outline: "none" }}
              className="w-full px-4 py-2 resize-none bg-transparent border-none focus:outline-none placeholder:text-gray-500 text-black"
              placeholder="Ask me anything..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="h-10">
            <div className="absolute left-3 right-3 bottom-2 flex items-center justify-between">
              {/* left icons */}
              <div className="flex items-center gap-2">
                <button className="p-1 text-black hover:text-black transition-colors rounded-lg border border-gray-200 hover:border-gray-300">
                  <Paperclip size={18} />
                </button>
                <button className="p-1 text-black hover:text-black transition-colors rounded-lg border border-gray-200 hover:border-gray-300">
                  <Globe size={18} />
                </button>
                <button className="p-1 text-black hover:text-black transition-colors rounded-lg border border-gray-200 hover:border-gray-300">
                  <Palette size={18} />
                </button>
              </div>
              {/* send button */}
              <button
                onClick={handleSend}
                className="p-1 transition-colors text-blue-500 hover:text-blue-600"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Signup Modal */}
      {showSignupModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-80 text-center">
            <h2 className="text-xl font-bold mb-4">Sign up to continue</h2>
            <button
              onClick={() => signIn("google")}
              className="w-full mb-2 px-4 py-2 bg-red-500 text-white rounded-lg"
            >
              Continue with Google
            </button>
            <button
              onClick={() => signIn("github")}
              className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg"
            >
              Continue with GitHub
            </button>
            <button
              onClick={() => setShowSignupModal(false)}
              className="mt-3 text-sm text-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Input;
