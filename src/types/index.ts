export interface GrantInquiryInput {
  fullName: string;
  organization: string;
  designation?: string;
  email: string;
  phone?: string;
  inquiryType: "grant_evaluation" | "technical_briefing" | "field_trial_partnership" | "procurement" | "other";
  message: string;
}

export interface WhitepaperRequestInput {
  email: string;
  organization: string;
  documentRequested?: string;
}

export type ThreatScenario = "digging" | "infiltration" | "vehicle" | "wildlife";

export interface ScenarioDetail {
  id: ThreatScenario;
  title: string;
  targetType: string;
  seismicProfile: {
    frequency: string;
    amplitude: "LOW" | "MEDIUM" | "HIGH" | "PERIODIC";
    description: string;
  };
  acousticProfile: {
    frequency: string;
    amplitude: "VERY LOW" | "MEDIUM" | "HIGH" | "BURST";
    description: string;
  };
  fusionResult: {
    classifiedAs: string;
    confidence: number;
    action: "DISPATCH ALERT" | "SECTOR WARNING" | "IGNORE (FILTERED)";
    alertColor: "red" | "amber" | "emerald";
    explanation: string;
  };
}

export interface BudgetHead {
  head: string;
  phase1: number; // in Lakhs
  phase2: number;
  phase3: number;
  total: number;
}
