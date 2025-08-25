"use client";
import React, { useState } from "react";

const Chatbot = () => {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleSubmit = () => {
    setIsLoading(true);
    // Add your submit logic here
    setTimeout(() => setIsLoading(false), 1000); // Simulated loading
  };

  return (
    <div className="flex flex-col w-full max-w-md h-[600px] bg-white rounded-2xl shadow-lg border border-gray-200 mx-auto">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">
          AI Website Assistant
        </h2>
        <p className="text-sm text-gray-500">Connected to: Website</p>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 chatbot-messages">
        <div className="text-center py-8 text-gray-500">
          <svg
            className="w-12 h-12 mx-auto mb-4 opacity-50"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
          <p>Hello! I'm your AI Website Assistant.</p>
          <p>Enter a website URL below to get started.</p>
        </div>

        {isLoading && (
          <div className="flex gap-1 p-3">
            <div
              className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
              style={{ animationDelay: "-0.32s" }}
            ></div>
            <div
              className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
              style={{ animationDelay: "-0.16s" }}
            ></div>
            <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={url}
            onChange={handleUrlChange}
            placeholder="Enter website URL"
            className="flex-1 p-2 border border-gray-300 rounded-md bg-white text-gray-800 text-sm focus:border-blue-500 outline-none transition-colors"
          />
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className={`p-2 bg-blue-600 text-white rounded-md flex items-center justify-center min-w-[40px] transition-opacity ${
              isLoading ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"
            }`}
          >
            {isLoading ? (
              <svg
                className="w-4 h-4 animate-spin"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 12a8 8 0 0116 0 8 8 0 01-16 0"
                />
              </svg>
            ) : (
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Tailwind Animation Styles */}
      <style jsx>{`
        .chatbot-messages {
          scrollbar-width: thin;
          scrollbar-color: #9ca3af #e5e7eb;
        }
        .chatbot-messages::-webkit-scrollbar {
          width: 6px;
        }
        .chatbot-messages::-webkit-scrollbar-track {
          background: #e5e7eb;
        }
        .chatbot-messages::-webkit-scrollbar-thumb {
          background: #9ca3af;
          border-radius: 3px;
        }
        @keyframes bounce {
          0%,
          80%,
          100% {
            transform: scale(0);
          }
          40% {
            transform: scale(1);
          }
        }
        .animate-bounce {
          animation: bounce 1.4s ease-in-out infinite both;
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Chatbot;
