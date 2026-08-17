"use client";

import Image from "next/image";
import { Download, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function IncupDownloadPage() {
  return (
    <main className="min-h-screen flex flex-col bg-brand-cream selection:bg-brand-sage/30 selection:text-brand-charcoal overflow-hidden font-sans">

      <section className="pt-48 pb-16 px-6 relative overflow-hidden flex-1">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-sage/10 rounded-full blur-[100px] -z-10 translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-gold/10 rounded-full blur-[80px] -z-10 -translate-x-1/2 translate-y-1/3" />
        
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-sage/10 text-brand-sage font-bold text-sm tracking-wide mb-8 border border-brand-sage/20">
              <CheckCircle className="w-4 h-4" />
              Success! You're in.
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-brand-charcoal leading-[1.1] mb-6">
              Here is your INCUP Guide.
            </h1>
            <p className="text-lg md:text-xl text-brand-warm-gray mb-10 max-w-2xl mx-auto leading-relaxed">
              Stop fighting your brain's natural wiring. Use this printable worksheet to figure out what kind of fuel your interest-based nervous system needs to get unstuck.
            </p>

            <div className="mt-8 flex justify-center">
              <div className="relative w-64 h-80 shadow-2xl rounded-xl overflow-hidden border border-brand-charcoal/10 -rotate-2">
                <Image
                  src="/blog/incup-worksheet-preview.png"
                  alt="INCUP Worksheet Preview"
                  fill
                  className="object-cover blur-[1px]"
                />
                <div className="absolute inset-0 bg-brand-cream/10 pointer-events-none" />
              </div>
            </div>

            <div className="mt-12 flex justify-center">
              <a
                href="/blog/INCUP_Worksheet.pdf"
                download
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center gap-3 h-16 px-10 rounded-full bg-brand-sage text-white font-bold text-lg shadow-xl shadow-brand-sage/30 hover:bg-brand-sage-hover hover:scale-105 active:scale-95 transition-all duration-300"
              >
                <Download className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
                <span>Download Worksheet (PDF)</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>


      {/* ── FOOTER ── */}
      <footer className="mt-auto py-8 text-center text-sm text-brand-warm-gray/60 border-t border-brand-border bg-brand-white">
        © {new Date().getFullYear()} Liana Groombridge. All rights reserved.
      </footer>
    </main>
  );
}
