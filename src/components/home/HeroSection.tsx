"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { RadarSweep } from "@/components/animations/RadarSweep";
import { Shield, Radio, ArrowRight, Zap, Target, Lock, FileText, CheckCircle2, ChevronRight } from "lucide-react";

export function HeroSection() {
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
              <span className="text-slate-300">DEFENCE DEEPTECH INNOVATIONS</span>
            </motion.div>

            {/* Main Product Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight font-mono">
                  BHOOMI<span className="text-emerald-400 text-3xl align-top">™</span>
                </span>
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-500/40">
                  DEFENCE SENSOR MESH
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-300 bg-clip-text text-transparent">
                Passive Seismic–Acoustic Fusion Network
              </h2>

              <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-sans">
                Developed by <strong className="text-white">NaX Nova LLP</strong>, BHOOMI™ delivers persistent, zero-emission real-time detection of <strong className="text-white">sub-surface tunnel excavation</strong> and <strong className="text-white">stealth border infiltration</strong> across fog, torrential monsoons, and dense foliage where optical cameras and radars fail.
              </p>
            </motion.div>

            {/* Product Capability Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 font-mono text-xs"
            >
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/30 transition-colors">
                <div className="text-slate-500 text-[10px] uppercase font-semibold">DETECTION METHOD</div>
                <div className="text-emerald-400 font-bold mt-0.5">100% PASSIVE</div>
                <div className="text-[10px] text-slate-400">Zero RF enemy detectability</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/30 transition-colors">
                <div className="text-slate-500 text-[10px] uppercase font-semibold">SURVEILLANCE ZONE</div>
                <div className="text-cyan-400 font-bold mt-0.5">SUB-SURFACE & GROUND</div>
                <div className="text-[10px] text-slate-400">Up to 15m underground depth</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 col-span-2 sm:col-span-1 hover:border-amber-500/30 transition-colors">
                <div className="text-slate-500 text-[10px] uppercase font-semibold">EDGE AI ACCURACY</div>
                <div className="text-amber-400 font-bold mt-0.5">&gt;90% ACCURACY</div>
                <div className="text-[10px] text-slate-400">&lt;5% false alarm ratio</div>
              </div>
            </motion.div>

            {/* Product CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 pt-3"
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
                href="/#simulation"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700 font-mono text-xs tracking-wider transition-all"
              >
                <Zap className="w-4 h-4 text-emerald-400" />
                <span>INTERACTIVE SIMULATOR</span>
              </Link>

              <Link
                href="/technology"
                className="inline-flex items-center gap-1.5 px-4 py-3.5 text-xs text-slate-400 hover:text-emerald-300 font-mono transition-colors"
              >
                <span>Product Specs</span>
                <ChevronRight className="w-3.5 h-3.5" />
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
                <span>Made in India (Atmanirbhar Bharat)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Turnkey Tactical Deployment</span>
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
              <RadarSweep activeSector="SECTOR 04 (LoC NORTH) — BHOOMI MESH" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
