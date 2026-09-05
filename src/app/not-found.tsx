import React from "react";
import Link from "next/link";
import { Radio, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#06080e] bg-tactical-grid px-4">
      <div className="text-center max-w-md p-8 rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl space-y-4">
        <div className="w-12 h-12 rounded-xl bg-red-950/60 border border-red-500/40 flex items-center justify-center mx-auto text-red-400">
          <Radio className="w-6 h-6 animate-pulse" />
        </div>
        <div className="text-xs font-mono text-red-400 font-bold uppercase tracking-widest">
          STATUS 404 • SECTOR UNREACHABLE
        </div>
        <h1 className="text-2xl font-bold text-white">
          Coordinates Not Found
        </h1>
        <p className="text-xs text-slate-400 leading-relaxed">
          The requested tactical sector or telemetry endpoint does not exist or has been relocated to another sector grid.
        </p>
        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs font-mono tracking-wider transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>RETURN TO COMMAND HUD</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
