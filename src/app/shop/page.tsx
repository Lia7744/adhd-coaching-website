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
    <div className="flex flex-col min-h-screen overflow-x-hidden">

      <main className="flex-grow pt-24 bg-white">
        {/* ═══ PRODUCT HERO ═══ */}
        <header className="pt-16 pb-20 px-6 sm:px-12 relative overflow-hidden">
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              
              {/* Left: Product Image */}
              <div className="flex flex-col items-center gap-6 max-w-[520px] mx-auto w-full">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-sage/10 text-brand-sage font-bold text-xs uppercase tracking-widest border border-brand-sage/20">
                  <Sparkles className="w-3 h-3" />
                  Digital Download
                </div>

                <div className="relative group perspective-1000 w-full">
                  <div className="relative transform transition-transform duration-700 group-hover:rotate-y-6">
                    <Image 
                      src="/workbook-cover-final.png"
                      alt="Manipulating Myself to Do Stuff Workbook Cover" 
                      width={600} 
                      height={800} 
                      className="w-full h-auto rounded-xl shadow-2xl border border-brand-sage/10 object-contain relative z-10"
                      priority
                    />
                  </div>
                </div>
              </div>

            {/* Right: Sales Copy */}
            <div className="space-y-8">
              
              <h1 className="text-4xl sm:text-5xl font-serif font-black text-brand-charcoal leading-tight">
                Because willpower is a scam and your brain needs
                <span className="font-handwriting text-brand-sage text-5xl sm:text-7xl block mt-4 rotate-[-2deg]">a better offer.</span>
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
                  onClick={() => sendGAEvent("event", "begin_checkout", { item_name: "Manipulating Myself Workbook", currency: isCanada ? "CAD" : "USD", value: isCanada ? 34.99 : 24.99 })}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-14 px-10 rounded-full font-bold text-base shadow-md transition-all hover:scale-105 active:scale-95 bg-brand-sage hover:bg-brand-sage-hover text-white"
                >
                  {isLoading ? "Loading..." : `Get the Workbook — ${price}`}
                  <ArrowRight className="w-4 h-4" />
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
      <section className="py-24 bg-[#F9F7F3] relative">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-serif font-black text-brand-charcoal mb-4">
              What exactly is inside?
            </h2>
            <p className="text-lg text-brand-warm-gray max-w-2xl mx-auto">
              This isn't a fluffy inspirational journal. It's a dense, actionable guide to manipulating your brain into cooperating. Here's what you get.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            
            <div className="bg-white/80 backdrop-blur-sm border border-brand-border hover:border-brand-sage/40 rounded-2xl p-6 sm:p-8 transition-all group flex gap-4">
              <div className="w-12 h-12 shrink-0 bg-brand-sage/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Coffee className="w-5 h-5 text-brand-sage" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-brand-charcoal mb-2 leading-tight">The Bribe Menu</h3>
                <p className="text-brand-warm-gray text-sm leading-relaxed">
                  A personalized cheat sheet of the exact things that trick <b>your</b> brain into showing up.
                </p>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm border border-brand-border hover:border-brand-sage/40 rounded-2xl p-6 sm:p-8 transition-all group flex gap-4">
              <div className="w-12 h-12 shrink-0 bg-brand-charcoal/5 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Zap className="w-5 h-5 text-brand-charcoal" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-brand-charcoal mb-2 leading-tight">Interest vs. Importance</h3>
                <p className="text-brand-warm-gray text-sm leading-relaxed">
                  Why your brain runs on interest, novelty, and urgency instead of importance—and how to actively utilize that.
                </p>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm border border-brand-border hover:border-brand-sage/40 rounded-2xl p-6 sm:p-8 transition-all group flex gap-4">
              <div className="w-12 h-12 shrink-0 bg-brand-charcoal/5 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <ListChecks className="w-5 h-5 text-brand-charcoal" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-brand-charcoal mb-2 leading-tight">7 Commandments of Systems</h3>
                <p className="text-brand-warm-gray text-sm leading-relaxed">
                  A framework for building something your brain can't reject after two weeks. Including the one question that tells you whether to fix your current system or scrap it entirely.
                </p>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm border border-brand-border hover:border-brand-sage/40 rounded-2xl p-6 sm:p-8 transition-all group flex gap-4">
              <div className="w-12 h-12 shrink-0 bg-brand-sage/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Hourglass className="w-5 h-5 text-brand-sage" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-brand-charcoal mb-2 leading-tight">The Agony Hour Blueprint</h3>
                <p className="text-brand-warm-gray text-sm leading-relaxed">
                  A specific worksheet for the tasks that will never not suck. We're containing them instead of pretending otherwise.
                </p>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm border border-brand-border hover:border-brand-sage/40 rounded-2xl p-6 sm:p-8 transition-all group flex gap-4">
              <div className="w-12 h-12 shrink-0 bg-brand-sage/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Target className="w-5 h-5 text-brand-sage" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-brand-charcoal mb-2 leading-tight">Trapping Your Future Self</h3>
                <p className="text-brand-warm-gray text-sm leading-relaxed">
                  Exactly how to set unavoidable traps for your future self so things actually get done whether your brain cooperates in the moment or not.
                </p>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm border border-brand-border hover:border-brand-sage/40 rounded-2xl p-6 sm:p-8 transition-all group flex gap-4">
              <div className="w-12 h-12 shrink-0 bg-brand-charcoal/5 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <RotateCcw className="w-5 h-5 text-brand-charcoal" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-brand-charcoal mb-2 leading-tight">Shame Spiral Map</h3>
                <p className="text-brand-warm-gray text-sm leading-relaxed">
                  What to do when the guilt of not starting becomes bigger than the task itself. Identify exactly where your loop starts and interrupt it before it takes you out for two days.
                </p>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm border border-brand-border hover:border-brand-sage/40 rounded-2xl p-6 sm:p-8 transition-all group flex gap-4">
              <div className="w-12 h-12 shrink-0 bg-brand-charcoal/5 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <BookOpen className="w-5 h-5 text-brand-charcoal" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-brand-charcoal mb-2 leading-tight">20+ Workbook Exercises</h3>
                <p className="text-brand-warm-gray text-sm leading-relaxed">
                  Brain dumps, cheat sheets, battle plans, pattern finders — all designed to help you learn more about YOUR unique brain. Fill them in once, come back to them every time you're stuck.
                </p>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm border border-brand-border hover:border-brand-sage/40 rounded-2xl p-6 sm:p-8 transition-all group flex gap-4">
              <div className="w-12 h-12 shrink-0 bg-brand-sage/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <ShieldAlert className="w-5 h-5 text-brand-sage" />
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
          <div className="mt-16 max-w-4xl mx-auto bg-[#483428] rounded-2xl p-8 sm:p-14 text-center space-y-8 shadow-xl">
            <h3 className="text-3xl font-serif font-black text-white">Why "manipulating"?</h3>
            <p className="text-white/80 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto">
              Because your brain doesn't respond to &quot;just try harder.&quot; It responds to being outsmarted. Every strategy in this book is a way of rigging the game so your brain cooperates—not because it wants to, but because you gave it no good reason not to.
            </p>
            <div className="w-16 h-1 bg-brand-sage mx-auto rounded-full"></div>
            <p className="text-white/60 italic max-w-xl mx-auto">
              Written by an ICF-certified ADHD coach who also has ADHD, has been in every one of these spirals, and got tired of generic advice that starts with &quot;just.&quot;
            </p>
          </div>
        </div>
      </section>

      {/* ═══ BOTTOM CTA ═══ */}
      {/* ═══ BOTTOM CTA ═══ */}
      <section className="py-24 bg-black text-center px-6">
        <div className="max-w-2xl mx-auto space-y-8">
          <h2 className="text-4xl sm:text-5xl font-serif font-black text-white leading-tight">
            Your brain won't do the thing?<br/>
            <span className="text-brand-sage font-handwriting block text-5xl sm:text-6xl mt-2 rotate-[-2deg]">Time to outsmart it.</span>
          </h2>
          <p className="text-lg text-white/70">
            Instant digital download. Start reading in 30 seconds.
          </p>
          <a
            href={checkoutUrl}
            onClick={() => sendGAEvent("event", "begin_checkout", { item_name: "Manipulating Myself Workbook", currency: isCanada ? "CAD" : "USD", value: isCanada ? 34.99 : 24.99 })}
            className="inline-flex bg-white hover:bg-gray-200 text-brand-charcoal h-14 px-10 rounded-full font-bold text-base shadow-md items-center justify-center gap-2 transition-all transform hover:scale-105 active:scale-95"
          >
            {isLoading ? "Loading..." : `Download Now for ${price}`} <ArrowRight className="w-4 h-4 ml-1" />
          </a>
          <p className="text-sm text-white/50 italic pt-4">
            Due to the digital nature of this product, all sales are final.
          </p>
        </div>
      </section>

      </main>
    </div>
  );
}
