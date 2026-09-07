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

export type DroneState = "docked" | "launching" | "en_route" | "target_locked" | "returning";

export interface DroneResponseAction {
  activated: boolean;
  status: DroneState;
  dockId: string;
  launchTimeSeconds: number;
  targetCoords: string;
  thermalPayload: string;
  opticalFeed: string;
  estimatedArrivalSeconds: number;
  missionObjective: string;
}

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
  droneResponse?: DroneResponseAction;
}

export interface MissionStoryStep {
  stepNumber: number;
  timestamp: string;
  phaseTitle: string;
  actor:
    | "GROUND SENSOR (N-14)"
    | "EDGE MCU (STM32H7)"
    | "SECTOR GATEWAY (TDOA)"
    | "DRONE DOCK 02"
    | "VTOL DRONE (UAV-04)"
    | "FLIR BOSON 640"
    | "FORWARD COMMAND (QRF)";
  description: string;
  tacticalLog: string;
  droneTelemetry?: {
    altitudeMeters: number;
    airspeedKmh: number;
    gimbalPitchDeg: number;
    batteryPct: number;
    status: string;
  };
  visualGraphic:
    | "seismic_wave"
    | "edge_inference"
    | "tdoa_triangulation"
    | "dock_unseal"
    | "rapid_ascent"
    | "thermal_lock"
    | "qrf_interdiction";
}

export interface BorderMission {
  id: string;
  title: string;
  sector: string;
  time: string;
  terrain: string;
  weather: string;
  threatType: string;
  summary: string;
  steps: MissionStoryStep[];
}

export interface BudgetHead {
  head: string;
  phase1: number; // in Lakhs
  phase2: number;
  phase3: number;
  total: number;
}

export interface SectorHardwareItem {
  item: string;
  quantity: number | string;
  unitCostInr: number;
  totalCostInr: number;
  notes: string;
}
