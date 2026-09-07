"use client";

import React, { useState } from "react";
import { Check, ShieldCheck, Zap, Radio, Battery, Thermometer, Plane } from "lucide-react";

export function TechnicalSpecs() {
  const [filter, setFilter] = useState<string>("all");

  const specs = [
    { category: "Seismic Sensing", domain: "ground", param: "Geophone Transducer", val: "SM-6 / GS-20DX 4.5 Hz vertical coil (28.8 V/m/s)" },
    { category: "Seismic Sensing", domain: "ground", param: "Frequency Bandwidth", val: "0.5 Hz – 100 Hz (P-wave, S-wave, Rayleigh wave sensitivity)" },
    { category: "Seismic Sensing", domain: "ground", param: "Analog Front-End ADC", val: "Texas Instruments ADS1256 24-bit Delta-Sigma (0.2 µV RMS noise floor)" },
    { category: "Acoustic Sensing", domain: "ground", param: "Microphone Transducer", val: "Knowles SPH0645LM4H MEMS array (SNR 65dB, 130 dB SPL)" },
    { category: "Acoustic Sensing", domain: "ground", param: "Frequency Response", val: "20 Hz – 10,000 Hz acoustic bandwidth with ePTFE IP67 vent" },
    { category: "Edge AI Processing", domain: "ground", param: "Microcontroller Unit", val: "STM32H743VI ARM Cortex-M7 @ 480MHz (2MB Flash, 1MB SRAM)" },
    { category: "Edge AI Processing", domain: "ground", param: "Neural Architecture", val: "INT8 Quantized 1D-CNN (142 KB model size, 98 KB RAM)" },
    { category: "Edge AI Processing", domain: "ground", param: "Inference Latency & Acc", val: "18 ms inference cycle; 93.1% weighted F1 accuracy" },
    { category: "Telemetry & Mesh", domain: "ground", param: "LoRa Mesh Protocol", val: "Custom TDMA AODV encrypted mesh (865–867 MHz Indian ISM)" },
    { category: "Telemetry & Mesh", domain: "ground", param: "TDOA Triangulation", val: "Levenberg-Marquardt non-linear solver (< 9.5m radial error)" },
    { category: "Autonomous Drone Dock", domain: "aerial", param: "Dock Housing & Sealing", val: "Marine-grade aluminum IP65 weatherproof enclosure" },
    { category: "Autonomous Drone Dock", domain: "aerial", param: "Lid Actuation Speed", val: "Motorized linear actuator opens sliding roof in < 3.0 seconds" },
    { category: "Autonomous Drone Dock", domain: "aerial", param: "Wireless Charging", val: "15W Qi inductive resonant pads (Zero exposed electrical contacts)" },
    { category: "Autonomous Drone Dock", domain: "aerial", param: "Climate Regulation", val: "Peltier thermoelectric HVAC maintains 15°C–25°C in -40°C to +50°C" },
    { category: "Autonomous Drone Dock", domain: "aerial", param: "Precision Recovery", val: "Downward IR beacon lock + pneumatic V-rails (< 2cm landing accuracy)" },
    { category: "VTOL Interceptor UAV", domain: "aerial", param: "Airframe & Materials", val: "Quadcopter VTOL Toray T700 carbon-fiber composite (1.85 kg TOW)" },
    { category: "VTOL Interceptor UAV", domain: "aerial", param: "Cued Launch Latency", val: "< 15 seconds from ground seismic trigger to airborne ascent" },
    { category: "VTOL Interceptor UAV", domain: "aerial", param: "Flight Endurance & Range", val: "35 minutes continuous loiter; 5 km operational radius" },
    { category: "VTOL Interceptor UAV", domain: "aerial", param: "Wind Tolerance & Alt", val: "15 m/s wind resistance (54 km/h); operational up to 4,500m ASL" },
    { category: "VTOL Interceptor UAV", domain: "aerial", param: "Targeting Payload", val: "FLIR Boson 640x512 LWIR thermal core (8-14µm) + 4K EO camera" },
    { category: "VTOL Interceptor UAV", domain: "aerial", param: "Airborne Relay", val: "Sub-GHz LoRa mesh repeater for ravine coverage expansion" },
    { category: "Power & Autonomy", domain: "power", param: "Node Battery Chemistry", val: "LiFePO4 3.3V 10,000 mAh (33,000 mWh, 2000+ charge cycles)" },
    { category: "Power & Autonomy", domain: "power", param: "Node Solar Harvesting", val: "5W monocrystalline panel with CN3791 MPPT regulator" },
    { category: "Power & Autonomy", domain: "power", param: "No-Sun Autonomy", val: "> 7 days continuous operation during complete solar blackout" },
    { category: "Sector Kit Modular SKU", domain: "sector", param: "5KM Sector Kit Contents", val: "100 Sensor Nodes + 1 Sector Gateway + 5 Drone Docks + 5 VTOL UAVs" },
    { category: "Environmental Standards", domain: "env", param: "MIL-STD Qualification", val: "MIL-STD-810H (High/Low Temp -40°C to +70°C, Shock 40g, Sand/Dust)" },
  ];

  const filteredSpecs =
    filter === "all" ? specs : specs.filter((s) => s.domain === filter);

  return (
    <div className="rounded-2xl border border-slate-800 bg-[#090d16] p-6 sm:p-8 shadow-2xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider block mb-1">
            VERIFIED MILITARY-GRADE BENCHMARKS
          </span>
          <h3 className="text-2xl font-bold text-white tracking-tight">
            Technical Engineering Specifications
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Compliant with MIL-STD-810H and Indian Defense procurement standards (PDD v1.0)
          </p>
        </div>
        <div className="text-xs font-mono text-slate-400 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-700">
          DOC REF: BHOOMI-PDD-V1.0
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 pt-1">
        {[
          { id: "all", label: "ALL SUBSYSTEMS" },
          { id: "ground", label: "GROUND SENSOR NODES" },
          { id: "aerial", label: "AUTONOMOUS DRONE & DOCK" },
          { id: "power", label: "POWER & AUTONOMY" },
          { id: "sector", label: "SECTOR KIT ARCHITECTURE" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              filter === tab.id
                ? "bg-emerald-500 text-slate-950 font-bold shadow-[0_0_12px_rgba(16,185,129,0.3)]"
                : "bg-slate-900/80 text-slate-400 border border-slate-800 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-900/40 text-slate-400 font-mono text-[11px]">
              <th className="py-3 px-4 uppercase">Subsystem Domain</th>
              <th className="py-3 px-4 uppercase">Parameter</th>
              <th className="py-3 px-4 uppercase">Specification Value (PDD v1.0)</th>
              <th className="py-3 px-4 uppercase text-right">Compliance</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {filteredSpecs.map((spec, i) => (
              <tr key={i} className="hover:bg-slate-900/30 transition-colors">
                <td className="py-3.5 px-4 font-mono text-emerald-400 font-semibold">
                  {spec.category}
                </td>
                <td className="py-3.5 px-4 text-slate-200 font-medium">
                  {spec.param}
                </td>
                <td className="py-3.5 px-4 text-slate-300 font-mono">
                  {spec.val}
                </td>
                <td className="py-3.5 px-4 text-right">
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/30">
                    <Check className="w-3 h-3" /> VERIFIED
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
