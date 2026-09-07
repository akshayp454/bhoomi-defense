"use client";

import React from "react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { ThreatClassifierSim } from "@/components/animations/ThreatClassifierSim";
import { ShieldCheck, Cpu, Layers, Radio, Plane } from "lucide-react";

export function ThreatSimulationSection() {
  return (
    <section id="simulation" className="py-24 bg-[#070b13] relative overflow-hidden border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-xs font-mono text-emerald-400 mb-4">
              <Cpu className="w-3.5 h-3.5" />
              <span>ON-EDGE NEURAL FUSION & DRONE ACTIVATION</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Real-Time Cross-Verification & Cued Aerial Intercept
            </h2>
            <p className="mt-4 text-sm sm:text-base text-slate-400 leading-relaxed">
              Optical cameras are blinded by fog; ground radar cannot see underground; and isolated geophones false-alarm on wildlife. <strong className="text-slate-200">NaX Nova&apos;s BHOOMI™ cross-verifies seismic micro-vibrations against acoustic harmonics locally</strong> — and once verified, <strong className="text-emerald-400">autonomously dispatches a self-controlled VTOL drone in &lt;15 seconds</strong> to the exact location for live thermal target acquisition.
            </p>
          </div>
        </ScrollReveal>

        {/* Interactive Simulator */}
        <ScrollReveal delay={0.2}>
          <ThreatClassifierSim />
        </ScrollReveal>

        {/* 4 Technical Value Pillars */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <ScrollReveal delay={0.1}>
            <div className="p-5 rounded-2xl bg-[#0b101d] border border-slate-800/80 hover:border-emerald-500/30 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-emerald-950/50 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white mb-2 font-mono">
                93.1% Classification
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Trained on 48,000 seismic samples across rocky LoC sectors and riverine stretches to reliably distinguish tunneling, footfalls, and vehicles.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="p-5 rounded-2xl bg-[#0b101d] border border-slate-800/80 hover:border-cyan-500/30 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-cyan-950/50 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white mb-2 font-mono">
                &lt;5% False Alarms
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Rejects wind shear, monsoon rain, and quadruped animal movement through dual-channel phase-coherence checks right at the edge Cortex-M7.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="p-5 rounded-2xl bg-[#0b101d] border border-slate-800/80 hover:border-amber-500/30 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-amber-950/50 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4">
                <Plane className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white mb-2 font-mono">
                &lt;15s Cued Drone Launch
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Self-controlled VTOL drone launches from weatherproof dock upon high-confidence trigger, navigating autonomously to TDOA coordinates.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <div className="p-5 rounded-2xl bg-[#0b101d] border border-slate-800/80 hover:border-purple-500/30 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-purple-950/50 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-4">
                <Radio className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white mb-2 font-mono">
                Zero RF Battlefield SIGINT
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Ground nodes emit zero RF during quiet monitoring. Drones remain silent in docks, eliminating continuous acoustic noise of regular UAV patrols.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
