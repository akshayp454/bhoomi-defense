import React from "react";
import { TrlProgression } from "@/components/roadmap/TrlProgression";
import { BudgetBreakdown } from "@/components/roadmap/BudgetBreakdown";
import { RiskMitigationMatrix } from "@/components/roadmap/RiskMitigationMatrix";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Milestone, TrendingUp, ShieldCheck, Coins } from "lucide-react";

export const metadata = {
  title: "Roadmap, TRL & Budget | BHOOMI Defence Deeptech",
  description: "18-month development roadmap, TRL 1 to TRL 7 progression, ₹1.30 Crore milestone-linked budget breakdown, and operational risk mitigation for iDEX Open Challenge.",
};

export default function RoadmapPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 bg-[#06080e] bg-tactical-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-xs font-mono text-cyan-400 mb-4">
              <Milestone className="w-3.5 h-3.5" />
              <span>iDEX GRANT DEVELOPMENT TIMELINE & FINANCIALS</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
              TRL Progression & Budget Execution
            </h1>
            <p className="mt-4 text-base text-slate-300 leading-relaxed">
              A phased 18-month execution plan taking BHOOMI from laboratory proof-of-concept (TRL 2/3) to an operationally validated border field trial (TRL 6/7) under a disciplined ₹1.30 Crore milestone structure.
            </p>
          </div>
        </ScrollReveal>

        {/* Section 1: TRL Progression & Milestones */}
        <ScrollReveal delay={0.1}>
          <div id="phases">
            <TrlProgression />
          </div>
        </ScrollReveal>

        {/* Section 2: Financial Plan & Milestone Budget */}
        <ScrollReveal delay={0.2}>
          <div id="budget">
            <BudgetBreakdown />
          </div>
        </ScrollReveal>

        {/* Section 3: Risk Analysis & Mitigation */}
        <ScrollReveal delay={0.3}>
          <div id="risks">
            <RiskMitigationMatrix />
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
