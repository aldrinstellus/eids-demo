"use client";

import { motion } from "framer-motion";
import {
  FileText,
  CheckCircle,
  Clock,
  Brain,
} from "lucide-react";
import { StatsCard } from "@/components/dashboard/stats-card";
import { AIInsightsPanel } from "@/components/dashboard/ai-insights-panel";
import { TrendChart } from "@/components/dashboard/trend-chart";
import { RecentActivity, type Activity } from "@/components/dashboard/recent-activity";
import { type AIInsight } from "@/components/dashboard/ai-insights-panel";

import analyticsData from "@/data/analytics.json";
import aiData from "@/data/ai-responses.json";

export default function DashboardPage() {
  const { summary, monthlyVolume, recentActivity } = analyticsData as {
    summary: typeof analyticsData.summary;
    monthlyVolume: typeof analyticsData.monthlyVolume;
    recentActivity: Activity[];
  };
  const { aiSummary } = aiData as {
    aiSummary: {
      highlights: AIInsight[];
      totalAnalyzed: number;
      insightsGenerated: number;
      predictionsAccuracy: number;
    };
  };

  const stats = [
    {
      title: "Active Applications",
      value: summary.totalApplications,
      icon: FileText,
      trend: { value: 8, direction: "up" as const, isPositive: true },
    },
    {
      title: "Completed This Week",
      value: summary.completedThisWeek,
      icon: CheckCircle,
      trend: { value: 12, direction: "up" as const, isPositive: true },
    },
    {
      title: "Pending Review",
      value: summary.pendingReview,
      icon: Clock,
      trend: { value: 5, direction: "down" as const, isPositive: true },
    },
    {
      title: "AI Tasks Running",
      value: summary.aiTasksRunning,
      icon: Brain,
    },
  ];

  return (
    <div className="container mx-auto py-8 px-6">
      {/* Welcome header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h1 className="text-2xl font-bold">Welcome back, Dr. Sarah Chen</h1>
            <p className="text-muted-foreground">
              Here&apos;s what&apos;s happening with your applications today.
            </p>
          </div>
          <p className="text-sm text-muted-foreground">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </motion.div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <StatsCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            trend={stat.trend}
            index={index}
          />
        ))}
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Recent Activity */}
        <div className="lg:col-span-1">
          <RecentActivity activities={recentActivity} />
        </div>

        {/* Middle column - AI Insights */}
        <div className="lg:col-span-1">
          <AIInsightsPanel insights={aiSummary.highlights} />
        </div>

        {/* Right column - Chart spans remaining space on large screens */}
        <div className="lg:col-span-1 lg:row-span-1">
          <div className="h-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="h-full"
            >
              <div className="grid grid-cols-2 gap-4 h-full">
                {/* Quick stats */}
                <div className="bg-card rounded-xl border p-4 flex flex-col justify-center items-center text-center">
                  <p className="text-3xl font-bold text-primary">
                    {aiSummary.predictionsAccuracy}%
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">AI Accuracy</p>
                </div>
                <div className="bg-card rounded-xl border p-4 flex flex-col justify-center items-center text-center">
                  <p className="text-3xl font-bold text-success">98.5%</p>
                  <p className="text-sm text-muted-foreground mt-1">Compliance</p>
                </div>
                <div className="bg-card rounded-xl border p-4 flex flex-col justify-center items-center text-center">
                  <p className="text-3xl font-bold text-accent">3.2</p>
                  <p className="text-sm text-muted-foreground mt-1">Avg Days</p>
                </div>
                <div className="bg-card rounded-xl border p-4 flex flex-col justify-center items-center text-center">
                  <p className="text-3xl font-bold text-warning">67%</p>
                  <p className="text-sm text-muted-foreground mt-1">AI Usage</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Trend chart - full width */}
      <div className="mt-6">
        <TrendChart data={monthlyVolume} />
      </div>
    </div>
  );
}
