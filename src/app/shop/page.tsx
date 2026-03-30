"use client";

import { useEffect, useState } from "react";
import { ArrowRight, CheckCircle2, Sparkles, BookOpen, Brain, Clock, ShieldCheck } from "lucide-react";
import Image from "next/image";

export default function ShopPage() {
  const [isCanada, setIsCanada] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check currency/location
  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        setIsCanada(data.country_code === "CA");
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Location lookup failed:", error);
        setIsLoading(false);
      });
  }, []);

  const price = isCanada ? "$27.99 CAD" : "$19.99 USD";
  const checkoutUrl = isCanada 
    ? "https://whop.com/checkout/plan_2HOVSKaQCmGm2" 
    : "https://whop.com/checkout/plan_0XKFQdLkmshAq";

  return (
    <div className="min-h-screen bg-brand-cream selection:bg-brand-sage/30">
      {/* ═══ NAVIGATION ═══ */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <a href="/" className="flex items-center gap-3">
              <Image src="/logo-transparent.png" alt="LG ADHD Coaching" width={80} height={80} />
              <span className="text-lg font-bold text-brand-charcoal tracking-tight">
                Liana Groombridge <span className="text-brand-warm-gray font-normal hidden sm:inline">| ADHD Coaching</span>
              </span>
            </a>
            <div className="hidden md:flex items-center gap-8">
              <a href="/?quiz=true" className="px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-widest bg-brand-gold text-brand-cream hover:bg-brand-gold-hover transition-colors">Take the Quiz</a>
              <a href="/" className="text-sm font-medium text-brand-warm-gray hover:text-brand-charcoal transition-colors animated-underline">Home</a>
              <a href="/services" className="text-sm font-medium text-brand-warm-gray hover:text-brand-charcoal transition-colors animated-underline">Services</a>
              <a href="/shop" className="text-sm font-bold text-brand-charcoal transition-colors">Shop</a>
              <a href="https://whop.com/login" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-brand-warm-gray hover:text-brand-charcoal transition-colors">Login</a>
            </div>
          </div>
        </div>
      </nav>

      {/* ═══ PRODUCT HERO ═══ */}
      <header className="pt-40 pb-20 px-6 sm:px-12 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 right-10 w-64 h-64 bg-brand-sage/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-brand-gold/20 rounded-full blur-3xl -z-10" />

        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Left: Product Image */}
            <div className="relative group perspective-1000 max-w-sm mx-auto w-full">
              <div className="absolute -inset-4 bg-gradient-to-tr from-brand-gold/40 to-brand-sage/40 rounded-[3rem] blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative transform transition-transform duration-700 group-hover:rotate-y-12">
                <Image 
                  src="/workbook-cover.png" 
                  alt="Manipulating Myself to Do Stuff Workbook Cover" 
                  width={600} 
                  height={800} 
                  className="w-full h-auto rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] border-4 border-[#e9e6dc] object-contain relative z-10"
                  priority
                />
              </div>
            </div>

            {/* Right: Sales Copy */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-sage/10 text-brand-sage font-bold text-xs uppercase tracking-widest border border-brand-sage/20">
                <Sparkles className="w-3 h-3" />
                Digital Download
              </div>
              
              <h1 className="text-4xl sm:text-5xl font-serif font-black text-brand-charcoal leading-tight">
                An exact toolkit for every single ADHD blocker.
              </h1>
              
              <p className="text-xl text-brand-charcoal/80 leading-relaxed font-medium">
                Standard productivity advice assumes you already have a neurotypical brain. <span className="font-bold text-brand-charcoal">This workbook assumes you don't.</span> 
              </p>
              <p className="text-lg text-brand-warm-gray leading-relaxed">
                From battling the 'Frozen Starter' paralysis to escaping the 'Shame Spiral', this is an actionable, 9-chapter toolkit designed to help you work with your ADHD brain instead of against it. Stop buying generic planners that end up in the graveyard. Start learning how to legally manipulate your own brain into getting unstuck.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                <a 
                  href={checkoutUrl}
                  className="w-full sm:w-auto bg-brand-charcoal hover:bg-black text-brand-white h-16 px-10 rounded-full text-xl font-bold shadow-lg flex items-center justify-center gap-2 transition-all transform hover:scale-105"
                >
                  {isLoading ? "Loading..." : `Get the Workbook — ${price}`}
                  <ArrowRight className="w-5 h-5 ml-1" />
                </a>
              </div>

              <div className="pt-8 border-t-2 border-brand-border flex flex-wrap gap-4 sm:gap-8 justify-center sm:justify-start">
                <div className="flex items-center gap-2 text-sm font-bold text-brand-charcoal">
                  <ShieldCheck className="w-5 h-5 text-brand-sage" /> Secure Checkout
                </div>
                <div className="flex items-center gap-2 text-sm font-bold text-brand-charcoal">
                  <BookOpen className="w-5 h-5 text-brand-sage" /> 9 Chapters
                </div>
                <div className="flex items-center gap-2 text-sm font-bold text-brand-charcoal">
                  <Brain className="w-5 h-5 text-brand-sage" /> Made by an ADHD brain
                </div>
              </div>

            </div>
          </div>
        </div>
      </header>

      {/* ═══ WHAT'S INSIDE ═══ */}
      <section className="py-20 bg-brand-white relative">
        {/* Subtle top wavy border could go here using SVG, but using standard border for now */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-border to-transparent" />
        
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-serif font-black text-brand-charcoal mb-4">
              What exactly is inside?
            </h2>
            <p className="text-lg text-brand-warm-gray max-w-2xl mx-auto">
              This isn't a fluffy inspirational journal. It's a dense, actionable guide to manipulating your brain into cooperating. Here's what you get.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-brand-cream border-2 border-brand-border rounded-3xl p-8 hover:border-brand-sage transition-colors group">
              <div className="w-12 h-12 bg-brand-sage/20 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Brain className="w-6 h-6 text-brand-sage" />
              </div>
              <h3 className="text-xl font-bold text-brand-charcoal mb-3">5 Strategy Sheets</h3>
              <p className="text-brand-warm-gray text-sm leading-relaxed">
                Specific, step-by-step game plans for the Frozen Starter, Boredom Blackout, Overthinking Looper, Shame Spiraler, and System Hopper.
              </p>
            </div>

            <div className="bg-brand-cream border-2 border-brand-border rounded-3xl p-8 hover:border-brand-gold transition-colors group">
              <div className="w-12 h-12 bg-brand-gold/20 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Clock className="w-6 h-6 text-brand-gold" />
              </div>
              <h3 className="text-xl font-bold text-brand-charcoal mb-3">System Graveyard</h3>
              <p className="text-brand-warm-gray text-sm leading-relaxed">
                An exercise that turns all your abandoned planners and failed productivity apps into actual, useful data so you stop repeating mistakes.
              </p>
            </div>

            <div className="bg-brand-cream border-2 border-brand-border rounded-3xl p-8 hover:border-brand-charcoal transition-colors group">
              <div className="w-12 h-12 bg-brand-charcoal/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <CheckCircle2 className="w-6 h-6 text-brand-charcoal" />
              </div>
              <h3 className="text-xl font-bold text-brand-charcoal mb-3">Shame Spiral Map</h3>
              <p className="text-brand-warm-gray text-sm leading-relaxed">
                Identify precisely where your shame spirals trigger and build a "Getting Back Up" plan while your head is still clear.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ BOTTOM CTA ═══ */}
      <section className="py-24 bg-brand-charcoal text-center px-6">
        <div className="max-w-2xl mx-auto space-y-8">
          <h2 className="text-4xl sm:text-5xl font-serif font-black italic text-brand-cream leading-tight">
            Stop trying to be neurotypical.<br/>
            Start manipulating yourself.
          </h2>
          <p className="text-lg text-brand-cream/70">
            Instant digital download. You can start reading exactly 30 seconds from right now.
          </p>
          <a
            href={checkoutUrl}
            className="inline-flex bg-brand-gold hover:bg-brand-gold-hover text-brand-charcoal h-16 px-12 rounded-full text-xl font-bold shadow-[0_0_40px_-5px_var(--color-brand-gold)] items-center justify-center gap-2 transition-all transform hover:scale-105"
          >
            {isLoading ? "Loading..." : `Download Now for ${price}`}
          </a>
        </div>
      </section>

    </div>
  );
}
