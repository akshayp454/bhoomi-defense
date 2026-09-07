"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { tacticalAudio } from "@/lib/tacticalAudio";
import {
  Crosshair,
  Shield,
  Zap,
  Radio,
  Eye,
  Camera,
  Compass,
  AlertTriangle,
  RotateCw,
  Flame,
  CheckCircle2,
  Maximize2,
  Sliders,
  Sun,
  Moon
} from "lucide-react";

type DroneInteractionMode = "docked" | "cued_launch" | "thermal_lock" | "orbit";
type VisionMode = "optical_eo" | "flir_thermal";

interface DroneInterceptorHUDProps {
  className?: string;
  autoTrigger?: boolean;
}

export function DroneInterceptorHUD({ className = "", autoTrigger = false }: DroneInterceptorHUDProps) {
  const [mode, setMode] = useState<DroneInteractionMode>("cued_launch");
  const [visionMode, setVisionMode] = useState<VisionMode>("optical_eo");
  const [altitude, setAltitude] = useState(48.5);
  const [speed, setSpeed] = useState(52);
  const [batteryPct, setBatteryPct] = useState(94);
  const [targetLocked, setTargetLocked] = useState(true);
  const [isSimulatingAlarm, setIsSimulatingAlarm] = useState(false);
  const [alarmStep, setAlarmStep] = useState<string>("");

  // 3D Mouse Parallax Tilt state
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2; // -1 to 1
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setTilt({ x: x * 14, y: -y * 12 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  // Periodically fluctuate subtle telemetry for ultra-realistic military HUD
  useEffect(() => {
    if (mode === "docked") {
      setAltitude(0.0);
      setSpeed(0);
      setTargetLocked(false);
      return;
    }

    const interval = setInterval(() => {
      setAltitude((prev) => {
        const delta = (Math.random() - 0.5) * 0.4;
        return parseFloat(Math.max(42, Math.min(56, prev + delta)).toFixed(1));
      });
      setSpeed((prev) => {
        const delta = (Math.random() - 0.5) * 1.2;
        return Math.round(Math.max(45, Math.min(58, prev + delta)));
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [mode]);

  // Automated Alarm simulation test
  const triggerAlarmSimulation = () => {
    tacticalAudio.playThreatAlarm();
    setIsSimulatingAlarm(true);
    setMode("docked");
    setAlarmStep("1/4: DOCK 02 RETRACTING WEATHERPROOF LID (< 3s)...");

    setTimeout(() => {
      tacticalAudio.playDockServo();
      setAlarmStep("2/4: VTOL MOTORS SPOOLING — RAPID ASCENT (< 15s)...");
      setMode("cued_launch");
    }, 2000);

    setTimeout(() => {
      tacticalAudio.playDroneLaunch();
      setAlarmStep("3/4: EN ROUTE TO TDOA PINPOINT [34°12'19\"N 74°22'41\"E]...");
      setSpeed(58);
      setAltitude(48);
    }, 4000);

    setTimeout(() => {
      tacticalAudio.playTargetLock();
      setAlarmStep("4/4: FLIR BOSON 640 THERMAL LOCK CONFIRMED — VIDEO STREAMING");
      setMode("thermal_lock");
      setVisionMode("flir_thermal");
      setTargetLocked(true);
      setIsSimulatingAlarm(false);
    }, 6500);
  };

  const isRotorSpinning = mode !== "docked";

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative flex flex-col justify-between overflow-hidden rounded-2xl border transition-colors duration-500 p-5 shadow-[0_0_40px_rgba(16,185,129,0.18)] select-none ${
        visionMode === "flir_thermal"
          ? "border-amber-500/60 bg-[#09050d] shadow-[0_0_50px_rgba(245,158,11,0.2)]"
          : "border-emerald-500/40 bg-[#060a12]"
      } ${className}`}
    >
      {/* HUD Top Status Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3 text-[11px] font-mono tracking-wider z-20">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                visionMode === "flir_thermal"
                  ? "bg-amber-400"
                  : mode === "docked"
                  ? "bg-slate-400"
                  : "bg-emerald-400"
              }`}
            />
            <span
              className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                visionMode === "flir_thermal"
                  ? "bg-amber-500"
                  : mode === "docked"
                  ? "bg-slate-500"
                  : "bg-emerald-500"
              }`}
            />
          </span>
          <span className="font-bold text-white tracking-widest">
            BHOOMI UAV-04 • VTOL INTERCEPTOR
          </span>
          <span className="hidden sm:inline px-1.5 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 text-[9px]">
            TIER 3 AERIAL LAYER
          </span>
        </div>

        {/* Vision Mode Toggle */}
        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-lg bg-slate-900 border border-slate-700 p-0.5 text-[9px] font-mono">
            <button
              onClick={() => {
                setVisionMode("optical_eo");
                tacticalAudio.playBeep(700, 0.04);
              }}
              className={`px-2 py-0.5 rounded transition-all ${
                visionMode === "optical_eo"
                  ? "bg-emerald-500 text-slate-950 font-bold"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              4K EO OPTICAL
            </button>
            <button
              onClick={() => {
                setVisionMode("flir_thermal");
                tacticalAudio.playBeep(1100, 0.05);
              }}
              className={`px-2 py-0.5 rounded transition-all ${
                visionMode === "flir_thermal"
                  ? "bg-amber-500 text-slate-950 font-bold shadow-[0_0_10px_#f59e0b]"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              FLIR THERMAL LWIR
            </button>
          </div>
        </div>
      </div>

      {/* Center Drone Visual Canvas Area with 3D Parallax Tilt */}
      <div className="relative my-3 h-[290px] sm:h-[330px] w-full flex items-center justify-center overflow-hidden">
        {/* Holographic Azimuth Compass Ring (Animated Rotating) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
          <div className="w-64 h-64 sm:w-72 sm:h-72 rounded-full border border-emerald-500/30 flex items-center justify-center">
            {/* Azimuth tick marks */}
            <span className="absolute top-1 text-[8px] font-mono text-emerald-400 font-bold">000° N</span>
            <span className="absolute right-1 text-[8px] font-mono text-emerald-400 font-bold">090° E</span>
            <span className="absolute bottom-1 text-[8px] font-mono text-emerald-400 font-bold">180° S</span>
            <span className="absolute left-1 text-[8px] font-mono text-emerald-400 font-bold">270° W</span>
          </div>
          <div className="absolute w-48 h-48 rounded-full border border-dashed border-cyan-500/25 animate-[spin_60s_linear_infinite]" />
          <div className="absolute w-full h-[1px] bg-emerald-500/15" />
          <div className="absolute h-full w-[1px] bg-emerald-500/15" />
        </div>

        {/* Dynamic Scanning Laser Beam */}
        {isRotorSpinning && (
          <motion.div
            className={`absolute left-0 right-0 h-[2px] pointer-events-none z-10 ${
              visionMode === "flir_thermal"
                ? "bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-80"
                : "bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-70"
            }`}
            animate={{ top: ["15%", "85%", "15%"] }}
            transition={{ repeat: Infinity, duration: 3.2, ease: "easeInOut" }}
          />
        )}

        {/* Telemetry Callouts */}
        <div className="absolute top-2 left-2 text-[10px] font-mono text-slate-400 space-y-1 z-20 pointer-events-none">
          <div className="flex items-center gap-1 text-cyan-400 font-bold">
            <Compass className="w-3 h-3" />
            <span>ALT: {altitude}m AGL</span>
          </div>
          <div>SPD: <span className="text-white font-bold">{speed} km/h</span></div>
          <div>HDG: <span className="text-slate-300">042° NNE</span></div>
          <div>WIND: <span className="text-slate-300">8.2 m/s</span></div>
        </div>

        <div className="absolute top-2 right-2 text-[10px] font-mono text-slate-400 space-y-1 text-right z-20 pointer-events-none">
          <div className="flex items-center justify-end gap-1 text-amber-400 font-bold">
            <Camera className="w-3 h-3" />
            <span>{visionMode === "flir_thermal" ? "FLIR BOSON 640" : "4K EO GIMBAL"}</span>
          </div>
          <div>SENSOR: <span className="text-emerald-400 font-bold">{visionMode === "flir_thermal" ? "LWIR 8-14µm" : "OPTICAL 30FPS"}</span></div>
          <div>BATTERY: <span className="text-emerald-400 font-bold">{batteryPct}%</span></div>
          <div>TDOA LOCK: <span className="text-cyan-400 font-bold">&plusmn;2.4m</span></div>
        </div>

        {/* 3D-Tilted Interactive Drone Airframe */}
        <motion.div
          className="relative z-10 flex items-center justify-center transition-transform duration-100 ease-out"
          style={{
            transform: `perspective(800px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
          }}
          animate={
            mode === "docked"
              ? { y: 25, scale: 0.88, rotate: 0 }
              : mode === "thermal_lock"
              ? { y: [-4, 4, -4], rotate: [-1, 1, -1] }
              : { y: [-8, 8, -8], rotate: [-2, 2, -2] }
          }
          transition={{
            repeat: Infinity,
            duration: mode === "cued_launch" ? 2.2 : 3.8,
            ease: "easeInOut",
          }}
        >
          {/* SVG Tactical Drone Illustration */}
          <div className="relative w-72 h-56 sm:w-84 sm:h-64 flex items-center justify-center">
            {/* Dock Landing Platform indicator */}
            {mode === "docked" && (
              <div className="absolute bottom-6 w-56 h-12 rounded-xl bg-slate-900/90 border-2 border-dashed border-slate-700 flex items-center justify-center z-0">
                <span className="text-[10px] font-mono text-cyan-400 font-bold flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 animate-pulse text-amber-400" />
                  QI INDUCTIVE CHARGING BASE [15W] • LID SECURED
                </span>
              </div>
            )}

            {/* Drone SVG */}
            <svg
              viewBox="0 0 320 240"
              className={`w-full h-full filter ${
                visionMode === "flir_thermal"
                  ? "drop-shadow-[0_0_25px_rgba(245,158,11,0.45)]"
                  : "drop-shadow-[0_0_20px_rgba(16,185,129,0.35)]"
              }`}
            >
              <defs>
                <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={visionMode === "flir_thermal" ? "#31103f" : "#1e293b"} />
                  <stop offset="50%" stopColor={visionMode === "flir_thermal" ? "#1e0b29" : "#0f172a"} />
                  <stop offset="100%" stopColor={visionMode === "flir_thermal" ? "#0a030f" : "#020617"} />
                </linearGradient>
                <linearGradient id="motorHeat" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#ef4444" />
                  <stop offset="60%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#fbbf24" />
                </linearGradient>
                <linearGradient id="glowGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor={visionMode === "flir_thermal" ? "#f59e0b" : "#10b981"} stopOpacity="0.8" />
                  <stop offset="100%" stopColor={visionMode === "flir_thermal" ? "#ef4444" : "#06b6d4"} stopOpacity="0" />
                </linearGradient>
                <radialGradient id="thermalLens">
                  <stop offset="0%" stopColor="#ef4444" />
                  <stop offset="60%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#1e293b" />
                </radialGradient>
              </defs>

              {/* Structural Arms */}
              <line x1="70" y1="60" x2="250" y2="180" stroke={visionMode === "flir_thermal" ? "#581c87" : "#334155"} strokeWidth="10" strokeLinecap="round" />
              <line x1="70" y1="60" x2="250" y2="180" stroke={visionMode === "flir_thermal" ? "#f59e0b" : "#10b981"} strokeWidth="2" strokeDasharray="4 6" />

              <line x1="250" y1="60" x2="70" y2="180" stroke={visionMode === "flir_thermal" ? "#581c87" : "#334155"} strokeWidth="10" strokeLinecap="round" />
              <line x1="250" y1="60" x2="70" y2="180" stroke={visionMode === "flir_thermal" ? "#f59e0b" : "#06b6d4"} strokeWidth="2" strokeDasharray="4 6" />

              {/* Landing Skids */}
              <path d="M 110 160 L 95 195 L 80 195" stroke="#475569" strokeWidth="4" fill="none" strokeLinecap="round" />
              <path d="M 210 160 L 225 195 L 240 195" stroke="#475569" strokeWidth="4" fill="none" strokeLinecap="round" />
              <line x1="75" y1="195" x2="115" y2="195" stroke="#64748b" strokeWidth="5" strokeLinecap="round" />
              <line x1="205" y1="195" x2="245" y2="195" stroke="#64748b" strokeWidth="5" strokeLinecap="round" />

              {/* Rotor Downwash Wash Effect */}
              {isRotorSpinning && (
                <g opacity="0.6">
                  <ellipse cx="70" cy="72" rx="28" ry="8" fill="url(#glowGrad)" />
                  <ellipse cx="250" cy="72" rx="28" ry="8" fill="url(#glowGrad)" />
                  <ellipse cx="70" cy="192" rx="28" ry="8" fill="url(#glowGrad)" />
                  <ellipse cx="250" cy="192" rx="28" ry="8" fill="url(#glowGrad)" />
                </g>
              )}

              {/* Motor Nacelles with Thermal Heat Glow in Thermal Vision */}
              <circle cx="70" cy="60" r="14" fill={visionMode === "flir_thermal" ? "url(#motorHeat)" : "#0f172a"} stroke={visionMode === "flir_thermal" ? "#ef4444" : "#10b981"} strokeWidth="2" />
              <circle cx="250" cy="60" r="14" fill={visionMode === "flir_thermal" ? "url(#motorHeat)" : "#0f172a"} stroke={visionMode === "flir_thermal" ? "#ef4444" : "#06b6d4"} strokeWidth="2" />
              <circle cx="70" cy="180" r="14" fill={visionMode === "flir_thermal" ? "url(#motorHeat)" : "#0f172a"} stroke={visionMode === "flir_thermal" ? "#ef4444" : "#10b981"} strokeWidth="2" />
              <circle cx="250" cy="180" r="14" fill={visionMode === "flir_thermal" ? "url(#motorHeat)" : "#0f172a"} stroke={visionMode === "flir_thermal" ? "#ef4444" : "#06b6d4"} strokeWidth="2" />

              {/* 4 Spinning Rotor Blades */}
              {isRotorSpinning ? (
                <g>
                  {/* Rotor 1 */}
                  <g transform="translate(70, 60)">
                    <animateTransform attributeName="transform" type="rotate" from="0 70 60" to="360 70 60" dur="0.12s" repeatCount="indefinite" />
                    <ellipse cx="70" cy="60" rx="36" ry="6" fill={visionMode === "flir_thermal" ? "#f59e0b" : "#10b981"} fillOpacity="0.4" />
                    <line x1="34" y1="60" x2="106" y2="60" stroke={visionMode === "flir_thermal" ? "#fde68a" : "#a7f3d0"} strokeWidth="2" />
                  </g>
                  {/* Rotor 2 */}
                  <g transform="translate(250, 60)">
                    <animateTransform attributeName="transform" type="rotate" from="360 250 60" to="0 250 60" dur="0.12s" repeatCount="indefinite" />
                    <ellipse cx="250" cy="60" rx="36" ry="6" fill={visionMode === "flir_thermal" ? "#f59e0b" : "#06b6d4"} fillOpacity="0.4" />
                    <line x1="214" y1="60" x2="286" y2="60" stroke={visionMode === "flir_thermal" ? "#fde68a" : "#bae6fd"} strokeWidth="2" />
                  </g>
                  {/* Rotor 3 */}
                  <g transform="translate(70, 180)">
                    <animateTransform attributeName="transform" type="rotate" from="360 70 180" to="0 70 180" dur="0.12s" repeatCount="indefinite" />
                    <ellipse cx="70" cy="180" rx="36" ry="6" fill={visionMode === "flir_thermal" ? "#f59e0b" : "#10b981"} fillOpacity="0.4" />
                    <line x1="34" y1="180" x2="106" y2="180" stroke={visionMode === "flir_thermal" ? "#fde68a" : "#a7f3d0"} strokeWidth="2" />
                  </g>
                  {/* Rotor 4 */}
                  <g transform="translate(250, 180)">
                    <animateTransform attributeName="transform" type="rotate" from="0 250 180" to="360 250 180" dur="0.12s" repeatCount="indefinite" />
                    <ellipse cx="250" cy="180" rx="36" ry="6" fill={visionMode === "flir_thermal" ? "#f59e0b" : "#06b6d4"} fillOpacity="0.4" />
                    <line x1="214" y1="180" x2="286" y2="180" stroke={visionMode === "flir_thermal" ? "#fde68a" : "#bae6fd"} strokeWidth="2" />
                  </g>
                </g>
              ) : (
                <g opacity="0.7">
                  <line x1="50" y1="50" x2="90" y2="70" stroke="#64748b" strokeWidth="3" strokeLinecap="round" />
                  <line x1="230" y1="50" x2="270" y2="70" stroke="#64748b" strokeWidth="3" strokeLinecap="round" />
                  <line x1="50" y1="170" x2="90" y2="190" stroke="#64748b" strokeWidth="3" strokeLinecap="round" />
                  <line x1="230" y1="170" x2="270" y2="190" stroke="#64748b" strokeWidth="3" strokeLinecap="round" />
                </g>
              )}

              {/* Main Fuselage */}
              <polygon points="160,75 210,110 205,145 160,165 115,145 110,110" fill="url(#bodyGrad)" stroke="#475569" strokeWidth="2.5" />

              {/* Cybernetic Decals */}
              <path d="M 135 105 L 160 120 L 185 105" fill="none" stroke={visionMode === "flir_thermal" ? "#f59e0b" : "#10b981"} strokeWidth="1.5" opacity="0.8" />
              <circle cx="160" cy="100" r="3" fill="#38bdf8" />
              <text x="160" y="135" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="monospace" fontWeight="bold" letterSpacing="1">
                BHOOMI-VTOL
              </text>

              {/* FLIR Boson 640 Thermal Core Turret */}
              <circle cx="160" cy="80" r="11" fill="#090d16" stroke="#f59e0b" strokeWidth="2" />
              <circle cx="160" cy="80" r="6" fill="url(#thermalLens)" />
              <circle cx="158" cy="78" r="2" fill="#ffffff" opacity="0.8" />

              {/* Navigation LEDs */}
              <circle cx="65" cy="60" r="2.5" fill="#ef4444" />
              <circle cx="255" cy="60" r="2.5" fill="#10b981" />
              <circle cx="160" cy="165" r="2" fill="#ffffff" />
            </svg>
          </div>
        </motion.div>
      </div>

      {/* Alarm Simulation Banner if in progress */}
      <AnimatePresence>
        {isSimulatingAlarm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-3 p-2.5 rounded-xl bg-red-950/80 border border-red-500/50 flex items-center justify-between gap-2 text-xs font-mono text-red-200"
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-400 animate-ping" />
              <span>{alarmStep}</span>
            </div>
            <span className="text-[10px] text-red-400 font-bold hidden sm:inline">
              AUTONOMOUS MISSION
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive Mode Bar & One-Click Test Alarm Trigger */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-800 z-20">
        {/* Interactive Mode Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {(
            [
              { id: "cued_launch", label: "CUED LAUNCH", icon: Flame },
              { id: "thermal_lock", label: "THERMAL LOCK", icon: Crosshair },
              { id: "orbit", label: "ORBIT PATROL", icon: RotateCw },
              { id: "docked", label: "DOCKED (BASE)", icon: Shield },
            ] as const
          ).map((item) => {
            const Icon = item.icon;
            const isSelected = mode === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setMode(item.id);
                  tacticalAudio.playBeep(850, 0.04);
                }}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[10px] font-mono tracking-wider transition-all whitespace-nowrap ${
                  isSelected
                    ? "bg-emerald-500 text-slate-950 font-bold shadow-[0_0_12px_rgba(16,185,129,0.4)]"
                    : "bg-slate-900/80 text-slate-400 border border-slate-800 hover:text-white hover:border-slate-700"
                }`}
              >
                <Icon className="w-3 h-3" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tactical Test Auto-Launch Action */}
        <button
          onClick={triggerAlarmSimulation}
          disabled={isSimulatingAlarm}
          className="inline-flex items-center justify-center gap-2 px-3.5 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-[11px] font-mono font-bold tracking-wider transition-all disabled:opacity-50"
        >
          <Zap className="w-3.5 h-3.5 text-amber-400 fill-current animate-pulse" />
          <span>{isSimulatingAlarm ? "SIMULATING..." : "TEST ALARM AUTO-LAUNCH (<15s)"}</span>
        </button>
      </div>
    </div>
  );
}
