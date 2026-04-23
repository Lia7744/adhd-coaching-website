"use client";

import { CheckCircle2, Download, Calendar, ArrowRight, Lock } from "lucide-react";
import Image from "next/image";

export default function WorkbookThankYouPage() {
  return (
    <div className="min-h-screen bg-brand-cream selection:bg-brand-sage/30">
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
              <a href="/tracker" className="flex items-center gap-2 text-brand-sage font-bold text-sm bg-brand-sage/10 px-3 py-1.5 rounded-full"><Lock className="w-3.5 h-3.5" /> Client Portal</a>
            </div>
          </div>
        </div>
      </nav>

      {/* ═══ THANK YOU CONTENT ═══ */}
      <main className="pt-32 pb-20 px-6 sm:px-12 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-40 left-10 w-64 h-64 bg-brand-sage/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-brand-gold/20 rounded-full blur-3xl -z-10" />

        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center space-y-6 mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-brand-sage/20 rounded-full mb-4">
              <CheckCircle2 className="w-10 h-10 text-brand-sage" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-serif font-black text-brand-charcoal leading-tight">
              You are officially in.
            </h1>
            <p className="text-xl text-brand-warm-gray max-w-2xl mx-auto">
              Your payment was successful and your copy of <span className="italic">Manipulating Myself to Do Stuff</span> is ready. You will also receive an email receipt shortly.
            </p>
          </div>

          <div className="bg-brand-white border-2 border-brand-border rounded-3xl p-8 sm:p-12 shadow-xl space-y-12">
            
            {/* Download Section */}
            <div className="text-center space-y-6">
              <h2 className="text-2xl font-bold text-brand-charcoal">Step 1: Get Your Workbook</h2>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a 
                  href="/assets-xq9s2m/PDF_Manipulating_Myself_to_do_Stuff_Interactive.pdf"
                  download="PDF_Manipulating_Myself_to_do_Stuff_Interactive.pdf"
                  className="w-full sm:w-auto inline-flex bg-brand-charcoal hover:bg-black text-brand-white h-14 px-8 rounded-full text-base font-bold shadow-lg items-center justify-center gap-2 transition-all transform hover:scale-105"
                >
                  <Download className="w-5 h-5" />
                  Interactive Version
                </a>
                <a 
                  href="/assets-xq9s2m/PDF_Manipulating_Myself_to_do_Stuff_Printable.pdf"
                  download="PDF_Manipulating_Myself_to_do_Stuff_Printable.pdf"
                  className="w-full sm:w-auto inline-flex bg-transparent border-2 border-brand-charcoal hover:bg-brand-charcoal hover:text-brand-white text-brand-charcoal h-14 px-8 rounded-full text-base font-bold items-center justify-center gap-2 transition-all transform hover:scale-105"
                >
                  <Download className="w-5 h-5" />
                  Printable Version
                </a>
              </div>
            </div>

            <div className="w-full h-px bg-brand-border"></div>

            {/* Upsell to Coaching Section */}
            <div className="bg-brand-cream border-2 border-brand-gold/30 rounded-2xl p-8 sm:p-10 text-center space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/10 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2" />
              
              <Calendar className="w-10 h-10 text-brand-gold mx-auto mb-2" />
              <h2 className="text-2xl font-serif font-black italic text-brand-charcoal">
                Need help putting this into practice?
              </h2>
              <p className="text-brand-charcoal/80 leading-relaxed max-w-lg mx-auto">
                The workbook is a great place to start. But if you're ready to go deeper and want someone who gets it working alongside you to turn these strategies into real, lasting change — let's talk.
              </p>
              
              <a 
                href="https://calendar.app.google/dfat4MyGmVmAGByDA" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex bg-brand-gold hover:bg-brand-gold-hover text-brand-charcoal h-14 px-8 rounded-full font-bold items-center justify-center gap-2 transition-all"
              >
                Book a Free Discovery Call <ArrowRight className="w-4 h-4" />
              </a>
            </div>

          </div>
        </div>
      </main>

    </div>
  );
}
