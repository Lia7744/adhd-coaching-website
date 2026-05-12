"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

interface Testimonial {
  quote: string;
  author: string;
  location: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Liana is really good at bringing clarity to my chaotic life as a mom with 3 kids, business owner and part-time student. She helps me to focus in on what I need to be doing so I don't lose my mind.",
    author: "Sarah R.",
    location: "Texas, US",
  },
  {
    quote:
      "You helped me out to develop and implement multiple techniques that helped me to progress in my work. Also, I would like to mention your incredible help in my personal relationship. The most important relationship – with myself.",
    author: "Max M.",
    location: "Toronto, Canada",
  },
  {
    quote:
      "Coaching with Liana has completely changed the way I view myself. I came because I was struggling to finish my Masters degree and was considering dropping out. Liana helped me not only to develop different ways to approach my school work but also helped me to gain a deeper understanding about myself.",
    author: "Stef A.",
    location: "N.Y., US",
  },
];

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Testimonials({ className = "py-24 bg-[#F9F7F3]" }: { className?: string }) {
  return (
    <section className={`relative overflow-hidden ${className}`}>
      {/* Subtle decorative background blur */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 bg-brand-sage/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-72 h-72 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <Reveal>
            <span className="text-sm font-bold text-brand-sage uppercase tracking-widest">
              Client Stories
            </span>
            <h2 className="text-4xl sm:text-5xl font-serif font-black text-brand-charcoal mt-2">
              Words from clients
            </h2>
          </Reveal>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={i} delay={i * 0.1} className="h-full">
              <div className="bg-white/80 backdrop-blur-sm border border-brand-border hover:border-brand-sage/40 rounded-3xl p-8 sm:p-10 shadow-sm transition-all duration-300 flex flex-col justify-between h-full group relative">
                {/* Accent Top Border/Pill */}
                <div className="absolute top-0 left-10 right-10 h-[3px] bg-gradient-to-r from-transparent via-brand-sage/20 group-hover:via-brand-sage/60 to-transparent transition-all duration-300" />

                <div className="space-y-6">
                  {/* Quote Icon & Stars */}
                  <div className="flex items-center justify-between">
                    <Quote className="w-10 h-10 text-brand-sage/20 group-hover:text-brand-sage/40 transition-colors rotate-180" />
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, starIdx) => (
                        <Star
                          key={starIdx}
                          className="w-4 h-4 text-brand-gold fill-brand-gold opacity-90"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Quote Text */}
                  <p className="text-brand-charcoal font-medium italic leading-relaxed text-base sm:text-lg">
                    &quot;{t.quote}&quot;
                  </p>
                </div>

                {/* Author Info */}
                <div className="pt-6 mt-6 border-t border-brand-border/60 flex items-center justify-between gap-3">
                  <div>
                    <h4 className="font-serif font-bold text-brand-charcoal text-lg leading-tight">
                      {t.author}
                    </h4>
                    <p className="text-xs font-medium text-brand-warm-gray mt-0.5">
                      {t.location}
                    </p>
                  </div>
                  {/* Subtle decorative hand-drawn asterisk/accent */}
                  <span className="text-brand-sage/30 font-handwriting text-2xl select-none">
                    ✦
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
