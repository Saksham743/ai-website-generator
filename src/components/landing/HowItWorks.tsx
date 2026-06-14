import { motion } from "framer-motion";
import { MessageSquare, Wand2, Rocket, ArrowRight, Sparkles } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: MessageSquare,
    title: "Describe Your Website",
    description: "Write a prompt describing the website you want. Be as detailed or as brief as you like — our AI fills in the gaps.",
    details: ["Natural language input", "Supports multiple languages", "Add images for reference"],
  },
  {
    step: "02",
    icon: Wand2,
    title: "AI Generates Code",
    description: "Our advanced AI model generates clean, responsive code based on your description. Watch it build in real-time.",
    details: ["Clean, semantic HTML", "Modern CSS with Tailwind", "Responsive by default"],
  },
  {
    step: "03",
    icon: Rocket,
    title: "Preview & Export",
    description: "See your website live, make adjustments, and export the complete code. Deploy anywhere you want.",
    details: ["Live preview panel", "One-click code export", "Deploy to any platform"],
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-24 sm:py-32">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-950/10 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
            How It Works
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Three Simple Steps to{" "}
            <span className="bg-gradient-to-r from-violet-400 to-indigo-300 bg-clip-text text-transparent">
              Launch
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Building a website has never been this easy. Here's how it works in three simple steps.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Timeline line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-violet-500/50 via-indigo-500/50 to-transparent" />

          <div className="space-y-12 lg:space-y-0">
            {steps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`relative flex flex-col lg:flex-row items-center gap-8 lg:gap-16 ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
              >
                {/* Timeline dot */}
                <div className="hidden lg:flex absolute left-1/2 top-8 -translate-x-1/2 z-10">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 shadow-lg shadow-violet-500/25 ring-4 ring-[#0a0a1a]">
                    <step.icon className="h-6 w-6 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className={`flex-1 ${index % 2 === 0 ? "lg:text-right lg:pr-20" : "lg:text-left lg:pl-20"}`}>
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-violet-300 mb-3">
                    Step {step.step}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-gray-400 mb-4 leading-relaxed">{step.description}</p>
                  <ul className={`space-y-2 ${index % 2 === 0 ? "lg:justify-end" : ""} flex flex-wrap gap-2`}>
                    {step.details.map((detail) => (
                      <li
                        key={detail}
                        className="inline-flex items-center gap-1.5 text-xs text-gray-500 bg-white/[0.03] border border-white/[0.06] rounded-full px-3 py-1"
                      >
                        <ArrowRight className="h-3 w-3 text-violet-500" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Spacer for the other side */}
                <div className="flex-1 hidden lg:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
