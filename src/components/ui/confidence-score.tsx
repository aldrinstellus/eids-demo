"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ShieldCheck, AlertTriangle, AlertCircle, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export interface ConfidenceScoreProps {
  score: number; // 0-100
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  showIcon?: boolean;
  animated?: boolean;
  className?: string;
  label?: string;
  tooltip?: string;
}

function getConfidenceLevel(score: number): {
  level: "high" | "medium" | "low" | "critical";
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
  icon: React.ElementType;
} {
  if (score >= 70) {
    return {
      level: "high",
      label: "High Confidence",
      color: "text-success",
      bgColor: "bg-success/20",
      borderColor: "border-success/30",
      icon: ShieldCheck,
    };
  } else if (score >= 40) {
    return {
      level: "medium",
      label: "Medium Confidence",
      color: "text-warning",
      bgColor: "bg-warning/20",
      borderColor: "border-warning/30",
      icon: AlertTriangle,
    };
  } else if (score >= 20) {
    return {
      level: "low",
      label: "Low Confidence",
      color: "text-orange-500",
      bgColor: "bg-orange-500/20",
      borderColor: "border-orange-500/30",
      icon: AlertCircle,
    };
  } else {
    return {
      level: "critical",
      label: "Requires Review",
      color: "text-destructive",
      bgColor: "bg-destructive/20",
      borderColor: "border-destructive/30",
      icon: AlertCircle,
    };
  }
}

const sizeClasses = {
  sm: {
    wrapper: "h-6",
    bar: "h-1.5",
    text: "text-xs",
    icon: "h-3.5 w-3.5",
    badge: "px-1.5 py-0.5",
  },
  md: {
    wrapper: "h-8",
    bar: "h-2",
    text: "text-sm",
    icon: "h-4 w-4",
    badge: "px-2 py-1",
  },
  lg: {
    wrapper: "h-10",
    bar: "h-2.5",
    text: "text-base",
    icon: "h-5 w-5",
    badge: "px-3 py-1.5",
  },
};

export function ConfidenceScore({
  score,
  size = "md",
  showLabel = true,
  showIcon = true,
  animated = true,
  className,
  label,
  tooltip,
}: ConfidenceScoreProps) {
  const clampedScore = Math.max(0, Math.min(100, score));
  const confidence = getConfidenceLevel(clampedScore);
  const Icon = confidence.icon;
  const sizeClass = sizeClasses[size];

  const content = (
    <div className={cn("flex items-center gap-2", className)}>
      {showIcon && (
        <div className={cn("p-1 rounded", confidence.bgColor)}>
          <Icon className={cn(sizeClass.icon, confidence.color)} />
        </div>
      )}

      <div className="flex-1 min-w-0">
        {showLabel && (
          <div className="flex items-center justify-between mb-1">
            <span className={cn("font-medium", sizeClass.text, confidence.color)}>
              {label || confidence.label}
            </span>
            <span className={cn("font-mono font-bold", sizeClass.text, confidence.color)}>
              {clampedScore}%
            </span>
          </div>
        )}

        <div className={cn("relative w-full rounded-full bg-secondary overflow-hidden", sizeClass.bar)}>
          {animated ? (
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${clampedScore}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={cn("h-full rounded-full", confidence.bgColor.replace("/20", ""))}
              style={{
                background: `linear-gradient(90deg, ${
                  confidence.level === "high" ? "rgb(34, 197, 94)" :
                  confidence.level === "medium" ? "rgb(234, 179, 8)" :
                  confidence.level === "low" ? "rgb(249, 115, 22)" :
                  "rgb(239, 68, 68)"
                } 0%, ${
                  confidence.level === "high" ? "rgb(21, 128, 61)" :
                  confidence.level === "medium" ? "rgb(161, 98, 7)" :
                  confidence.level === "low" ? "rgb(194, 65, 12)" :
                  "rgb(185, 28, 28)"
                } 100%)`,
              }}
            />
          ) : (
            <div
              className={cn("h-full rounded-full")}
              style={{
                width: `${clampedScore}%`,
                background: `linear-gradient(90deg, ${
                  confidence.level === "high" ? "rgb(34, 197, 94)" :
                  confidence.level === "medium" ? "rgb(234, 179, 8)" :
                  confidence.level === "low" ? "rgb(249, 115, 22)" :
                  "rgb(239, 68, 68)"
                } 0%, ${
                  confidence.level === "high" ? "rgb(21, 128, 61)" :
                  confidence.level === "medium" ? "rgb(161, 98, 7)" :
                  confidence.level === "low" ? "rgb(194, 65, 12)" :
                  "rgb(185, 28, 28)"
                } 100%)`,
              }}
            />
          )}
        </div>
      </div>
    </div>
  );

  if (tooltip) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {content}
          </TooltipTrigger>
          <TooltipContent>
            <p>{tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return content;
}

// Compact badge variant for inline use
export function ConfidenceBadge({
  score,
  size = "sm",
  className,
}: {
  score: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const clampedScore = Math.max(0, Math.min(100, score));
  const confidence = getConfidenceLevel(clampedScore);
  const Icon = confidence.icon;
  const sizeClass = sizeClasses[size];

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={cn(
              "inline-flex items-center gap-1 rounded-full border",
              confidence.bgColor,
              confidence.borderColor,
              sizeClass.badge,
              className
            )}
          >
            <Icon className={cn(sizeClass.icon, confidence.color)} />
            <span className={cn("font-mono font-bold", sizeClass.text, confidence.color)}>
              {clampedScore}%
            </span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{confidence.label}: AI confidence in this recommendation</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

// Circular variant for dashboard cards
export function ConfidenceRing({
  score,
  size = "md",
  showLabel = true,
  className,
}: {
  score: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}) {
  const clampedScore = Math.max(0, Math.min(100, score));
  const confidence = getConfidenceLevel(clampedScore);

  const ringSize = size === "sm" ? 48 : size === "md" ? 64 : 80;
  const strokeWidth = size === "sm" ? 4 : size === "md" ? 5 : 6;
  const radius = (ringSize - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (clampedScore / 100) * circumference;

  const colorMap = {
    high: "#22c55e",
    medium: "#eab308",
    low: "#f97316",
    critical: "#ef4444",
  };

  return (
    <div className={cn("flex flex-col items-center gap-1", className)}>
      <div className="relative" style={{ width: ringSize, height: ringSize }}>
        <svg
          width={ringSize}
          height={ringSize}
          className="transform -rotate-90"
        >
          {/* Background circle */}
          <circle
            cx={ringSize / 2}
            cy={ringSize / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-secondary"
          />
          {/* Progress circle */}
          <motion.circle
            cx={ringSize / 2}
            cy={ringSize / 2}
            r={radius}
            fill="none"
            stroke={colorMap[confidence.level]}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{
              strokeDasharray: circumference,
            }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={cn(
            "font-mono font-bold",
            size === "sm" ? "text-sm" : size === "md" ? "text-lg" : "text-xl",
            confidence.color
          )}>
            {clampedScore}%
          </span>
        </div>
      </div>
      {showLabel && (
        <span className={cn(
          "text-center",
          size === "sm" ? "text-xs" : "text-sm",
          "text-muted-foreground"
        )}>
          {confidence.label}
        </span>
      )}
    </div>
  );
}
