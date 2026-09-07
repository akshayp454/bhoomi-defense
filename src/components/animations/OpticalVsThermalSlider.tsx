"use client";

import React, { useState, useRef, useEffect } from "react";
import { 
  Eye, EyeOff, Flame, Shield, Crosshair, Thermometer, 
  Sliders, ArrowLeftRight, CheckCircle2, AlertTriangle, Sparkles 
} from "lucide-react";

export function OpticalVsThermalSlider() {
  // Slider position in percentage (0 to 100). Default 50%
  const [sliderPct, setSliderPct] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    updateSlider(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    updateSlider(e.clientX);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const updateSlider = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const newPct = Math.max(5, Math.min(95, ((clientX - rect.left) / rect.width) * 100));
    setSliderPct(newPct);
  };

  return (
    <div className="w-full bg-[#05080c] border border-emerald-950 rounded-2xl overflow-hidden shadow-2xl text-slate-200">
      {/* Header Bar */}
      <div className="bg-[#080d14] border-b border-emerald-900/40 px-4 py-3 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-2.5 py-1 rounded bg-amber-950/80 border border-amber-500/30 text-amber-400 font-mono font-bold">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            OPTICAL BLINDNESS VS. FLIR BOSON 640 THERMAL VISION
          </div>
          <span className="text-slate-400 font-mono text-[11px] hidden md:inline">
            DRAG THE SLIDER TO TEST HIMALAYAN DENSE FOG &amp; BLIZZARD PENETRATION
          </span>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="text-slate-400">SPLIT:</span>
          <span className="text-emerald-400 font-bold">{sliderPct.toFixed(0)}% THERMAL</span>
        </div>
      </div>

      {/* Interactive Split-Screen Viewport */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        className="relative h-[420px] w-full select-none cursor-ew-resize overflow-hidden"
        style={{ touchAction: "none" }}
      >
        {/* ================================================================
            RIGHT / BASE LAYER: FLIR BOSON 640 THERMAL CORE (REVEALED)
            ================================================================ */}
        <div className="absolute inset-0 bg-[#060814] flex items-center justify-center">
          {/* Thermal Gradient Backdrop (Ironbow / False Color) */}
          <div 
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse at 60% 40%, rgba(180, 40, 20, 0.4) 0%, rgba(60, 10, 80, 0.5) 40%, rgba(10, 10, 30, 0.95) 80%)"
            }}
          />

          {/* FLIR Thermal Target 1: Human Intruder Heat Bloom (37.0°C) */}
          <div className="absolute top-[42%] left-[62%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            {/* Person Head Heat Signature */}
            <div className="w-6 h-6 rounded-full bg-gradient-to-t from-yellow-300 via-red-500 to-amber-300 shadow-xl shadow-yellow-500/50 animate-pulse" />
            {/* Person Torso Heat Signature */}
            <div className="w-10 h-16 bg-gradient-to-b from-yellow-400 via-red-600 to-amber-700 rounded-t-xl rounded-b-md -mt-1 shadow-lg shadow-red-500/40" />
            {/* Person Legs Heat Signature */}
            <div className="flex gap-1.5 -mt-0.5">
              <div className="w-3.5 h-12 bg-gradient-to-b from-amber-600 to-purple-800 rounded-b" />
              <div className="w-3.5 h-12 bg-gradient-to-b from-amber-600 to-purple-800 rounded-b" />
            </div>

            {/* Thermal Target Lock Reticle */}
            <div className="absolute -inset-4 border-2 border-emerald-400 rounded-lg pointer-events-none flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black/85 border border-emerald-400 px-2 py-0.5 rounded text-[8px] font-mono text-emerald-300 whitespace-nowrap font-bold">
                HUMAN TARGET #01 // 37.0°C (NETD &lt;40mK)
              </div>
            </div>
          </div>

          {/* FLIR Thermal Target 2: Excavation Generator Hot Engine (84.2°C) */}
          <div className="absolute top-[68%] left-[78%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            <div className="w-16 h-12 rounded-lg bg-gradient-to-br from-yellow-200 via-red-500 to-purple-950 border border-yellow-300 shadow-2xl shadow-yellow-400/80 flex items-center justify-center">
              <span className="text-[8px] font-mono text-black font-bold">84.2°C</span>
            </div>
            <div className="text-[7px] font-mono text-amber-300 mt-1 whitespace-nowrap bg-black/70 px-1 rounded">
              TUNNEL DRILL GENERATOR EXHAUST
            </div>
          </div>

          {/* Thermal Telemetry Badge (Right Side) */}
          <div className="absolute top-4 right-4 z-10 bg-black/80 p-3 rounded-xl border border-amber-500/40 font-mono text-xs max-w-[240px] backdrop-blur-md">
            <div className="flex items-center gap-1.5 text-amber-400 font-bold text-[11px] mb-1">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>FLIR BOSON 640 LWIR CORE</span>
            </div>
            <div className="text-[10px] text-slate-300 space-y-0.5">
              <div>WAVELENGTH: <strong className="text-white">7.5 - 13.5 µm (LWIR)</strong></div>
              <div>PENETRATION: <strong className="text-emerald-400">100% THROUGH FOG</strong></div>
              <div>SENSITIVITY: <strong className="text-cyan-300">&lt;40 mK NETD</strong></div>
              <div>CONFIDENCE: <strong className="text-emerald-400">98.7% HIGH</strong></div>
            </div>
          </div>
        </div>

        {/* ================================================================
            LEFT LAYER: STANDARD OPTICAL CAMERA IN HEAVY FOG (CLIPPED)
            ================================================================ */}
        <div 
          className="absolute inset-0 bg-[#3a4149] overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderPct}% 0 0)` }}
        >
          {/* Dense Fog Simulation (Noise & Whiteout Cloud Gradient) */}
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `
                radial-gradient(circle at 30% 50%, rgba(240, 245, 250, 0.96) 0%, rgba(180, 190, 200, 0.92) 50%, rgba(130, 140, 150, 0.95) 100%),
                repeating-linear-gradient(45deg, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.08) 2px, transparent 2px, transparent 8px)
              `,
            }}
          />

          {/* Concealed Target Silhouette in Fog (Barely 2% opacity outline) */}
          <div className="absolute top-[42%] left-[62%] -translate-x-1/2 -translate-y-1/2 opacity-5 blur-sm">
            <div className="w-8 h-8 rounded-full bg-slate-900" />
            <div className="w-12 h-20 bg-slate-900 rounded-t-xl" />
          </div>

          {/* Optical Failure Warning Overlay */}
          <div className="absolute top-4 left-4 z-10 bg-black/85 p-3 rounded-xl border border-red-500/40 font-mono text-xs max-w-[240px] backdrop-blur-md">
            <div className="flex items-center gap-1.5 text-red-400 font-bold text-[11px] mb-1">
              <EyeOff className="w-3.5 h-3.5 text-red-400" />
              <span>STANDARD OPTICAL CAMERA</span>
            </div>
            <div className="text-[10px] text-slate-300 space-y-0.5">
              <div>WAVELENGTH: <strong className="text-slate-400">400 - 700 nm (Visible)</strong></div>
              <div>FOG VISIBILITY: <strong className="text-red-400">BLIND (&lt;12 METERS)</strong></div>
              <div>TARGET STATUS: <strong className="text-red-400">CONCEALED / UNDETECTED</strong></div>
              <div>CONFIDENCE: <strong className="text-red-400">3.8% (ZERO DETECTION)</strong></div>
            </div>
          </div>

          {/* Blinding fog warning label */}
          <div className="absolute bottom-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-950/80 border border-red-500/50 text-[10px] font-mono text-red-300">
            <AlertTriangle className="w-3 h-3 text-red-400" />
            <span>OPTICAL WHITEOUT // ENEMY INTRUDER INVISIBLE</span>
          </div>
        </div>

        {/* ================================================================
            DRAGGABLE SPLIT-SCREEN DIVIDER HANDLE
            ================================================================ */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-400 via-amber-400 to-emerald-400 shadow-2xl z-30 cursor-ew-resize flex items-center justify-center"
          style={{ left: `${sliderPct}%` }}
        >
          {/* Circular Grab Handle */}
          <div className="w-9 h-9 rounded-full bg-black border-2 border-emerald-400 flex items-center justify-center shadow-xl shadow-emerald-500/40 hover:scale-110 transition-transform">
            <ArrowLeftRight className="w-4 h-4 text-emerald-400" />
          </div>
        </div>
      </div>

      {/* Bottom Technical Benchmark Comparison (Visual Badges) */}
      <div className="bg-[#070b10] p-4 border-t border-slate-800">
        <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-emerald-400" />
          <span>VISUAL PERFORMANCE DELTA // DENSE MOUNTAIN FOG &amp; BLIZZARD</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs font-mono">
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="text-[10px] text-slate-400">FOG PENETRATION</div>
            <div className="text-emerald-400 font-bold text-sm mt-0.5">100× RANGE GAIN</div>
            <div className="text-[10px] text-slate-400">1,200m vs 12m Optical</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="text-[10px] text-slate-400">TARGET ACQUISITION</div>
            <div className="text-cyan-400 font-bold text-sm mt-0.5">INSTANT LOCK</div>
            <div className="text-[10px] text-slate-400">37.0°C Body Heat Bloom</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="text-[10px] text-slate-400">CAMOUFLAGE DEFEAT</div>
            <div className="text-amber-400 font-bold text-sm mt-0.5">100% INFRARED</div>
            <div className="text-[10px] text-slate-400">Pierces Netting & Foliage</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="text-[10px] text-slate-400">FALSE ALARM SHIELD</div>
            <div className="text-purple-400 font-bold text-sm mt-0.5">NEAR ZERO FA</div>
            <div className="text-[10px] text-slate-400">Dual-Spectrum Cross-Check</div>
          </div>
        </div>
      </div>
    </div>
  );
}
