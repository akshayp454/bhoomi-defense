"use client";

import React, { useState } from "react";
import { submitWhitepaperRequest, WhitepaperState } from "@/app/actions/whitepaper";
import { FileText, Download, CheckCircle2, Lock, Loader2 } from "lucide-react";

export function WhitepaperCard() {
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState<WhitepaperState | null>(null);

  const handleDownloadSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setState(null);

    const formData = new FormData(e.currentTarget);
    const res = await submitWhitepaperRequest({ success: false, message: "" }, formData);

    setLoading(false);
    setState(res);

    if (res.success) {
      (e.target as HTMLFormElement).reset();
    }
  };

  return (
    <div id="whitepaper" className="rounded-2xl border border-cyan-500/30 bg-[#090e18] p-6 sm:p-8 shadow-2xl space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-xl bg-cyan-950/50 border border-cyan-500/30 text-cyan-400">
          <FileText className="w-6 h-6" />
        </div>
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold block">
            TECHNICAL DOSSIER & SPECIFICATIONS
          </span>
          <h3 className="text-xl font-bold text-white tracking-tight">
            Download BHOOMI™ Datasheet
          </h3>
          <span className="text-xs text-slate-400 block mt-0.5">
            Full 13-Section Engineering & Tactical Deployment Dossier
          </span>
        </div>
      </div>

      <div className="space-y-2 text-xs font-mono text-slate-300 bg-slate-950/80 p-4 rounded-xl border border-slate-800">
        <div className="flex justify-between py-1 border-b border-slate-800/80">
          <span className="text-slate-500">Product System:</span>
          <span className="text-white">BHOOMI™ Sensor Mesh v2.0</span>
        </div>
        <div className="flex justify-between py-1 border-b border-slate-800/80">
          <span className="text-slate-500">Manufacturer:</span>
          <span className="text-emerald-400 font-bold">NaX Nova LLP</span>
        </div>
        <div className="flex justify-between py-1 border-b border-slate-800/80">
          <span className="text-slate-500">Domain:</span>
          <span className="text-white">Autonomous Sensing & AI Fusion</span>
        </div>
        <div className="flex justify-between py-1">
          <span className="text-slate-500">Security Clearance:</span>
          <span className="text-cyan-400">DEFENCE & ENTERPRISE VERIFIED</span>
        </div>
      </div>

      <form onSubmit={handleDownloadSubmit} className="space-y-3">
        {state && (
          <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-300 flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>{state.message}</span>
          </div>
        )}

        <div>
          <input
            type="text"
            name="organization"
            required
            placeholder="Enterprise / Agency Name"
            className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-500 text-xs text-white placeholder:text-slate-600 outline-none transition-colors"
          />
        </div>

        <div>
          <input
            type="email"
            name="email"
            required
            placeholder="Official Email Address"
            className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-500 text-xs text-white placeholder:text-slate-600 outline-none transition-colors"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white font-bold text-xs tracking-wider transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(6,182,212,0.25)]"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>AUTHENTICATING ACCESS...</span>
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              <span>REQUEST TECHNICAL DATASHEET (PDF)</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
