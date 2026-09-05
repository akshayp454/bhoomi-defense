"use client";

import React from "react";
import Link from "next/link";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Award, ShieldCheck, FileCheck, ArrowRight, Zap, Building2, Radio } from "lucide-react";

export function ImpactSummarySection() {
  return (
    <section className="py-24 bg-[#06080e] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-emerald-500/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-[#09111c] via-[#06080e] to-[#071317] p-8 sm:p-12 relative overflow-hidden shadow-2xl">
            {/* Top Tag */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
                  NAX NOVA LLP • SOVEREIGN DEFENCE INFRASTRUCTURE
                </span>
              </div>
              <span className="text-xs font-mono text-slate-400">
                FLAGSHIP PRODUCT: BHOOMI™ SENSOR MESH
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-8 space-y-4">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
                  Protecting Sovereign Borders With Autonomous Sub-Surface Intelligence
                </h3>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  <strong className="text-white">NaX Nova LLP</strong> bridges the critical vulnerability gap in conventional border surveillance. Where line-of-sight cameras are blinded by fog and high-cost active radars expose tactical positions, our 100% passive BHOOMI™ sensor mesh operates unseen, continuously detecting underground tunneling and covert perimeter crossings.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-xs font-mono">
                  <div className="flex items-start gap-2.5 text-slate-300">
                    <FileCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Proprietary dual-modality seismic-acoustic AI fusion algorithm (Patent Pending)</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-slate-300">
                    <Building2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>Designed, developed, and manufactured indigenously under Make in India</span>
                  </div>
                </div>
              </div>

              {/* Action Box: Book Product Demonstration */}
              <div className="lg:col-span-4 bg-slate-900/80 border border-slate-800 p-6 rounded-2xl text-center space-y-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-950/60 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
                  <Radio className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-white font-mono">
                  Book Live Product Demo
                </h4>
                <p className="text-xs text-slate-400">
                  Schedule a private hardware demonstration with NaX Nova engineering leadership for tactical sector deployment.
                </p>
                <div className="pt-2">
                  <Link
                    href="/contact"
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs tracking-wider transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                  >
                    <span>REQUEST DEMONSTRATION</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
