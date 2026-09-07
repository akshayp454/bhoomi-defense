"use client";

import React, { useState } from "react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { motion } from "framer-motion";
import { Radio, Shield, Network, Server, Monitor, Sun, Zap, ArrowRight, Plane } from "lucide-react";

export function SystemArchitectureSection() {
  const [selectedComponent, setSelectedComponent] = useState<number>(0);

  const components = [
    {
      id: 0,
      title: "Buried Sensor Nodes",
      badge: "TIER 1: SENSING LAYER",
      description:
        "100 ruggedised IP67 nodes per 5km sector deployed in a 50m zig-zag pattern. Houses a 4.5 Hz vertical geophone, Knowles MEMS acoustic array, ARM Cortex-M7 edge MCU running INT8 1D-CNN inference, 10Ah LiFePO4 battery, and encrypted LoRa transceiver.",
      specs: [
        "Sensors: SM-6 4.5 Hz Geophone + MEMS Knowles acoustic array",
        "Compute: STM32H7 Cortex-M7 @ 480MHz (18ms INT8 inference)",
        "Power: 10Ah LiFePO4 + 5W monocrystalline solar (>7 days no-sun autonomy)",
        "Enclosure: Polyurethane-potted IP67 casing + 100mm ground stake",
      ],
    },
    {
      id: 1,
      title: "Edge Gateway & TDOA Mesh",
      badge: "TIER 2: EDGE PROCESSING",
      description:
        "Sector Gateway running on Raspberry Pi CM4 with SX1303 LoRa concentrator. Receives 42-byte binary payloads from 100 mesh nodes, solves Levenberg-Marquardt Non-Linear Least Squares TDOA equations (<10m error), and runs Bayesian Decision Fusion.",
      specs: [
        "Baseband: Semtech SX1303 8-channel concurrent LoRa reception",
        "TDOA Engine: Levenberg-Marquardt non-linear solver (sub-10m radial accuracy)",
        "Timing: U-blox MAX-M10S GPS PPS (<30ns synchronization jitter)",
        "Backhaul: Quectel LTE Cat 4 modem with automatic SATCOM failover",
      ],
    },
    {
      id: 2,
      title: "Autonomous Drone Docks & VTOL UAVs",
      badge: "TIER 3: AERIAL RESPONSE LAYER",
      description:
        "5 Autonomous Weatherproof Docking Stations per 5km sector. Once the Gateway Bayesian threat confidence exceeds 0.75, the dock retracts its lid in <3s and launches a self-controlled VTOL quadcopter in <15s directly to the pinpointed TDOA coordinates for thermal verification.",
      specs: [
        "Docks: 5 units per 5km sector, IP65 marine aluminum, Qi wireless charging",
        "Launch Latency: < 15 seconds from ground seismic trigger to airborne",
        "UAV Payload: FLIR Boson 640 Thermal Core (640x512) + 4K Electro-Optical",
        "UAV Endurance & Range: 35 minutes continuous flight, 5 km radius, 15 m/s wind tolerance",
      ],
    },
    {
      id: 3,
      title: "Command & Control Dashboard",
      badge: "TIER 4: C2 TACTICAL OPERATIONS",
      description:
        "High-performance tactical command portal engineered for Sector Commanders and Battalion HQ. Displays real-time military grid overlays (MapLibre GL), live UAV thermal/optical video streams, node telemetry, and automated Quick Reaction Force (QRF) dispatch vectors.",
      specs: [
        "System Latency: < 2 seconds from ground wave impact to C2 alert",
        "Live Video: Low-latency WebRTC / RTSP thermal stream from dispatched UAV",
        "Integration: Compatible with Indian Army GIS and C4I command systems",
        "Audit Trail: Immutable TimescaleDB ledger of all seismic & aerial detections",
      ],
    },
  ];

  return (
    <section className="py-24 bg-[#06080e] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-xs font-mono text-cyan-400 mb-4">
              <Network className="w-3.5 h-3.5" />
              <span>4-TIER TRI-DOMAIN ARCHITECTURE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              BHOOMI™ System Architecture
            </h2>
            <p className="mt-4 text-sm sm:text-base text-slate-400 leading-relaxed">
              From subterranean micro-vibrations and edge TDOA localization to self-controlled aerial drone interceptors and central C2 operations — an integrated 4-tier system engineered by <strong className="text-slate-200">NaX Nova LLP</strong>.
            </p>
          </div>
        </ScrollReveal>

        {/* Interactive Architecture Flowchart */}
        <ScrollReveal delay={0.2}>
          <div className="p-6 sm:p-8 rounded-2xl bg-[#090e18] border border-slate-800 shadow-2xl">
            {/* The 4 Architectural Blocks */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
              {components.map((comp, idx) => {
                const isSelected = selectedComponent === comp.id;
                return (
                  <button
                    key={comp.id}
                    onClick={() => setSelectedComponent(comp.id)}
                    className={`relative text-left p-5 rounded-xl border transition-all duration-300 ${
                      isSelected
                        ? "bg-slate-900 border-emerald-500/80 shadow-[0_0_20px_rgba(16,185,129,0.2)] ring-1 ring-emerald-500/50"
                        : "bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-900/80"
                    }`}
                  >
                    {/* Step Number & Connector */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-bold">
                        TIER 0{idx + 1}
                      </span>
                      {idx < 3 && (
                        <ArrowRight className="w-4 h-4 text-slate-600 hidden md:block" />
                      )}
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      {idx === 0 && <Radio className="w-4 h-4 text-emerald-400" />}
                      {idx === 1 && <Server className="w-4 h-4 text-cyan-400" />}
                      {idx === 2 && <Plane className="w-4 h-4 text-amber-400" />}
                      {idx === 3 && <Monitor className="w-4 h-4 text-purple-400" />}
                      <h4 className="text-sm font-bold text-white tracking-wide">
                        {comp.title}
                      </h4>
                    </div>

                    <span className="text-[10px] font-mono text-slate-400 block mb-3">
                      {comp.badge}
                    </span>

                    <div className="text-[11px] text-slate-400 line-clamp-2">
                      {comp.description}
                    </div>

                    {isSelected && (
                      <motion.div
                        layoutId="activePill"
                        className="absolute -bottom-[1px] left-4 right-4 h-0.5 bg-emerald-400"
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Selected Component Deep Dive */}
            <motion.div
              key={selectedComponent}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-8 p-6 rounded-xl bg-slate-950/80 border border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
            >
              <div className="lg:col-span-7 space-y-3">
                <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>DEEP ARCHITECTURAL BREAKDOWN</span>
                </div>
                <h3 className="text-xl font-bold text-white">
                  {components[selectedComponent].title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {components[selectedComponent].description}
                </p>
              </div>

              <div className="lg:col-span-5 bg-[#0b101c] p-4 rounded-xl border border-slate-800/80">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block mb-3">
                  SYSTEM SPECIFICATIONS
                </span>
                <ul className="space-y-2">
                  {components[selectedComponent].specs.map((spec, i) => (
                    <li key={i} className="text-xs font-mono text-slate-300 flex items-start gap-2">
                      <span className="text-emerald-400 mt-0.5">▹</span>
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
