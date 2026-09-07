"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Compass, Eye, Layers, Maximize2, Minimize2, RotateCcw, 
  Shield, Cpu, Battery, Radio, Zap, Crosshair, Thermometer,
  Volume2, VolumeX, Flame, ChevronRight, Activity, Terminal
} from "lucide-react";
import { tacticalAudio } from "@/lib/tacticalAudio";

interface SubsystemHotspot {
  id: string;
  name: string;
  category: "PROPULSION" | "AIRFRAME" | "AVIONICS" | "OPTICS" | "POWER" | "DOCK";
  layerIndex: number; // 0 (dock) to 5 (propellers)
  milSpec: string;
  partNumber: string;
  description: string;
  specs: { label: string; value: string }[];
  thermalTemp: string;
  heatColor: string;
  xPct: number; // relative pos on layer
  yPct: number;
}

const SUBSYSTEMS: SubsystemHotspot[] = [
  {
    id: "propellers",
    name: "T-Motor Carbon Propellers & FOC ESCs",
    category: "PROPULSION",
    layerIndex: 5,
    milSpec: "MIL-STD-810H (Sand & Dust Resistant)",
    partNumber: "TM-1345-T700-FOC",
    description: "Ultra-quiet 13-inch counter-rotating carbon fiber propellers coupled to Sunnysky 12,500 RPM brushless outrunner motors and 40A Field-Oriented Control (FOC) ESCs.",
    specs: [
      { label: "Rotor Diameter", value: "13.4 inches (340mm)" },
      { label: "Max Static Thrust", value: "3.4 kg per motor (13.6 kg total)" },
      { label: "Acoustic Footprint", value: "<48 dBA @ 50m AGL (Stealth Profile)" },
      { label: "Motor Efficiency", value: "11.2 g/W @ hover throttle" },
      { label: "Operating Temp", value: "-40°C to +55°C" },
    ],
    thermalTemp: "42.8°C",
    heatColor: "from-amber-500 to-red-500",
    xPct: 50,
    yPct: 20
  },
  {
    id: "chassis",
    name: "Toray T700 Monocoque Airframe",
    category: "AIRFRAME",
    layerIndex: 4,
    milSpec: "IP67 Submersible & Ingress Protected",
    partNumber: "NX-BHOOMI-T700-CF",
    description: "High-modulus Toray T700 carbon composite monocoque chassis with internal silicone environmental gasket seals and vibration-isolated avionics tray.",
    specs: [
      { label: "Material Tensile", value: "4,900 MPa Toray T700 3K Twill" },
      { label: "Dry Airframe Mass", value: "620g (Ultra-light monocoque)" },
      { label: "Wind Resistance", value: "Force 7 (Up to 55 km/h gusts)" },
      { label: "Gasket Seal", value: "Fluorosilicone O-ring (IP67)" },
      { label: "Radar Cross Section", value: "<0.008 m² (V-tail stealth)" },
    ],
    thermalTemp: "14.2°C",
    heatColor: "from-blue-600 to-cyan-400",
    xPct: 30,
    yPct: 40
  },
  {
    id: "avionics",
    name: "NVIDIA Jetson Orin Nano + PX4 Autopilot Core",
    category: "AVIONICS",
    layerIndex: 3,
    milSpec: "MIL-STD-461G (EMI/RFI Shielding)",
    partNumber: "NV-JETSON-ORIN-PX4-V6X",
    description: "Military-grade tactical flight stack combining PX4 FMUv6X real-time flight controller with NVIDIA Jetson Orin Nano (40 TOPS AI compute) running onboard YOLOv8 threat segmentation.",
    specs: [
      { label: "AI Compute", value: "40 INT8 TOPS (1024-core Ampere GPU)" },
      { label: "Edge Inference Latency", value: "8.4ms per frame (YOLOv8 nano)" },
      { label: "GNSS Navigation", value: "Dual UBlox F9P Multi-Band RTK (cm accuracy)" },
      { label: "Mesh Telemetry", value: "868 MHz AES-256 GCM LoRa (5km link)" },
      { label: "Failsafe Return", value: "Optical Flow + Inertial Dead-Reckoning" },
    ],
    thermalTemp: "56.4°C",
    heatColor: "from-red-500 to-yellow-300",
    xPct: 50,
    yPct: 50
  },
  {
    id: "gimbal",
    name: "FLIR Boson 640 LWIR + 4K Sony Starvis EO Gimbal",
    category: "OPTICS",
    layerIndex: 2,
    milSpec: "MIL-STD-810G Thermal Shock",
    partNumber: "FLIR-BOSON-640-NETD40",
    description: "3-axis brushless gyro-stabilized gimbal payload combining an uncooled FLIR Boson 640 VOx Long-Wave Infrared core with a Sony Starvis 4K ultra-low-light optical camera.",
    specs: [
      { label: "Thermal Resolution", value: "640 × 512 pixels (12µm pitch)" },
      { label: "Thermal Sensitivity", value: "<40 mK NETD (Detects 0.04°C delta)" },
      { label: "Optical Camera", value: "Sony Starvis 1/1.8\" 4K (0.001 Lux color)" },
      { label: "Gimbal Stabilization", value: "±0.01° 3-Axis Brushless Encoder" },
      { label: "Human Detection Range", value: "1,200m (Fog/Smoke/Blizzard)" },
    ],
    thermalTemp: "28.1°C",
    heatColor: "from-cyan-400 to-amber-400",
    xPct: 50,
    yPct: 70
  },
  {
    id: "battery",
    name: "6S Semi-Solid State Li-ion Battery & Qi Receiver",
    category: "POWER",
    layerIndex: 1,
    milSpec: "UN38.3 Aviation Transport Certified",
    partNumber: "NX-BAT-6S10000-SS",
    description: "6S 10,000mAh semi-solid state lithium battery delivering 280 Wh/kg energy density, integrated with dual carbon landing skids housing 15W Qi resonant inductive charging receiver coils.",
    specs: [
      { label: "Capacity & Voltage", value: "10,000 mAh / 22.2V (6S 222 Wh)" },
      { label: "Hover Endurance", value: "35 Minutes continuous station-keep" },
      { label: "Fast Qi Charge Time", value: "45 Minutes to 90% (Zero cables)" },
      { label: "Cold Weather Rating", value: "Self-heating graphene layer down to -40°C" },
      { label: "Cycle Life", value: ">800 Cycles to 80% DoD" },
    ],
    thermalTemp: "34.5°C",
    heatColor: "from-orange-500 to-amber-300",
    xPct: 65,
    yPct: 45
  },
  {
    id: "dock",
    name: "Tier 3 Marine-Grade Smart Docking Station",
    category: "DOCK",
    layerIndex: 0,
    milSpec: "MIL-STD-810H & NEMA 4X Marine",
    partNumber: "NX-DOCK-T3-WEATHERPROOF",
    description: "Armored marine-grade 5083 aluminum ground station with dual motorized linear actuator sliding hatches (<3s open), Peltier thermoelectric HVAC, and precision pulsed IR landing homing beacon.",
    specs: [
      { label: "Hatch Opening Speed", value: "<2.8 Seconds (Dual 12V Actuators)" },
      { label: "HVAC Climate Control", value: "Peltier Thermoelectric (-40°C to +50°C)" },
      { label: "Autonomous Centering", value: "Mechanical V-Rails + Qi inductive pad" },
      { label: "Power Supply", value: "12V/24V Solar + 100Ah LiFePO4 buffer bank" },
      { label: "Landing Precision", value: "<15mm radial error via IR beacon" },
    ],
    thermalTemp: "38.2°C",
    heatColor: "from-amber-600 to-red-400",
    xPct: 50,
    yPct: 80
  }
];

export function InteractiveDrone3DViewer() {
  // 3D rotation state (degrees)
  const [pitch, setPitch] = useState<number>(24);
  const [yaw, setYaw] = useState<number>(-28);
  const [zoom, setZoom] = useState<number>(1);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Explode level: 0 (fully assembled) to 100 (fully separated)
  const [explodePct, setExplodePct] = useState<number>(60);
  const [activeMode, setActiveMode] = useState<"EMERALD" | "XRAY" | "THERMAL">("EMERALD");
  const [autoRotate, setAutoRotate] = useState<boolean>(false);
  const [selectedSubsystem, setSelectedSubsystem] = useState<SubsystemHotspot>(SUBSYSTEMS[2]); // Jetson Orin default
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(tacticalAudio.getMuted());
  const [activeTab, setActiveTab] = useState<"SPECS" | "TELEMETRY" | "DIAGNOSTICS">("SPECS");

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
    
    // Limit pitch between -45 and 65
    setPitch((prev) => Math.max(-45, Math.min(65, prev - dy * 0.4)));
    setYaw((prev) => (prev + dx * 0.4) % 360);
    setDragStart({ x: e.clientX, y: e.clientY });

    // Play subtle tick occasionally
    if (Math.abs(dx) > 10 || Math.abs(dy) > 10) {
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

  const handleResetView = () => {
    setPitch(24);
    setYaw(-28);
    setZoom(1);
    setExplodePct(55);
    tacticalAudio.playBeep(660, 0.05, "sine", 0.03);
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
  // Layer indices: 0: Dock Base, 1: Battery & Skids, 2: Gimbal, 3: Avionics Core, 4: Airframe, 5: Propellers
  const getLayerZOffset = (layerIndex: number) => {
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
      {/* Top Aerospace Telemetry Ticker Header */}
      <div className="bg-[#080d12] border-b border-emerald-900/40 px-4 py-3 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-2.5 py-1 rounded bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 font-mono font-bold tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block mr-1" />
            NX-BHOOMI-UAV // EXPLODED 3D CAD VIEWER
          </div>
          <span className="text-slate-400 font-mono hidden md:inline">
            AEROSPACE MONOCOQUE SUBSYSTEM TELEMETRY
          </span>
        </div>

        {/* Tactical Ticker Metrics */}
        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="hidden lg:flex items-center gap-2 text-slate-400 border-r border-slate-800 pr-4">
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            <span>DEFCON: <strong className="text-emerald-300">PATROL READY</strong></span>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-slate-400 border-r border-slate-800 pr-4">
            <Radio className="w-3.5 h-3.5 text-cyan-400" />
            <span>ENCRYPTION: <strong className="text-cyan-300">AES-256 GCM</strong></span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span>DOCKS: <strong className="text-emerald-300">5/5 READY (0 IN FLIGHT)</strong></span>
          </div>
          <button
            onClick={toggleSound}
            aria-label={isAudioMuted ? "Unmute tactical audio" : "Mute tactical audio"}
            className="p-1.5 rounded border border-slate-700/60 bg-slate-900/80 hover:bg-emerald-950 text-slate-300 hover:text-emerald-400 transition-colors"
          >
            {isAudioMuted ? <VolumeX className="w-3.5 h-3.5 text-slate-500" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
          </button>
        </div>
      </div>

      {/* Main 3D Viewport & Split Inspector */}
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
          {/* Background Grid & Reticle Graphics */}
          <div 
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: "linear-gradient(to right, #059669 1px, transparent 1px), linear-gradient(to bottom, #059669 1px, transparent 1px)",
              backgroundSize: "40px 40px"
            }}
          />
          {/* Radial Compass Reticle in Center */}
          <div className="absolute w-[440px] h-[440px] rounded-full border border-emerald-500/10 pointer-events-none flex items-center justify-center">
            <div className="w-[320px] h-[320px] rounded-full border border-emerald-500/15 border-dashed" />
            <div className="w-[180px] h-[180px] rounded-full border border-cyan-500/10" />
            <div className="absolute top-2 text-[9px] font-mono text-emerald-500/40">360° AZIMUTH COMPASS</div>
            <div className="absolute bottom-2 text-[9px] font-mono text-emerald-500/40">BHOOMI AEROSPACE VTOL PLATFORM</div>
          </div>

          {/* Floating Telemetry Crosshair Overlay */}
          <div className="absolute top-4 left-4 z-20 pointer-events-none font-mono text-[10px] space-y-1 bg-black/60 p-2.5 rounded-lg border border-slate-800/80 backdrop-blur-md">
            <div className="flex items-center gap-2 text-emerald-400">
              <Crosshair className="w-3 h-3 text-emerald-400" />
              <span>ORBIT ANGLES: PITCH {pitch.toFixed(1)}° | YAW {yaw.toFixed(1)}°</span>
            </div>
            <div className="text-slate-400">EXPLODED DISPERSION: {explodePct}% ({explodePct > 0 ? "SEPARATED" : "DOCKED"})</div>
            <div className="text-cyan-400">GIMBAL LOOK ANGLE: 0.0° AZ / -45.0° EL</div>
            <div className="text-slate-500">ZOOM FACTOR: {(zoom * 100).toFixed(0)}%</div>
          </div>

          {/* Viewport Control Strip (Top Right) */}
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
              {autoRotate ? "AUTO-ORBIT ON" : "360° ORBIT"}
            </button>
            <button
              onClick={handleResetView}
              title="Reset Isometric Angle"
              className="p-2 rounded-lg bg-slate-900/80 border border-slate-700 hover:border-emerald-500 text-slate-300 hover:text-emerald-400 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
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
              FLIR HEATMAP
            </button>
          </div>

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
                  LAYER 0: TIER 3 DOCK BASE STATION (Lowest Layer)
                  ============================================================== */}
              <div
                className="absolute inset-0 pointer-events-auto transition-transform duration-300 ease-out flex items-center justify-center"
                style={{
                  transformStyle: "preserve-3d",
                  transform: `translateZ(${getLayerZOffset(0)}px)`,
                }}
              >
                {/* Dock Aluminum Shell Box */}
                <div 
                  onClick={() => selectHotspot(SUBSYSTEMS[5])}
                  className={`w-[290px] h-[290px] rounded-2xl border-2 transition-all cursor-pointer relative group flex items-center justify-center ${
                    selectedSubsystem.id === "dock"
                      ? "border-amber-400 bg-amber-950/30 shadow-2xl shadow-amber-500/30"
                      : activeMode === "THERMAL"
                      ? "border-amber-500/60 bg-gradient-to-br from-amber-950/40 via-red-950/30 to-blue-950/20"
                      : activeMode === "XRAY"
                      ? "border-cyan-500/40 bg-cyan-950/20 shadow-cyan-900/20"
                      : "border-slate-700 bg-slate-900/80 shadow-2xl"
                  }`}
                  style={{ transform: "rotateX(0deg)" }}
                >
                  {/* Dock Internal V-rails and Qi Charging Coil */}
                  <div className="w-[190px] h-[190px] rounded-xl border border-dashed border-emerald-500/30 flex items-center justify-center relative">
                    <div className="w-[110px] h-[110px] rounded-full border-2 border-emerald-400/40 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full border border-cyan-400/60 flex items-center justify-center bg-cyan-950/40">
                        <Zap className="w-5 h-5 text-emerald-400 animate-pulse" />
                      </div>
                    </div>
                    {/* Centering V-Rail Guides */}
                    <div className="absolute top-2 left-3 text-[8px] font-mono text-emerald-400/60">V-RAIL ALIGNMENT</div>
                    <div className="absolute bottom-2 right-3 text-[8px] font-mono text-cyan-400/60">15W QI TRANSMITTER</div>
                  </div>

                  {/* Dock Motorized Hatches (Visual Left/Right Halves) */}
                  <div className="absolute -top-3 left-4 right-4 h-3 bg-slate-800 border border-slate-600 rounded flex justify-between px-2 items-center">
                    <span className="text-[7px] font-mono text-slate-400">LINEAR ACTUATOR HATCH L</span>
                    <span className="text-[7px] font-mono text-slate-400">RETRACTION &lt;3s</span>
                  </div>
                  <div className="absolute -bottom-3 left-4 right-4 h-3 bg-slate-800 border border-slate-600 rounded flex justify-between px-2 items-center">
                    <span className="text-[7px] font-mono text-slate-400">LINEAR ACTUATOR HATCH R</span>
                    <span className="text-[7px] font-mono text-emerald-400">IP65 SEAL</span>
                  </div>

                  {/* Hotspot Pin for Dock */}
                  <button 
                    onClick={(e) => { e.stopPropagation(); selectHotspot(SUBSYSTEMS[5]); }}
                    className="absolute -top-3 right-4 px-2 py-0.5 rounded-full bg-amber-500/90 hover:bg-amber-400 text-black font-mono font-bold text-[9px] shadow-lg flex items-center gap-1 z-30"
                  >
                    <span>L0: DOCK</span>
                    {activeMode === "THERMAL" && <span className="text-[8px] opacity-80">38.2°C</span>}
                  </button>
                </div>
              </div>

              {/* ==============================================================
                  LAYER 1: BATTERY PACK & QI INDUCTIVE SKIDS
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
                      ? "border-amber-400 bg-amber-950/40 shadow-xl shadow-amber-500/30"
                      : activeMode === "THERMAL"
                      ? "border-orange-500/60 bg-gradient-to-br from-orange-950/50 via-amber-950/30 to-blue-950/20"
                      : activeMode === "XRAY"
                      ? "border-cyan-500/30 bg-cyan-950/20"
                      : "border-slate-700/80 bg-slate-900/60"
                  }`}
                >
                  {/* Battery Cells block */}
                  <div className="w-[140px] h-[70px] bg-slate-800 border border-slate-600 rounded-lg flex items-center justify-around px-3 shadow-inner">
                    <Battery className="w-5 h-5 text-emerald-400" />
                    <div className="text-[8px] font-mono text-slate-300 leading-tight">
                      <div>6S 10,000mAh</div>
                      <div className="text-emerald-400">SEMI-SOLID STATE</div>
                    </div>
                  </div>

                  {/* Dual Landing Skids with Qi Coils */}
                  <div className="absolute top-2 left-4 bottom-2 w-1.5 bg-gradient-to-b from-slate-400 to-slate-700 rounded-full shadow" />
                  <div className="absolute top-2 right-4 bottom-2 w-1.5 bg-gradient-to-b from-slate-400 to-slate-700 rounded-full shadow" />

                  {/* Hotspot Pin */}
                  <button 
                    onClick={(e) => { e.stopPropagation(); selectHotspot(SUBSYSTEMS[4]); }}
                    className="absolute -top-3 left-4 px-2 py-0.5 rounded-full bg-emerald-500/90 hover:bg-emerald-400 text-black font-mono font-bold text-[9px] shadow-lg flex items-center gap-1 z-30"
                  >
                    <span>L1: POWER & SKIDS</span>
                    {activeMode === "THERMAL" && <span className="text-[8px] opacity-80">34.5°C</span>}
                  </button>
                </div>
              </div>

              {/* ==============================================================
                  LAYER 2: FLIR BOSON 640 GIMBAL PAYLOAD
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
                      ? "border-emerald-400 bg-emerald-950/40 shadow-xl shadow-emerald-500/30"
                      : activeMode === "THERMAL"
                      ? "border-cyan-400/60 bg-gradient-to-br from-cyan-950/50 via-amber-950/40 to-red-950/20"
                      : activeMode === "XRAY"
                      ? "border-cyan-500/50 bg-cyan-950/30"
                      : "border-slate-600 bg-slate-900/80"
                  }`}
                >
                  {/* 3-Axis Gimbal Ring Spheres */}
                  <div className="w-[100px] h-[100px] rounded-full border border-dashed border-emerald-400/40 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-slate-800 border-2 border-emerald-500/60 flex items-center justify-center shadow-lg relative overflow-hidden">
                      {/* Thermal Lens Aperture */}
                      <div className="w-7 h-7 rounded-full bg-cyan-950 border border-cyan-400 flex items-center justify-center">
                        <div className="w-2.5 h-2.5 rounded-full bg-cyan-300 shadow-sm animate-pulse" />
                      </div>
                      <div className="absolute bottom-0 text-[6px] font-mono text-emerald-400 text-center w-full bg-black/60">
                        FLIR 640
                      </div>
                    </div>
                  </div>

                  {/* Hotspot Pin */}
                  <button 
                    onClick={(e) => { e.stopPropagation(); selectHotspot(SUBSYSTEMS[3]); }}
                    className="absolute -top-3 right-2 px-2 py-0.5 rounded-full bg-cyan-500/90 hover:bg-cyan-400 text-black font-mono font-bold text-[9px] shadow-lg flex items-center gap-1 z-30"
                  >
                    <span>L2: FLIR BOSON GIMBAL</span>
                    {activeMode === "THERMAL" && <span className="text-[8px] opacity-80">28.1°C</span>}
                  </button>
                </div>
              </div>

              {/* ==============================================================
                  LAYER 3: AVIONICS CORE (PX4 + NVIDIA JETSON ORIN NANO)
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
                      ? "border-emerald-400 bg-emerald-950/50 shadow-2xl shadow-emerald-500/40"
                      : activeMode === "THERMAL"
                      ? "border-red-500/80 bg-gradient-to-br from-red-950/60 via-amber-900/50 to-yellow-900/30"
                      : activeMode === "XRAY"
                      ? "border-cyan-400/60 bg-cyan-950/40"
                      : "border-slate-700 bg-slate-900/80"
                  }`}
                >
                  {/* Jetson Orin Nano AI SoM Core */}
                  <div className="w-[110px] h-[110px] bg-slate-800 border-2 border-emerald-500/40 rounded-lg p-2 flex flex-col justify-between shadow-2xl">
                    <div className="flex items-center justify-between">
                      <Cpu className="w-5 h-5 text-emerald-400" />
                      <span className="text-[7px] font-mono text-emerald-400 font-bold bg-emerald-950 px-1 rounded">40 TOPS AI</span>
                    </div>
                    <div className="text-center font-mono leading-tight">
                      <div className="text-[9px] font-bold text-white">JETSON ORIN NANO</div>
                      <div className="text-[7px] text-slate-400">PX4 FMUv6X STACK</div>
                    </div>
                    <div className="flex justify-between items-center text-[7px] font-mono text-cyan-400">
                      <span>LoRa 868M</span>
                      <span>RTK cm</span>
                    </div>
                  </div>

                  {/* Hotspot Pin */}
                  <button 
                    onClick={(e) => { e.stopPropagation(); selectHotspot(SUBSYSTEMS[2]); }}
                    className="absolute -top-3 left-2 px-2 py-0.5 rounded-full bg-red-500/90 hover:bg-red-400 text-white font-mono font-bold text-[9px] shadow-lg flex items-center gap-1 z-30"
                  >
                    <span>L3: AVIONICS & AI</span>
                    {activeMode === "THERMAL" && <span className="text-[8px] opacity-80">56.4°C</span>}
                  </button>
                </div>
              </div>

              {/* ==============================================================
                  LAYER 4: TORAY T700 CARBON FIBER AIRFRAME
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
                      ? "border-emerald-400 bg-emerald-950/40 shadow-xl shadow-emerald-500/30"
                      : activeMode === "THERMAL"
                      ? "border-blue-500/60 bg-gradient-to-br from-blue-950/40 via-cyan-950/30 to-slate-900/20"
                      : activeMode === "XRAY"
                      ? "border-cyan-500/30 bg-cyan-950/20"
                      : "border-slate-700 bg-slate-900/50"
                  }`}
                >
                  {/* Quad Arm Diagonal X Struts */}
                  <div className="absolute w-[280px] h-3 bg-gradient-to-r from-slate-700 via-slate-800 to-slate-700 rotate-45 rounded shadow" />
                  <div className="absolute w-[280px] h-3 bg-gradient-to-r from-slate-700 via-slate-800 to-slate-700 -rotate-45 rounded shadow" />
                  <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-600 flex items-center justify-center z-10">
                    <span className="text-[8px] font-mono text-slate-300 font-bold">TORAY T700</span>
                  </div>

                  {/* Hotspot Pin */}
                  <button 
                    onClick={(e) => { e.stopPropagation(); selectHotspot(SUBSYSTEMS[1]); }}
                    className="absolute -top-3 right-4 px-2 py-0.5 rounded-full bg-blue-500/90 hover:bg-blue-400 text-white font-mono font-bold text-[9px] shadow-lg flex items-center gap-1 z-30"
                  >
                    <span>L4: CARBON AIRFRAME</span>
                    {activeMode === "THERMAL" && <span className="text-[8px] opacity-80">14.2°C</span>}
                  </button>
                </div>
              </div>

              {/* ==============================================================
                  LAYER 5: PROPELLERS & BRUSHLESS MOTORS (Highest Layer)
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
                      ? "border-amber-400 bg-amber-950/30 shadow-xl shadow-amber-500/30"
                      : activeMode === "THERMAL"
                      ? "border-amber-500/60 bg-amber-950/20"
                      : activeMode === "XRAY"
                      ? "border-cyan-500/20"
                      : "border-transparent"
                  }`}
                >
                  {/* 4 Motors at Corners with Spinning Propellers */}
                  {[
                    { pos: "top-2 left-2", label: "M1: CW" },
                    { pos: "top-2 right-2", label: "M2: CCW" },
                    { pos: "bottom-2 left-2", label: "M3: CCW" },
                    { pos: "bottom-2 right-2", label: "M4: CW" },
                  ].map((motor, idx) => (
                    <div key={idx} className={`absolute ${motor.pos} flex flex-col items-center`}>
                      {/* Motor Bell Housing */}
                      <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shadow-lg ${
                        activeMode === "THERMAL" 
                          ? "bg-amber-500 border-red-500 shadow-red-500/50" 
                          : "bg-slate-800 border-emerald-400 shadow-emerald-500/20"
                      }`}>
                        <div className="w-2 h-2 rounded-full bg-emerald-400" />
                      </div>
                      {/* Spinning Carbon Propeller Blades */}
                      <div 
                        className="w-20 h-2 bg-gradient-to-r from-transparent via-slate-300/80 to-transparent rounded-full -mt-5"
                        style={{
                          animation: `spin 0.4s linear infinite`,
                          animationDirection: idx % 2 === 0 ? "normal" : "reverse"
                        }}
                      />
                      <span className="text-[7px] font-mono text-slate-400 mt-2">{motor.label}</span>
                    </div>
                  ))}

                  {/* Hotspot Pin */}
                  <button 
                    onClick={(e) => { e.stopPropagation(); selectHotspot(SUBSYSTEMS[0]); }}
                    className="absolute -top-3 left-4 px-2 py-0.5 rounded-full bg-amber-500/90 hover:bg-amber-400 text-black font-mono font-bold text-[9px] shadow-lg flex items-center gap-1 z-30"
                  >
                    <span>L5: 4X MOTORS & PROPS</span>
                    {activeMode === "THERMAL" && <span className="text-[8px] opacity-80">42.8°C</span>}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Layer Separation Slider Bar (Bottom Center) */}
          <div className="absolute bottom-4 right-4 left-4 sm:left-auto sm:w-[320px] z-20 bg-black/80 p-3 rounded-xl border border-slate-800 backdrop-blur-md">
            <div className="flex items-center justify-between text-xs font-mono mb-1.5">
              <span className="text-slate-300 flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-emerald-400" />
                EXPLODED SEPARATION
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
              <button onClick={() => handleExplodeChange(0)} className="hover:text-emerald-400">0% COLLAPSED</button>
              <button onClick={() => handleExplodeChange(50)} className="hover:text-emerald-400">50% TACTICAL</button>
              <button onClick={() => handleExplodeChange(100)} className="hover:text-emerald-400">100% FULL EXPLODED</button>
            </div>
          </div>
        </div>

        {/* Right Column: Subsystem Specification Inspector Card (4 Cols) */}
        <div className="lg:col-span-4 bg-[#070b0f] border-t lg:border-t-0 lg:border-l border-emerald-950 p-5 flex flex-col justify-between">
          <div>
            {/* Header with Subsystem Selector Pills */}
            <div className="mb-4">
              <div className="text-[10px] font-mono text-emerald-500 tracking-wider uppercase mb-1">
                AEROSPACE SUBSYSTEM SELECTOR
              </div>
              <div className="grid grid-cols-3 gap-1.5 mb-3">
                {SUBSYSTEMS.map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => selectHotspot(sub)}
                    className={`px-2 py-1.5 rounded text-[10px] font-mono text-left truncate transition-all border ${
                      selectedSubsystem.id === sub.id
                        ? "bg-emerald-950 border-emerald-400 text-emerald-300 font-bold"
                        : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    L{sub.layerIndex}: {sub.name.split(" ")[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Component Card */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 relative overflow-hidden">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                    LAYER {selectedSubsystem.layerIndex} // {selectedSubsystem.category}
                  </span>
                  <h3 className="text-base font-bold text-white mt-1.5 leading-snug">
                    {selectedSubsystem.name}
                  </h3>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-mono text-slate-400">PART #</div>
                  <div className="text-[10px] font-mono text-cyan-300 font-bold">{selectedSubsystem.partNumber}</div>
                </div>
              </div>

              {/* Mil-Spec Badge */}
              <div className="flex items-center gap-1.5 text-xs text-amber-300 font-mono mb-3 bg-amber-950/30 px-2.5 py-1 rounded border border-amber-500/20">
                <Shield className="w-3.5 h-3.5 text-amber-400" />
                <span>{selectedSubsystem.milSpec}</span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                {selectedSubsystem.description}
              </p>

              {/* Tab Selector: Specs vs Diagnostics */}
              <div className="flex border-b border-slate-800 mb-3 text-xs font-mono">
                <button
                  onClick={() => setActiveTab("SPECS")}
                  className={`pb-1.5 px-2.5 transition-colors border-b-2 font-medium ${
                    activeTab === "SPECS"
                      ? "border-emerald-400 text-emerald-300"
                      : "border-transparent text-slate-400 hover:text-white"
                  }`}
                >
                  MIL-SPEC METRICS
                </button>
                <button
                  onClick={() => setActiveTab("DIAGNOSTICS")}
                  className={`pb-1.5 px-2.5 transition-colors border-b-2 font-medium ${
                    activeTab === "DIAGNOSTICS"
                      ? "border-emerald-400 text-emerald-300"
                      : "border-transparent text-slate-400 hover:text-white"
                  }`}
                >
                  HEATMAP &amp; THERMAL
                </button>
              </div>

              {/* Specs Tab View */}
              {activeTab === "SPECS" ? (
                <div className="space-y-2">
                  {selectedSubsystem.specs.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs py-1 border-b border-slate-800/50">
                      <span className="text-slate-400 font-mono">{item.label}</span>
                      <span className="text-white font-mono font-medium">{item.value}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-black/40 border border-slate-800">
                    <div className="flex items-center gap-2">
                      <Thermometer className="w-4 h-4 text-amber-400" />
                      <span className="text-xs text-slate-300 font-mono">EST. CORE TEMP:</span>
                    </div>
                    <span className="text-sm font-mono font-bold text-amber-300">
                      {selectedSubsystem.thermalTemp}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 leading-relaxed">
                    Integrated FLIR Boson 640 microbolometer continuously validates operational heat dissipation. Peltier thermoelectric cooling maintains battery and avionics within nominal -40°C to +55°C envelope.
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quick Action Bar at Bottom of Inspector */}
          <div className="mt-4 pt-4 border-t border-slate-800">
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-2">
              <span>RAPID RECON PRESETS</span>
              <span className="text-emerald-400">STATUS: AUTONOMOUS</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  handleExplodeChange(0);
                  setActiveMode("EMERALD");
                }}
                className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 hover:border-emerald-500 text-xs font-mono text-slate-300 hover:text-white transition-colors text-center"
              >
                DOCKED PROFILE
              </button>
              <button
                onClick={() => {
                  handleExplodeChange(75);
                  setActiveMode("THERMAL");
                }}
                className="px-3 py-2 rounded-lg bg-emerald-950/80 border border-emerald-500/40 hover:border-emerald-400 text-xs font-mono text-emerald-300 font-bold transition-colors text-center"
              >
                EXPLODE &amp; THERMAL
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
