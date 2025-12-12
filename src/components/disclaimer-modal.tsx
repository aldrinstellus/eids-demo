"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, Shield, Eye, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Term definitions for tooltips
const termDefinitions = {
  CUI: {
    term: "Controlled Unclassified Information",
    description: "Government information requiring safeguarding but not classified. Includes military health research, operational data, and sensitive federal records.",
  },
  PHI: {
    term: "Protected Health Information",
    description: "Health data protected under HIPAA including diagnoses, treatments, medical records, and any individually identifiable health information.",
  },
  PII: {
    term: "Personally Identifiable Information",
    description: "Data that can identify an individual such as SSN, name, address, date of birth, biometric data, or any unique identifier.",
  },
};

function TermWithTooltip({ term, children }: { term: keyof typeof termDefinitions; children: React.ReactNode }) {
  const definition = termDefinitions[term];
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="inline-flex items-center gap-0.5 cursor-help border-b border-dotted border-amber-400/50 hover:border-amber-400">
            {children}
            <Info className="h-3 w-3 text-amber-400/70" />
          </span>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-[280px] bg-slate-800 border-slate-600 p-3">
          <div className="space-y-1">
            <p className="font-semibold text-amber-300 text-sm">{term}: {definition.term}</p>
            <p className="text-slate-300 text-xs leading-relaxed">{definition.description}</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

const DISCLAIMER_STORAGE_KEY = "eids-disclaimer-accepted";
const DEMO_STORAGE_KEY = "eids-demo-persona";

interface DisclaimerModalProps {
  onAccept?: () => void;
}

export function DisclaimerModal({ onAccept }: DisclaimerModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if disclaimer has been accepted this session
    const accepted = sessionStorage.getItem(DISCLAIMER_STORAGE_KEY);
    if (!accepted) {
      setIsOpen(true);
    }
    setIsLoading(false);
  }, []);

  const handleAccept = () => {
    sessionStorage.setItem(DISCLAIMER_STORAGE_KEY, "true");
    setIsOpen(false);
    onAccept?.();
  };

  const handleDecline = () => {
    // Clear demo persona from localStorage
    localStorage.removeItem(DEMO_STORAGE_KEY);
    // Clear demo persona cookie for server-side middleware
    document.cookie = "eids-demo-persona=; path=/; max-age=0; SameSite=Lax";
    // Navigate back to login
    window.location.href = '/login';
  };

  // Don't render anything during loading to prevent flash
  if (isLoading) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) handleDecline(); }}>
      <DialogContent
        className="sm:max-w-[500px] bg-slate-900 border-amber-500/30"
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-amber-500/20 border border-amber-500/30">
              <AlertTriangle className="h-6 w-6 text-amber-400" />
            </div>
            <DialogTitle className="text-xl font-bold text-white">
              DHA System Access Notice
            </DialogTitle>
          </div>
          <DialogDescription className="text-slate-300 text-base">
            You are entering a Defense Health Agency (DHA) system.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Warning Box */}
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-amber-200 font-semibold text-sm">
                  Sensitive Information Notice
                </p>
                <p className="text-slate-300 text-sm mt-1">
                  Access to <TermWithTooltip term="CUI">CUI</TermWithTooltip>,{" "}
                  <TermWithTooltip term="PHI">PHI</TermWithTooltip>, and{" "}
                  <TermWithTooltip term="PII">PII</TermWithTooltip> is restricted to authorized users only.
                  All activity is monitored.
                </p>
              </div>
            </div>
          </div>

          {/* Monitoring Notice */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Eye className="h-5 w-5 text-cyan-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-cyan-200 font-semibold text-sm">
                  System Monitoring
                </p>
                <p className="text-slate-400 text-sm mt-1">
                  By accessing this system, you consent to monitoring and recording
                  of all activities. Unauthorized use may result in disciplinary action
                  and/or civil and criminal penalties.
                </p>
              </div>
            </div>
          </div>

          {/* Compliance Tags */}
          <div className="flex flex-wrap gap-2 pt-2">
            <span className="px-2 py-1 bg-cyan-500/20 text-cyan-300 text-xs font-medium rounded border border-cyan-500/30">
              HIPAA Compliant
            </span>
            <span className="px-2 py-1 bg-emerald-500/20 text-emerald-300 text-xs font-medium rounded border border-emerald-500/30">
              FedRAMP High
            </span>
            <span className="px-2 py-1 bg-violet-500/20 text-violet-300 text-xs font-medium rounded border border-violet-500/30">
              NIST 800-53
            </span>
            <span className="px-2 py-1 bg-amber-500/20 text-amber-300 text-xs font-medium rounded border border-amber-500/30">
              CUI Protected
            </span>
          </div>
        </div>

        <DialogFooter>
          <Button
            onClick={handleAccept}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3"
          >
            Accept & Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
