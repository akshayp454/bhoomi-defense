"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BorderMission, MissionStoryStep } from "@/types";
import { TacticalBorderCanvas } from "./TacticalBorderCanvas";
import { tacticalAudio } from "@/lib/tacticalAudio";
import {
  Play,
  Pause,
  RotateCcw,
  ChevronRight,
  ChevronLeft,
  Shield,
  Plane,
  Crosshair,
  Radio,
  Clock,
  Compass,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Volume2,
  VolumeX,
  Maximize2,
  Eye,
  Camera,
  Layers,
  MapPin,
  Cpu,
  Sliders
} from "lucide-react";

const MISSIONS: BorderMission[] = [
  {
    id: "tunnel_mission",
    title: "MISSION ALPHA: Midnight Sub-Surface Tunnel Interdiction",
    sector: "SECTOR 04 (SAMBA SECTOR — INTERNATIONAL BORDER)",
    time: "02:47:10 AM",
    terrain: "Alluvial Silty Soil & Bedrock (5-15m Depth)",
    weather: "Overcast, High Humidity, Dense Ground Fog",
    threatType: "Clandestine Excavation / Sabotage Shaft",
    summary:
      "Hostile mining squad starts manual and rotary tool excavation 7.8 meters underground to bypass the physical border fence. Traditional optical and surface radars detect zero movement. BHOOMI's sub-surface geophones and cued autonomous VTOL drone intercept the threat before the zero line is reached.",
    steps: [
      {
        stepNumber: 1,
        timestamp: "00:00.000",
        phaseTitle: "Sub-Surface Micro-Vibration Onset",
        actor: "GROUND SENSOR (N-14)",
        description:
          "Pickaxe and rotary drill impact shocks travel as 24.5 Hz compressive P-waves through subterranean alluvial soil. Buried sensor spike N-14 captures a 18.4 µV micro-vibration. The onboard analog low-power piezo comparator triggers the STM32H7 Cortex-M7 from deep sleep in 0.8 milliseconds.",
        tacticalLog:
          "[02:47:10.000] NODE N-14: VOLTAGE EXCEEDANCE (18.4 µV > 3.0 µV THRESHOLD). HARDWARE COMPARATOR FIRED. ENGAGING ADS1256 ADC AT 500 Hz.",
        droneTelemetry: {
          altitudeMeters: 0,
          airspeedKmh: 0,
          gimbalPitchDeg: 0,
          batteryPct: 98,
          status: "DOCKED (LID SEALED • QI CHARGING)",
        },
        visualGraphic: "seismic_wave",
      },
      {
        stepNumber: 2,
        timestamp: "00:01.800",
        phaseTitle: "Edge INT8 1D-CNN Local Inference",
        actor: "EDGE MCU (STM32H7)",
        description:
          "STM32H7 Cortex-M7 samples 2 seconds of dual-channel geophone & Knowles MEMS acoustic data, generating a 64x128 STFT spectrogram. The quantized 1D-CNN executes inference in 18ms. Acoustic channel reveals zero airborne sound (attenuated by 7.8m of earth cover), confirming subterranean excavation with 97.4% confidence.",
        tacticalLog:
          "[02:47:11.800] NODE N-14: 1D-CNN INFERENCE FINISHED (18ms). CLASS: TUNNEL_EXCAVATION (CONF: 97.4%). ACOUSTIC COHERENCE: ATTENUATED. TX LORA PACKET.",
        droneTelemetry: {
          altitudeMeters: 0,
          airspeedKmh: 0,
          gimbalPitchDeg: 0,
          batteryPct: 98,
          status: "DOCKED (PRE-FLIGHT CHECKS INITIATED)",
        },
        visualGraphic: "edge_inference",
      },
      {
        stepNumber: 3,
        timestamp: "00:03.400",
        phaseTitle: "Sector Gateway TDOA Triangulation & Bayesian Fusion",
        actor: "SECTOR GATEWAY (TDOA)",
        description:
          "Sector Gateway receives 42-byte encrypted LoRa packets from Nodes N-12, N-13, N-14, and N-15. Using GPS-synchronized PPS timestamps, the Levenberg-Marquardt solver computes exact 3D coordinates: [34°12'22.1\"N, 74°22'48.5\"E, Depth: -7.8m] with 2.4m radial error. Bayesian threat probability exceeds 0.75 (P=0.95), triggering automated drone dispatch.",
        tacticalLog:
          "[02:47:13.400] GATEWAY: TDOA CONVERGED IN 4 ITERATIONS. TARGET: 34°12'22.1\"N 74°22'48.5\"E (DEPTH -7.8m). P(THREAT|S,A)=0.95. DISPATCHING DOCK 03.",
        droneTelemetry: {
          altitudeMeters: 0,
          airspeedKmh: 0,
          gimbalPitchDeg: 0,
          batteryPct: 98,
          status: "DISPATCH API RECEIVED • PRE-ARMING",
        },
        visualGraphic: "tdoa_triangulation",
      },
      {
        stepNumber: 4,
        timestamp: "00:06.100",
        phaseTitle: "Dock 03 Motorized Roof Retraction (<3s)",
        actor: "DRONE DOCK 02",
        description:
          "Drone Dock 03 receives dispatch command. The heavy-duty IP67 linear actuator engages, retracting the sliding aluminum roof in 2.7 seconds. Qi resonant inductive charging pads disengage. Internal Peltier thermoelectric climate control chamber exposes the launch pad.",
        tacticalLog:
          "[02:47:16.100] DOCK 03: LINEAR ACTUATOR DISENGAGED (LID RETRACTED IN 2.7s). QI INDUCTIVE POWER OFF. LAUNCH PAD CLEAR. PUSHING GPS WAYPOINTS TO UAV.",
        droneTelemetry: {
          altitudeMeters: 0,
          airspeedKmh: 0,
          gimbalPitchDeg: 0,
          batteryPct: 97,
          status: "LID OPEN • MOTORS SPOOLING (6,000 RPM)",
        },
        visualGraphic: "dock_unseal",
      },
      {
        stepNumber: 5,
        timestamp: "00:13.500",
        phaseTitle: "Autonomous VTOL Rapid Ascent (<15s)",
        actor: "VTOL DRONE (UAV-04)",
        description:
          "Quadcopter VTOL UAV-03 spools Toray carbon-fiber propellers to 12,500 RPM, launching into the night sky in 11.8 seconds from initial seismic alert. It climbs rapidly to 50m AGL, establishes encrypted AES-256 telemetry link with the Gateway, and accelerates to 52 km/h cruise speed toward the target coordinates.",
        tacticalLog:
          "[02:47:23.500] UAV-03: AIRBORNE (ASCENT TIME 11.8s < 15s KPI). ALT: 48.5m AGL. AIRSPEED: 52 km/h. DISTANCE TO TARGET: 620m. ETA: 12 SECONDS.",
        droneTelemetry: {
          altitudeMeters: 48.5,
          airspeedKmh: 52,
          gimbalPitchDeg: -30,
          batteryPct: 96,
          status: "AIRBORNE EN ROUTE • CRUISE SPEED 52 KM/H",
        },
        visualGraphic: "rapid_ascent",
      },
      {
        stepNumber: 6,
        timestamp: "00:26.200",
        phaseTitle: "On-Station Arrival & FLIR Boson 640 Thermal Lock",
        actor: "FLIR BOSON 640",
        description:
          "UAV arrives over coordinates [34°12'22.1\"N 74°22'48.5\"E] in loiter hover. The 3-axis gyro-stabilized gimbal points directly downward. The FLIR Boson 640 LWIR thermal core penetrates dense surface ground fog, locking onto an anomalous surface heat plume: warm soil spoil heaps (+5.8°C above ambient) and exhaust heat from a clandestine subterranean generator.",
        tacticalLog:
          "[02:47:36.200] FLIR BOSON 640: LWIR THERMAL LOCK ESTABLISHED. DETECTED SPOIL HEAP THERMAL BLOB (ΔT: +5.8°C). STREAMING 30 FPS WHITE-HOT RTSP VIDEO TO C2.",
        droneTelemetry: {
          altitudeMeters: 46.2,
          airspeedKmh: 4,
          gimbalPitchDeg: -78,
          batteryPct: 94,
          status: "LOITER HOVER • THERMAL TARGET LOCK CONFIRMED",
        },
        visualGraphic: "thermal_lock",
      },
      {
        stepNumber: 7,
        timestamp: "00:42.000",
        phaseTitle: "Tactical Interdiction & QRF Neutralization",
        actor: "FORWARD COMMAND (QRF)",
        description:
          "Command & Control Dashboard displays confirmed visual and thermal proof. Sector Commander triggers Code Red alarm. Quick Reaction Force (QRF) squad dispatched with pinpointed navigation coordinates. The hostile tunnel entrance is intercepted and sealed 180 meters before crossing the physical zero line. Mission completed successfully with zero Indian personnel exposed to danger.",
        tacticalLog:
          "[02:47:52.000] C2 DASHBOARD: SECTOR COMMANDER VERIFIED THREAT. CODE RED ALARM RAISED. QRF INTERCEPTION DEPLOYED. TUNNEL EGRESS NEUTRALIZED. MISSION SUCCESS.",
        droneTelemetry: {
          altitudeMeters: 45.0,
          airspeedKmh: 0,
          gimbalPitchDeg: -80,
          batteryPct: 91,
          status: "TARGET ILLUMINATED • RELAYING QRF COORDINATES",
        },
        visualGraphic: "qrf_interdiction",
      },
    ],
  },
  {
    id: "fog_mission",
    title: "MISSION BRAVO: Dense Fog Stealth Infiltration Defense",
    sector: "SECTOR 02 (PAHARPUR — LINE OF CONTROL)",
    time: "03:15:20 AM",
    terrain: "Pine Ridge & Scree Ravine",
    weather: "Sub-Zero (-8°C), Dense Fog (Visibility < 4m)",
    threatType: "Stealth Armed Infiltration Squad",
    summary:
      "A 3-man heavily armed infiltration group attempts to cross during dense winter fog, exploiting optical blindness and thermal camera atmospheric washout. BHOOMI's ground geophones detect cadenced footsteps, and the autonomous drone ascends above the fog layer to lock on human body heat blooms with FLIR Boson 640.",
    steps: [
      {
        stepNumber: 1,
        timestamp: "00:00.000",
        phaseTitle: "Cadenced Human Footfall Onset",
        actor: "GROUND SENSOR (N-14)",
        description:
          "3 intruders tread lightly over scree soil. Geophone Node N-08 picks up 14.8 Hz cadenced micro-tremors characteristic of human walking dynamics (step frequency 1.8 Hz).",
        tacticalLog:
          "[03:15:20.000] NODE N-08: RHYTHMIC FOOTFALL PULSES DETECTED (14.8 Hz). EXCEEDANCE LEVEL 3.8 µV. SYSTEM ENGAGING DUAL-CHANNEL DSP.",
        droneTelemetry: {
          altitudeMeters: 0,
          airspeedKmh: 0,
          gimbalPitchDeg: 0,
          batteryPct: 99,
          status: "DOCKED (HEATED LID TRACKS ENGAGED)",
        },
        visualGraphic: "seismic_wave",
      },
      {
        stepNumber: 2,
        timestamp: "00:01.600",
        phaseTitle: "Acoustic-Seismic Phase Cross-Check",
        actor: "EDGE MCU (STM32H7)",
        description:
          "Knowles MEMS microphone captures near-surface foliage rustling (1200-2200 Hz) that aligns synchronously with seismic footstep cadence. 1D-CNN verifies `HUMAN_INTRUSION_DETECTED` with 94.2% confidence.",
        tacticalLog:
          "[03:15:21.600] NODE N-08: DUAL-DOMAIN PHASE COHERENCE CONFIRMED. SURFACE RUSTLE MATCHES FOOTFALL PERIODICITY. INTRUDER ESTIMATE: 3 TARGETS.",
        droneTelemetry: {
          altitudeMeters: 0,
          airspeedKmh: 0,
          gimbalPitchDeg: 0,
          batteryPct: 99,
          status: "DOCKED (READY FOR DISPATCH)",
        },
        visualGraphic: "edge_inference",
      },
      {
        stepNumber: 3,
        timestamp: "00:03.200",
        phaseTitle: "Multi-Node Velocity Vectoring",
        actor: "SECTOR GATEWAY (TDOA)",
        description:
          "Nodes N-07, N-08, and N-09 track sequential triggers. Gateway computes velocity vector: 4.1 km/h heading 038° NNE toward defilade ravine. Dispatch command cued to Dock 01.",
        tacticalLog:
          "[03:15:23.200] GATEWAY: TRACKING VECTOR ESTABLISHED. LAT 34°11'58.2\"N LON 74°21'39.0\"E. CUING AUTONOMOUS DOCK 01.",
        droneTelemetry: {
          altitudeMeters: 0,
          airspeedKmh: 0,
          gimbalPitchDeg: 0,
          batteryPct: 99,
          status: "DISPATCH RECEIVED • PRE-FLIGHT OK",
        },
        visualGraphic: "tdoa_triangulation",
      },
      {
        stepNumber: 4,
        timestamp: "00:05.900",
        phaseTitle: "Heated Dock Lid Retraction at -8°C",
        actor: "DRONE DOCK 02",
        description:
          "Integrated heating elements prevent freezing in sub-zero LoC temperatures. Dock 01 lid opens smoothly in 2.5 seconds.",
        tacticalLog:
          "[03:15:25.900] DOCK 01: HEATED TRACKS CLEAR. ROOF RETRACTED (2.5s). UAV-01 MOTORS SPINNING.",
        droneTelemetry: {
          altitudeMeters: 0,
          airspeedKmh: 0,
          gimbalPitchDeg: 0,
          batteryPct: 98,
          status: "LID RETRACTED • TAKE-OFF SPOOL",
        },
        visualGraphic: "dock_unseal",
      },
      {
        stepNumber: 5,
        timestamp: "00:12.400",
        phaseTitle: "Autonomous Launch Through Fog Deck",
        actor: "VTOL DRONE (UAV-04)",
        description:
          "UAV-01 takes off in 10.8s, climbing above the 30m ground fog bank into clear air at 50m AGL, routing autonomously along the ridge line.",
        tacticalLog:
          "[03:15:32.400] UAV-01: AIRBORNE IN 10.8s. PUNCHED THROUGH FOG DECK AT 32m. NAVIGATING TO INTERCEPT POINT.",
        droneTelemetry: {
          altitudeMeters: 50.0,
          airspeedKmh: 54,
          gimbalPitchDeg: -45,
          batteryPct: 97,
          status: "AIRBORNE AT 50m AGL • FOG LAYER CLEARED",
        },
        visualGraphic: "rapid_ascent",
      },
      {
        stepNumber: 6,
        timestamp: "00:23.800",
        phaseTitle: "Thermal Human Body Heat Lock",
        actor: "FLIR BOSON 640",
        description:
          "FLIR Boson 640 detects 3 high-contrast 37.0°C human body heat signatures moving in tactical diamond formation behind rhododendron cover.",
        tacticalLog:
          "[03:15:43.800] FLIR BOSON: LOCK ACQUIRED ON 3 TARGETS (37.0°C). TARGET SPEEDS 3.8 KM/H. HUD RETICLE LOCKED.",
        droneTelemetry: {
          altitudeMeters: 47.5,
          airspeedKmh: 8,
          gimbalPitchDeg: -60,
          batteryPct: 95,
          status: "TARGET LOCK: 3 COMBATANTS IDENTIFIED",
        },
        visualGraphic: "thermal_lock",
      },
      {
        stepNumber: 7,
        timestamp: "00:37.000",
        phaseTitle: "Ambush Averted & Tactical Interdiction",
        actor: "FORWARD COMMAND (QRF)",
        description:
          "Live thermal video relayed to Forward Operating Base. Troops deploy with precise coordinates, flanking intruders before breach. Zero casualties.",
        tacticalLog:
          "[03:15:57.000] C2 DASHBOARD: AMBUSH VECTOR NEUTRALIZED. INTRUSION SQUAD INTERCEPTED AT BORDER BOUNDARY. MISSION ACCOMPLISHED.",
        droneTelemetry: {
          altitudeMeters: 45.0,
          airspeedKmh: 0,
          gimbalPitchDeg: -70,
          batteryPct: 93,
          status: "AIRBORNE RECON MAINTAINED",
        },
        visualGraphic: "qrf_interdiction",
      },
    ],
  },
  {
    id: "wildlife_mission",
    title: "MISSION CHARLIE: Wildlife Suppression (Zero False Alarm)",
    sector: "SECTOR 05 (RAJOURI SCRUB FOREST)",
    time: "04:10:05 AM",
    terrain: "Rocky Scrub & Undergrowth",
    weather: "Clear, Gusty Winds (12 m/s)",
    threatType: "Wild Boar Herd Movement (Benign Noise)",
    summary:
      "A herd of wild boar traverses the perimeter. Non-coincident micro-tremors and acoustic animal grunts are analyzed on-node. Edge AI suppresses the alarm, preventing drone launch and conserving battery power.",
    steps: [
      {
        stepNumber: 1,
        timestamp: "00:00.000",
        phaseTitle: "Irregular Ground Tremors Detected",
        actor: "GROUND SENSOR (N-14)",
        description:
          "Node N-22 detects irregular 6-10 Hz low-frequency vibration from multi-footed animal movement.",
        tacticalLog:
          "[04:10:05.000] NODE N-22: VIBRATION DETECTED. APERIODIC MULTI-POINT TRANSIENTS.",
        droneTelemetry: {
          altitudeMeters: 0,
          airspeedKmh: 0,
          gimbalPitchDeg: 0,
          batteryPct: 100,
          status: "DOCKED (POWER CONSERVATION MODE)",
        },
        visualGraphic: "seismic_wave",
      },
      {
        stepNumber: 2,
        timestamp: "00:01.400",
        phaseTitle: "Edge AI False Alarm Suppression",
        actor: "EDGE MCU (STM32H7)",
        description:
          "Cortex-M7 INT8 model checks phase coherence between geophone and acoustic channels. Irregular footfall cadence matches quadruped profile. Classifies as `BENIGN_ENVIRONMENTAL_FILTERED` (96.2% confidence).",
        tacticalLog:
          "[04:10:06.400] NODE N-22: CLASSIFIED AS BENIGN_WILDLIFE (96.2%). NO ALARM TRANSMITTED. RETURNING TO DEEP SLEEP (1.5 µA).",
        droneTelemetry: {
          altitudeMeters: 0,
          airspeedKmh: 0,
          gimbalPitchDeg: 0,
          batteryPct: 100,
          status: "DOCKED (NO FALSE LAUNCH • BATTERY SAVED)",
        },
        visualGraphic: "edge_inference",
      },
      {
        stepNumber: 3,
        timestamp: "00:02.000",
        phaseTitle: "Drone Preserved in Dock (No Battery Drain)",
        actor: "DRONE DOCK 02",
        description:
          "Unlike traditional UAVs that waste battery flying random patrols, BHOOMI's drone remains safely in its weatherproof dock, maintaining 100% battery reserve for actual enemy threats.",
        tacticalLog:
          "[04:10:07.000] SYSTEM: ZERO FALSE LAUNCH. DRONE FULLY CHARGED AND READY FOR HOSTILE INCURSIONS.",
        droneTelemetry: {
          altitudeMeters: 0,
          airspeedKmh: 0,
          gimbalPitchDeg: 0,
          batteryPct: 100,
          status: "DOCKED (100% READY FOR ACTUAL THREATS)",
        },
        visualGraphic: "dock_unseal",
      },
    ],
  },
];

export function BorderMissionStorySimulator() {
  const [selectedMissionId, setSelectedMissionId] = useState<string>("tunnel_mission");
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const mission = MISSIONS.find((m) => m.id === selectedMissionId) || MISSIONS[0];
  const step = mission.steps[currentStepIndex];
  const totalSteps = mission.steps.length;

  // Sound effect triggers when step changes
  useEffect(() => {
    if (!isAudioMuted) {
      if (step.stepNumber === 1) tacticalAudio.playThreatAlarm();
      else if (step.stepNumber === 3) tacticalAudio.playBeep(980, 0.1, "sine");
      else if (step.stepNumber === 4) tacticalAudio.playDockServo();
      else if (step.stepNumber === 5) tacticalAudio.playDroneLaunch();
      else if (step.stepNumber === 6) tacticalAudio.playTargetLock();
      else tacticalAudio.playBeep(720, 0.08, "sine");
    }
  }, [currentStepIndex, isAudioMuted, step.stepNumber]);

  // Handle Play/Pause Auto-Advance
  useEffect(() => {
    if (isPlaying) {
      const stepDuration = playbackSpeed === 2 ? 2200 : 4500;
      timerRef.current = setTimeout(() => {
        if (currentStepIndex < totalSteps - 1) {
          setCurrentStepIndex((prev) => prev + 1);
        } else {
          setIsPlaying(false);
        }
      }, stepDuration);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPlaying, currentStepIndex, totalSteps, playbackSpeed]);

  const handleSelectMission = (id: string) => {
    setSelectedMissionId(id);
    setCurrentStepIndex(0);
    setIsPlaying(false);
    tacticalAudio.playBeep(800, 0.05);
  };

  const handleNext = () => {
    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
    tacticalAudio.playBeep(600, 0.05);
  };

  const toggleSound = () => {
    const muted = tacticalAudio.toggleMute();
    setIsAudioMuted(muted);
  };

  const telemetry = step.droneTelemetry;

  return (
    <div className="w-full rounded-3xl border border-emerald-500/40 bg-[#060911] p-5 sm:p-8 shadow-[0_0_50px_rgba(16,185,129,0.12)] space-y-6">
      {/* Top Header: Scenario Selector & Sound Toggle */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="text-xs font-mono font-bold text-emerald-400 tracking-wider">
              REAL-TIME BORDER OPERATION STORYBOARD
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30">
              OPERATIONAL GROUND-TO-AIR REACTION
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-1">
            {mission.title}
          </h3>
          <p className="text-xs font-mono text-slate-400 mt-1">
            {mission.sector} • <span className="text-cyan-400">{mission.weather}</span> • <span className="text-amber-400">{mission.time}</span>
          </p>
        </div>

        {/* Mission Selectors & Sound Mute Toggle */}
        <div className="flex flex-wrap items-center gap-2">
          {MISSIONS.map((m) => (
            <button
              key={m.id}
              onClick={() => handleSelectMission(m.id)}
              className={`px-3 py-2 rounded-xl text-xs font-mono tracking-wider transition-all ${
                selectedMissionId === m.id
                  ? "bg-emerald-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                  : "bg-slate-900/80 text-slate-400 border border-slate-800 hover:text-white"
              }`}
            >
              {m.id === "tunnel_mission" ? "01: TUNNEL INTERDICTION" : m.id === "fog_mission" ? "02: FOG INFILTRATION" : "03: WILDLIFE FILTER"}
            </button>
          ))}

          {/* Sound FX Button */}
          <button
            onClick={toggleSound}
            className={`p-2 rounded-xl border transition-all ${
              !isAudioMuted
                ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50"
                : "bg-slate-900 text-slate-500 border-slate-800 hover:text-slate-300"
            }`}
            title={isAudioMuted ? "Enable Tactical Audio FX" : "Mute Audio FX"}
          >
            {!isAudioMuted ? <Volume2 className="w-4 h-4 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Narrative Mission Briefing Box */}
      <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="space-y-1">
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block font-bold">
            OPERATIONAL SITUATION BRIEF:
          </span>
          <p className="text-slate-300 font-sans leading-relaxed">
            {mission.summary}
          </p>
        </div>
        <div className="shrink-0 flex items-center gap-2 font-mono text-[11px] text-slate-400 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
          <Clock className="w-3.5 h-3.5 text-amber-400" />
          <span>ELAPSED TIME: <strong className="text-white">{step.timestamp}</strong></span>
        </div>
      </div>

      {/* Centerpiece: Tactical Border Battlefield Cross-Section Canvas */}
      <TacticalBorderCanvas
        stepNumber={step.stepNumber}
        scenarioId={selectedMissionId}
        altitudeMeters={telemetry?.altitudeMeters || 0}
        airspeedKmh={telemetry?.airspeedKmh || 0}
        batteryPct={telemetry?.batteryPct || 98}
        tacticalLog={step.tacticalLog}
      />

      {/* Ground Narrative Storyboard Callout */}
      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/90 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        <div className="md:col-span-8 space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/40 font-bold">
              PHASE {step.stepNumber}: {step.phaseTitle}
            </span>
            <span className="text-cyan-400 font-bold">ACTOR: {step.actor}</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans pt-1">
            {step.description}
          </p>
        </div>

        <div className="md:col-span-4 bg-[#090e18] p-3 rounded-lg border border-slate-800 text-[11px] font-mono space-y-1.5">
          <span className="text-[10px] text-slate-500 uppercase font-bold block">TACTICAL METRICS:</span>
          <div className="flex justify-between">
            <span className="text-slate-400">TIMESTAMP:</span>
            <span className="text-white font-bold">{step.timestamp}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">DRONE STATE:</span>
            <span className="text-emerald-400 font-bold truncate max-w-[140px]">{telemetry?.status.split(" ")[0]}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">RADIAL ERROR:</span>
            <span className="text-cyan-400 font-bold">&lt; 2.4m</span>
          </div>
        </div>
      </div>

      {/* Military Radio Telemetry Log Terminal */}
      <div className="p-3.5 rounded-xl bg-black border border-slate-800 font-mono text-xs space-y-1">
        <div className="flex items-center justify-between text-[10px] text-slate-500 pb-1 border-b border-slate-900">
          <span className="flex items-center gap-1 text-emerald-400">
            <Radio className="w-3 h-3 animate-pulse" />
            <span>REAL-TIME MILITARY SECURE TELEMETRY LINK</span>
          </span>
          <span>BAUD: 115200 • AES-256 GCM</span>
        </div>
        <p className="text-emerald-300 font-mono text-[11px] leading-relaxed pt-1">
          {step.tacticalLog}
        </p>
      </div>

      {/* Continuous Timeline Scrubber & Playback Controls */}
      <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col gap-4">
        {/* Timeline Slider Track */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-[10px] font-mono text-slate-400">
            <span>START: 00:00.000 (EXCITATION ONSET)</span>
            <span className="text-emerald-400 font-bold">SCRUB TIMELINE: {step.timestamp}</span>
            <span>END: 00:42.000 (INTERDICTION)</span>
          </div>
          <input
            type="range"
            min={0}
            max={totalSteps - 1}
            value={currentStepIndex}
            onChange={(e) => {
              setIsPlaying(false);
              setCurrentStepIndex(Number(e.target.value));
            }}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 border-t border-slate-900">
          {/* Play / Step Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-mono text-xs font-bold transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)]"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4 fill-current" />
                  <span>PAUSE STORY</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>PLAY REAL-TIME BORDER MISSION</span>
                </>
              )}
            </button>

            <button
              onClick={handlePrev}
              disabled={currentStepIndex === 0}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white disabled:opacity-40 transition-colors"
              title="Previous Step"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={handleNext}
              disabled={currentStepIndex === totalSteps - 1}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white disabled:opacity-40 transition-colors"
              title="Next Step"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={handleReset}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
              title="Reset to Step 1"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Step Indicators */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {mission.steps.map((s, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setIsPlaying(false);
                  setCurrentStepIndex(idx);
                }}
                className={`h-2.5 rounded-full transition-all ${
                  idx === currentStepIndex
                    ? "w-8 bg-emerald-400 shadow-[0_0_10px_#10b981]"
                    : idx < currentStepIndex
                    ? "w-4 bg-emerald-700"
                    : "w-2.5 bg-slate-800"
                }`}
                title={`Step ${idx + 1}: ${s.phaseTitle}`}
              />
            ))}
          </div>

          {/* Speed Selector */}
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span>SPEED:</span>
            <button
              onClick={() => setPlaybackSpeed(1)}
              className={`px-2 py-1 rounded text-[10px] font-bold ${
                playbackSpeed === 1
                  ? "bg-slate-800 text-white border border-slate-700"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              1x REAL
            </button>
            <button
              onClick={() => setPlaybackSpeed(2)}
              className={`px-2 py-1 rounded text-[10px] font-bold ${
                playbackSpeed === 2
                  ? "bg-emerald-500 text-slate-950"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              2x RAPID
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
