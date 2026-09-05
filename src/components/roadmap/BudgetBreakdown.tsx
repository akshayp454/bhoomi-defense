"use client";

import React, { useState } from "react";
import { formatINR } from "@/lib/utils";
import { Coins, CheckCircle, PieChart, Layers } from "lucide-react";

export function BudgetBreakdown() {
  const [selectedPhase, setSelectedPhase] = useState<"all" | "p1" | "p2" | "p3">("all");

  const budgetItems = [
    {
      head: "Sensor hardware & components",
      phase1: 12,
      phase2: 25,
      phase3: 20,
      total: 57,
      pct: "43.8%",
      desc: "Geophones, MEMS acoustic sensors, Cortex-M33 MCUs, LoRa radios, solar cells & LiFePO4 batteries.",
    },
    {
      head: "AI & software development",
      phase1: 8,
      phase2: 6,
      phase3: 4,
      total: 18,
      pct: "13.8%",
      desc: "Algorithm design, feature extraction, TinyML quantization, edge cross-verification and C4I integration.",
    },
    {
      head: "Enclosure & ruggedisation",
      phase1: 0,
      phase2: 10,
      phase3: 5,
      total: 15,
      pct: "11.5%",
      desc: "IP67 hermetic sealing, ground-stake acoustic impedance matching, extreme temperature qualification.",
    },
    {
      head: "Field trial & logistics",
      phase1: 0,
      phase2: 5,
      phase3: 20,
      total: 25,
      pct: "19.2%",
      desc: "Multi-terrain transport, deployment rigs, border trial logistics in coordination with DIO/Army partners.",
    },
    {
      head: "Testing, certification & contingency",
      phase1: 3,
      phase2: 4,
      phase3: 8,
      total: 15,
      pct: "11.5%",
      desc: "Environmental stress screening, EMI/EMC compliance testing, patent filing and risk contingency buffer.",
    },
  ];

  return (
    <div className="rounded-2xl border border-slate-800 bg-[#090d16] p-6 sm:p-8 shadow-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <span className="text-xs font-mono text-amber-400 uppercase tracking-wider block mb-1">
            PRODUCT R&D & PRODUCTION FINANCIAL MILESTONES
          </span>
          <h3 className="text-2xl font-bold text-white tracking-tight">
            R&D Capital Allocation & Deployment Milestones
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Structured for accelerated prototype-to-field scaling and volume defence manufacturing
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-right">
            <span className="text-[10px] font-mono text-slate-500 uppercase block">
              TOTAL R&D INVESTMENT
            </span>
            <span className="text-xl font-black font-mono text-amber-400">
              ₹1.30 Crore
            </span>
          </div>
        </div>
      </div>

      {/* Phase Summary Cards */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <span className="text-[10px] font-mono text-slate-400 uppercase block">
            PHASE 1 (0–6 MONTHS)
          </span>
          <div className="text-2xl font-bold font-mono text-emerald-400 mt-1">
            ₹23.00 L
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">
            Lab proof-of-concept & baseline classifier
          </span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <span className="text-[10px] font-mono text-slate-400 uppercase block">
            PHASE 2 (6–12 MONTHS)
          </span>
          <div className="text-2xl font-bold font-mono text-cyan-400 mt-1">
            ₹50.00 L
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">
            Outdoor prototype, ruggedisation & mesh
          </span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <span className="text-[10px] font-mono text-slate-400 uppercase block">
            PHASE 3 (12–18 MONTHS)
          </span>
          <div className="text-2xl font-bold font-mono text-purple-400 mt-1">
            ₹57.00 L
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">
            Designated border trial & system handover
          </span>
        </div>
      </div>

      {/* Detailed Table */}
      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 font-mono text-[11px]">
              <th className="py-3 px-4 uppercase">Expenditure Head</th>
              <th className="py-3 px-3 uppercase text-center">Phase 1</th>
              <th className="py-3 px-3 uppercase text-center">Phase 2</th>
              <th className="py-3 px-3 uppercase text-center">Phase 3</th>
              <th className="py-3 px-4 uppercase text-right">Total Indicative</th>
              <th className="py-3 px-3 uppercase text-right">% Share</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {budgetItems.map((item, idx) => (
              <tr key={idx} className="hover:bg-slate-900/40 transition-colors">
                <td className="py-4 px-4">
                  <div className="font-semibold text-white">{item.head}</div>
                  <div className="text-[11px] text-slate-400 max-w-sm mt-0.5">{item.desc}</div>
                </td>
                <td className="py-4 px-3 text-center font-mono text-slate-300">
                  {item.phase1 > 0 ? `₹${item.phase1} L` : "—"}
                </td>
                <td className="py-4 px-3 text-center font-mono text-slate-300">
                  {item.phase2 > 0 ? `₹${item.phase2} L` : "—"}
                </td>
                <td className="py-4 px-3 text-center font-mono text-slate-300">
                  {item.phase3 > 0 ? `₹${item.phase3} L` : "—"}
                </td>
                <td className="py-4 px-4 text-right font-mono font-bold text-amber-400">
                  ₹{item.total} L
                </td>
                <td className="py-4 px-3 text-right font-mono text-slate-400">
                  {item.pct}
                </td>
              </tr>
            ))}
            {/* Grand Total Row */}
            <tr className="bg-slate-900/80 font-mono font-bold text-xs border-t-2 border-slate-700">
              <td className="py-4 px-4 text-white uppercase">Grand Total</td>
              <td className="py-4 px-3 text-center text-emerald-400">₹23 L</td>
              <td className="py-4 px-3 text-center text-cyan-400">₹50 L</td>
              <td className="py-4 px-3 text-center text-purple-400">₹57 L</td>
              <td className="py-4 px-4 text-right text-amber-400 text-sm">₹1.30 Cr</td>
              <td className="py-4 px-3 text-right text-white">100%</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-4 p-3 rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-400 flex items-center justify-between">
        <span>* Finalized budget to be furnished as part of formal iDEX portal submission in line with iDEX Financial Guidelines.</span>
        <span className="text-emerald-400 hidden sm:inline">CEILING: ₹1.50 Cr</span>
      </div>
    </div>
  );
}
