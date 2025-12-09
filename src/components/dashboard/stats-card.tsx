"use client";

import { motion } from "framer-motion";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
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
      className="h-full"
    >
      {/* Glass Card with Holographic Effect */}
      <div className="stat-card h-full group">
        {/* Top glow line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

        {/* Scanner line on hover */}
        <div className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="scanner-line" />
        </div>

        <div className="flex items-start justify-between relative z-10 h-full">
          <div className="space-y-2 flex flex-col">
            {/* Title with subtle glow */}
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider min-h-[2.5rem] flex items-start font-display">
              {title}
            </p>

            {/* Value with neon effect */}
            <p className="text-3xl font-bold font-mono tabular-nums tracking-tight neon-text">
              <AnimatedCounter
                end={value}
                prefix={prefix}
                suffix={suffix}
                duration={2}
              />
            </p>

            {/* Trend indicator */}
            {trend && (
              <div
                className={cn(
                  "flex items-center gap-1 text-sm font-mono",
                  trend.isPositive ? "text-success" : "text-destructive"
                )}
                aria-label={`${trend.isPositive ? "Positive" : "Negative"} trend: ${trend.direction === "up" ? "up" : "down"} ${Math.abs(trend.value)}% vs last period`}
              >
                <span className="sr-only">{trend.isPositive ? "Positive trend:" : "Negative trend:"}</span>
                {trend.direction === "up" ? (
                  <TrendingUp
                    className={cn(
                      "h-4 w-4",
                      trend.isPositive && "drop-shadow-[0_0_6px_hsl(var(--success-glow))]"
                    )}
                    aria-hidden="true"
                  />
                ) : (
                  <TrendingDown
                    className={cn(
                      "h-4 w-4",
                      !trend.isPositive && "drop-shadow-[0_0_6px_hsl(var(--destructive))]"
                    )}
                    aria-hidden="true"
                  />
                )}
                <span>{Math.abs(trend.value)}% vs last period</span>
              </div>
            )}
          </div>

          {/* Icon with cyber border and glow */}
          <div className="p-3 rounded-lg cyber-border text-primary group-hover:glow-primary transition-all duration-300">
            <Icon
              className="h-6 w-6 drop-shadow-[0_0_8px_hsl(var(--primary-glow)/0.5)]"
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </motion.div>
  );
}
