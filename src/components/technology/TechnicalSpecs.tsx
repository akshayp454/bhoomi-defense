"use client";

import React from "react";
import { Check, ShieldCheck, Zap, Radio, Battery, Thermometer } from "lucide-react";

export function TechnicalSpecs() {
  const specs = [
    { category: "Seismic Sensing", param: "Frequency Bandwidth", val: "0.5 Hz – 100 Hz (P-wave & S-wave sensitivity)" },
    { category: "Seismic Sensing", param: "Dynamic Range", val: "&gt; 96 dB with low-noise instrumentation ADC" },
    { category: "Acoustic Sensing", param: "Microphone Type", val: "Industrial MEMS, hydrophobic ePTFE vent" },
    { category: "Acoustic Sensing", param: "Frequency Response", val: "20 Hz – 10,000 Hz acoustic bandwidth" },
    { category: "Edge AI Processing", param: "Inference Engine", val: "Quantized TinyML / CMSIS-NN runtime" },
    { category: "Edge AI Processing", param: "Classification Latency", val: "&lt; 15 ms per classification window" },
    { category: "Telemetry & Mesh", param: "Communication Type", val: "Multi-hop encrypted LoRa mesh (865–867 MHz)" },
    { category: "Telemetry & Mesh", param: "Payload Encryption", val: "Hardware AES-256 CTR authenticated encryption" },
    { category: "Telemetry & Mesh", param: "Hop-to-Hop Distance", val: "800m – 1,500m (dependent on terrain topography)" },
    { category: "Power & Autonomy", param: "Battery Chemistry", val: "LiFePO4 3.2V 3200 mAh (2000+ charge cycles)" },
    { category: "Power & Autonomy", param: "Solar Cell", val: "1.5W tempered monocrystalline with MPPT charging" },
    { category: "Power & Autonomy", param: "No-Sun Autonomy", val: "14+ days duty-cycled continuous operation" },
    { category: "Physical & Ruggedness", param: "Enclosure Ingress", val: "IP67 hermetically sealed high-impact ABS / alloy" },
    { category: "Physical & Ruggedness", param: "Operating Temperature", val: "-20°C to +60°C (High-altitude & desert rated)" },
  ];

  return (
    <div className="rounded-2xl border border-slate-800 bg-[#090d16] p-6 sm:p-8 shadow-2xl">
      <div className="flex items-center justify-between pb-6 border-b border-slate-800">
        <div>
          <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider block mb-1">
            VERIFIED BENCHMARKS
          </span>
          <h3 className="text-2xl font-bold text-white tracking-tight">
            Technical Engineering Specifications
          </h3>
        </div>
        <span className="text-xs font-mono text-slate-400 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-700">
          DOC REF: BHOOMI-TECH-SPEC-V2
        </span>
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 font-mono text-[11px]">
              <th className="py-3 px-4 uppercase">Subsystem Domain</th>
              <th className="py-3 px-4 uppercase">Parameter</th>
              <th className="py-3 px-4 uppercase">Specification Value</th>
              <th className="py-3 px-4 uppercase text-right">Compliance</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {specs.map((spec, i) => (
              <tr key={i} className="hover:bg-slate-900/30 transition-colors">
                <td className="py-3.5 px-4 font-mono text-emerald-400 font-semibold">
                  {spec.category}
                </td>
                <td className="py-3.5 px-4 text-slate-200 font-medium">
                  {spec.param}
                </td>
                <td className="py-3.5 px-4 text-slate-400 font-mono">
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
