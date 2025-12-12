"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  CheckCircle,
  Clock,
  Brain,
  Target,
  Shield,
  Gauge,
  Zap,
  TrendingUp,
  TrendingDown,
  Activity,
  ChevronRight,
} from "lucide-react";
import { StatsCard } from "@/components/dashboard/stats-card";
import { AIInsightsPanel } from "@/components/dashboard/ai-insights-panel";
import { TrendChart } from "@/components/dashboard/trend-chart";
import { type Activity as ActivityType } from "@/components/dashboard/recent-activity";
import { type AIInsight } from "@/components/dashboard/ai-insights-panel";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

import analyticsData from "@/data/analytics.json";
import aiData from "@/data/ai-responses.json";

// Default demo user for when not authenticated
const demoUser = {
  name: "Dr. Sarah Chen",
  firstName: "Dr. Chen",
};

// Activity icon mapping
const activityIcons = {
  update: FileText,
  submit: TrendingUp,
  complete: CheckCircle,
  document: FileText,
  ai: Brain,
};

const activityStyles = {
  update: "bg-primary/20 text-primary",
  submit: "bg-accent/20 text-accent",
  complete: "bg-success/20 text-success",
  document: "bg-warning/20 text-warning",
  ai: "bg-primary/20 text-primary",
};

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  // Get display name from authenticated user or demo user
  const displayName = user
    ? user.user_metadata?.full_name || user.email?.split('@')[0] || 'User'
    : demoUser.name;

  const { summary, monthlyVolume, recentActivity } = analyticsData as {
    summary: typeof analyticsData.summary;
    monthlyVolume: typeof analyticsData.monthlyVolume;
    recentActivity: ActivityType[];
  };
  const { aiSummary } = aiData as {
    aiSummary: {
      highlights: AIInsight[];
      totalAnalyzed: number;
      insightsGenerated: number;
      predictionsAccuracy: number;
    };
  };

  // Primary stats - operational metrics
  const primaryStats = [
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

  // Secondary stats - performance metrics
  const performanceStats = [
    {
      title: "AI Accuracy",
      value: aiSummary.predictionsAccuracy,
      suffix: "%",
      icon: Target,
      color: "text-primary",
      bgColor: "bg-primary/10",
      borderColor: "border-primary/20",
    },
    {
      title: "Compliance Score",
      value: 98.5,
      suffix: "%",
      icon: Shield,
      color: "text-success",
      bgColor: "bg-success/10",
      borderColor: "border-success/20",
    },
    {
      title: "Avg Processing",
      value: 3.2,
      suffix: " days",
      icon: Gauge,
      color: "text-accent",
      bgColor: "bg-accent/10",
      borderColor: "border-accent/20",
    },
    {
      title: "AI Utilization",
      value: 67,
      suffix: "%",
      icon: Zap,
      color: "text-warning",
      bgColor: "bg-warning/10",
      borderColor: "border-warning/20",
    },
  ];

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Main Content Area */}
      <div className="flex-1 overflow-auto p-6">
        {/* Welcome header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h1 className="text-2xl font-bold">Welcome back, {displayName}</h1>
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

        {/* Primary Stats Row - Operational Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {primaryStats.map((stat, index) => (
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

        {/* Secondary Stats Row - Performance Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
        >
          {performanceStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.05 }}
              >
                <Card className={cn("border", stat.borderColor, stat.bgColor)}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                          {stat.title}
                        </p>
                        <p className={cn("text-2xl font-bold font-mono tabular-nums", stat.color)}>
                          {stat.value}
                          <span className="text-lg font-sans">{stat.suffix}</span>
                        </p>
                      </div>
                      <div className={cn("p-2 rounded-lg", stat.bgColor)}>
                        <Icon className={cn("h-5 w-5", stat.color)} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* AI Insights - Takes 2 columns */}
          <div className="lg:col-span-2">
            <AIInsightsPanel insights={aiSummary.highlights} />
          </div>

          {/* Trend Chart Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="h-full">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Activity className="h-4 w-4 text-primary" />
                  Quick Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-3 rounded-lg bg-muted/50">
                    <p className="text-2xl font-bold font-mono tabular-nums text-primary">82%</p>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">First-time Approval</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-muted/50">
                    <p className="text-2xl font-bold font-mono tabular-nums text-success">91%</p>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Doc Completeness</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-muted/50">
                    <p className="text-2xl font-bold font-mono tabular-nums text-accent">156</p>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">AI Insights</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-muted/50">
                    <p className="text-2xl font-bold font-mono tabular-nums text-warning">89</p>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">This Week</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/analytics">
                    View Full Analytics
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Trend Chart - Full Width */}
        <div className="mt-6">
          <TrendChart data={monthlyVolume} />
        </div>
      </div>

      {/* Right Sidebar - Recent Activity Feed */}
      <motion.aside
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="hidden xl:flex flex-col w-80 border-l bg-card/50"
        role="complementary"
        aria-label="Recent activity feed"
      >
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold flex items-center gap-2">
              <Activity className="h-4 w-4 text-primary" />
              Recent Activity
            </h2>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/applications">
                View All
                <ChevronRight className="h-3 w-3 ml-1" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Scrollable Activity Feed */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {recentActivity.map((activity, index) => {
            const Icon = activityIcons[activity.type as keyof typeof activityIcons] || FileText;
            const style = activityStyles[activity.type as keyof typeof activityStyles] || activityStyles.update;

            return (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.08 }}
              >
                <Link
                  href={`/applications/${activity.application}`}
                  className="block p-3 rounded-lg bg-background/50 hover:bg-background border border-transparent hover:border-border transition-all group"
                >
                  <div className="flex gap-3">
                    <div className={cn("p-2 rounded-lg shrink-0 h-fit", style)}>
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">
                        {activity.applicationName}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                        {activity.action}
                      </p>
                      <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                        <span>{activity.user}</span>
                        <span>·</span>
                        <span>{activity.timeAgo}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}

          {/* Load more indicator */}
          <div className="pt-4 pb-2">
            <Button variant="ghost" size="sm" className="w-full text-muted-foreground">
              Load more activity
            </Button>
          </div>
        </div>

        {/* Activity Summary Footer */}
        <div className="p-4 border-t bg-muted/30">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-lg font-bold font-mono tabular-nums text-primary">{recentActivity.length}</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Today</p>
            </div>
            <div>
              <p className="text-lg font-bold font-mono tabular-nums text-success">24</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">This Week</p>
            </div>
          </div>
        </div>
      </motion.aside>
    </div>
  );
}
