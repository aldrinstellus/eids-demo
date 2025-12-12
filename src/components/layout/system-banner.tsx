"use client";

import { Shield } from "lucide-react";

export function SystemBanner() {
  return (
    <div className="w-full bg-gradient-to-r from-emerald-900/90 via-emerald-800/80 to-cyan-900/90 border-b border-emerald-500/30 text-center py-2 text-sm font-medium flex items-center justify-center gap-3 z-50 backdrop-blur-sm">
      <Shield className="h-4 w-4 text-emerald-400" />
      <span className="text-emerald-100 tracking-wide">
        <span className="text-emerald-400 font-semibold">SECURE SYSTEM</span>
        <span className="mx-2 text-emerald-500/50">|</span>
        Approved for CUI/PHI/PII
      </span>
      <div className="flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-emerald-400/80 text-xs uppercase tracking-wider">Active</span>
      </div>
    </div>
  );
}
