"use client";

import React, { useState } from "react";
import { formatINR } from "@/lib/utils";
import { Coins, CheckCircle, PieChart, Layers, Plane, ShieldCheck } from "lucide-react";

export function BudgetBreakdown() {
  const [activeTab, setActiveTab] = useState<"rd_budget" | "sector_bom">("rd_budget");

  const budgetItems = [
    {
      head: "Sensor & Drone hardware",
      phase1: 12,
      phase2: 25,
      phase3: 20,
      total: 57,
      pct: "43.8%",
      desc: "Geophones, MEMS acoustic arrays, Cortex-M7 MCUs, LoRa radios, VTOL drone frames, brushless motors, FLIR Boson thermal cores, and docking actuators.",
    },
    {
      head: "AI & software development",
      phase1: 8,
      phase2: 6,
      phase3: 4,
      total: 18,
      pct: "13.8%",
      desc: "INT8 1D-CNN quantization, TDOA Levenberg-Marquardt solver, Bayesian decision engine, autonomous UAV dispatch daemon, and MapLibre C2 dashboard.",
    },
    {
      head: "Enclosure & ruggedisation",
      phase1: 0,
      phase2: 10,
      phase3: 5,
      total: 15,
      pct: "11.5%",
      desc: "IP67 node potting, marine-grade aluminum IP65 drone dock casing, heated sliding lid seals, and Peltier climate control.",
    },
    {
      head: "Field trial & logistics",
      phase1: 0,
      phase2: 5,
      phase3: 20,
      total: 25,
      pct: "19.2%",
      desc: "Multi-terrain transport, deployment rigs, LoC/LAC border trial logistics in coordination with DIO/Army partners.",
    },
    {
      head: "Testing, certification & contingency",
      phase1: 3,
      phase2: 4,
      phase3: 8,
      total: 15,
      pct: "11.5%",
      desc: "MIL-STD-810H environmental stress screening, EMI/EMC compliance testing, patent filing, and risk contingency buffer.",
    },
  ];

  const sectorBOM = [
    {
      item: "BHOOMI Ground Sensor Nodes",
      qty: "100 Nodes",
      unitCost: "₹ 11,350",
      totalCost: "₹ 11,35,000",
      share: "22.8%",
      desc: "4.5Hz Geophone, MEMS mic, STM32H7, SX1262 LoRa, 10Ah LiFePO4, 5W solar, IP67 enclosure & stainless stake.",
    },
    {
      item: "BHOOMI Sector AI Gateway",
      qty: "1 Unit",
      unitCost: "₹ 85,000",
      totalCost: "₹ 85,000",
      share: "1.7%",
      desc: "Raspberry Pi CM4 8GB, SX1303 LoRa concentrator, GPS PPS timing, LTE modem, TimescaleDB & TDOA solver.",
    },
    {
      item: "Autonomous Drone Docking Stations",
      qty: "5 Docks",
      unitCost: "₹ 4,50,000",
      totalCost: "₹ 22,50,000",
      share: "45.3%",
      desc: "IP65 marine aluminum housing, <3s motorized sliding lid, 15W Qi wireless inductive charging, Peltier HVAC.",
    },
    {
      item: "VTOL Interceptor Drones",
      qty: "5 UAVs",
      unitCost: "₹ 3,00,000",
      totalCost: "₹ 15,00,000",
      share: "30.2%",
      desc: "Carbon-fiber quadcopter airframe, FLIR Boson 640 LWIR thermal core + 4K EO gimbal, 35-min flight, airborne LoRa repeater.",
    },
  ];

  return (
    <div className="rounded-2xl border border-slate-800 bg-[#090d16] p-6 sm:p-8 shadow-2xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <span className="text-xs font-mono text-amber-400 uppercase tracking-wider block mb-1">
            FINANCIAL ENGINEERING & PRODUCTION ECONOMICS
          </span>
          <h3 className="text-2xl font-bold text-white tracking-tight">
            Financial Milestones & Commercial BOM (PDD v1.0)
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Structured for accelerated R&D development and modular 5KM sector volume manufacturing
          </p>
        </div>

        {/* Highlight Stats */}
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-right">
            <span className="text-[10px] font-mono text-slate-500 uppercase block">
              {activeTab === "rd_budget" ? "PROPOSED R&D GRANT" : "5KM SECTOR HARDWARE"}
            </span>
            <span className="text-xl font-black font-mono text-amber-400">
              {activeTab === "rd_budget" ? "₹1.30 Crore" : "₹49.70 Lakhs"}
            </span>
            <span className="text-[10px] font-mono text-emerald-400 block">
              {activeTab === "rd_budget" ? "Within ₹1.5 Cr Ceiling" : "~₹9.94 Lakhs / km"}
            </span>
          </div>
        </div>
      </div>

      {/* Tab Switcher */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setActiveTab("rd_budget")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold tracking-wider transition-all ${
            activeTab === "rd_budget"
              ? "bg-amber-500 text-slate-950 shadow-[0_0_15px_rgba(245,158,11,0.3)]"
              : "bg-slate-900 text-slate-400 border border-slate-800 hover:text-white"
          }`}
        >
          <Coins className="w-3.5 h-3.5" />
          <span>R&D MILESTONE BUDGET (₹1.30 CR)</span>
        </button>

        <button
          onClick={() => setActiveTab("sector_bom")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold tracking-wider transition-all ${
            activeTab === "sector_bom"
              ? "bg-emerald-500 text-slate-950 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
              : "bg-slate-900 text-slate-400 border border-slate-800 hover:text-white"
          }`}
        >
          <Plane className="w-3.5 h-3.5" />
          <span>5KM SECTOR COMMERCIAL BOM (PDD v1.0)</span>
        </button>
      </div>

      {activeTab === "rd_budget" ? (
        <>
          {/* Phase Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-[10px] font-mono text-slate-400 uppercase block">
                PHASE 1 (0–6 MONTHS)
              </span>
              <div className="text-2xl font-bold font-mono text-emerald-400 mt-1">
                ₹23.00 L
              </div>
              <span className="text-[11px] text-slate-400 mt-1 block">
                Lab proof-of-concept, baseline classifier & drone dock bench test
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
                Outdoor prototype, dock lid actuation, Qi charging & mesh test
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
                Designated border trial, cued drone intercept & system handover
              </span>
            </div>
          </div>

          {/* Detailed Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/40 text-slate-400 font-mono text-[11px]">
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
                  <td className="py-4 px-4 text-white uppercase">Grand Total (R&D)</td>
                  <td className="py-4 px-3 text-center text-emerald-400">₹23 L</td>
                  <td className="py-4 px-3 text-center text-cyan-400">₹50 L</td>
                  <td className="py-4 px-3 text-center text-purple-400">₹57 L</td>
                  <td className="py-4 px-4 text-right text-amber-400 text-sm">₹1.30 Cr</td>
                  <td className="py-4 px-3 text-right text-white">100%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      ) : (
        /* 5KM Commercial Sector Kit BOM (PDD Section 14.2) */
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <div>
                <span className="text-xs font-mono font-bold text-white block">
                  BHOOMI 5KM SECTOR KIT HARDWARE UNIT ECONOMICS
                </span>
                <span className="text-[11px] text-slate-400">
                  Turnkey production cost is ~₹9.94 Lakhs/km — a fraction of legacy borehole seismometers (₹50L/km)
                </span>
              </div>
            </div>
            <span className="text-xs font-mono text-emerald-300 font-bold bg-emerald-950 px-2.5 py-1 rounded border border-emerald-500/40">
              PDD v1.0 SECTION 14
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/40 text-slate-400 font-mono text-[11px]">
                  <th className="py-3 px-4 uppercase">Sector Kit Sub-Module</th>
                  <th className="py-3 px-3 uppercase text-center">Standard Quantity</th>
                  <th className="py-3 px-3 uppercase text-right">Unit Price (INR)</th>
                  <th className="py-3 px-4 uppercase text-right">Total Sector Cost</th>
                  <th className="py-3 px-3 uppercase text-right">% Share</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {sectorBOM.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-900/40 transition-colors">
                    <td className="py-4 px-4">
                      <div className="font-semibold text-white">{item.item}</div>
                      <div className="text-[11px] text-slate-400 max-w-sm mt-0.5">{item.desc}</div>
                    </td>
                    <td className="py-4 px-3 text-center font-mono text-cyan-400 font-bold">
                      {item.qty}
                    </td>
                    <td className="py-4 px-3 text-right font-mono text-slate-300">
                      {item.unitCost}
                    </td>
                    <td className="py-4 px-4 text-right font-mono font-bold text-emerald-400">
                      {item.totalCost}
                    </td>
                    <td className="py-4 px-3 text-right font-mono text-slate-400">
                      {item.share}
                    </td>
                  </tr>
                ))}
                <tr className="bg-slate-900/80 font-mono font-bold text-xs border-t-2 border-slate-700">
                  <td className="py-4 px-4 text-white uppercase">Total Hardware (5KM Sector)</td>
                  <td className="py-4 px-3 text-center text-cyan-300">1 Kit</td>
                  <td className="py-4 px-3 text-right text-slate-400">—</td>
                  <td className="py-4 px-4 text-right text-emerald-400 text-sm">~₹49,70,000</td>
                  <td className="py-4 px-3 text-right text-white">100%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-400 flex items-center justify-between">
        <span>* Financial figures aligned with official iDEX Open Challenge ceiling and PDD v1.0 production estimates.</span>
        <span className="text-emerald-400 hidden sm:inline">CEILING: ₹1.50 Cr</span>
      </div>
    </div>
  );
}
