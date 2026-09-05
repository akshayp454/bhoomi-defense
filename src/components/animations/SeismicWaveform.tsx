"use client";

import React, { useEffect, useRef } from "react";
import { ThreatScenario } from "@/types";

interface SeismicWaveformProps {
  scenario: ThreatScenario;
  height?: number;
}

export function SeismicWaveform({ scenario, height = 180 }: SeismicWaveformProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const render = () => {
      time += 0.04;
      const width = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, width, h);

      // Background grid lines
      ctx.strokeStyle = "rgba(30, 41, 59, 0.4)";
      ctx.lineWidth = 1;
      const step = 25;
      for (let x = 0; x < width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Center baseline
      const midY1 = h * 0.32; // Seismic baseline
      const midY2 = h * 0.72; // Acoustic baseline

      ctx.strokeStyle = "rgba(16, 185, 129, 0.2)";
      ctx.beginPath();
      ctx.moveTo(0, midY1);
      ctx.lineTo(width, midY1);
      ctx.stroke();

      ctx.strokeStyle = "rgba(6, 182, 212, 0.2)";
      ctx.beginPath();
      ctx.moveTo(0, midY2);
      ctx.lineTo(width, midY2);
      ctx.stroke();

      // Parameters based on scenario
      let sFreq = 1.0;
      let sAmp = 18;
      let aFreq = 1.2;
      let aAmp = 14;
      let noiseLevel = 3;

      if (scenario === "digging") {
        // Rhythmic periodic underground impacts (high seismic, muffled low acoustic)
        sFreq = 2.4;
        sAmp = 34;
        aFreq = 0.8;
        aAmp = 8; // Muffled acoustic because subterranean
      } else if (scenario === "infiltration") {
        // Stealth footsteps (medium localized seismic, slight acoustic brush)
        sFreq = 1.8;
        sAmp = 20;
        aFreq = 2.5;
        aAmp = 16;
      } else if (scenario === "vehicle") {
        // Continuous high amplitude heavy engine rumblings
        sFreq = 4.2;
        sAmp = 42;
        aFreq = 3.8;
        aAmp = 36;
      } else if (scenario === "wildlife") {
        // Light erratic movements, bird cries/canopy rustle (low seismic, erratic high acoustic)
        sFreq = 0.9;
        sAmp = 8;
        aFreq = 4.5;
        aAmp = 28;
      }

      // 1. Draw Seismic Channel (Geophone P/S Wave)
      ctx.beginPath();
      ctx.strokeStyle = "#10b981";
      ctx.lineWidth = 2;
      ctx.shadowColor = "#10b981";
      ctx.shadowBlur = 8;

      for (let x = 0; x < width; x++) {
        const pulse = scenario === "digging" ? Math.sin((x * 0.03) + time * 3) : 1;
        const y =
          midY1 +
          Math.sin(x * 0.05 * sFreq + time * 2) * sAmp * (0.6 + 0.4 * Math.abs(pulse)) +
          Math.sin(x * 0.12 + time) * (noiseLevel * 1.5);

        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // 2. Draw Acoustic Channel (MEMS Microphone Frequency Harmonic)
      ctx.beginPath();
      ctx.strokeStyle = "#06b6d4";
      ctx.lineWidth = 2;
      ctx.shadowColor = "#06b6d4";
      ctx.shadowBlur = 8;

      for (let x = 0; x < width; x++) {
        const y =
          midY2 +
          Math.sin(x * 0.07 * aFreq - time * 3) * aAmp +
          Math.cos(x * 0.18 + time * 2) * (noiseLevel * 1.8);

        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Reset shadow
      ctx.shadowBlur = 0;

      // Labels inside canvas
      ctx.font = "10px monospace";
      ctx.fillStyle = "#10b981";
      ctx.fillText(`CHANNEL 1: GEOPHONE SEISMIC MICRO-VIBRATION [${sFreq * 10} Hz]`, 12, midY1 - 22);

      ctx.fillStyle = "#06b6d4";
      ctx.fillText(`CHANNEL 2: MEMS ACOUSTIC HARMONIC ANALYSIS [${aFreq * 80} Hz]`, 12, midY2 - 20);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [scenario]);

  return (
    <div className="relative w-full rounded-xl overflow-hidden border border-slate-800 bg-[#080d16]">
      <canvas
        ref={canvasRef}
        width={750}
        height={height}
        className="w-full h-auto block"
      />
    </div>
  );
}
