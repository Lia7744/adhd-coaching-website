"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState, useEffect } from "react";
import { ArrowRight, BookOpen, CheckCircle2, Download, RefreshCcw, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

type BlockerType = "Frozen Starter" | "Boredom Blackout" | "Overthinking Looper" | "Shame Spiraler" | "System Hopper";

const resultData: Record<BlockerType, any> = {
  "Frozen Starter": {
    emoji: "🧊",
    subtitle: "You know what to do. You have the time. Your body just... won't.",
    description: "You're not lazy and you're not unmotivated. Your brain requires more activation energy to start than most people's — and it's getting less fuel than it needs. This shows up as that maddening paralysis where you WANT to do the thing, you KNOW how to do the thing, and you still just... sit there.",
    strategy: "Shrink the task until your brain can't argue with it. Not 'clean the kitchen' — put one plate in the sink. If you're frozen because you can't decide WHERE to start? Pick the smallest, dumbest task on the list. Not the most important one. The easiest one.",
    chapters: "Chapters 2 & 4 — 'The Art of Bribing Yourself' & 'Tricking Myself Into Starting'"
  },
  "Boredom Blackout": {
    emoji: "💀",
    subtitle: "Your brain doesn't run on 'important.' It runs on interesting.",
    description: "Your brain operates on what's called an interest-based nervous system. It's motivated by interest, novelty, challenge, and urgency — not by importance, consequences, or distant rewards. When a task is unstimulating, your neurochemistry literally isn't responding.",
    strategy: "Stop trying to reward yourself AFTER boring tasks. Instead, make the task itself less miserable by adding something enjoyable DURING it. Podcast + cleaning. Fancy coffee + admin. You're not rewarding yourself; you're bribing your brain into the room.",
    chapters: "Chapters 2 & 5 — 'The Art of Bribing Yourself' & 'Doing the Boring Stuff Without Dying'"
  },
  "Overthinking Looper": {
    emoji: "🌀",
    subtitle: "Your brain is holding an all-staff meeting you didn't call — and it's been going for hours.",
    description: "In ADHD, the part of your brain that daydreams (the default mode network) doesn't properly shut off when you're trying to focus. It competes for your attention. You rehearse future conversations and generate new thoughts faster than you can act on them.",
    strategy: "You can't think your way out of a thought loop — but you can interrupt it. Grab paper and brain dump everything in your head. Not organized, just OUT. Your working memory is unreliable; the more you try to hold internally, the louder it gets.",
    chapters: "Chapters 3 & 6 — 'Making Future Me Do It' & 'When My Brain Won't Shut Up'"
  },
  "Shame Spiraler": {
    emoji: "🌪️",
    subtitle: "You're not stuck on the task. You're stuck on what not doing it says about you.",
    description: "The shame spiral is: I didn't do the thing → I'm a terrible person → I can't face it → I avoid it. ADHD brains feel emotions hit harder and last longer. When your emotional response is a full-body wave of self-hatred, that's not you being dramatic — it's your brain at full volume.",
    strategy: "Separate the fact from the story. The fact: 'I didn't reply.' The story: 'I'm irresponsible.' Then do one tiny recovery action — not to catch up, but to break the freeze. It's hard to keep telling yourself 'I can't do anything' when you just did something.",
    chapters: "Chapters 7 & 4 — 'The Shame Spiral' & 'Tricking Myself Into Starting'"
  },
  "System Hopper": {
    emoji: "🪦",
    subtitle: "You've tried everything. For about 4 days each.",
    description: "Your interest-based nervous system affects the systems you use to manage tasks. The planner was exciting for two weeks, then it wasn't. You're wired to chase novelty. The skill isn't finding the right system — it's knowing how to come back to one when you fall off.",
    strategy: "Stop chasing consistency — aim for persistency instead. The system that works is the one you keep coming back to. Before downloading the next app, ask if you're just bored. Sometimes the fix is making the old system interesting again. Change the color. Move the whiteboard.",
    chapters: "Chapters 8 & 3 — 'Building Systems That Actually Stick' & 'Making Future Me Do It'"
  }
};

function ResultsContent() {
  const searchParams = useSearchParams();
  const typeParam = searchParams.get("type");
  const type = (typeParam && typeParam in resultData ? (typeParam as BlockerType) : "Frozen Starter");
  const result = resultData[type];

  const [isCanada, setIsCanada] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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

  return (
    <div className="flex flex-col min-h-screen bg-brand-cream">
      <main className="flex-grow flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto space-y-10 text-center">

          {/* Icon */}
          <div className="inline-block p-6 bg-brand-white rounded-full border-2 border-brand-sage shadow-xl text-5xl">
            {result.emoji}
          </div>

          {/* Heading */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl font-serif font-black italic text-brand-charcoal leading-tight">
              Your results are on their way!
            </h1>
            <p className="text-xl text-brand-sage font-bold italic">
              Your top blocker right now: <span className="text-brand-charcoal">{type}</span>.
            </p>
            <p className="text-lg text-brand-warm-gray leading-relaxed">
              Check your inbox — your full results, what they mean, and a personalized strategy are headed to your email right now.
            </p>
            <p className="text-sm text-brand-warm-gray/70">
              Don't see it? Check your spam or promotions folder.
            </p>
          </div>

          {/* Divider */}
          <div className="border-t border-brand-border" />

          {/* Workbook Upsell */}
          <div className="bg-brand-charcoal text-brand-cream rounded-3xl p-10 shadow-2xl relative overflow-hidden group text-left">
            <div className="absolute top-0 right-0 p-8 opacity-10 transform rotate-12 group-hover:rotate-0 transition-transform duration-700">
               <BookOpen className="w-32 h-32" />
            </div>
            <div className="relative z-10 space-y-6">
              <div className="inline-block px-3 py-1 bg-brand-gold text-brand-charcoal text-xs font-black uppercase tracking-widest rounded-md">
                Full System
              </div>
              <h2 className="text-3xl font-serif font-bold italic leading-tight">
                Want to go deeper?
              </h2>
              <p className="text-lg text-brand-cream/80 leading-relaxed">
                <strong>Manipulating Myself to Do Stuff</strong> is a 9-chapter ADHD workbook with strategies for <em>every</em> blocker type — not just your top one.
              </p>
              <div className="bg-brand-cream/10 p-4 rounded-xl border border-brand-cream/20">
                <p className="text-sm italic">
                  "Built by an ADHD coach with ADHD who was done with relying on last-minute panic as a productivity system. No 'just try harder.' Just stuff that actually works."
                </p>
              </div>
              <button 
                onClick={() => window.location.href = "/workbook-offer"}
                className="bg-brand-gold hover:bg-brand-gold-hover text-brand-charcoal h-16 px-10 rounded-full text-xl font-bold shadow-lg flex items-center justify-center gap-2 w-full sm:w-auto transition-all transform hover:scale-105"
              >
                {isLoading ? "Loading..." : `Get the Workbook — ${price}`}
              </button>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://calendar.app.google/Nwa6i4WGsMysUzvu8"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-brand-sage hover:bg-brand-sage-hover text-white font-bold px-8 h-14 rounded-full shadow-md transition-all hover:scale-105"
            >
              Book a free consultation <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={() => window.location.href = "/"}
              className="inline-flex items-center gap-2 text-brand-warm-gray hover:text-brand-charcoal font-bold transition-colors"
            >
              Return to the site
            </button>
          </div>

        </div>
      </main>

      <footer className="py-8 text-center text-sm text-brand-warm-gray/60 border-t border-brand-border bg-brand-white">
        © 2026 Liana Groombridge Coaching
      </footer>
    </div>
  );
}

export default function Results() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen bg-brand-cream">
        <div className="w-12 h-12 border-4 border-brand-sage border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <ResultsContent />
    </Suspense>
  );
}
