"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Crosshair,
  Radio,
  Zap,
  Flame,
  Plane,
  Eye,
  Camera,
  Maximize2,
  Compass,
  AlertTriangle,
  Shield,
  Layers,
  Sparkles
} from "lucide-react";

interface TacticalBorderCanvasProps {
  stepNumber: number;
  scenarioId: string;
  altitudeMeters: number;
  airspeedKmh: number;
  batteryPct: number;
  tacticalLog: string;
}

export function TacticalBorderCanvas({
  stepNumber,
  scenarioId,
  altitudeMeters,
  airspeedKmh,
  batteryPct,
  tacticalLog,
}: TacticalBorderCanvasProps) {
  const [thermalPalette, setThermalPalette] = useState<"white_hot" | "ironbow" | "black_hot">("white_hot");
  const [zoomLevel, setZoomLevel] = useState<number>(2);

  // Derive active states based on current stepNumber (1 to 7)
  const isShockActive = stepNumber >= 1;
  const isNodeClassified = stepNumber >= 2;
  const isTDOASolved = stepNumber >= 3;
  const isDockOpen = stepNumber >= 4;
  const isDroneAirborne = stepNumber >= 5;
  const isThermalLocked = stepNumber >= 6;
  const isInterdicted = stepNumber >= 7;

  // Drone position interpolation across stages:
  // Dock is at X: 75%, Y: 46% (on surface ground)
  // Stage 1-4: In Dock (X: 75%, Y: 46%)
  // Stage 5: Climbing / En Route (X: 52%, Y: 18%)
  // Stage 6-7: Over Target (X: 28%, Y: 22%)
  const droneX = isThermalLocked || isInterdicted ? 28 : isDroneAirborne ? 52 : 75;
  const droneY = isThermalLocked || isInterdicted ? 22 : isDroneAirborne ? 18 : 46;

  return (
    <div className="relative w-full rounded-2xl border border-emerald-500/40 bg-[#050811] overflow-hidden shadow-2xl flex flex-col select-none">
      {/* HUD Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 border-b border-slate-800 bg-slate-950/90 text-[10px] font-mono z-30">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-bold text-white tracking-widest">
            BHOOMI TACTICAL BORDER OPERATIONS THEATRE
          </span>
          <span className="hidden sm:inline px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30 text-[9px]">
            GRID 43S UJ 124 981
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-slate-400 hidden md:inline">
            SURVEILLANCE SECTOR: <span className="text-cyan-400 font-bold">LoC NORTH / SAMBA</span>
          </div>
          <div className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300">
            {stepNumber < 5 ? (
              <span className="text-slate-400">UAV: DOCKED (STANDBY)</span>
            ) : stepNumber === 5 ? (
              <span className="text-cyan-400 font-bold">UAV: CUED ASCENT (&lt;15s)</span>
            ) : (
              <span className="text-amber-400 font-bold">UAV: ON-STATION (THERMAL LOCK)</span>
            )}
          </div>
        </div>
      </div>

      {/* Main Canvas Area: Visual Cross-Section of Border Battlefield */}
      <div className="relative w-full h-[320px] sm:h-[380px] overflow-hidden">
        {/* Night Sky with Mountain Silhouettes & Drifting Fog */}
        <div className="absolute inset-x-0 top-0 h-[50%] bg-gradient-to-b from-[#02050c] via-[#070d1a] to-[#0d1627]">
          {/* Stars */}
          <div className="absolute inset-0 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:24px_24px] opacity-25" />

          {/* Distant Mountain Silhouettes (Himalayan / Pir Panjal Ridge) */}
          <svg className="absolute bottom-0 inset-x-0 w-full h-24 opacity-35" preserveAspectRatio="none" viewBox="0 0 1200 120">
            <polygon points="0,120 0,60 120,25 240,70 380,15 520,65 680,30 820,80 960,20 1100,60 1200,40 1200,120" fill="#040814" />
            <polygon points="0,120 0,80 180,45 320,85 460,35 600,80 750,45 900,90 1050,40 1200,75 1200,120" fill="#081024" opacity="0.6" />
          </svg>

          {/* Drifting Fog Layer (Simulating low-level LoC fog) */}
          <motion.div
            className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-slate-700/20 via-slate-600/10 to-transparent pointer-events-none"
            animate={{ opacity: [0.3, 0.7, 0.3], x: [-10, 10, -10] }}
            transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
          />
        </div>

        {/* Ground Surface Dividing Line (Y: ~50%) */}
        <div className="absolute top-[48%] inset-x-0 h-[2px] bg-gradient-to-r from-emerald-500/40 via-cyan-500/30 to-emerald-500/40 z-10" />

        {/* Sub-Surface Soil & Bedrock Layers (Y: 48% to 100%) */}
        <div className="absolute inset-x-0 top-[48%] bottom-0 bg-gradient-to-b from-[#131c28] via-[#0d141e] to-[#070b12]">
          {/* Depth Horizontal Guideline Stripes */}
          <div className="absolute top-[25%] inset-x-0 border-b border-dashed border-emerald-500/15 flex justify-between px-3 text-[9px] font-mono text-slate-500">
            <span>-2.0 METERS (TOPSOIL & ALLUVIAL)</span>
            <span>VELOCITY: 320 m/s</span>
          </div>
          <div className="absolute top-[55%] inset-x-0 border-b border-dashed border-cyan-500/15 flex justify-between px-3 text-[9px] font-mono text-slate-500">
            <span>-5.0 METERS (COMPACTED CLAY & GRAVEL)</span>
            <span>VELOCITY: 750 m/s</span>
          </div>
          <div className="absolute top-[82%] inset-x-0 border-b border-dashed border-purple-500/15 flex justify-between px-3 text-[9px] font-mono text-slate-500">
            <span>-8.0 METERS (BEDROCK EXCAVATION HORIZON)</span>
            <span>VELOCITY: 1800 m/s</span>
          </div>
        </div>

        {/* Physical Border Infrastructure on Surface */}
        {/* Concertina Barbed Wire Fence */}
        <div className="absolute top-[43%] left-[10%] right-[5%] flex items-center justify-between pointer-events-none opacity-60 z-10">
          <div className="w-full flex items-center justify-around">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="flex flex-col items-center">
                {/* Fence Post */}
                <div className="w-1 h-7 bg-slate-600 rounded-t" />
                {/* Diagonal Bracing */}
                <div className="w-6 h-[1px] bg-slate-500 -mt-4 rotate-12" />
                <div className="w-6 h-[1px] bg-slate-500 -mt-1 -rotate-12" />
              </div>
            ))}
          </div>
        </div>

        {/* Forward Observation Post (FOP) Watchtower (Far Right) */}
        <div className="absolute top-[31%] right-[6%] flex flex-col items-center z-10">
          <div className="px-1.5 py-0.5 rounded bg-slate-900/90 border border-slate-700 text-[8px] font-mono text-emerald-400 mb-1">
            FOP-BRAVO
          </div>
          <div className="w-6 h-10 bg-slate-800 border border-slate-600 rounded-t flex items-center justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <div className="w-10 h-6 border-t-2 border-slate-600 bg-slate-900/60" />
        </div>

        {/* Sector Gateway Mast (Elevated on Ridge at X: 84%) */}
        <div className="absolute top-[26%] right-[16%] flex flex-col items-center z-10">
          <span className="text-[8px] font-mono px-1 rounded bg-black/70 text-cyan-400 border border-cyan-500/30 mb-0.5 whitespace-nowrap">
            SECTOR GATEWAY (CM4)
          </span>
          <div className="relative flex items-center justify-center">
            <div className="w-1.5 h-14 bg-slate-500 rounded-t" />
            <div className="absolute top-0 w-5 h-5 rounded-full border border-cyan-400 animate-ping opacity-75" />
            <Radio className="w-4 h-4 text-cyan-400 absolute -top-4" />
          </div>
        </div>

        {/* Autonomous Drone Dock Station (At X: 75%, Y: 44%) */}
        <div className="absolute top-[42%] left-[71%] z-20 flex flex-col items-center">
          <div className="text-[8px] font-mono px-1 py-0.2 rounded bg-slate-900 border border-amber-500/40 text-amber-300 mb-1 whitespace-nowrap">
            DOCK 03 (IP65)
          </div>

          {/* Dock Enclosure Base */}
          <div className="relative w-16 h-7 rounded-lg bg-slate-900 border-2 border-slate-700 flex items-center justify-center shadow-lg">
            {/* Qi Wireless Logo / Indicator */}
            <Zap className={`w-3.5 h-3.5 ${isDockOpen ? "text-slate-600" : "text-amber-400 animate-pulse"}`} />

            {/* Sliding Motorized Roof Hatch */}
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-slate-800 to-slate-700 border-r-2 border-amber-400 rounded-l-md flex items-center justify-center"
              initial={{ width: "100%" }}
              animate={{ width: isDockOpen ? "15%" : "100%" }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            >
              {!isDockOpen && (
                <span className="text-[7px] font-mono text-slate-400 uppercase font-bold tracking-wider">
                  LID LOCKED
                </span>
              )}
            </motion.div>
          </div>
        </div>

        {/* Buried BHOOMI Sensor Nodes (Staked into ground) */}
        {/* Node N-12 */}
        <div className="absolute top-[48%] left-[18%] z-20 flex flex-col items-center">
          <div className="w-3 h-3 rounded-full bg-slate-800 border-2 border-emerald-400 flex items-center justify-center shadow-[0_0_8px_#10b981]">
            <span className="w-1 h-1 rounded-full bg-emerald-400" />
          </div>
          {/* Ground Coupling Spike piercing soil */}
          <div className="w-1 h-8 bg-slate-400 rounded-b" />
          <span className="text-[7px] font-mono text-emerald-400 bg-black/60 px-1 mt-0.5 rounded">N-12</span>
        </div>

        {/* Node N-13 */}
        <div className="absolute top-[48%] left-[32%] z-20 flex flex-col items-center">
          <div className="w-3.5 h-3.5 rounded-full bg-slate-800 border-2 border-emerald-400 flex items-center justify-center shadow-[0_0_10px_#10b981]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          </div>
          <div className="w-1 h-8 bg-slate-400 rounded-b" />
          <span className="text-[7px] font-mono text-emerald-400 bg-black/60 px-1 mt-0.5 rounded">N-13</span>
        </div>

        {/* Node N-14 (Closest to Tunnel Epicenter) */}
        <div className="absolute top-[48%] left-[46%] z-20 flex flex-col items-center">
          <div className={`w-4 h-4 rounded-full bg-slate-800 border-2 flex items-center justify-center ${
            isNodeClassified ? "border-amber-400 shadow-[0_0_15px_#f59e0b]" : "border-emerald-400 shadow-[0_0_10px_#10b981]"
          }`}>
            <span className={`w-2 h-2 rounded-full ${isNodeClassified ? "bg-amber-400 animate-ping" : "bg-emerald-400"}`} />
          </div>
          <div className="w-1 h-9 bg-slate-400 rounded-b" />
          <span className={`text-[7px] font-mono px-1 mt-0.5 rounded font-bold ${
            isNodeClassified ? "bg-amber-950 text-amber-300 border border-amber-500/50" : "bg-black/60 text-emerald-400"
          }`}>
            N-14 (CORTEX-M7)
          </span>
        </div>

        {/* Node N-15 */}
        <div className="absolute top-[48%] left-[60%] z-20 flex flex-col items-center">
          <div className="w-3 h-3 rounded-full bg-slate-800 border-2 border-emerald-400 flex items-center justify-center shadow-[0_0_8px_#10b981]">
            <span className="w-1 h-1 rounded-full bg-emerald-400" />
          </div>
          <div className="w-1 h-8 bg-slate-400 rounded-b" />
          <span className="text-[7px] font-mono text-emerald-400 bg-black/60 px-1 mt-0.5 rounded">N-15</span>
        </div>

        {/* Subterranean Threat Action (Underground Tunnel at X: 28%, Y: 84% / -7.8m depth) */}
        {scenarioId === "tunnel_mission" && (
          <div className="absolute top-[78%] left-[22%] z-20 flex items-center">
            {/* Excavation Tunnel Shaft */}
            <div className="relative w-36 h-10 rounded-r-2xl bg-gradient-to-r from-black via-[#1c1209] to-[#2d1c0c] border-t-2 border-b-2 border-r-2 border-amber-600/60 flex items-center px-2">
              <span className="text-[8px] font-mono text-amber-300 font-bold">
                TUNNEL SHAFT [-7.8m]
              </span>

              {/* Hostile Digger Icon & Tool Spark */}
              <div className="ml-auto relative flex items-center justify-center">
                <Flame className={`w-5 h-5 text-red-500 ${isShockActive ? "animate-bounce" : ""}`} />
                {isShockActive && (
                  <span className="absolute -top-3 text-[7px] font-mono text-yellow-300 bg-black/80 px-1 rounded">
                    PICKAXE IMPACT
                  </span>
                )}
              </div>
            </div>

            {/* Concentric Seismic Shockwave Ripples (P/S Waves spreading to N-13 and N-14) */}
            {isShockActive && (
              <div className="absolute -inset-10 flex items-center justify-center pointer-events-none">
                <motion.div
                  className="absolute w-24 h-24 rounded-full border-2 border-amber-500/60"
                  animate={{ scale: [0.5, 2.8], opacity: [1, 0] }}
                  transition={{ repeat: Infinity, duration: 1.8, ease: "easeOut" }}
                />
                <motion.div
                  className="absolute w-24 h-24 rounded-full border border-red-500/40"
                  animate={{ scale: [0.5, 3.5], opacity: [1, 0] }}
                  transition={{ repeat: Infinity, duration: 2.4, delay: 0.4, ease: "easeOut" }}
                />
              </div>
            )}
          </div>
        )}

        {/* Surface Threat (Fog Infiltration at X: 28%, Y: 44%) */}
        {scenarioId === "fog_mission" && (
          <div className="absolute top-[43%] left-[26%] z-20 flex flex-col items-center">
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-5 rounded bg-red-600 border border-red-300 shadow-[0_0_8px_red] animate-pulse" />
              <span className="w-2.5 h-5 rounded bg-red-600 border border-red-300 shadow-[0_0_8px_red] animate-pulse" style={{ animationDelay: "0.2s" }} />
              <span className="w-2.5 h-5 rounded bg-red-600 border border-red-300 shadow-[0_0_8px_red] animate-pulse" style={{ animationDelay: "0.4s" }} />
            </div>
            <span className="text-[8px] font-mono text-red-300 bg-black/80 px-1 rounded mt-0.5 border border-red-500/40">
              3 COMBATANTS [STEALTH INGRESS]
            </span>
          </div>
        )}

        {/* LoRa Mesh Packet Transmission Line (From N-14 to Gateway at Step >= 2) */}
        {isNodeClassified && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-20">
            <defs>
              <linearGradient id="packetLine" x1="46%" y1="48%" x2="84%" y2="28%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
            <line
              x1="46%"
              y1="48%"
              x2="84%"
              y2="28%"
              stroke="url(#packetLine)"
              strokeWidth="2"
              strokeDasharray="6 6"
            />
            {/* Moving Packet Pulse */}
            <circle cx="65%" cy="38%" r="4" fill="#38bdf8">
              <animate attributeName="opacity" values="0.4;1;0.4" dur="0.8s" repeatCount="indefinite" />
            </circle>
          </svg>
        )}

        {/* TDOA Triangulation Crosshair at Solved Coordinates (Step >= 3) */}
        {isTDOASolved && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute top-[44%] left-[26%] z-20 pointer-events-none flex flex-col items-center"
          >
            <div className="relative w-14 h-14 border-2 border-cyan-400 rounded-full flex items-center justify-center animate-pulse">
              <Crosshair className="w-8 h-8 text-cyan-400" />
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            </div>
            <span className="text-[8px] font-mono text-cyan-300 bg-black/80 px-1 rounded border border-cyan-500/50 mt-1 whitespace-nowrap">
              TDOA PINPOINT (±2.4m)
            </span>
          </motion.div>
        )}

        {/* Dynamic Autonomous VTOL Drone (Smooth 2D Animated Flight) */}
        {isDockOpen && (
          <motion.div
            className="absolute z-30 pointer-events-none flex flex-col items-center"
            initial={{ left: "75%", top: "44%", scale: 0.7 }}
            animate={{
              left: `${droneX}%`,
              top: `${droneY}%`,
              scale: isDroneAirborne ? 1 : 0.75,
              rotate: isDroneAirborne && !isThermalLocked ? -8 : 0,
            }}
            transition={{ duration: 2.2, ease: "easeInOut" }}
          >
            {/* UAV SVG Model */}
            <div className="relative w-14 h-10 flex items-center justify-center filter drop-shadow-[0_0_12px_rgba(16,185,129,0.5)]">
              {/* Drone Body */}
              <div className="w-6 h-4 bg-slate-900 border-2 border-emerald-400 rounded-md flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              </div>
              {/* Spinning Propeller Blur Discs */}
              <div className="absolute -top-1 -left-2 w-5 h-1.5 bg-emerald-400/70 rounded-full animate-spin" />
              <div className="absolute -top-1 -right-2 w-5 h-1.5 bg-emerald-400/70 rounded-full animate-spin" />
              <div className="absolute -bottom-1 -left-2 w-5 h-1.5 bg-cyan-400/70 rounded-full animate-spin" />
              <div className="absolute -bottom-1 -right-2 w-5 h-1.5 bg-cyan-400/70 rounded-full animate-spin" />
              {/* Nav Lights */}
              <span className="absolute left-0 w-1 h-1 rounded-full bg-red-500" />
              <span className="absolute right-0 w-1 h-1 rounded-full bg-emerald-400" />
            </div>

            {/* Downward Infrared Thermal Sensor Scanning Cone (When on-station) */}
            {isThermalLocked && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 0.45, height: 130 }}
                className="w-24 bg-gradient-to-b from-amber-400/50 via-amber-400/20 to-transparent clip-path-cone pointer-events-none"
                style={{
                  clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                }}
              />
            )}
          </motion.div>
        )}

        {/* Picture-in-Picture FLIR Boson 640 Thermal Viewport (Draggable/Pinned Top-Left) */}
        <div className="absolute top-3 left-3 w-56 sm:w-64 z-30 rounded-xl overflow-hidden border border-amber-500/60 bg-black/95 shadow-[0_0_25px_rgba(245,158,11,0.25)] flex flex-col select-none">
          {/* PiP Header */}
          <div className="flex items-center justify-between px-2.5 py-1.5 bg-slate-900/90 border-b border-slate-800 text-[9px] font-mono text-amber-300">
            <div className="flex items-center gap-1.5">
              <Camera className="w-3 h-3 text-amber-400" />
              <span className="font-bold">FLIR BOSON 640 LWIR</span>
            </div>
            <div className="flex items-center gap-1 text-[8px]">
              <button
                onClick={() => setThermalPalette("white_hot")}
                className={`px-1 rounded ${thermalPalette === "white_hot" ? "bg-amber-500 text-slate-950 font-bold" : "text-slate-400"}`}
              >
                W-HOT
              </button>
              <button
                onClick={() => setThermalPalette("ironbow")}
                className={`px-1 rounded ${thermalPalette === "ironbow" ? "bg-amber-500 text-slate-950 font-bold" : "text-slate-400"}`}
              >
                IRON
              </button>
              <button
                onClick={() => setThermalPalette("black_hot")}
                className={`px-1 rounded ${thermalPalette === "black_hot" ? "bg-amber-500 text-slate-950 font-bold" : "text-slate-400"}`}
              >
                B-HOT
              </button>
            </div>
          </div>

          {/* PiP Video Viewport */}
          <div className="relative h-28 w-full bg-slate-950 flex items-center justify-center overflow-hidden">
            {/* Scanlines Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] pointer-events-none z-10 opacity-70" />

            {/* Thermal Scope Graticule */}
            <div className="w-20 h-20 border border-amber-500/40 rounded-full flex items-center justify-center pointer-events-none">
              <Crosshair className="w-8 h-8 text-amber-400" />
            </div>

            {/* Dynamic Thermal Signature depending on step and mission */}
            {isThermalLocked ? (
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="absolute flex flex-col items-center justify-center pointer-events-none"
              >
                <div
                  className={`w-12 h-12 rounded-full blur-[4px] animate-pulse ${
                    thermalPalette === "white_hot"
                      ? "bg-gradient-to-r from-slate-200 via-white to-amber-200"
                      : thermalPalette === "ironbow"
                      ? "bg-gradient-to-r from-purple-700 via-red-500 to-yellow-300"
                      : "bg-gradient-to-r from-slate-900 via-black to-slate-800"
                  }`}
                />
                <div className="absolute -top-3 text-[7px] font-mono bg-red-950 text-red-200 px-1 rounded border border-red-500/50 whitespace-nowrap">
                  {scenarioId === "tunnel_mission" ? "SHAFT ANOMALY +5.8°C" : "3 COMBATANTS [37.0°C]"}
                </div>
              </motion.div>
            ) : isDroneAirborne ? (
              <span className="text-[9px] font-mono text-cyan-400 animate-pulse">
                ACQUIRING WAYPOINT VECTOR...
              </span>
            ) : (
              <span className="text-[9px] font-mono text-slate-500">
                SENSOR DOCKED [OPTICAL STANDBY]
              </span>
            )}

            {/* PiP Viewport Bottom Indicators */}
            <div className="absolute bottom-1 inset-x-2 flex justify-between text-[8px] font-mono text-slate-400 z-20">
              <span>FOV: 34°</span>
              <span>ZOOM: {zoomLevel}x</span>
              <span className="text-emerald-400 font-bold">{isThermalLocked ? "TARGET LOCKED" : "SEARCH"}</span>
            </div>
          </div>

          {/* PiP Telemetry Footer */}
          <div className="px-2.5 py-1 bg-black text-[8px] font-mono text-slate-400 flex justify-between border-t border-slate-800">
            <div>ALT: <strong className="text-white">{altitudeMeters}m</strong></div>
            <div>SPD: <strong className="text-white">{airspeedKmh} km/h</strong></div>
            <div>BAT: <strong className="text-emerald-400">{batteryPct}%</strong></div>
          </div>
        </div>
      </div>
    </div>
  );
}
