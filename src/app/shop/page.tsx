"use client";

import { useEffect, useState } from "react";
import { ArrowRight, CheckCircle2, Sparkles, BookOpen, Brain, Clock, ShieldCheck, Download, Coffee, Zap, ListChecks, Hourglass, Target, RotateCcw, Flame, ShieldAlert } from "lucide-react";
import Image from "next/image";
import { Lock } from "lucide-react";
import { sendGAEvent } from "@next/third-parties/google";

export default function ShopPage() {
  const [isCanada, setIsCanada] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check currency/location
  useEffect(() => {
    fetch("/api/geo")
      .then((res) => res.json())
      .then((data) => {
        setIsCanada(data.country === "CA");
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Location lookup failed:", error);
        setIsLoading(false);
      });
  }, []);

  const price = isCanada ? "$34.99 CAD" : "$24.99 USD";
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
              <span className="text-xl sm:text-2xl font-serif font-black text-brand-charcoal tracking-tight">
                Liana Groombridge <span className="text-brand-warm-gray font-normal hidden sm:inline">| ADHD Coaching</span>
              </span>
            </a>
            <div className="hidden md:flex items-center gap-8">
              <a href="/?quiz=true" className="px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-widest bg-brand-gold text-brand-cream hover:bg-brand-gold-hover transition-colors">Take the Quiz</a>
              <a href="/" className="text-sm font-medium text-brand-warm-gray hover:text-brand-charcoal transition-colors animated-underline">Home</a>
              <a href="/services" className="text-sm font-medium text-brand-warm-gray hover:text-brand-charcoal transition-colors animated-underline">Services</a>
              <a href="/shop" className="text-sm font-bold text-brand-charcoal transition-colors">Shop</a>
              <a href="/tracker" className="flex items-center gap-2 text-brand-sage font-bold text-sm bg-brand-sage/10 px-3 py-1.5 rounded-full"><Lock className="w-3.5 h-3.5" /> Client Portal</a>
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
            <div className="relative group perspective-1000 max-w-[520px] mx-auto w-full">
              <div className="absolute -inset-4 bg-gradient-to-tr from-brand-gold/40 to-brand-sage/40 rounded-[3rem] blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative transform transition-transform duration-700 group-hover:rotate-y-12">
                <Image 
                  src="/workbook-cover-final.png"
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
                Because willpower is a scam and your brain needs a better offer.
              </h1>
              
              <p className="text-xl text-brand-charcoal/80 leading-relaxed font-bold">
                9 chapters of manipulating your ADHD brain into doing the stuff it knows it needs to do but physically will not start.
              </p>
              <div className="text-lg text-brand-warm-gray leading-relaxed space-y-4">
                <p>You know what you need to do. You have the time. You might even have a plan. And your body just... won't cooperate.</p>
                <p>So you sit there. Staring at it. For 45 minutes. While the task takes 5. And the whole time, a voice in your head is narrating: &quot;I should start. I'm going to start. OK, after I refill my water. OK, after this episode. OK, it's 10pm now, I'll do it tomorrow.&quot; You won't do it tomorrow.</p>
                <p className="font-bold text-brand-sage">This workbook is the other option.</p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                <a 
                  href={checkoutUrl}
                  onClick={() => sendGAEvent({ event: "begin_checkout", item_name: "Manipulating Myself Workbook", currency: isCanada ? "CAD" : "USD", value: isCanada ? 34.99 : 24.99 })}
                  className="w-full sm:w-auto bg-brand-sage hover:brightness-90 text-brand-white h-16 px-10 rounded-full text-xl font-bold shadow-xl shadow-brand-sage/40 flex items-center justify-center gap-2 transition-all transform hover:scale-105"
                >
                  {isLoading ? "Loading..." : `Get the Workbook — ${price}`}
                  <ArrowRight className="w-5 h-5 ml-1" />
                </a>
              </div>
              <p className="text-sm text-brand-warm-gray italic">
                Due to the digital nature of this product, all sales are final.
              </p>

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
                <div className="flex items-center gap-2 text-sm font-bold text-brand-charcoal">
                  <Download className="w-5 h-5 text-brand-sage" /> Instant Download
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

          <div className="grid md:grid-cols-2 gap-6">
            
            <div className="bg-brand-cream border-2 border-brand-border rounded-3xl p-6 hover:border-brand-sage transition-colors group flex gap-4">
              <div className="w-14 h-14 shrink-0 bg-[#D25D48]/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Coffee className="w-6 h-6 text-[#D25D48]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-brand-charcoal mb-2 leading-tight">The Bribe Menu</h3>
                <p className="text-brand-warm-gray text-sm leading-relaxed">
                  A personalized cheat sheet of the exact things that trick <b>your</b> brain into showing up.
                </p>
              </div>
            </div>

            <div className="bg-brand-cream border-2 border-brand-border rounded-3xl p-6 hover:border-brand-sage transition-colors group flex gap-4">
              <div className="w-14 h-14 shrink-0 bg-brand-gold/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6 text-[#B8923E]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-brand-charcoal mb-2 leading-tight">Interest vs. Importance</h3>
                <p className="text-brand-warm-gray text-sm leading-relaxed">
                  Why your brain runs on interest, novelty, and urgency instead of importance—and how to actively utilize that.
                </p>
              </div>
            </div>

            <div className="bg-brand-cream border-2 border-brand-border rounded-3xl p-6 hover:border-brand-sage transition-colors group flex gap-4">
              <div className="w-14 h-14 shrink-0 bg-brand-sage/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <ListChecks className="w-6 h-6 text-brand-sage" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-brand-charcoal mb-2 leading-tight">7 Commandments of Systems</h3>
                <p className="text-brand-warm-gray text-sm leading-relaxed">
                  A framework for building something your brain can't reject after two weeks. Including the one question that tells you whether to fix your current system or scrap it entirely.
                </p>
              </div>
            </div>

            <div className="bg-brand-cream border-2 border-brand-border rounded-3xl p-6 hover:border-brand-sage transition-colors group flex gap-4">
              <div className="w-14 h-14 shrink-0 bg-brand-charcoal/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Hourglass className="w-6 h-6 text-brand-charcoal" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-brand-charcoal mb-2 leading-tight">The Agony Hour Blueprint</h3>
                <p className="text-brand-warm-gray text-sm leading-relaxed">
                  A specific worksheet for the tasks that will never not suck. We're containing them instead of pretending otherwise.
                </p>
              </div>
            </div>

            <div className="bg-brand-cream border-2 border-brand-border rounded-3xl p-6 hover:border-brand-sage transition-colors group flex gap-4">
              <div className="w-14 h-14 shrink-0 bg-brand-sage/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Target className="w-6 h-6 text-brand-sage" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-brand-charcoal mb-2 leading-tight">Trapping Your Future Self</h3>
                <p className="text-brand-warm-gray text-sm leading-relaxed">
                  Exactly how to set unavoidable traps for your future self so things actually get done whether your brain cooperates in the moment or not.
                </p>
              </div>
            </div>

            <div className="bg-brand-cream border-2 border-brand-border rounded-3xl p-6 hover:border-brand-sage transition-colors group flex gap-4">
              <div className="w-14 h-14 shrink-0 bg-[#D25D48]/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <RotateCcw className="w-6 h-6 text-[#D25D48]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-brand-charcoal mb-2 leading-tight">Shame Spiral Map</h3>
                <p className="text-brand-warm-gray text-sm leading-relaxed">
                  What to do when the guilt of not starting becomes bigger than the task itself. Identify exactly where your loop starts and interrupt it before it takes you out for two days.
                </p>
              </div>
            </div>

            <div className="bg-brand-cream border-2 border-brand-border rounded-3xl p-6 hover:border-brand-sage transition-colors group flex gap-4">
              <div className="w-14 h-14 shrink-0 bg-brand-gold/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <BookOpen className="w-6 h-6 text-[#B8923E]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-brand-charcoal mb-2 leading-tight">20+ Workbook Exercises</h3>
                <p className="text-brand-warm-gray text-sm leading-relaxed">
                  Brain dumps, cheat sheets, battle plans, pattern finders — all designed to help you learn more about YOUR unique brain. Fill them in once, come back to them every time you're stuck.
                </p>
              </div>
            </div>

            <div className="bg-brand-cream border-2 border-brand-border rounded-3xl p-6 hover:border-brand-sage transition-colors group flex gap-4">
              <div className="w-14 h-14 shrink-0 bg-brand-charcoal/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <ShieldAlert className="w-6 h-6 text-brand-charcoal" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-brand-charcoal mb-2 leading-tight">The Emergency Kit</h3>
                <p className="text-brand-warm-gray text-sm leading-relaxed">
                  For the days when absolutely nothing is working and your brain has just decided to... not. Ten steps. No lessons. No pep talks. Just &quot;do this right now.&quot;
                </p>
              </div>
            </div>

          </div>

          {/* Book Summary Card */}
          <div className="mt-16 max-w-4xl mx-auto bg-brand-cream border-2 border-brand-sage/20 rounded-[2.5rem] p-8 sm:p-14 text-center space-y-8 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-sage/10 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3 pointer-events-none" />
            <h3 className="text-3xl font-serif font-black text-brand-charcoal relative z-10">Why "manipulating"?</h3>
            <p className="text-brand-charcoal/80 text-lg sm:text-xl leading-relaxed relative z-10 max-w-2xl mx-auto">
              Because your brain doesn't respond to &quot;just try harder.&quot; It responds to being outsmarted. Every strategy in this book is a way of rigging the game so your brain cooperates—not because it wants to, but because you gave it no good reason not to.
            </p>
            <div className="w-16 h-1 bg-[#D25D48]/30 mx-auto rounded-full relative z-10"></div>
            <p className="text-brand-warm-gray italic relative z-10 max-w-xl mx-auto">
              Written by an ICF-certified ADHD coach who also has ADHD, has been in every one of these spirals, and got tired of generic advice that starts with &quot;just.&quot;
            </p>
          </div>
        </div>
      </section>

      {/* ═══ BOTTOM CTA ═══ */}
      <section className="py-24 bg-brand-charcoal text-center px-6">
        <div className="max-w-2xl mx-auto space-y-8">
          <h2 className="text-4xl sm:text-5xl font-serif font-black italic text-brand-cream leading-tight">
            Your brain won't do the thing?<br/>
            Time to outsmart it.
          </h2>
          <p className="text-lg text-brand-cream/70">
            Instant digital download. Start reading in 30 seconds.
          </p>
          <a
            href={checkoutUrl}
            onClick={() => sendGAEvent({ event: "begin_checkout", item_name: "Manipulating Myself Workbook", currency: isCanada ? "CAD" : "USD", value: isCanada ? 34.99 : 24.99 })}
            className="inline-flex bg-brand-sage hover:brightness-90 text-brand-white h-16 px-12 rounded-full text-xl font-bold shadow-[0_0_40px_-5px_var(--color-brand-gold)] items-center justify-center gap-2 transition-all transform hover:scale-105"
          >
            {isLoading ? "Loading..." : `Download Now for ${price}`}
          </a>
          <p className="text-sm text-brand-cream/60 italic pt-4">
            Due to the digital nature of this product, all sales are final.
          </p>
        </div>
      </section>

    </div>
  );
}
