"use client";

import { useState } from "react";
import { Lock, ArrowRight, BookOpen, Settings, Mail } from "lucide-react";
import { sendMagicLink, verifyOtpCode } from "@/app/tracker/actions";

export default function PortalLogin() {
  const [email, setEmail] = useState("");
  const [otpMode, setOtpMode] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    const result = await sendMagicLink(email);

    setIsLoading(false);

    if (result.success) {
      setSuccessMsg("We've sent a 6-digit login code to your email.");
      setOtpMode(true);
    } else {
      setErrorMsg(result.error || "Failed to send link");
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !otpCode.trim()) return;

    setIsLoading(true);
    setErrorMsg("");

    const result = await verifyOtpCode(email, otpCode);

    setIsLoading(false);

    if (result.success) {
      window.location.reload();
    } else {
      setErrorMsg(result.error || "Login failed - Invalid code");
    }
  };

  return (
    <div className="flex-1 w-full max-w-4xl flex flex-col items-center justify-center px-6 py-20 text-center">
      <div className="w-20 h-20 bg-brand-sage/10 rounded-3xl flex items-center justify-center mb-6">
        <Lock className="w-10 h-10 text-brand-sage" />
      </div>

      <h1 className="text-4xl sm:text-5xl font-serif font-black text-brand-charcoal mb-4">
        Welcome to the Client Portal
      </h1>
      <p className="text-xl text-brand-warm-gray mb-12 max-w-2xl">
        Enter your email address to receive a secure login code — no passwords required!
      </p>

      <div className="w-full flex flex-col sm:flex-row gap-6 max-w-3xl">
        {/* Tracker Login Card */}
        <div className="flex-1 bg-[#F9F7F3] border border-brand-sage/10 rounded-[2.5rem] p-8 sm:p-10 shadow-xl text-left flex flex-col relative overflow-hidden">
          <h3 className="text-2xl font-bold text-brand-charcoal mb-4 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-brand-sage" />
            Access Your Tracker
          </h3>
          <p className="text-brand-warm-gray mb-6 text-sm">
            {!otpMode 
              ? "We'll send a secure login code to the email address tied to your coaching account."
              : "Check your email inbox (and spam folder) for your secure login code."}
          </p>
          
          {!otpMode ? (
            <form onSubmit={handleSendLink} className="flex flex-col gap-4 mt-auto">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-warm-gray" />
                <input
                  type="email"
                  placeholder="Your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-brand-cream border-2 border-brand-border rounded-xl pl-12 pr-4 py-3 outline-none focus:border-brand-sage transition-colors font-medium"
                  required
                />
              </div>
              {errorMsg && <p className="text-[#D25D48] text-sm font-bold">{errorMsg}</p>}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-brand-sage hover:bg-brand-sage-hover text-white rounded-full h-14 font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50 mt-2 shadow-md active:scale-95"
              >
                {isLoading ? "Sending..." : "Send Login Code"} <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="flex flex-col gap-4 mt-auto">
              {successMsg && <p className="text-brand-sage text-sm font-bold bg-brand-sage/10 p-3 rounded-lg border border-brand-sage/20">Code sent! Check your inbox and spam folder.</p>}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter login code..."
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  className="w-full bg-brand-cream border-2 border-brand-border rounded-xl px-4 py-3 outline-none focus:border-brand-sage transition-colors font-medium text-center text-xl tracking-widest"
                  maxLength={8}
                  required
                />
              </div>
              {errorMsg && <p className="text-[#D25D48] text-sm font-bold">{errorMsg}</p>}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-brand-sage hover:bg-brand-sage-hover text-white rounded-full h-14 font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50 mt-2 shadow-md active:scale-95"
              >
                {isLoading ? "Verifying..." : "Verify & Login"} <ArrowRight className="w-4 h-4" />
              </button>
              <button 
                type="button" 
                onClick={() => setOtpMode(false)}
                className="text-xs text-brand-warm-gray hover:text-brand-charcoal text-center mt-2 underline"
              >
                Let me try a different email address
              </button>
            </form>
          )}
        </div>

        {/* Manage Membership Card */}
        <div className="flex-1 bg-[#F9F7F3] border border-brand-sage/10 rounded-[2.5rem] p-8 sm:p-10 shadow-xl text-left flex flex-col relative overflow-hidden">
          <h3 className="text-2xl font-bold text-brand-charcoal mb-4 flex items-center gap-2">
            <Settings className="w-6 h-6 text-brand-charcoal" />
            Manage Membership
          </h3>
          <p className="text-brand-warm-gray mb-6 text-sm">
            Log in to your Whop account to manage your payment methods, upgrade your plan, or cancel your subscription.
          </p>
          <div className="mt-auto pt-4 border-t border-brand-cream">
            <a
              href="https://whop.com/login/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-black hover:bg-gray-800 text-white rounded-full h-14 font-bold flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
            >
              Go to Whop Hub <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
