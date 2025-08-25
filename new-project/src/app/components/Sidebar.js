"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  IconSparkles, 
  IconMessage,
  IconPlus,
  IconRobot,
  IconChartBar,
  IconUser,
  IconLogout,
  IconSun,
  IconMoon,
  IconPalette,
  IconChevronDown
} from "@tabler/icons-react";
import { useState } from "react";

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

export default function Sidebar({ sidebarOpen, currentThemeName, mode, chatHistory, onThemeChange, onModeChange }) {
    const { data: session } = useSession();
    const [showThemeMenu, setShowThemeMenu] = useState(false);
    const currentTheme = themes[currentThemeName];

    return (
        <motion.div 
            initial={{ x: -300 }}
            animate={{ x: sidebarOpen ? 0 : -300 }}
            transition={{ duration: 0.3 }}
            className={`w-80 ${mode === 'light' ? 'bg-white/80' : 'bg-gray-900/80'} backdrop-blur-md border-r ${mode === 'light' ? 'border-gray-200/50' : 'border-gray-700/50'} flex flex-col fixed h-full z-40`}
        >
            {/* Sidebar Header */}
            <div className={`p-6 border-b ${mode === 'light' ? 'border-gray-200/50' : 'border-gray-700/50'}`}>
                <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 bg-gradient-to-r ${currentTheme.primary} rounded-xl flex items-center justify-center shadow-lg`}>
                        <IconSparkles size={24} className="text-white" />
                    </div>
                    <h1 className={`text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${currentTheme.primary}`}>
                        ReqAI
                    </h1>
                </div>
            </div>

            {/* New Chat Button */}
            <div className="p-4">
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 bg-gradient-to-r ${currentTheme.primary} text-white rounded-xl hover:bg-gradient-to-r ${currentTheme.accent} transition-all duration-300 shadow-md font-medium`}
                >
                    <IconPlus size={20} />
                    <span>New Chat</span>
                </motion.button>
            </div>

            {/* Navigation */}
            <div className="flex-1 px-4 space-y-2 overflow-y-auto">
                <div className={`text-xs font-semibold ${mode === 'light' ? 'text-gray-500' : 'text-gray-400'} uppercase tracking-wider mb-3 px-2`}>
                    Quick Actions
                </div>
                
                <Link href="/platform" passHref>
                  <motion.div
                      whileHover={{ scale: 1.02 }}
                      className={`flex items-center space-x-3 px-3 py-2 rounded-lg ${mode === 'light' ? 'hover:bg-blue-50' : 'hover:bg-gray-800'} transition-colors cursor-pointer`}
                  >
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                          <IconRobot size={18} className="text-white" />
                      </div>
                      <span className={`${mode === 'light' ? 'text-gray-700' : 'text-gray-200'} font-medium`}>Agent Workflow</span>
                  </motion.div>
                </Link>

                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg ${mode === 'light' ? 'hover:bg-blue-50' : 'hover:bg-gray-800'} transition-colors cursor-pointer`}
                >
                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                        <IconChartBar size={18} className="text-white" />
                    </div>
                    <span className={`${mode === 'light' ? 'text-gray-700' : 'text-gray-200'} font-medium`}>Analysis Dashboard</span>
                </motion.div>

                <div className={`text-xs font-semibold ${mode === 'light' ? 'text-gray-500' : 'text-gray-400'} uppercase tracking-wider mb-3 px-2 mt-6`}>
                    Recent Chats
                </div>

                {chatHistory.map((chat) => (
                    <motion.div
                        key={chat.id}
                        whileHover={{ scale: 1.02 }}
                        className={`flex items-center space-x-3 px-3 py-2 rounded-lg ${mode === 'light' ? 'hover:bg-gray-50' : 'hover:bg-gray-800'} transition-colors cursor-pointer group`}
                    >
                        <div className="w-8 h-8 bg-gradient-to-r from-gray-400 to-gray-500 rounded-lg flex items-center justify-center">
                            <IconMessage size={16} className="text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className={`text-sm font-medium ${mode === 'light' ? 'text-gray-700' : 'text-gray-200'} truncate`}>{chat.title}</div>
                            <div className={`text-xs ${mode === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>{chat.date}</div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Sidebar Footer */}
            <div className={`p-4 border-t ${mode === 'light' ? 'border-gray-200/50' : 'border-gray-700/50'}`}>
                {session ? (
                    <div className="space-y-2">
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className={`flex items-center space-x-3 px-3 py-2 rounded-lg ${mode === 'light' ? 'hover:bg-gray-50' : 'hover:bg-gray-800'} transition-colors cursor-pointer`}
                        >
                            <div className={`w-8 h-8 bg-gradient-to-r ${currentTheme.primary} rounded-lg flex items-center justify-center`}>
                                <IconUser size={18} className="text-white" />
                            </div>
                            <div className="flex-1">
                                <div className={`text-sm font-medium ${mode === 'light' ? 'text-gray-700' : 'text-gray-200'}`}>{session.user?.name || 'User'}</div>
                                <div className={`text-xs ${mode === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>{session.user?.email}</div>
                            </div>
                        </motion.div>
                        
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            onClick={() => signOut({ callbackUrl: "/" })}
                            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg ${mode === 'light' ? 'hover:bg-red-50' : 'hover:bg-red-900/20'} transition-colors text-red-600`}
                        >
                            <IconLogout size={18} />
                            <span className="text-sm font-medium">Sign Out</span>
                        </motion.button>
                    </div>
                ) : (
                    <div className="space-y-2">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            onClick={() => signIn()}
                            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg ${mode === 'light' ? 'hover:bg-blue-50' : 'hover:bg-blue-900/20'} transition-colors ${currentTheme.text}`}
                        >
                            <IconUser size={18} />
                            <span className="text-sm font-medium">Sign In</span>
                        </motion.button>
                    </div>
                )}

                {/* Theme and Mode Controls for Sidebar Footer */}
                <div className="mt-4 flex justify-between items-center">
                    {/* Mode Toggle */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onModeChange(mode === 'light' ? 'dark' : 'light')}
                        className={`p-2 rounded-lg ${mode === 'light' ? 'bg-gray-100 hover:bg-gray-200' : 'bg-gray-800 hover:bg-gray-700'} transition-colors`}
                    >
                        {mode === 'light' ? (
                            <IconMoon size={20} className="text-gray-600" />
                        ) : (
                            <IconSun size={20} className="text-gray-300" />
                        )}
                    </motion.button>

                    {/* Theme Selector */}
                    <div className="relative">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setShowThemeMenu(!showThemeMenu)}
                            className={`p-2 rounded-lg ${mode === 'light' ? 'bg-gray-100 hover:bg-gray-200' : 'bg-gray-800 hover:bg-gray-700'} transition-colors flex items-center space-x-2`}
                        >
                            <IconPalette size={20} className={mode === 'light' ? 'text-gray-600' : 'text-gray-300'} />
                            <IconChevronDown size={16} className={mode === 'light' ? 'text-gray-600' : 'text-gray-300'} />
                        </motion.button>

                        {/* Theme Menu */}
                        {showThemeMenu && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`absolute right-0 bottom-full mb-2 w-48 ${mode === 'light' ? 'bg-white' : 'bg-gray-800'} rounded-xl shadow-lg border ${mode === 'light' ? 'border-gray-200' : 'border-gray-700'} p-2 z-50`}
                            >
                                {Object.entries(themes).map(([themeName, themeConfig]) => (
                                    <motion.button
                                        key={themeName}
                                        whileHover={{ scale: 1.02 }}
                                        onClick={() => {
                                            onThemeChange(themeName);
                                            setShowThemeMenu(false);
                                        }}
                                        className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                                            currentThemeName === themeName 
                                                ? `${mode === 'light' ? 'bg-blue-50' : 'bg-blue-900/20'} ${themeConfig.text}`
                                                : `${mode === 'light' ? 'hover:bg-gray-50' : 'hover:bg-gray-700'} ${mode === 'light' ? 'text-gray-700' : 'text-gray-200'}`
                                        }`}
                                    >
                                        <div className={`w-4 h-4 bg-gradient-to-r ${themeConfig.primary} rounded-full`}></div>
                                        <span className="capitalize font-medium">{themeName}</span>
                                    </motion.button>
                                ))}
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
