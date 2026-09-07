"use client";

import React, { useState, useEffect, useRef } from "react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Radio, Server, Plane, Monitor, Play, CheckCircle2, 
  Zap, ArrowRight, Activity, Shield, Sparkles, Navigation 
} from "lucide-react";
import { tacticalAudio } from "@/lib/tacticalAudio";

interface ArchitectureTier {
  id: number;
  tierNum: string;
  name: string;
  category: string;
  icon: React.ReactNode;
  accentColor: string;
  borderColor: string;
  bgGlow: string;
  visualGraphic: string; // descriptive role
  latency: string;
  tacticalAction: string;
  visualHighlights: { label: string; value: string }[];
}

const TIERS: ArchitectureTier[] = [
  {
    id: 0,
    tierNum: "TIER 01",
    name: "Buried Sensor Mesh",
    category: "SUBTERRANEAN SENSING",
    icon: <Radio className="w-5 h-5 text-emerald-400" />,
    accentColor: "text-emerald-400",
    borderColor: "border-emerald-500/50",
    bgGlow: "bg-emerald-950/40",
    visualGraphic: "100 buried IP67 nodes pick up 4.5Hz ground micro-vibrations & acoustic phononics.",
    latency: "< 18ms",
    tacticalAction: "Wakes on seismic shockwave, runs 1D-CNN, filters wildlife",
    visualHighlights: [
      { label: "SENSOR PAIR", value: "Geophone + MEMS Array" },
      { label: "SIGNATURE", value: "100% Zero RF Passive" },
      { label: "AUTONOMY", value: "Solar + 10Ah LiFePO4" },
    ]
  },
  {
    id: 1,
    tierNum: "TIER 02",
    name: "Sector AI Gateway",
    category: "EDGE MESH & TDOA",
    icon: <Server className="w-5 h-5 text-cyan-400" />,
    accentColor: "text-cyan-400",
    borderColor: "border-cyan-500/50",
    bgGlow: "bg-cyan-950/40",
    visualGraphic: "Aggregates multi-node arrival timestamps and triangulates threat coordinates via TDOA.",
    latency: "< 45ms",
    tacticalAction: "Solves hyperbolic equations, pinpoints target with <9.5m accuracy",
    visualHighlights: [
      { label: "TDOA ENGINE", value: "Sub-10m Hyperbolic Solver" },
      { label: "MESH NETWORK", value: "868 MHz AES-256 GCM" },
      { label: "DECISION FUSION", value: "Bayesian Probability P > 0.75" },
    ]
  },
  {
    id: 2,
    tierNum: "TIER 03",
    name: "Autonomous Drone Docks",
    category: "AERIAL RAPID INTERCEPT",
    icon: <Plane className="w-5 h-5 text-amber-400" />,
    accentColor: "text-amber-400",
    borderColor: "border-amber-500/50",
    bgGlow: "bg-amber-950/40",
    visualGraphic: "Weatherproof dock slides open hatch in <2.8s, launching self-controlled VTOL drone.",
    latency: "< 15s",
    tacticalAction: "VTOL drone flies waypoint route to TDOA coordinates with FLIR thermal lock",
    visualHighlights: [
      { label: "LAUNCH SPEED", value: "< 15s Ground-to-Airborne" },
      { label: "OPTICAL PAYLOAD", value: "FLIR Boson 640 Thermal" },
      { label: "RECOVERY", value: "Qi Inductive Wireless Dock" },
    ]
  },
  {
    id: 3,
    tierNum: "TIER 04",
    name: "C2 Command Portal",
    category: "MILITARY TACTICAL HQ",
    icon: <Monitor className="w-5 h-5 text-purple-400" />,
    accentColor: "text-purple-400",
    borderColor: "border-purple-500/50",
    bgGlow: "bg-purple-950/40",
    visualGraphic: "High-level visual operational view with live thermal video feed and QRF dispatch vectors.",
    latency: "< 2s",
    tacticalAction: "Live situational awareness, automated alerts, and immutable event ledger",
    visualHighlights: [
      { label: "TACTICAL MAP", value: "Live GIS Defense Grid" },
      { label: "VIDEO FEED", value: "Low-Latency Thermal Stream" },
      { label: "QRF DISPATCH", value: "Automated Intercept Vector" },
    ]
  },
];

export function SystemArchitectureSection() {
  const [activeTier, setActiveTier] = useState<number>(0);
  const [isSimulatingPulse, setIsSimulatingPulse] = useState<boolean>(false);
  const [pulseStep, setPulseStep] = useState<number>(-1);

  const simulateSignalPulse = () => {
    if (isSimulatingPulse) return;
    setIsSimulatingPulse(true);

    // Step 0: Tier 1 Seismic Trigger
    setPulseStep(0);
    setActiveTier(0);
    tacticalAudio.playBeep(280, 0.08, "sawtooth", 0.05);

    // Step 1: Tier 2 Gateway TDOA
    setTimeout(() => {
      setPulseStep(1);
      setActiveTier(1);
      tacticalAudio.playTdoaSolve();
    }, 700);

    // Step 2: Tier 3 Drone Dock Launch
    setTimeout(() => {
      setPulseStep(2);
      setActiveTier(2);
      tacticalAudio.playDockServo();
      tacticalAudio.playDroneLaunch();
    }, 1500);

    // Step 3: Tier 4 C2 Target Lock
    setTimeout(() => {
      setPulseStep(3);
      setActiveTier(3);
      tacticalAudio.playTargetLock();
    }, 2400);

    // End simulation
    setTimeout(() => {
      setIsSimulatingPulse(false);
      setPulseStep(-1);
    }, 3200);
  };

  return (
    <section className="py-24 bg-[#06080e] relative overflow-hidden border-t border-emerald-950/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-xs font-mono text-cyan-400 mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>INTERACTIVE SIGNAL FLOW PIPELINE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Integrated Tri-Domain Architecture
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed">
              Watch how a ground shockwave travels from buried geophone sensors through edge AI localization, autonomous drone launch, and into the Command Dashboard.
            </p>

            {/* Interactive Pulse Simulation Trigger Button */}
            <div className="mt-8 flex justify-center">
              <button
                onClick={simulateSignalPulse}
                disabled={isSimulatingPulse}
                className={`px-6 py-3 rounded-2xl font-mono text-xs font-bold flex items-center gap-2.5 transition-all shadow-xl ${
                  isSimulatingPulse
                    ? "bg-amber-500 text-black shadow-amber-500/30 animate-pulse cursor-wait"
                    : "bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20 hover:scale-105"
                }`}
              >
                <Zap className="w-4 h-4 fill-current" />
                <span>{isSimulatingPulse ? `TRANSMITTING THROUGH TIER 0${pulseStep + 1}...` : "SIMULATE LIVE INTRUSION SIGNAL PULSE"}</span>
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* 4 Interactive Pipeline Stages */}
        <ScrollReveal delay={0.15}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative mb-8">
            {TIERS.map((tier, idx) => {
              const isSelected = activeTier === tier.id;
              const isPulsing = pulseStep === tier.id;

              return (
                <div
                  key={tier.id}
                  onClick={() => {
                    setActiveTier(tier.id);
                    tacticalAudio.playBeep(520 + idx * 100, 0.04, "sine", 0.03);
                  }}
                  className={`p-5 rounded-2xl border-2 transition-all cursor-pointer relative overflow-hidden group ${
                    isPulsing
                      ? "bg-amber-950/40 border-amber-400 shadow-2xl shadow-amber-500/30 scale-105"
                      : isSelected
                      ? "bg-slate-900/90 border-emerald-500/80 shadow-xl shadow-emerald-950/40"
                      : "bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-900/70"
                  }`}
                >
                  {/* Active Pulse Glow Bar */}
                  {isPulsing && (
                    <div className="absolute top-0 left-0 right-0 h-1 bg-amber-400 animate-pulse" />
                  )}

                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-bold">
                      {tier.tierNum}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold">
                      {tier.latency}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 rounded-xl bg-slate-800/80 border border-slate-700">
                      {tier.icon}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white leading-tight">
                        {tier.name}
                      </h4>
                      <span className="text-[9px] font-mono text-slate-400">
                        {tier.category}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed mt-2 line-clamp-2">
                    {tier.visualGraphic}
                  </p>

                  {/* Visual Indicator Pill */}
                  <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[10px] font-mono">
                    <span className="text-slate-400">STATUS:</span>
                    <span className={isSelected ? "text-emerald-400 font-bold" : "text-slate-500"}>
                      {isPulsing ? "SIGNAL PASSING" : isSelected ? "INSPECTING" : "ONLINE"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Selected Tier Deep Visual Inspector Card */}
        <ScrollReveal delay={0.25}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTier}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#080e18] to-[#050910] border border-slate-800 shadow-2xl relative overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left Side: Visual Overview */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-xs font-mono text-emerald-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{TIERS[activeTier].tierNum} // {TIERS[activeTier].category}</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                    {TIERS[activeTier].name}
                  </h3>

                  <p className="text-sm text-slate-300 leading-relaxed">
                    {TIERS[activeTier].visualGraphic}
                  </p>

                  <div className="p-3 rounded-xl bg-black/40 border border-slate-800 text-xs font-mono text-amber-300 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>TACTICAL ACTION: {TIERS[activeTier].tacticalAction}</span>
                  </div>
                </div>

                {/* Right Side: Visual Metric Cards (Clean, Graphical) */}
                <div className="lg:col-span-5 grid grid-cols-1 gap-3">
                  {TIERS[activeTier].visualHighlights.map((item, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between"
                    >
                      <span className="text-xs font-mono text-slate-400">{item.label}</span>
                      <span className="text-xs font-mono font-bold text-white bg-slate-800/80 px-2.5 py-1 rounded border border-slate-700">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </ScrollReveal>
      </div>
    </section>
  );
}
