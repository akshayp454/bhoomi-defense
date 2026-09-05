"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { RadarSweep } from "@/components/animations/RadarSweep";
import { Shield, Radio, ArrowRight, Zap, Target, Lock, FileText, CheckCircle2 } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-screen pt-32 pb-20 overflow-hidden bg-[#06080e] bg-tactical-grid flex items-center">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[300px] bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Mission Brief & Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            {/* Top Grant Badge */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-emerald-500/40 text-xs font-mono text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.15)]"
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>iDEX OPEN CHALLENGE • DEFENCE INNOVATION ORGANISATION</span>
            </motion.div>

            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
                BHOOMI
                <span className="block text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-300 bg-clip-text text-transparent mt-2">
                  Passive Seismic–Acoustic Fusion Network
                </span>
              </h1>
              <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-sans">
                Real-time, zero-emission detection of <strong className="text-white">sub-surface tunnel excavation</strong> and <strong className="text-white">stealth border infiltration</strong> during low-visibility fog, heavy rain, and dense canopy along India&apos;s LoC and LAC.
              </p>
            </motion.div>

            {/* Key Proposal Capability Chips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 font-mono text-xs"
            >
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="text-slate-500 text-[10px] uppercase">SENSING MODE</div>
                <div className="text-emerald-400 font-bold mt-0.5">100% PASSIVE</div>
                <div className="text-[10px] text-slate-400">Zero RF detectability</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="text-slate-500 text-[10px] uppercase">TARGET DETECTION</div>
                <div className="text-cyan-400 font-bold mt-0.5">SUB-SURFACE</div>
                <div className="text-[10px] text-slate-400">Tunnels & Footsteps</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 col-span-2 sm:col-span-1">
                <div className="text-slate-500 text-[10px] uppercase">GRANT VALUE</div>
                <div className="text-amber-400 font-bold mt-0.5">₹1.30 Cr BUDGET</div>
                <div className="text-[10px] text-slate-400">TRL 2 → TRL 6/7</div>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 pt-4"
            >
              <Link
                href="/#simulation"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm tracking-wide transition-all shadow-[0_0_25px_rgba(16,185,129,0.3)] group"
              >
                <Zap className="w-4 h-4 fill-current" />
                <span>LAUNCH SIMULATION</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700 font-mono text-xs tracking-wider transition-all"
              >
                <FileText className="w-4 h-4 text-emerald-400" />
                <span>GRANT BRIEFING PORTAL</span>
              </Link>

              <Link
                href="/technology"
                className="inline-flex items-center gap-2 px-4 py-3.5 text-xs text-slate-400 hover:text-emerald-300 font-mono transition-colors"
              >
                <span>System Architecture →</span>
              </Link>
            </motion.div>

            {/* Evaluator Assurance */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center gap-6 pt-2 text-[11px] text-slate-500 font-mono border-t border-slate-800/80"
            >
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Indigenously Developed</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>MoD Atmanirbhar Bharat Aligned</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Tactical Radar Sweep HUD */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <RadarSweep activeSector="SECTOR 04 (LoC NORTH)" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
