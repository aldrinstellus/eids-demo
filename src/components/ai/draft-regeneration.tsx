"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RefreshCw,
  Sparkles,
  MessageSquare,
  FileText,
  Briefcase,
  Heart,
  ChevronDown,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

// Tone options for AI regeneration
export type ToneOption = "professional" | "friendly" | "formal" | "empathetic" | "concise";

export interface ToneConfig {
  id: ToneOption;
  label: string;
  description: string;
  icon: React.ElementType;
}

export const TONE_OPTIONS: ToneConfig[] = [
  {
    id: "professional",
    label: "Professional",
    description: "Clear, business-appropriate language",
    icon: Briefcase,
  },
  {
    id: "friendly",
    label: "Friendly",
    description: "Warm and approachable tone",
    icon: MessageSquare,
  },
  {
    id: "formal",
    label: "Formal",
    description: "Official, regulatory-compliant language",
    icon: FileText,
  },
  {
    id: "empathetic",
    label: "Empathetic",
    description: "Compassionate, veteran-focused",
    icon: Heart,
  },
  {
    id: "concise",
    label: "Concise",
    description: "Brief and to-the-point",
    icon: Sparkles,
  },
];

// Detail level options
export type DetailLevel = "brief" | "standard" | "detailed" | "comprehensive";

export interface DetailConfig {
  id: DetailLevel;
  label: string;
  description: string;
  wordRange: string;
}

export const DETAIL_OPTIONS: DetailConfig[] = [
  {
    id: "brief",
    label: "Brief",
    description: "Quick summary",
    wordRange: "50-100 words",
  },
  {
    id: "standard",
    label: "Standard",
    description: "Balanced detail",
    wordRange: "100-200 words",
  },
  {
    id: "detailed",
    label: "Detailed",
    description: "Thorough explanation",
    wordRange: "200-400 words",
  },
  {
    id: "comprehensive",
    label: "Comprehensive",
    description: "Full documentation",
    wordRange: "400+ words",
  },
];

interface DraftRegenerationProps {
  onRegenerate: (tone: ToneOption, detailLevel: DetailLevel) => void;
  isRegenerating?: boolean;
  currentTone?: ToneOption;
  currentDetailLevel?: DetailLevel;
  className?: string;
}

export function DraftRegeneration({
  onRegenerate,
  isRegenerating = false,
  currentTone = "professional",
  currentDetailLevel = "standard",
  className,
}: DraftRegenerationProps) {
  const [selectedTone, setSelectedTone] = React.useState<ToneOption>(currentTone);
  const [selectedDetail, setSelectedDetail] = React.useState<DetailLevel>(currentDetailLevel);

  const currentToneConfig = TONE_OPTIONS.find((t) => t.id === selectedTone);
  const currentDetailConfig = DETAIL_OPTIONS.find((d) => d.id === selectedDetail);

  const handleRegenerate = () => {
    onRegenerate(selectedTone, selectedDetail);
  };

  return (
    <Card className={cn("", className)}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">AI Draft Options</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {/* Tone Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8" disabled={isRegenerating}>
                {currentToneConfig && (
                  <currentToneConfig.icon className="h-3.5 w-3.5 mr-1.5" />
                )}
                {currentToneConfig?.label || "Tone"}
                <ChevronDown className="h-3 w-3 ml-1.5 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuLabel>Select Tone</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {TONE_OPTIONS.map((tone) => (
                <DropdownMenuItem
                  key={tone.id}
                  onClick={() => setSelectedTone(tone.id)}
                  className={cn(
                    "flex items-start gap-2 py-2",
                    selectedTone === tone.id && "bg-primary/10"
                  )}
                >
                  <tone.icon className="h-4 w-4 mt-0.5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{tone.label}</p>
                    <p className="text-xs text-muted-foreground">{tone.description}</p>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Detail Level Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8" disabled={isRegenerating}>
                <FileText className="h-3.5 w-3.5 mr-1.5" />
                {currentDetailConfig?.label || "Detail"}
                <ChevronDown className="h-3 w-3 ml-1.5 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuLabel>Detail Level</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {DETAIL_OPTIONS.map((detail) => (
                <DropdownMenuItem
                  key={detail.id}
                  onClick={() => setSelectedDetail(detail.id)}
                  className={cn(
                    "flex flex-col items-start py-2",
                    selectedDetail === detail.id && "bg-primary/10"
                  )}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="font-medium">{detail.label}</span>
                    <span className="text-xs text-muted-foreground">{detail.wordRange}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{detail.description}</p>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Regenerate Button */}
          <Button
            size="sm"
            className="h-8"
            onClick={handleRegenerate}
            disabled={isRegenerating}
          >
            <AnimatePresence mode="wait">
              {isRegenerating ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, rotate: 0 }}
                  animate={{ opacity: 1, rotate: 360 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, rotate: { duration: 1, repeat: Infinity, ease: "linear" } }}
                >
                  <Loader2 className="h-3.5 w-3.5 mr-1.5" />
                </motion.div>
              ) : (
                <motion.div
                  key="refresh"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
                </motion.div>
              )}
            </AnimatePresence>
            {isRegenerating ? "Regenerating..." : "Regenerate"}
          </Button>
        </div>

        {/* Current Selection Summary */}
        <div className="mt-3 pt-3 border-t">
          <p className="text-xs text-muted-foreground">
            Current: <span className="font-medium text-foreground">{currentToneConfig?.label}</span> tone,{" "}
            <span className="font-medium text-foreground">{currentDetailConfig?.label}</span> detail
            ({currentDetailConfig?.wordRange})
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

// Inline variant for embedding in AI panels
interface DraftRegenerationInlineProps {
  onRegenerate: (tone: ToneOption, detailLevel: DetailLevel) => void;
  isRegenerating?: boolean;
  className?: string;
}

export function DraftRegenerationInline({
  onRegenerate,
  isRegenerating = false,
  className,
}: DraftRegenerationInlineProps) {
  const [selectedTone, setSelectedTone] = React.useState<ToneOption>("professional");
  const [selectedDetail, setSelectedDetail] = React.useState<DetailLevel>("standard");

  return (
    <div className={cn("flex items-center gap-2 flex-wrap", className)}>
      <select
        value={selectedTone}
        onChange={(e) => setSelectedTone(e.target.value as ToneOption)}
        disabled={isRegenerating}
        className="h-7 text-xs border rounded px-2 bg-background focus:outline-none focus:ring-2 focus:ring-ring"
        aria-label="Select tone"
      >
        {TONE_OPTIONS.map((tone) => (
          <option key={tone.id} value={tone.id}>
            {tone.label}
          </option>
        ))}
      </select>

      <select
        value={selectedDetail}
        onChange={(e) => setSelectedDetail(e.target.value as DetailLevel)}
        disabled={isRegenerating}
        className="h-7 text-xs border rounded px-2 bg-background focus:outline-none focus:ring-2 focus:ring-ring"
        aria-label="Select detail level"
      >
        {DETAIL_OPTIONS.map((detail) => (
          <option key={detail.id} value={detail.id}>
            {detail.label}
          </option>
        ))}
      </select>

      <Button
        variant="ghost"
        size="sm"
        className="h-7 px-2"
        onClick={() => onRegenerate(selectedTone, selectedDetail)}
        disabled={isRegenerating}
      >
        {isRegenerating ? (
          <Loader2 className="h-3 w-3 animate-spin" />
        ) : (
          <RefreshCw className="h-3 w-3" />
        )}
      </Button>
    </div>
  );
}
