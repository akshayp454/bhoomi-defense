import React from "react";
import Link from "next/link";
import { Shield, Radio, Lock, Award, ExternalLink, Cpu } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-[#04060a] text-slate-400 text-xs relative overflow-hidden">
      {/* Subtle top tactical line */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Col 1 & 2: Project Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-950/40 border border-emerald-500/40 flex items-center justify-center">
                <Radio className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <span className="text-lg font-black tracking-widest text-white font-mono">
                  BHOOMI
                </span>
                <span className="block text-[10px] tracking-wider text-slate-500 font-mono">
                  BORDER HAZARD OBSERVATION & ONSET MONITORING INFRASTRUCTURE
                </span>
              </div>
            </div>

            <p className="text-slate-400 leading-relaxed text-xs max-w-md">
              A breakthrough, low-cost, 100% passive seismic-acoustic sensor mesh network with on-edge AI cross-verification for real-time sub-surface tunnel and low-visibility border infiltration detection along India's LoC and LAC.
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-700 text-[10px] font-mono text-emerald-400">
                <Award className="w-3 h-3" /> iDEX OPEN CHALLENGE
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-700 text-[10px] font-mono text-cyan-400">
                <Lock className="w-3 h-3" /> PROVISIONAL PATENT PENDING
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-700 text-[10px] font-mono text-slate-300">
                🇮🇳 ATMANIRBHAR BHARAT
              </span>
            </div>
          </div>

          {/* Col 3: Navigation */}
          <div>
            <h4 className="text-white font-mono text-xs font-bold tracking-wider uppercase mb-3">
              Architecture & Tech
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/technology" className="hover:text-emerald-400 transition-colors">
                  Sensor Node Design
                </Link>
              </li>
              <li>
                <Link href="/technology#fusion" className="hover:text-emerald-400 transition-colors">
                  Edge-AI Sensor Fusion
                </Link>
              </li>
              <li>
                <Link href="/technology#mesh" className="hover:text-emerald-400 transition-colors">
                  LoRa Encrypted Mesh Relay
                </Link>
              </li>
              <li>
                <Link href="/technology#specs" className="hover:text-emerald-400 transition-colors">
                  Hardware Specifications
                </Link>
              </li>
              <li>
                <Link href="/#comparison" className="hover:text-emerald-400 transition-colors">
                  Comparative Analysis
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Proposal Milestones */}
          <div>
            <h4 className="text-white font-mono text-xs font-bold tracking-wider uppercase mb-3">
              Grant Roadmap
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/roadmap" className="hover:text-cyan-400 transition-colors">
                  TRL 1 → TRL 7 Progression
                </Link>
              </li>
              <li>
                <Link href="/roadmap#phases" className="hover:text-cyan-400 transition-colors">
                  18-Month Development Plan
                </Link>
              </li>
              <li>
                <Link href="/roadmap#budget" className="hover:text-cyan-400 transition-colors">
                  ₹1.30 Cr Milestone Budget
                </Link>
              </li>
              <li>
                <Link href="/roadmap#risks" className="hover:text-cyan-400 transition-colors">
                  Risk Mitigation Matrix
                </Link>
              </li>
              <li>
                <Link href="/applications" className="hover:text-cyan-400 transition-colors">
                  LoC/LAC Operational Trials
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Evaluator Portal */}
          <div>
            <h4 className="text-white font-mono text-xs font-bold tracking-wider uppercase mb-3">
              Evaluator Access
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/contact" className="hover:text-emerald-400 transition-colors">
                  Request Technical Briefing
                </Link>
              </li>
              <li>
                <Link href="/contact#whitepaper" className="hover:text-emerald-400 transition-colors">
                  Proposal Document v2.0
                </Link>
              </li>
              <li>
                <Link href="/contact#trial" className="hover:text-emerald-400 transition-colors">
                  Trial Site Coordination
                </Link>
              </li>
              <li>
                <span className="text-[11px] text-slate-400 block pt-1">
                  Submission Deadline:
                </span>
                <span className="text-[11px] font-mono font-bold text-amber-400">
                  30 September 2026
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with Compliance Notice */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Prepared for submission under iDEX Open Challenge, Defence Innovation Organisation (DIO).</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400 font-mono">
            <span>DOC VERSION: v2.0</span>
            <span>•</span>
            <span>IP: INNOVATOR-RETAINED</span>
            <span>•</span>
            <span className="text-emerald-400">STATUS: PROPOSAL READY</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
