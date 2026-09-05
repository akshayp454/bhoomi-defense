import React from "react";
import { GrantInquiryForm } from "@/components/contact/GrantInquiryForm";
import { WhitepaperCard } from "@/components/contact/WhitepaperCard";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { ShieldAlert, Award, Lock, Mail, MapPin } from "lucide-react";

export const metadata = {
  title: "Grant Evaluator Portal & Inquiries | BHOOMI",
  description: "Schedule technical briefings, request lab demonstrations, and access the official iDEX Open Challenge proposal dossier for BHOOMI.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 bg-[#06080e] bg-tactical-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-xs font-mono text-emerald-400 mb-4">
              <Award className="w-3.5 h-3.5" />
              <span>OFFICIAL iDEX OPEN CHALLENGE EVALUATION CHANNEL</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
              Grant Evaluator & Defence Portal
            </h1>
            <p className="mt-4 text-base text-slate-300 leading-relaxed">
              Direct technical briefing channel for Defence Innovation Organisation (DIO) evaluators, Ministry of Defence representatives, and Indian Armed Forces technical trial coordinators.
            </p>
          </div>
        </ScrollReveal>

        {/* 2 Column Layout: Main Inquiry Form + Whitepaper/Notice Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7">
            <ScrollReveal delay={0.1}>
              <GrantInquiryForm />
            </ScrollReveal>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <ScrollReveal delay={0.2}>
              <WhitepaperCard />
            </ScrollReveal>

            {/* Security Compliance Card */}
            <ScrollReveal delay={0.3}>
              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-400 space-y-3">
                <div className="flex items-center gap-2 text-slate-200 font-mono font-bold">
                  <Lock className="w-4 h-4 text-emerald-400" />
                  <span>COMMUNICATION & IP PROTOCOL</span>
                </div>
                <p className="leading-relaxed">
                  In compliance with iDEX Open Challenge guidelines, intellectual property remains innovator-retained with permanent usage rights granted to the Ministry of Defence. All technical communication submitted via this portal is encrypted and treated with strict operational discretion.
                </p>
                <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span>REF: DIO/iDEX-OC-2026</span>
                  <span className="text-emerald-400">STATUS: ACTIVE</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  );
}
