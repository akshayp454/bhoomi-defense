"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plane, Shield, Zap, Eye, Radio, Thermometer, Check, Layers, Compass, Crosshair } from "lucide-react";

export function DroneDockExploded() {
  const [activeSubsystem, setActiveSubsystem] = useState<number>(0);

  const subsystems = [
    {
      id: 0,
      title: "Weatherproof Enclosure & Climate Control",
      icon: Shield,
      tag: "MECHANICAL HOUSING",
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/20",
      description:
        "Marine-grade aluminum IP65 sealed housing engineered to withstand sandstorms, blizzards, and torrential monsoon downpours. Houses internal Peltier thermoelectric heat-pump to maintain battery cell temperatures between 15°C and 25°C across exterior extremes (-40°C to +50°C).",
      specs: [
        "Ingress Protection: IP65 hermetic marine aluminum casing",
        "Thermal Regulation: Solid-state Peltier cooler/heater (-40°C to +50°C)",
        "Mounting: Hardened base plate for mast, rooftop, or defilade ground installation",
        "Corrosion Shield: Military-grade powder coating with anti-fungal treatment",
      ],
    },
    {
      id: 1,
      title: "High-Speed Motorized Lid Actuation",
      icon: Layers,
      tag: "RAPID LAUNCH MECHANISM",
      color: "text-cyan-400",
      bgColor: "bg-cyan-500/20",
      description:
        "Heavy-duty IP67 industrial linear actuator retracts the sliding roof in under 3 seconds upon receiving a dispatch API command from the Sector Gateway, exposing the launch pad for rapid spool-up.",
      specs: [
        "Actuation Speed: Retracts roof in < 3.0 seconds",
        "Actuator Rating: IP67 dust/water immersion proof",
        "Emergency Release: Manual mechanical override clutch for maintenance",
        "Ice Breaker: Heated track seals prevent freezing in Siachen blizzards",
      ],
    },
    {
      id: 2,
      title: "Qi Wireless Inductive Charging Base",
      icon: Zap,
      tag: "CORROSION-FREE POWER",
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/20",
      description:
        "15W Qi-standard resonant inductive charging eliminates exposed brass pins and copper contacts that inevitably corrode, oxidize, or jam in muddy or freezing border conditions.",
      specs: [
        "Charging Power: 15W resonant inductive transfer",
        "Contact Isolation: Zero exposed electrical contacts (100% sealed)",
        "Charge Time: Rapid top-up from 20% to 90% in 45 minutes",
        "Efficiency: >82% magnetic coupling efficiency through composite base",
      ],
    },
    {
      id: 3,
      title: "Autonomous Centimeter-Precision Landing System",
      icon: Compass,
      tag: "RECOVERY GUIDANCE",
      color: "text-purple-400",
      bgColor: "bg-purple-500/20",
      description:
        "Dual-stage recovery combining downward-facing IR beacon optical homing with physical V-shaped mechanical centering guide rails, ensuring cm-level autonomous dock recovery even in 12 m/s crosswinds.",
      specs: [
        "Optical Guidance: 850nm encoded IR beacon with downward camera lock",
        "Mechanical Centering: Pneumatic V-centering guide rails (<2cm precision)",
        "Crosswind Limit: Autonomous touchdown safe up to 12 m/s crosswinds",
        "Recovery Cycle: Touchdown to lid lock in < 45 seconds",
      ],
    },
    {
      id: 4,
      title: "VTOL Quadcopter Airframe & Propulsion",
      icon: Plane,
      tag: "AERIAL PLATFORM",
      color: "text-amber-400",
      bgColor: "bg-amber-500/20",
      description:
        "Lightweight 400x400mm carbon-fiber reinforced quadcopter optimized for rapid vertical climb and long-loiter thermal surveillance over rugged mountain ridges and ravine corridors.",
      specs: [
        "Airframe: Toray T700 carbon fiber composite (1.85 kg TOW)",
        "Endurance: 35 minutes continuous flight at 45 km/h cruise",
        "Flight Envelope: Up to 4,500m ASL operational altitude",
        "Wind Resistance: Stable hover up to 15 m/s (54 km/h gusts)",
      ],
    },
    {
      id: 5,
      title: "FLIR Boson 640 Thermal + 4K EO Gimbal",
      icon: Crosshair,
      tag: "TARGETING PAYLOAD",
      color: "text-red-400",
      bgColor: "bg-red-500/20",
      description:
        "3-axis gyro-stabilized micro-gimbal equipped with a FLIR Boson 640 Long-Wave Infrared (LWIR) thermal sensor and 4K optical camera. Instantly detects human body heat blooms (37°C) through zero-visibility fog, camouflage, and foliage canopy.",
      specs: [
        "Thermal Sensor: FLIR Boson 640x512 uncooled VOx microbolometer",
        "Spectral Band: 7.5 µm to 13.5 µm (LWIR long-wave infrared)",
        "Optical Sensor: 4K 1/2.8\" Sony CMOS with 10x hybrid zoom",
        "Stabilization: 3-axis brushless gimbal (<0.02° angular jitter)",
      ],
    },
    {
      id: 6,
      title: "Airborne LoRa Mesh Repeater Relay",
      icon: Radio,
      tag: "NETWORK RESILIENCE",
      color: "text-cyan-400",
      bgColor: "bg-cyan-500/20",
      description:
        "When operating in steep Himalayan valleys or deep ravines where ground LoRa line-of-sight is obstructed by mountain spurs, the drone functions as an elevated airborne mesh repeater at 50m AGL, bridging disconnected sensor nodes to the Gateway.",
      specs: [
        "Repeater Band: 865–867 MHz tactical mesh relay",
        "Airborne Gain: Extends ground sensor reach from 2km to 12km LOS",
        "Encryption: End-to-end AES-256 GCM hardware encryption",
        "Bandwidth: Real-time telemetry forwarder + low-latency video link",
      ],
    },
  ];

  const current = subsystems[activeSubsystem];

  return (
    <div className="w-full rounded-2xl border border-slate-800 bg-[#090d16] p-6 sm:p-8 shadow-2xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <span className="text-xs font-mono text-amber-400 uppercase tracking-wider block mb-1">
            TIER 3 AERIAL HARDWARE ARCHITECTURE
          </span>
          <h3 className="text-2xl font-bold text-white tracking-tight">
            Autonomous Drone Dock & VTOL Interceptor
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Weatherproof docking station with &lt;15s cued launch, wireless Qi charging, and FLIR Boson 640 thermal core
          </p>
        </div>
        <div className="text-xs font-mono text-slate-300 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-700">
          5 DOCKS PER 5KM SECTOR KIT
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Subsystem Selector Buttons */}
        <div className="lg:col-span-5 space-y-2">
          {subsystems.map((sub) => {
            const isSelected = activeSubsystem === sub.id;
            const Icon = sub.icon;
            return (
              <button
                key={sub.id}
                onClick={() => setActiveSubsystem(sub.id)}
                className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                  isSelected
                    ? "bg-slate-800/90 border-amber-500/60 shadow-[0_0_15px_rgba(245,158,11,0.15)] ring-1 ring-amber-500/30"
                    : "bg-slate-900/40 border-slate-800/80 hover:bg-slate-800/40 hover:border-slate-700"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${sub.bgColor} ${sub.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 block uppercase">
                      {sub.tag}
                    </span>
                    <span className={`text-xs sm:text-sm font-semibold ${isSelected ? "text-white" : "text-slate-300"}`}>
                      {sub.title}
                    </span>
                  </div>
                </div>
                {isSelected && <span className="h-2 w-2 rounded-full bg-amber-400" />}
              </button>
            );
          })}
        </div>

        {/* Selected Subsystem Detail Card */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSubsystem}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="p-6 rounded-2xl bg-slate-950 border border-slate-800 shadow-xl space-y-5"
            >
              <div className="flex items-center justify-between">
                <span className={`text-xs font-mono font-bold uppercase tracking-wider ${current.color}`}>
                  {current.tag}
                </span>
                <span className="text-[10px] font-mono text-slate-500 px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                  SUBSYSTEM 0{current.id + 1} OF 07
                </span>
              </div>

              <h4 className="text-xl font-bold text-white">
                {current.title}
              </h4>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {current.description}
              </p>

              <div className="pt-3 border-t border-slate-800">
                <span className="text-[11px] font-mono text-slate-400 block mb-2 font-semibold">
                  ENGINEERING SPECIFICATIONS:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {current.specs.map((spec, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 text-xs font-mono text-slate-300 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80"
                    >
                      <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>{spec}</span>
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
