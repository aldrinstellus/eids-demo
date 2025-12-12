"use client";

import { motion } from "framer-motion";
import {
  Bot,
  Lightbulb,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  ShieldAlert,
  Zap,
  ChevronRight,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ConfidenceBadge, ConfidenceRing } from "@/components/ui/confidence-score";
import { cn } from "@/lib/utils";

export interface AIInsight {
  id: string;
  type: "prediction" | "compliance" | "forecast" | "optimization";
  icon: string;
  title: string;
  description: string;
  severity: "success" | "warning" | "error" | "info";
  actionable: boolean;
  action: string | null;
  confidence?: number; // 0-100 confidence score
}

interface AIInsightsPanelProps {
  insights: AIInsight[];
  overallAccuracy?: number; // 0-100 overall model accuracy
}

const iconMap: Record<string, React.ElementType> = {
  "trending-up": TrendingUp,
  "shield-alert": ShieldAlert,
  "check-circle": CheckCircle,
  "zap": Zap,
  "lightbulb": Lightbulb,
  "alert-triangle": AlertTriangle,
};

const severityStyles: Record<string, string> = {
  success: "text-success",
  warning: "text-warning",
  error: "text-destructive",
  info: "text-primary",
};

export function AIInsightsPanel({ insights, overallAccuracy = 94 }: AIInsightsPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
      <Card className="border-primary/20 relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />

        <CardHeader className="relative z-10">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 10px rgba(14, 165, 233, 0.4)",
                    "0 0 20px rgba(14, 165, 233, 0.6)",
                    "0 0 10px rgba(14, 165, 233, 0.4)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="p-2 rounded-lg bg-primary/20"
              >
                <Bot className="h-5 w-5 text-primary" />
              </motion.div>
              <span>AI Assistant</span>
            </CardTitle>
            <ConfidenceRing score={overallAccuracy} size="sm" showLabel={false} />
          </div>
        </CardHeader>

        <CardContent className="relative z-10 space-y-4">
          {insights.map((insight, index) => {
            const Icon = iconMap[insight.icon] || Lightbulb;

            return (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="flex gap-3 p-3 rounded-lg bg-background/50 hover:bg-background/80 transition-colors"
              >
                <div className={cn("mt-0.5", severityStyles[insight.severity])}>
                  <span className="sr-only">
                    {insight.severity === "success" ? "Success:" :
                     insight.severity === "warning" ? "Warning:" :
                     insight.severity === "error" ? "Error:" : "Info:"}
                  </span>
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-medium">{insight.title}</p>
                    {insight.confidence && (
                      <ConfidenceBadge score={insight.confidence} size="sm" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                    {insight.description}
                  </p>
                  {insight.actionable && insight.action && (
                    <Button
                      variant="link"
                      size="sm"
                      className="h-auto p-0 mt-1 text-primary"
                    >
                      {insight.action}
                      <ChevronRight className="h-3 w-3 ml-1" />
                    </Button>
                  )}
                </div>
              </motion.div>
            );
          })}

          <div className="pt-2 border-t">
            <Button variant="ghost" size="sm" className="w-full text-muted-foreground">
              Why am I seeing this?
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
