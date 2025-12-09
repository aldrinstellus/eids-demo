"use client";

import { motion } from "framer-motion";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { AnimatedCounter } from "@/components/animations/animated-counter";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: number;
  prefix?: string;
  suffix?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    direction: "up" | "down";
    isPositive: boolean;
  };
  index?: number;
}

export function StatsCard({
  title,
  value,
  prefix = "",
  suffix = "",
  icon: Icon,
  trend,
  index = 0,
}: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
    >
      <Card className="p-6 relative overflow-hidden group">
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        <div className="flex items-start justify-between relative z-10">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{title}</p>
            <p className="text-3xl font-bold font-mono tabular-nums tracking-tight">
              <AnimatedCounter
                end={value}
                prefix={prefix}
                suffix={suffix}
                duration={2}
              />
            </p>
            {trend && (
              <div
                className={cn(
                  "flex items-center gap-1 text-sm",
                  trend.isPositive ? "text-success" : "text-destructive"
                )}
              >
                {trend.direction === "up" ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingDown className="h-4 w-4" />
                )}
                <span>{Math.abs(trend.value)}% vs last period</span>
              </div>
            )}
          </div>
          <div className="p-3 rounded-lg bg-primary/10 text-primary">
            <Icon className="h-6 w-6" aria-hidden="true" />
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
