"use client";

import { useState, useEffect } from "react";
import { AlertTriangle, Shield, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const DISCLAIMER_STORAGE_KEY = "eids-disclaimer-accepted";

interface DisclaimerModalProps {
  onAccept?: () => void;
}

export function DisclaimerModal({ onAccept }: DisclaimerModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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

  // Don't render anything during loading to prevent flash
  if (isLoading) return null;

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
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
                  Access to CUI, PHI, and PII is restricted to authorized users only.
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
