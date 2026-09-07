"use client";

import React from "react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Check, X, AlertCircle, ShieldAlert, CheckCircle2, Plane } from "lucide-react";

export function ComparativeMatrixSection() {
  const comparisonData = [
    {
      capability: "Works in Fog / Darkness / Canopy",
      optical: { status: "no", text: "No (Line-of-sight fails)" },
      radar: { status: "partial", text: "Partial (Foliage clutter)" },
      borehole: { status: "yes", text: "Yes" },
      bhoomi: { status: "yes", text: "Yes (All-Weather Seismic)" },
    },
    {
      capability: "Detects Sub-Surface Tunnelling",
      optical: { status: "no", text: "No capability" },
      radar: { status: "no", text: "No (Surface only)" },
      borehole: { status: "partial", text: "Yes (Localised only)" },
      bhoomi: { status: "yes", text: "Yes (Distributed Mesh to 15m)" },
    },
    {
      capability: "Passive & Undetectable to Adversary",
      optical: { status: "partial", text: "Partial (Thermal visible)" },
      radar: { status: "no", text: "No (Emits RF signature)" },
      borehole: { status: "yes", text: "Yes" },
      bhoomi: { status: "yes", text: "Yes (Zero RF Emission)" },
    },
    {
      capability: "Autonomous Aerial Verification (Drone)",
      optical: { status: "no", text: "No (Stationary masts)" },
      radar: { status: "no", text: "No aerial verification" },
      borehole: { status: "no", text: "No aerial capability" },
      bhoomi: { status: "yes", text: "Yes (VTOL Drone launches in <15s)" },
    },
    {
      capability: "Continuous Aerial Patrol Battery Bottleneck",
      optical: { status: "no", text: "N/A" },
      radar: { status: "no", text: "N/A" },
      borehole: { status: "no", text: "N/A" },
      bhoomi: { status: "yes", text: "Solved (Event-Triggered Docking)" },
    },
    {
      capability: "Capital & Deployment Cost per km",
      optical: { status: "no", text: "High (Cameras + masts)" },
      radar: { status: "no", text: "Very High" },
      borehole: { status: "no", text: "High (Drilling rigs)" },
      bhoomi: { status: "yes", text: "Low (~₹9.94 L/km turnkey)" },
    },
    {
      capability: "Continuous Long-Border Scalability",
      optical: { status: "partial", text: "Moderate (Blind spots)" },
      radar: { status: "no", text: "Low (Expensive gaps)" },
      borehole: { status: "no", text: "Low (Specialist crew)" },
      bhoomi: { status: "yes", text: "High (5km Modular Sector Kits)" },
    },
  ];

  return (
    <section id="comparison" className="py-24 bg-[#070b13] relative overflow-hidden border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-xs font-mono text-emerald-400 mb-4">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>TRI-DOMAIN COMPETITIVE BENCHMARKING</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              BHOOMI™ vs Conventional Border Surveillance
            </h2>
            <p className="mt-4 text-sm sm:text-base text-slate-400 leading-relaxed">
              Why optical cameras, ground radars, and continuous UAV patrols fail to protect complex border perimeters — and how BHOOMI&apos;s event-triggered tri-domain network solves each operational gap.
            </p>
          </div>
        </ScrollReveal>

        {/* Table Container with Horizontal Scroll for Mobile */}
        <ScrollReveal delay={0.2}>
          <div className="rounded-2xl border border-slate-800 bg-[#0a0f1b] overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-900/80 font-mono text-xs text-slate-300">
                    <th className="py-4 px-6 font-semibold w-1/3">Surveillance Capability</th>
                    <th className="py-4 px-4 font-semibold text-slate-400">Optical / Thermal Cameras</th>
                    <th className="py-4 px-4 font-semibold text-slate-400">Ground Radar</th>
                    <th className="py-4 px-4 font-semibold text-slate-400">Borehole Seismometer</th>
                    <th className="py-4 px-6 font-bold text-emerald-400 bg-emerald-950/30 border-l border-r border-emerald-500/30">
                      BHOOMI™ (Tri-Domain)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 text-xs">
                  {comparisonData.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-900/40 transition-colors">
                      <td className="py-4 px-6 font-medium text-white font-mono">
                        {row.capability}
                      </td>

                      {/* Optical */}
                      <td className="py-4 px-4 text-slate-400">
                        <div className="flex items-center gap-2">
                          {row.optical.status === "no" ? (
                            <X className="w-4 h-4 text-red-400 shrink-0" />
                          ) : (
                            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                          )}
                          <span>{row.optical.text}</span>
                        </div>
                      </td>

                      {/* Radar */}
                      <td className="py-4 px-4 text-slate-400">
                        <div className="flex items-center gap-2">
                          {row.radar.status === "no" ? (
                            <X className="w-4 h-4 text-red-400 shrink-0" />
                          ) : (
                            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                          )}
                          <span>{row.radar.text}</span>
                        </div>
                      </td>

                      {/* Borehole */}
                      <td className="py-4 px-4 text-slate-400">
                        <div className="flex items-center gap-2">
                          {row.borehole.status === "yes" ? (
                            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                          ) : row.borehole.status === "partial" ? (
                            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                          ) : (
                            <X className="w-4 h-4 text-red-400 shrink-0" />
                          )}
                          <span>{row.borehole.text}</span>
                        </div>
                      </td>

                      {/* BHOOMI Column */}
                      <td className="py-4 px-6 font-semibold text-emerald-300 bg-emerald-950/20 border-l border-r border-emerald-500/30">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span>{row.bhoomi.text}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Table Footer Note */}
            <div className="p-4 bg-slate-950 border-t border-slate-800 text-[11px] font-mono text-slate-400 flex items-center justify-between">
              <span>* Autonomous drones solve the 35-min UAV patrol limitation by launching only on high-confidence seismic alarms in &lt;15 seconds.</span>
              <span className="text-emerald-400 hidden sm:inline">NAX NOVA DEFENCE INNOVATIONS</span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
