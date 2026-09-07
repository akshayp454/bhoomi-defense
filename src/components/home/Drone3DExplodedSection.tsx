"use client";

import React from "react";
import Link from "next/link";
import { InteractiveDrone3DViewer } from "@/components/technology/InteractiveDrone3DViewer";
import { Shield, Sparkles, ArrowRight, Zap, Target, Crosshair } from "lucide-react";

export function Drone3DExplodedSection() {
  return (
    <section className="py-20 relative bg-[#04070a] border-t border-emerald-950/40 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-950/40 text-emerald-400 text-xs font-mono mb-4 tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>AEROSPACE HARDWARE ENGINEERING // TIER 3 SUBSYSTEMS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Interactive 3D Exploded{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-teal-300">
              Drone &amp; Dock Architecture
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed">
            Rotate 360°, separate subsystem layers vertically in 3D space, and inspect military-grade specifications from the FLIR Boson 640 LWIR thermal core down to the marine-grade smart docking station.
          </p>
        </div>

        {/* 3D Exploded Viewer Instance */}
        <InteractiveDrone3DViewer />

        {/* Highlight Architecture Cards Below */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <div className="p-5 rounded-xl bg-slate-900/40 border border-emerald-950/80 hover:border-emerald-500/40 transition-all">
            <div className="w-9 h-9 rounded-lg bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center mb-3">
              <Zap className="w-5 h-5 text-emerald-400" />
            </div>
            <h4 className="text-sm font-bold text-white font-mono mb-1">
              &lt;15s Autonomous Launch
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Motorized linear actuator hatch slides open in &lt;2.8s upon seismic TDOA confirmation, initiating automated VTOL takeoff without operator delay.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-900/40 border border-emerald-950/80 hover:border-emerald-500/40 transition-all">
            <div className="w-9 h-9 rounded-lg bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center mb-3">
              <Crosshair className="w-5 h-5 text-cyan-400" />
            </div>
            <h4 className="text-sm font-bold text-white font-mono mb-1">
              FLIR Boson 640 Thermal Core
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Uncooled 12µm VOx microbolometer (&lt;40mK NETD) penetrates dense Himalayan fog, zero-visibility blizzards, and camouflage netting up to 1,200m.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-900/40 border border-emerald-950/80 hover:border-emerald-500/40 transition-all">
            <div className="w-9 h-9 rounded-lg bg-amber-950/60 border border-amber-500/30 flex items-center justify-center mb-3">
              <Target className="w-5 h-5 text-amber-400" />
            </div>
            <h4 className="text-sm font-bold text-white font-mono mb-1">
              40 TOPS Edge AI &amp; RTK GNSS
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              NVIDIA Jetson Orin Nano executes real-time YOLOv8 threat detection onboard while dual UBlox F9P RTK achieves &lt;15mm autonomous docking precision.
            </p>
          </div>
        </div>

        {/* Link to Deep PDD & Technology Documentation */}
        <div className="mt-8 text-center">
          <Link
            href="/technology"
            className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 hover:text-emerald-300 font-bold tracking-wider hover:underline"
          >
            <span>EXPLORE FULL MULTI-TIER SYSTEM SPECIFICATIONS</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
