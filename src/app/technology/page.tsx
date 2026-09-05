import React from "react";
import { SensorNodeExploded } from "@/components/technology/SensorNodeExploded";
import { FusionPipeline } from "@/components/technology/FusionPipeline";
import { TechnicalSpecs } from "@/components/technology/TechnicalSpecs";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Cpu, ShieldCheck, Zap, Radio, Layers } from "lucide-react";

export const metadata = {
  title: "Technology & Architecture | BHOOMI Defence Deeptech",
  description: "Deep dive into BHOOMI sensor node engineering, edge-AI seismic-acoustic fusion algorithms, and encrypted LoRa mesh architecture.",
};

export default function TechnologyPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 bg-[#06080e] bg-tactical-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Technology Page Header */}
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-xs font-mono text-emerald-400 mb-4">
              <Cpu className="w-3.5 h-3.5" />
              <span>DEFENCE DEEPTECH SYSTEM ARCHITECTURE</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
              Engineering the Unseen Defense Layer
            </h1>
            <p className="mt-4 text-base text-slate-300 leading-relaxed">
              Combining micro-seismology, acoustic phononics, and ultra-low-power edge artificial intelligence to deliver persistent underground and surface surveillance without detectable RF emissions.
            </p>
          </div>
        </ScrollReveal>

        {/* Section 1: Exploded Node Hardware */}
        <ScrollReveal delay={0.1}>
          <SensorNodeExploded />
        </ScrollReveal>

        {/* Section 2: Fusion Pipeline */}
        <ScrollReveal delay={0.2}>
          <div id="fusion">
            <FusionPipeline />
          </div>
        </ScrollReveal>

        {/* Section 3: Technical Specifications */}
        <ScrollReveal delay={0.3}>
          <div id="specs">
            <TechnicalSpecs />
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
