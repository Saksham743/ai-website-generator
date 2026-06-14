import { motion } from "framer-motion";
import { MessageSquare, Eye, Download, Zap, Sparkles, Code } from "lucide-react";

const features = [
  {
    icon: MessageSquare,
    title: "Prompt to Website",
    description: "Simply describe the website you want in natural language. Our AI understands your vision and brings it to life.",
    iconColor: "text-violet-400",
    bgColor: "bg-violet-500/10",
  },
  {
    icon: Eye,
    title: "Live Preview",
    description: "See your website come to life in real-time as the AI generates code. Instant visual feedback on every change.",
    iconColor: "text-indigo-400",
    bgColor: "bg-indigo-500/10",
  },
  {
    icon: Download,
    title: "Export Code",
    description: "Download clean, production-ready HTML, CSS, and JavaScript. No lock-in — the code is yours to keep.",
    iconColor: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
  },
  {
    icon: Zap,
    title: "Fast Generation",
    description: "Go from idea to fully functional website in under 60 seconds. Built on optimized AI models for speed.",
    iconColor: "text-amber-400",
    bgColor: "bg-amber-500/10",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Features() {
  return (
    <section id="features" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/5 px-3 py-1 text-xs text-violet-300 mb-4">
            <Sparkles className="h-3 w-3" />
            Features
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Everything You Need to{" "}
            <span className="bg-gradient-to-r from-violet-400 to-indigo-300 bg-clip-text text-transparent">
              Build Fast
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Powerful AI tools that turn your ideas into fully responsive, modern websites in minutes.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={item}
              className="group relative rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 hover:bg-white/[0.04] hover:border-white/[0.15] transition-all duration-300"
            >
              <div
                className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${feature.bgColor} mb-4 ring-1 ring-white/5`}
              >
                <feature.icon className={`h-6 w-6 ${feature.iconColor}`} />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{feature.description}</p>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.02] px-6 py-4">
            <Code className="h-5 w-5 text-violet-400" />
            <span className="text-sm text-gray-400">
              Supports HTML, CSS, JavaScript, React, Tailwind CSS, and more
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
