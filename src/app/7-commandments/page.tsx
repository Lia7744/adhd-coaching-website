"use client";

import { useState, useEffect } from "react";
import { Mail, Lock, ArrowRight, CheckCircle2, ChevronLeft, ChevronRight, List, Presentation } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { sendGAEvent } from "@next/third-parties/google";

// Decorative Plant Branch SVGs matching slide design
const LeafTopRight = () => (
  <svg viewBox="0 0 120 120" className="w-28 md:w-36 h-28 md:h-36 absolute top-0 right-0 pointer-events-none opacity-20 stroke-[#48644e] fill-none z-0" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10,110 Q50,90 110,10" />
    <path d="M45,77 Q65,65 60,50 Q45,55 45,77" />
    <path d="M75,47 Q95,35 90,20 Q75,25 75,47" />
    <path d="M30,87 Q10,75 15,60 Q30,65 30,87" />
    <path d="M60,57 Q40,45 45,30 Q60,35 60,57" />
    <path d="M110,10 Q100,25 85,25 Q95,10 110,10" />
  </svg>
);

const LeafBottomLeft = () => (
  <svg viewBox="0 0 120 120" className="w-28 md:w-36 h-28 md:h-36 absolute bottom-0 left-0 pointer-events-none opacity-20 stroke-[#48644e] fill-none z-0" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: 'rotate(180deg)' }}>
    <path d="M10,110 Q50,90 110,10" />
    <path d="M45,77 Q65,65 60,50 Q45,55 45,77" />
    <path d="M75,47 Q95,35 90,20 Q75,25 75,47" />
    <path d="M30,87 Q10,75 15,60 Q30,65 30,87" />
    <path d="M60,57 Q40,45 45,30 Q60,35 60,57" />
    <path d="M110,10 Q100,25 85,25 Q95,10 110,10" />
  </svg>
);

const SLIDES = [
  {
    number: 1,
    title: "Does it work on my worst day?",
    listText: "If it needs you at 100%, it's not a system. It's a hope. Build for your worst day.",
    bullets: [
      "If it needs you at 100% to function, it's not a system. It's a hope. Build for your worst day.",
      "Your brain runs on limited neurotransmitters. Design for the low-dopamine days, not the hyperfocused ones."
    ],
    takeaway: "Build for your worst day, not your best."
  },
  {
    number: 2,
    title: "Can I see it without looking for it?",
    listText: "If you have to open something to see it, it doesn't exist. Out of sight = out of existence.",
    bullets: [
      "If you have to open an app, folder, or cabinet to see it, it doesn't exist.",
      "Out of sight is out of existence for ADHD brains. Keep your systems directly in your visual field."
    ],
    takeaway: "Out of sight = out of existence."
  },
  {
    number: 3,
    title: "Does it live in one place?",
    listText: "Every extra place is another decision. ADHD brains have a decision budget. One home.",
    bullets: [
      "Every extra place to check is another decision your brain has to make.",
      "ADHD brains have a limited decision budget. Give your system one clear, absolute home."
    ],
    takeaway: "One home beats constant searching."
  },
  {
    number: 4,
    title: "What's the smallest version that still counts?",
    listText: "Cut it in half. Then in half again. The smallest version that still counts IS the version.",
    bullets: [
      "Cut the routine in half. Then cut it in half again.",
      "The smallest possible action keeps the momentum alive when you have zero motivation."
    ],
    takeaway: "A tiny step is infinitely better than zero steps."
  },
  {
    number: 5,
    title: "What's my re-entry point?",
    listText: "You will fall off. The question is whether you have a way back in. Decide it before you fall.",
    bullets: [
      "You will fall off. ADHDers are consistently inconsistent. Decide your way back in before you fall off.",
      "Not the full routine—just the tiniest, lowest-friction step that gets you near it again."
    ],
    takeaway: "A re-entry point beats a perfect routine you keep abandoning."
  },
  {
    number: 6,
    title: "When's the last time this actually helped me?",
    listText: "If you can't answer that, it's either too complicated or it's already run its course.",
    bullets: [
      "Routines have expiration dates. When the initial novelty wears off, systems break.",
      "If it hasn't helped you recently, it's either too complicated or it has run its course."
    ],
    takeaway: "Let go of systems that no longer serve you."
  },
  {
    number: 7,
    title: "Is this shiny object syndrome or a real failure?",
    listText: "Novelty-seeking applies to systems too. Before you abandon it, ask: did the current system stop working or am I bored?",
    bullets: [
      "Novelty-seeking behavior applies to organization and productivity tools too.",
      "Before you abandon a setup, ask: did the system fail, or am I just bored?"
    ],
    takeaway: "Differentiate between a broken system and a bored brain."
  }
];

export default function SevenCommandmentsPage() {
  const [hasUnlocked, setHasUnlocked] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [viewMode, setViewMode] = useState<"slides" | "list">("slides");
  const [activeSlide, setActiveSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Hidden trick to view the unlocked page instantly!
    if (typeof window !== 'undefined' && window.location.search.includes('preview=true')) {
      setHasUnlocked(true);
    }
  }, []);

  // Keyboard navigation for Slides View
  useEffect(() => {
    if (viewMode !== "slides" || !hasUnlocked) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        changeSlide((activeSlide + 1) % SLIDES.length);
      } else if (e.key === "ArrowLeft") {
        changeSlide((activeSlide - 1 + SLIDES.length) % SLIDES.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [viewMode, hasUnlocked, activeSlide]);

  const changeSlide = (index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveSlide(index);
      setIsTransitioning(false);
    }, 150);
  };

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
        
        {/* Header Section (Always Visible) - Enlarged Logo */}
        <div className="space-y-6">
          <div className="flex justify-between items-start">
            <h1 className="text-4xl md:text-5xl font-serif font-black leading-[1.15] text-brand-charcoal">
              The 7 Commandments <br/>
              of ADHD <span className="font-handwriting text-[#48644e] text-5xl md:text-6xl font-normal">Systems</span>
            </h1>
            <div className="w-28 h-28 shrink-0 hidden sm:block relative opacity-90">
               <Image src="/logo-transparent.png" alt="LG ADHD Coaching" fill className="object-contain" />
            </div>
          </div>
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
                    className="w-full bg-[#48644e] hover:bg-[#3d5542] disabled:opacity-50 text-white h-12 rounded-full font-bold shadow-md flex items-center justify-center gap-2 transition-all"
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
          <div className={`space-y-6 transition-all duration-1000 ${!hasUnlocked ? "opacity-60 blur-[3px] scale-[0.95] transform-gpu origin-top pointer-events-none select-none" : "opacity-100 blur-0 scale-100 transform-gpu origin-top"}`}>
            
            {/* Stretched-out Intro Text Block (Full Width) */}
            <div className="border-l-4 border-[#48644e] pl-5">
              <p className="text-base md:text-lg font-medium leading-relaxed text-brand-charcoal">
                Most ADHD routines aren't designed badly. They're designed for the version of you who slept 8 hours, had coffee, and felt like a functional human. <span className="bg-[#48644e]/10 px-1.5 py-0.5 rounded font-bold border border-[#48644e]/15">That version of you is not the one who needs the system.</span> These 7 commandments are the exact questions I use both with myself and my coaching clients.
              </p>
            </div>

            {/* View Mode Toggle - Right-aligned and placed directly above the slides/list */}
            <div className="flex justify-end z-10 relative">
              <div className="flex items-center bg-white border border-brand-border rounded-full p-1 shadow-sm">
                <button
                  onClick={() => setViewMode("slides")}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all ${
                    viewMode === "slides"
                      ? "bg-[#48644e] text-white shadow-sm"
                      : "text-brand-charcoal hover:bg-brand-cream"
                  }`}
                >
                  <Presentation className="w-3.5 h-3.5" /> Slides Mode
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all ${
                    viewMode === "list"
                      ? "bg-[#48644e] text-white shadow-sm"
                      : "text-brand-charcoal hover:bg-brand-cream"
                  }`}
                >
                  <List className="w-3.5 h-3.5" /> Full List
                </button>
              </div>
            </div>

            {/* ═══ SLIDES MODE ═══ */}
            {viewMode === "slides" && (
              <div className="space-y-6">
                <div className="relative bg-[#f4f0e6] border-2 border-brand-border rounded-3xl p-8 md:p-12 shadow-xl min-h-[480px] flex flex-col justify-between overflow-hidden transition-all duration-300">
                  {/* Decorative Leaves */}
                  <LeafTopRight />
                  <LeafBottomLeft />
                  
                  {/* Slide Top Details - Enlarged Logo */}
                  <div className="flex justify-between items-center z-10">
                    <div className="w-20 h-20 relative opacity-80">
                      <Image src="/logo-transparent.png" alt="LG ADHD Coaching" fill className="object-contain" />
                    </div>
                    <span className="text-xs font-bold tracking-widest text-[#48644e] uppercase bg-[#e4ebe6] px-3.5 py-1.5 rounded-full border border-brand-sage/15 shadow-sm">
                      Question {SLIDES[activeSlide].number} of 7
                    </span>
                  </div>

                  {/* Slide Main Content with Transition */}
                  <div className={`my-6 space-y-6 z-10 transition-all duration-150 ${isTransitioning ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"}`}>
                    
                    {/* Highlighted Heading Card */}
                    <div className="bg-[#e4ebe6] border border-brand-sage/20 rounded-2xl p-5 md:p-6 text-center shadow-sm max-w-2xl mx-auto">
                      <h2 className="text-2xl md:text-4xl font-serif font-black text-[#142f2d] leading-tight">
                        #{SLIDES[activeSlide].number} {SLIDES[activeSlide].title}
                      </h2>
                    </div>

                    {/* Bullet Points */}
                    <div className="space-y-4 max-w-xl mx-auto pt-2">
                      {SLIDES[activeSlide].bullets.map((bullet, idx) => (
                        <div key={idx} className="flex gap-3.5 items-start">
                          <CheckCircle2 className="w-5 h-5 text-[#48644e] shrink-0 mt-0.5" />
                          <p className="text-base md:text-lg font-sans text-[#142f2d] leading-relaxed">
                            {bullet}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Slide Handwriting Takeaway (Bottom Callout) */}
                  <div className={`pt-6 border-t border-brand-border/40 z-10 text-center transition-all duration-150 ${isTransitioning ? "opacity-0" : "opacity-100"}`}>
                    <p className="font-handwriting text-2xl md:text-3xl text-[#48644e] font-medium">
                      {SLIDES[activeSlide].takeaway}
                    </p>
                  </div>
                </div>

                {/* Slide Navigation Panel */}
                <div className="flex items-center justify-between max-w-sm mx-auto w-full pt-2">
                  <button
                    onClick={() => changeSlide((activeSlide - 1 + SLIDES.length) % SLIDES.length)}
                    className="w-12 h-12 rounded-full border-2 border-brand-border flex items-center justify-center bg-white hover:bg-[#48644e] hover:text-white transition-all text-brand-charcoal shadow-sm active:scale-95"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-xs font-bold text-brand-warm-gray tracking-widest uppercase">
                      Commandment {activeSlide + 1} / {SLIDES.length}
                    </span>
                    <div className="flex gap-1.5 pt-1">
                      {SLIDES.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => changeSlide(idx)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            idx === activeSlide ? "bg-[#48644e] w-4" : "bg-brand-border"
                          }`}
                          aria-label={`Go to slide ${idx + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <button
                    onClick={() => changeSlide((activeSlide + 1) % SLIDES.length)}
                    className="w-12 h-12 rounded-full border-2 border-brand-border flex items-center justify-center bg-white hover:bg-[#48644e] hover:text-white transition-all text-brand-charcoal shadow-sm active:scale-95"
                    aria-label="Next slide"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {/* ═══ LIST MODE ═══ */}
            {viewMode === "list" && (
              <div className="space-y-8">
                
                {/* Updated Green Instruction Box with Two Checkpoints */}
                <div className="bg-[#e4ebe6] border border-brand-border/40 rounded-2xl p-5 md:p-6 space-y-3.5 shadow-sm">
                  <div className="flex gap-3 items-start">
                    <CheckCircle2 className="w-5 h-5 text-[#48644e] shrink-0 mt-0.5" />
                    <p className="font-bold text-sm md:text-base text-brand-charcoal">
                      Run any new system through the first 5 to make sure they're ADHD-proof.
                    </p>
                  </div>
                  <div className="flex gap-3 items-start">
                    <CheckCircle2 className="w-5 h-5 text-[#48644e] shrink-0 mt-0.5" />
                    <p className="font-bold text-sm md:text-base text-brand-charcoal">
                      The last two are for systems you already have in place but need to audit.
                    </p>
                  </div>
                </div>

                {/* 7 Commandments List Items */}
                <div className="flex flex-col gap-y-8 pt-2">
                  {SLIDES.map((slide) => (
                    <div key={slide.number} className="flex gap-4 md:gap-6 items-start border-b border-dashed border-brand-border/40 pb-6 last:border-b-0 last:pb-0">
                      <span className="text-4xl md:text-5xl font-serif font-black italic text-[#48644e] shrink-0 w-8 md:w-12">
                        {slide.number}
                      </span>
                      <div className="space-y-2 mt-1">
                        <h3 className="text-xl font-bold leading-tight text-brand-charcoal">{slide.title}</h3>
                        <p className="text-brand-warm-gray font-medium text-sm md:text-base leading-relaxed">
                          {slide.listText}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Upsell Banner - workbook link points directly to /MMTDS-workbook, background color changed to dark sage #48644e */}
            <div className="bg-[#48644e] rounded-2xl p-6 md:p-8 text-white mt-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-1 flex-1 text-center md:text-left">
                <p className="text-lg md:text-xl font-medium">Get the full system in my new workbook:</p>
                <p className="text-lg md:text-xl font-medium"><span className="font-serif italic font-bold">Manipulating Myself to Do Stuff</span> with 20+ worksheets inside!</p>
              </div>
              <Link href="/MMTDS-workbook" className="shrink-0 inline-flex items-center justify-center gap-2 bg-brand-cream text-brand-charcoal px-8 py-3.5 rounded-full font-bold shadow-md hover:bg-white transition-all whitespace-nowrap">
                GET THE WORKBOOK <ArrowRight className="w-4 h-4"/>
              </Link>
            </div>
            
            <div className="flex justify-between items-center text-xs text-[#333333]/70 pt-8 pb-8">
              <p>© Liana Groombridge · ICF-Certified ADHD Coach (ACC, CACP)</p>
              <p className="font-serif italic text-right hidden sm:block">made for the brain that forgets where it put things</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
