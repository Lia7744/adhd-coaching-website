"use client";

import { useEffect, useState } from "react";
import { ArrowRight, CheckCircle2, ShieldCheck, Download, BookOpen, Sparkles, Brain, Lock, Plus, Minus } from "lucide-react";
import Image from "next/image";
import { sendGAEvent } from "@next/third-parties/google";

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <button
      onClick={() => setOpen(!open)}
      className="w-full text-left p-6 rounded-2xl bg-white border-2 border-brand-border hover:border-brand-sage transition-all duration-300 group"
    >
      <div className="flex items-center justify-between gap-4">
        <h4 className="font-bold text-lg text-brand-charcoal group-hover:text-brand-sage transition-colors">{q}</h4>
        {open ? <Minus className="w-5 h-5 text-brand-sage shrink-0" /> : <Plus className="w-5 h-5 text-brand-warm-gray shrink-0 group-hover:text-brand-sage transition-colors" />}
      </div>
      {open && (
        <div className="mt-4 text-brand-warm-gray leading-relaxed pr-8">
          {a}
        </div>
      )}
    </button>
  );
}

export default function WorkbookOfferPage() {
  const [isCanada, setIsCanada] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check currency/location
  useEffect(() => {
    fetch("/api/geo")
      .then((res) => res.json())
      .then((data) => {
        setIsCanada(data.country === "CA");
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Location lookup failed:", error);
        setIsLoading(false);
      });
  }, []);

  const price = isCanada ? "$34.99 CAD" : "$24.99 USD";
  const checkoutUrl = isCanada 
    ? "https://whop.com/checkout/plan_2HOVSKaQCmGm2" 
    : "https://whop.com/checkout/plan_0XKFQdLkmshAq";

  const handleCheckout = () => {
    sendGAEvent("event", "begin_checkout", { 
      item_name: "Manipulating Myself Workbook", 
      currency: isCanada ? "CAD" : "USD", 
      value: isCanada ? 34.99 : 24.99,
      source: "email_sequence_offer"
    });
  };

  return (
    <div className="min-h-screen bg-brand-cream selection:bg-brand-sage/30 font-sans">
      
      {/* ═══ MINIMAL NAVIGATION (No Distractions) ═══ */}
      <nav className="pt-6 pb-2">
        <div className="max-w-4xl mx-auto px-6 flex justify-center">
          <Image src="/logo-transparent.png" alt="LG ADHD Coaching" width={80} height={80} />
        </div>
      </nav>

      {/* ═══ HERO / HOOK ═══ */}
      <section className="pt-8 pb-16 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-10 w-64 h-64 bg-brand-sage/10 rounded-full blur-3xl -z-10" />
        <div className="max-w-3xl mx-auto text-center space-y-8">
          
          <div className="inline-block text-brand-sage text-3xl sm:text-4xl font-handwriting opacity-80 transform -rotate-2">
            Your brain's new operating system
          </div>

          <h1 className="text-4xl sm:text-6xl font-serif font-black text-brand-charcoal leading-tight">
            Because "just try harder" has literally never worked.
          </h1>

          <p className="text-xl sm:text-2xl text-brand-warm-gray leading-relaxed font-medium">
            You have the time. You know what you need to do. But for some reason, your brain just won't cooperate. Let's fix that.
          </p>

        </div>
      </section>

      {/* ═══ AGITATION & EMPATHY ═══ */}
      <section className="pb-20 px-6">
        <div className="max-w-4xl mx-auto bg-brand-charcoal rounded-[2.5rem] p-8 sm:p-16 shadow-2xl relative overflow-hidden">
          {/* Decorative Background Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-sage/20 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-gold/10 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3" />
          
          <div className="relative z-10 space-y-8">
            <h2 className="text-3xl sm:text-4xl font-serif font-black text-brand-cream leading-tight">
              Here's what nobody tells you about ADHD:
            </h2>
            
            <p className="text-xl text-brand-cream/80 leading-relaxed">
              Your brain doesn't run on "importance." It doesn't care that the email needs to be sent, or the laundry needs to be folded, or the deadline is tomorrow. 
            </p>
            
            <p className="text-xl text-brand-cream/80 leading-relaxed">
              If a task isn't interesting, novel, challenging, or urgently on fire... your brain literally will not produce the dopamine required to engage with it. 
            </p>
            
            <div className="my-10 p-8 bg-white/5 backdrop-blur-sm rounded-2xl border-l-4 border-brand-gold relative">
              <Sparkles className="absolute -top-4 -left-4 w-8 h-8 text-brand-gold bg-brand-charcoal rounded-full p-1" />
              <p className="italic text-brand-cream font-serif text-2xl leading-snug">
                "You aren't lazy. You're trying to start a car with the wrong kind of fuel."
              </p>
            </div>
            
            <p className="text-xl text-brand-cream/80 leading-relaxed font-bold">
              The solution isn't another daily planner. The solution is learning how to outsmart your own neurology.
            </p>
            <p className="text-xl text-brand-cream/80 leading-relaxed">
              You have to rig the game so your brain cooperates—not because it wants to, but because you gave it no good reason not to.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ THE SOLUTION ═══ */}
      <section className="py-16 px-6 bg-brand-charcoal text-brand-cream relative">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          
          <div className="relative group perspective-1000 order-2 md:order-1">
            <div className="absolute -inset-4 bg-gradient-to-tr from-brand-gold/40 to-brand-sage/40 rounded-[3rem] blur-2xl opacity-40 group-hover:opacity-80 transition-opacity duration-700" />
            <Image 
              src="/workbook-cover-final.png"
              alt="Manipulating Myself to Do Stuff Workbook Cover" 
              width={500} 
              height={700} 
              className="w-full h-auto rounded-xl shadow-2xl border-2 border-brand-warm-gray/20 relative z-10 transform transition-transform duration-700 group-hover:rotate-y-6"
            />
          </div>

          <div className="space-y-8 order-1 md:order-2">
            <div>
              <h2 className="text-3xl sm:text-4xl font-serif font-black mb-4">
                Manipulating Myself to Do Stuff
              </h2>
              <p className="text-lg text-brand-cream/80">
                A 9-chapter, actionable digital workbook designed by an ADHD coach (who has ADHD) to get you completely unstuck.
              </p>
            </div>

            <ul className="space-y-4">
              {[
                "The Bribe Menu: How to artificially create dopamine.",
                "Trapping Future You: Systems that actually survive a bad brain day.",
                "The Agony Hour Blueprint: Getting through tasks that will always suck.",
                "The Shame Spiral Map: How to interrupt the guilt cycle.",
                "20+ fill-in-the-blank tactical exercises."
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-brand-gold shrink-0 mt-0.5" />
                  <span className="text-brand-cream font-medium">{item}</span>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <div className="pt-4 space-y-4">
              <a 
                href={checkoutUrl}
                onClick={handleCheckout}
                className="block w-full bg-brand-sage hover:bg-[#4a7255] text-white text-center py-5 rounded-full text-xl font-bold shadow-[0_0_30px_-5px_var(--color-brand-sage)] transition-all transform hover:scale-[1.02]"
              >
                {isLoading ? "Loading..." : `Download Instantly — ${price}`}
              </a>
              <div className="flex items-center justify-center gap-4 text-sm text-brand-cream/60">
                <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4" /> Secure checkout</span>
                <span className="flex items-center gap-1"><Download className="w-4 h-4" /> Instant access</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══ AUTHORITY / CLOSING ═══ */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <div className="w-48 h-48 rounded-full overflow-hidden shrink-0 border-8 border-white shadow-xl relative">
            <Image src="/headshot-v2.jpg" alt="Liana Groombridge" fill className="object-cover" />
          </div>
          <div>
            <h3 className="text-2xl font-serif font-black text-brand-charcoal mb-2">
              Hey, I'm Liana.
            </h3>
            <p className="text-brand-sage font-bold uppercase tracking-widest text-sm mb-4">
              ICF-Certified ADHD Coach
            </p>
            <p className="text-brand-warm-gray leading-relaxed">
              I built this workbook because I was sick of neurotypical productivity advice that doesn't work for us. No "eat the frog." No "just set an alarm." This is the exact system I use with my private clients to stop fighting their brains and start getting things done.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="py-20 px-6 relative">
        <div className="max-w-3xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl sm:text-4xl font-serif font-black text-brand-charcoal">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-4">
            <FaqItem 
              q="Is this a physical book or a digital download?" 
              a="This is a 100% digital download. Right after checkout, you'll get instant, unlimited access to two different versions: an interactive PDF that you can easily fill out directly on your phone, tablet, or computer, and a printer-friendly version if you prefer to put pen to paper. You don't have to choose between them—you get full access to both with your purchase!" 
            />
            <FaqItem 
              q="Do I need an official ADHD diagnosis for this to work?" 
              a="Not at all. Whether you have an official diagnosis, suspect you have ADHD, or just deeply struggle with executive dysfunction and getting started on tasks, these strategies are designed for any brain that doesn't respond to neurotypical productivity advice." 
            />
            <FaqItem 
              q="Is this a recurring subscription?" 
              a="Nope! It's a one-time purchase. Once you buy it, you have lifetime access to the workbook and all its exercises." 
            />
            <FaqItem 
              q="I've tried planners and other ADHD books before. How is this different?" 
              a="Most advice focuses on willpower and doing the 'hard thing first.' This workbook is built on the reality that the ADHD brain operates off an interest-based nervous system. We don't activate just because something is important; we activate when things are interesting. We focus on outsmarting your brain using bribes, trap-setting, and pattern interruption, rather than relying on discipline." 
            />
          </div>
        </div>
      </section>

      {/* ═══ FOOTER CTA ═══ */}
      <section className="py-16 px-6 bg-brand-white border-t border-brand-border text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-serif font-black text-brand-charcoal mb-8">
            Stop waiting for the motivation to strike. Manufacture it.
          </h2>
          <a 
            href={checkoutUrl}
            onClick={handleCheckout}
            className="inline-flex items-center justify-center gap-2 bg-brand-gold hover:bg-[#c49a46] text-brand-charcoal h-16 px-10 rounded-full text-xl font-bold shadow-lg transition-all transform hover:scale-105"
          >
            {isLoading ? "Loading..." : `Get the Workbook — ${price}`}
            <ArrowRight className="w-5 h-5" />
          </a>
          <p className="mt-6 text-sm text-brand-warm-gray italic">
            Due to the digital nature of this product, all sales are final.
          </p>
        </div>
      </section>

    </div>
  );
}
