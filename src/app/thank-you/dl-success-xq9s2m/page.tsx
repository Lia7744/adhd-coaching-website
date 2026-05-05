"use client";

import { Check, Download, Calendar, ArrowRight, Lock } from "lucide-react";
import Image from "next/image";

export default function WorkbookThankYouPage() {
  return (
    <div className="min-h-screen bg-white selection:bg-brand-sage/30">
      {/* ═══ THANK YOU CONTENT ═══ */}
      <main className="pt-48 pb-20 px-6 sm:px-12 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-40 left-10 w-64 h-64 bg-brand-sage/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-brand-sage/20 rounded-full blur-3xl -z-10" />

        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center space-y-6 mb-12">
            <div className="flex flex-col items-center justify-center gap-2 mb-6">
              <Check className="w-16 h-16 text-brand-sage" strokeWidth={1.5} />
            </div>
            <h1 className="text-4xl sm:text-5xl font-serif font-black text-brand-charcoal leading-tight">
              You are officially in.
            </h1>
            <p className="text-xl text-brand-warm-gray max-w-2xl mx-auto">
              Your payment was successful and your copy of <span className="italic">Manipulating Myself to Do Stuff</span> is ready. You will also receive an email receipt shortly.
            </p>
          </div>

          <div className="bg-brand-cream border-2 border-brand-border rounded-3xl p-8 sm:p-12 shadow-xl space-y-12">
            
            {/* Download Section */}
            <div className="text-center space-y-6">
              <h2 className="text-2xl font-bold text-brand-charcoal">Step 1: Get Your Workbook</h2>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a 
                  href="/assets-xq9s2m/Interactive_Workbook_MMTDS.pdf"
                  download="Interactive_Workbook_MMTDS.pdf"
                  className="w-full sm:w-auto inline-flex bg-brand-charcoal hover:bg-black text-brand-white h-14 px-8 rounded-full text-base font-bold shadow-lg items-center justify-center gap-2 transition-all transform hover:scale-105"
                >
                  <Download className="w-5 h-5" />
                  Interactive Version
                </a>
                <a 
                  href="/assets-xq9s2m/Printable_Workbook_MMTDS.pdf"
                  download="Printable_Workbook_MMTDS.pdf"
                  className="w-full sm:w-auto inline-flex bg-transparent border-2 border-brand-charcoal hover:bg-brand-charcoal hover:text-brand-white text-brand-charcoal h-14 px-8 rounded-full text-base font-bold items-center justify-center gap-2 transition-all transform hover:scale-105"
                >
                  <Download className="w-5 h-5" />
                  Printable Version
                </a>
              </div>
            </div>

            <div className="w-full h-px bg-brand-border"></div>

            {/* Upsell to Coaching Section */}
            <div className="bg-brand-sage/20 border border-brand-sage/30 rounded-2xl p-8 sm:p-10 text-center space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/40 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2" />
              
              <Calendar className="w-10 h-10 text-brand-sage mx-auto mb-2" />
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
                className="w-full sm:w-auto inline-flex bg-brand-charcoal hover:bg-black text-white h-14 px-8 rounded-full font-bold items-center justify-center gap-2 transition-all"
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
