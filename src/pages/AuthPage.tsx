import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import LoginForm from "@/components/auth/LoginForm";
import SignupForm from "@/components/auth/SignupForm";

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a1a] px-4 py-12 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-violet-600/15 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-600/15 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-violet-500/5 rounded-full blur-[100px]" />
      </div>

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md"
      >
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg shadow-violet-500/25">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white">
            SiteForge<span className="text-violet-400"> AI</span>
          </span>
        </Link>

        {/* Glass Card */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8 shadow-2xl shadow-black/20">
          {/* Tabs */}
          <div className="flex rounded-xl bg-white/[0.03] border border-white/[0.06] p-1 mb-8">
            <button
              onClick={() => setActiveTab("login")}
              className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                activeTab === "login"
                  ? "bg-white/10 text-white shadow-sm"
                  : "text-gray-500 hover:text-gray-300"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setActiveTab("signup")}
              className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                activeTab === "signup"
                  ? "bg-white/10 text-white shadow-sm"
                  : "text-gray-500 hover:text-gray-300"
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Forms */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: activeTab === "login" ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === "login" ? <LoginForm /> : <SignupForm />}
          </motion.div>
        </div>

        {/* Bottom text */}
        <p className="text-center text-xs text-gray-600 mt-6">
          By continuing, you agree to our{" "}
          <a href="#terms" className="text-violet-400 hover:text-violet-300">
            Terms
          </a>{" "}
          and{" "}
          <a href="#privacy" className="text-violet-400 hover:text-violet-300">
            Privacy Policy
          </a>
        </p>
      </motion.div>
    </div>
  );
}
