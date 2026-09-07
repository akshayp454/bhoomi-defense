"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Compass, Eye, Layers, RotateCcw, Shield, Cpu, Battery, 
  Radio, Zap, Crosshair, Thermometer, Volume2, VolumeX, Flame, 
  Play, CheckCircle2, Navigation, ArrowUpRight, Gauge, Activity
} from "lucide-react";
import { tacticalAudio } from "@/lib/tacticalAudio";

interface SubsystemHotspot {
  id: string;
  name: string;
  category: string;
  layerIndex: number;
  tacticalRole: string;
  visualHighlight: string;
  thermalTemp: string;
  heatColor: string;
  statusText: string;
  metrics: { icon: React.ReactNode; label: string; visualValue: string; pct: number }[];
}

const SUBSYSTEMS: SubsystemHotspot[] = [
  {
    id: "propellers",
    name: "Carbon Propellers & FOC Motors",
    category: "PROPULSION",
    layerIndex: 5,
    tacticalRole: "Stealth Silent Lift (<48 dBA)",
    visualHighlight: "13-inch counter-rotating carbon blades engineered for whisper-quiet flight and instant throttle response.",
    thermalTemp: "42.8°C",
    heatColor: "from-amber-500 to-red-500",
    statusText: "OPTIMAL THRUST",
    metrics: [
      { icon: <Gauge className="w-3.5 h-3.5 text-amber-400" />, label: "THRUST RESERVE", visualValue: "HIGH (3.4kg/motor)", pct: 92 },
      { icon: <Volume2 className="w-3.5 h-3.5 text-emerald-400" />, label: "ACOUSTIC STEALTH", visualValue: "SILENT (<48 dBA)", pct: 96 },
      { icon: <Activity className="w-3.5 h-3.5 text-cyan-400" />, label: "MOTOR EFFICIENCY", visualValue: "PEAK 12,500 RPM", pct: 88 },
    ]
  },
  {
    id: "chassis",
    name: "Toray T700 Monocoque Airframe",
    category: "AIRFRAME",
    layerIndex: 4,
    tacticalRole: "IP67 Waterproof & High-G Wind Resilience",
    visualHighlight: "Ultra-rigid aerospace carbon composite monocoque chassis sealed against sub-zero Himalayan blizzards and dust storms.",
    thermalTemp: "14.2°C",
    heatColor: "from-blue-600 to-cyan-400",
    statusText: "ARMORED SEAL",
    metrics: [
      { icon: <Shield className="w-3.5 h-3.5 text-cyan-400" />, label: "WATER/DUST SEAL", visualValue: "IP67 SUBMERSIBLE", pct: 100 },
      { icon: <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />, label: "GALE WIND RESISTANCE", visualValue: "FORCE 7 (55 km/h)", pct: 90 },
      { icon: <Crosshair className="w-3.5 h-3.5 text-purple-400" />, label: "RADAR CROSS SECTION", visualValue: "STEALTH V-TAIL", pct: 94 },
    ]
  },
  {
    id: "avionics",
    name: "NVIDIA Jetson AI + PX4 Flight Core",
    category: "TACTICAL AVIONICS",
    layerIndex: 3,
    tacticalRole: "40 TOPS Onboard Edge AI Object Segmentation",
    visualHighlight: "Executes real-time YOLOv8 threat detection onboard while RTK satellite guidance navigates directly to seismic coordinates.",
    thermalTemp: "56.4°C",
    heatColor: "from-red-500 to-yellow-300",
    statusText: "AI ACTIVE",
    metrics: [
      { icon: <Cpu className="w-3.5 h-3.5 text-emerald-400" />, label: "EDGE AI COMPUTE", visualValue: "40 TOPS INFERENCE", pct: 95 },
      { icon: <Navigation className="w-3.5 h-3.5 text-cyan-400" />, label: "RTK NAVIGATION", visualValue: "CENTIMETER ACCURATE", pct: 98 },
      { icon: <Radio className="w-3.5 h-3.5 text-amber-400" />, label: "MESH ENCRYPTION", visualValue: "AES-256 GCM SECURED", pct: 100 },
    ]
  },
  {
    id: "gimbal",
    name: "FLIR Boson 640 Thermal Core",
    category: "OPTICAL PAYLOAD",
    layerIndex: 2,
    tacticalRole: "Zero-Visibility Fog & Camouflage Penetration",
    visualHighlight: "3-axis gyro-stabilized long-wave infrared core cuts 100% through dense mountain fog to expose human body heat blooms at 1.2km.",
    thermalTemp: "28.1°C",
    heatColor: "from-cyan-400 to-amber-400",
    statusText: "THERMAL READY",
    metrics: [
      { icon: <Flame className="w-3.5 h-3.5 text-amber-400" />, label: "FOG PENETRATION", visualValue: "100% LWIR INFRARED", pct: 100 },
      { icon: <Eye className="w-3.5 h-3.5 text-emerald-400" />, label: "TARGET RANGE", visualValue: "1,200 METERS", pct: 92 },
      { icon: <Crosshair className="w-3.5 h-3.5 text-cyan-400" />, label: "STABILIZATION", visualValue: "±0.01° 3-AXIS GYRO", pct: 97 },
    ]
  },
  {
    id: "battery",
    name: "Semi-Solid Battery & Qi Wireless Skids",
    category: "POWER SYSTEM",
    layerIndex: 1,
    tacticalRole: "35-Min Hover & Fast Cable-Free Recharging",
    visualHighlight: "Next-generation 6S semi-solid state lithium cells with integrated Qi wireless inductive skids for zero-wear dock charging.",
    thermalTemp: "34.5°C",
    heatColor: "from-orange-500 to-amber-300",
    statusText: "94% CHARGED",
    metrics: [
      { icon: <Battery className="w-3.5 h-3.5 text-emerald-400" />, label: "HOVER ENDURANCE", visualValue: "35 MIN STATION-KEEP", pct: 94 },
      { icon: <Zap className="w-3.5 h-3.5 text-cyan-400" />, label: "WIRELESS CHARGE", visualValue: "FAST QI INDUCTIVE", pct: 90 },
      { icon: <Thermometer className="w-3.5 h-3.5 text-blue-400" />, label: "SUB-ZERO HEATING", visualValue: "NOMINAL TO -40°C", pct: 95 },
    ]
  },
  {
    id: "dock",
    name: "Tier 3 Smart Docking Station",
    category: "BASE INFRASTRUCTURE",
    layerIndex: 0,
    tacticalRole: "<3s Motorized Hatch & Precision IR Landing",
    visualHighlight: "Armored weatherproof marine aluminum vault with Peltier climate control, motorized sliding roof, and automated centering.",
    thermalTemp: "38.2°C",
    heatColor: "from-amber-600 to-red-400",
    statusText: "STATION READY",
    metrics: [
      { icon: <Zap className="w-3.5 h-3.5 text-amber-400" />, label: "HATCH RETRACTION", visualValue: "<2.8 SEC RAPID OPEN", pct: 98 },
      { icon: <Thermometer className="w-3.5 h-3.5 text-cyan-400" />, label: "CLIMATE HVAC", visualValue: "PELTIER CONTROLLED", pct: 95 },
      { icon: <Crosshair className="w-3.5 h-3.5 text-emerald-400" />, label: "IR HOMING BEACON", visualValue: "<15mm LANDING PRECISION", pct: 99 },
    ]
  }
];

export function InteractiveDrone3DViewer() {
  // 3D rotation state (degrees)
  const [pitch, setPitch] = useState<number>(24);
  const [yaw, setYaw] = useState<number>(-28);
  const [zoom, setZoom] = useState<number>(1);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Explode level: 0 to 100
  const [explodePct, setExplodePct] = useState<number>(55);
  const [activeMode, setActiveMode] = useState<"EMERALD" | "XRAY" | "THERMAL">("EMERALD");
  const [autoRotate, setAutoRotate] = useState<boolean>(false);
  const [selectedSubsystem, setSelectedSubsystem] = useState<SubsystemHotspot>(SUBSYSTEMS[2]); // Jetson default
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(tacticalAudio.getMuted());

  // Interactive Test Flight Simulation State
  const [isTestFlying, setIsTestFlying] = useState<boolean>(false);
  const [testFlightAltitude, setTestFlightAltitude] = useState<number>(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Auto rotation loop
  useEffect(() => {
    if (!autoRotate) {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      return;
    }
    const loop = () => {
      setYaw((prev) => (prev + 0.4) % 360);
      animationFrameRef.current = requestAnimationFrame(loop);
    };
    animationFrameRef.current = requestAnimationFrame(loop);
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [autoRotate]);

  // Pointer interaction handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    setAutoRotate(false);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;
    
    setPitch((prev) => Math.max(-45, Math.min(65, prev - dy * 0.4)));
    setYaw((prev) => (prev + dx * 0.4) % 360);
    setDragStart({ x: e.clientX, y: e.clientY });

    if (Math.abs(dx) > 12 || Math.abs(dy) > 12) {
      tacticalAudio.playOrbitTick();
    }
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const handleExplodeChange = (newVal: number) => {
    setExplodePct(newVal);
    tacticalAudio.playExplodeServo();
  };

  // Cinematic Camera Angle Presets
  const setCameraPreset = (preset: "ISO" | "TOP" | "GIMBAL" | "DOCK") => {
    setAutoRotate(false);
    tacticalAudio.playBeep(880, 0.04, "sine", 0.03);
    switch (preset) {
      case "ISO":
        setPitch(24);
        setYaw(-28);
        setZoom(1);
        break;
      case "TOP":
        setPitch(65);
        setYaw(0);
        setZoom(1.05);
        break;
      case "GIMBAL":
        setPitch(8);
        setYaw(0);
        setZoom(1.15);
        break;
      case "DOCK":
        setPitch(35);
        setYaw(45);
        setZoom(0.95);
        break;
    }
  };

  // Test Flight Action Trigger
  const triggerTestFlight = () => {
    if (isTestFlying) {
      // Land back in dock
      setIsTestFlying(false);
      setTestFlightAltitude(0);
      tacticalAudio.playDockServo();
      return;
    }

    setIsTestFlying(true);
    setExplodePct(0); // Assemble drone
    tacticalAudio.playDockServo();
    tacticalAudio.playDroneLaunch();

    // Climb altitude
    let alt = 0;
    const interval = setInterval(() => {
      alt += 5;
      setTestFlightAltitude(alt);
      if (alt >= 60) {
        clearInterval(interval);
        tacticalAudio.playTargetLock();
      }
    }, 40);
  };

  const toggleSound = () => {
    const muted = tacticalAudio.toggleMute();
    setIsAudioMuted(muted);
  };

  const selectHotspot = (subsystem: SubsystemHotspot) => {
    setSelectedSubsystem(subsystem);
    tacticalAudio.playTargetLock();
  };

  // Compute vertical layer offsets based on explodePct (0 to 100)
  const getLayerZOffset = (layerIndex: number) => {
    if (isTestFlying) {
      // In flight mode, everything moves together with altitude
      return layerIndex === 0 ? -120 : testFlightAltitude * 1.5;
    }
    const factor = explodePct / 100;
    switch (layerIndex) {
      case 5: return factor * 165; // Propellers top
      case 4: return factor * 95;  // Carbon chassis
      case 3: return factor * 25;  // Avionics core
      case 2: return -factor * 45; // Gimbal payload
      case 1: return -factor * 115;// Battery & Skids
      case 0: return -factor * 195;// Dock Station
      default: return 0;
    }
  };

  return (
    <div className="w-full bg-[#05080b] border border-emerald-950/80 rounded-2xl overflow-hidden shadow-2xl shadow-emerald-950/20 text-slate-200 select-none">
      {/* Top Aerospace Visual Bar */}
      <div className="bg-[#080d12] border-b border-emerald-900/40 px-4 py-3 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1 rounded bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 font-mono font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block mr-1" />
            3D INTERACTIVE VTOL DRONE &amp; SMART DOCK
          </div>
          <span className="text-slate-400 font-mono hidden md:inline text-[11px]">
            DRAG TO ROTATE 360° • EXPLODE SUBSYSTEMS • TEST RAPID LAUNCH
          </span>
        </div>

        {/* Tactical Quick Action & Audio */}
        <div className="flex items-center gap-3">
          <button
            onClick={triggerTestFlight}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-lg ${
              isTestFlying
                ? "bg-amber-500 text-black shadow-amber-500/30 animate-pulse"
                : "bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20"
            }`}
          >
            <Play className={`w-3.5 h-3.5 ${isTestFlying ? "fill-black" : "fill-current"}`} />
            <span>{isTestFlying ? "LAND IN DOCK" : "TEST LAUNCH (<15s)"}</span>
          </button>

          <button
            onClick={toggleSound}
            aria-label={isAudioMuted ? "Unmute sound" : "Mute sound"}
            className="p-1.5 rounded border border-slate-700/60 bg-slate-900/80 hover:bg-emerald-950 text-slate-300 hover:text-emerald-400 transition-colors"
          >
            {isAudioMuted ? <VolumeX className="w-4 h-4 text-slate-500" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>
        </div>
      </div>

      {/* Main 3D Viewport & Split Visual Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">
        {/* Left Column: 3D Interactive Canvas (8 Cols) */}
        <div 
          ref={containerRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          className="lg:col-span-8 relative bg-radial from-[#0c161d] via-[#070d13] to-[#04070a] flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing"
          style={{ touchAction: "none" }}
        >
          {/* Tactical Background Grid */}
          <div 
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: "linear-gradient(to right, #059669 1px, transparent 1px), linear-gradient(to bottom, #059669 1px, transparent 1px)",
              backgroundSize: "40px 40px"
            }}
          />

          {/* Central Compass Radial Ring */}
          <div className="absolute w-[440px] h-[440px] rounded-full border border-emerald-500/10 pointer-events-none flex items-center justify-center">
            <div className="w-[320px] h-[320px] rounded-full border border-emerald-500/15 border-dashed" />
            <div className="w-[180px] h-[180px] rounded-full border border-cyan-500/10" />
          </div>

          {/* Top Camera Angle Presets (Interactive Visual Buttons) */}
          <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-1.5 bg-black/70 p-1 rounded-xl border border-slate-800 backdrop-blur-md">
            <span className="text-[10px] font-mono text-slate-400 px-2">CAMERA:</span>
            <button
              onClick={() => setCameraPreset("ISO")}
              className="px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-900 border border-slate-700 hover:border-emerald-400 text-slate-300 hover:text-white transition-all"
            >
              ISO 3D
            </button>
            <button
              onClick={() => setCameraPreset("TOP")}
              className="px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-900 border border-slate-700 hover:border-emerald-400 text-slate-300 hover:text-white transition-all"
            >
              TOP PLAN
            </button>
            <button
              onClick={() => setCameraPreset("GIMBAL")}
              className="px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-900 border border-slate-700 hover:border-emerald-400 text-slate-300 hover:text-white transition-all"
            >
              GIMBAL POV
            </button>
            <button
              onClick={() => setCameraPreset("DOCK")}
              className="px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-900 border border-slate-700 hover:border-emerald-400 text-slate-300 hover:text-white transition-all"
            >
              SMART DOCK
            </button>
          </div>

          {/* Top Right Controls: 360 Auto-Orbit */}
          <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
            <button
              onClick={() => setAutoRotate(!autoRotate)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center gap-1.5 transition-all border ${
                autoRotate
                  ? "bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-lg shadow-emerald-500/20"
                  : "bg-slate-900/80 border-slate-700 text-slate-300 hover:border-emerald-500/50"
              }`}
            >
              <Compass className={`w-3.5 h-3.5 ${autoRotate ? "animate-spin" : ""}`} />
              {autoRotate ? "ORBIT ON" : "360° ORBIT"}
            </button>
          </div>

          {/* Visual Mode Selector (Bottom Left) */}
          <div className="absolute bottom-4 left-4 z-20 flex items-center gap-1.5 bg-black/70 p-1.5 rounded-xl border border-slate-800 backdrop-blur-md">
            <button
              onClick={() => setActiveMode("EMERALD")}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all ${
                activeMode === "EMERALD"
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              SCHEMATIC
            </button>
            <button
              onClick={() => setActiveMode("XRAY")}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all ${
                activeMode === "XRAY"
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              X-RAY
            </button>
            <button
              onClick={() => setActiveMode("THERMAL")}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all flex items-center gap-1 ${
                activeMode === "THERMAL"
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Flame className="w-3 h-3 text-amber-400" />
              HEATMAP
            </button>
          </div>

          {/* Test Flight Status Overlay */}
          {isTestFlying && (
            <div className="absolute top-16 left-1/2 -translate-x-1/2 z-20 bg-emerald-950/90 border border-emerald-400 px-4 py-1.5 rounded-full flex items-center gap-2 shadow-2xl backdrop-blur-md animate-bounce">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs font-mono font-bold text-white">
                AIRBORNE EN ROUTE // ALTITUDE: {testFlightAltitude}M AGL • THERMAL LOCK ACQUIRED
              </span>
            </div>
          )}

          {/* Dynamic 3D Scene Root */}
          <div 
            className="w-full h-full flex items-center justify-center transition-transform duration-75 ease-out"
            style={{
              perspective: "1200px",
              transformStyle: "preserve-3d",
            }}
          >
            {/* 3D World Rotating Anchor */}
            <div
              className="relative w-[380px] h-[380px] flex items-center justify-center pointer-events-none"
              style={{
                transformStyle: "preserve-3d",
                transform: `rotateX(${pitch}deg) rotateZ(${yaw}deg) scale(${zoom})`,
                transition: isDragging ? "none" : "transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)"
              }}
            >
              {/* ==============================================================
                  LAYER 0: TIER 3 DOCK BASE STATION
                  ============================================================== */}
              <div
                className="absolute inset-0 pointer-events-auto transition-transform duration-300 ease-out flex items-center justify-center"
                style={{
                  transformStyle: "preserve-3d",
                  transform: `translateZ(${getLayerZOffset(0)}px)`,
                }}
              >
                <div 
                  onClick={() => selectHotspot(SUBSYSTEMS[5])}
                  className={`w-[290px] h-[290px] rounded-2xl border-2 transition-all cursor-pointer relative group flex items-center justify-center ${
                    selectedSubsystem.id === "dock"
                      ? "border-amber-400 bg-amber-950/30 shadow-2xl shadow-amber-500/30 scale-105"
                      : activeMode === "THERMAL"
                      ? "border-amber-500/60 bg-gradient-to-br from-amber-950/40 via-red-950/30 to-blue-950/20"
                      : activeMode === "XRAY"
                      ? "border-cyan-500/40 bg-cyan-950/20"
                      : "border-slate-700 bg-slate-900/80 shadow-2xl"
                  }`}
                >
                  <div className="w-[190px] h-[190px] rounded-xl border border-dashed border-emerald-500/30 flex items-center justify-center relative">
                    <div className="w-[110px] h-[110px] rounded-full border-2 border-emerald-400/40 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full border border-cyan-400/60 flex items-center justify-center bg-cyan-950/40">
                        <Zap className="w-5 h-5 text-emerald-400 animate-pulse" />
                      </div>
                    </div>
                    <div className="absolute top-2 left-3 text-[8px] font-mono text-emerald-400/80">SMART DOCK</div>
                    <div className="absolute bottom-2 right-3 text-[8px] font-mono text-cyan-400/80">15W QI CHARGE</div>
                  </div>

                  {/* Hotspot Pin */}
                  <button 
                    onClick={(e) => { e.stopPropagation(); selectHotspot(SUBSYSTEMS[5]); }}
                    className="absolute -top-3 right-4 px-2.5 py-0.5 rounded-full bg-amber-500/90 hover:bg-amber-400 text-black font-mono font-bold text-[9px] shadow-lg flex items-center gap-1 z-30"
                  >
                    <span>L0: DOCK</span>
                    {activeMode === "THERMAL" && <span>38°C</span>}
                  </button>
                </div>
              </div>

              {/* ==============================================================
                  LAYER 1: BATTERY PACK & QI SKIDS
                  ============================================================== */}
              <div
                className="absolute inset-0 pointer-events-auto transition-transform duration-300 ease-out flex items-center justify-center"
                style={{
                  transformStyle: "preserve-3d",
                  transform: `translateZ(${getLayerZOffset(1)}px)`,
                }}
              >
                <div 
                  onClick={() => selectHotspot(SUBSYSTEMS[4])}
                  className={`w-[220px] h-[220px] rounded-xl border transition-all cursor-pointer relative group flex items-center justify-center ${
                    selectedSubsystem.id === "battery"
                      ? "border-amber-400 bg-amber-950/40 shadow-xl shadow-amber-500/30 scale-105"
                      : activeMode === "THERMAL"
                      ? "border-orange-500/60 bg-gradient-to-br from-orange-950/50 via-amber-950/30 to-blue-950/20"
                      : activeMode === "XRAY"
                      ? "border-cyan-500/30 bg-cyan-950/20"
                      : "border-slate-700/80 bg-slate-900/60"
                  }`}
                >
                  <div className="w-[140px] h-[70px] bg-slate-800 border border-slate-600 rounded-lg flex items-center justify-around px-3 shadow-inner">
                    <Battery className="w-5 h-5 text-emerald-400" />
                    <div className="text-[8px] font-mono text-slate-300 leading-tight">
                      <div>6S 10,000mAh</div>
                      <div className="text-emerald-400">SEMI-SOLID STATE</div>
                    </div>
                  </div>

                  <div className="absolute top-2 left-4 bottom-2 w-1.5 bg-gradient-to-b from-slate-400 to-slate-700 rounded-full shadow" />
                  <div className="absolute top-2 right-4 bottom-2 w-1.5 bg-gradient-to-b from-slate-400 to-slate-700 rounded-full shadow" />

                  <button 
                    onClick={(e) => { e.stopPropagation(); selectHotspot(SUBSYSTEMS[4]); }}
                    className="absolute -top-3 left-4 px-2.5 py-0.5 rounded-full bg-emerald-500/90 hover:bg-emerald-400 text-black font-mono font-bold text-[9px] shadow-lg flex items-center gap-1 z-30"
                  >
                    <span>L1: POWER</span>
                    {activeMode === "THERMAL" && <span>34°C</span>}
                  </button>
                </div>
              </div>

              {/* ==============================================================
                  LAYER 2: FLIR BOSON GIMBAL
                  ============================================================== */}
              <div
                className="absolute inset-0 pointer-events-auto transition-transform duration-300 ease-out flex items-center justify-center"
                style={{
                  transformStyle: "preserve-3d",
                  transform: `translateZ(${getLayerZOffset(2)}px)`,
                }}
              >
                <div 
                  onClick={() => selectHotspot(SUBSYSTEMS[3])}
                  className={`w-[180px] h-[180px] rounded-full border-2 transition-all cursor-pointer relative group flex items-center justify-center ${
                    selectedSubsystem.id === "gimbal"
                      ? "border-emerald-400 bg-emerald-950/40 shadow-xl shadow-emerald-500/30 scale-105"
                      : activeMode === "THERMAL"
                      ? "border-cyan-400/60 bg-gradient-to-br from-cyan-950/50 via-amber-950/40 to-red-950/20"
                      : activeMode === "XRAY"
                      ? "border-cyan-500/50 bg-cyan-950/30"
                      : "border-slate-600 bg-slate-900/80"
                  }`}
                >
                  <div className="w-[100px] h-[100px] rounded-full border border-dashed border-emerald-400/40 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-slate-800 border-2 border-emerald-500/60 flex items-center justify-center shadow-lg relative overflow-hidden">
                      <div className="w-7 h-7 rounded-full bg-cyan-950 border border-cyan-400 flex items-center justify-center">
                        <div className="w-2.5 h-2.5 rounded-full bg-cyan-300 shadow-sm animate-pulse" />
                      </div>
                      <div className="absolute bottom-0 text-[6px] font-mono text-emerald-400 text-center w-full bg-black/60">
                        FLIR 640
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={(e) => { e.stopPropagation(); selectHotspot(SUBSYSTEMS[3]); }}
                    className="absolute -top-3 right-2 px-2.5 py-0.5 rounded-full bg-cyan-500/90 hover:bg-cyan-400 text-black font-mono font-bold text-[9px] shadow-lg flex items-center gap-1 z-30"
                  >
                    <span>L2: FLIR GIMBAL</span>
                    {activeMode === "THERMAL" && <span>28°C</span>}
                  </button>
                </div>
              </div>

              {/* ==============================================================
                  LAYER 3: AVIONICS & AI CORE
                  ============================================================== */}
              <div
                className="absolute inset-0 pointer-events-auto transition-transform duration-300 ease-out flex items-center justify-center"
                style={{
                  transformStyle: "preserve-3d",
                  transform: `translateZ(${getLayerZOffset(3)}px)`,
                }}
              >
                <div 
                  onClick={() => selectHotspot(SUBSYSTEMS[2])}
                  className={`w-[190px] h-[190px] rounded-xl border-2 transition-all cursor-pointer relative group flex items-center justify-center ${
                    selectedSubsystem.id === "avionics"
                      ? "border-emerald-400 bg-emerald-950/50 shadow-2xl shadow-emerald-500/40 scale-105"
                      : activeMode === "THERMAL"
                      ? "border-red-500/80 bg-gradient-to-br from-red-950/60 via-amber-900/50 to-yellow-900/30"
                      : activeMode === "XRAY"
                      ? "border-cyan-400/60 bg-cyan-950/40"
                      : "border-slate-700 bg-slate-900/80"
                  }`}
                >
                  <div className="w-[110px] h-[110px] bg-slate-800 border-2 border-emerald-500/40 rounded-lg p-2 flex flex-col justify-between shadow-2xl">
                    <div className="flex items-center justify-between">
                      <Cpu className="w-5 h-5 text-emerald-400" />
                      <span className="text-[7px] font-mono text-emerald-400 font-bold bg-emerald-950 px-1 rounded">40 TOPS AI</span>
                    </div>
                    <div className="text-center font-mono leading-tight">
                      <div className="text-[9px] font-bold text-white">JETSON ORIN</div>
                      <div className="text-[7px] text-slate-400">PX4 AUTOPILOT</div>
                    </div>
                    <div className="flex justify-between items-center text-[7px] font-mono text-cyan-400">
                      <span>LoRa MESH</span>
                      <span>RTK GNSS</span>
                    </div>
                  </div>

                  <button 
                    onClick={(e) => { e.stopPropagation(); selectHotspot(SUBSYSTEMS[2]); }}
                    className="absolute -top-3 left-2 px-2.5 py-0.5 rounded-full bg-red-500/90 hover:bg-red-400 text-white font-mono font-bold text-[9px] shadow-lg flex items-center gap-1 z-30"
                  >
                    <span>L3: AI AVIONICS</span>
                    {activeMode === "THERMAL" && <span>56°C</span>}
                  </button>
                </div>
              </div>

              {/* ==============================================================
                  LAYER 4: TORAY T700 AIRFRAME
                  ============================================================== */}
              <div
                className="absolute inset-0 pointer-events-auto transition-transform duration-300 ease-out flex items-center justify-center"
                style={{
                  transformStyle: "preserve-3d",
                  transform: `translateZ(${getLayerZOffset(4)}px)`,
                }}
              >
                <div 
                  onClick={() => selectHotspot(SUBSYSTEMS[1])}
                  className={`w-[260px] h-[260px] rounded-3xl border-2 transition-all cursor-pointer relative group flex items-center justify-center ${
                    selectedSubsystem.id === "chassis"
                      ? "border-emerald-400 bg-emerald-950/40 shadow-xl shadow-emerald-500/30 scale-105"
                      : activeMode === "THERMAL"
                      ? "border-blue-500/60 bg-gradient-to-br from-blue-950/40 via-cyan-950/30 to-slate-900/20"
                      : activeMode === "XRAY"
                      ? "border-cyan-500/30 bg-cyan-950/20"
                      : "border-slate-700 bg-slate-900/50"
                  }`}
                >
                  <div className="absolute w-[280px] h-3 bg-gradient-to-r from-slate-700 via-slate-800 to-slate-700 rotate-45 rounded shadow" />
                  <div className="absolute w-[280px] h-3 bg-gradient-to-r from-slate-700 via-slate-800 to-slate-700 -rotate-45 rounded shadow" />
                  <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-600 flex items-center justify-center z-10">
                    <span className="text-[8px] font-mono text-slate-300 font-bold">TORAY T700</span>
                  </div>

                  <button 
                    onClick={(e) => { e.stopPropagation(); selectHotspot(SUBSYSTEMS[1]); }}
                    className="absolute -top-3 right-4 px-2.5 py-0.5 rounded-full bg-blue-500/90 hover:bg-blue-400 text-white font-mono font-bold text-[9px] shadow-lg flex items-center gap-1 z-30"
                  >
                    <span>L4: AIRFRAME</span>
                    {activeMode === "THERMAL" && <span>14°C</span>}
                  </button>
                </div>
              </div>

              {/* ==============================================================
                  LAYER 5: PROPELLERS & MOTORS
                  ============================================================== */}
              <div
                className="absolute inset-0 pointer-events-auto transition-transform duration-300 ease-out flex items-center justify-center"
                style={{
                  transformStyle: "preserve-3d",
                  transform: `translateZ(${getLayerZOffset(5)}px)`,
                }}
              >
                <div 
                  onClick={() => selectHotspot(SUBSYSTEMS[0])}
                  className={`w-[300px] h-[300px] rounded-full border transition-all cursor-pointer relative group flex items-center justify-center ${
                    selectedSubsystem.id === "propellers"
                      ? "border-amber-400 bg-amber-950/30 shadow-xl shadow-amber-500/30 scale-105"
                      : activeMode === "THERMAL"
                      ? "border-amber-500/60 bg-amber-950/20"
                      : activeMode === "XRAY"
                      ? "border-cyan-500/20"
                      : "border-transparent"
                  }`}
                >
                  {[
                    { pos: "top-2 left-2", label: "M1" },
                    { pos: "top-2 right-2", label: "M2" },
                    { pos: "bottom-2 left-2", label: "M3" },
                    { pos: "bottom-2 right-2", label: "M4" },
                  ].map((motor, idx) => (
                    <div key={idx} className={`absolute ${motor.pos} flex flex-col items-center`}>
                      <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shadow-lg ${
                        activeMode === "THERMAL" 
                          ? "bg-amber-500 border-red-500" 
                          : "bg-slate-800 border-emerald-400 shadow-emerald-500/20"
                      }`}>
                        <div className="w-2 h-2 rounded-full bg-emerald-400" />
                      </div>
                      <div 
                        className="w-20 h-2 bg-gradient-to-r from-transparent via-slate-300/80 to-transparent rounded-full -mt-5"
                        style={{
                          animation: `spin ${isTestFlying ? 0.15 : 0.4}s linear infinite`,
                          animationDirection: idx % 2 === 0 ? "normal" : "reverse"
                        }}
                      />
                    </div>
                  ))}

                  <button 
                    onClick={(e) => { e.stopPropagation(); selectHotspot(SUBSYSTEMS[0]); }}
                    className="absolute -top-3 left-4 px-2.5 py-0.5 rounded-full bg-amber-500/90 hover:bg-amber-400 text-black font-mono font-bold text-[9px] shadow-lg flex items-center gap-1 z-30"
                  >
                    <span>L5: 4X MOTORS</span>
                    {activeMode === "THERMAL" && <span>42°C</span>}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Layer Separation Slider (Bottom Center) */}
          <div className="absolute bottom-4 right-4 left-4 sm:left-auto sm:w-[300px] z-20 bg-black/80 p-3 rounded-xl border border-slate-800 backdrop-blur-md">
            <div className="flex items-center justify-between text-xs font-mono mb-1.5">
              <span className="text-slate-300 flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-emerald-400" />
                EXPLODED VIEW
              </span>
              <span className="text-emerald-400 font-bold">{explodePct}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={explodePct}
              onChange={(e) => handleExplodeChange(Number(e.target.value))}
              className="w-full accent-emerald-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[9px] font-mono text-slate-500 mt-1">
              <button onClick={() => handleExplodeChange(0)} className="hover:text-emerald-400">ASSEMBLED</button>
              <button onClick={() => handleExplodeChange(55)} className="hover:text-emerald-400">TACTICAL 50%</button>
              <button onClick={() => handleExplodeChange(100)} className="hover:text-emerald-400">EXPLODED 100%</button>
            </div>
          </div>
        </div>

        {/* Right Column: Visual Telemetry Dashboard (4 Cols) */}
        <div className="lg:col-span-4 bg-[#070b0f] border-t lg:border-t-0 lg:border-l border-emerald-950 p-5 flex flex-col justify-between">
          <div>
            {/* Visual Subsystem Selector Pills */}
            <div className="mb-4">
              <div className="text-[10px] font-mono text-emerald-500 tracking-wider uppercase mb-1.5">
                SELECT SUBSYSTEM TO INSPECT
              </div>
              <div className="grid grid-cols-3 gap-1.5 mb-3">
                {SUBSYSTEMS.map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => selectHotspot(sub)}
                    className={`px-2 py-1.5 rounded text-[10px] font-mono text-left truncate transition-all border ${
                      selectedSubsystem.id === sub.id
                        ? "bg-emerald-950 border-emerald-400 text-emerald-300 font-bold shadow-lg shadow-emerald-500/10"
                        : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    L{sub.layerIndex}: {sub.name.split(" ")[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Component Visual Card */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 relative overflow-hidden">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                    LAYER {selectedSubsystem.layerIndex} // {selectedSubsystem.category}
                  </span>
                  <h3 className="text-base font-bold text-white mt-1 leading-tight">
                    {selectedSubsystem.name}
                  </h3>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700 font-bold">
                  {selectedSubsystem.statusText}
                </span>
              </div>

              {/* Tactical Visual Role */}
              <div className="text-xs text-amber-300 font-mono mb-2.5 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                <span>{selectedSubsystem.tacticalRole}</span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                {selectedSubsystem.visualHighlight}
              </p>

              {/* Visual Performance Gauges & Bars (Replacing Dense Numbers) */}
              <div className="space-y-3 pt-1">
                {selectedSubsystem.metrics.map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-400 flex items-center gap-1.5">
                        {item.icon}
                        {item.label}
                      </span>
                      <span className="text-white font-bold">{item.visualValue}</span>
                    </div>
                    {/* Visual Animated Gauge Bar */}
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-full transition-all duration-500"
                        style={{ width: `${item.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Live Flight Telemetry Box */}
          <div className="mt-4 pt-4 border-t border-slate-800">
            <div className="p-3 rounded-lg bg-black/60 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-slate-400 flex items-center gap-1">
                  <Activity className="w-3.5 h-3.5 text-emerald-400" />
                  FLEET AUTONOMY STATUS
                </span>
                <span className="text-emerald-400 font-bold">5/5 READY</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                <div className="bg-slate-900 p-1.5 rounded border border-slate-800 text-slate-300">
                  DEFCON: <strong className="text-emerald-400">PATROL READY</strong>
                </div>
                <div className="bg-slate-900 p-1.5 rounded border border-slate-800 text-slate-300">
                  LINK: <strong className="text-cyan-400">AES-256 GCM</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
