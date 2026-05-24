"use client";

import { useState, useEffect } from "react";
import { Mail, Lock, ArrowRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { sendGAEvent } from "@next/third-parties/google";

export default function SevenCommandmentsPage() {
  const [hasUnlocked, setHasUnlocked] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Hidden trick to view the unlocked page instantly!
    if (typeof window !== 'undefined' && window.location.search.includes('preview=true')) {
      setHasUnlocked(true);
    }
  }, []);

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    sendGAEvent("event", "lead_captured", { source: "7-commandments" });

    try {
      await fetch('/api/brevo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, source: '7_commandments' })
      });
    } catch (error) {
      console.error("Failed to submit", error);
    }

    setHasUnlocked(true);
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-brand-cream text-brand-charcoal font-sans selection:bg-brand-sage/20 py-12 px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-10">
        
        {/* Header Section (Always Visible) */}
        <div className="space-y-6">
          <div className="flex justify-between items-start">
            <p className="text-sm font-bold tracking-widest text-brand-sage uppercase">The 7 Commandments of ADHD Systems</p>
            <div className="w-24 h-24 hidden sm:block relative opacity-80">
               <Image src="/logo-transparent.png" alt="LG ADHD Coaching" fill className="object-contain" />
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-serif font-black leading-[1.1] text-brand-charcoal">
            Will Your Routine <br className="hidden md:block"/>
            <span className="font-handwriting text-brand-sage text-6xl md:text-7xl font-normal">survive</span> Your ADHD?
          </h1>

          <p className="text-xl md:text-2xl font-serif italic text-brand-warm-gray">
            7 questions to ask yourself to ensure your routine, habit, or setup supports your brain.
          </p>
        </div>

        {/* Content Section (Blurred until unlocked) */}
        <div className="relative">
          
          {/* Email Capture Overlay */}
          {!hasUnlocked && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-start pt-8 pb-8 px-4">
              <div className="absolute inset-0 bg-gradient-to-b from-brand-cream/10 via-brand-cream/50 to-brand-cream pointer-events-none" />
              
              <div className="relative z-30 bg-white border-2 border-brand-border rounded-3xl p-8 max-w-md w-full shadow-2xl text-center space-y-6 transform hover:scale-[1.01] transition-transform">
                <div className="w-16 h-16 bg-brand-sage/10 rounded-full flex items-center justify-center mx-auto">
                  <Lock className="w-8 h-8 text-brand-sage" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-serif font-black">Unlock the Cheat Sheet</h3>
                  <p className="text-brand-warm-gray text-sm font-medium">Enter your email to instantly reveal the 7 Commandments and get a copy sent to your inbox.</p>
                </div>
                
                <form onSubmit={handleUnlock} className="space-y-4">
                  <input
                    required
                    type="text"
                    placeholder="First Name"
                    className="w-full h-12 px-4 rounded-xl border-2 border-brand-border focus:border-brand-sage outline-none text-brand-charcoal font-medium transition-all"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-warm-gray w-4 h-4" />
                    <input
                      required
                      type="email"
                      placeholder="name@example.com"
                      className="w-full h-12 pl-11 pr-4 rounded-xl border-2 border-brand-border focus:border-brand-sage outline-none text-brand-charcoal font-medium transition-all"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full bg-brand-sage hover:bg-brand-sage-hover disabled:opacity-50 text-white h-12 rounded-full font-bold shadow-md flex items-center justify-center gap-2 transition-all"
                  >
                    {isSubmitting ? "Unlocking..." : "Get Instant Access"} <ArrowRight className="w-4 h-4" />
                  </button>
                  <p className="text-[10px] text-brand-warm-gray">
                    Unsubscribe anytime.
                  </p>
                </form>
              </div>
            </div>
          )}

          {/* The Actual Content */}
          <div className={`space-y-8 transition-all duration-1000 ${!hasUnlocked ? "opacity-60 blur-[3px] scale-[0.95] transform-gpu origin-top pointer-events-none select-none" : "opacity-100 blur-0 scale-100 transform-gpu origin-top"}`}>
            
            <div className="border-l-4 border-brand-sage pl-6 space-y-2">
              <p className="text-lg font-medium leading-relaxed text-brand-charcoal">
                Most ADHD routines aren't designed badly. They're designed for the version of you who slept 8 hours, had coffee, and felt like a functional human. <span className="bg-brand-sage/20 px-1 font-bold">That version of you is not the one who needs the system.</span>
              </p>
              <p className="text-lg font-medium leading-relaxed text-brand-charcoal">
                These 7 commandments are the exact questions I use both with myself and my coaching clients.
              </p>
            </div>
            
            <div className="bg-brand-sage/10 rounded-xl px-6 py-4 font-bold text-lg text-brand-charcoal shadow-sm">
              Run new systems through the first 5 to make sure they're ADHD-proof. The last two are for systems you already have in place but need to audit.
            </div>

            <div className="flex flex-col gap-y-6 pt-2">
              
              {/* Commandment 1 */}
              <div className="flex gap-4 md:gap-6 items-start border-b border-dashed border-brand-border/40 pb-6">
                <span className="text-4xl md:text-5xl font-serif font-black italic text-brand-sage shrink-0 w-8 md:w-12">1</span>
                <div className="space-y-1 mt-1">
                  <h3 className="text-xl font-bold leading-tight">Does it work on my worst day?</h3>
                  <p className="text-brand-warm-gray font-medium">If it needs you at 100%, it's not a system. It's a hope. Build for your worst day.</p>
                </div>
              </div>

              {/* Commandment 2 */}
              <div className="flex gap-4 md:gap-6 items-start border-b border-dashed border-brand-border/40 pb-6">
                <span className="text-4xl md:text-5xl font-serif font-black italic text-brand-sage shrink-0 w-8 md:w-12">2</span>
                <div className="space-y-1 mt-1">
                  <h3 className="text-xl font-bold leading-tight">Can I see it without looking for it?</h3>
                  <p className="text-brand-warm-gray font-medium">If you have to open something to see it, it doesn't exist. Out of sight = out of existence.</p>
                </div>
              </div>

              {/* Commandment 3 */}
              <div className="flex gap-4 md:gap-6 items-start border-b border-dashed border-brand-border/40 pb-6">
                <span className="text-4xl md:text-5xl font-serif font-black italic text-brand-sage shrink-0 w-8 md:w-12">3</span>
                <div className="space-y-1 mt-1">
                  <h3 className="text-xl font-bold leading-tight">Does it live in one place?</h3>
                  <p className="text-brand-warm-gray font-medium">Every extra place is another decision. ADHD brains have a decision budget. One home.</p>
                </div>
              </div>

              {/* Commandment 4 */}
              <div className="flex gap-4 md:gap-6 items-start border-b border-dashed border-brand-border/40 pb-6">
                <span className="text-4xl md:text-5xl font-serif font-black italic text-brand-sage shrink-0 w-8 md:w-12">4</span>
                <div className="space-y-1 mt-1">
                  <h3 className="text-xl font-bold leading-tight">What's the smallest version that still counts?</h3>
                  <p className="text-brand-warm-gray font-medium">Cut it in half. Then in half again. The smallest version that still counts IS the version.</p>
                </div>
              </div>

              {/* Commandment 5 */}
              <div className="flex gap-4 md:gap-6 items-start border-b border-dashed border-brand-border/40 pb-6">
                <span className="text-4xl md:text-5xl font-serif font-black italic text-brand-sage shrink-0 w-8 md:w-12">5</span>
                <div className="space-y-1 mt-1">
                  <h3 className="text-xl font-bold leading-tight">What's my re-entry point?</h3>
                  <p className="text-brand-warm-gray font-medium">You will fall off. The question is whether you have a way back in. Decide it before you fall.</p>
                </div>
              </div>

              {/* Commandment 6 */}
              <div className="flex gap-4 md:gap-6 items-start border-b border-dashed border-brand-border/40 pb-6">
                <span className="text-4xl md:text-5xl font-serif font-black italic text-brand-sage shrink-0 w-8 md:w-12">6</span>
                <div className="space-y-1 mt-1">
                  <h3 className="text-xl font-bold leading-tight">When's the last time this actually helped me?</h3>
                  <p className="text-brand-warm-gray font-medium">When's the last time this actually helped me? Note: If you can't answer that, it's either too complicated or it's already run its course.</p>
                </div>
              </div>

              {/* Commandment 7 */}
              <div className="flex gap-4 md:gap-6 items-start">
                <span className="text-4xl md:text-5xl font-serif font-black italic text-brand-sage shrink-0 w-8 md:w-12">7</span>
                <div className="space-y-1 mt-1">
                  <h3 className="text-xl font-bold leading-tight">Is this shiny object syndrome or a real failure?</h3>
                  <p className="text-brand-warm-gray font-medium">Novelty-seeking applies to systems too. Before you abandon it, ask: did the current system stop working or am I bored?</p>
                </div>
              </div>

            </div>

            {/* Upsell Banner */}
            <div className="bg-[#5A7D62] rounded-2xl p-6 md:p-8 text-white mt-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-1 flex-1 text-center md:text-left">
                <p className="text-lg md:text-xl font-medium">Get the full system in my new workbook:</p>
                <p className="text-lg md:text-xl font-medium"><span className="font-serif italic font-bold">Manipulating Myself to Do Stuff</span> with 20+ worksheets inside!</p>
              </div>
              <Link href="/MMTDS-workbook" className="shrink-0 inline-flex items-center justify-center gap-2 bg-brand-cream text-brand-charcoal px-8 py-3.5 rounded-full font-bold shadow-md hover:bg-white transition-all whitespace-nowrap">
                GET THE WORKBOOK <ArrowRight className="w-4 h-4"/>
              </Link>
            </div>
            
            <div className="flex justify-between items-center text-xs text-brand-warm-gray pt-8 pb-8">
              <p>© Liana Groombridge · ICF-Certified ADHD Coach (ACC, CACP)</p>
              <p className="font-serif italic text-right hidden sm:block">made for the brain that forgets where it put things</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
