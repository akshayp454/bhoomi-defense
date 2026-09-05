"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, CircleDot, ArrowRight, ShieldCheck, Clock } from "lucide-react";

export function TrlProgression() {
  const [activePhase, setActivePhase] = useState<number>(0);

  const phases = [
    {
      id: 0,
      phaseNumber: "Phase 1",
      duration: "0 – 6 Months",
      budget: "₹23 Lakhs",
      trlStart: "TRL 1",
      trlEnd: "TRL 3",
      title: "Lab Proof-of-Concept & Dataset Generation",
      deliverable: "Lab proof-of-concept with validated classifier",
      basis: "Bench-tested sensor fusion and classifier accuracy",
      activities: [
        "Signal acquisition and high-fidelity dataset generation (human walking, digging, animal movement, vehicle vibrations).",
        "Initial edge-AI classifier training and model quantization for low-power microcontroller deployment.",
        "Acoustic and seismic coupling benchmark in simulated soil and bedrock testbeds.",
        "Baseline evaluation achieving >90% detection rate in controlled laboratory settings.",
      ],
    },
    {
      id: 1,
      phaseNumber: "Phase 2",
      duration: "6 – 12 Months",
      budget: "₹50 Lakhs",
      trlStart: "TRL 3",
      trlEnd: "TRL 5",
      title: "Field-Representative Prototype & Ruggedisation",
      deliverable: "Outdoor field-representative prototype mesh",
      basis: "Outdoor prototype trial under controlled environmental conditions",
      activities: [
        "IP67-rated ruggedised ground stake enclosure design and thermal stress qualification (-20°C to +60°C).",
        "Solar power harvesting integration with LiFePO4 multi-day battery buffer.",
        "LoRa mesh networking firmware with hardware AES-256 encrypted multi-hop packet routing.",
        "Controlled outdoor trials across varied soil strata (clay, sandy, rocky terrain).",
        "Provisional patent filing for the dual-modality sensor fusion classification algorithm.",
      ],
    },
    {
      id: 2,
      phaseNumber: "Phase 3",
      duration: "12 – 18 Months",
      budget: "₹57 Lakhs",
      trlStart: "TRL 5",
      trlEnd: "TRL 6–7",
      title: "Border-Representative Operational Field Validation",
      deliverable: "Validated deployable system & handover dossier",
      basis: "Field trial at designated border-representative site in coordination with DIO",
      activities: [
        "Deployment at designated border-representative test site in coordination with DIO and Partner Incubators.",
        "Extended operational benchmarking against real-world subterranean digging and stealth traversal attempts.",
        "Command Post Tactical Dashboard integration with Indian Army GIS and C4I protocols.",
        "Final performance verification, environmental stress screening, and comprehensive handover documentation.",
      ],
    },
  ];

  return (
    <div className="rounded-2xl border border-slate-800 bg-[#090d16] p-6 sm:p-8 shadow-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block mb-1">
            SECTION 6 & 7: FEASIBILITY & TRL ROADMAP
          </span>
          <h3 className="text-2xl font-bold text-white tracking-tight">
            18-Month Technology Readiness Level Progression
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-emerald-400 px-3 py-1.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 font-semibold">
            TRL 1/2 ➔ TRL 6/7
          </span>
        </div>
      </div>

      {/* Phase Selector Tabs */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
        {phases.map((phase) => {
          const isSelected = activePhase === phase.id;
          return (
            <button
              key={phase.id}
              onClick={() => setActivePhase(phase.id)}
              className={`p-4 rounded-xl border text-left transition-all ${
                isSelected
                  ? "bg-slate-900 border-emerald-500/60 shadow-[0_0_15px_rgba(16,185,129,0.15)] ring-1 ring-emerald-500/40"
                  : "bg-slate-900/30 border-slate-800/80 hover:bg-slate-900/70"
              }`}
            >
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <span className="text-slate-400">{phase.phaseNumber}</span>
                <span className="text-emerald-400 font-bold">{phase.trlStart} ➔ {phase.trlEnd}</span>
              </div>
              <h4 className="text-sm font-bold text-white mb-1">
                {phase.title}
              </h4>
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mt-2">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-500" />
                  {phase.duration}
                </span>
                <span className="text-amber-400 font-semibold">{phase.budget}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Phase Details Card */}
      <motion.div
        key={activePhase}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="mt-6 p-6 rounded-xl bg-slate-950 border border-slate-800 space-y-6"
      >
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <span className="text-[10px] font-mono text-slate-500 uppercase">
              MILESTONE DELIVERABLE
            </span>
            <div className="text-base font-bold text-white mt-0.5">
              {phases[activePhase].deliverable}
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-mono text-slate-500 uppercase">
              ACCEPTANCE BASIS
            </span>
            <div className="text-xs font-mono text-cyan-400 font-semibold mt-0.5">
              {phases[activePhase].basis}
            </div>
          </div>
        </div>

        <div>
          <span className="text-xs font-mono text-slate-400 block mb-3 font-semibold uppercase">
            PLANNED WORK PACKAGES & ACTIVITIES:
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {phases[activePhase].activities.map((act, i) => (
              <div key={i} className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-900/60 border border-slate-800/80 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{act}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
