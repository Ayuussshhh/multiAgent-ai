"use client";

import { useState, useEffect } from "react";
import { Palette, X, Sparkles, Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function GradientPalette({ onThemeChange, onModeChange, currentTheme, currentMode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Comprehensive gradient themes - Fixed and improved
  const gradientThemes = {
    blue: {
      name: "Ocean Blue",
      gradients: [
        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
        "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      ],
      primary: "from-blue-500 to-indigo-600",
      accent: "from-blue-400 to-indigo-500"
    },
    purple: {
      name: "Royal Purple",
      gradients: [
        "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
        "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
      ],
      primary: "from-purple-500 to-pink-600",
      accent: "from-purple-400 to-pink-500"
    },
    green: {
      name: "Emerald Forest",
      gradients: [
        "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
        "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
      ],
      primary: "from-green-500 to-emerald-600",
      accent: "from-green-400 to-emerald-500"
    },
    orange: {
      name: "Sunset Orange",
      gradients: [
        "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
        "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
        "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
        "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)"
      ],
      primary: "from-orange-500 to-red-600",
      accent: "from-orange-400 to-red-500"
    },
    teal: {
      name: "Ocean Teal",
      gradients: [
        "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
        "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
        "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      ],
      primary: "from-teal-500 to-cyan-600",
      accent: "from-teal-400 to-cyan-500"
    },
    pink: {
      name: "Rose Pink",
      gradients: [
        "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
        "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
        "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      ],
      primary: "from-pink-500 to-rose-600",
      accent: "from-pink-400 to-rose-500"
    },
    gold: {
      name: "Golden Hour",
      gradients: [
        "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
        "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
        "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
        "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)"
      ],
      primary: "from-yellow-500 to-orange-600",
      accent: "from-yellow-400 to-orange-500"
    },
    midnight: {
      name: "Midnight Blue",
      gradients: [
        "linear-gradient(135deg, #2c3e50 0%, #34495e 100%)",
        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
        "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)"
      ],
      primary: "from-slate-700 to-slate-900",
      accent: "from-slate-600 to-slate-800"
    }
  };

  const handleThemeChange = (themeName) => {
    if (onThemeChange) {
      onThemeChange(themeName);
    }
  };

  const handleModeChange = () => {
    if (onModeChange) {
      onModeChange(currentMode === 'light' ? 'dark' : 'light');
    }
  };

  return (
    <>
      {/* Floating Palette Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`fixed bottom-6 right-6 p-4 rounded-full shadow-lg z-50 transition-all duration-300 ${
          currentMode === 'light' 
            ? 'bg-white hover:bg-gray-50 border border-gray-200' 
            : 'bg-gray-800 hover:bg-gray-700 border border-gray-600'
        }`}
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <Palette size={24} className={currentMode === 'light' ? 'text-gray-700' : 'text-gray-200'} />
      </motion.button>

      {/* Backdrop */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Right Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className={`fixed top-0 right-0 h-full w-80 ${
              currentMode === 'light' ? 'bg-white' : 'bg-gray-900'
            } shadow-2xl z-50 border-l ${
              currentMode === 'light' ? 'border-gray-200' : 'border-gray-700'
            }`}
          >
            {/* Header */}
            <div className={`p-6 border-b ${
              currentMode === 'light' ? 'border-gray-200' : 'border-gray-700'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 bg-gradient-to-r ${gradientThemes[currentTheme]?.primary || gradientThemes.blue.primary} rounded-xl flex items-center justify-center`}>
                    <Sparkles size={20} className="text-white" />
                  </div>
                  <h2 className={`text-xl font-bold ${
                    currentMode === 'light' ? 'text-gray-800' : 'text-gray-200'
                  }`}>
                    Theme Studio
                  </h2>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSidebarOpen(false)}
                  className={`p-2 rounded-lg ${
                    currentMode === 'light' ? 'hover:bg-gray-100' : 'hover:bg-gray-800'
                  } transition-colors`}
                >
                  <X size={20} className={currentMode === 'light' ? 'text-gray-600' : 'text-gray-300'} />
                </motion.button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-8 overflow-y-auto h-full">
              {/* Mode Toggle */}
              <div>
                <h3 className={`text-sm font-semibold mb-4 ${
                  currentMode === 'light' ? 'text-gray-700' : 'text-gray-300'
                }`}>
                  APPEARANCE
                </h3>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleModeChange}
                  className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all duration-300 ${
                    currentMode === 'light' 
                      ? 'bg-gray-50 border-gray-200 hover:bg-gray-100' 
                      : 'bg-gray-800 border-gray-600 hover:bg-gray-700'
                  }`}
                >
                  <span className={`font-medium ${
                    currentMode === 'light' ? 'text-gray-700' : 'text-gray-200'
                  }`}>
                    {currentMode === 'light' ? 'Light Mode' : 'Dark Mode'}
                  </span>
                  {currentMode === 'light' ? (
                    <Sun size={20} className="text-yellow-500" />
                  ) : (
                    <Moon size={20} className="text-blue-400" />
                  )}
                </motion.button>
              </div>

              {/* Theme Selection */}
              <div>
                <h3 className={`text-sm font-semibold mb-4 ${
                  currentMode === 'light' ? 'text-gray-700' : 'text-gray-300'
                }`}>
                  COLOR THEMES
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {Object.entries(gradientThemes).map(([themeName, theme]) => (
                    <motion.button
                      key={themeName}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleThemeChange(themeName)}
                      className={`relative p-4 rounded-xl border transition-all duration-300 ${
                        currentTheme === themeName
                          ? 'ring-2 ring-blue-500 ring-offset-2'
                          : currentMode === 'light'
                            ? 'bg-white border-gray-200 hover:bg-gray-50'
                            : 'bg-gray-800 border-gray-600 hover:bg-gray-700'
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        {/* Gradient Preview */}
                        <div className="w-16 h-16 rounded-lg overflow-hidden">
                          <div 
                            className="w-full h-full"
                            style={{ background: theme.gradients[0] }}
                          />
                        </div>
                        
                        {/* Theme Info */}
                        <div className="flex-1 text-left">
                          <h4 className={`font-semibold ${
                            currentMode === 'light' ? 'text-gray-800' : 'text-gray-200'
                          }`}>
                            {theme.name}
                          </h4>
                          <p className={`text-sm ${
                            currentMode === 'light' ? 'text-gray-500' : 'text-gray-400'
                          }`}>
                            {theme.gradients.length} gradients available
                          </p>
                        </div>

                        {/* Active Indicator */}
                        {currentTheme === themeName && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className={`w-6 h-6 rounded-full bg-gradient-to-r ${theme.primary} flex items-center justify-center`}
                          >
                            <div className="w-2 h-2 bg-white rounded-full" />
                          </motion.div>
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Gradient Preview */}
              {gradientThemes[currentTheme] && (
                <div>
                  <h3 className={`text-sm font-semibold mb-4 ${
                    currentMode === 'light' ? 'text-gray-700' : 'text-gray-300'
                  }`}>
                    GRADIENT PREVIEW
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {gradientThemes[currentTheme].gradients.map((gradient, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        className="h-20 rounded-lg cursor-pointer shadow-md"
                        style={{ background: gradient }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
