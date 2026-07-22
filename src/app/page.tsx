"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Camera, CheckCircle2, ChevronDown, Coffee, ExternalLink, Link2, Mail, MessageCircle, Sparkles, X, Lock, Menu, Calendar } from "lucide-react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Testimonials from "@/components/Testimonials";
import { BLOG_POSTS } from "@/lib/blog-posts";

/* ─── Animated section wrapper ─── */
function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
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
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <main>
        {/* ═══ HERO ═══ */}
        <section className="relative min-h-screen flex items-center pt-32 sm:pt-40 pb-0 overflow-hidden bg-[#F9F7F3]">
          
          <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full relative z-10 flex flex-col lg:flex-row items-center justify-between h-full">
            
            <div className="text-left space-y-6 max-w-2xl lg:pb-32 lg:pt-12 relative z-20">
              <Reveal>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="inline-block text-brand-sage text-3xl sm:text-4xl font-handwriting italic mb-4"
                >
                  Different brain wiring requires different strategies.
                </motion.div>
              </Reveal>
              <Reveal delay={0.15}>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-black leading-tight text-brand-charcoal tracking-tight max-w-3xl mb-8">
                  ADHD Coaching for Adults
                </h1>
              </Reveal>
              <Reveal delay={0.3}>
                <p className="max-w-2xl text-lg sm:text-xl text-brand-charcoal leading-relaxed font-medium mb-12">
                  Late-diagnosed adults, students, business owners, professionals, or just an ADHDer trying to manage life — we work together to build custom systems designed for how your specific brain operates.
                </p>
              </Reveal>
              <Reveal delay={0.45}>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4">
                  <a
                    href="https://calendar.app.google/Nwa6i4WGsMysUzvu8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-14 px-8 rounded-full bg-brand-sage text-white font-bold text-base shadow-md hover:bg-brand-sage-hover hover:scale-105 active:scale-95 transition-all"
                  >
                    Book a Free Consultation
                    <ArrowRight className="w-5 h-5 text-white" />
                  </a>
                  <div className="relative w-full sm:w-auto">
                    <button
                      onClick={() => window.dispatchEvent(new Event("open-quiz"))}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-14 px-8 rounded-full border-2 border-brand-charcoal text-brand-charcoal hover:bg-brand-cream/50 font-bold text-base shadow-sm hover:scale-105 active:scale-95 transition-all"
                    >
                      <MessageCircle className="w-5 h-5" />
                      Take the Blocker Quiz
                    </button>
                    <div className="absolute top-full right-4 sm:left-1/2 sm:right-auto sm:-translate-x-[20%] mt-2 flex items-start text-brand-sage pointer-events-none">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="-translate-y-2 translate-x-2 rotate-[15deg]">
                        <path d="M10 4 L4 9 L10 14" />
                        <path d="M4 9 Q 14 9, 18 20" />
                      </svg>
                      <span className="font-handwriting text-3xl whitespace-nowrap -rotate-[8deg] mt-3">Feeling stuck?</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.6} className="relative w-full lg:w-1/2 mt-12 lg:mt-0 z-10">
              <div className="relative max-w-md mx-auto lg:ml-auto lg:mr-0">
                <div className="absolute -inset-3 bg-gradient-to-br from-brand-sage/20 to-brand-sage/10 rounded-[2rem] blur-xl" />
                <div className="relative overflow-hidden rounded-[2rem] shadow-2xl border-2 border-white/50 aspect-[4/5] sm:aspect-[3/4]">
                  <Image
                    src="/Liana Groombridge2 copy.jpg"
                    alt="Liana Groombridge"
                    fill
                    priority
                    className="object-cover"
                  />
                </div>
              </div>
            </Reveal>



          </div>
        </section>

        {/* ═══ HOW IT WORKS ═══ */}
        <section className="py-24 bg-white relative">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
              
              {/* Image side */}
              <Reveal delay={0.2} className="w-full h-full min-h-[400px] sm:min-h-[500px] lg:min-h-0 order-last lg:order-first">
                <div className="relative w-full h-full">
                  <div className="absolute -inset-3 bg-gradient-to-br from-brand-sage/20 to-brand-sage/10 rounded-[2rem] blur-xl" />
                  <div className="relative overflow-hidden rounded-[2rem] shadow-2xl border-2 border-white/50 h-full w-full">
                    <Image
                      src="/how-it-works.jpg"
                      alt="A clean, organized desk setup representing clear systems for ADHD brains"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </Reveal>

              {/* Text side */}
              <Reveal className="flex flex-col justify-center order-first lg:order-last">
                <div className="space-y-8">
                  <h2 className="text-4xl sm:text-5xl font-serif font-black text-brand-charcoal">
                    How it works
                  </h2>
                  <div className="prose prose-lg prose-brand max-w-none text-brand-charcoal space-y-6">
                    <p>
                      ADHD coaching is ongoing, 1:1 support built specifically around how the ADHD brain works. In each session, we don't just set goals, we build the systems and strategies to reach them and troubleshoot what's getting in the way, so progress actually sticks instead of fizzling out. Along the way, you start to learn and understand the inner workings of your own brain.
                    </p>
                    <div>
                      <h3 className="text-2xl font-serif font-bold text-brand-charcoal mb-4">The benefits:</h3>
                      <ul className="space-y-3 list-none p-0">
                        <li className="flex items-start">
                          <CheckCircle2 className="w-6 h-6 text-brand-sage mr-3 flex-shrink-0 mt-0.5" />
                          <span>Systems designed for your brain, not borrowed from a neurotypical productivity book</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="w-6 h-6 text-brand-sage mr-3 flex-shrink-0 mt-0.5" />
                          <span>Weekly accountability that keeps you moving, even when motivation is low</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="w-6 h-6 text-brand-sage mr-3 flex-shrink-0 mt-0.5" />
                          <span>A judgment-free space to talk through challenges</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="w-6 h-6 text-brand-sage mr-3 flex-shrink-0 mt-0.5" />
                          <span>Real strategies for task initiation, time management, and follow-through and more.</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Reveal>

            </div>
          </div>
        </section>
        {/* ═══ ABOUT ═══ */}
        <section id="about" className="py-28 relative bg-[#F9F7F3] overflow-hidden">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              {/* Bio */}
              <div className="lg:col-span-7 space-y-8">
                <Reveal>
                  <span className="text-sm font-bold text-brand-sage uppercase tracking-widest">About Me</span>
                  <h2 className="text-4xl sm:text-5xl font-serif font-black text-brand-charcoal mt-2">
                    Hi, I'm Liana.
                  </h2>
                </Reveal>
                <Reveal delay={0.1}>
                  <div className="space-y-5 text-brand-warm-gray text-lg leading-relaxed">
                    <p>
                      I'm an ICF-certified ADHD coach (ACC, CACP), and I've been working in mental health and social services since 2017. I started coaching adults in 2021, and by 2023, I'd shifted to working exclusively with ADHDers, because it's the first kind of work I've done where the passion never faded. I'm endlessly curious about how people work, and I believe ADHDers have a lot to offer that the world rarely gets to see. Coaching is how I help bring those strengths out from behind the noise.
                    </p>
                    <p>
                      I also have ADHD, which is part of why I ended up doing this work. It means I understand the experience from the inside, including the lost keys, the abandoned planners, the &quot;I'll start tomorrow&quot; loops, and the inexplicable inability to start a task you know is important. It doesn't mean I have all the answers. It means we work from a place of shared understanding instead of explanation.
                    </p>
                    <div className="pt-2">
                      <h3 className="font-bold text-brand-charcoal mb-2">Who I work with:</h3>
                      <p>
                        I coach adults across all kinds of life stages and situations. Employees who are tired of running on last-minute adrenaline. Business owners trying to build a company that doesn't burn them out. University and college students figuring out how to actually finish their degrees without burning themselves to the ground. And late-diagnosed adults turning that &quot;oh, that's what's been going on for 30 years&quot; realization into actual strategy.
                      </p>
                    </div>
                    <p>
                      You can't change a pattern you can't identify. So we start by understanding how your specific brain works, what's been getting in the way, and where your existing strengths are. Then we build systems that fit how you actually operate.
                    </p>
                    <p>
                      Because of my background in mental health, I also understand how ADHD interacts with its frequent plus-ones: anxiety, depression, RSD, and burnout. I'm not here to fix you. I'm here to help you stop fighting your brain and start working with it.
                    </p>
                    <div className="pt-2">
                      <a href="https://calendar.app.google/Nwa6i4WGsMysUzvu8" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 text-brand-sage font-bold hover:text-brand-sage-hover transition-colors">
                        Book a free consultation
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </a>
                    </div>
                  </div>
                </Reveal>
                <Reveal delay={0.2}>
                  <div className="flex flex-wrap items-center gap-2 md:gap-3 mt-8 text-brand-sage font-bold uppercase tracking-wider text-[10px] sm:text-xs">
                    {["ICF Certified", "ACC Certified", "CACP Certified", "Fellow ADHDer"].map((tag, i, arr) => (
                      <div key={tag} className="flex items-center gap-2 md:gap-3 whitespace-nowrap">
                        <span>{tag}</span>
                        {i < arr.length - 1 && <span className="text-brand-sage/30">✦</span>}
                      </div>
                    ))}
                  </div>
                </Reveal>
              </div>

              {/* Photo */}
              <Reveal className="lg:col-span-5 order-first lg:order-last lg:mt-[120px]">
                <div className="relative w-full max-w-[460px] mx-auto">
                  <div className="absolute -inset-3 bg-gradient-to-br from-brand-sage/20 to-brand-sage/10 rounded-[2rem] blur-xl" />
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
            </div>
          </div>
        </section>

        {/* ═══ QUALIFICATIONS & PHILOSOPHY ═══ */}
        <section id="qualifications" className="py-28 bg-[#1A1A1A] text-white relative noise overflow-hidden">
          <div className="absolute top-0 left-[20%] w-96 h-96 bg-brand-sage/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-[10%] w-80 h-80 bg-brand-sage/5 rounded-full blur-3xl" />
          
          <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Qualifications Card */}
              <Reveal>
                <div className="glass-dark rounded-3xl p-8 sm:p-10 h-full">
                  <span className="text-xs font-bold tracking-widest uppercase text-brand-sage">Credentials</span>
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
                          <span className="text-brand-sage text-lg leading-none mt-1 flex-shrink-0">✦</span>
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
                  <span className="text-xs font-bold tracking-widest uppercase text-brand-sage">Approach</span>
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
                          <h4 className="font-bold text-white group-hover:text-brand-sage transition-colors">{item.title}</h4>
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
                <p className="text-center text-xs font-bold tracking-widest uppercase text-white mb-8">Affiliated & Certified</p>
                <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-16">
                  {[
                    { name: "CACP Certified Coach", href: "https://certifiedcoachesalliance.org/verified/SC959457_LGroombridge.png", img: "/badges/cacp.png", w: 100, h: 100 },
                    { name: "ICF ACC", href: "https://www.credly.com/badges/7e313d15-95cc-4a8f-9e6a-eb8ff42f43a7/public_url", img: "/badges/icf-acc.png", w: 100, h: 100 },
                    { name: "ACO Professional ADHD Coach", href: "https://www.adhdcoaches.org/find-your-coach", img: "/badges/aco.png", w: 100, h: 100 },
                    { name: "Psychology Today", href: "https://www.psychologytoday.com/profile/996320", img: "/badges/psychology-today.png", w: 100, h: 100 },
                    { name: "Certified MentorCoach", href: "https://www.mentorcoach.com/", img: "/badges/cmc-mentorcoach.webp", w: 220, h: 72 },
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
        <section className="relative py-14 overflow-hidden bg-white">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-sage/5 via-transparent to-brand-sage/5" />
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

        {/* ═══ TESTIMONIALS ═══ */}
        <Testimonials className="pt-24 pb-12 bg-[#F9F7F3]" />

        {/* ═══ LATEST FROM THE BLOG ═══ */}
        <section className="py-24 relative bg-white overflow-hidden border-t border-brand-border/30">
          <div className="max-w-6xl mx-auto px-6 lg:px-8 space-y-12 relative z-10">
            <div className="text-center space-y-4">
              <Reveal>
                <span className="text-sm font-bold text-brand-sage uppercase tracking-widest">Inside the ADHD Brain</span>
                <h2 className="text-4xl sm:text-5xl font-serif font-black text-brand-charcoal mt-2">Latest from the Blog</h2>
              </Reveal>
            </div>
            
            <div className="flex flex-wrap justify-center gap-8">
              {BLOG_POSTS.slice(0, 3).map((post, i) => (
                <Reveal key={post.slug} delay={i * 0.1} className="flex w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] max-w-sm">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="flex flex-col bg-[#F9F7F3]/60 backdrop-blur-sm rounded-3xl overflow-hidden border border-brand-border/40 hover:border-brand-sage/30 hover:scale-[1.02] shadow-sm hover:shadow-lg transition-all duration-300 group w-full"
                  >
                    <div className="relative aspect-[16/10] bg-brand-dark overflow-hidden flex flex-col justify-end p-6 text-white">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent z-10 pointer-events-none" />
                      {post.coverImage && (
                        <Image
                          src={post.coverImage}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500 z-0"
                          unoptimized
                        />
                      )}
                      <span className="relative z-20 text-brand-gold text-xs font-bold uppercase tracking-wider block mb-1">
                        {post.category}
                      </span>
                      <h3 className="relative z-20 font-serif font-bold text-xl leading-snug line-clamp-2">
                        {post.title}
                      </h3>
                    </div>
                    
                    <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                      <p className="text-brand-warm-gray text-sm leading-relaxed line-clamp-3">
                        {post.description}
                      </p>
                      <div className="pt-4 border-t border-brand-border/20 flex justify-between items-center text-xs font-bold text-brand-warm-gray/60 uppercase">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-brand-sage" />
                          {post.date}
                        </span>
                        <span className="inline-flex items-center gap-1 text-brand-sage font-bold group-hover:translate-x-0.5 transition-all">
                          Read <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
            
            <div className="text-center pt-4">
              <Reveal delay={0.2}>
                <Link
                  href="/blog"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-brand-sage text-white rounded-full font-bold uppercase tracking-widest text-xs hover:bg-brand-sage-hover hover:scale-105 active:scale-95 transition-all shadow-md hover:shadow-lg"
                >
                  Visit the Blog
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ═══ FAQ ═══ */}
        <section id="faq" className="py-24 relative bg-[#F9F7F3] overflow-hidden">
          <div className="max-w-3xl mx-auto px-6 lg:px-8 space-y-12 relative z-10">
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
      <footer className="bg-white text-brand-charcoal py-20 mt-auto relative overflow-hidden border-t border-brand-border/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-5 space-y-6">
              <div className="flex items-center gap-4">
                <Image src="/logo-transparent.png" alt="LG ADHD Coaching" width={72} height={72} className="object-contain" />
                <h3 className="text-2xl font-serif font-bold">Liana Groombridge</h3>
              </div>
              <p className="text-brand-warm-gray max-w-sm leading-relaxed">
                ICF-certified ADHD coaching. Personalized plans tailored to your unique brain.
              </p>
              <a href="mailto:hello@lianagroombridge.com" className="inline-flex items-center gap-2 text-brand-sage hover:text-brand-sage-hover transition-colors text-sm font-medium">
                <Mail className="w-4 h-4" />
                hello@lianagroombridge.com
              </a>
              {/* Social Icons */}
              <div className="flex items-center gap-4 pt-2">
                {/* Instagram */}
                <a href="https://www.instagram.com/adhdcoach_liana/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-brand-charcoal/5 hover:bg-brand-charcoal/10 flex items-center justify-center transition-all hover:scale-110" title="Instagram">
                  <svg className="w-4 h-4 text-brand-charcoal/60 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
                {/* TikTok */}
                <a href="https://www.tiktok.com/@adhdcoach_liana" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-brand-charcoal/5 hover:bg-brand-charcoal/10 flex items-center justify-center transition-all hover:scale-110" title="TikTok">
                  <svg className="w-4 h-4 text-brand-charcoal/60 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.26 8.26 0 004.84 1.56V6.79a4.85 4.85 0 01-1.07-.1z"/></svg>
                </a>
                {/* Facebook */}
                <a href="https://www.facebook.com/adhdcoachliana/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-brand-charcoal/5 hover:bg-brand-charcoal/10 flex items-center justify-center transition-all hover:scale-110" title="Facebook">
                  <svg className="w-4 h-4 text-brand-charcoal/60 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                {/* LinkedIn */}
                <a href="https://www.linkedin.com/in/lianagroombridge/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-brand-charcoal/5 hover:bg-brand-charcoal/10 flex items-center justify-center transition-all hover:scale-110" title="LinkedIn">
                  <svg className="w-4 h-4 text-brand-charcoal/60 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
              </div>
            </div>
            <div className="md:col-span-3 md:col-start-8">
              <h5 className="text-xs font-bold tracking-widest uppercase text-brand-warm-gray/60 mb-6">Quick Links</h5>
              <ul className="space-y-3 text-sm">
                {[
                  { label: "About", href: "#about" },
                  { label: "Qualifications", href: "#qualifications" },
                  { label: "Shop", href: "/shop" },
                  { label: "FAQ", href: "#faq" },
                ].map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-brand-warm-gray hover:text-brand-charcoal transition-colors animated-underline">{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:col-span-2">
              <h5 className="text-xs font-bold tracking-widest uppercase text-brand-warm-gray/60 mb-6">Resources</h5>
              <ul className="space-y-3 text-sm">
                <li>
                  <button onClick={() => window.dispatchEvent(new Event("open-quiz"))} className="text-brand-warm-gray hover:text-brand-charcoal transition-colors animated-underline">
                    ADHD Quiz
                  </button>
                </li>
                <li>
                  <a href="https://calendar.app.google/Nwa6i4WGsMysUzvu8" target="_blank" rel="noopener noreferrer" className="text-brand-warm-gray hover:text-brand-charcoal transition-colors animated-underline">
                    Book a Call
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-brand-border/40 mt-16 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-brand-warm-gray/60">
            <p>© 2026 Liana Groombridge Coaching. All rights reserved.</p>
            <p>Built with coffee and ADHD ☕</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
