"use client";

import { useState } from "react";
import Image from "next/image";
import { Lock, ArrowRight, BookOpen, Settings } from "lucide-react";

export default function TrackerPage() {
  const [trackerCode, setTrackerCode] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeSlug, setActiveSlug] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackerCode.trim()) return;
    
    // We treat their URL slug entry as their secure passcode
    // Convert to lowercase and replace spaces with hyphens in case they type "sydney r" instead of "sydney-r"
    let formattedSlug = trackerCode.trim().toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
    setActiveSlug(formattedSlug);
    setIsLoggedIn(true);
  };

  return (
    <div className="min-h-screen bg-brand-cream selection:bg-brand-sage/30 flex flex-col">
      {/* ═══ NAVIGATION ═══ */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <a href="/" className="flex items-center gap-3">
              <Image src="/logo-transparent.png" alt="LG ADHD Coaching" width={80} height={80} />
              <span className="text-xl sm:text-2xl font-serif font-black text-brand-charcoal tracking-tight">
                Liana Groombridge <span className="text-brand-warm-gray font-normal hidden sm:inline">| ADHD Coaching</span>
              </span>
            </a>
            <div className="hidden md:flex items-center gap-8">
              <a href="/?quiz=true" className="px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-widest bg-brand-gold text-brand-cream hover:bg-brand-gold-hover transition-colors">Take the Quiz</a>
              <a href="/" className="text-sm font-medium text-brand-warm-gray hover:text-brand-charcoal transition-colors animated-underline">Home</a>
              <a href="/services" className="text-sm font-medium text-brand-warm-gray hover:text-brand-charcoal transition-colors animated-underline">Services</a>
              <a href="/shop" className="text-sm font-medium text-brand-warm-gray hover:text-brand-charcoal transition-colors animated-underline">Shop</a>
              <div className="flex items-center gap-2 text-brand-sage font-bold text-sm bg-brand-sage/10 px-3 py-1.5 rounded-full">
                <Lock className="w-3.5 h-3.5" /> Client Portal
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* ═══ PORTAL / LOGIN CONTENT ═══ */}
      <main className="flex-1 pt-16 w-full max-w-7xl mx-auto flex flex-col items-center">
        {!isLoggedIn ? (
          <div className="flex-1 w-full max-w-4xl flex flex-col items-center justify-center px-6 py-20 text-center">
            
            <div className="w-20 h-20 bg-brand-sage/10 rounded-3xl flex items-center justify-center mb-6">
              <Lock className="w-10 h-10 text-brand-sage" />
            </div>

            <h1 className="text-4xl sm:text-5xl font-serif font-black text-brand-charcoal mb-4">
              Welcome to the Client Portal
            </h1>
            <p className="text-xl text-brand-warm-gray mb-12 max-w-2xl">
              Log in to your private coaching tracker or manage your active coaching membership.
            </p>

            <div className="w-full flex flex-col sm:flex-row gap-6 max-w-3xl">
              
              {/* Tracker Login Card */}
              <div className="flex-1 bg-white border-2 border-brand-border rounded-3xl p-8 shadow-xl text-left flex flex-col">
                <h3 className="text-2xl font-bold text-brand-charcoal mb-4 flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-brand-gold" />
                  Access Your Tracker
                </h3>
                <p className="text-brand-warm-gray mb-6 text-sm">
                  Enter the unique access code provided in your welcome email to open your private dashboard. Your code is meant to be private.
                </p>
                <form onSubmit={handleLogin} className="flex flex-col gap-4 mt-auto">
                  <input 
                    type="password"
                    placeholder="Your secret access code..." 
                    value={trackerCode}
                    onChange={(e) => setTrackerCode(e.target.value)}
                    className="w-full bg-brand-cream border-2 border-brand-border rounded-xl px-4 py-3 outline-none focus:border-brand-sage transition-colors font-medium"
                  />
                  <button type="submit" className="w-full bg-brand-sage hover:brightness-90 text-white rounded-xl py-3 font-bold flex items-center justify-center gap-2 transition-all">
                    Open Dashboard <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </div>

              {/* Manage Membership Card */}
              <div className="flex-1 bg-white border-2 border-brand-border rounded-3xl p-8 shadow-xl text-left flex flex-col">
                <h3 className="text-2xl font-bold text-brand-charcoal mb-4 flex items-center gap-2">
                  <Settings className="w-6 h-6 text-[#D25D48]" />
                  Manage Membership
                </h3>
                <p className="text-brand-warm-gray mb-6 text-sm">
                  Log in to your Whop account to manage your payment methods, upgrade your plan, or cancel your subscription.
                </p>
                <div className="mt-auto pt-4 border-t border-brand-cream">
                  <a 
                    href="https://whop.com/hub/" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#1A1A1A] hover:bg-black text-white rounded-xl py-3 font-bold flex items-center justify-center gap-2 transition-all"
                  >
                    Go to Whop Hub <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

            </div>
          </div>
        ) : (
          <div className="w-full flex-1 flex flex-col">
            <div className="px-6 lg:px-8 py-4 flex items-center justify-between">
              <p className="text-brand-warm-gray font-medium">Logged in securely.</p>
              <button 
                onClick={() => { setIsLoggedIn(false); setTrackerCode(""); setActiveSlug(""); }} 
                className="text-sm font-bold text-brand-sage hover:text-brand-charcoal transition-colors px-4 py-2 bg-brand-cream rounded-full border border-brand-border"
              >
                Sign out
              </button>
            </div>
            {/* We use an iframe to secretly load the live Vercel app while hiding the original URL from the user */}
            <iframe 
              src={`https://lg-coaching-tracker-pkrf.vercel.app/client/${activeSlug}`} 
              className="flex-1 w-full h-[calc(100vh-8rem)] border-none bg-brand-cream rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.05)]"
              title="LG Coaching Client Portal"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            />
          </div>
        )}
      </main>
    </div>
  );
}
