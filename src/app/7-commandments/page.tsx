"use client";

import { useState } from "react";
import { Mail, Lock, ArrowRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { sendGAEvent } from "@next/third-parties/google";

export default function SevenCommandmentsPage() {
  const [hasUnlocked, setHasUnlocked] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    sendGAEvent("event", "lead_captured", { source: "7-commandments" });

    try {
      await fetch('/api/brevo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, resultType: '7_commandments_lead' })
      });
    } catch (error) {
      console.error("Failed to submit", error);
    }

    setHasUnlocked(true);
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-brand-cream text-brand-charcoal font-sans selection:bg-brand-sage/20 py-12 px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-12">
        
        {/* Header Section (Always Visible) */}
        <div className="space-y-8">
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
            7 questions to ask before you trust any routine, habit, or setup with your brain.
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
          <div className={`space-y-12 transition-all duration-1000 ${!hasUnlocked ? "opacity-60 blur-[3px] scale-[0.95] transform-gpu origin-top pointer-events-none select-none" : "opacity-100 blur-0 scale-100 transform-gpu origin-top"}`}>
            
            <div className="bg-brand-sage/10 rounded-2xl p-6 md:p-8 border-l-4 border-brand-sage space-y-4">
              <p className="text-lg md:text-xl font-medium leading-relaxed">
                Most ADHD routines aren't designed badly. They're designed for the version of you who slept 8 hours, had coffee, and felt like a functional human. <span className="bg-brand-sage/20 px-1 font-bold">That version of you is not the one who needs the routine.</span>
              </p>
              <p className="text-lg md:text-xl font-medium leading-relaxed text-brand-warm-gray">
                These 7 commandments are the exact questions I use both with myself and my coaching clients.
              </p>
            </div>
            
            <div className="inline-block bg-white border border-brand-border rounded-full px-6 py-3 font-bold text-lg shadow-sm">
              Run your system/routine through the following questions to help determine if they're ADHD-proof!
            </div>

            <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
              
              {/* Commandment 1 */}
              <div className="flex gap-4 items-start">
                <span className="text-5xl font-serif font-black italic text-brand-sage shrink-0 w-12">1</span>
                <div className="space-y-2 mt-2">
                  <h3 className="text-xl font-bold leading-tight">Does it work on my worst day?</h3>
                  <p className="text-brand-warm-gray font-medium">If it needs you at 100%, it's not a system. It's a hope. Build for your worst day.</p>
                </div>
              </div>

              {/* Commandment 2 */}
              <div className="flex gap-4 items-start">
                <span className="text-5xl font-serif font-black italic text-brand-sage shrink-0 w-12">2</span>
                <div className="space-y-2 mt-2">
                  <h3 className="text-xl font-bold leading-tight">Can I see it without looking for it?</h3>
                  <p className="text-brand-warm-gray font-medium">If you have to open something to see it, it doesn't exist. Out of sight = out of existence.</p>
                </div>
              </div>

              {/* Commandment 3 */}
              <div className="flex gap-4 items-start">
                <span className="text-5xl font-serif font-black italic text-brand-sage shrink-0 w-12">3</span>
                <div className="space-y-2 mt-2">
                  <h3 className="text-xl font-bold leading-tight">Does it live in one place?</h3>
                  <p className="text-brand-warm-gray font-medium">Every extra place is another decision. ADHD brains have a decision budget. One home.</p>
                </div>
              </div>

              {/* Commandment 4 */}
              <div className="flex gap-4 items-start">
                <span className="text-5xl font-serif font-black italic text-brand-sage shrink-0 w-12">4</span>
                <div className="space-y-2 mt-2">
                  <h3 className="text-xl font-bold leading-tight">What's the smallest version that still counts?</h3>
                  <p className="text-brand-warm-gray font-medium">Cut it in half. Then in half again. The smallest version that still counts IS the version.</p>
                </div>
              </div>

              {/* Commandment 5 */}
              <div className="flex gap-4 items-start">
                <span className="text-5xl font-serif font-black italic text-brand-sage shrink-0 w-12">5</span>
                <div className="space-y-2 mt-2">
                  <h3 className="text-xl font-bold leading-tight">What's my re-entry point?</h3>
                  <p className="text-brand-warm-gray font-medium">You will fall off. The question is whether you have a way back in. Decide it before you fall.</p>
                </div>
              </div>

              {/* Commandment 6 */}
              <div className="flex gap-4 items-start">
                <span className="text-5xl font-serif font-black italic text-brand-sage shrink-0 w-12">6</span>
                <div className="space-y-2 mt-2">
                  <h3 className="text-xl font-bold leading-tight">When's the last time this actually helped me?</h3>
                  <p className="text-brand-warm-gray font-medium">When's the last time this actually helped me? Note: If you can't answer that, it's either too complicated or it's already run its course.</p>
                </div>
              </div>

              {/* Commandment 7 */}
              <div className="flex gap-4 items-start md:col-span-2">
                <span className="text-5xl font-serif font-black italic text-brand-sage shrink-0 w-12">7</span>
                <div className="space-y-2 mt-2">
                  <h3 className="text-xl font-bold leading-tight">Is this shiny object syndrome or a real failure?</h3>
                  <p className="text-brand-warm-gray font-medium">Novelty-seeking applies to systems too. Before you abandon it ask: did the current system stop working or am I bored?</p>
                </div>
              </div>

            </div>

            {/* Upsell Banner */}
            <div className="bg-brand-sage rounded-3xl p-8 md:p-10 text-white mt-16 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                 <div className="text-9xl font-serif font-black italic">*</div>
              </div>
              <div className="relative z-10 space-y-6">
                <div className="space-y-2">
                  <p className="text-sm font-bold tracking-widest uppercase text-white/80">Want the full system?</p>
                  <h2 className="text-3xl md:text-4xl font-serif font-black">
                    Manipulating Myself <br/> <span className="font-handwriting font-normal text-4xl md:text-5xl">to Do Stuff</span>
                  </h2>
                </div>
                
                <p className="text-lg font-medium text-white/90 max-w-2xl">
                  A 9-chapter actionable workbook designed by an ADHD coach (who has ADHD) to get you unstuck. The workbook goes deep into all 7 commandments — full explanations of why each one matters, and 2 dedicated worksheets to help you audit your current routines and rebuild them so they survive your worst brain days.
                </p>

                <div className="space-y-2 text-white/90">
                  <p className="font-bold">Also includes:</p>
                  <ul className="space-y-1">
                    <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 opacity-70"/> The Bribe Menu: how to artificially create dopamine</li>
                    <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 opacity-70"/> Trapping Future You: systems that survive a bad brain day</li>
                    <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 opacity-70"/> The Agony Hour Blueprint: getting through tasks that will always suck</li>
                    <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 opacity-70"/> The Shame Spiral Map: interrupting the guilt cycle</li>
                    <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 opacity-70"/> 20+ fill-in-the-blank worksheets to help you get unstuck</li>
                  </ul>
                </div>

                <div className="pt-4">
                  <Link href="/MMTDS-workbook" className="inline-flex items-center justify-center gap-2 bg-white text-brand-charcoal px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all">
                    GET THE WORKBOOK <ArrowRight className="w-5 h-5"/>
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center text-xs text-brand-warm-gray pt-12 pb-8">
              <p>© Liana Groombridge · ICF-Certified ADHD Coach (ACC, CACP)</p>
              <p className="font-serif italic text-right hidden sm:block">made for the brain that forgets where it put things</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
