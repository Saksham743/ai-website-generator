import { motion } from "framer-motion";
import { Star, Quote, Sparkles } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Freelance Designer",
    company: "DesignCraft Studio",
    content: "SiteForge AI completely transformed my workflow. I can now build full portfolio sites for my clients in hours instead of days. The AI understands exactly what I need.",
    rating: 5,
    gradient: "from-violet-500/20 to-purple-500/20",
  },
  {
    name: "Marcus Rodriguez",
    role: "Startup Founder",
    company: "LaunchPad Inc",
    content: "We needed a landing page for our MVP in 24 hours. SiteForge delivered a stunning, responsive site that looked like it took a team weeks to build. Incredible tool.",
    rating: 5,
    gradient: "from-indigo-500/20 to-blue-500/20",
  },
  {
    name: "Emily Watson",
    role: "Marketing Lead",
    company: "GrowthHub",
    content: "The live preview feature is a game changer. I can iterate on designs in real-time with my team and export production-ready code immediately. Absolutely love it.",
    rating: 5,
    gradient: "from-emerald-500/20 to-teal-500/20",
  },
  {
    name: "David Park",
    role: "Full-Stack Developer",
    company: "DevForge",
    content: "As a developer, I was skeptical about AI website builders. But SiteForge generates clean, well-structured code that I can actually work with. It's now my go-to for rapid prototyping.",
    rating: 5,
    gradient: "from-amber-500/20 to-orange-500/20",
  },
  {
    name: "Jessica Li",
    role: "E-commerce Owner",
    company: "Bloom & Co.",
    content: "Built my entire online store with SiteForge. The export to clean code meant I could easily add my custom payment integrations. Saved me thousands in development costs.",
    rating: 5,
    gradient: "from-pink-500/20 to-rose-500/20",
  },
  {
    name: "Alex Thompson",
    role: "Creative Director",
    company: "PixelPerfect",
    content: "The quality of the generated designs is outstanding. It's like having a senior designer and developer combined into one tool. My team's productivity has skyrocketed.",
    rating: 5,
    gradient: "from-cyan-500/20 to-sky-500/20",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative py-24 sm:py-32">
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
            Testimonials
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Loved by{" "}
            <span className="bg-gradient-to-r from-violet-400 to-indigo-300 bg-clip-text text-transparent">
              Thousands
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            See what our users are saying about building websites with SiteForge AI.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 hover:bg-white/[0.04] hover:border-white/[0.15] transition-all duration-300"
            >
              {/* Quote Icon */}
              <div className="absolute top-4 right-4 text-white/5">
                <Quote className="h-12 w-12" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Content */}
              <p className="text-sm text-gray-300 leading-relaxed mb-6 relative z-10">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${testimonial.gradient} text-white font-semibold text-sm ring-1 ring-white/10`}
                >
                  {testimonial.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <div className="text-sm font-medium text-white">{testimonial.name}</div>
                  <div className="text-xs text-gray-500">
                    {testimonial.role} · {testimonial.company}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
