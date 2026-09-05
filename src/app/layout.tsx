import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";

export const metadata: Metadata = {
  title: "BHOOMI — Passive Seismic–Acoustic Fusion Network | iDEX Defence Proposal",
  description:
    "Border Hazard Observation & Onset Monitoring Infrastructure. An indigenous deeptech sensor network for border infiltration & sub-surface tunnel detection along LoC and LAC.",
  keywords: [
    "BHOOMI",
    "iDEX Open Challenge",
    "Defence Innovation Organisation",
    "Seismic sensor",
    "Sub-surface tunnel detection",
    "Border security",
    "Atmanirbhar Bharat",
    "Edge AI",
    "Sensor Fusion",
  ],
  authors: [{ name: "BHOOMI Innovator Team" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#06080e] text-slate-100 antialiased selection:bg-emerald-500/30 selection:text-emerald-300 font-sans">
        <SmoothScrollProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
