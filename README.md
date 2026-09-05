# BHOOMI — Deeptech Defence Intelligence Platform
### Passive Seismic–Acoustic Fusion Network for Border Infiltration & Sub-Surface Tunnel Detection
**Prepared for iDEX Open Challenge (Ministry of Defence / Defence Innovation Organisation - DIO)**

---

## 🛡️ Project Overview

**BHOOMI** (*Border Hazard Observation & Onset Monitoring Infrastructure*) is a full-stack, responsive, multipage deeptech defence platform engineered to secure Government Grants (iDEX Open Challenge ₹1.5 Cr ceiling) and showcase innovative subterranean and surface border surveillance along India's Line of Control (LoC) and Line of Actual Control (LAC).

### Key Features
- **Tactical Command HUD**: Obsidian carbon aesthetic with cybernetic emerald, stealth cyan, and amber alert accents.
- **Interactive Dual-Modality Waveform Engine**: Real-time HTML5 Canvas visualizer simulating 250 Hz geophone P/S waves and MEMS acoustic harmonics.
- **On-Edge Neural Sensor Fusion Simulator**: Interactive testbed allowing grant evaluators to test 4 real-world threat scenarios (*Sub-Surface Tunnel Digging*, *Covert Footstep Infiltration*, *Heavy Armored Vehicle*, and *Wildlife / Environmental Noise*) to observe how dual-channel cross-verification eliminates false alarms (<5% false alarm ratio).
- **Interactive System Architecture**: Step-by-step breakdown of buried sensor nodes, encrypted LoRa mesh relay, sector gateways, and command post dashboard.
- **Table 1 Capability Gap Analysis**: Interactive comparative matrix benchmarking BHOOMI vs Optical Cameras, Ground Radar, and Borehole Seismometers.
- **18-Month TRL Progression & Gantt**: Interactive progression from TRL 1/2 to TRL 6/7.
- **Table 2 Milestone-Linked Budget Break-up**: Detailed ₹1.30 Crore budget across sensor hardware (₹57 L), AI software (₹18 L), enclosure ruggedisation (₹15 L), field trials (₹25 L), and testing/certification (₹15 L).
- **Full-Stack Supabase Integration**: Pre-configured database schema (`supabase/schema.sql`) with Row-Level Security (RLS) and Next.js Server Actions for evaluator briefing requests and proposal dossier downloads.

---

## 🚀 Quick Start (Local Development)

### 1. Prerequisites
- Node.js 18+ or 20+ (Tested on Node.js v24)
- npm or pnpm

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🗄️ Supabase Backend Setup

1. Create a free project at [https://supabase.com](https://supabase.com).
2. In your Supabase project dashboard, navigate to **SQL Editor**.
3. Copy the contents of [`supabase/schema.sql`](./supabase/schema.sql) and execute the query. This sets up:
   - `grant_inquiries` table with public insert & protected reading
   - `whitepaper_requests` table
   - `telemetry_logs` table with sample border telemetry
   - Strict Row-Level Security (RLS) policies
4. In **Project Settings** -> **API**, copy your **Project URL** and **anon public key**.
5. Update your `.env.local` file:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```
*(Note: If you run without Supabase keys, the platform runs in demonstration mode with graceful fallbacks).*

---

## 🐙 Push to GitHub Repository

Initialize and push to your GitHub repository:

```bash
git add .
git commit -m "Initial commit: BHOOMI deeptech defence platform for iDEX Open Challenge"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

---

## ☁️ Deploy to Vercel

1. Log in to [Vercel](https://vercel.com).
2. Click **Add New** -> **Project**.
3. Select your imported GitHub repository.
4. Under **Environment Variables**, add:
   - `NEXT_PUBLIC_SUPABASE_URL` = your Supabase URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your Supabase anon key
5. Click **Deploy**. Vercel will automatically build and deploy the Next.js App Router application with edge optimizations and security headers.

---

## 📂 Project Structure

```
├── src/
│   ├── app/
│   │   ├── layout.tsx             # Root layout with tactical dark theme & fonts
│   │   ├── page.tsx               # Command HUD Homepage
│   │   ├── globals.css            # Tactical styling, scanlines, and glow utilities
│   │   ├── not-found.tsx          # Tactical 404 handler
│   │   ├── technology/page.tsx    # Hardware layers & Sensor Fusion pipeline
│   │   ├── roadmap/page.tsx       # TRL 1→7 progression & ₹1.30 Cr budget
│   │   ├── applications/page.tsx  # LoC/LAC operational scenarios
│   │   ├── contact/page.tsx       # Evaluator briefing & proposal portal
│   │   └── actions/               # Server Actions (Zod validation + Supabase)
│   │       ├── inquiry.ts
│   │       └── whitepaper.ts
│   ├── components/
│   │   ├── layout/                # Navbar (with iDEX badge) & Footer
│   │   ├── animations/            # RadarSweep, Canvas SeismicWaveform, ThreatClassifierSim
│   │   ├── providers/             # SmoothScrollProvider (Lenis)
│   │   ├── home/                  # HeroSection, SystemArchitecture, ComparativeMatrix
│   │   ├── technology/            # SensorNodeExploded, FusionPipeline, TechnicalSpecs
│   │   ├── roadmap/               # TrlProgression, BudgetBreakdown, RiskMatrix
│   │   ├── applications/          # DefenseScenarios
│   │   └── contact/               # GrantInquiryForm, WhitepaperCard
│   ├── lib/
│   │   ├── utils.ts               # Class merging & currency helpers
│   │   └── supabase/              # Browser and server clients with RLS
│   └── types/                     # TypeScript definitions
├── supabase/
│   └── schema.sql                 # Production PostgreSQL schema with RLS
├── vercel.json                    # Security headers & caching configuration
├── tailwind.config.ts             # Tactical military palette configuration
└── package.json
```

---

## 📄 Compliance & Proposal Information

- **Submission Category**: Open Challenge — Individual Innovator
- **Technology Domain**: Autonomous Systems / Artificial Intelligence / Sensors
- **Funding Ceiling**: Up to ₹1.5 Crore (as per iDEX Open Challenge norms)
- **Proposed Budget**: ₹1.30 Crore (Milestone-linked across 3 phases)
- **Submission Deadline**: 30 September 2026, 11:59 PM
- **Proposal Document**: v2.0 — Detailed Technical & Financial Submission
- **Intellectual Property**: Innovator-retained IP with permanent usage rights granted to the Ministry of Defence
