"use client";

import { useState } from "react";
import { Button } from "../../components/ui/button";
import {
  Plus,
  ArrowUp,
  Sparkles,
  Mic,
  Image,
  FileText,
  MoreHorizontal,
  File,
  X,
  Heart,
  Send,
  Bot,
  Zap
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export const SearchBar = ({ currentTheme = "blue", currentMode = "light" }) => {
  const [prompt, setPrompt] = useState("");
  const { data: session } = useSession();
  const [isFocused, setIsFocused] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();

  // Theme configurations
  const themes = {
    blue: {
      primary: "from-blue-500 to-indigo-600",
      secondary: "from-blue-400 to-indigo-500",
      accent: "from-blue-600 to-indigo-700",
      light: "from-slate-50 via-blue-50 to-indigo-50",
      dark: "from-slate-900 via-blue-900 to-indigo-900",
      text: "text-blue-600",
      hover: "hover:text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-200"
    },
    purple: {
      primary: "from-purple-500 to-pink-600",
      secondary: "from-purple-400 to-pink-500",
      accent: "from-purple-600 to-pink-700",
      light: "from-slate-50 via-purple-50 to-pink-50",
      dark: "from-slate-900 via-purple-900 to-pink-900",
      text: "text-purple-600",
      hover: "hover:text-purple-600",
      bg: "bg-purple-50",
      border: "border-purple-200"
    },
    green: {
      primary: "from-green-500 to-emerald-600",
      secondary: "from-green-400 to-emerald-500",
      accent: "from-green-600 to-emerald-700",
      light: "from-slate-50 via-green-50 to-emerald-50",
      dark: "from-slate-900 via-green-900 to-emerald-900",
      text: "text-green-600",
      hover: "hover:text-green-600",
      bg: "bg-green-50",
      border: "border-green-200"
    },
    orange: {
      primary: "from-orange-500 to-red-600",
      secondary: "from-orange-400 to-red-500",
      accent: "from-orange-600 to-red-700",
      light: "from-slate-50 via-orange-50 to-red-50",
      dark: "from-slate-900 via-orange-900 to-red-900",
      text: "text-orange-600",
      hover: "hover:text-orange-600",
      bg: "bg-orange-50",
      border: "border-orange-200"
    },
    teal: {
      primary: "from-teal-500 to-cyan-600",
      secondary: "from-teal-400 to-cyan-500",
      accent: "from-teal-600 to-cyan-700",
      light: "from-slate-50 via-teal-50 to-cyan-50",
      dark: "from-slate-900 via-teal-900 to-cyan-900",
      text: "text-teal-600",
      hover: "hover:text-teal-600",
      bg: "bg-teal-50",
      border: "border-teal-200"
    },
    pink: {
      primary: "from-pink-500 to-rose-600",
      secondary: "from-pink-400 to-rose-500",
      accent: "from-pink-600 to-rose-700",
      light: "from-slate-50 via-pink-50 to-rose-50",
      dark: "from-slate-900 via-pink-900 to-rose-900",
      text: "text-pink-600",
      hover: "hover:text-pink-600",
      bg: "bg-pink-50",
      border: "border-pink-200"
    },
    gold: {
      primary: "from-yellow-500 to-orange-600",
      secondary: "from-yellow-400 to-orange-500",
      accent: "from-yellow-600 to-orange-700",
      light: "from-slate-50 via-yellow-50 to-orange-50",
      dark: "from-slate-900 via-yellow-900 to-orange-900",
      text: "text-yellow-600",
      hover: "hover:text-yellow-600",
      bg: "bg-yellow-50",
      border: "border-yellow-200"
    },
    midnight: {
      primary: "from-slate-700 to-slate-900",
      secondary: "from-slate-600 to-slate-800",
      accent: "from-slate-800 to-slate-950",
      light: "from-slate-50 via-slate-100 to-slate-200",
      dark: "from-slate-900 via-slate-800 to-slate-700",
      text: "text-slate-600",
      hover: "hover:text-slate-600",
      bg: "bg-slate-50",
      border: "border-slate-200"
    }
  };

  const currentThemeConfig = themes[currentTheme] || themes.blue;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!session) {
      setShowPopup(true);
    } else {
      router.push("/analysis");
    }
  };

  const toolButtons = [
    { icon: Mic, label: "Voice input", color: "text-blue-600", bgColor: "hover:bg-blue-50" },
    { icon: Image, label: "Add image", color: "text-purple-600", bgColor: "hover:bg-purple-50" },
    { icon: FileText, label: "Upload file", color: "text-green-600", bgColor: "hover:bg-green-50" },
    { icon: File, label: "Analyze file", color: "text-orange-600", bgColor: "hover:bg-orange-50" },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`relative backdrop-blur-md rounded-2xl border-2 transition-all duration-300 ${
            currentMode === 'light' 
              ? 'bg-white/20 border-white/30 shadow-lg shadow-black/5' 
              : 'bg-gray-900/20 border-gray-700/30 shadow-lg shadow-black/20'
          } ${
            isFocused 
              ? `border-${currentTheme}-300/50 shadow-xl shadow-${currentTheme}-100/20` 
              : ''
          }`}
        >
          {/* Input Area */}
          <div className="relative p-6">
            <div className="flex items-start space-x-4">
              {/* AI Icon */}
              <div className={`w-10 h-10 bg-gradient-to-r ${currentThemeConfig.primary} rounded-xl flex items-center justify-center shadow-lg flex-shrink-0`}>
                <Bot size={20} className="text-white" />
              </div>
              
              {/* Textarea */}
              <div className="flex-1">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder="Ask ReqAI to create a dashboard to..."
                  className={`w-full min-h-[60px] bg-transparent resize-none outline-none text-lg leading-relaxed font-medium ${
                    currentMode === 'light' 
                      ? 'text-gray-800 placeholder-gray-500' 
                      : 'text-gray-200 placeholder-gray-400'
                  }`}
                  rows={1}
                  style={{
                    height: "auto",
                    minHeight: "60px",
                  }}
                  onInput={(e) => {
                    const target = e.target;
                    target.style.height = "auto";
                    target.style.height = Math.max(60, target.scrollHeight) + "px";
                  }}
                />
              </div>
            </div>

            {/* Focus indicator */}
            {isFocused && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute top-4 right-4"
              >
                <div className={`w-6 h-6 bg-gradient-to-r ${currentThemeConfig.primary} rounded-full flex items-center justify-center`}>
                  <Sparkles size={12} className="text-white animate-pulse" />
                </div>
              </motion.div>
            )}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between px-6 pb-6">
            <div className="flex items-center space-x-2">
              {toolButtons.map((tool, index) => (
                <motion.button
                  key={index}
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-2 h-9 w-9 rounded-lg transition-all duration-300 ${tool.color} ${tool.bgColor} ${
                    currentMode === 'light' 
                      ? 'border border-gray-100 hover:border-gray-200' 
                      : 'border border-gray-700 hover:border-gray-600'
                  }`}
                  title={tool.label}
                >
                  <tool.icon className="w-4 h-4" />
                </motion.button>
              ))}

              <div className={`w-px h-6 mx-3 ${
                currentMode === 'light' ? 'bg-gray-200' : 'bg-gray-600'
              }`} />

              <div className={`flex items-center space-x-2 text-sm ${
                currentMode === 'light' ? 'text-gray-500' : 'text-gray-400'
              }`}>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-medium">Ready</span>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex items-center space-x-3">
              <motion.button
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-2 transition-colors ${
                  currentMode === 'light' ? 'text-gray-400 hover:text-gray-600' : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                <MoreHorizontal size={18} />
              </motion.button>

              <motion.button
                type="submit"
                disabled={!prompt.trim()}
                whileHover={prompt.trim() ? { scale: 1.05 } : {}}
                whileTap={prompt.trim() ? { scale: 0.95 } : {}}
                className={`
                  w-12 h-12 rounded-xl transition-all duration-300 flex items-center justify-center
                  ${
                    prompt.trim()
                      ? `bg-gradient-to-r ${currentThemeConfig.primary} hover:bg-gradient-to-r ${currentThemeConfig.accent} shadow-lg hover:shadow-xl`
                      : currentMode === 'light'
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  }
                `}
              >
                <Send size={18} className={prompt.trim() ? "text-white" : currentMode === 'light' ? "text-gray-400" : "text-gray-500"} />
              </motion.button>
            </div>
          </div>

          {/* Character count */}
          {prompt.length > 50 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`px-6 pb-4 text-xs ${
                currentMode === 'light' ? 'text-gray-500' : 'text-gray-400'
              }`}
            >
              {prompt.length}/2000 characters
            </motion.div>
          )}
        </motion.div>

        {/* Floating Suggestions */}
        {isFocused && !prompt && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full left-0 right-0 mt-4"
          >
            <div className={`backdrop-blur-md rounded-2xl shadow-lg border p-6 ${
              currentMode === 'light' 
                ? 'bg-white/20 border-white/30' 
                : 'bg-gray-900/20 border-gray-700/30'
            }`}>
              <div className="flex items-center space-x-2 mb-4">
                <Zap size={16} className={currentThemeConfig.text} />
                <div className={`text-sm font-semibold ${
                  currentMode === 'light' ? 'text-gray-700' : 'text-gray-200'
                }`}>
                  Try asking for:
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  "A user dashboard with analytics",
                  "Product requirements for mobile app",
                  "API documentation generator",
                  "Team collaboration workspace",
                  "Analyze uploaded file",
                  "Create user flow diagrams"
                ].map((suggestion, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setPrompt(suggestion)}
                    className={`px-4 py-3 text-sm rounded-xl transition-all duration-300 text-left border ${
                      currentMode === 'light'
                        ? 'bg-gray-50/50 hover:bg-gray-100/50 border-gray-200/50 hover:border-gray-300/50 text-gray-700 hover:text-gray-800'
                        : 'bg-gray-800/50 hover:bg-gray-700/50 border-gray-600/50 hover:border-gray-500/50 text-gray-200 hover:text-gray-100'
                    }`}
                  >
                    {suggestion}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </form>

      {/* Enhanced Popup for unauthenticated users */}
      {showPopup && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center z-50 bg-black/20 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`rounded-3xl shadow-2xl p-8 w-96 relative border ${
              currentMode === 'light' 
                ? 'bg-white border-gray-200' 
                : 'bg-gray-800 border-gray-700'
            }`}
          >
            <button
              onClick={() => setShowPopup(false)}
              className={`absolute top-4 right-4 transition-colors duration-300 ${
                currentMode === 'light' ? 'text-gray-400 hover:text-gray-600' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              <X size={24} />
            </button>

            <motion.div 
              className="flex justify-center mb-6"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${currentThemeConfig.primary} rounded-2xl flex items-center justify-center shadow-lg`}>
                <Heart size={32} className="text-white" />
              </div>
            </motion.div>

            <h2 className={`text-3xl font-bold text-center mb-4 ${
              currentMode === 'light' ? 'text-gray-800' : 'text-gray-200'
            }`}>
              Join and start building
            </h2>
            <p className={`text-center mb-8 leading-relaxed ${
              currentMode === 'light' ? 'text-gray-600' : 'text-gray-300'
            }`}>
              Log in or create a free account to start building your dream
              application with AI-powered insights
            </p>

            <div className="flex flex-col space-y-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push("/signin")}
                className={`w-full py-4 bg-gradient-to-r ${currentThemeConfig.primary} text-white rounded-xl hover:bg-gradient-to-r ${currentThemeConfig.accent} font-semibold transition-all duration-300 shadow-lg`}
              >
                Sign in
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push("/signup")}
                className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 ${
                  currentMode === 'light'
                    ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    : 'bg-gray-800 text-gray-200 hover:bg-gray-700'
                }`}
              >
                Sign up
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};
