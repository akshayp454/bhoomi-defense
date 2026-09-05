"use client";

import React from "react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { ThreatClassifierSim } from "@/components/animations/ThreatClassifierSim";
import { ShieldCheck, Cpu, Layers, Radio } from "lucide-react";

export function ThreatSimulationSection() {
  return (
    <section id="simulation" className="py-24 bg-[#070b13] relative overflow-hidden border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-xs font-mono text-emerald-400 mb-4">
              <Cpu className="w-3.5 h-3.5" />
              <span>ON-EDGE NEURAL SENSOR FUSION ENGINE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Real-Time Cross-Verification in Action
            </h2>
            <p className="mt-4 text-sm sm:text-base text-slate-400 leading-relaxed">
              Each sensing modality alone is prone to false positives — optical cameras blinded by fog, radar blind to underground excavation, and geophones triggered by wandering wildlife. <strong className="text-slate-200">BHOOMI cross-verifies seismic micro-vibrations against acoustic harmonics on-node</strong> before triggering alarms.
            </p>
          </div>
        </ScrollReveal>

        {/* Interactive Simulator */}
        <ScrollReveal delay={0.2}>
          <ThreatClassifierSim />
        </ScrollReveal>

        {/* 3 Technical Value Pillars */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <ScrollReveal delay={0.1}>
            <div className="p-6 rounded-2xl bg-[#0b101d] border border-slate-800/80 hover:border-emerald-500/30 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-emerald-950/50 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2 font-mono">
                &gt;90% Detection Rate
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Trained on diverse geological strata across rocky LoC sectors and sandy/alluvial riverine stretches to achieve laboratory and field-tested target detection.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="p-6 rounded-2xl bg-[#0b101d] border border-slate-800/80 hover:border-cyan-500/30 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-cyan-950/50 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2 font-mono">
                &lt;5% False Alarm Ratio
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Rejects wind gusts, heavy rainfall, high-altitude thunder, and wildlife movement through dual-channel phase-coherence checks right at the edge MCU.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="p-6 rounded-2xl bg-[#0b101d] border border-slate-800/80 hover:border-amber-500/30 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-amber-950/50 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4">
                <Radio className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2 font-mono">
                Zero RF Battlefield Signature
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Unlike active ground radar or LIDAR systems, BHOOMI nodes emit zero radiofrequency signals during steady-state sensing, rendering them invisible to enemy SIGINT.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
