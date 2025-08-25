"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { SearchBar } from "./SearchBar/page";
import { motion } from "framer-motion";
import GradientPalette from "./GradientPalette";
import Sidebar from "./components/Sidebar"; // Import the new Sidebar component
import { themes } from './utils/themes'; // Import themes from the new utility file
import { 
  IconHeart, 
  IconX, 
  IconSparkles, 
  IconRocket, 
  IconBrain, 
  IconBolt,
  IconMessage,
  IconPlus,
  IconRobot,
  IconChartBar,
  IconHistory,
  IconSettings,
  IconUser,
  IconLogout,
  IconSun,
  IconMoon,
  IconPalette,
  IconChevronDown
} from "@tabler/icons-react";
import { apiService } from '../lib/api';

export default function Home() {
  const { data: session } = useSession();
  const [prompt, setPrompt] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [theme, setTheme] = useState("blue");
  const [mode, setMode] = useState("light");
  // const [showThemeMenu, setShowThemeMenu] = useState(false); // Moved to Sidebar component

  // State for dynamic chat history
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoadingChatHistory, setIsLoadingChatHistory] = useState(true);

  // Fetch chat history from backend
  useEffect(() => {
    const fetchChatHistory = async () => {
      if (!session) {
        setChatHistory([]);
        setIsLoadingChatHistory(false);
        return;
      }

      setIsLoadingChatHistory(true);
      try {
        // Fetch recent refinements from backend
        const recentRefinements = await apiService.getRecentRefinements(5);
        
        // Transform backend data to chat history format
        const transformedHistory = recentRefinements.map((refinement, index) => ({
          id: refinement.session_id,
          title: refinement.result?.refined_requirement?.substring(0, 50) + '...' || `Analysis ${index + 1}`,
          date: new Date(refinement.created_at).toLocaleDateString(),
          status: refinement.status,
          result: refinement.result
        }));
        
        setChatHistory(transformedHistory);
      } catch (error) {
        console.error('Failed to fetch chat history:', error);
        // Fallback to mock data if backend is unavailable
        setChatHistory([
          { id: 1, title: "Dashboard Requirements", date: "2 hours ago", status: "completed" },
          { id: 2, title: "Mobile App Analysis", date: "1 day ago", status: "completed" },
          { id: 3, title: "API Documentation", date: "3 days ago", status: "completed" },
          { id: 4, title: "User Flow Design", date: "1 week ago", status: "completed" },
        ]);
      } finally {
        setIsLoadingChatHistory(false);
      }
    };

    fetchChatHistory();
  }, [session]);

  // Theme configurations - now imported from utils/themes.js
  // const themes = {
  //   blue: {
  //     primary: "from-blue-500 to-indigo-600",
  //     secondary: "from-blue-400 to-indigo-500",
  //     accent: "from-blue-600 to-indigo-700",
  //     light: "from-slate-50 via-blue-50 to-indigo-50",
  //     dark: "from-slate-900 via-blue-900 to-indigo-900",
  //     text: "text-blue-600",
  //     hover: "hover:text-blue-600",
  //     bg: "bg-blue-50",
  //     border: "border-blue-200"
  //   },
  //   // ... other themes ...
  // };

  const currentTheme = themes[theme];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!session) {
      setShowPopup(true);
    } else {
      alert(
        `Proceeding with multiagent product requirement analysis: ${prompt}`
      );
      setPrompt("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${mode === 'light' ? currentTheme.light : currentTheme.dark} flex transition-all duration-500`}>
      {/* Conditional Sidebar */}
      {session && (
        <Sidebar 
          sidebarOpen={sidebarOpen} 
          currentThemeName={theme} 
          mode={mode} 
          chatHistory={chatHistory} 
          onThemeChange={setTheme}
          onModeChange={setMode}
        />
      )}

      {/* Main Content */}
      <div className={`flex-1 flex flex-col ${session && sidebarOpen ? 'ml-80' : ''} transition-all duration-300`}> {/* Adjusted margin for sidebar */}
        {/* Header */}
        <header className={`${mode === 'light' ? 'bg-white/80' : 'bg-gray-900/80'} backdrop-blur-sm border-b ${mode === 'light' ? 'border-gray-200/50' : 'border-gray-700/50'} flex justify-between items-center px-6 py-4`}>
          <div className="flex items-center space-x-4">
            {session && ( // Show sidebar toggle only if logged in
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className={`p-2 rounded-lg ${mode === 'light' ? 'hover:bg-gray-100' : 'hover:bg-gray-800'} transition-colors`}
              >
                <IconSettings size={20} className={mode === 'light' ? 'text-gray-600' : 'text-gray-300'} />
              </motion.button>
            )}
            <h2 className={`text-lg font-semibold ${mode === 'light' ? 'text-gray-700' : 'text-gray-200'}`}>Dashboard</h2>
          </div>
          
          {/* Theme Controls - now only for unauthenticated state or if sidebar is closed */}
          {!session || !sidebarOpen ? (
            <div className="flex items-center space-x-3">
              {/* Mode Toggle */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
                className={`p-2 rounded-lg ${mode === 'light' ? 'bg-gray-100 hover:bg-gray-200' : 'bg-gray-800 hover:bg-gray-700'} transition-colors`}
              >
                {mode === 'light' ? (
                  <IconMoon size={20} className="text-gray-600" />
                ) : (
                  <IconSun size={20} className="text-gray-300" />
                )}
              </motion.button>

              {/* Removed redundant Theme Selector from header. Main theme control is via GradientPalette,
                  and a secondary one is in the Sidebar when it's open. */}
            </div>
          ) : null } {/* End of Theme Controls for unauthenticated/sidebar closed */}
          
          <div className="flex space-x-3">
            {!session && (
              <>
              
                <Link href="/signup">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    className={`px-6 py-2 border ${mode === 'light' ? 'border-gray-300 text-gray-700 hover:bg-gray-50' : 'border-gray-600 text-gray-200 hover:bg-gray-800'} transition-all duration-300 font-medium rounded-lg`}
                  >
                    Sign up
                  </motion.button>
                </Link>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  onClick={() => signIn()}
                  className={`px-6 py-2 bg-gradient-to-r ${currentTheme.primary} text-white rounded-lg hover:bg-gradient-to-r ${currentTheme.accent} transition-all duration-300 shadow-md font-medium`}
                >
                  Get started
                </motion.button>
              </>
            )}
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20">
          <div className="max-w-5xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className={`text-5xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r ${mode === 'light' ? 'from-gray-800 via-blue-700 to-indigo-800' : 'from-gray-100 via-blue-300 to-indigo-300'} leading-tight`}
            >
              Build something
              <span className={`block text-transparent bg-clip-text bg-gradient-to-r ${currentTheme.primary}`}>
                ReqAI
              </span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={`text-xl md:text-2xl mb-16 ${mode === 'light' ? 'text-gray-600' : 'text-gray-300'} max-w-3xl mx-auto leading-relaxed`}
            >
              Create beautiful multiagent product requirements and analyses by
              chatting with AI. Enhanced for professional workflows.
            </motion.p>

            {/* Search Bar Container */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative mb-20"
            >
                          <div className={`${mode === 'light' ? 'bg-white/20' : 'bg-gray-800/20'} backdrop-blur-md rounded-2xl shadow-xl border ${mode === 'light' ? 'border-gray-100/30' : 'border-gray-700/30'} p-2 max-w-2xl mx-auto`}>
              <SearchBar currentTheme={theme} currentMode={mode} />
            </div>
            </motion.div>

            {/* Feature Cards */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid md:grid-cols-3 gap-8"
            >
              {[
                {
                  icon: IconBrain,
                  title: "AI-Powered Analysis",
                  description: "Advanced multiagent systems for comprehensive requirement analysis",
                  gradient: "from-purple-500 to-pink-500"
                },
                {
                  icon: IconRocket,
                  title: "Lightning Fast",
                  description: "Real-time processing and instant insights for your projects",
                  gradient: "from-blue-500 to-cyan-500"
                },
                {
                  icon: IconBolt,
                  title: "Smart Automation",
                  description: "Automated workflows that adapt to your team's needs",
                  gradient: "from-green-500 to-emerald-500"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className={`${mode === 'light' ? 'bg-white' : 'bg-gray-800'} rounded-2xl p-8 text-center shadow-lg border ${mode === 'light' ? 'border-gray-100' : 'border-gray-700'} hover:shadow-xl transition-all duration-500 group`}
                  whileHover={{ 
                    scale: 1.02,
                    y: -5
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div
                    className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                    whileHover={{ rotate: 5 }}
                  >
                    <feature.icon size={32} className="text-white" />
                  </motion.div>
                  <h3 className={`text-xl font-bold ${mode === 'light' ? 'text-gray-800' : 'text-gray-200'} mb-4`}>{feature.title}</h3>
                  <p className={`${mode === 'light' ? 'text-gray-600' : 'text-gray-300'} leading-relaxed`}>{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </main>

        {/* Footer */}
        <footer className={`${mode === 'light' ? 'bg-white/80' : 'bg-gray-900/80'} backdrop-blur-sm border-t ${mode === 'light' ? 'border-gray-200/50' : 'border-gray-700/50'} py-8`}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`w-8 h-8 bg-gradient-to-r ${currentTheme.primary} rounded-lg flex items-center justify-center`}>
                    <IconSparkles size={20} className="text-white" />
                  </div>
                  <h3 className={`text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r ${currentTheme.primary}`}>
                    ReqAI
                  </h3>
                </div>
                <p className={`${mode === 'light' ? 'text-gray-600' : 'text-gray-300'} text-sm`}>
                  Empowering teams with AI-driven requirement analysis and product development.
                </p>
              </div>
              
              <div>
                <h4 className={`font-semibold ${mode === 'light' ? 'text-gray-800' : 'text-gray-200'} mb-4`}>Product</h4>
                <ul className={`space-y-2 text-sm ${mode === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                  <li><a href="#" className={`${currentTheme.hover} transition-colors`}>Features</a></li>
                  <li><a href="#" className={`${currentTheme.hover} transition-colors`}>Pricing</a></li>
                  <li><a href="#" className={`${currentTheme.hover} transition-colors`}>API</a></li>
                  <li><a href="#" className={`${currentTheme.hover} transition-colors`}>Integrations</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className={`font-semibold ${mode === 'light' ? 'text-gray-800' : 'text-gray-200'} mb-4`}>Company</h4>
                <ul className={`space-y-2 text-sm ${mode === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                  <li><a href="#" className={`${currentTheme.hover} transition-colors`}>About</a></li>
                  <li><a href="#" className={`${currentTheme.hover} transition-colors`}>Blog</a></li>
                  <li><a href="#" className={`${currentTheme.hover} transition-colors`}>Careers</a></li>
                  <li><a href="#" className={`${currentTheme.hover} transition-colors`}>Contact</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className={`font-semibold ${mode === 'light' ? 'text-gray-800' : 'text-gray-200'} mb-4`}>Support</h4>
                <ul className={`space-y-2 text-sm ${mode === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                  <li><a href="#" className={`${currentTheme.hover} transition-colors`}>Help Center</a></li>
                  <li><a href="#" className={`${currentTheme.hover} transition-colors`}>Documentation</a></li>
                  <li><a href="#" className={`${currentTheme.hover} transition-colors`}>Community</a></li>
                  <li><a href="#" className={`${currentTheme.hover} transition-colors`}>Status</a></li>
                </ul>
              </div>
            </div>
            
            <div className={`border-t ${mode === 'light' ? 'border-gray-200/50' : 'border-gray-700/50'} mt-8 pt-8 flex flex-col md:flex-row justify-between items-center`}>
              <p className={`text-sm ${mode === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                © 2024 ReqAI. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className={`text-sm ${mode === 'light' ? 'text-gray-600' : 'text-gray-300'} ${currentTheme.hover} transition-colors`}>Privacy</a>
                <a href="#" className={`text-sm ${mode === 'light' ? 'text-gray-600' : 'text-gray-300'} ${currentTheme.hover} transition-colors`}>Terms</a>
                <a href="#" className={`text-sm ${mode === 'light' ? 'text-gray-600' : 'text-gray-300'} ${currentTheme.hover} transition-colors`}>Cookies</a>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* Enhanced Popup */}
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
            className={`${mode === 'light' ? 'bg-white' : 'bg-gray-800'} rounded-3xl shadow-2xl p-8 w-96 relative border ${mode === 'light' ? 'border-gray-100' : 'border-gray-700'}`}
          >
            <button
              onClick={() => setShowPopup(false)}
              className={`absolute top-4 right-4 ${mode === 'light' ? 'text-gray-400 hover:text-gray-600' : 'text-gray-500 hover:text-gray-300'} transition-colors duration-300`}
            >
              <IconX size={24} />
            </button>
            <motion.div 
              className="flex justify-center mb-6"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${currentTheme.primary} rounded-2xl flex items-center justify-center shadow-lg`}>
                <IconHeart size={32} className="text-white" />
              </div>
            </motion.div>
            <h2 className={`text-3xl font-bold text-center mb-4 ${mode === 'light' ? 'text-gray-800' : 'text-gray-200'}`}>
              Join and start building
            </h2>
            <p className={`text-center ${mode === 'light' ? 'text-gray-600' : 'text-gray-300'} mb-8 leading-relaxed`}>
              Log in or create a free account to start building your dream
              application with AI-powered insights
            </p>
            <Link href="/signup">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-4 bg-gradient-to-r ${currentTheme.primary} text-white rounded-xl hover:bg-gradient-to-r ${currentTheme.accent} font-semibold transition-all duration-300 shadow-lg`}
              >
                Sign up now
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      )}

      {/* Gradient Palette Component */}
      <GradientPalette
        onThemeChange={setTheme}
        onModeChange={setMode}
        currentTheme={theme}
        currentMode={mode}
      />
    </div>
  );
}
