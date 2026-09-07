"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Crosshair, Radio, Shield, Zap, AlertTriangle, Eye, 
  Compass, Volume2, VolumeX, RotateCcw, CheckCircle2, Navigation,
  Activity, Play, Video
} from "lucide-react";
import { tacticalAudio } from "@/lib/tacticalAudio";

interface DroneDock {
  id: string;
  name: string;
  kmPosition: number; // in km along 5km border
  status: "READY" | "LAUNCHING" | "AIRBORNE" | "RETURNING";
  xPct: number;
  yPct: number;
}

const DRONE_DOCKS: DroneDock[] = [
  { id: "dock-a", name: "DOCK ALPHA", kmPosition: 0.5, status: "READY", xPct: 10, yPct: 62 },
  { id: "dock-b", name: "DOCK BRAVO", kmPosition: 1.5, status: "READY", xPct: 30, yPct: 62 },
  { id: "dock-c", name: "DOCK CHARLIE", kmPosition: 2.5, status: "READY", xPct: 50, yPct: 62 },
  { id: "dock-d", name: "DOCK DELTA", kmPosition: 3.5, status: "READY", xPct: 70, yPct: 62 },
  { id: "dock-e", name: "DOCK ECHO", kmPosition: 4.5, status: "READY", xPct: 90, yPct: 62 },
];

export function ClickToInfiltrateSandbox() {
  // Threat position in percentage of map (0 to 100)
  const [threatPos, setThreatPos] = useState<{ x: number; y: number } | null>({ x: 52, y: 32 });
  const [threatType, setThreatType] = useState<string>("Sub-Surface Tunnel Excavation");
  const [simulationState, setSimulationState] = useState<"IDLE" | "PROPAGATING" | "TRIANGULATING" | "DISPATCHED" | "INTERCEPTED">("IDLE");
  const [activeDock, setActiveDock] = useState<DroneDock | null>(DRONE_DOCKS[2]);
  const [droneFlightPct, setDroneFlightPct] = useState<number>(0);
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(tacticalAudio.getMuted());
  const [tdoaConfidence, setTdoaConfidence] = useState<number>(98.6);
  const [localizationRadius, setLocalizationRadius] = useState<number>(7.4); // meters

  const mapRef = useRef<HTMLDivElement>(null);
  const animationTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Trigger simulation sequence when a point is clicked
  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!mapRef.current) return;
    const rect = mapRef.current.getBoundingClientRect();
    const clickX = Math.max(5, Math.min(95, ((e.clientX - rect.left) / rect.width) * 100));
    // Threat should be in the border zone (y: 15% to 45%)
    const clickY = Math.max(15, Math.min(48, ((e.clientY - rect.top) / rect.height) * 100));

    runSimulationAt(clickX, clickY, "Tactical Threat Incursion");
  };

  const runSimulationAt = (x: number, y: number, name: string) => {
    // Clear previous timers
    if (animationTimerRef.current) clearTimeout(animationTimerRef.current);

    setThreatPos({ x, y });
    setThreatType(name);
    setSimulationState("PROPAGATING");
    setDroneFlightPct(0);

    // Play seismic shockwave sound & alarm
    tacticalAudio.playThreatAlarm();

    // Find nearest dock
    const nearest = DRONE_DOCKS.reduce((prev, curr) => {
      return Math.abs(curr.xPct - x) < Math.abs(prev.xPct - x) ? curr : prev;
    });
    setActiveDock(nearest);

    // Timeline step 1: TDOA Triangulation after 800ms
    setTimeout(() => {
      setSimulationState("TRIANGULATING");
      tacticalAudio.playTdoaSolve();
      setTdoaConfidence(Number((97.5 + Math.random() * 2.2).toFixed(1)));
      setLocalizationRadius(Number((6.5 + Math.random() * 2.8).toFixed(1)));
    }, 900);

    // Timeline step 2: Dock opens and Drone launches after 1800ms
    setTimeout(() => {
      setSimulationState("DISPATCHED");
      tacticalAudio.playDockServo();
      tacticalAudio.playDroneLaunch();

      // Animate drone flight from dock to threat
      let progress = 0;
      const interval = setInterval(() => {
        progress += 4;
        setDroneFlightPct(progress);
        if (progress >= 100) {
          clearInterval(interval);
          setSimulationState("INTERCEPTED");
          tacticalAudio.playTargetLock();
        }
      }, 60);
    }, 2000);
  };

  const resetSandbox = () => {
    if (animationTimerRef.current) clearTimeout(animationTimerRef.current);
    setSimulationState("IDLE");
    setDroneFlightPct(0);
    setThreatPos(null);
  };

  // Interpolate current drone position during flight
  const getDronePos = () => {
    if (!activeDock || !threatPos) return { x: 50, y: 62 };
    const t = Math.min(1, Math.max(0, droneFlightPct / 100));
    return {
      x: activeDock.xPct + (threatPos.x - activeDock.xPct) * t,
      y: activeDock.yPct + (threatPos.y - activeDock.yPct) * t,
    };
  };

  const dronePos = getDronePos();

  return (
    <div className="w-full bg-[#05080c] border border-emerald-950 rounded-2xl overflow-hidden shadow-2xl text-slate-200">
      {/* Sandbox Top Control & Telemetry Bar */}
      <div className="bg-[#080d14] border-b border-emerald-900/40 px-4 py-3 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-2.5 py-1 rounded bg-emerald-950 border border-emerald-500/30 text-emerald-400 font-mono font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            5KM BORDER SECTOR GIS SANDBOX
          </div>
          <span className="text-slate-400 font-mono text-[11px] hidden sm:inline">
            CLICK ANYWHERE ON THE MAP TO INITIATE LIVE SEISMIC TDOA &amp; AUTONOMOUS DRONE INTERCEPT
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              const muted = tacticalAudio.toggleMute();
              setIsAudioMuted(muted);
            }}
            className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-slate-300 hover:text-emerald-400 flex items-center gap-1.5 font-mono text-xs"
          >
            {isAudioMuted ? <VolumeX className="w-3.5 h-3.5 text-slate-500" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
            <span className="hidden sm:inline">{isAudioMuted ? "MUTED" : "AUDIO ON"}</span>
          </button>
          <button
            onClick={resetSandbox}
            className="p-1.5 rounded bg-slate-900 border border-slate-700 text-slate-300 hover:text-white"
            title="Reset Map"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Preset Scenario Injection Buttons */}
      <div className="bg-[#070b10] border-b border-slate-800/80 px-4 py-2 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
        <span className="text-slate-400 text-[11px] flex items-center gap-1">
          <Crosshair className="w-3.5 h-3.5 text-emerald-400" />
          INJECT EVALUATION THREAT SCENARIOS:
        </span>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => runSimulationAt(48, 30, "Sub-Surface Tunnel Excavation (KM 2.4)")}
            className="px-2.5 py-1 rounded bg-red-950/40 border border-red-500/30 hover:border-red-500 text-red-300 text-[11px] hover:bg-red-900/30 transition-all"
          >
            [1] TUNNEL EXCAVATION @ KM 2.4
          </button>
          <button
            onClick={() => runSimulationAt(76, 25, "Covert Night Foot Infiltration (KM 3.8)")}
            className="px-2.5 py-1 rounded bg-amber-950/40 border border-amber-500/30 hover:border-amber-500 text-amber-300 text-[11px] hover:bg-amber-900/30 transition-all"
          >
            [2] FOOT INFILTRATION @ KM 3.8
          </button>
          <button
            onClick={() => runSimulationAt(18, 35, "Armored Vehicle Convoy (KM 0.9)")}
            className="px-2.5 py-1 rounded bg-cyan-950/40 border border-cyan-500/30 hover:border-cyan-500 text-cyan-300 text-[11px] hover:bg-cyan-900/30 transition-all"
          >
            [3] VEHICLE INTRUSION @ KM 0.9
          </button>
        </div>
      </div>

      {/* Main Interactive Map Canvas */}
      <div 
        ref={mapRef}
        onClick={handleMapClick}
        className="relative h-[480px] w-full bg-[#04070a] overflow-hidden cursor-crosshair select-none border-b border-emerald-950/60"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 50%, rgba(5, 150, 105, 0.04) 0%, transparent 80%),
            linear-gradient(to right, rgba(5, 150, 105, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(5, 150, 105, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "100% 100%, 35px 35px, 35px 35px"
        }}
      >
        {/* Terrain Topographic Altitude Contours */}
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <svg className="w-full h-full" preserveAspectRatio="none">
            <path d="M0,80 Q250,50 500,90 T1000,60" fill="none" stroke="#059669" strokeWidth="1" strokeDasharray="4 4" />
            <path d="M0,160 Q250,140 500,170 T1000,150" fill="none" stroke="#059669" strokeWidth="1" strokeDasharray="4 4" />
            <path d="M0,320 Q250,300 500,340 T1000,310" fill="none" stroke="#059669" strokeWidth="1" strokeDasharray="4 4" />
          </svg>
        </div>

        {/* 5KM KM Milestones Across Header */}
        <div className="absolute top-2 left-0 right-0 px-6 flex justify-between text-[9px] font-mono text-slate-500 pointer-events-none">
          <span>SECTOR START // KM 0.0</span>
          <span>KM 1.0</span>
          <span>KM 2.0</span>
          <span>KM 2.5 (CENTRAL HUB)</span>
          <span>KM 3.0</span>
          <span>KM 4.0</span>
          <span>KM 5.0 // SECTOR END</span>
        </div>

        {/* Border Hazard Zone (Top Zone) */}
        <div className="absolute top-8 left-0 right-0 h-[190px] bg-red-950/5 border-b border-dashed border-red-500/20 pointer-events-none flex items-center justify-center">
          <span className="text-[11px] font-mono text-red-500/30 font-bold tracking-widest uppercase">
            BORDER HAZARD ZONE // HIGH-THREAT MONITORED CORRIDOR (DEPTH: 500M)
          </span>
        </div>

        {/* Concertina Physical Fence Line across Map */}
        <div className="absolute top-[48%] left-0 right-0 h-[2px] bg-gradient-to-r from-slate-600 via-amber-500/40 to-slate-600 pointer-events-none shadow-sm">
          <div className="absolute -top-3 left-4 text-[8px] font-mono text-amber-400/80 bg-black/60 px-1.5 py-0.5 rounded border border-amber-500/30">
            PHYSICAL CONCERTINA PERIMETER FENCE // DUAL-FENCE SECURITY LINE
          </div>
        </div>

        {/* Friendly Ground (Bottom Zone) */}
        <div className="absolute bottom-0 left-0 right-0 h-[190px] bg-emerald-950/5 pointer-events-none flex items-end justify-center pb-3">
          <span className="text-[10px] font-mono text-emerald-500/30 font-bold tracking-widest uppercase">
            DEFENDED INDIAN SECTOR // QRF &amp; AUTONOMOUS TIER 3 DOCK DEPLOYMENT BASELINE
          </span>
        </div>

        {/* 100 Buried Sensor Nodes Line (Represented by dots spaced along fence) */}
        <div className="absolute top-[52%] left-2 right-2 flex justify-between items-center pointer-events-none px-2">
          {Array.from({ length: 48 }).map((_, idx) => (
            <div 
              key={idx} 
              className="w-1.5 h-1.5 rounded-full bg-emerald-500/40 hover:bg-emerald-400 transition-colors"
              title={`Buried Node #${idx * 2 + 1}`}
            />
          ))}
        </div>

        {/* 5 Autonomous Drone Docks along bottom baseline */}
        {DRONE_DOCKS.map((dock) => {
          const isCurrentActive = activeDock?.id === dock.id && simulationState !== "IDLE";
          return (
            <div
              key={dock.id}
              className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer group"
              style={{ left: `${dock.xPct}%`, top: `${dock.yPct}%` }}
              onClick={(e) => {
                e.stopPropagation();
                runSimulationAt(dock.xPct + (Math.random() * 10 - 5), 30, `Sector Alert near ${dock.name}`);
              }}
            >
              {/* Dock Pod Icon */}
              <div className={`p-2 rounded-xl border-2 transition-all flex flex-col items-center shadow-lg ${
                isCurrentActive
                  ? "bg-emerald-950 border-emerald-400 shadow-emerald-500/50 scale-110"
                  : "bg-slate-900/90 border-slate-700 group-hover:border-emerald-500"
              }`}>
                <div className="flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-[9px] font-mono font-bold text-white">{dock.name}</span>
                </div>
                <div className="text-[7px] font-mono text-slate-400 mt-0.5">
                  KM {dock.kmPosition.toFixed(1)} • {isCurrentActive ? simulationState : "DOCKED"}
                </div>
              </div>

              {/* Status pulse */}
              {isCurrentActive && (
                <div className="absolute -inset-2 rounded-xl border border-emerald-400 animate-ping pointer-events-none" />
              )}
            </div>
          );
        })}

        {/* Dynamic Shockwave and Threat Visualization */}
        {threatPos && (
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{ left: `${threatPos.x}%`, top: `${threatPos.y}%` }}
          >
            {/* Threat Center Ping */}
            <div className="w-6 h-6 rounded-full bg-red-600/80 border-2 border-red-400 flex items-center justify-center animate-pulse shadow-xl shadow-red-600/60">
              <Crosshair className="w-3.5 h-3.5 text-white" />
            </div>

            {/* Concentric expanding seismic shockwaves */}
            {(simulationState === "PROPAGATING" || simulationState === "TRIANGULATING") && (
              <>
                <div className="absolute -inset-10 rounded-full border border-red-500/60 animate-ping" />
                <div className="absolute -inset-20 rounded-full border border-red-400/40 animate-ping delay-150" />
                <div className="absolute -inset-32 rounded-full border border-red-500/20 animate-ping delay-300" />
              </>
            )}

            {/* Threat Label Tooltip */}
            <div className="absolute top-7 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded bg-black/85 border border-red-500/60 text-[9px] font-mono text-red-300 shadow-xl backdrop-blur-sm">
              <div className="font-bold flex items-center gap-1">
                <AlertTriangle className="w-2.5 h-2.5 text-red-400" />
                {threatType}
              </div>
              <div className="text-slate-400">
                COORDS: {(threatPos.x * 50).toFixed(0)}m X / {(threatPos.y * 10).toFixed(0)}m Y
              </div>
            </div>

            {/* Triangulation Error Ellipse */}
            {simulationState !== "PROPAGATING" && simulationState !== "IDLE" && (
              <div 
                className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-emerald-400/60 bg-emerald-500/10 pointer-events-none"
                style={{
                  left: "50%",
                  top: "50%",
                  width: `${localizationRadius * 6}px`,
                  height: `${localizationRadius * 4}px`,
                }}
              >
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-[7px] font-mono text-emerald-300 whitespace-nowrap bg-black/80 px-1 rounded">
                  TDOA RADIAL ERROR: &lt;{localizationRadius}m
                </div>
              </div>
            )}
          </div>
        )}

        {/* Flight Trajectory Spline & In-Flight Drone */}
        {threatPos && activeDock && simulationState !== "IDLE" && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {/* Flight Path Dotted Line */}
            <line
              x1={`${activeDock.xPct}%`}
              y1={`${activeDock.yPct}%`}
              x2={`${threatPos.x}%`}
              y2={`${threatPos.y}%`}
              stroke="#10b981"
              strokeWidth="2"
              strokeDasharray="6 4"
              className="opacity-70"
            />
          </svg>
        )}

        {/* In-Flight Drone Marker */}
        {(simulationState === "DISPATCHED" || simulationState === "INTERCEPTED") && (
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none z-30 transition-transform duration-75"
            style={{ left: `${dronePos.x}%`, top: `${dronePos.y}%` }}
          >
            <div className="p-2 rounded-full bg-emerald-500 border-2 border-white shadow-2xl shadow-emerald-400 flex items-center justify-center animate-bounce">
              <Navigation className="w-4 h-4 text-black -rotate-45" />
            </div>
            <div className="absolute top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/85 border border-emerald-400 px-2 py-0.5 rounded text-[8px] font-mono text-emerald-300 font-bold">
              UAV-01 // {simulationState === "INTERCEPTED" ? "TARGET LOCK" : "INTERCEPT EN ROUTE"}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Live Mission Telemetry Readout Grid */}
      <div className="bg-[#070c12] p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
        <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
          <div className="text-[10px] text-slate-400 mb-1">SYSTEM OPERATIONAL STATUS</div>
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${simulationState === "IDLE" ? "bg-emerald-400" : "bg-red-400 animate-ping"}`} />
            <span className="font-bold text-white text-sm">
              {simulationState === "IDLE" ? "MONITORING 5KM SECTOR" : simulationState}
            </span>
          </div>
          <div className="text-[10px] text-slate-500 mt-1">100 Nodes Active • Geophone Mesh Ready</div>
        </div>

        <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
          <div className="text-[10px] text-slate-400 mb-1">SECTOR TDOA TRIANGULATION</div>
          <div className="text-sm font-bold text-emerald-400">
            {simulationState === "IDLE" ? "STANDBY" : `CONFIDENCE: ${tdoaConfidence}%`}
          </div>
          <div className="text-[10px] text-slate-400 mt-1">
            {simulationState === "IDLE" ? "Hyperbolic solver idle" : `Radial Error: <${localizationRadius}m (MoD Spec <10m)`}
          </div>
        </div>

        <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
          <div className="text-[10px] text-slate-400 mb-1">AUTONOMOUS QUICK REACTION VTOL</div>
          <div className="text-sm font-bold text-cyan-300">
            {activeDock ? activeDock.name : "DOCK CHARLIE"}
          </div>
          <div className="text-[10px] text-slate-400 mt-1">
            Hatch open: 2.8s • Flight Progress: {droneFlightPct}%
          </div>
        </div>

        <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
          <div className="text-[10px] text-slate-400 mb-1">FLIR BOSON 640 THERMAL LOCK</div>
          <div className="text-sm font-bold text-amber-400">
            {simulationState === "INTERCEPTED" ? "LOCK ACQUIRED (37.0°C)" : "STANDBY IN DOCK"}
          </div>
          <div className="text-[10px] text-slate-400 mt-1">
            {simulationState === "INTERCEPTED" ? "Video link: AES-256 live" : "Gimbal calibrated 0.0°"}
          </div>
        </div>
      </div>
    </div>
  );
}
