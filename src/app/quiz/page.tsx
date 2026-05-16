import Quiz from "@/components/Quiz";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ADHD Productivity Blocker Quiz | Liana Groombridge",
  description: "Find out what's really stopping you from getting things done. Take the free 7-question ADHD productivity blocker quiz.",
};

export default function QuizLandingPage() {
  return (
    <div className="min-h-screen bg-brand-cream relative selection:bg-brand-sage/30 flex flex-col items-center justify-center p-6">
      {/* Decorative background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-brand-sage/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl -z-10" />
      
      <div className="w-full max-w-2xl mx-auto z-10 pt-20 pb-10 sm:pt-32">
        <div className="text-center mb-10">
          <p className="text-brand-sage font-bold uppercase tracking-widest text-sm mb-3">
            Free Assessment
          </p>
          <h1 className="text-4xl sm:text-5xl font-serif font-black text-brand-charcoal mb-4">
            Find Your ADHD Blocker
          </h1>
          <p className="text-lg text-brand-warm-gray">
            Take this 2-minute quiz to find out what's actually holding you back right now.
          </p>
        </div>
        
        {/* We drop the Quiz component here without the onClose prop, 
            which automatically hides the 'X' button since they shouldn't 
            be able to close out of the dedicated landing page! */}
        <div className="flex justify-center">
          <Quiz />
        </div>
      </div>
    </div>
  );
}
