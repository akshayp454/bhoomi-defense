import React from "react";
import { DefenseScenarios } from "@/components/applications/DefenseScenarios";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Shield, Target, Award, Compass } from "lucide-react";

export const metadata = {
  title: "Defense Applications | BHOOMI Defence Deeptech",
  description: "Operational deployment scenarios for BHOOMI along the Line of Control (LoC) and Line of Actual Control (LAC): Sub-surface tunnel interdiction, low-visibility fog infiltration, and perimeter defense.",
};

export default function ApplicationsPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 bg-[#06080e] bg-tactical-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-xs font-mono text-emerald-400 mb-4">
              <Compass className="w-3.5 h-3.5" />
              <span>OPERATIONAL BATTLEFIELD CONTEXT</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
              Operational Defense Applications
            </h1>
            <p className="mt-4 text-base text-slate-300 leading-relaxed">
              Engineered to address high-threat operational gaps identified by border security forces where conventional optical sights, thermal imagers, and active radars fail to provide continuous protection.
            </p>
          </div>
        </ScrollReveal>

        {/* Defense Scenarios */}
        <ScrollReveal delay={0.2}>
          <DefenseScenarios />
        </ScrollReveal>
      </div>
    </div>
  );
}
