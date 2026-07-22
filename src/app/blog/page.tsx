"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, ArrowRight, Sparkles, BookOpen, Coffee } from "lucide-react";
import { BLOG_POSTS, BlogPost } from "@/lib/blog-posts";

const CATEGORIES = ["All", "ADHD Basics", "Productivity", "School & Work", "Systems"];

export default function BlogPortal() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts = selectedCategory === "All"
    ? BLOG_POSTS
    : BLOG_POSTS.filter(post => post.category === selectedCategory);

  const featuredPost = BLOG_POSTS[0]; // First post is always featured for now
  const regularPosts = selectedCategory === "All"
    ? filteredPosts.filter(post => post.slug !== featuredPost.slug)
    : filteredPosts;

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden bg-brand-cream">
      <main className="flex-grow pt-24 pb-20">
        
        {/* ── HERO SECTION ── */}
        <section className="pt-20 pb-12 px-6 lg:px-8 text-center relative">
          <div className="max-w-3xl mx-auto space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-sage/10 text-brand-sage font-bold text-xs uppercase tracking-widest border border-brand-sage/20"
            >
              <Sparkles className="w-3.5 h-3.5" />
              The Blog
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-serif font-black text-brand-charcoal leading-tight"
            >
              Working With <br />
              <span className="font-handwriting text-brand-sage text-5xl sm:text-7xl block mt-4 rotate-[-2deg] normal-case">
                Your ADHD Brain.
              </span>
            </motion.h1>
            

          </div>
        </section>

        {/* ── CATEGORY FILTERS ── */}
        <section className="py-8 px-6 lg:px-8">
          <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-3">
            {CATEGORIES.map((category, index) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`relative px-6 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all shadow-sm ${
                  selectedCategory === category
                    ? "bg-brand-sage text-white shadow-md scale-105"
                    : "bg-white/70 hover:bg-white text-brand-charcoal hover:text-brand-sage border border-brand-border/40"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* ── BLOG CONTENT CONTAINER ── */}
        <section className="px-6 lg:px-8 py-10">
          <div className="max-w-5xl mx-auto space-y-16">
            
            {/* ══ FEATURED POST ══ */}
            {selectedCategory === "All" && featuredPost && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="group bg-white rounded-3xl overflow-hidden border border-brand-border/40 shadow-xl hover:shadow-2xl transition-all duration-500 grid md:grid-cols-12 gap-0"
              >
                {/* Visual Cover */}
                <div className="md:col-span-6 relative aspect-[4/3] md:aspect-auto min-h-[300px] bg-brand-dark flex flex-col justify-between p-8 overflow-hidden text-white">
                  {!featuredPost.coverImage ? (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-br from-brand-sage/40 to-brand-dark opacity-90 group-hover:scale-105 transition-transform duration-700 pointer-events-none" />
                      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
                    </>
                  ) : (
                    <>
                      <Image
                        src={featuredPost.coverImage}
                        alt={featuredPost.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700 z-0"
                        priority
                        unoptimized
                      />
                      {/* Subtle bottom shadow to make header title text readable */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent z-10 pointer-events-none" />
                    </>
                  )}

                  <div className="relative z-10 self-start px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-bold uppercase tracking-wider">
                    Featured Post
                  </div>

                  <div className="relative z-10 space-y-2 mt-auto">
                    <span className="text-brand-gold text-sm font-bold uppercase tracking-widest block">
                      {featuredPost.category}
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-serif font-bold leading-tight line-clamp-3">
                      {featuredPost.title}
                    </h2>
                  </div>
                </div>

                {/* Meta & Summary Content */}
                <div className="md:col-span-6 p-8 sm:p-12 flex flex-col justify-between bg-white">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 text-xs font-bold text-brand-warm-gray/60 uppercase tracking-widest">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-brand-sage" />
                        {featuredPost.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-brand-sage" />
                        {featuredPost.readTime}
                      </span>
                    </div>

                    <p className="text-brand-warm-gray text-lg leading-relaxed font-medium">
                      {featuredPost.description}
                    </p>
                  </div>

                  <div className="pt-8 border-t border-brand-border/40 mt-8 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-brand-sage/20 bg-brand-cream relative">
                        <Image
                          src="/headshot-v2.jpg"
                          alt="Liana Groombridge"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-brand-charcoal">Liana Groombridge</p>
                        <p className="text-xs text-brand-warm-gray/60">ICF Coach (ACC, CACP)</p>
                      </div>
                    </div>

                    <Link
                      href={`/blog/${featuredPost.slug}`}
                      className="group/btn inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-sage text-white font-bold text-sm shadow-sm transition-all hover:bg-brand-sage-hover hover:scale-105 active:scale-95"
                    >
                      Read Article
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ══ REGULAR POSTS GRID ══ */}
            <div className="space-y-12">
              {regularPosts.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <AnimatePresence mode="popLayout">
                    {regularPosts.map((post) => (
                      <motion.div
                        layout
                        key={post.slug}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4 }}
                        className="flex flex-col bg-white rounded-3xl overflow-hidden border border-brand-border/30 hover:border-brand-sage/30 shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 group"
                      >
                        {/* Cover Placeholder or Image */}
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

                        {/* Details */}
                        <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                          <p className="text-brand-warm-gray text-sm leading-relaxed line-clamp-3">
                            {post.description}
                          </p>

                          <div className="pt-4 border-t border-brand-border/30 flex justify-between items-center text-xs font-bold text-brand-warm-gray/60 uppercase">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5 text-brand-sage" />
                              {post.date}
                            </span>
                            <Link
                              href={`/blog/${post.slug}`}
                              className="inline-flex items-center gap-1 text-brand-sage hover:text-brand-sage-hover hover:translate-x-0.5 transition-all"
                            >
                              Read <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              ) : filteredPosts.length === 0 ? (
                /* Empty state message, shown when filtered category has no posts at all */
                <div className="bg-white/50 border border-brand-border/40 rounded-3xl p-16 text-center">
                  <Coffee className="w-10 h-10 text-brand-sage mx-auto opacity-60 mb-3" />
                  <h3 className="text-2xl font-serif font-bold text-brand-charcoal">More posts coming soon</h3>
                </div>
              ) : null}
            </div>

            {/* ══ CTA SECTION ══ */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-brand-dark text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center gap-8"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand-sage/20 via-transparent to-brand-gold/10 pointer-events-none" />
              <div className="flex-grow space-y-4 relative z-10 text-center md:text-left">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-brand-sage/30 text-brand-sage-light border border-brand-sage/20 mb-6">
                  Workbook
                </span>
                <h3 className="text-3xl font-serif font-bold leading-tight">
                  Struggling to make yourself start?
                </h3>
                <p className="text-white/70 max-w-lg leading-relaxed">
                  Willpower is a scam for an ADHD brain. Check out my workbook, <em className="text-brand-gold">Manipulating Myself to Do Stuff</em>, loaded with 9 chapters of ADHD-proof strategies.
                </p>
              </div>

              <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 shrink-0">
                <Link
                  href="/shop"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-14 px-8 rounded-full bg-brand-sage text-white font-bold text-base shadow-md hover:bg-brand-sage-hover hover:scale-105 active:scale-95 transition-all"
                >
                  <BookOpen className="w-5 h-5" />
                  View Workbook
                </Link>
                <a
                  href="https://calendar.app.google/Nwa6i4WGsMysUzvu8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-14 px-8 rounded-full bg-white text-brand-charcoal hover:bg-brand-cream font-bold text-base shadow-md hover:scale-105 active:scale-95 transition-all"
                >
                  Book free call
                  <ArrowRight className="w-4 h-4 text-brand-charcoal" />
                </a>
              </div>
            </motion.div>

          </div>
        </section>

      </main>

      {/* ── FOOTER ── */}
      <footer className="py-8 text-center text-sm text-brand-warm-gray/60 border-t border-brand-border bg-brand-white">
        © 2026 Liana Groombridge Coaching. All rights reserved.
      </footer>
    </div>
  );
}
