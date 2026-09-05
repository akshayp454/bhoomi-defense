import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Shield, Radio, Lock, Award, ExternalLink, Cpu, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-[#04060a] text-slate-400 text-xs relative overflow-hidden">
      {/* Subtle top tactical line */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Col 1 & 2: NaX Nova Corporate & Product Profile */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative h-11 w-40 rounded-lg overflow-hidden border border-slate-800 bg-black flex items-center justify-center p-1">
                <Image
                  src="/naxnova-logo.jpg"
                  alt="NaX Nova LLP Logo"
                  width={160}
                  height={44}
                  className="object-contain w-full h-full"
                />
              </div>
            </div>

            <p className="text-slate-400 leading-relaxed text-xs max-w-md">
              <strong className="text-white">NaX Nova LLP</strong> is an Indian deeptech defence innovations enterprise developing next-generation autonomous sensing networks, micro-seismic phononics, and tactical edge artificial intelligence for sovereign defense.
            </p>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/90 space-y-1.5 max-w-md">
              <div className="text-[11px] font-mono text-emerald-400 font-bold flex items-center gap-2">
                <Radio className="w-3.5 h-3.5" />
                <span>FLAGSHIP PRODUCT: BHOOMI™</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Passive Seismic–Acoustic Sensor Fusion Mesh for Sub-surface Tunnel and Low-Visibility Border Infiltration Detection.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-700 text-[10px] font-mono text-cyan-400">
                <Lock className="w-3 h-3" /> PATENT PENDING
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-700 text-[10px] font-mono text-emerald-400">
                <Award className="w-3 h-3" /> iDEX OPEN CHALLENGE
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-700 text-[10px] font-mono text-slate-300">
                🇮🇳 MAKE IN INDIA
              </span>
            </div>
          </div>

          {/* Col 3: Product & Engineering */}
          <div>
            <h4 className="text-white font-mono text-xs font-bold tracking-wider uppercase mb-3">
              BHOOMI™ Product
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/technology" className="hover:text-emerald-400 transition-colors">
                  Sensor Node Architecture
                </Link>
              </li>
              <li>
                <Link href="/technology#fusion" className="hover:text-emerald-400 transition-colors">
                  Edge-AI Sensor Fusion
                </Link>
              </li>
              <li>
                <Link href="/technology#mesh" className="hover:text-emerald-400 transition-colors">
                  Encrypted LoRa Mesh Relay
                </Link>
              </li>
              <li>
                <Link href="/technology#specs" className="hover:text-emerald-400 transition-colors">
                  Hardware Specifications
                </Link>
              </li>
              <li>
                <Link href="/#comparison" className="hover:text-emerald-400 transition-colors">
                  Capability Benchmarks
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Solutions & R&D */}
          <div>
            <h4 className="text-white font-mono text-xs font-bold tracking-wider uppercase mb-3">
              Solutions & R&D
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/applications" className="hover:text-cyan-400 transition-colors">
                  LoC/LAC Anti-Tunneling
                </Link>
              </li>
              <li>
                <Link href="/applications#fog" className="hover:text-cyan-400 transition-colors">
                  Zero-Visibility Defense
                </Link>
              </li>
              <li>
                <Link href="/applications#perimeter" className="hover:text-cyan-400 transition-colors">
                  FOB & Depot Perimeter Shield
                </Link>
              </li>
              <li>
                <Link href="/roadmap" className="hover:text-cyan-400 transition-colors">
                  18-Month TRL Roadmap
                </Link>
              </li>
              <li>
                <Link href="/roadmap#budget" className="hover:text-cyan-400 transition-colors">
                  R&D Milestones & Testing
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Enterprise & Defense Contact */}
          <div>
            <h4 className="text-white font-mono text-xs font-bold tracking-wider uppercase mb-3">
              Enterprise & Defense
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/contact" className="hover:text-emerald-400 transition-colors">
                  Book Live Demonstration
                </Link>
              </li>
              <li>
                <Link href="/contact#whitepaper" className="hover:text-emerald-400 transition-colors">
                  Download Technical Datasheet
                </Link>
              </li>
              <li>
                <Link href="/contact#trial" className="hover:text-emerald-400 transition-colors">
                  Procurement & Trial Inquiries
                </Link>
              </li>
              <li className="pt-2 text-slate-400 leading-tight">
                <span className="block font-semibold text-slate-300">NaX Nova LLP</span>
                <span className="text-[11px] block mt-0.5">Autonomous Systems & Sensors Division</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>© {new Date().getFullYear()} NaX Nova LLP. All rights reserved. Sovereign Deeptech Defence Infrastructure.</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400 font-mono">
            <span>PRODUCT: BHOOMI™ v2.0</span>
            <span>•</span>
            <span className="text-emerald-400">ENTERPRISE DEPLOYABLE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
