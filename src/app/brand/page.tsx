"use client";

import { motion } from "framer-motion";

// ============================================
// EIDS WORDMARK VARIATIONS
// Enterprise Integrated Data System
// Defense Health Agency
// ============================================

// VERSION 1: MILITARY STENCIL
// Inspired by military equipment stenciling - bold, utilitarian, authoritative
const EIDSStencil = ({ size = "lg" }: { size?: "sm" | "md" | "lg" }) => {
  const sizes = {
    sm: { text: "text-2xl", gap: "gap-1" },
    md: { text: "text-4xl", gap: "gap-2" },
    lg: { text: "text-6xl", gap: "gap-3" },
  };

  return (
    <div className="flex items-center gap-4">
      {/* Icon: Stacked data bars forming shield shape */}
      <div className="relative">
        <svg viewBox="0 0 48 56" className={size === "lg" ? "w-14 h-16" : size === "md" ? "w-10 h-12" : "w-8 h-9"}>
          {/* Shield outline */}
          <path
            d="M24 2 L44 10 L44 28 C44 40 24 54 24 54 C24 54 4 40 4 28 L4 10 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            className="text-emerald-500"
          />
          {/* Data bars inside shield */}
          <rect x="12" y="16" width="24" height="4" rx="1" fill="currentColor" className="text-emerald-500" />
          <rect x="12" y="24" width="18" height="4" rx="1" fill="currentColor" className="text-emerald-400" />
          <rect x="12" y="32" width="21" height="4" rx="1" fill="currentColor" className="text-emerald-500" />
          <rect x="12" y="40" width="12" height="4" rx="1" fill="currentColor" className="text-emerald-400" />
        </svg>
      </div>
      {/* Stencil text */}
      <div className={`font-black tracking-[0.2em] ${sizes[size].text}`} style={{ fontFamily: "'Bebas Neue', 'Impact', sans-serif" }}>
        <span className="text-white" style={{
          textShadow: "2px 2px 0 #065f46",
          WebkitTextStroke: "1px #065f46"
        }}>
          E<span className="text-emerald-500">I</span>DS
        </span>
      </div>
    </div>
  );
};

// VERSION 2: TECH GRID / CIRCUIT
// Digital infrastructure aesthetic - connected nodes, data flow
const EIDSCircuit = ({ size = "lg" }: { size?: "sm" | "md" | "lg" }) => {
  const sizes = {
    sm: { container: "h-10", text: "text-xl" },
    md: { container: "h-14", text: "text-3xl" },
    lg: { container: "h-20", text: "text-5xl" },
  };

  return (
    <div className={`flex items-center gap-3 ${sizes[size].container}`}>
      {/* Circuit board icon */}
      <div className="relative">
        <svg viewBox="0 0 56 56" className={size === "lg" ? "w-16 h-16" : size === "md" ? "w-12 h-12" : "w-8 h-8"}>
          {/* Main circuit paths */}
          <path
            d="M8 28 H20 M36 28 H48 M28 8 V20 M28 36 V48"
            stroke="currentColor"
            strokeWidth="2"
            className="text-cyan-400"
          />
          {/* Diagonal connections */}
          <path
            d="M14 14 L22 22 M34 22 L42 14 M14 42 L22 34 M34 34 L42 42"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-cyan-600"
          />
          {/* Center processor */}
          <rect x="20" y="20" width="16" height="16" rx="2" fill="currentColor" className="text-cyan-500" />
          <rect x="24" y="24" width="8" height="8" rx="1" fill="currentColor" className="text-slate-900" />
          {/* Connection nodes */}
          <circle cx="8" cy="28" r="3" fill="currentColor" className="text-cyan-400" />
          <circle cx="48" cy="28" r="3" fill="currentColor" className="text-cyan-400" />
          <circle cx="28" cy="8" r="3" fill="currentColor" className="text-cyan-400" />
          <circle cx="28" cy="48" r="3" fill="currentColor" className="text-cyan-400" />
        </svg>
      </div>
      {/* Monospace tech text */}
      <div className="relative">
        <span
          className={`font-mono font-bold tracking-tight ${sizes[size].text}`}
          style={{
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            background: "linear-gradient(135deg, #22d3ee 0%, #0891b2 50%, #164e63 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          EIDS
        </span>
        {/* Underline data stream */}
        <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 via-cyan-300 to-transparent" />
      </div>
    </div>
  );
};

// VERSION 3: MEDICAL/HEALTHCARE CROSS
// Healthcare-forward design - clean, trustworthy, clinical precision
const EIDSMedical = ({ size = "lg" }: { size?: "sm" | "md" | "lg" }) => {
  const sizes = {
    sm: { icon: "w-8 h-8", text: "text-2xl", sub: "text-[8px]" },
    md: { icon: "w-12 h-12", text: "text-4xl", sub: "text-[10px]" },
    lg: { icon: "w-16 h-16", text: "text-5xl", sub: "text-xs" },
  };

  return (
    <div className="flex items-center gap-4">
      {/* Medical cross with data integration */}
      <div className={`relative ${sizes[size].icon}`}>
        <svg viewBox="0 0 48 48" className="w-full h-full">
          {/* Soft glow background */}
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          {/* Cross shape */}
          <path
            d="M18 4 H30 V18 H44 V30 H30 V44 H18 V30 H4 V18 H18 Z"
            fill="currentColor"
            className="text-red-500"
            filter="url(#glow)"
          />
          {/* Inner cross highlight */}
          <path
            d="M20 8 H28 V20 H40 V28 H28 V40 H20 V28 H8 V20 H20 Z"
            fill="currentColor"
            className="text-red-400"
          />
          {/* Data pulse in center */}
          <path
            d="M16 24 L20 24 L22 20 L24 28 L26 22 L28 24 L32 24"
            stroke="white"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      {/* Clean sans-serif wordmark */}
      <div className="flex flex-col">
        <span
          className={`font-semibold tracking-wide ${sizes[size].text}`}
          style={{
            fontFamily: "'Plus Jakarta Sans', 'Outfit', sans-serif",
            color: "#ef4444"
          }}
        >
          EIDS
        </span>
        <span className={`${sizes[size].sub} tracking-[0.3em] text-slate-400 uppercase font-medium -mt-1`}>
          Defense Health
        </span>
      </div>
    </div>
  );
};

// VERSION 4: GOVERNMENT SEAL / OFFICIAL
// Authoritative federal aesthetic - seal, eagle motifs, official gravitas
const EIDSSeal = ({ size = "lg" }: { size?: "sm" | "md" | "lg" }) => {
  const sizes = {
    sm: { icon: "w-10 h-10", text: "text-xl", tracking: "tracking-[0.15em]" },
    md: { icon: "w-14 h-14", text: "text-3xl", tracking: "tracking-[0.2em]" },
    lg: { icon: "w-20 h-20", text: "text-4xl", tracking: "tracking-[0.25em]" },
  };

  return (
    <div className="flex items-center gap-4">
      {/* Official seal */}
      <div className={`relative ${sizes[size].icon}`}>
        <svg viewBox="0 0 64 64" className="w-full h-full">
          {/* Outer ring with stars */}
          <circle cx="32" cy="32" r="30" fill="none" stroke="currentColor" strokeWidth="2" className="text-amber-500" />
          <circle cx="32" cy="32" r="26" fill="none" stroke="currentColor" strokeWidth="1" className="text-amber-600" />
          {/* Stars around the ring */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
            <circle
              key={i}
              cx={32 + 28 * Math.cos((angle * Math.PI) / 180)}
              cy={32 + 28 * Math.sin((angle * Math.PI) / 180)}
              r="2"
              fill="currentColor"
              className="text-amber-400"
            />
          ))}
          {/* Inner shield */}
          <path
            d="M32 12 L48 20 L48 34 C48 44 32 52 32 52 C32 52 16 44 16 34 L16 20 Z"
            fill="currentColor"
            className="text-slate-800"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M32 12 L48 20 L48 34 C48 44 32 52 32 52 C32 52 16 44 16 34 L16 20 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-amber-500"
          />
          {/* E inside shield */}
          <text x="32" y="38" textAnchor="middle" fill="currentColor" className="text-amber-500" fontSize="18" fontWeight="bold" fontFamily="serif">
            E
          </text>
        </svg>
      </div>
      {/* Serif official text */}
      <div className="flex flex-col items-start">
        <span
          className={`font-bold ${sizes[size].text} ${sizes[size].tracking}`}
          style={{
            fontFamily: "'Playfair Display', 'Libre Baskerville', Georgia, serif",
            color: "#f59e0b"
          }}
        >
          EIDS
        </span>
        <div className="flex items-center gap-2">
          <div className="w-8 h-px bg-amber-600" />
          <span className="text-[10px] tracking-[0.2em] text-amber-600/80 uppercase font-medium">
            Est. 2025
          </span>
          <div className="w-8 h-px bg-amber-600" />
        </div>
      </div>
    </div>
  );
};

// VERSION 5: MODERN GEOMETRIC
// Bold, contemporary, abstract - pure shapes, strong contrast
const EIDSGeometric = ({ size = "lg" }: { size?: "sm" | "md" | "lg" }) => {
  const sizes = {
    sm: { icon: "w-8 h-8", text: "text-2xl" },
    md: { icon: "w-12 h-12", text: "text-4xl" },
    lg: { icon: "w-16 h-16", text: "text-5xl" },
  };

  return (
    <div className="flex items-center gap-4">
      {/* Abstract E made of blocks */}
      <div className={`relative ${sizes[size].icon}`}>
        <svg viewBox="0 0 48 48" className="w-full h-full">
          {/* Stacked rectangles forming abstract E */}
          <rect x="4" y="4" width="40" height="10" rx="2" fill="currentColor" className="text-violet-500" />
          <rect x="4" y="19" width="28" height="10" rx="2" fill="currentColor" className="text-violet-400" />
          <rect x="4" y="34" width="40" height="10" rx="2" fill="currentColor" className="text-violet-500" />
          {/* Vertical bar */}
          <rect x="4" y="4" width="10" height="40" rx="2" fill="currentColor" className="text-violet-600" />
          {/* Accent dot */}
          <circle cx="40" cy="24" r="4" fill="currentColor" className="text-fuchsia-400" />
        </svg>
      </div>
      {/* Bold geometric text */}
      <span
        className={`font-black ${sizes[size].text}`}
        style={{
          fontFamily: "'Syne', 'Archivo Black', sans-serif",
          background: "linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          letterSpacing: "-0.02em"
        }}
      >
        EIDS
      </span>
    </div>
  );
};

// VERSION 6: DATA FLOW / NEURAL
// AI-forward, neural network inspired, flowing data aesthetic
const EIDSNeural = ({ size = "lg" }: { size?: "sm" | "md" | "lg" }) => {
  const sizes = {
    sm: { icon: "w-10 h-10", text: "text-2xl" },
    md: { icon: "w-14 h-14", text: "text-4xl" },
    lg: { icon: "w-20 h-20", text: "text-5xl" },
  };

  return (
    <div className="flex items-center gap-3">
      {/* Neural network icon */}
      <div className={`relative ${sizes[size].icon}`}>
        <svg viewBox="0 0 64 64" className="w-full h-full">
          {/* Connection lines */}
          <path d="M12 20 Q32 10 52 20" stroke="currentColor" strokeWidth="1.5" fill="none" className="text-sky-400/60" />
          <path d="M12 32 Q32 22 52 32" stroke="currentColor" strokeWidth="1.5" fill="none" className="text-sky-500/60" />
          <path d="M12 44 Q32 34 52 44" stroke="currentColor" strokeWidth="1.5" fill="none" className="text-sky-400/60" />
          {/* Cross connections */}
          <path d="M12 20 L32 32 L12 44" stroke="currentColor" strokeWidth="1" fill="none" className="text-sky-600/40" />
          <path d="M52 20 L32 32 L52 44" stroke="currentColor" strokeWidth="1" fill="none" className="text-sky-600/40" />
          {/* Nodes - left column */}
          <circle cx="12" cy="20" r="5" fill="currentColor" className="text-sky-500" />
          <circle cx="12" cy="32" r="4" fill="currentColor" className="text-sky-400" />
          <circle cx="12" cy="44" r="5" fill="currentColor" className="text-sky-500" />
          {/* Nodes - center */}
          <circle cx="32" cy="32" r="8" fill="currentColor" className="text-sky-300" />
          <circle cx="32" cy="32" r="4" fill="currentColor" className="text-slate-900" />
          {/* Nodes - right column */}
          <circle cx="52" cy="20" r="5" fill="currentColor" className="text-sky-500" />
          <circle cx="52" cy="32" r="4" fill="currentColor" className="text-sky-400" />
          <circle cx="52" cy="44" r="5" fill="currentColor" className="text-sky-500" />
        </svg>
      </div>
      {/* Flowing text */}
      <div className="relative">
        <span
          className={`font-light ${sizes[size].text}`}
          style={{
            fontFamily: "'Space Grotesk', 'DM Sans', sans-serif",
            background: "linear-gradient(90deg, #38bdf8 0%, #0ea5e9 30%, #0284c7 60%, #0369a1 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "0.1em"
          }}
        >
          EIDS
        </span>
        {/* Animated underline pulse */}
        <motion.div
          className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-sky-400 to-sky-600"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        />
      </div>
    </div>
  );
};

// SHOWCASE PAGE
export default function BrandShowcasePage() {
  return (
    <div className="min-h-screen bg-slate-950 py-16 px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-white mb-4">EIDS Wordmark Variations</h1>
          <p className="text-slate-400 text-lg">Enterprise Integrated Data System • Defense Health Agency</p>
        </motion.div>

        {/* Grid of variations */}
        <div className="grid gap-12">
          {/* Version 1: Military Stencil */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-slate-900/50 rounded-2xl p-8 border border-slate-800"
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-white mb-1">Version 1: Military Stencil</h2>
                <p className="text-slate-500 text-sm">Bold, utilitarian, authoritative • Defense equipment inspired</p>
              </div>
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-medium rounded-full">Recommended</span>
            </div>
            <div className="flex items-center gap-12 py-8 px-4 bg-slate-950/50 rounded-xl">
              <EIDSStencil size="lg" />
              <EIDSStencil size="md" />
              <EIDSStencil size="sm" />
            </div>
          </motion.div>

          {/* Version 2: Tech Circuit */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-slate-900/50 rounded-2xl p-8 border border-slate-800"
          >
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-white mb-1">Version 2: Tech Circuit</h2>
              <p className="text-slate-500 text-sm">Digital infrastructure • Connected systems • Data flow</p>
            </div>
            <div className="flex items-center gap-12 py-8 px-4 bg-slate-950/50 rounded-xl">
              <EIDSCircuit size="lg" />
              <EIDSCircuit size="md" />
              <EIDSCircuit size="sm" />
            </div>
          </motion.div>

          {/* Version 3: Medical/Healthcare */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-slate-900/50 rounded-2xl p-8 border border-slate-800"
          >
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-white mb-1">Version 3: Medical Cross</h2>
              <p className="text-slate-500 text-sm">Healthcare-forward • Clinical precision • Trustworthy</p>
            </div>
            <div className="flex items-center gap-12 py-8 px-4 bg-slate-950/50 rounded-xl">
              <EIDSMedical size="lg" />
              <EIDSMedical size="md" />
              <EIDSMedical size="sm" />
            </div>
          </motion.div>

          {/* Version 4: Government Seal */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-slate-900/50 rounded-2xl p-8 border border-slate-800"
          >
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-white mb-1">Version 4: Government Seal</h2>
              <p className="text-slate-500 text-sm">Official federal aesthetic • Authoritative • Traditional gravitas</p>
            </div>
            <div className="flex items-center gap-12 py-8 px-4 bg-slate-950/50 rounded-xl">
              <EIDSSeal size="lg" />
              <EIDSSeal size="md" />
              <EIDSSeal size="sm" />
            </div>
          </motion.div>

          {/* Version 5: Modern Geometric */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-slate-900/50 rounded-2xl p-8 border border-slate-800"
          >
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-white mb-1">Version 5: Modern Geometric</h2>
              <p className="text-slate-500 text-sm">Contemporary • Bold shapes • Abstract expression</p>
            </div>
            <div className="flex items-center gap-12 py-8 px-4 bg-slate-950/50 rounded-xl">
              <EIDSGeometric size="lg" />
              <EIDSGeometric size="md" />
              <EIDSGeometric size="sm" />
            </div>
          </motion.div>

          {/* Version 6: Neural/AI */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-slate-900/50 rounded-2xl p-8 border border-slate-800"
          >
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-white mb-1">Version 6: Neural Network</h2>
              <p className="text-slate-500 text-sm">AI-forward • Data intelligence • Connected insights</p>
            </div>
            <div className="flex items-center gap-12 py-8 px-4 bg-slate-950/50 rounded-xl">
              <EIDSNeural size="lg" />
              <EIDSNeural size="md" />
              <EIDSNeural size="sm" />
            </div>
          </motion.div>
        </div>

        {/* Usage note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center text-slate-500 text-sm"
        >
          <p>Each variation shown in Large, Medium, and Small sizes for responsive use.</p>
          <p className="mt-2">Select a direction to implement across the application.</p>
        </motion.div>
      </div>
    </div>
  );
}
