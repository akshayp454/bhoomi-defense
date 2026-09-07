import React from "react";
import { HeroSection } from "@/components/home/HeroSection";
import { ThreatSimulationSection } from "@/components/home/ThreatSimulationSection";
import { Drone3DExplodedSection } from "@/components/home/Drone3DExplodedSection";
import { SystemArchitectureSection } from "@/components/home/SystemArchitectureSection";
import { ComparativeMatrixSection } from "@/components/home/ComparativeMatrixSection";
import { ImpactSummarySection } from "@/components/home/ImpactSummarySection";

export const metadata = {
  title: "NaX Nova | BHOOMI™ Autonomous Defence Sensor Mesh",
  description: "Flagship product platform of NaX Nova LLP: 100% passive seismic-acoustic mesh network with edge-AI sensor fusion for sub-surface tunnel and stealth border infiltration interdiction.",
};

export default function HomePage() {
  return (
    <div className="space-y-0">
      <HeroSection />
      <ThreatSimulationSection />
      <Drone3DExplodedSection />
      <SystemArchitectureSection />
      <ComparativeMatrixSection />
      <ImpactSummarySection />
    </div>
  );
}
