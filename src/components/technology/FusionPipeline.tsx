"use client";

import React from "react";
import { motion } from "framer-motion";
import { Cpu, Activity, Filter, GitMerge, BellRing, ArrowRight, Plane, Crosshair } from "lucide-react";

export function FusionPipeline() {
  const steps = [
    {
      num: "01",
      title: "Dual Signal Acquisition",
      icon: Activity,
      color: "text-emerald-400",
      border: "border-emerald-500/30",
      desc: "Simultaneous 500 Hz sampling of ground micro-vibrations via 4.5Hz geophone and airborne sound pressure via Knowles MEMS acoustic sensor.",
    },
    {
      num: "02",
      title: "Wavelet Denoising",
      icon: Filter,
      color: "text-cyan-400",
      border: "border-cyan-500/30",
      desc: "Butterworth (4.5-150Hz) and Discrete Wavelet Transform (DWT) suppress rain, wind shear, river turbulence, and background ambient noise.",
    },
    {
      num: "03",
      title: "Spectral Feature Extraction",
      icon: Cpu,
      color: "text-purple-400",
      border: "border-purple-500/30",
      desc: "Computes 64x128 STFT spectrograms, extracting P-wave periodicity, kurtosis, and spectral centroids into a 32-dimension vector.",
    },
    {
      num: "04",
      title: "Edge INT8 1D-CNN",
      icon: GitMerge,
      color: "text-amber-400",
      border: "border-amber-500/30",
      desc: "On-node 18ms inference on STM32H7 Cortex-M7 classifies digging, footsteps, vehicles, or noise with 93.1% weighted accuracy.",
    },
    {
      num: "05",
      title: "Gateway TDOA & Bayesian Fusion",
      icon: BellRing,
      color: "text-pink-400",
      border: "border-pink-500/30",
      desc: "Sector Gateway solves Levenberg-Marquardt TDOA (<10m error) and calculates multi-modal Bayesian Threat Probability P(Threat|S,A,V).",
    },
    {
      num: "06",
      title: "Autonomous Drone Intercept",
      icon: Plane,
      color: "text-emerald-300",
      border: "border-emerald-400/50",
      desc: "If confidence > 0.75, dock lid retracts in <3s, VTOL drone launches in <15s to TDOA coordinates, streaming live FLIR Boson 640 thermal footage.",
    },
  ];

  return (
    <div className="w-full rounded-2xl border border-slate-800 bg-[#090d16] p-6 sm:p-8 shadow-2xl space-y-6">
      <div className="text-center max-w-3xl mx-auto mb-8">
        <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block mb-1">
          TRI-DOMAIN MULTI-STAGE FUSION PIPELINE
        </span>
        <h3 className="text-2xl font-bold text-white tracking-tight">
          How BHOOMI Eliminates False Alarms & Cues Drone Response
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 mt-2">
          From micro-seismic excitation and edge 1D-CNN inference to automated VTOL drone thermal lock in under 15 seconds
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3.5">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div
              key={step.num}
              className={`p-4 rounded-xl bg-slate-950 border ${step.border} flex flex-col justify-between hover:bg-slate-900/60 transition-all relative group`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono text-slate-500 px-2 py-0.5 rounded bg-slate-900 border border-slate-800 font-bold">
                    STAGE {step.num}
                  </span>
                  <Icon className={`w-4 h-4 ${step.color}`} />
                </div>
                <h4 className="text-xs font-bold text-white mb-2 font-mono">
                  {step.title}
                </h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              {idx < 5 && (
                <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 z-10">
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
