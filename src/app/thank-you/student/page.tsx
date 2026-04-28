"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowRight, FileSignature, CalendarPlus, Lock } from "lucide-react";

export default function StudentThankYouPage() {
  const [currency, setCurrency] = useState<"USD" | "CAD">("USD");
  const [currencyLoaded, setCurrencyLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/geo")
      .then((r) => r.json())
      .then((data) => { setCurrency(data?.country === "CA" ? "CAD" : "USD"); })
      .catch(() => setCurrency("USD"))
      .finally(() => setCurrencyLoaded(true));
  }, []);

  const formLink = currency === "CAD" 
    ? "https://forms.gle/LHFwH4JHVsWNvoX36" 
    : "https://forms.gle/vZ69dFNcy6D95vZr9";
  
  const calendarLink = "https://calendar.app.google/TCyX5byURKwNyotg7";

  return (
    <div className="flex flex-col min-h-screen bg-brand-cream">
      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <a href="/" className="flex items-center gap-3">
              <Image src="/logo-transparent.png" alt="LG ADHD Coaching" width={80} height={80} />
              <span className="text-xl sm:text-2xl font-serif font-black text-brand-charcoal tracking-tight">
                Liana Groombridge <span className="text-brand-warm-gray font-normal">| ADHD Coaching</span>
              </span>
            </a>
            <div className="hidden md:flex items-center gap-8">
              <a href="/?quiz=true" className="px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-widest bg-brand-gold text-brand-cream hover:bg-brand-gold-hover transition-colors">Take the Quiz</a>
              <a href="/" className="text-sm font-medium text-brand-warm-gray hover:text-brand-charcoal transition-colors animated-underline">Home</a>
              <a href="/services" className="text-sm font-medium text-brand-warm-gray hover:text-brand-charcoal transition-colors animated-underline">Services</a>
              <a href="/shop" className="text-sm font-medium text-brand-warm-gray hover:text-brand-charcoal transition-colors animated-underline">Shop</a>
              <a href="/tracker" className="flex items-center gap-2 text-brand-sage font-bold text-sm bg-brand-sage/10 px-3 py-1.5 rounded-full"><Lock className="w-3.5 h-3.5" /> Client Portal</a>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow pt-32 pb-16 px-6 lg:px-8 text-center flex flex-col justify-center">
        <div className="max-w-2xl mx-auto space-y-8">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }}>
            <h1 className="text-4xl sm:text-5xl font-serif font-black text-brand-charcoal leading-tight">
              You&apos;re in! Let&apos;s get to work.
            </h1>
            <p className="text-lg text-brand-warm-gray mt-4">
              Thank you for signing up for the <span className="font-bold text-brand-charcoal">Semester Survival Plan</span>. There are just two quick steps left to officially kick things off.
            </p>
          </motion.div>

          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }} className="bg-brand-white border-2 border-brand-border rounded-3xl p-8 shadow-xl text-left space-y-6">
            <div className="space-y-3">
              <h2 className="text-xl font-bold text-brand-charcoal flex items-center gap-2">
                <FileSignature className="w-5 h-5 text-brand-sage" /> Step 1: Sign Your Agreement
              </h2>
              <p className="text-sm text-brand-warm-gray">
                Please review and sign the coaching agreement so we are both on the same page before our first session.
              </p>
              <a 
                href={currencyLoaded ? formLink : "#"} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full font-bold text-sm bg-brand-charcoal text-white hover:bg-brand-sage transition-all w-full sm:w-auto"
              >
                Sign Agreement <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="border-t border-brand-border my-6"></div>

            <div className="space-y-3">
              <h2 className="text-xl font-bold text-brand-charcoal flex items-center gap-2">
                <CalendarPlus className="w-5 h-5 text-brand-sage" /> Step 2: Book Your Sessions
              </h2>
              <p className="text-sm text-brand-warm-gray">
                Pick a time that works for you. You can book out your sessions for the entire month in advance.
              </p>

              <div className="bg-[#D25D48]/10 text-[#D25D48] p-3 rounded-xl border border-[#D25D48]/20 text-sm my-4">
                <strong>⚠️ Please note:</strong> Your intake form and coaching agreement (Step 1) must be submitted to officially secure your booking. Sessions without an agreement on file 24 hours prior will be automatically cancelled (but don't worry, you can always easily reschedule!).
              </div>

              <a 
                href={calendarLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full font-bold text-sm bg-brand-sage text-white hover:bg-brand-sage-hover transition-all w-full sm:w-auto"
              >
                Book Your Sessions <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </main>

      <footer className="py-8 text-center text-sm text-brand-warm-gray/60 border-t border-brand-border bg-brand-white mt-auto">
        © 2026 Liana Groombridge Coaching
      </footer>
    </div>
  );
}
