import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";

export const metadata: Metadata = {
  title: "NaX Nova LLP | BHOOMI™ Autonomous Defence Sensor Mesh",
  description:
    "NaX Nova LLP presents BHOOMI™: An autonomous passive seismic-acoustic sensor fusion mesh for sub-surface tunnel detection and zero-visibility border infiltration interdiction.",
  keywords: [
    "NaX Nova",
    "NaX Nova LLP",
    "BHOOMI",
    "Defence Tech",
    "Seismic sensor mesh",
    "Sub-surface tunnel detection",
    "Border surveillance",
    "Edge AI sensor fusion",
    "Atmanirbhar Bharat",
    "Make in India",
  ],
  authors: [{ name: "NaX Nova LLP" }],
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
