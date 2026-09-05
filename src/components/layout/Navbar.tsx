"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Radio, Menu, X, FileText, ChevronRight, Award } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Overview", href: "/" },
    { name: "Technology", href: "/technology" },
    { name: "Roadmap & Budget", href: "/roadmap" },
    { name: "Applications", href: "/applications" },
    { name: "Grant Portal", href: "/contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#06080e]/90 backdrop-blur-md border-b border-slate-800/80 shadow-2xl py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-500/40 group-hover:border-emerald-400 transition-colors">
                <Radio className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
                <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-black tracking-widest text-white font-mono">
                    BHOOMI
                  </span>
                  <span className="hidden sm:inline-flex items-center gap-1 text-[9px] font-mono font-semibold px-2 py-0.5 rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-500/30">
                    <Award className="w-3 h-3" /> iDEX PROPOSAL
                  </span>
                </div>
                <span className="text-[10px] tracking-wider text-slate-400 uppercase font-mono">
                  Seismic–Acoustic Fusion Network
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`relative px-3.5 py-2 text-xs font-medium uppercase tracking-wider rounded-lg transition-all duration-200 ${
                      isActive
                        ? "text-emerald-400 font-semibold bg-emerald-950/30 border border-emerald-500/30"
                        : "text-slate-300 hover:text-white hover:bg-slate-800/40"
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavTab"
                        className="absolute bottom-0 left-2 right-2 h-0.5 bg-emerald-400 rounded-full"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Button */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href="/contact"
                className="relative inline-flex items-center gap-2 px-4 py-2 text-xs font-mono font-semibold tracking-wider text-emerald-300 rounded-xl bg-emerald-950/40 border border-emerald-500/40 hover:bg-emerald-900/40 hover:border-emerald-400 transition-all shadow-[0_0_15px_rgba(16,185,129,0.15)] group"
              >
                <FileText className="w-3.5 h-3.5 text-emerald-400" />
                <span>EVALUATOR BRIEFING</span>
                <ChevronRight className="w-3.5 h-3.5 text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg bg-slate-900/80 border border-slate-700 text-slate-300 hover:text-white"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[70px] z-40 bg-[#06080e]/95 backdrop-blur-xl border-b border-slate-800 p-6 md:hidden shadow-2xl"
          >
            <div className="flex flex-col gap-3">
              <div className="pb-2 border-b border-slate-800">
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider">
                  DEFENCE DEEPTECH NAVIGATION
                </span>
              </div>
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-xl text-sm font-medium tracking-wide flex items-center justify-between ${
                    pathname === link.href
                      ? "bg-emerald-950/40 text-emerald-400 border border-emerald-500/30"
                      : "text-slate-300 hover:bg-slate-800/40"
                  }`}
                >
                  <span>{link.name}</span>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </Link>
              ))}

              <div className="pt-3 border-t border-slate-800">
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm tracking-wider"
                >
                  <FileText className="w-4 h-4" />
                  <span>REQUEST GRANT BRIEFING</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
