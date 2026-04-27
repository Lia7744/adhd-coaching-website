"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, HelpCircle, Mail, X } from "lucide-react";
import { sendGAEvent } from "@next/third-parties/google";
import { cn } from "@/lib/utils";

type BlockerType = "Frozen Starter" | "Boredom Blackout" | "Overthinking Looper" | "Shame Spiraler" | "System Hopper";

interface Question {
  id: number;
  text: string;
  options: {
    text: string;
    type: BlockerType;
  }[];
}

const questions: Question[] = [
  {
    id: 1,
    text: "You have a task due tomorrow that you've known about for two weeks. What's most likely happening right now?",
    options: [
      { text: "I know what to do. I have the time. My body just won't cooperate.", type: "Frozen Starter" },
      { text: "My brain is running a meeting I didn't schedule — replaying, planning, spiraling.", type: "Overthinking Looper" },
      { text: "The guilt of not starting sooner is now bigger than the task itself.", type: "Shame Spiraler" },
      { text: "It's boring. My brain does not care that it's important.", type: "Boredom Blackout" },
    ],
  },
  {
    id: 2,
    text: "Someone asks why you didn't finish the thing. The loudest voice in your head says:",
    options: [
      { text: "I tried 3 different approaches. Set it all up. Then just stopped using it.", type: "System Hopper" },
      { text: "I couldn't stop thinking long enough to actually do anything.", type: "Overthinking Looper" },
      { text: "Because I'm apparently someone who can't follow through. (Cue the spiral.)", type: "Shame Spiraler" },
      { text: "I sat down. I stared. I couldn't start. I don't fully understand it either.", type: "Frozen Starter" },
    ],
  },
  {
    id: 3,
    text: "Think about the last few times you actually got stuff done. What was usually present?",
    options: [
      { text: "Panic. The deadline finally overrode whatever was blocking me.", type: "Frozen Starter" },
      { text: "The right environment — music, coffee shop, something to keep my brain stimulated.", type: "Boredom Blackout" },
      { text: "Someone else nearby — a call, a study-with-me video. Their presence helped.", type: "Overthinking Looper" },
      { text: "Spite. I was mad enough to do it just to prove something.", type: "Shame Spiraler" },
    ],
  },
  {
    id: 4,
    text: "Your relationship with productivity tools (apps, planners, systems) is best described as:",
    options: [
      { text: "A graveyard. They all work for about a week. I keep thinking the next one will stick.", type: "System Hopper" },
      { text: "I open the list, feel a wave of dread, close it, and do something else.", type: "Shame Spiraler" },
      { text: "My brain generates problems faster than any system can hold.", type: "Overthinking Looper" },
      { text: "Tools aren't the problem. The problem is that nothing on my list is interesting.", type: "Boredom Blackout" },
    ],
  },
  {
    id: 5,
    text: "You actually managed to start something. 20 minutes in, you stop. What happened?",
    options: [
      { text: "I hit an uncertain part and couldn't decide how to proceed — so I stalled.", type: "Frozen Starter" },
      { text: "The novelty wore off. My brain is already looking for something else.", type: "Boredom Blackout" },
      { text: "A random thought pulled me sideways. Now I'm three tangents deep.", type: "Overthinking Looper" },
      { text: "I noticed a mistake or how far behind I am, and now I can't keep going.", type: "Shame Spiraler" },
    ],
  },
  {
    id: 6,
    text: "Which of these hits closest to home?",
    options: [
      { text: "I have the time, the plan, the intention. I still can't start.", type: "Frozen Starter" },
      { text: "I've tried everything. They all stop working. I'm starting to think it's just me.", type: "System Hopper" },
      { text: "I care so much it's crushing me — and the shame of falling behind makes it worse.", type: "Shame Spiraler" },
      { text: "My brain has been running all day. I'm exhausted from thinking, not from doing.", type: "Overthinking Looper" },
    ],
  },
  {
    id: 7,
    text: "When someone you know easily does something you've been avoiding for weeks, your first thought is:",
    options: [
      { text: "What is wrong with me? Everyone else can just do things.", type: "Shame Spiraler" },
      { text: "They probably found one system and stuck with it. I've tried 12 since January.", type: "System Hopper" },
      { text: "What app are they using? What's their routine? I need to know.", type: "System Hopper" },
      { text: "I literally tried that today. Sat there. Nothing happened. It's not that I won't — I can't.", type: "Frozen Starter" },
    ],
  },
];

export default function Quiz({ onClose }: { onClose?: () => void }) {
  const [step, setStep] = useState<"intro" | "questions" | "email" | "loading">("intro");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<BlockerType[]>([]);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const handleAnswer = (type: BlockerType) => {
    const nextAnswers = [...answers, type];
    setAnswers(nextAnswers);

    sendGAEvent("event", "quiz_step_complete", { step: currentQuestion + 1 });

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      sendGAEvent("event", "quiz_finished");
      setStep("email");
    }
  };

  const calculateResult = () => {
    const counts: Record<string, number> = {};
    answers.forEach((type) => {
      counts[type] = (counts[type] || 0) + 1;
    });

    const sortedResults = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    return sortedResults[0][0] as BlockerType;
  };

  const handleSubmitEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setStep("loading");
    
    sendGAEvent("event", "lead_captured", { source: "quiz" });
    
    const result = calculateResult();

    try {
      await fetch('/api/mailerlite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, resultType: result })
      });
    } catch (error) {
      // Failing gracefully so user isn't blocked on network errors
      console.error("Failed to submit to MailerLite", error);
    }

    // Redirect to results immediately after API response or failure
    window.location.href = `/results?type=${encodeURIComponent(result)}&email=${encodeURIComponent(email)}&all=${JSON.stringify(answers)}`;
  };

  const progress = (currentQuestion / questions.length) * 100;

  return (
    <div className="bg-brand-cream border-2 border-brand-border rounded-3xl p-6 sm:p-10 max-w-2xl w-full shadow-2xl relative overflow-hidden">
      {onClose && (
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-brand-warm-gray hover:text-brand-charcoal transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      )}

      <AnimatePresence mode="wait">
        {step === "intro" && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6 text-center"
          >
            <div className="inline-block p-4 bg-brand-white rounded-full border-2 border-brand-gold relative">
              <HelpCircle className="w-10 h-10 text-brand-gold" />
            </div>
            <h2 className="text-3xl font-serif font-black italic text-brand-charcoal leading-tight">
              Why Can't I Just Do the Thing?
            </h2>
            <div className="space-y-4 text-brand-warm-gray text-lg leading-relaxed">
              <p>7 questions to find your top ADHD productivity blocker.</p>
              <p className="text-sm">
                Most people with ADHD deal with more than one blocker. This quiz finds the one that's showing up the most right now.
              </p>
            </div>
            <button
              onClick={() => {
                sendGAEvent("event", "quiz_start");
                setStep("questions");
              }}
              className="w-full bg-brand-gold hover:bg-brand-gold-hover text-brand-charcoal h-14 rounded-full text-lg font-bold shadow-md flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02]"
            >
              Start the Quiz <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}

        {step === "questions" && (
          <motion.div
            key="questions"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-brand-sage uppercase tracking-widest">
                <span>Question {currentQuestion + 1} of {questions.length}</span>
                <span>{Math.round(progress)}% Complete</span>
              </div>
              <div className="h-2 w-full bg-brand-border rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-brand-sage"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <h3 className="text-2xl font-serif font-bold text-brand-charcoal leading-tight">
              {questions[currentQuestion].text}
            </h3>

            <div className="grid gap-3">
              {questions[currentQuestion].options.map((option, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(option.type)}
                  className="p-4 text-left bg-brand-white hover:bg-brand-sage/5 border-2 border-brand-border hover:border-brand-sage rounded-2xl transition-all group relative overflow-hidden"
                >
                  <span className="relative z-10 text-brand-charcoal group-hover:text-brand-sage transition-colors">
                    {option.text}
                  </span>
                </button>
              ))}
            </div>

            {currentQuestion > 0 && (
              <button
                onClick={() => setCurrentQuestion(currentQuestion - 1)}
                className="inline-flex items-center gap-2 text-sm font-bold text-brand-warm-gray hover:text-brand-charcoal transition-colors"
              >
                <ChevronLeft className="w-4 h-4" /> Go Back
              </button>
            )}
          </motion.div>
        )}

        {step === "email" && (
          <motion.div
            key="email"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="space-y-8 text-center"
          >
            <div className="space-y-4">
              <h2 className="text-4xl font-serif font-black italic text-brand-charcoal">Your Results are Ready!</h2>
              <p className="text-lg text-brand-warm-gray">
                Enter your email to see your top ADHD productivity blocker — plus a free strategy sheet tailored to your result.
              </p>
            </div>

            <form onSubmit={handleSubmitEmail} className="space-y-4">
              <div className="relative">
                <input
                  required
                  type="text"
                  placeholder="First Name"
                  className="w-full h-14 px-4 rounded-2xl border-2 border-brand-border focus:border-brand-sage outline-none text-brand-charcoal font-medium transition-all"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-warm-gray w-5 h-5" />
                <input
                  required
                  type="email"
                  placeholder="name@example.com"
                  className="w-full h-14 pl-12 pr-4 rounded-2xl border-2 border-brand-border focus:border-brand-sage outline-none text-brand-charcoal font-medium transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-brand-gold hover:bg-brand-gold-hover text-brand-charcoal h-14 rounded-full text-lg font-bold shadow-md flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02]"
              >
                Show me my result <ArrowRight className="w-5 h-5" />
              </button>
              <p className="text-xs text-brand-warm-gray">
                Get your results & join the newsletter. Unsubscribe at any time.
              </p>
            </form>
          </motion.div>
        )}

        {step === "loading" && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-12 space-y-6 text-center"
          >
            <div className="w-16 h-16 border-4 border-brand-sage border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xl font-serif font-bold italic text-brand-sage italic">
              Calculating your blockers...
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
