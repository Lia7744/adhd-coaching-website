"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Sparkles } from "lucide-react";

type BlockerType = "Frozen Starter" | "Boredom Blackout" | "Overthinking Looper" | "Shame Spiraler" | "System Hopper";

const resultData: Record<BlockerType, any> = {
  "Frozen Starter": {
    emoji: "🧊",
    subtitle: "You know what to do. You have the time. Your body just... won't.",
    description: "You're not lazy and you're not unmotivated. Your brain requires more activation energy to start than most people's — and it's getting less fuel than it needs. This shows up as that maddening paralysis where you WANT to do the thing, you KNOW how to do the thing, and you still just... sit there.",
    strategy: "Shrink the task until your brain can't argue with it. Not 'clean the kitchen' — put one plate in the sink. If you're frozen because you can't decide WHERE to start? Pick the smallest, dumbest task on the list. Not the most important one. The easiest one.",
  },
  "Boredom Blackout": {
    emoji: "💀",
    subtitle: "Your brain doesn't run on 'important.' It runs on interesting.",
    description: "Your brain operates on what's called an interest-based nervous system. It's motivated by interest, novelty, challenge, and urgency — not by importance, consequences, or distant rewards. When a task is unstimulating, your neurochemistry literally isn't responding.",
    strategy: "Stop trying to reward yourself AFTER boring tasks. Instead, make the task itself less miserable by adding something enjoyable DURING it. Podcast + cleaning. Fancy coffee + admin. You're not rewarding yourself; you're bribing your brain into the room.",
  },
  "Overthinking Looper": {
    emoji: "🌀",
    subtitle: "Your brain is holding an all-staff meeting you didn't call — and it's been going for hours.",
    description: "In ADHD, the part of your brain that daydreams (the default mode network) doesn't properly shut off when you're trying to focus. It competes for your attention. You rehearse future conversations and generate new thoughts faster than you can act on them.",
    strategy: "You can't think your way out of a thought loop — but you can interrupt it. Grab paper and brain dump everything in your head. Not organized, just OUT. Your working memory is unreliable; the more you try to hold internally, the louder it gets.",
  },
  "Shame Spiraler": {
    emoji: "🌪️",
    subtitle: "You're not stuck on the task. You're stuck on what not doing it says about you.",
    description: "The shame spiral is: I didn't do the thing → I'm a terrible person → I can't face it → I avoid it. ADHD brains feel emotions hit harder and last longer. When your emotional response is a full-body wave of self-hatred, that's not you being dramatic — it's your brain at full volume.",
    strategy: "Separate the fact from the story. The fact: 'I didn't reply.' The story: 'I'm irresponsible.' Then do one tiny recovery action — not to catch up, but to break the freeze. It's hard to keep telling yourself 'I can't do anything' when you just did something.",
  },
  "System Hopper": {
    emoji: "🪦",
    subtitle: "You've tried everything. For about 4 days each.",
    description: "Your interest-based nervous system affects the systems you use to manage tasks. The planner was exciting for two weeks, then it wasn't. You're wired to chase novelty. The skill isn't finding the right system — it's knowing how to come back to one when you fall off.",
    strategy: "Stop chasing consistency — aim for persistency instead. The system that works is the one you keep coming back to. Before downloading the next app, ask if you're just bored. Sometimes the fix is making the old system interesting again. Change the color. Move the whiteboard.",
  },
};

function PreviewContent() {
  const searchParams = useSearchParams();
  const typeParam = searchParams.get("type");
  const type = (typeParam && typeParam in resultData ? (typeParam as BlockerType) : "Frozen Starter");
  const result = resultData[type];

  return (
    <div className="flex flex-col min-h-screen bg-brand-cream">
      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="inline-block p-6 bg-brand-white rounded-full border-2 border-brand-sage shadow-xl text-5xl mb-4">
              {result.emoji}
            </div>
            <h1 className="text-4xl sm:text-6xl font-serif font-black italic text-brand-charcoal">
              The {type}
            </h1>
            <p className="text-xl sm:text-2xl text-brand-sage font-bold italic leading-tight max-w-xl mx-auto">
              &ldquo;{result.subtitle}&rdquo;
            </p>
          </div>

          {/* Core Analysis */}
          <div className="bg-brand-white rounded-3xl p-8 sm:p-10 shadow-sm border border-brand-border space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-serif font-bold text-brand-charcoal">
                <span className="text-brand-sage">What&apos;s happening:</span>
              </h2>
              <p className="text-lg text-brand-warm-gray leading-relaxed">
                {result.description}
              </p>
            </div>

            <div className="bg-brand-cream p-6 rounded-2xl border-2 border-brand-sage/20 space-y-4">
              <h3 className="text-xl font-serif font-bold text-brand-sage flex items-center gap-2">
                <Sparkles className="w-5 h-5" /> The Strategy:
              </h3>
              <p className="text-brand-charcoal font-medium leading-relaxed">
                {result.strategy}
              </p>
            </div>
          </div>

          {/* Nav between types */}
          <div className="text-center space-y-3">
            <p className="text-xs font-bold tracking-widest uppercase text-brand-warm-gray/50">Preview other types</p>
            <div className="flex flex-wrap justify-center gap-3">
              {(Object.keys(resultData) as BlockerType[]).map((t) => (
                <a
                  key={t}
                  href={`/results-preview?type=${encodeURIComponent(t)}`}
                  className={`px-4 py-2 rounded-full text-sm font-bold border transition-all ${
                    t === type
                      ? "bg-brand-sage text-white border-brand-sage"
                      : "bg-brand-white text-brand-warm-gray border-brand-border hover:border-brand-sage"
                  }`}
                >
                  {resultData[t].emoji} {t}
                </a>
              ))}
            </div>
          </div>
        </div>
      </main>
      <footer className="py-6 text-center text-xs text-brand-warm-gray/40 border-t border-brand-border">
        ⚠️ This is a private preview page for email copy reference only — not visible to the public.
      </footer>
    </div>
  );
}

export default function ResultsPreview() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen bg-brand-cream">
        <div className="w-12 h-12 border-4 border-brand-sage border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <PreviewContent />
    </Suspense>
  );
}
