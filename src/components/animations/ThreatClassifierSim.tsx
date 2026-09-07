"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SeismicWaveform } from "./SeismicWaveform";
import { ThreatScenario, ScenarioDetail } from "@/types";
import {
  Activity,
  ShieldAlert,
  Cpu,
  CheckCircle2,
  AlertTriangle,
  Radio,
  Plane,
  Camera,
  Crosshair,
  Compass,
  ArrowRight,
  Maximize2,
  Shield,
  Zap
} from "lucide-react";

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
    droneResponse: {
      activated: true,
      status: "target_locked",
      dockId: "DOCK 03 (SURVEY POST BRAVO)",
      launchTimeSeconds: 12.2,
      targetCoords: "34°12'22.1\"N 74°22'48.5\"E",
      thermalPayload: "FLIR Boson 640 LWIR [Thermal Anomaly: Sub-Surface Shaft]",
      opticalFeed: "High-contrast FLIR White-Hot IR Stream",
      estimatedArrivalSeconds: 24,
      missionObjective:
        "Autonomous Intercept: Vector to subterranean acoustic epicenter, verify spoil heap / shaft entrance with thermal sensor.",
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
    droneResponse: {
      activated: true,
      status: "target_locked",
      dockId: "DOCK 01 (FORWARD REDOUBT)",
      launchTimeSeconds: 11.4,
      targetCoords: "34°11'58.2\"N 74°21'39.0\"E",
      thermalPayload: "FLIR Boson 640 LWIR [Human Heat Bloom: 37.0°C Cadenced Traversal]",
      opticalFeed: "Low-Light 4K EO + 640x512 Thermal Overlay",
      estimatedArrivalSeconds: 19,
      missionObjective:
        "Stealth Intercept: Ascend to 50m AGL, track moving human heat signature through dense foliage, cue QRF team.",
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
    droneResponse: {
      activated: true,
      status: "en_route",
      dockId: "DOCK 04 (HIGH RIDGE STATION)",
      launchTimeSeconds: 13.8,
      targetCoords: "34°13'05.8\"N 74°23'12.4\"E",
      thermalPayload: "FLIR Boson 640 LWIR [Engine Block & Axle Thermal Heat: 180°C]",
      opticalFeed: "Continuous Wide-Area Tracking Vector",
      estimatedArrivalSeconds: 31,
      missionObjective:
        "Convoy Tracking: Monitor road corridor, track velocity and vehicle profile, stream telemetry to Battalion HQ.",
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
    droneResponse: {
      activated: false,
      status: "docked",
      dockId: "ALL DOCKS (WEATHERPROOF DOCKED)",
      launchTimeSeconds: 0,
      targetCoords: "N/A — Noise Suppressed",
      thermalPayload: "Standby (Conserving Battery & Stealth)",
      opticalFeed: "No UAV Launch Required",
      estimatedArrivalSeconds: 0,
      missionObjective:
        "Drone Standby: Edge neural network eliminated false alarm; zero unnecessary UAV battery depletion or noise generation.",
    },
  },
};

export function ThreatClassifierSim() {
  const [activeScenario, setActiveScenario] = useState<ThreatScenario>("digging");
  const [thermalPalette, setThermalPalette] = useState<"white_hot" | "ironbow">("white_hot");
  const current = SCENARIOS[activeScenario];
  const drone = current.droneResponse;

  return (
    <div className="w-full rounded-2xl border border-slate-800 bg-[#080c15] p-5 sm:p-7 shadow-2xl space-y-6">
      {/* HUD Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <Cpu className="h-5 w-5 text-emerald-400" />
            <h3 className="text-lg font-bold text-white tracking-wide">
              BHOOMI EDGE-AI & AUTONOMOUS DRONE ACTIVATION SIMULATOR
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            Simulating ground seismic-acoustic cross-verification and event-triggered autonomous VTOL drone launch
          </p>
        </div>

        {/* Status Indicator */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-700">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] font-mono text-emerald-300 font-semibold tracking-wider">
            TRI-DOMAIN FUSION: ACTIVE
          </span>
        </div>
      </div>

      {/* Scenario Selectors */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
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
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
            <Activity className="h-3.5 w-3.5 text-emerald-400" />
            LIVE SIGNAL STREAMS (SEISMIC MICRO-VIBRATION + ACOUSTIC HARMONICS)
          </span>
          <span className="text-[11px] font-mono text-cyan-400">SAMPLING: 250 Hz (24-BIT ADS1256)</span>
        </div>
        <SeismicWaveform scenario={activeScenario} height={160} />
      </div>

      {/* Dual Channel Analytics & Fusion Verdict */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
        <div
          className={`p-4 rounded-xl border ${
            current.fusionResult.alertColor === "red"
              ? "border-red-500/40 bg-red-950/15"
              : current.fusionResult.alertColor === "amber"
              ? "border-amber-500/40 bg-amber-950/15"
              : "border-emerald-500/40 bg-emerald-950/15"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono tracking-wider text-slate-400 uppercase">
              CROSS-VERIFIED DECISION
            </span>
            <span
              className={`text-xs font-mono font-bold ${
                current.fusionResult.alertColor === "red"
                  ? "text-red-400"
                  : current.fusionResult.alertColor === "amber"
                  ? "text-amber-400"
                  : "text-emerald-400"
              }`}
            >
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

      {/* AUTONOMOUS DRONE QUICK-REACTION MODULE (TRIGGERED ON ALARM) */}
      <div className="p-5 rounded-xl border border-slate-800 bg-[#060910] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800/80">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-emerald-950 border border-emerald-500/40 text-emerald-400">
              <Plane className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-white font-mono tracking-wide">
                  TIER 3: AUTONOMOUS DRONE QUICK-REACTION NETWORK
                </h4>
                <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                  EVENT-TRIGGERED
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono">
                Once ground alarm threshold is crossed (Confidence &gt; 0.75), Sector Gateway auto-dispatches nearest VTOL drone
              </p>
            </div>
          </div>

          {/* Drone Status Pill */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            {drone?.activated ? (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-950/70 border border-red-500/50 text-red-300 text-xs font-mono font-bold shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                <span className="w-2 h-2 rounded-full bg-red-400 animate-ping" />
                <span>DRONE CUED: LAUNCH IN {drone.launchTimeSeconds}s</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>DRONE HARBORED IN DOCK (SAVING POWER)</span>
              </div>
            )}
          </div>
        </div>

        {/* 5-Step Detection-to-Aerial-Response Timeline */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-[10px] font-mono">
          <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
            <span className="text-slate-500 block">STEP 01</span>
            <span className="text-white font-bold block mt-0.5">Seismic Exceedance</span>
            <span className="text-slate-400 text-[9px]">Geophone wakes Cortex-M7</span>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
            <span className="text-slate-500 block">STEP 02</span>
            <span className="text-white font-bold block mt-0.5">1D-CNN Inference</span>
            <span className="text-emerald-400 text-[9px]">Classified in 18ms</span>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
            <span className="text-slate-500 block">STEP 03</span>
            <span className="text-white font-bold block mt-0.5">TDOA Pinpoint</span>
            <span className="text-cyan-400 text-[9px]">Sub-10m radial error</span>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
            <span className="text-slate-500 block">STEP 04</span>
            <span className="text-white font-bold block mt-0.5">Dock Lid Actuation</span>
            <span className="text-amber-400 text-[9px]">Retracts roof in &lt;3s</span>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
            <span className="text-slate-500 block">STEP 05</span>
            <span className="text-white font-bold block mt-0.5">Autonomous Launch</span>
            <span className="text-emerald-400 text-[9px] font-bold">&lt;15s to Airborne</span>
          </div>
        </div>

        {/* Live Drone Mission Telemetry & Simulated FLIR Thermal Feed */}
        {drone?.activated ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center pt-2">
            {/* Mission Telemetry Data */}
            <div className="lg:col-span-6 space-y-2.5 text-xs font-mono">
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex justify-between items-center">
                <span className="text-slate-400">DISPATCHED BASE:</span>
                <span className="text-white font-bold">{drone.dockId}</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex justify-between items-center">
                <span className="text-slate-400">TDOA GPS TARGET:</span>
                <span className="text-amber-400 font-bold">{drone.targetCoords}</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex justify-between items-center">
                <span className="text-slate-400">THERMAL SENSOR:</span>
                <span className="text-emerald-400 font-bold">FLIR Boson 640 (LWIR)</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block text-[10px] mb-1">TACTICAL MISSION DIRECTIVE:</span>
                <p className="text-[11px] text-slate-300 font-sans leading-relaxed">
                  {drone.missionObjective}
                </p>
              </div>
            </div>

            {/* Simulated Live FLIR Thermal Video Feed */}
            <div className="lg:col-span-6">
              <div className="relative rounded-xl overflow-hidden border border-amber-500/40 bg-black p-4 h-52 flex flex-col justify-between shadow-[0_0_20px_rgba(245,158,11,0.15)]">
                {/* Thermal HUD Header */}
                <div className="flex items-center justify-between text-[10px] font-mono text-amber-300 z-10">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-red-500 animate-ping" />
                    <span className="font-bold">LIVE UAV THERMAL FEED [FLIR BOSON 640]</span>
                  </div>
                  <div className="text-slate-400">FOV: 34° • 30 FPS</div>
                </div>

                {/* Simulated Thermal Scope View with Target Heat Bloom */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  {/* Subtle thermal scanlines */}
                  <div className="absolute inset-0 bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />

                  {/* Crosshairs */}
                  <div className="w-32 h-32 border border-amber-500/30 rounded-full flex items-center justify-center">
                    <div className="w-16 h-16 border-2 border-amber-400/70 rounded-md flex items-center justify-center">
                      <Crosshair className="w-6 h-6 text-amber-400 animate-spin" style={{ animationDuration: "20s" }} />
                    </div>
                  </div>

                  {/* Simulated Thermal Heat Signature Blip */}
                  <div className="absolute w-8 h-8 rounded-full bg-gradient-to-r from-red-600 via-amber-400 to-yellow-200 blur-[3px] animate-pulse" />
                </div>

                {/* Thermal HUD Bottom Data */}
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-300 z-10 border-t border-slate-800/80 pt-1.5">
                  <div>LAT: {drone.targetCoords.split(" ")[0]}</div>
                  <div className="text-emerald-400 font-bold">TARGET LOCKED [P=0.95]</div>
                  <div>ZOOM: 2.0x</div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 flex items-center gap-3">
            <Shield className="w-5 h-5 text-emerald-400 shrink-0" />
            <div className="text-xs font-mono text-slate-300">
              <strong className="text-emerald-300">Smart Power Conservation: </strong>
              Because the Edge AI identified the event as benign wildlife/wind with 96.2% confidence, the autonomous drone remains in sleep mode inside its weatherproof dock. This eliminates false aerial alarms and preserves battery autonomy for actual hostile threats.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
