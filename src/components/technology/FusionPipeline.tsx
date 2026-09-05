"use client";

import React from "react";
import { motion } from "framer-motion";
import { Cpu, Activity, Filter, GitMerge, BellRing, ArrowRight } from "lucide-react";

export function FusionPipeline() {
  const steps = [
    {
      num: "01",
      title: "Dual Signal Acquisition",
      icon: Activity,
      color: "text-emerald-400",
      border: "border-emerald-500/30",
      desc: "Simultaneous 250 Hz sampling of ground micro-vibrations via geophone and airborne sound pressures via MEMS acoustic sensor.",
    },
    {
      num: "02",
      title: "Wavelet Denoising",
      icon: Filter,
      color: "text-cyan-400",
      border: "border-cyan-500/30",
      desc: "Discrete Wavelet Transform (DWT) suppresses ambient environmental noise (monsoon rain, high-altitude wind shear, riverine turbulence).",
    },
    {
      num: "03",
      title: "Spectral Feature Extraction",
      icon: Cpu,
      color: "text-purple-400",
      border: "border-purple-500/30",
      desc: "Extracts spectral centroid, energy kurtosis, P-wave periodicity, and acoustic harmonic ratio to form a compact 32-dimension feature vector.",
    },
    {
      num: "04",
      title: "Cross-Verification Matrix",
      icon: GitMerge,
      color: "text-amber-400",
      border: "border-amber-500/30",
      desc: "Quantized neural network correlates seismic and acoustic features in real time. Discards uncorrelated noise; confirms dual-domain signatures.",
    },
    {
      num: "05",
      title: "Encrypted Dispatch",
      icon: BellRing,
      color: "text-red-400",
      border: "border-red-500/30",
      desc: "If confidence exceeds threshold (&gt;90%), node wakes LoRa transceiver, dispatches 32-byte AES-256 encrypted alert to mesh relay, and returns to silent sleep.",
    },
  ];

  return (
    <div className="w-full rounded-2xl border border-slate-800 bg-[#090d16] p-6 sm:p-8 shadow-2xl">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block mb-1">
          ON-NODE SIGNAL PROCESSING PIPELINE
        </span>
        <h3 className="text-2xl font-bold text-white tracking-tight">
          How BHOOMI Eliminates False Alarms
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 mt-2">
          From ground wave excitation to classified battlefield telemetry in under 15 milliseconds
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div
              key={step.num}
              className={`p-4 rounded-xl bg-slate-950 border ${step.border} flex flex-col justify-between hover:bg-slate-900/60 transition-colors relative group`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono text-slate-500 px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                    STAGE {step.num}
                  </span>
                  <Icon className={`w-4 h-4 ${step.color}`} />
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-white mb-2 font-mono">
                  {step.title}
                </h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              {idx < 4 && (
                <div className="hidden md:block absolute -right-2.5 top-1/2 -translate-y-1/2 z-10">
                  <ArrowRight className="w-3.5 h-3.5 text-slate-600" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
