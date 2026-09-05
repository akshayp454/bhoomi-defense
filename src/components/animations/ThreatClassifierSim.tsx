"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SeismicWaveform } from "./SeismicWaveform";
import { ThreatScenario, ScenarioDetail } from "@/types";
import { Activity, ShieldAlert, Cpu, CheckCircle2, AlertTriangle, Radio } from "lucide-react";

const SCENARIOS: Record<ThreatScenario, ScenarioDetail> = {
  digging: {
    id: "digging",
    title: "Sub-Surface Tunnel Digging",
    targetType: "Clandestine Excavation / Sabotage",
    seismicProfile: {
      frequency: "20 - 30 Hz (Periodic P/S wave spikes)",
      amplitude: "HIGH",
      description: "Repetitive mechanical impact shocks transmitted through bedrock/subsoil.",
    },
    acousticProfile: {
      frequency: "100 - 350 Hz (Muffled subterranean audio)",
      amplitude: "VERY LOW",
      description: "Acoustic signature heavily attenuated by 3-5 meters of earth cover.",
    },
    fusionResult: {
      classifiedAs: "TUNNEL_EXCAVATION_CONFIRMED",
      confidence: 97.4,
      action: "DISPATCH ALERT",
      alertColor: "red",
      explanation:
        "High localized seismic periodicity paired with attenuated acoustic signature matches subterranean tool impact profile. Cross-verification eliminates surface noise.",
    },
  },
  infiltration: {
    id: "infiltration",
    title: "Covert Footstep Infiltration",
    targetType: "Stealth Human Movement (Fog / Night)",
    seismicProfile: {
      frequency: "12 - 18 Hz (Cadenced low-g micro-pulses)",
      amplitude: "MEDIUM",
      description: "Human footfall rhythm with characteristic human gait dynamics.",
    },
    acousticProfile: {
      frequency: "800 - 2400 Hz (Foliage brush & breathing)",
      amplitude: "MEDIUM",
      description: "Surface atmospheric acoustic displacement matching human cadence.",
    },
    fusionResult: {
      classifiedAs: "HUMAN_INTRUSION_DETECTED",
      confidence: 93.8,
      action: "DISPATCH ALERT",
      alertColor: "red",
      explanation:
        "Temporal synchronization between ground micro-vibration and near-ground acoustic rustle verifies human traversal through zero-visibility forest cover.",
    },
  },
  vehicle: {
    id: "vehicle",
    title: "Heavy Military Vehicle",
    targetType: "Mechanized Convoy / Border Patrol",
    seismicProfile: {
      frequency: "45 - 80 Hz (Continuous high harmonic roll)",
      amplitude: "HIGH",
      description: "Deep continuous low-frequency axle and engine coupling to roadbed.",
    },
    acousticProfile: {
      frequency: "50 - 5000 Hz (Diesel combustion & track squeal)",
      amplitude: "HIGH",
      description: "Loud airborne engine acoustics propagating across open border line.",
    },
    fusionResult: {
      classifiedAs: "HEAVY_VEHICLE_LOGGED",
      confidence: 98.9,
      action: "SECTOR WARNING",
      alertColor: "amber",
      explanation:
        "Dual broadband high amplitude verified across 3 consecutive mesh nodes. Sector tracking vector activated.",
    },
  },
  wildlife: {
    id: "wildlife",
    title: "Wildlife / Environmental Noise",
    targetType: "Canopy Rustle & Quadruped Movement",
    seismicProfile: {
      frequency: "Irregular 5 - 10 Hz (Non-rhythmic micro-tremors)",
      amplitude: "LOW",
      description: "Random weight shifts characteristic of wild boar or wandering livestock.",
    },
    acousticProfile: {
      frequency: "High frequency wind gusts & animal calls",
      amplitude: "BURST",
      description: "Atmospheric acoustic peaks that do not couple with the ground stratum.",
    },
    fusionResult: {
      classifiedAs: "BENIGN_ENVIRONMENTAL_FILTERED",
      confidence: 96.2,
      action: "IGNORE (FILTERED)",
      alertColor: "emerald",
      explanation:
        "Lack of seismic-acoustic phase coherence triggers edge suppression. False alarm averted without waking command personnel.",
    },
  },
};

export function ThreatClassifierSim() {
  const [activeScenario, setActiveScenario] = useState<ThreatScenario>("digging");
  const current = SCENARIOS[activeScenario];

  return (
    <div className="w-full rounded-2xl border border-slate-800 bg-[#080c15] p-5 sm:p-7 shadow-2xl">
      {/* HUD Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <Cpu className="h-5 w-5 text-emerald-400" />
            <h3 className="text-lg font-bold text-white tracking-wide">
              BHOOMI EDGE-AI SENSOR FUSION SIMULATOR
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            Interactive demonstration of dual-modality cross-verification running on MCU node
          </p>
        </div>

        {/* Status Indicator */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-700">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] font-mono text-emerald-300 font-semibold tracking-wider">
            EDGE INFERENCE: ACTIVE
          </span>
        </div>
      </div>

      {/* Scenario Selectors */}
      <div className="mt-5 grid grid-cols-2 lg:grid-cols-4 gap-2.5">
        {(Object.keys(SCENARIOS) as ThreatScenario[]).map((key) => {
          const item = SCENARIOS[key];
          const isSelected = activeScenario === key;
          return (
            <button
              key={key}
              onClick={() => setActiveScenario(key)}
              className={`flex flex-col text-left p-3 rounded-xl border transition-all duration-200 ${
                isSelected
                  ? "border-emerald-500/60 bg-emerald-950/20 shadow-[0_0_15px_rgba(16,185,129,0.15)] ring-1 ring-emerald-500/40"
                  : "border-slate-800 bg-slate-900/40 hover:border-slate-700 hover:bg-slate-900/80 text-slate-400"
              }`}
            >
              <div className="flex items-center justify-between w-full mb-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500">
                  EVENT CODE: 0{Object.keys(SCENARIOS).indexOf(key) + 1}
                </span>
                {isSelected && <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />}
              </div>
              <span className={`text-xs sm:text-sm font-semibold ${isSelected ? "text-emerald-300 font-bold" : "text-slate-300"}`}>
                {item.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* Real-time Waveform Display */}
      <div className="mt-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
            <Activity className="h-3.5 w-3.5 text-emerald-400" />
            LIVE SIGNAL STREAMS (SEISMIC MICRO-VIBRATION + ACOUSTIC HARMONICS)
          </span>
          <span className="text-[11px] font-mono text-cyan-400">SAMPLING: 250 Hz</span>
        </div>
        <SeismicWaveform scenario={activeScenario} height={170} />
      </div>

      {/* Dual Channel Analytics & Fusion Verdict */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Seismic Channel Box */}
        <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-950/10">
          <div className="text-[11px] font-mono text-emerald-400 font-bold mb-1.5 flex items-center justify-between">
            <span>SEISMIC GEOPHONE</span>
            <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-[10px]">
              {current.seismicProfile.amplitude}
            </span>
          </div>
          <div className="text-xs font-semibold text-slate-200 mb-1">
            {current.seismicProfile.frequency}
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            {current.seismicProfile.description}
          </p>
        </div>

        {/* Acoustic Channel Box */}
        <div className="p-4 rounded-xl border border-cyan-500/20 bg-cyan-950/10">
          <div className="text-[11px] font-mono text-cyan-400 font-bold mb-1.5 flex items-center justify-between">
            <span>MEMS ACOUSTIC</span>
            <span className="px-1.5 py-0.5 rounded bg-cyan-500/20 text-[10px]">
              {current.acousticProfile.amplitude}
            </span>
          </div>
          <div className="text-xs font-semibold text-slate-200 mb-1">
            {current.acousticProfile.frequency}
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            {current.acousticProfile.description}
          </p>
        </div>

        {/* AI Cross-Verification Verdict */}
        <div className={`p-4 rounded-xl border ${
          current.fusionResult.alertColor === "red"
            ? "border-red-500/40 bg-red-950/15"
            : current.fusionResult.alertColor === "amber"
            ? "border-amber-500/40 bg-amber-950/15"
            : "border-emerald-500/40 bg-emerald-950/15"
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono tracking-wider text-slate-400 uppercase">
              CROSS-VERIFIED DECISION
            </span>
            <span className={`text-xs font-mono font-bold ${
              current.fusionResult.alertColor === "red"
                ? "text-red-400"
                : current.fusionResult.alertColor === "amber"
                ? "text-amber-400"
                : "text-emerald-400"
            }`}>
              {current.fusionResult.confidence}% CONFIDENCE
            </span>
          </div>

          <div className="flex items-center gap-2 mb-2">
            {current.fusionResult.alertColor === "red" ? (
              <ShieldAlert className="h-5 w-5 text-red-400 animate-pulse" />
            ) : current.fusionResult.alertColor === "amber" ? (
              <AlertTriangle className="h-5 w-5 text-amber-400" />
            ) : (
              <CheckCircle2 className="h-5 w-5 text-emerald-400" />
            )}
            <span className="text-xs font-mono font-bold text-white">
              {current.fusionResult.action}
            </span>
          </div>

          <p className="text-[11px] text-slate-300 leading-relaxed font-sans">
            {current.fusionResult.explanation}
          </p>
        </div>
      </div>
    </div>
  );
}
