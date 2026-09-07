"use client";

import React, { useState } from "react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldAlert, EyeOff, Flame, BatteryWarning, BatteryCharging, 
  RadioTower, ShieldCheck, Shovel, CheckCircle2, XCircle, 
  Sparkles, ArrowRight, Zap, Target
} from "lucide-react";
import { tacticalAudio } from "@/lib/tacticalAudio";

interface DuelFaceOff {
  id: string;
  category: string;
  title: string;
  scenario: string;
  conventional: {
    title: string;
    verdict: "FAILED" | "INADEQUATE";
    icon: React.ReactNode;
    drawback: string;
    visualStatus: string;
  };
  bhoomi: {
    title: string;
    verdict: "SOLVED" | "SUPERIOR";
    icon: React.ReactNode;
    solution: string;
    visualStatus: string;
  };
}

const DUELS: DuelFaceOff[] = [
  {
    id: "fog",
    category: "WEATHER RESILIENCE",
    title: "Dense Fog, Blizzard & Sandstorms",
    scenario: "Adversaries exploit heavy Himalayan winter fog and dust storms to cross unobserved.",
    conventional: {
      title: "Optical Border Cameras & Masts",
      verdict: "FAILED",
      icon: <EyeOff className="w-6 h-6 text-red-400" />,
      drawback: "Atmospheric whiteout blinds optical lenses completely (<12m visibility).",
      visualStatus: "0% VISIBILITY IN HEAVY FOG"
    },
    bhoomi: {
      title: "BHOOMI Tri-Domain Fusion",
      verdict: "SOLVED",
      icon: <Flame className="w-6 h-6 text-emerald-400" />,
      solution: "Buried seismic mesh hears footsteps underground; cued FLIR thermal core pierces fog to reveal 37°C body heat.",
      visualStatus: "100% ALL-WEATHER DETECTION"
    }
  },
  {
    id: "tunnel",
    category: "UNDERGROUND DEFENSE",
    title: "Covert Tunnel Excavation",
    scenario: "Cross-border tunnels excavated 5 to 15 meters below ground bypass all physical fences.",
    conventional: {
      title: "Ground Radars & Concertina Fences",
      verdict: "FAILED",
      icon: <XCircle className="w-6 h-6 text-red-400" />,
      drawback: "Surface radars have zero underground penetration. Tunnels go undetected until surface breach.",
      visualStatus: "0% SUB-SURFACE AWARENESS"
    },
    bhoomi: {
      title: "Distributed Geophone Mesh",
      verdict: "SOLVED",
      icon: <Shovel className="w-6 h-6 text-emerald-400" />,
      solution: "100 buried 4.5Hz geophones capture micro-vibrations from digging and drill motors up to 15m deep.",
      visualStatus: "DETECTS DIGGING TO 15M DEPTH"
    }
  },
  {
    id: "drone-battery",
    category: "AERIAL READINESS",
    title: "Continuous UAV Patrol Bottleneck",
    scenario: "Border patrols attempting 24/7 aerial surveillance face severe drone battery exhaustion.",
    conventional: {
      title: "Manual Continuous Drone Patrols",
      verdict: "INADEQUATE",
      icon: <BatteryWarning className="w-6 h-6 text-red-400" />,
      drawback: "Drones drain batteries within 35 minutes; loud motor whine alerts enemy intruders of patrol location.",
      visualStatus: "35-MIN BATTERY EXHAUSTION"
    },
    bhoomi: {
      title: "Event-Cued Drone Dock Network",
      verdict: "SOLVED",
      icon: <BatteryCharging className="w-6 h-6 text-emerald-400" />,
      solution: "Drones remain charged in weatherproof smart docks 24/7, launching autonomously in <15s ONLY upon confirmed alarms.",
      visualStatus: "24/7 DOCKED READINESS (<15s LAUNCH)"
    }
  },
  {
    id: "stealth",
    category: "BATTLEFIELD SIGINT",
    title: "Electronic Warfare & Radar Exposure",
    scenario: "Adversary signals intelligence (SIGINT) sweeps for active RF transmissions to target defenses.",
    conventional: {
      title: "Active Ground Radars",
      verdict: "FAILED",
      icon: <RadioTower className="w-6 h-6 text-red-400" />,
      drawback: "Emits continuous radio frequency beams, giving away border post positions to anti-radiation missiles.",
      visualStatus: "VULNERABLE TO ENEMY SIGINT"
    },
    bhoomi: {
      title: "100% Passive Ground Mesh",
      verdict: "SUPERIOR",
      icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
      solution: "Ground nodes emit zero RF radiation during silent monitoring, remaining invisible on enemy EW monitors.",
      visualStatus: "ZERO RF DETECTABLE SIGNATURE"
    }
  }
];

export function ComparativeMatrixSection() {
  const [activeDuelId, setActiveDuelId] = useState<string>("fog");
  const activeDuel = DUELS.find((d) => d.id === activeDuelId) || DUELS[0];

  const handleSelectDuel = (id: string) => {
    setActiveDuelId(id);
    tacticalAudio.playBeep(640, 0.04, "sine", 0.03);
  };

  return (
    <section id="comparison" className="py-24 bg-[#070b13] relative overflow-hidden border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-xs font-mono text-emerald-400 mb-4">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>BATTLEFIELD FACE-OFF // TACTICAL COMPARISON</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Why Conventional Systems Fail
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed">
              Explore how BHOOMI&apos;s event-triggered tri-domain network solves the fatal weaknesses of cameras, surface radars, and continuous drone patrols.
            </p>

            {/* Duel Scenario Selector Pills */}
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {DUELS.map((duel) => (
                <button
                  key={duel.id}
                  onClick={() => handleSelectDuel(duel.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all border ${
                    activeDuelId === duel.id
                      ? "bg-emerald-500 text-slate-950 border-emerald-400 shadow-lg shadow-emerald-500/20 scale-105"
                      : "bg-slate-900/80 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700"
                  }`}
                >
                  {duel.category}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Visual Duel Arena Card */}
        <ScrollReveal delay={0.2}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDuel.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-[#0a0f1b] via-[#080d17] to-[#050810] border border-slate-800 shadow-2xl"
            >
              {/* Scenario Context Header */}
              <div className="text-center max-w-2xl mx-auto mb-10 pb-6 border-b border-slate-800/80">
                <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-slate-800 text-amber-300 font-bold uppercase tracking-wider">
                  TACTICAL SCENARIO
                </span>
                <h3 className="text-2xl font-black text-white mt-2">
                  {activeDuel.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1.5 leading-relaxed">
                  {activeDuel.scenario}
                </p>
              </div>

              {/* Side-By-Side Visual Comparison Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                {/* Conventional Method (Failed / Inadequate) */}
                <div className="p-6 sm:p-8 rounded-2xl bg-red-950/10 border-2 border-red-500/30 flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute top-0 right-0 px-3 py-1 rounded-bl-xl bg-red-500/20 text-red-400 font-mono text-[10px] font-bold">
                    CONVENTIONAL FLAW
                  </div>

                  <div>
                    <div className="w-12 h-12 rounded-xl bg-red-950/40 border border-red-500/30 flex items-center justify-center mb-4">
                      {activeDuel.conventional.icon}
                    </div>

                    <h4 className="text-lg font-bold text-white mb-2">
                      {activeDuel.conventional.title}
                    </h4>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                      {activeDuel.conventional.drawback}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-black/60 border border-red-500/30 text-xs font-mono text-red-400 font-bold flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                    <span>{activeDuel.conventional.visualStatus}</span>
                  </div>
                </div>

                {/* BHOOMI Solution (Solved / Superior) */}
                <div className="p-6 sm:p-8 rounded-2xl bg-emerald-950/15 border-2 border-emerald-500/60 shadow-xl shadow-emerald-950/30 flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute top-0 right-0 px-3 py-1 rounded-bl-xl bg-emerald-500 text-slate-950 font-mono text-[10px] font-bold">
                    BHOOMI ADVANTAGE
                  </div>

                  <div>
                    <div className="w-12 h-12 rounded-xl bg-emerald-950/60 border border-emerald-500/50 flex items-center justify-center mb-4 shadow-lg shadow-emerald-500/20">
                      {activeDuel.bhoomi.icon}
                    </div>

                    <h4 className="text-lg font-bold text-white mb-2">
                      {activeDuel.bhoomi.title}
                    </h4>

                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed mb-6">
                      {activeDuel.bhoomi.solution}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/60 text-xs font-mono text-emerald-300 font-bold flex items-center gap-2 shadow">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{activeDuel.bhoomi.visualStatus}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </ScrollReveal>
      </div>
    </section>
  );
}
