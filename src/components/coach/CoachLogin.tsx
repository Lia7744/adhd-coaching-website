"use client";

import { useState } from "react";
import { Lock, ArrowRight, Mail } from "lucide-react";
import { sendCoachMagicLink, verifyCoachOtp } from "@/app/coachlg/actions";

export default function CoachLogin() {
  const [email, setEmail] = useState("hello@lianagroombridge.com");
  const [otpMode, setOtpMode] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");
    const result = await sendCoachMagicLink(email);
    setIsLoading(false);
    if (result.success) {
      setOtpMode(true);
    } else {
      setErrorMsg(result.error || "Failed to send code.");
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");
    const result = await verifyCoachOtp(email, otpCode);
    setIsLoading(false);
    if (result.success) {
      window.location.reload();
    } else {
      setErrorMsg(result.error || "Invalid code.");
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-[#F9F7F3] rounded-[2.5rem] shadow-xl border border-brand-sage/10 p-10 relative overflow-hidden">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-brand-sage/10 rounded-2xl flex items-center justify-center mb-4">
            <Lock className="w-8 h-8 text-brand-sage" />
          </div>
          <h1 className="text-3xl font-serif font-black text-brand-charcoal">Coach Portal</h1>
          <p className="text-brand-warm-gray text-sm mt-2 text-center">
            {!otpMode ? "Enter your coach email to receive a secure login code." : "Check your inbox for your login code."}
          </p>
        </div>

        {!otpMode ? (
          <form onSubmit={handleSend} className="flex flex-col gap-4">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-warm-gray" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your coach email..."
                className="w-full bg-white border-2 border-brand-border rounded-xl pl-12 pr-4 py-3 outline-none focus:border-brand-sage transition-colors font-medium"
                required
              />
            </div>
            {errorMsg && <p className="text-[#D25D48] text-sm font-bold">{errorMsg}</p>}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-brand-sage hover:bg-brand-sage-hover text-white rounded-full h-14 font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50 shadow-md active:scale-95 mt-2"
            >
              {isLoading ? "Sending..." : "Send Login Code"} <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerify} className="flex flex-col gap-4">
            <p className="text-brand-sage text-sm font-bold bg-brand-sage/10 p-3 rounded-lg border border-brand-sage/20 text-center">
              Code sent! Check your inbox and spam folder.
            </p>
            <input
              type="text"
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value)}
              placeholder="Enter login code..."
              className="w-full bg-white border-2 border-brand-border rounded-xl px-4 py-3 outline-none focus:border-brand-sage transition-colors font-medium text-center text-2xl tracking-widest"
              maxLength={8}
              required
            />
            {errorMsg && <p className="text-[#D25D48] text-sm font-bold">{errorMsg}</p>}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-brand-sage hover:bg-brand-sage-hover text-white rounded-full h-14 font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50 shadow-md active:scale-95 mt-2"
            >
              {isLoading ? "Verifying..." : "Access Dashboard"} <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => { setOtpMode(false); setOtpCode(""); setErrorMsg(""); }}
              className="text-xs text-brand-warm-gray hover:text-brand-charcoal text-center underline"
            >
              Go back
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
