"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check, Zap, Repeat2, GraduationCap, Lock } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const BOOKING_URL = "https://calendar.app.google/Nwa6i4WGsMysUzvu8";

// --- Pricing (Whop URLs) ---
const PRICING = {
  audit:    { USD: { amount: "$139", label: "USD / One-Time",  cta: "Book Your Audit",           href: "https://whop.com/checkout/plan_GWuskTOLF28Tv" },
               CAD: { amount: "$189", label: "CAD / One-Time",  cta: "Book Your Audit",           href: "https://whop.com/checkout/plan_73yVAHaLGvgUx" } },
  weekly:   { USD: { amount: "$499", label: "USD / month",     cta: "Sign up",                    href: "https://whop.com/checkout/plan_DrnOxv8PCNWJ8" },
               CAD: { amount: "$679", label: "CAD / month",     cta: "Sign up",                    href: "https://whop.com/checkout/plan_TTSt5gdDkI6mN" } },
  student:  { USD: { amount: "$249", label: "USD / month",     cta: "Start with an Audit",        href: "https://whop.com/checkout/plan_GWuskTOLF28Tv" },
               CAD: { amount: "$339", label: "CAD / month",     cta: "Start with an Audit",        href: "https://whop.com/checkout/plan_73yVAHaLGvgUx" } },
};

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function PlanInclude({ text, dark = false }: { text: string; dark?: boolean }) {
  return (
    <li className="flex items-start gap-2">
      <Check className="w-4 h-4 mt-0.5 flex-shrink-0 text-brand-sage" />
      <span className={`text-sm leading-snug ${dark ? "text-white/80" : "text-brand-charcoal"}`}>{text}</span>
    </li>
  );
}

export default function ServicesPage() {
  const [currency, setCurrency] = useState<"USD" | "CAD">("USD");
  const [currencyLoaded, setCurrencyLoaded] = useState(false);

  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((r) => r.json())
      .then((data) => { setCurrency(data?.country_code === "CA" ? "CAD" : "USD"); })
      .catch(() => setCurrency("USD"))
      .finally(() => setCurrencyLoaded(true));
  }, []);

  const c = currency;

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

      <main className="flex-grow pt-28">

        {/* ── HERO ── */}
        <section className="py-16 px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <Reveal>
              <span className="text-sm font-bold text-brand-sage uppercase tracking-widest">Coaching Services</span>
              <h1 className="text-5xl sm:text-6xl font-serif font-black text-brand-charcoal mt-3 leading-tight">
                Strategies built for
                <span className="gradient-text block">your actual brain.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-xl text-brand-warm-gray leading-relaxed max-w-2xl mx-auto">
                No generic advice. No &quot;just make a routine.&quot; We figure out how your specific brain operates and build systems designed to work with it — not against it.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-sm text-brand-warm-gray/70 italic">
                All plans are month-to-month. No contracts. Cancel or pause any time.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ── CURRENCY PILL ── */}
        {currencyLoaded && (
          <div className="text-center mb-2">
            <span className="inline-block bg-brand-white border border-brand-border text-brand-warm-gray text-xs font-bold px-4 py-2 rounded-full">
              Prices shown in {c === "CAD" ? "🇨🇦 Canadian dollars (CAD)" : "🇺🇸 US dollars (USD)"}
            </span>
          </div>
        )}

        {/* ── PRIMARY PLANS: AUDIT + WEEKLY ── */}
        <section className="py-12 px-6 lg:px-8">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 items-stretch">

            {/* ── CARD 1: Audit ── */}
            <Reveal delay={0}>
              <div className="bg-brand-white border-2 border-brand-border rounded-3xl p-8 sm:p-10 shadow-xl flex flex-col gap-6 h-full">
                <div className="min-h-[160px]">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-brand-gold text-brand-charcoal">Try It First</span>
                    <Zap className="w-6 h-6 text-brand-sage" />
                  </div>

                  <div className="mt-6">
                    <h2 className="text-2xl font-serif font-bold text-brand-charcoal leading-tight">The Audit & Action Session</h2>
                    <div className="flex items-baseline gap-1 mt-3">
                      <span className="text-4xl font-serif font-black text-brand-charcoal">
                        {currencyLoaded ? PRICING.audit[c].amount : "—"}
                      </span>
                      <span className="text-sm font-medium text-brand-warm-gray">
                        {currencyLoaded ? PRICING.audit[c].label : ""}
                      </span>
                    </div>
                    <p className="text-sm font-bold italic text-brand-warm-gray mt-2">The starting line.</p>
                  </div>
                </div>

                <div className="min-h-[130px]">
                  <p className="text-sm text-brand-warm-gray leading-relaxed">
                    This is a call to move from overwhelmed to actionable. In 45 minutes, we aren&apos;t going to fix your entire life, but we are going to get honest about the immediate chaos. Our goal is to isolate the one roadblock draining your executive function the most right now and build a workaround for it. You&apos;ll walk away with at least one strategy you can use this week, plus a clear roadmap of how we&apos;d bridge the rest of the gap if we keep working together.
                  </p>
                </div>

                <div className="min-h-[110px] flex flex-col justify-center">
                  <div className="bg-brand-cream border border-brand-border rounded-2xl px-4 py-3 text-sm text-brand-warm-gray italic">
                    Note: Perfect for a test run, and the mandatory first step for the Semester Survival Plan. Ready for the Weekly Momentum Plan? You can skip this and sign up under that plan.
                  </div>
                </div>

                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-brand-warm-gray/50 mb-3">What&apos;s included</p>

                  <ul className="space-y-2">
                    <PlanInclude text="One 45-minute deep-dive video call" />
                    <PlanInclude text="At least 1 concrete strategy to bypass your biggest current roadblock" />
                    <PlanInclude text="A customized roadmap for what ongoing coaching would look like (sent after the call)" />
                  </ul>
                </div>

                <div className="bg-brand-gold/10 border border-brand-gold/30 rounded-2xl p-4">
                  <p className="text-xs font-black uppercase tracking-widest text-brand-gold mb-1">⭐ Bonus</p>
                  <p className="text-sm text-brand-charcoal leading-relaxed">Sign up for the Weekly Momentum Plan within 7 days of your session, and I&apos;ll credit the full cost of this session toward your first month of coaching.</p>
                </div>

                <a
                  href={currencyLoaded ? PRICING.audit[c].href : BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center justify-center gap-2 h-14 rounded-full font-bold text-base shadow-md transition-all hover:scale-105 active:scale-95 bg-brand-gold hover:bg-brand-gold-hover text-brand-charcoal"
                >
                  {currencyLoaded ? PRICING.audit[c].cta : "Book Your Audit"} <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </Reveal>

            {/* ── CARD 2: Weekly ── */}
            <Reveal delay={0.1}>
              <div className="bg-brand-charcoal border-2 border-brand-sage/30 rounded-3xl p-8 sm:p-10 shadow-xl flex flex-col gap-6 h-full">
                <div className="min-h-[160px]">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-brand-sage text-white">Most Popular</span>
                    <Repeat2 className="w-6 h-6 text-brand-sage" />
                  </div>

                  <div className="mt-6">
                    <h2 className="text-2xl font-serif font-bold text-white leading-tight">The Weekly Momentum Plan</h2>
                    <div className="flex items-baseline gap-1 mt-3">
                      <span className="text-4xl font-serif font-black text-brand-gold">
                        {currencyLoaded ? PRICING.weekly[c].amount : "—"}
                      </span>
                      <span className="text-sm font-medium text-white/60">
                        {currencyLoaded ? PRICING.weekly[c].label : ""}
                      </span>
                    </div>
                    <p className="text-sm font-bold italic text-white/70 mt-2">For when you&apos;re done relying on last-minute panic.</p>
                  </div>
                </div>

                <div className="min-h-[130px]">
                  <p className="text-sm text-white/70 leading-relaxed">
                    If you are an adult who is tired of surviving on sheer panic and adrenaline, consistent weekly support is exactly what you need to build regular momentum. Four sessions a month means we meet every week to keep you accountable between calls and iterate on your systems as life throws curveballs. We&apos;ll catch the roadblocks before they turn into full-blown shame spirals and do the heavy lifting together until your systems actually stick.
                  </p>
                </div>

                <div className="min-h-[110px] flex flex-col justify-center">
                  <div className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm text-white/60 italic">
                    Note: A Bi-Weekly Maintenance tier is available privately to current clients once we&apos;ve successfully built your foundational systems.
                  </div>
                </div>

                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-white/40 mb-3">What&apos;s included</p>

                  <ul className="space-y-2">
                    <PlanInclude text="Four 45-minute working sessions per month" dark />
                    <PlanInclude text="Accountability check-ins between sessions" dark />
                    <PlanInclude text="Access to the LG Coaching Tracker app" dark />
                  </ul>
                </div>

                <a
                  href={currencyLoaded ? PRICING.weekly[c].href : BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center justify-center gap-2 h-14 rounded-full font-bold text-base shadow-md transition-all hover:scale-105 active:scale-95 bg-brand-sage hover:bg-brand-sage-hover text-white"
                >
                  {currencyLoaded ? PRICING.weekly[c].cta : "Apply for Weekly Coaching"} <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </Reveal>

          </div>
        </section>

        {/* ── STUDENT SECTION DIVIDER ── */}
        <div className="max-w-5xl mx-auto px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <div className="flex-1 border-t border-brand-border" />
            <span className="text-xs font-black uppercase tracking-widest text-brand-warm-gray/50 flex items-center gap-2">
              <GraduationCap className="w-4 h-4" /> For Students
            </span>
            <div className="flex-1 border-t border-brand-border" />
          </div>
        </div>

        {/* ── STUDENT PLAN ── */}
        <section className="pb-16 px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <Reveal>
              <div className="bg-brand-sage-light border-2 border-brand-sage/20 rounded-3xl p-8 sm:p-10 shadow-xl">
                <div className="grid md:grid-cols-2 gap-10 items-start">

                  {/* Left: copy */}
                  <div className="flex flex-col gap-5">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-brand-sage text-white">Student Plan</span>
                      <GraduationCap className="w-6 h-6 text-brand-sage" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-serif font-bold text-brand-charcoal leading-tight">
                        The Semester Survival Plan
                        <span className="block text-base font-sans font-normal text-brand-warm-gray mt-1">(For Students)</span>
                      </h2>
                      <div className="flex items-baseline gap-1 mt-3">
                        <span className="text-4xl font-serif font-black text-brand-charcoal">
                          {currencyLoaded ? PRICING.student[c].amount : "—"}
                        </span>
                        <span className="text-sm font-medium text-brand-warm-gray">
                          {currencyLoaded ? PRICING.student[c].label : ""}
                        </span>
                      </div>
                      <p className="text-sm font-bold italic text-brand-warm-gray mt-2">
                        For college and university students who are tired of the 11:59 PM panic. You know what I&apos;m talking about.
                      </p>
                    </div>

                    <p className="text-sm text-brand-warm-gray leading-relaxed">
                      Student ADHD is its own specific brand of chaos. Instead of a heavy 45-minute deep dive every week, we shift to a 25-minute tactical check-in to make sure you actually submit that paper and don&apos;t spend six hours hyper-fixating on formatting a title page.
                    </p>

                    <div className="bg-white/60 border border-brand-sage/20 rounded-2xl px-4 py-3 text-sm text-brand-warm-gray italic">
                      Note: All students must start with a 45-minute Audit & Action Session so we can build your initial baseline. After that, we drop down to this 25-minute weekly sprint.
                    </div>
                  </div>

                  {/* Right: includes + CTA */}
                  <div className="flex flex-col gap-6">
                    <div>
                      <p className="text-xs font-black uppercase tracking-widest text-brand-warm-gray/50 mb-3">What&apos;s included</p>
                      <ul className="space-y-2">
                        <PlanInclude text="Four 25-minute laser-focused sessions per month" />
                        <PlanInclude text="Accountability check-ins between sessions" />
                        <PlanInclude text="Access to the LG Coaching Tracker app" />
                        <PlanInclude text="Strategies that actually work without solely relying on urgency to get things done" />
                      </ul>
                    </div>

                    <a
                      href={currencyLoaded ? PRICING.student[c].href : BOOKING_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 h-14 rounded-full font-bold text-base shadow-md transition-all hover:scale-105 active:scale-95 bg-brand-sage hover:bg-brand-sage-hover text-white"
                    >
                      {currencyLoaded ? PRICING.student[c].cta : "Start with an Audit"} <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>

                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── BOOK A CONSULT ── */}
        <section className="py-16 px-6 lg:px-8 bg-brand-white border-t border-brand-border">
          <div className="max-w-3xl mx-auto text-center">
            <Reveal>
              <div className="space-y-6">
                <span className="text-sm font-bold text-brand-sage uppercase tracking-widest">Not sure which plan is right for you?</span>
                <h2 className="text-4xl font-serif font-black text-brand-charcoal leading-tight">
                  Let&apos;s figure it out together.
                </h2>
                <p className="text-lg text-brand-warm-gray leading-relaxed max-w-xl mx-auto">
                  Book a free 15-minute consultation. No pressure to sign up — just a conversation to see if we&apos;re a good fit and which plan makes the most sense for where you are right now.
                </p>
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-sage to-brand-sage-hover text-white h-14 px-10 rounded-full text-lg font-bold shadow-xl transition-all hover:scale-105 active:scale-95"
                >
                  Book a free consultation <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </Reveal>
          </div>
        </section>

      </main>

      {/* ── FOOTER ── */}
      <footer className="py-8 text-center text-sm text-brand-warm-gray/60 border-t border-brand-border bg-brand-white">
        © 2026 Liana Groombridge Coaching
      </footer>

    </div>
  );
}
