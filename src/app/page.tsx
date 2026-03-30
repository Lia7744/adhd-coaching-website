"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowRight, Camera, CheckCircle2, ChevronDown, Coffee, ExternalLink, Link2, Mail, MessageCircle, Sparkles, X, Lock } from "lucide-react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Quiz from "@/components/Quiz";

/* ─── Animated section wrapper ─── */
function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── FAQ Accordion item ─── */
function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <Reveal delay={index * 0.08}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-brand-border hover:border-brand-sage/40 transition-all duration-300 group"
      >
        <div className="flex items-center justify-between gap-4">
          <h4 className="font-bold text-lg text-brand-charcoal group-hover:text-brand-sage transition-colors">{q}</h4>
          <ChevronDown className={`w-5 h-5 text-brand-warm-gray transition-transform duration-300 flex-shrink-0 ${open ? "rotate-180" : ""}`} />
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <p className="text-brand-warm-gray leading-relaxed mt-4 pr-8">{a}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </Reveal>
  );
}

export default function Home() {
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  useEffect(() => {
    // Check if URL has ?quiz=true parameter 
    if (typeof window !== "undefined" && window.location.search.includes("quiz=true")) {
      setIsQuizOpen(true);
      window.history.replaceState({}, document.title, window.location.pathname);
      return;
    }

    const timer = setTimeout(() => {
      const hasSeenQuiz = localStorage.getItem("hasSeenQuiz");
      if (!hasSeenQuiz) {
        setIsQuizOpen(true);
        localStorage.setItem("hasSeenQuiz", "true");
      }
    }, 15000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      {/* ═══ NAVIGATION ═══ */}
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 glass"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <a href="/" className="flex items-center gap-3">
              <Image src="/logo-transparent.png" alt="LG ADHD Coaching" width={80} height={80} />
              <span className="text-xl sm:text-2xl font-serif font-black text-brand-charcoal tracking-tight">
                Liana Groombridge <span className="text-brand-warm-gray font-normal">| ADHD Coaching</span>
              </span>
            </a>
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => setIsQuizOpen(true)} className="px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-widest bg-brand-gold text-brand-cream hover:bg-brand-gold-hover transition-colors">Take the Quiz</button>
              <a href="/" className="text-sm font-medium text-brand-warm-gray hover:text-brand-charcoal transition-colors animated-underline">Home</a>
              <a href="/services" className="text-sm font-medium text-brand-warm-gray hover:text-brand-charcoal transition-colors animated-underline">Services</a>
              <a href="/shop" className="text-sm font-medium text-brand-warm-gray hover:text-brand-charcoal transition-colors animated-underline">Shop</a>
              <a href="/tracker" className="flex items-center gap-2 text-brand-sage font-bold text-sm bg-brand-sage/10 px-3 py-1.5 rounded-full"><Lock className="w-3.5 h-3.5" /> Client Portal</a>
            </div>
          </div>
        </div>
      </motion.nav>

      <main>
        {/* ═══ HERO ═══ */}
        <section className="relative min-h-[90vh] flex items-center justify-center pt-28 overflow-hidden">
          {/* Decorative blobs */}
          <div className="absolute top-20 left-[10%] w-72 h-72 bg-brand-sage/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-[10%] w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl animate-float-delayed" />

          <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10 text-center space-y-10">
            <Reveal>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-sage-light text-brand-sage text-xs font-bold tracking-widest uppercase border border-brand-sage/20"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Different brain wiring requires different strategies.
              </motion.div>
            </Reveal>
            <Reveal delay={0.15}>
              <h1 className="text-5xl sm:text-6xl lg:text-8xl font-serif font-black leading-[1.05] text-brand-charcoal tracking-tight">
                Why can't I just<br />
                <span className="gradient-text">do the thing?</span>
              </h1>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="max-w-xl mx-auto text-lg sm:text-xl text-brand-warm-gray leading-relaxed">
                Take a 2-minute quiz to discover your #1 ADHD productivity blocker — 
                and get a personalized strategy that actually works for your brain.
              </p>
            </Reveal>
            <Reveal delay={0.45}>
              <div className="flex flex-col items-center gap-5 pt-2">
                <button
                  onClick={() => setIsQuizOpen(true)}
                  className="group relative inline-flex items-center justify-center gap-3 bg-brand-charcoal text-white h-16 px-10 rounded-full text-xl font-bold shadow-lg transition-all hover:scale-105 active:scale-95 glow-sage"
                >
                  <Sparkles className="w-5 h-5 text-brand-gold" />
                  Take the Quiz
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <a
                  href="https://calendar.app.google/Nwa6i4WGsMysUzvu8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-brand-warm-gray hover:text-brand-sage transition-colors animated-underline"
                >
                  or book a free consultation →
                </a>
              </div>
            </Reveal>

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="pt-12"
            >
              <a href="#about" className="inline-flex flex-col items-center gap-2 text-brand-warm-gray/40 hover:text-brand-warm-gray transition-colors">
                <span className="text-xs font-medium uppercase tracking-widest">Scroll</span>
                <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                  <ChevronDown className="w-5 h-5" />
                </motion.div>
              </a>
            </motion.div>
          </div>
        </section>

        {/* ═══ ABOUT ═══ */}
        <section id="about" className="py-28 relative">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-5 gap-16 items-center">
              {/* Photo */}
              <Reveal className="lg:col-span-2">
                <div className="relative max-w-sm mx-auto">
                  <div className="absolute -inset-3 bg-gradient-to-br from-brand-sage/20 to-brand-gold/20 rounded-[2rem] blur-xl" />
                  <div className="relative overflow-hidden rounded-[2rem] shadow-2xl border-2 border-white/50">
                    <Image
                      src="/headshot-v2.jpg"
                      alt="Liana Groombridge - ADHD Coach"
                      width={480}
                      height={640}
                      className="object-cover w-full aspect-[3/4]"
                      priority
                    />
                  </div>
                </div>
              </Reveal>

              {/* Bio */}
              <div className="lg:col-span-3 space-y-8">
                <Reveal>
                  <span className="text-sm font-bold text-brand-sage uppercase tracking-widest">About Me</span>
                  <h2 className="text-4xl sm:text-5xl font-serif font-black text-brand-charcoal mt-2">
                    Hi, I'm Liana.
                  </h2>
                </Reveal>
                <Reveal delay={0.1}>
                  <div className="space-y-5 text-brand-warm-gray text-lg leading-relaxed">
                    <p>
                      I'm Liana. I've spent over 8 years in the social services and mental health trenches, working with everyone from overwhelmed students to seniors. I began coaching adults in 2021, and by 2023, I decided to work exclusively with ADHDers—because I got tired of watching brilliant people try to force themselves into neurotypical boxes.
                    </p>
                    <p>
                      I work with a wide range of adults. I help employees, business owners, and university/college students build functional systems so they don't have to rely on last-minute adrenaline to get things done. I also help late-diagnosed adults take that "well, that explains the last 30 years" realization and turn it into actual strategy. You can't change a pattern you can't identify, so we figure out how your specific brain operates. That way, you can start making informed decisions instead of just wondering why you keep repeating the same cycles.
                    </p>
                    <p>
                      I also help folks navigate messy life transitions without burning everything down. Thanks to my background in mental health, I understand the complexities of ADHD and how it plays with its frequent plus-ones: anxiety and depression. I'm not here to "fix" you. I'm here to help you work with the brain you have.
                    </p>
                  </div>
                </Reveal>
                <Reveal delay={0.2}>
                  <div className="flex flex-wrap gap-3">
                    {["ICF Certified", "ACC Certified", "CACP Certified", "Fellow ADHDer"].map((tag) => (
                      <span key={tag} className="px-4 py-2 bg-brand-sage-light text-brand-sage rounded-full text-sm font-bold border border-brand-sage/20">
                        {tag}
                      </span>
                    ))}
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ QUALIFICATIONS & PHILOSOPHY ═══ */}
        <section id="qualifications" className="py-28 bg-[#1A1A1A] text-white relative noise overflow-hidden">
          <div className="absolute top-0 left-[20%] w-96 h-96 bg-brand-sage/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-[10%] w-80 h-80 bg-brand-gold/5 rounded-full blur-3xl" />
          
          <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Qualifications Card */}
              <Reveal>
                <div className="glass-dark rounded-3xl p-8 sm:p-10 h-full">
                  <span className="text-xs font-bold tracking-widest uppercase text-brand-gold">Credentials</span>
                  <h3 className="text-3xl font-serif font-bold mt-3 mb-6">Qualifications</h3>
                  <p className="text-white/60 leading-relaxed mb-8">
                    I hold a BA in Applied Human Sciences along with a college degree in Special Care Counselling. I am an ICF certified coach (ACC) as well as a Certified ADHD Coach Practitioner.
                  </p>
                  <ul className="space-y-4">
                    {[
                      "Associate Certified Coach (ACC) — ICF",
                      "Certified ADHD Coach Practicioner (CACP)",
                      "BA in Applied Human Sciences",
                      "Diploma in Special Care Counseling"
                    ].map((item, i) => (
                      <Reveal key={i} delay={i * 0.1}>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-brand-sage mt-0.5 flex-shrink-0" />
                          <span className="text-white/80 font-medium">{item}</span>
                        </li>
                      </Reveal>
                    ))}
                  </ul>
                </div>
              </Reveal>

              {/* Philosophy Card */}
              <Reveal delay={0.15}>
                <div className="glass-dark rounded-3xl p-8 sm:p-10 h-full">
                  <span className="text-xs font-bold tracking-widest uppercase text-brand-gold">Approach</span>
                  <h3 className="text-3xl font-serif font-bold mt-3 mb-6">The Philosophy</h3>
                  <ul className="space-y-6">
                    {[
                      { title: "Leave the mask at the door", desc: "This is a zero-apology zone for how your brain operates. Bring your chaos, your hyper-fixations, and your 45 open browser tabs. You don't have to pretend to be neurotypical here." },
                      { title: "Curiosity over judgment", desc: "If shame and self-blame worked, they would have worked by now. We take a solution-focused approach—treating roadblocks as data to get curious about, not character flaws to judge." },
                      { title: "Interest-based systems", desc: "Neurotypical productivity hacks run on consistency and importance. Your brain doesn't work that way. We build systems designed for your actual interest-based nervous system, using novelty, challenge, and urgency as actual fuel." },
                      { title: "Tactics, not toxic positivity", desc: "No preachy \"just try harder\" advice or generic affirmations. We look at what you're actually good at and use a strength-based approach to build practical strategies that survive in the real world." }
                    ].map((item, i) => (
                      <Reveal key={i} delay={i * 0.1}>
                        <li className="group">
                          <h4 className="font-bold text-white group-hover:text-brand-gold transition-colors">{item.title}</h4>
                          <p className="text-white/50 text-sm mt-1">{item.desc}</p>
                        </li>
                      </Reveal>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>

            {/* Certification Badges */}
            <Reveal delay={0.3}>
              <div className="mt-8 pt-8 border-t border-white/10">
                <p className="text-center text-xs font-bold tracking-widest uppercase text-white/30 mb-8">Affiliated & Certified</p>
                <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14">
                  {[
                    { name: "CACP Certified Coach", href: "https://certifiedcoachesalliance.org/verified/SC959457_LGroombridge.png", img: "/badges/cacp.png", w: 70, h: 70 },
                    { name: "ICF ACC", href: "https://www.credly.com/badges/7e313d15-95cc-4a8f-9e6a-eb8ff42f43a7/public_url", img: "/badges/icf-acc.png", w: 70, h: 70 },
                    { name: "ACO Professional ADHD Coach", href: "https://www.adhdcoaches.org/find-your-coach", img: "/badges/aco.png", w: 70, h: 70 },
                    { name: "Psychology Today", href: "https://www.psychologytoday.com/profile/996320", img: "/badges/psychology-today.png", w: 70, h: 70 },
                    { name: "Certified MentorCoach", href: "https://www.mentorcoach.com/", img: "/badges/cmc-mentorcoach.webp", w: 160, h: 52 },
                  ].map((badge, i) => (
                    <a
                      key={i}
                      href={badge.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="opacity-80 hover:opacity-100 transition-all duration-300 hover:scale-110"
                      title={badge.name}
                    >
                      <Image src={badge.img} alt={badge.name} width={badge.w} height={badge.h} className="object-contain" />
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══ CTA BANNER ═══ */}
        <section className="relative py-14 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-sage/5 via-transparent to-brand-gold/5" />
          <div className="max-w-3xl mx-auto px-6 lg:px-8 relative z-10 text-center space-y-8">
            <Reveal>
              <h2 className="text-4xl sm:text-5xl font-serif font-black text-brand-charcoal">
                Ready to work with your brain?
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-lg text-brand-warm-gray max-w-lg mx-auto">
                Book a free 15-minute consultation. No pressure to sign up - just a conversation to see if we're a good fit.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <a
                href="https://calendar.app.google/Nwa6i4WGsMysUzvu8"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-brand-sage to-brand-sage-hover text-white h-16 px-10 rounded-full text-xl font-bold shadow-xl transition-all hover:scale-105 active:scale-95 hover:shadow-2xl"
              >
                Book a free consultation
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Reveal>
          </div>
        </section>

        {/* ═══ FAQ ═══ */}
        <section id="faq" className="py-14">
          <div className="max-w-3xl mx-auto px-6 lg:px-8 space-y-12">
            <div className="text-center space-y-4">
              <Reveal>
                <span className="text-sm font-bold text-brand-sage uppercase tracking-widest">Got Questions?</span>
                <h2 className="text-4xl sm:text-5xl font-serif font-black text-brand-charcoal mt-2">FAQ</h2>
              </Reveal>
            </div>
            <div className="space-y-3">
              {[
                { q: "What is ADHD Coaching?", a: "ADHD coaching is like having a personal trainer for your brain — but way more fun and a lot less sweaty. It combines specialized understanding of how ADHD brains work with professional coaching methods that help you discover your own solutions and reach your potential." },
                { q: "Do I need an ADHD diagnosis?", a: "Nope! Diagnosed or not, you are welcome. I work with many clients who have official diagnoses or suspect they have ADHD. My training is focused on helping adults better manage their executive functions." },
                { q: "What's a typical session like?", a: "We start with a check-in and review how things went since our last session. Then we focus on what's weighing on you most that week. Before we wrap up, we figure out your next moves together — not homework, but realistic steps that actually fit your life." },
                { q: "How can you coach me if you also have ADHD?", a: "Ever notice how you can clean someone else's house with laser focus, but your own place overwhelms you? Same thing. I genuinely get your struggles because I've experienced them myself, and because coaching ADHDers is a genuine passion, I'm naturally fully engaged." },
                { q: "Coaching vs. therapy — what's the difference?", a: "Therapy looks at the 'why'. Coaching looks at the 'how'. We tackle topics through practical, solution-focused strategies — brainstorming sessions, skill-building, and creating actionable plans rather than processing emotions." },
                { q: "Do you provide insurance receipts?", a: "Unfortunately coaching isn't covered by most insurers. You may be able to file it under your taxes for a deduction. Please speak with an accountant to be sure!" },
              ].map((faq, i) => (
                <FaqItem key={i} q={faq.q} a={faq.a} index={i} />
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ═══ FOOTER ═══ */}
      <footer className="bg-[#1A1A1A] text-white py-20 mt-auto relative noise overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-5 space-y-6">
              <div className="flex items-center gap-4">
                <Image src="/logo-transparent.png" alt="LG ADHD Coaching" width={72} height={72} className="brightness-0 invert" />
                <h3 className="text-2xl font-serif font-bold">Liana Groombridge</h3>
              </div>
              <p className="text-white/50 max-w-sm leading-relaxed">
                ICF-certified ADHD coaching. Personalized plans tailored to each client's unique brain.
              </p>
              <a href="mailto:hello@lianagroombridge.com" className="inline-flex items-center gap-2 text-brand-gold hover:text-brand-gold-hover transition-colors text-sm font-medium">
                <Mail className="w-4 h-4" />
                hello@lianagroombridge.com
              </a>
              {/* Social Icons */}
              <div className="flex items-center gap-4 pt-2">
                {/* Instagram */}
                <a href="https://www.instagram.com/adhdcoach_liana/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all hover:scale-110" title="Instagram">
                  <svg className="w-4 h-4 text-white/60 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
                {/* TikTok */}
                <a href="https://www.tiktok.com/@adhdcoach_liana" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all hover:scale-110" title="TikTok">
                  <svg className="w-4 h-4 text-white/60 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.26 8.26 0 004.84 1.56V6.79a4.85 4.85 0 01-1.07-.1z"/></svg>
                </a>
                {/* Facebook */}
                <a href="https://www.facebook.com/adhdcoachliana/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all hover:scale-110" title="Facebook">
                  <svg className="w-4 h-4 text-white/60 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                {/* LinkedIn */}
                <a href="https://www.linkedin.com/in/lianagroombridge/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all hover:scale-110" title="LinkedIn">
                  <svg className="w-4 h-4 text-white/60 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
              </div>
            </div>
            <div className="md:col-span-3 md:col-start-8">
              <h5 className="text-xs font-bold tracking-widest uppercase text-white/30 mb-6">Quick Links</h5>
              <ul className="space-y-3 text-sm">
                {[
                  { label: "About", href: "#about" },
                  { label: "Qualifications", href: "#qualifications" },
                  { label: "Shop", href: "/shop" },
                  { label: "FAQ", href: "#faq" },
                ].map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-white/50 hover:text-white transition-colors animated-underline">{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:col-span-2">
              <h5 className="text-xs font-bold tracking-widest uppercase text-white/30 mb-6">Resources</h5>
              <ul className="space-y-3 text-sm">
                <li>
                  <button onClick={() => setIsQuizOpen(true)} className="text-white/50 hover:text-white transition-colors animated-underline">
                    ADHD Quiz
                  </button>
                </li>
                <li>
                  <a href="https://calendar.app.google/Nwa6i4WGsMysUzvu8" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors animated-underline">
                    Book a Call
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-16 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/30">
            <p>© 2026 Liana Groombridge Coaching. All rights reserved.</p>
            <p>Built with coffee and ADHD ☕</p>
          </div>
        </div>
      </footer>

      {/* ═══ QUIZ MODAL ═══ */}
      <AnimatePresence>
        {isQuizOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsQuizOpen(false)}
              className="absolute inset-0 bg-black/50 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative z-10 w-full max-w-2xl"
            >
              <Quiz onClose={() => setIsQuizOpen(false)} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
