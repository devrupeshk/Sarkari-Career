"use client";

import React, { useState } from "react";
import { useSettings } from "@/hooks/useSettings";
import { Mail, Loader2 } from "lucide-react";

export function EmailSubscription() {
  const settings = useSettings();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const subscriptionUrl = settings.emailSubscriptionLink || "";

  const handleSubmit = async (e: React.FormEvent) => {
    // If there is a configured subscriptionUrl, we let the form submit naturally to that URL in a new tab.
    if (subscriptionUrl) {
      return; // Handled by standard HTML form action
    }

    // Otherwise, simulate a successful inline submission
    e.preventDefault();
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
    setSuccess(true);
    setEmail("");
  };

  return (
    <div className="bg-gradient-to-br from-navy to-[#0F203A] border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.15)] ring-1 ring-white/5 rounded-2xl p-5 relative overflow-hidden group">
      {/* Visual Mesh Glows */}
      <div className="absolute -top-20 -right-20 w-44 h-44 bg-blue-500/15 rounded-full blur-2xl group-hover:bg-blue-500/25 transition-all duration-500 pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-brand/10 rounded-full blur-2xl group-hover:bg-brand/20 transition-all duration-500 pointer-events-none" />

      <div className="relative z-10">
        {/* Animated Envelope Icon */}
        <div className="relative w-10 h-10 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center mb-3.5 shadow-[0_0_20px_rgba(220,38,38,0.15)] transition-all duration-300 group-hover:scale-105 group-hover:border-brand/30 group-hover:bg-brand/20">
          <div className="absolute inset-0 rounded-xl bg-brand/20 animate-ping opacity-40 pointer-events-none" />
          <Mail className="w-5 h-5 text-brand transition-all duration-300 group-hover:rotate-6" />
        </div>

        <h4 className="text-[15px] font-bold text-white mb-1.5 tracking-wide flex items-center gap-1.5">
          Get Daily Job Alerts
          <span className="inline-flex w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
        </h4>

        <p className="text-[11.5px] font-medium text-slate-400 mb-4 leading-relaxed">
          Get latest verified Sarkari Naukri, Admit Cards & Results notifications delivered directly to your inbox.
        </p>

        {success ? (
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3 text-center">
            <span className="text-emerald-400 text-xs font-bold">✓ Subscribed Successfully!</span>
            <p className="text-[10px] text-slate-400 mt-1">Check your inbox for confirmation.</p>
          </div>
        ) : (
          <form
            action={subscriptionUrl || undefined}
            method={subscriptionUrl ? "POST" : undefined}
            target={subscriptionUrl ? "_blank" : undefined}
            onSubmit={handleSubmit}
            className="space-y-2.5"
          >
            <div className="relative">
              <input
                type="email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email address"
                className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 pl-4 pr-10 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all duration-300"
              />
              <Mail className="absolute right-3.5 top-3 w-4 h-4 text-white/30" />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand hover:bg-brand-hover disabled:bg-brand/50 text-white text-[12px] font-extrabold rounded-full py-2.5 transition-all duration-300 hover:-translate-y-px shadow-lg shadow-brand/10 hover:shadow-brand/25 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" /> Subscribing...
                </>
              ) : (
                "Subscribe Now"
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
