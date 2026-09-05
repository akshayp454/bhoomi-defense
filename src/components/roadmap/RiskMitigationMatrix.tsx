"use client";

import React from "react";
import { AlertTriangle, ShieldCheck, CheckCircle2 } from "lucide-react";

export function RiskMitigationMatrix() {
  const risks = [
    {
      risk: "False positives from wildlife / weather in initial classifier",
      level: "Medium",
      levelColor: "text-amber-400 bg-amber-950/40 border-amber-500/30",
      mitigation:
        "Large, diverse training dataset collected across all 4 seasons; continuous on-field active-learning re-training loop embedded in firmware.",
    },
    {
      risk: "Node durability in extreme terrain & harsh weather",
      level: "Medium",
      levelColor: "text-amber-400 bg-amber-950/40 border-amber-500/30",
      mitigation:
        "IP67-rated ruggedised sealed enclosures; phased environmental stress chamber and outdoor testing before border trial.",
    },
    {
      risk: "Mesh network range & packet reliability in hilly terrain",
      level: "Medium",
      levelColor: "text-amber-400 bg-amber-950/40 border-amber-500/30",
      mitigation:
        "Adaptive node spacing and dynamic multi-hop packet relay algorithms; secondary gateway redundancy in trial sector deployment.",
    },
    {
      risk: "Access to a border-representative designated trial site",
      level: "High",
      levelColor: "text-red-400 bg-red-950/40 border-red-500/30",
      mitigation:
        "Early proactive coordination with DIO / Partner Incubators and Indian Army designated nodal officers to schedule trial site clearances for Phase 3.",
    },
    {
      risk: "Power availability (solar) in winter / low-sunlight zones",
      level: "Low",
      levelColor: "text-emerald-400 bg-emerald-950/40 border-emerald-500/30",
      mitigation:
        "LiFePO4 battery buffer sized for 14-day zero-sun autonomy; ultra-low-power duty-cycled edge listening (<18 mW active draw).",
    },
  ];

  return (
    <div className="rounded-2xl border border-slate-800 bg-[#090d16] p-6 sm:p-8 shadow-2xl">
      <div className="flex items-center justify-between pb-6 border-b border-slate-800">
        <div>
          <span className="text-xs font-mono text-red-400 uppercase tracking-wider block mb-1">
            SECTION 8: OPERATIONAL RISK GOVERNANCE
          </span>
          <h3 className="text-2xl font-bold text-white tracking-tight">
            Risk Analysis & Mitigation Plan
          </h3>
        </div>
        <span className="text-xs font-mono text-slate-400 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-700">
          PROPOSAL SECTION 8
        </span>
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 font-mono text-[11px]">
              <th className="py-3 px-4 uppercase w-1/3">Identified Operational Risk</th>
              <th className="py-3 px-3 uppercase text-center w-28">Risk Level</th>
              <th className="py-3 px-4 uppercase">Engineered Mitigation Strategy</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {risks.map((item, idx) => (
              <tr key={idx} className="hover:bg-slate-900/30 transition-colors">
                <td className="py-4 px-4 font-semibold text-white">
                  {item.risk}
                </td>
                <td className="py-4 px-3 text-center">
                  <span className={`inline-block px-2.5 py-1 rounded-md text-[10px] font-mono font-bold border ${item.levelColor}`}>
                    {item.level.toUpperCase()}
                  </span>
                </td>
                <td className="py-4 px-4 text-slate-300 leading-relaxed font-sans">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item.mitigation}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
