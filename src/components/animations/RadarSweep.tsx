"use client";

import React from "react";
import { motion } from "framer-motion";

interface RadarSweepProps {
  activeSector?: string;
  className?: string;
}

export function RadarSweep({ activeSector = "SECTOR 04 - LoC NORTH", className = "" }: RadarSweepProps) {
  return (
    <div className={`relative flex items-center justify-center overflow-hidden rounded-2xl border border-slate-800 bg-[#070b12] p-6 shadow-2xl ${className}`}>
      {/* HUD Header */}
      <div className="absolute top-3 left-4 right-4 flex items-center justify-between text-[11px] font-mono tracking-wider text-slate-400 z-10">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-emerald-400 font-semibold">PASSIVE SEISMIC RADAR</span>
        </div>
        <div className="text-slate-500 hidden sm:block">GRID: 34°12'N 74°22'E</div>
        <div className="text-cyan-400">{activeSector}</div>
      </div>

      {/* Radar Circle Container */}
      <div className="relative w-64 h-64 sm:w-80 sm:h-80 my-4 flex items-center justify-center">
        {/* Concentric Range Rings */}
        <div className="absolute inset-0 rounded-full border border-emerald-500/20" />
        <div className="absolute inset-8 rounded-full border border-emerald-500/15" />
        <div className="absolute inset-16 rounded-full border border-emerald-500/10" />
        <div className="absolute inset-24 rounded-full border border-cyan-500/15" />

        {/* Crosshair Lines */}
        <div className="absolute w-full h-[1px] bg-emerald-500/15" />
        <div className="absolute h-full w-[1px] bg-emerald-500/15" />

        {/* Diagonal Crosshairs */}
        <div className="absolute w-full h-[1px] bg-emerald-500/10 rotate-45" />
        <div className="absolute w-full h-[1px] bg-emerald-500/10 -rotate-45" />

        {/* Rotating Radar Beam */}
        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none origin-center"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
        >
          <div
            className="w-1/2 h-1/2 origin-bottom-right"
            style={{
              background: "conic-gradient(from 180deg at 100% 100%, rgba(16, 185, 129, 0.4) 0deg, rgba(6, 182, 212, 0.05) 50deg, transparent 75deg)",
            }}
          />
        </motion.div>

        {/* Simulated Buried Sensor Nodes */}
        {/* Node 1 */}
        <div className="absolute top-[28%] left-[34%] group cursor-pointer">
          <div className="relative flex items-center justify-center">
            <span className="absolute h-4 w-4 rounded-full bg-emerald-500/30 animate-ping" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981]" />
          </div>
          <span className="absolute -bottom-4 -left-6 whitespace-nowrap text-[9px] font-mono text-emerald-300 bg-black/60 px-1 py-0.5 rounded border border-emerald-500/30">
            N-01: OK
          </span>
        </div>

        {/* Node 2 - Active Detection Blip */}
        <div className="absolute top-[62%] right-[30%] group cursor-pointer">
          <div className="relative flex items-center justify-center">
            <span className="absolute h-6 w-6 rounded-full bg-amber-500/40 animate-ping" />
            <span className="h-3 w-3 rounded-full bg-amber-400 shadow-[0_0_12px_#f59e0b]" />
          </div>
          <span className="absolute -top-4 -right-10 whitespace-nowrap text-[9px] font-mono text-amber-300 bg-black/70 px-1 py-0.5 rounded border border-amber-500/40">
            N-04: SUB-SURFACE [24Hz]
          </span>
        </div>

        {/* Node 3 */}
        <div className="absolute bottom-[22%] left-[45%] group cursor-pointer">
          <div className="relative flex items-center justify-center">
            <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#06b6d4]" />
          </div>
          <span className="absolute -bottom-4 -left-4 whitespace-nowrap text-[9px] font-mono text-cyan-300 bg-black/60 px-1 py-0.5 rounded border border-cyan-500/30">
            N-07: MESH RELAY
          </span>
        </div>

        {/* Center Sector Gateway */}
        <div className="relative flex flex-col items-center justify-center z-10">
          <div className="h-3.5 w-3.5 rounded-full bg-white border-2 border-emerald-400 shadow-[0_0_12px_#ffffff]" />
          <span className="mt-1 text-[9px] font-mono font-bold text-white bg-slate-900/80 px-1.5 py-0.5 rounded border border-slate-700">
            GATEWAY-1
          </span>
        </div>
      </div>

      {/* Footer Telemetry */}
      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[10px] font-mono text-slate-400">
        <div>NODES LINKED: <span className="text-emerald-400 font-bold">16/16</span></div>
        <div>MESH ENCRYPTION: <span className="text-cyan-400 font-bold">AES-256</span></div>
        <div>RF EMISSIONS: <span className="text-emerald-400 font-bold">0.00 dBm (PASSIVE)</span></div>
      </div>
    </div>
  );
}
