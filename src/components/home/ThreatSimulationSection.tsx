"use client";

import React, { useState } from "react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { ThreatClassifierSim } from "@/components/animations/ThreatClassifierSim";
import { BorderMissionStorySimulator } from "@/components/animations/BorderMissionStorySimulator";
import { ClickToInfiltrateSandbox } from "@/components/animations/ClickToInfiltrateSandbox";
import { OpticalVsThermalSlider } from "@/components/animations/OpticalVsThermalSlider";
import { ShieldCheck, Cpu, Layers, Radio, Plane, PlayCircle, Activity, MapPin, Flame } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function ThreatSimulationSection() {
  const [simulatorMode, setSimulatorMode] = useState<"story" | "sandbox" | "thermal" | "classifier">("sandbox");

  return (
    <section id="simulation" className="py-24 bg-[#070b13] relative overflow-hidden border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-xs font-mono text-emerald-400 mb-4">
              <Cpu className="w-3.5 h-3.5" />
              <span>INTERACTIVE BORDER GROUND WALKTHROUGH &amp; SIMULATION</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Real-Time Border Mission: How BHOOMI Works on Ground
            </h2>
            <p className="mt-4 text-sm sm:text-base text-slate-400 leading-relaxed">
              Experience the end-to-end operational sequence from subterranean pickaxe impact through edge AI inference, TDOA triangulation, dock lid actuation, and autonomous VTOL drone thermal lock.
            </p>

            {/* Interactive Mode Toggle Bar (4 Tactical Modes) */}
            <div className="mt-8 inline-flex flex-wrap justify-center items-center p-1.5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl gap-1">
              <button
                onClick={() => setSimulatorMode("sandbox")}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-bold tracking-wider transition-all ${
                  simulatorMode === "sandbox"
                    ? "bg-emerald-500 text-slate-950 shadow-[0_0_20px_rgba(16,185,129,0.35)]"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <MapPin className="w-4 h-4" />
                <span>5KM MAP SANDBOX</span>
                <span className="ml-1 px-1.5 py-0.5 rounded bg-black/30 text-[9px] uppercase font-mono">
                  CLICK-TO-INFILTRATE
                </span>
              </button>

              <button
                onClick={() => setSimulatorMode("thermal")}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-bold tracking-wider transition-all ${
                  simulatorMode === "thermal"
                    ? "bg-amber-500 text-slate-950 shadow-[0_0_20px_rgba(245,158,11,0.35)]"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Flame className="w-4 h-4" />
                <span>FOG VS. FLIR THERMAL</span>
                <span className="ml-1 px-1.5 py-0.5 rounded bg-black/30 text-[9px] uppercase font-mono">
                  SLIDER
                </span>
              </button>

              <button
                onClick={() => setSimulatorMode("story")}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-bold tracking-wider transition-all ${
                  simulatorMode === "story"
                    ? "bg-cyan-500 text-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.35)]"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <PlayCircle className="w-4 h-4" />
                <span>MISSION STORY</span>
                <span className="ml-1 px-1.5 py-0.5 rounded bg-black/30 text-[9px] uppercase font-mono">
                  TIMELINE
                </span>
              </button>

              <button
                onClick={() => setSimulatorMode("classifier")}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-bold tracking-wider transition-all ${
                  simulatorMode === "classifier"
                    ? "bg-purple-500 text-slate-950 shadow-[0_0_20px_rgba(168,85,247,0.35)]"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Activity className="w-4 h-4" />
                <span>EDGE-AI ENGINE</span>
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Display Active Simulator View */}
        <ScrollReveal delay={0.2}>
          <AnimatePresence mode="wait">
            {simulatorMode === "sandbox" && (
              <motion.div
                key="sandbox-mode"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <ClickToInfiltrateSandbox />
              </motion.div>
            )}

            {simulatorMode === "thermal" && (
              <motion.div
                key="thermal-mode"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <OpticalVsThermalSlider />
              </motion.div>
            )}

            {simulatorMode === "story" && (
              <motion.div
                key="story-mode"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <BorderMissionStorySimulator />
              </motion.div>
            )}

            {simulatorMode === "classifier" && (
              <motion.div
                key="classifier-mode"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <ThreatClassifierSim />
              </motion.div>
            )}
          </AnimatePresence>
        </ScrollReveal>

        {/* 4 Technical Value Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-4">
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
