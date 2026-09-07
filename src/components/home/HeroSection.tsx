"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { RadarSweep } from "@/components/animations/RadarSweep";
import { DroneInterceptorHUD } from "@/components/animations/DroneInterceptorHUD";
import {
  Shield,
  Radio,
  ArrowRight,
  Zap,
  Target,
  FileText,
  CheckCircle2,
  ChevronRight,
  Flame,
  Plane,
  Eye
} from "lucide-react";

export function HeroSection() {
  const [hudView, setHudView] = useState<"drone" | "radar">("drone");

  return (
    <section className="relative min-h-screen pt-32 pb-20 overflow-hidden bg-[#06080e] bg-tactical-grid flex items-center">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[300px] bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Product Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            {/* Top Company & Product Badge */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-emerald-500/40 text-xs font-mono text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.15)]"
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-bold tracking-wider">NAX NOVA LLP</span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-300">TRI-DOMAIN DEFENCE DEEPTECH</span>
            </motion.div>

            {/* Main Product Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <span className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight font-mono">
                  BHOOMI<span className="text-emerald-400 text-3xl align-top">™</span>
                </span>
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-500/40">
                  V1.0 MULTI-DOMAIN INFRASTRUCTURE
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-300 bg-clip-text text-transparent">
                Passive Ground Mesh & Autonomous Drone Interceptors
              </h2>

              <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-sans">
                Engineered by <strong className="text-white">NaX Nova LLP</strong>, BHOOMI™ delivers persistent 100% passive detection of <strong className="text-white">sub-surface tunnel excavation</strong> and <strong className="text-white">stealth border infiltration</strong>. When a threat alarm is raised, the platform automatically cues and launches a <strong className="text-emerald-400">self-controlled VTOL drone</strong> to the pinpointed TDOA coordinates in <strong className="text-white">&lt;15 seconds</strong> for instant thermal aerial verification.
              </p>
            </motion.div>

            {/* Product Capability Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 font-mono text-xs"
            >
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/30 transition-colors">
                <div className="text-slate-500 text-[10px] uppercase font-semibold">DETECTION</div>
                <div className="text-emerald-400 font-bold mt-0.5">100% PASSIVE</div>
                <div className="text-[10px] text-slate-400">Zero RF signature</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/30 transition-colors">
                <div className="text-slate-500 text-[10px] uppercase font-semibold">TUNNEL DEPTH</div>
                <div className="text-cyan-400 font-bold mt-0.5">UP TO 15M</div>
                <div className="text-[10px] text-slate-400">Rayleigh & P/S waves</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/30 transition-colors">
                <div className="text-slate-500 text-[10px] uppercase font-semibold">CUED DRONE</div>
                <div className="text-amber-400 font-bold mt-0.5">&lt; 15 SEC LAUNCH</div>
                <div className="text-[10px] text-slate-400">Auto-dispatched on alarm</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-purple-500/30 transition-colors">
                <div className="text-slate-500 text-[10px] uppercase font-semibold">THERMAL CORE</div>
                <div className="text-purple-400 font-bold mt-0.5">FLIR BOSON 640</div>
                <div className="text-[10px] text-slate-400">Night / fog visual lock</div>
              </div>
            </motion.div>

            {/* Product CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-3 pt-3"
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-sm tracking-wide transition-all shadow-[0_0_25px_rgba(16,185,129,0.35)] group"
              >
                <Radio className="w-4 h-4 fill-current" />
                <span>BOOK LIVE DEMONSTRATION</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/product-doc"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-cyan-950/40 hover:bg-cyan-900/50 text-cyan-300 border border-cyan-500/40 font-mono text-xs tracking-wider transition-all"
              >
                <FileText className="w-4 h-4 text-cyan-400" />
                <span>PRODUCT DESIGN DOC (PDD v1.0)</span>
              </Link>

              <Link
                href="/#simulation"
                className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-700 font-mono text-xs tracking-wider transition-all"
              >
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>DRONE SIMULATOR</span>
              </Link>
            </motion.div>

            {/* Enterprise Credentials */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center gap-6 pt-3 text-[11px] text-slate-500 font-mono border-t border-slate-800/80"
            >
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>NaX Nova Proprietary IP</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Autonomous VTOL Drone Response Layer</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>5KM Modular Sector Kit Ready</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Eye-Catching Drone Interceptor HUD with Radar Toggle */}
          <div className="lg:col-span-5 space-y-3">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              {/* HUD Selector Tabs */}
              <div className="flex items-center justify-between mb-2 px-1">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setHudView("drone")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold tracking-wider transition-all ${
                      hudView === "drone"
                        ? "bg-emerald-500 text-slate-950 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                        : "bg-slate-900 text-slate-400 border border-slate-800 hover:text-white"
                    }`}
                  >
                    <Plane className="w-3.5 h-3.5" />
                    <span>AUTONOMOUS VTOL DRONE</span>
                    <span className="ml-1 px-1 py-0.2 rounded bg-black/40 text-[9px]">LIVE</span>
                  </button>

                  <button
                    onClick={() => setHudView("radar")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold tracking-wider transition-all ${
                      hudView === "radar"
                        ? "bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                        : "bg-slate-900 text-slate-400 border border-slate-800 hover:text-white"
                    }`}
                  >
                    <Radio className="w-3.5 h-3.5" />
                    <span>SEISMIC RADAR</span>
                  </button>
                </div>

                <span className="text-[10px] font-mono text-emerald-400 hidden sm:inline animate-pulse">
                  ● MESH ONLINE
                </span>
              </div>

              {/* Display HUD View */}
              <AnimatePresence mode="wait">
                {hudView === "drone" ? (
                  <motion.div
                    key="drone-hud"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <DroneInterceptorHUD />
                  </motion.div>
                ) : (
                  <motion.div
                    key="radar-hud"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <RadarSweep activeSector="SECTOR 04 (LoC NORTH) — BHOOMI MESH" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Quick Specification Strip */}
              <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono pt-1 text-slate-400">
                <div className="bg-slate-900/60 p-2 rounded-lg border border-slate-800">
                  <span className="text-slate-500 block text-[9px]">LAUNCH LATENCY</span>
                  <span className="text-emerald-400 font-bold">&lt; 15 SECONDS</span>
                </div>
                <div className="bg-slate-900/60 p-2 rounded-lg border border-slate-800">
                  <span className="text-slate-500 block text-[9px]">THERMAL SENSOR</span>
                  <span className="text-amber-400 font-bold">FLIR BOSON 640</span>
                </div>
                <div className="bg-slate-900/60 p-2 rounded-lg border border-slate-800">
                  <span className="text-slate-500 block text-[9px]">DOCK CHARGING</span>
                  <span className="text-cyan-400 font-bold">QI INDUCTIVE 15W</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
