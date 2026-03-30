"use client";

import Image from "next/image";
import { Lock } from "lucide-react";

export default function TrackerPage() {
  return (
    <div className="min-h-screen bg-brand-cream selection:bg-brand-sage/30 flex flex-col">
      {/* ═══ NAVIGATION ═══ */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <a href="/" className="flex items-center gap-3">
              <Image src="/logo-transparent.png" alt="LG ADHD Coaching" width={80} height={80} />
              <span className="text-xl sm:text-2xl font-serif font-black text-brand-charcoal tracking-tight">
                Liana Groombridge <span className="text-brand-warm-gray font-normal hidden sm:inline">| ADHD Coaching</span>
              </span>
            </a>
            <div className="hidden md:flex items-center gap-8">
              <a href="/?quiz=true" className="px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-widest bg-brand-gold text-brand-cream hover:bg-brand-gold-hover transition-colors">Take the Quiz</a>
              <a href="/" className="text-sm font-medium text-brand-warm-gray hover:text-brand-charcoal transition-colors animated-underline">Home</a>
              <a href="/services" className="text-sm font-medium text-brand-warm-gray hover:text-brand-charcoal transition-colors animated-underline">Services</a>
              <a href="/shop" className="text-sm font-medium text-brand-warm-gray hover:text-brand-charcoal transition-colors animated-underline">Shop</a>
              <div className="flex items-center gap-2 text-brand-sage font-bold text-sm bg-brand-sage/10 px-3 py-1.5 rounded-full">
                <Lock className="w-3.5 h-3.5" /> Client Portal
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* ═══ IFRAME EMBED ═══ */}
      <main className="flex-1 pt-16 w-full max-w-7xl mx-auto flex flex-col">
        {/* We use an iframe to secretly load the live Vercel app while hiding the original URL from the user */}
        <iframe 
          src="https://lg-coaching-tracker-pkrf.vercel.app/" 
          className="flex-1 w-full h-[calc(100vh-4rem)] border-none bg-brand-cream rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.05)] mt-4"
          title="LG Coaching Client Portal"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        />
      </main>
    </div>
  );
}
