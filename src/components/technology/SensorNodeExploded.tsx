"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Radio, Sun, Shield, Layers, Disc, Zap, Check } from "lucide-react";

export function SensorNodeExploded() {
  const [activeLayer, setActiveLayer] = useState<number>(0);

  const layers = [
    {
      id: 0,
      title: "Geophone Micro-Vibration Sensor",
      icon: Disc,
      tag: "SEISMIC CHANNEL",
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/20",
      description:
        "High-sensitivity vertical geophone coil anchored directly to the ground stake. Captures sub-audible mechanical ground waves (0.5 Hz - 100 Hz) caused by subterranean digging, shoveling, pickaxes, and human footfalls.",
      details: [
        "Natural frequency: 4.5 Hz to 10 Hz",
        "Coil resistance: 375 Ω ± 5%",
        "Sensitivity: 28.8 V/m/s (high precision P/S wave fidelity)",
        "Coupling: Direct acoustic ground stake coupling impedance",
      ],
    },
    {
      id: 1,
      title: "Ultra-Low-Power Edge-AI Microcontroller",
      icon: Cpu,
      tag: "COMPUTE & INFERENCE",
      color: "text-cyan-400",
      bgColor: "bg-cyan-500/20",
      description:
        "Low-power ARM Cortex-M33 with embedded vector neural accelerators. Executes 8-bit quantized sensor fusion models on-node in &lt;15ms without sending raw high-bandwidth audio over the radio network.",
      details: [
        "Processor: 32-bit Cortex-M33 @ 96 MHz",
        "RAM / Flash: 512 KB SRAM / 2 MB Flash",
        "Inference latency: 14.2 ms per classification cycle",
        "Active power draw: &lt;18 mW during classification",
      ],
    },
    {
      id: 2,
      title: "MEMS Acoustic Signature Microphone",
      icon: Layers,
      tag: "ACOUSTIC CHANNEL",
      color: "text-amber-400",
      bgColor: "bg-amber-500/20",
      description:
        "Surface acoustic transducer with weather-proof acoustic membrane. Captures airborne sound pressure levels from 20 Hz to 10 kHz, enabling cross-verification against surface footsteps, vehicle motors, or atmospheric wind noise.",
      details: [
        "Dynamic Range: 104 dB SPL",
        "SNR: 65 dBA high fidelity",
        "Protection: Hydrophobic ePTFE acoustic vent (IP67)",
        "Frequency response: Flat 50 Hz - 8000 Hz",
      ],
    },
    {
      id: 3,
      title: "Encrypted LoRa Mesh Radio Transceiver",
      icon: Radio,
      tag: "COMMUNICATIONS",
      color: "text-purple-400",
      bgColor: "bg-purple-500/20",
      description:
        "Tactical sub-GHz mesh transceiver. Transmits only brief, encrypted alert packets when a confirmed threat is classified, maintaining zero RF battlefield signature during silent background listening.",
      details: [
        "Frequency: 865 - 867 MHz (India de-licensed defence band)",
        "Transmit power: Adaptive 14 dBm to 20 dBm",
        "Encryption: AES-256 CTR hardware acceleration",
        "Hop latency: ~120 ms per relay node",
      ],
    },
    {
      id: 4,
      title: "Solar Energy Harvesting & LiFePO4 Buffer",
      icon: Sun,
      tag: "POWER SYSTEM",
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/20",
      description:
        "Monocrystalline solar cell integrated with an MPPT charge controller and high-cycle LiFePO4 battery buffer sized for 14-day continuous operation even under dense monsoonal cloud cover or winter fog.",
      details: [
        "Battery capacity: 3.2V 3200 mAh LiFePO4 (2000+ cycles)",
        "Solar input: 1.5W tempered monocrystalline panel",
        "Operating temp: -20°C to +60°C (High-altitude tested)",
        "Autonomy: 14+ days continuous cloudy/fog operation",
      ],
    },
  ];

  return (
    <div className="w-full rounded-2xl border border-slate-800 bg-[#090d16] p-6 sm:p-8 shadow-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider block mb-1">
            EXPLODED HARDWARE ARCHITECTURE
          </span>
          <h3 className="text-2xl font-bold text-white tracking-tight">
            The BHOOMI Autonomous Sensor Node
          </h3>
        </div>
        <div className="text-xs font-mono text-slate-400 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-700">
          FORM FACTOR: RUGGEDIZED GROUND SPIKE
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Layer Selector List */}
        <div className="lg:col-span-5 space-y-2.5">
          {layers.map((layer) => {
            const isSelected = activeLayer === layer.id;
            const Icon = layer.icon;
            return (
              <button
                key={layer.id}
                onClick={() => setActiveLayer(layer.id)}
                className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-left transition-all ${
                  isSelected
                    ? "bg-slate-800/90 border-emerald-500/60 shadow-[0_0_15px_rgba(16,185,129,0.15)] ring-1 ring-emerald-500/30"
                    : "bg-slate-900/40 border-slate-800/80 hover:bg-slate-800/40 hover:border-slate-700"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${layer.bgColor} ${layer.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-slate-500 block uppercase">
                      {layer.tag}
                    </span>
                    <span className={`text-xs sm:text-sm font-semibold ${isSelected ? "text-white" : "text-slate-300"}`}>
                      {layer.title}
                    </span>
                  </div>
                </div>
                {isSelected && <span className="h-2 w-2 rounded-full bg-emerald-400" />}
              </button>
            );
          })}
        </div>

        {/* Selected Layer Display Card */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeLayer}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="p-6 rounded-2xl bg-slate-950 border border-slate-800 shadow-xl space-y-5"
            >
              <div className="flex items-center justify-between">
                <span className={`text-xs font-mono font-bold uppercase tracking-wider ${layers[activeLayer].color}`}>
                  {layers[activeLayer].tag}
                </span>
                <span className="text-[10px] font-mono text-slate-500 px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                  NODE SUBSYSTEM 0{activeLayer + 1}
                </span>
              </div>

              <h4 className="text-xl font-bold text-white">
                {layers[activeLayer].title}
              </h4>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {layers[activeLayer].description}
              </p>

              <div className="pt-3 border-t border-slate-850">
                <span className="text-[11px] font-mono text-slate-400 block mb-2 font-semibold">
                  TECHNICAL SPECIFICATIONS:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {layers[activeLayer].details.map((detail, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs font-mono text-slate-300 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
