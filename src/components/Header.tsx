"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Menu, X, Lock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Quiz from "@/components/Quiz";

export default function Header({ forceShow = false }: { forceShow?: boolean } = {}) {
  const pathname = usePathname();
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Hide the global header on portal/tracker routes so it doesn't overlap dashboard UIs
  if (!forceShow && (pathname?.startsWith("/tracker") || pathname?.startsWith("/coachlg"))) {
    return null;
  }

  useEffect(() => {
    // Check if URL has ?quiz=true parameter 
    if (typeof window !== "undefined" && window.location.search.includes("quiz=true")) {
      setIsQuizOpen(true);
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    const timer = setTimeout(() => {
      const hasSeenQuiz = localStorage.getItem("hasSeenQuiz");
      if (!hasSeenQuiz) {
        setIsQuizOpen(true);
        localStorage.setItem("hasSeenQuiz", "true");
      }
    }, 15000);

    const handleOpenQuiz = () => setIsQuizOpen(true);
    window.addEventListener("open-quiz", handleOpenQuiz);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("open-quiz", handleOpenQuiz);
    };
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 glass"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <div className="flex justify-between h-24 md:h-32 items-center relative w-full">
            {/* Left - Take the Quiz */}
            <div className="flex-1 flex justify-start z-50">
              <button onClick={() => setIsQuizOpen(true)} className="px-4 py-2 md:px-6 md:py-2.5 rounded-full text-xs md:text-sm font-bold tracking-wide border-2 border-brand-sage text-brand-sage hover:bg-brand-sage hover:text-white transition-colors shadow-sm">TAKE THE QUIZ</button>
            </div>

            {/* Absolute Center - Logo */}
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-auto">
              <a href="/" className="block">
                <Image src="/logo-transparent.png" alt="LG ADHD Coaching" width={200} height={200} className="w-28 h-28 md:w-48 md:h-48 object-contain hover:scale-105 transition-transform" />
              </a>
            </div>
            
            {/* Right - Nav Links */}
            <div className="flex-1 flex justify-end items-center">
              <div className="hidden md:flex items-center gap-8">
                <a href="/" className="text-sm font-bold text-brand-charcoal hover:text-brand-gold transition-colors">Home</a>
                <a href="/services" className="text-sm font-bold text-brand-charcoal hover:text-brand-gold transition-colors">Services</a>
                <a href="/shop" className="text-sm font-bold text-brand-charcoal hover:text-brand-gold transition-colors">Shop</a>
                <a href="/tracker" className="flex items-center gap-2 text-brand-charcoal font-bold text-sm bg-white px-5 py-2 rounded-full shadow-md hover:shadow-lg transition-all border border-brand-border/10"><Lock className="w-4 h-4" /> Client Portal</a>
              </div>
              
              {/* Mobile Menu Button */}
              <button 
                className="md:hidden p-2 text-brand-charcoal ml-4 z-50"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-brand-border bg-brand-cream/95 backdrop-blur-md overflow-hidden"
            >
              <div className="flex flex-col p-6 gap-4">
                <a href="/" className="text-base font-medium text-brand-charcoal py-2 border-b border-brand-border/50" onClick={() => setIsMobileMenuOpen(false)}>Home</a>
                <a href="/services" className="text-base font-medium text-brand-charcoal py-2 border-b border-brand-border/50" onClick={() => setIsMobileMenuOpen(false)}>Services</a>
                <a href="/shop" className="text-base font-medium text-brand-charcoal py-2 border-b border-brand-border/50" onClick={() => setIsMobileMenuOpen(false)}>Shop</a>
                <a href="/tracker" className="text-base font-medium text-brand-sage py-2 border-b border-brand-border/50 flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}><Lock className="w-4 h-4" /> Client Portal</a>
                <button onClick={() => { setIsQuizOpen(true); setIsMobileMenuOpen(false); }} className="mt-2 w-full py-3 rounded-full text-sm font-black uppercase tracking-widest bg-brand-sage text-white text-center">Take the Quiz</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Quiz Modal */}
      <AnimatePresence>
        {isQuizOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
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
    </>
  );
}
