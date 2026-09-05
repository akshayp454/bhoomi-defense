import React from "react";
import { HeroSection } from "@/components/home/HeroSection";
import { ThreatSimulationSection } from "@/components/home/ThreatSimulationSection";
import { SystemArchitectureSection } from "@/components/home/SystemArchitectureSection";
import { ComparativeMatrixSection } from "@/components/home/ComparativeMatrixSection";
import { ImpactSummarySection } from "@/components/home/ImpactSummarySection";

export const metadata = {
  title: "BHOOMI | Passive Seismic–Acoustic Fusion Network for Border Defence",
  description: "iDEX Open Challenge technology proposal for BHOOMI: low-cost, 100% passive seismic-acoustic mesh network with edge-AI sensor fusion for sub-surface tunnel and stealth border infiltration detection along India's LoC and LAC.",
};

export default function HomePage() {
  return (
    <div className="space-y-0">
      <HeroSection />
      <ThreatSimulationSection />
      <SystemArchitectureSection />
      <ComparativeMatrixSection />
      <ImpactSummarySection />
    </div>
  );
}
