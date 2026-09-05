"use client";

import React, { useState } from "react";
import { submitGrantInquiry, ActionState } from "@/app/actions/inquiry";
import confetti from "canvas-confetti";
import { Shield, Send, CheckCircle2, AlertCircle, Loader2, Radio } from "lucide-react";

export function GrantInquiryForm() {
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState<ActionState | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setState(null);

    const formData = new FormData(e.currentTarget);
    const result = await submitGrantInquiry({ success: false, message: "" }, formData);

    setLoading(false);
    setState(result);

    if (result.success) {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#10b981", "#06b6d4", "#f59e0b"],
      });
      (e.target as HTMLFormElement).reset();
    }
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-[#090d16] p-6 sm:p-8 shadow-2xl">
      <div className="flex items-center justify-between pb-6 border-b border-slate-800">
        <div>
          <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider block mb-1">
            NAX NOVA ENTERPRISE & DEFENCE CLIENT PORTAL
          </span>
          <h3 className="text-2xl font-bold text-white tracking-tight">
            Book Live Product Demonstration
          </h3>
        </div>
        <span className="text-xs font-mono text-slate-400 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-700">
          ENCRYPTED CHANNEL
        </span>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        {state && (
          <div
            className={`p-4 rounded-xl border flex items-start gap-3 text-xs ${
              state.success
                ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-300"
                : "bg-red-950/40 border-red-500/40 text-red-300"
            }`}
          >
            {state.success ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
            )}
            <div>
              <div className="font-bold">{state.success ? "Request Submitted" : "Submission Error"}</div>
              <div className="mt-0.5 leading-relaxed">{state.message}</div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1.5">
              Full Name *
            </label>
            <input
              type="text"
              name="fullName"
              required
              placeholder="Col. Vikram S. / Rajesh Mehta"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-emerald-500 text-xs text-white placeholder:text-slate-600 outline-none transition-colors"
            />
            {state?.errors?.fullName && (
              <span className="text-[11px] text-red-400 mt-1 block">
                {state.errors.fullName[0]}
              </span>
            )}
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1.5">
              Organization / Agency *
            </label>
            <input
              type="text"
              name="organization"
              required
              placeholder="Indian Army / BSF / DRDO / Enterprise Security"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-emerald-500 text-xs text-white placeholder:text-slate-600 outline-none transition-colors"
            />
            {state?.errors?.organization && (
              <span className="text-[11px] text-red-400 mt-1 block">
                {state.errors.organization[0]}
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1.5">
              Official Email *
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="officer@nic.in or security@enterprise.com"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-emerald-500 text-xs text-white placeholder:text-slate-600 outline-none transition-colors"
            />
            {state?.errors?.email && (
              <span className="text-[11px] text-red-400 mt-1 block">
                {state.errors.email[0]}
              </span>
            )}
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1.5">
              Designation / Role
            </label>
            <input
              type="text"
              name="designation"
              placeholder="Chief Security Officer / Technical Director"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-emerald-500 text-xs text-white placeholder:text-slate-600 outline-none transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1.5">
              Inquiry Type *
            </label>
            <select
              name="inquiryType"
              required
              defaultValue="technical_briefing"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-emerald-500 text-xs text-white outline-none transition-colors"
            >
              <option value="technical_briefing">Live Field Demonstration / PoC</option>
              <option value="grant_evaluation">Technical Architecture Briefing</option>
              <option value="procurement">Defence / Security Procurement</option>
              <option value="field_trial_partnership">Perimeter Trial Site Partnership</option>
              <option value="other">Strategic Enterprise Collaboration</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1.5">
              Phone / Contact (Optional)
            </label>
            <input
              type="tel"
              name="phone"
              placeholder="+91 XXXXX XXXXX"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-emerald-500 text-xs text-white placeholder:text-slate-600 outline-none transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono text-slate-300 mb-1.5">
            Demonstration Requirements / Operational Parameters *
          </label>
          <textarea
            name="message"
            rows={4}
            required
            placeholder="Please specify your sector topography, installation requirements, or preferred schedule for a BHOOMI™ technical demonstration..."
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-emerald-500 text-xs text-white placeholder:text-slate-600 outline-none transition-colors resize-none"
          />
          {state?.errors?.message && (
            <span className="text-[11px] text-red-400 mt-1 block">
              {state.errors.message[0]}
            </span>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 disabled:opacity-50 text-slate-950 font-bold text-xs tracking-wider transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>DISPATCHING REQUEST TO NAX NOVA ENGINEERS...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>SCHEDULE PRODUCT DEMONSTRATION</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
