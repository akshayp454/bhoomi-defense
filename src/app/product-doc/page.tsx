"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  FileText,
  Download,
  Search,
  ChevronRight,
  Shield,
  Plane,
  Cpu,
  Layers,
  Radio,
  Zap,
  Activity,
  CheckCircle2,
  Lock,
  ArrowLeft,
  ExternalLink
} from "lucide-react";

interface SectionItem {
  id: string;
  num: string;
  title: string;
  category: "OVERVIEW" | "SYSTEMS" | "HARDWARE" | "AI & SOFTWARE" | "COMMS & POWER" | "OPERATIONS";
}

const SECTIONS: SectionItem[] = [
  { id: "sec-1", num: "01", title: "Product Overview & Purpose", category: "OVERVIEW" },
  { id: "sec-2", num: "02", title: "System Architecture (4-Tier)", category: "SYSTEMS" },
  { id: "sec-3", num: "03", title: "Working Principle & TDOA Triangulation", category: "SYSTEMS" },
  { id: "sec-4", num: "04", title: "Hardware Design: Ground Sensor Node", category: "HARDWARE" },
  { id: "sec-5", num: "05", title: "Hardware Design: Sector Gateway", category: "HARDWARE" },
  { id: "sec-6", num: "06", title: "Hardware Design: Autonomous Drone Dock & VTOL UAV", category: "HARDWARE" },
  { id: "sec-7", num: "07", title: "Software Architecture & Firmware", category: "AI & SOFTWARE" },
  { id: "sec-8", num: "08", title: "AI/ML Classification Engine (INT8 1D-CNN)", category: "AI & SOFTWARE" },
  { id: "sec-9", num: "09", title: "Communication & LoRa Mesh Networking", category: "COMMS & POWER" },
  { id: "sec-10", num: "10", title: "Power System Engineering & Autonomy", category: "COMMS & POWER" },
  { id: "sec-11", num: "11", title: "Mechanical Design & MIL-STD-810H Hardening", category: "HARDWARE" },
  { id: "sec-12", num: "12", title: "Command & Control Dashboard (C2)", category: "OPERATIONS" },
  { id: "sec-13", num: "13", title: "Deployment Architecture & Field Installation", category: "OPERATIONS" },
  { id: "sec-14", num: "14", title: "Bill of Materials (BOM) & Manufacturing", category: "OPERATIONS" },
  { id: "sec-15", num: "15", title: "Testing, Qualification & Certification", category: "OPERATIONS" },
  { id: "sec-16", num: "16", title: "Maintenance & Field Operations (OTA)", category: "OPERATIONS" },
  { id: "sec-17", num: "17", title: "Product Specifications Summary Sheet", category: "OVERVIEW" },
  { id: "sec-18", num: "18", title: "Appendices & Document Revision History", category: "OVERVIEW" },
];

export default function ProductDocPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState("sec-1");

  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) return SECTIONS;
    const query = searchQuery.toLowerCase();
    return SECTIONS.filter(
      (s) =>
        s.title.toLowerCase().includes(query) ||
        s.category.toLowerCase().includes(query) ||
        s.num.includes(query)
    );
  }, [searchQuery]);

  const handleDownloadMarkdown = () => {
    const link = document.createElement("a");
    link.href = "/docs/PRODUCT_DESIGN_DOCUMENT.md";
    link.download = "BHOOMI_Product_Design_Document_v1.0.md";
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen pt-28 pb-24 bg-[#06080e] bg-tactical-grid text-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Header Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#09111c] via-[#060a12] to-[#071317] border border-emerald-500/40 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
                title="Back to Platform Home"
              >
                <ArrowLeft className="w-4 h-4" />
              </Link>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-emerald-400">
                    NAX NOVA LLP • DEFENCE DEEPTECH
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-950 text-red-300 border border-red-500/40">
                    RESTRICTED — PDD v1.0
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-0.5">
                  BHOOMI — Product Design Document
                </h1>
                <p className="text-xs font-mono text-slate-400 mt-0.5">
                  Border Hazard Observation &amp; Onset Monitoring Infrastructure • Multi-Domain System
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start md:self-auto">
              <button
                onClick={handleDownloadMarkdown}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-mono text-xs font-bold transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)]"
              >
                <Download className="w-3.5 h-3.5" />
                <span>DOWNLOAD RAW .MD</span>
              </button>
            </div>
          </div>

          {/* Quick Metadata Bar */}
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono text-slate-400 pt-2">
            <div>DOC TYPE: <span className="text-white font-bold">Product Design Doc (PDD)</span></div>
            <div>VERSION: <span className="text-emerald-400 font-bold">v1.0 (Production)</span></div>
            <div>DATE: <span className="text-white font-bold">September 2026</span></div>
            <div>REACTION UAV: <span className="text-cyan-400 font-bold">&lt;15s Cued Launch</span></div>
          </div>
        </div>

        {/* Main 2-Column Reader Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Sidebar: Table of Contents & Search */}
          <div className="lg:col-span-4 sticky top-28 space-y-4">
            {/* Search Box */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search doc (e.g., Drone, TDOA, BOM)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/60"
              />
            </div>

            {/* Navigation List */}
            <div className="rounded-2xl border border-slate-800 bg-[#090d16] p-4 shadow-xl max-h-[70vh] overflow-y-auto space-y-1 text-xs font-mono">
              <div className="text-[10px] uppercase text-slate-500 font-bold px-2 py-1 tracking-wider">
                TABLE OF CONTENTS ({filteredSections.length} SECTIONS)
              </div>
              {filteredSections.map((sec) => {
                const isActive = activeSection === sec.id;
                return (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    onClick={() => setActiveSection(sec.id)}
                    className={`flex items-center justify-between p-2 rounded-lg transition-colors ${
                      isActive
                        ? "bg-emerald-950/60 text-emerald-300 border border-emerald-500/40 font-bold"
                        : "text-slate-400 hover:text-white hover:bg-slate-900/60"
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="text-slate-500 text-[10px]">{sec.num}</span>
                      <span className="truncate">{sec.title}</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Right Column: Complete Document Reader */}
          <div className="lg:col-span-8 space-y-8 text-sm leading-relaxed">
            {/* SECTION 1 */}
            <div id="sec-1" className="p-6 sm:p-8 rounded-2xl bg-[#090d16] border border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-mono text-emerald-400 font-bold">SECTION 01</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400">OVERVIEW</span>
              </div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                1. Product Overview &amp; Purpose
              </h2>
              <p className="text-slate-300">
                <strong>BHOOMI (Border Hazard Observation &amp; Onset Monitoring Infrastructure)</strong> is an advanced, integrated tri-domain surveillance product designed specifically for continuous passive monitoring of high-security border perimeters. The system leverages advanced edge artificial intelligence, ultra-low-power embedded systems, and a fully autonomous aerial drone response network to secure vulnerable border sectors against unauthorized incursions. Unlike conventional radar or thermal imaging, BHOOMI focuses on ground-borne acoustic and seismic micro-vibrations, rendering it immune to visual obstructions and virtually invisible to enemy electronic intelligence (SIGINT).
              </p>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <h4 className="text-xs font-mono font-bold text-cyan-400 uppercase">Operational Gaps Solved:</h4>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Zero-Visibility Infiltration:</strong> Sub-surface geophones operate 24/7 immune to heavy fog, monsoons, and canopy where cameras fail.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Subterranean Tunnel Interdiction:</strong> Deep neural networks detect Rayleigh and P/S body waves from clandestine digging up to 15m deep.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Elimination of Drone Patrol Bottlenecks:</strong> Autonomous VTOL UAVs remain docked in weatherproof stations, launching in &lt;15s only when high-confidence ground signals cue an immediate intercept.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* SECTION 2 */}
            <div id="sec-2" className="p-6 sm:p-8 rounded-2xl bg-[#090d16] border border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-mono text-emerald-400 font-bold">SECTION 02</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400">ARCHITECTURE</span>
              </div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                2. System Architecture (4-Tier)
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3.5 rounded-xl bg-slate-950 border border-emerald-500/30">
                  <div className="text-emerald-400 font-bold mb-1">TIER 1: SENSING LAYER</div>
                  <p className="text-slate-300 font-sans text-[11px]">100 Buried Sensor Nodes per 5km sector (50m zig-zag). 4.5Hz Geophone + Knowles MEMS mic running on STM32H7 Cortex-M7.</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950 border border-cyan-500/30">
                  <div className="text-cyan-400 font-bold mb-1">TIER 2: EDGE PROCESSING &amp; MESH</div>
                  <p className="text-slate-300 font-sans text-[11px]">Sector AI Gateway on Raspberry Pi CM4 with SX1303 LoRa concentrator. Calculates Levenberg-Marquardt TDOA triangulation (&lt;10m error).</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950 border border-amber-500/30">
                  <div className="text-amber-400 font-bold mb-1">TIER 3: AERIAL RESPONSE LAYER</div>
                  <p className="text-slate-300 font-sans text-[11px]">5 Autonomous Drone Docking Stations with VTOL UAVs. Cued launch in &lt;15s to TDOA coordinates with FLIR Boson 640 thermal video.</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950 border border-purple-500/30">
                  <div className="text-purple-400 font-bold mb-1">TIER 4: COMMAND &amp; CONTROL</div>
                  <p className="text-slate-300 font-sans text-[11px]">Tactical C2 Dashboard on React &amp; MapLibre GL with real-time WebSockets and automated Quick Reaction Force (QRF) dispatch vectors.</p>
                </div>
              </div>
            </div>

            {/* SECTION 3 */}
            <div id="sec-3" className="p-6 sm:p-8 rounded-2xl bg-[#090d16] border border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-mono text-emerald-400 font-bold">SECTION 03</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400">PHYSICS &amp; TDOA</span>
              </div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                3. Working Principle &amp; TDOA Triangulation
              </h2>
              <p className="text-slate-300">
                To launch the autonomous drone directly to the target without human intervention, BHOOMI pinpoints the threat coordinates via Time Difference of Arrival (TDOA). When a seismic transient occurs, it arrives at neighboring nodes at differential timestamps.
              </p>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-2">
                <span className="text-emerald-400 font-bold block">TDOA MATHEMATICAL FORMULATION:</span>
                <div className="p-2.5 rounded bg-black/60 border border-slate-800 text-slate-200 overflow-x-auto">
                  Δt_ij = (||x_i - x_t|| - ||x_j - x_t||) / v_s
                </div>
                <p className="text-[11px] text-slate-400 font-sans">
                  The Gateway minimizes non-linear error using the Levenberg-Marquardt optimizer across ≥4 nodes, achieving sub-10m radial error in field trials (KPI verified &lt;9.5m).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-2">
                <span className="text-cyan-400 font-bold block">BAYESIAN DECISION FUSION:</span>
                <div className="p-2.5 rounded bg-black/60 border border-slate-800 text-slate-200 overflow-x-auto">
                  P(Threat | S, A, V) = [ P(V | Threat) · P(S, A | Threat) · P(Threat) ] / P(S, A, V)
                </div>
                <p className="text-[11px] text-slate-400 font-sans">
                  When seismic (S) and acoustic (A) probability exceeds 0.75, the autonomous drone is launched to collect aerial visual (V) data, raising confidence to &gt;95%.
                </p>
              </div>
            </div>

            {/* SECTION 6: DRONE DOCK */}
            <div id="sec-6" className="p-6 sm:p-8 rounded-2xl bg-[#090d16] border border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-mono text-amber-400 font-bold">SECTION 06</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-500/40">AUTONOMOUS DRONE DOCK</span>
              </div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                6. Hardware Design: Autonomous Drone Docking Station &amp; VTOL UAV
              </h2>
              <p className="text-slate-300">
                The Autonomous Docking Station eliminates the need for manual UAV pilots and continuous battery-draining patrols.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400">
                      <th className="py-2.5 px-3">Parameter</th>
                      <th className="py-2.5 px-3">Docking Station Spec</th>
                      <th className="py-2.5 px-3">Integrated VTOL Drone Spec</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 text-slate-300">
                    <tr>
                      <td className="py-2.5 px-3 text-emerald-400 font-semibold">Enclosure / Frame</td>
                      <td className="py-2.5 px-3">IP65 marine aluminum + heated seals</td>
                      <td className="py-2.5 px-3">Toray T700 carbon fiber (1.85 kg TOW)</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 text-emerald-400 font-semibold">Launch Speed</td>
                      <td className="py-2.5 px-3">Motorized lid retracts in &lt; 3.0 seconds</td>
                      <td className="py-2.5 px-3">Rapid spool-up to airborne in &lt; 15 seconds</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 text-emerald-400 font-semibold">Charging / Power</td>
                      <td className="py-2.5 px-3">15W Qi wireless resonant charging</td>
                      <td className="py-2.5 px-3">35-min loiter endurance, 5km radius</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 text-emerald-400 font-semibold">Thermal Payload</td>
                      <td className="py-2.5 px-3">Downward IR landing beacon array</td>
                      <td className="py-2.5 px-3">FLIR Boson 640 LWIR (8-14µm) + 4K EO</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 text-emerald-400 font-semibold">Weather Resilience</td>
                      <td className="py-2.5 px-3">Peltier HVAC (-40°C to +50°C)</td>
                      <td className="py-2.5 px-3">15 m/s wind tolerance, up to 4,500m ASL</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* SECTION 14: BOM */}
            <div id="sec-14" className="p-6 sm:p-8 rounded-2xl bg-[#090d16] border border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-mono text-emerald-400 font-bold">SECTION 14</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400">COMMERCIAL BOM</span>
              </div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                14. Bill of Materials (BOM) — 5KM Sector Kit
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 bg-slate-900 text-slate-400">
                      <th className="py-2.5 px-3">Sub-Module</th>
                      <th className="py-2.5 px-3">Quantity</th>
                      <th className="py-2.5 px-3">Unit Price</th>
                      <th className="py-2.5 px-3 text-right">Total Sector Cost</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 text-slate-300">
                    <tr>
                      <td className="py-2.5 px-3 text-white font-semibold">BHOOMI Sensor Nodes</td>
                      <td className="py-2.5 px-3 text-cyan-400">100 Nodes</td>
                      <td className="py-2.5 px-3">₹ 11,350</td>
                      <td className="py-2.5 px-3 text-right text-emerald-400 font-bold">₹ 11,35,000</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 text-white font-semibold">Sector AI Gateway</td>
                      <td className="py-2.5 px-3 text-cyan-400">1 Unit</td>
                      <td className="py-2.5 px-3">₹ 85,000</td>
                      <td className="py-2.5 px-3 text-right text-emerald-400 font-bold">₹ 85,000</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 text-white font-semibold">Drone Docking Stations</td>
                      <td className="py-2.5 px-3 text-cyan-400">5 Docks</td>
                      <td className="py-2.5 px-3">₹ 4,50,000</td>
                      <td className="py-2.5 px-3 text-right text-emerald-400 font-bold">₹ 22,50,000</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 text-white font-semibold">VTOL Interceptor Drones</td>
                      <td className="py-2.5 px-3 text-cyan-400">5 UAVs</td>
                      <td className="py-2.5 px-3">₹ 3,00,000</td>
                      <td className="py-2.5 px-3 text-right text-emerald-400 font-bold">₹ 15,00,000</td>
                    </tr>
                    <tr className="bg-slate-900 font-bold border-t-2 border-slate-700">
                      <td className="py-3 px-3 text-white uppercase">Total Hardware (5KM Sector)</td>
                      <td className="py-3 px-3 text-cyan-300">1 Modular Kit</td>
                      <td className="py-3 px-3">—</td>
                      <td className="py-3 px-3 text-right text-amber-400 text-sm">~₹49,70,000 (~₹9.94L/km)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* SECTION 17: SUMMARY */}
            <div id="sec-17" className="p-6 sm:p-8 rounded-2xl bg-[#090d16] border border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-mono text-emerald-400 font-bold">SECTION 17</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400">SPECS</span>
              </div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                17. Product Specifications Summary Sheet
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-slate-500 block">SYSTEM NAME</span>
                  <span className="text-white font-bold">BHOOMI V1.0 (Tri-Domain)</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-slate-500 block">DETECTION RANGE</span>
                  <span className="text-emerald-400 font-bold">15m Subterranean / 100m Surface</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-slate-500 block">CLASSIFICATION ACCURACY</span>
                  <span className="text-cyan-400 font-bold">93.1% Weighted F1 (INT8 CNN)</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-slate-500 block">DRONE LAUNCH LATENCY</span>
                  <span className="text-amber-400 font-bold">&lt; 15 seconds from ground alarm</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-slate-500 block">ENCRYPTION</span>
                  <span className="text-purple-400 font-bold">AES-256 GCM Hardware Crypto</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-slate-500 block">ENVIRONMENTAL STANDARD</span>
                  <span className="text-emerald-400 font-bold">MIL-STD-810H &amp; IP67/IP65</span>
                </div>
              </div>
            </div>

            {/* Bottom Download & Contact CTA */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-cyan-950/40 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="text-base font-bold text-white font-mono">
                  Need the Full Restricted Proposal Dossier?
                </h4>
                <p className="text-xs text-slate-300">
                  Includes raw circuit schematics, test bench telemetry logs, and manufacturing drawings.
                </p>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-mono text-xs font-bold transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] shrink-0"
              >
                <span>REQUEST BRIEFING</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
