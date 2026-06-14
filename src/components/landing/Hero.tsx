import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Zap, Code, Eye } from "lucide-react";
import Button from "@/components/ui/Button";

export default function Hero() {
  const navigate = useNavigate();

  const floatingIcons = [
    { icon: Code, delay: 0, x: "10%", y: "20%" },
    { icon: Eye, delay: 0.5, x: "80%", y: "15%" },
    { icon: Sparkles, delay: 1, x: "15%", y: "70%" },
    { icon: Zap, delay: 1.5, x: "75%", y: "65%" },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-[128px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[128px] animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-500/5 rounded-full blur-[100px]" />
      </div>

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />

      {/* Floating Icons */}
      {floatingIcons.map(({ icon: Icon, delay, x, y }) => (
        <motion.div
          key={`${x}-${y}`}
          className="absolute hidden lg:block"
          style={{ left: x, top: y }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 6,
            delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.05] border border-white/10 backdrop-blur-sm">
            <Icon className="h-5 w-5 text-violet-400" />
          </div>
        </motion.div>
      ))}

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/5 px-4 py-1.5 text-sm text-violet-300 mb-8 backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5" />
            <span>AI-Powered Website Builder</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
            Build Websites
            <br />
            with{" "}
            <span className="bg-gradient-to-r from-violet-400 via-indigo-400 to-violet-200 bg-clip-text text-transparent">
              AI
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Describe your idea and generate beautiful websites instantly. No coding
            required. Just describe, generate, and deploy.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              onClick={() => navigate("/auth")}
              className="text-base group"
            >
              <Sparkles className="h-5 w-5" />
              Generate Website
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate("/auth")}
              className="text-base"
            >
              <Eye className="h-5 w-5" />
              View Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
            {[
              { value: "50K+", label: "Websites Built" },
              { value: "10K+", label: "Developers" },
              { value: "4.9", label: "User Rating" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* AI Illustration Area */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 relative"
        >
          <div className="relative mx-auto max-w-3xl rounded-2xl border border-white/10 bg-gradient-to-br from-[#1a1a2e] to-[#0f0f23] p-1 shadow-2xl shadow-violet-500/10">
            <div className="rounded-xl overflow-hidden bg-[#0a0a1a]">
              {/* Fake Browser Chrome */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06]">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/60" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
                </div>
                <div className="flex-1 mx-4">
                  <div className="bg-white/5 rounded-lg px-4 py-1 text-xs text-gray-500 text-center">
                    app.siteforge.ai
                  </div>
                </div>
              </div>
              {/* Code Preview */}
              <div className="flex">
                <div className="w-1/2 border-r border-white/[0.06] p-4 font-mono text-xs text-gray-400 space-y-1 text-left overflow-hidden">
                  <div className="text-violet-400">&lt;!DOCTYPE html&gt;</div>
                  <div className="text-violet-400">&lt;html&gt;</div>
                  <div className="text-violet-400 pl-4">&lt;head&gt;</div>
                  <div className="text-sky-400 pl-8">&lt;title&gt;</div>
                  <div className="text-gray-300 pl-12">My Portfolio</div>
                  <div className="text-sky-400 pl-8">&lt;/title&gt;</div>
                  <div className="text-violet-400 pl-4">&lt;/head&gt;</div>
                  <div className="text-violet-400 pl-4">&lt;body&gt;</div>
                  <div className="text-violet-400 pl-8">&lt;nav</div>
                  <div className="text-sky-400 pl-12">class=</div>
                  <div className="text-emerald-400 pl-12">"navbar"</div>
                  <div className="text-violet-400 pl-8">&gt;</div>
                  <div className="text-gray-500 pl-12">...</div>
                  <div className="text-violet-400 pl-8">&lt;/nav&gt;</div>
                  <div className="text-violet-400 pl-8">&lt;section</div>
                  <div className="text-sky-400 pl-12">class=</div>
                  <div className="text-emerald-400 pl-12">"hero"</div>
                  <div className="text-violet-400 pl-8">&gt;</div>
                  <div className="text-gray-500 pl-12">...</div>
                  <motion.div
                    className="h-4 w-3/4 bg-violet-500/20 rounded ml-8"
                    animate={{ opacity: [0.4, 0.8, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
                <div className="w-1/2 p-4 flex items-center justify-center">
                  <motion.div
                    className="w-full aspect-[4/3] rounded-lg bg-gradient-to-br from-violet-900/40 to-indigo-900/40 border border-white/5 flex items-center justify-center"
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <div className="text-center">
                      <Sparkles className="h-8 w-8 text-violet-400 mx-auto mb-3" />
                      <div className="text-sm text-gray-400">Live Preview</div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>

          {/* Glow */}
          <div className="absolute -inset-4 bg-gradient-to-r from-violet-600/10 via-indigo-600/10 to-violet-600/10 blur-xl rounded-2xl -z-10" />
        </motion.div>
      </div>
    </section>
  );
}
