"use client";

import React, { useState } from "react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { motion } from "framer-motion";
import { Radio, Shield, Network, Server, Monitor, Sun, Zap, ArrowRight } from "lucide-react";

export function SystemArchitectureSection() {
  const [selectedComponent, setSelectedComponent] = useState<number>(0);

  const components = [
    {
      id: 0,
      title: "Buried Sensor Nodes",
      badge: "EDGE SENSING LAYER",
      description:
        "Ruggedised IP67 nodes buried or staked at shallow depth along border perimeters. Houses a high-sensitivity geophone, MEMS microphone, low-power edge MCU, solar harvesting cell, and encrypted mesh transceiver.",
      specs: [
        "Sensors: Geophone (0.5–100 Hz) + MEMS acoustic mic",
        "Compute: Cortex-M33 ultra-low-power Edge AI MCU",
        "Power: Solar cell + LiFePO4 multi-day battery buffer",
        "Enclosure: IP67 hermetically sealed ground spike",
      ],
    },
    {
      id: 1,
      title: "Encrypted Mesh Relay Layer",
      badge: "ZERO-BACKHAUL RELAY",
      description:
        "Hop-to-hop LoRa-class encrypted mesh communication. Each node acts as a micro-router, forwarding classified threat packets without requiring high-power cellular or satellite transceivers at individual node points.",
      specs: [
        "Protocol: Multi-hop mesh topology with dynamic rerouting",
        "Encryption: Hardware AES-256 encrypted payload",
        "Frequency: Sub-GHz tactical telemetry band",
        "Range: 800m - 1.5km node-to-node hop distance",
      ],
    },
    {
      id: 2,
      title: "Sector Gateway",
      badge: "DATA AGGREGATION & UPLINK",
      description:
        "Positioned at secure tactical posts or high ground, the sector gateway aggregates telemetry from 30–50 mesh nodes, fuses multi-node spatial correlation, and transmits alerts via military satellite or fiber backhaul.",
      specs: [
        "Capacity: Up to 64 active mesh nodes per gateway",
        "Backhaul: Dual SATCOM / Mil-spec UHF / Tactical Ethernet",
        "Processing: Sector-level spatial triangulation",
        "Power: Solar + 24V tactical DC battery backup",
      ],
    },
    {
      id: 3,
      title: "Command Post Tactical Dashboard",
      badge: "INTEGRATED C4I INTERFACE",
      description:
        "Command personnel receive instant threat visualizations showing geographic coordinates, threat type (digging vs foot movement vs vehicle), confidence percentage, and automated QRF (Quick Reaction Force) dispatch vectors.",
      specs: [
        "Latency: &lt;2.5 seconds from physical ground impact to UI alert",
        "Visualization: 2D/3D border terrain overlay with heatmaps",
        "Integration: Compatible with Indian Army GIS and C4I systems",
        "Audit Trail: Immutable forensic log of all seismic anomalies",
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
              <span>FIGURE 1: DISTRIBUTED MULTI-TIER MESH TOPOLOGY</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              BHOOMI System Architecture
            </h2>
            <p className="mt-4 text-sm sm:text-base text-slate-400 leading-relaxed">
              From subterranean micro-vibrations to the central command dashboard — an end-to-end resilient architecture engineered for remote high-altitude and heavily forested battlegrounds.
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
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                        TIER 0{idx + 1}
                      </span>
                      {idx < 3 && (
                        <ArrowRight className="w-4 h-4 text-slate-600 hidden md:block" />
                      )}
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      {idx === 0 && <Radio className="w-4 h-4 text-emerald-400" />}
                      {idx === 1 && <Network className="w-4 h-4 text-cyan-400" />}
                      {idx === 2 && <Server className="w-4 h-4 text-amber-400" />}
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
