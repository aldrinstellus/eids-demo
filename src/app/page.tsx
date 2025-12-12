"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  FileText,
  CheckCircle,
  Clock,
  Brain,
  Activity,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
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
import { getPersonaById, type DemoPersona } from "@/data/demo-personas";
import { usePersonaConfig, useHomeRedirect, useHasPermission } from "@/hooks/usePersonaConfig";
import type { User } from "@supabase/supabase-js";

import analyticsData from "@/data/analytics.json";
import aiData from "@/data/ai-responses.json";

const DEMO_STORAGE_KEY = "eids-demo-persona";

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
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [demoPersona, setDemoPersona] = useState<DemoPersona | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

  // Get persona configuration
  const personaConfig = usePersonaConfig();
  const homeRedirect = useHomeRedirect();

  useEffect(() => {
    // Check for demo persona in localStorage
    const storedPersonaId = localStorage.getItem(DEMO_STORAGE_KEY);
    if (storedPersonaId) {
      const persona = getPersonaById(storedPersonaId);
      if (persona) {
        setDemoPersona(persona);
      }
    }

    // Check for Supabase auth
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setIsLoading(false);
    };

    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  // Handle persona redirect (e.g., David Kim -> /admin)
  useEffect(() => {
    if (!isLoading && homeRedirect) {
      router.replace(homeRedirect);
    }
  }, [isLoading, homeRedirect, router]);

  // Show loading state while checking for redirect
  if (isLoading || homeRedirect) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Get display name - prioritize demo persona, then auth user, then default
  const displayName = demoPersona
    ? demoPersona.name
    : user
      ? user.user_metadata?.full_name || user.email?.split('@')[0] || 'User'
      : "Guest";

  const { monthlyVolume, recentActivity } = analyticsData as {
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

  // Render persona-specific KPI cards
  const renderPrimaryKPIs = () => {
    return personaConfig.primaryKPIs.map((kpi, index) => {
      const Icon = kpi.icon;
      const value = kpi.getValue(personaConfig.personaId);
      const displayValue = typeof value === "string" ? value : value;

      return (
        <motion.div
          key={kpi.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 + index * 0.05 }}
          className="h-full"
        >
          <Card className={cn("border h-full flex flex-col", kpi.borderColor, kpi.bgColor)}>
            <CardContent className="p-4 flex flex-col h-full">
              <div className="flex items-start justify-between flex-1">
                <div className="flex flex-col">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                    {kpi.label}
                  </p>
                  <p className={cn("text-2xl font-bold font-mono tabular-nums", kpi.color)}>
                    {displayValue}
                    {kpi.suffix && <span className="text-lg font-sans">{kpi.suffix}</span>}
                  </p>
                </div>
                <div className={cn("p-2 rounded-lg shrink-0", kpi.bgColor)}>
                  <Icon className={cn("h-5 w-5", kpi.color)} />
                </div>
              </div>
              {/* Always reserve space for trend - show content or empty placeholder */}
              <div className="mt-auto pt-2 h-5 flex items-center">
                {kpi.trend ? (
                  <div className="flex items-center gap-1">
                    {kpi.trend.direction === "up" ? (
                      <TrendingUp className={cn("h-3 w-3", kpi.trend.isPositive ? "text-success" : "text-destructive")} />
                    ) : (
                      <TrendingDown className={cn("h-3 w-3", kpi.trend.isPositive ? "text-success" : "text-destructive")} />
                    )}
                    <span className={cn("text-xs", kpi.trend.isPositive ? "text-success" : "text-destructive")}>
                      {kpi.trend.value}%
                    </span>
                    <span className="text-xs text-muted-foreground">vs last week</span>
                  </div>
                ) : (
                  <span className="text-xs text-muted-foreground/50">—</span>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      );
    });
  };

  // Render secondary KPIs
  const renderSecondaryKPIs = () => {
    return personaConfig.secondaryKPIs.map((kpi) => {
      const Icon = kpi.icon;
      const value = kpi.getValue(personaConfig.personaId);

      return (
        <div key={kpi.id} className="text-center p-3 rounded-lg bg-muted/50">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Icon className="h-3.5 w-3.5 text-muted-foreground" />
          </div>
          <p className="text-2xl font-bold font-mono tabular-nums text-primary">
            {value}
            {kpi.suffix && <span className="text-sm font-sans">{kpi.suffix}</span>}
          </p>
          <p className="text-xs text-muted-foreground uppercase tracking-wider">{kpi.label}</p>
        </div>
      );
    });
  };

  // Render quick actions
  const renderQuickActions = () => {
    return personaConfig.quickActions.map((action) => {
      const Icon = action.icon;
      return (
        <Button
          key={action.label}
          variant={action.variant || "default"}
          className="justify-start"
          asChild
        >
          <Link href={action.href}>
            <Icon className="h-4 w-4 mr-2" />
            {action.label}
          </Link>
        </Button>
      );
    });
  };

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
                {personaConfig.welcomeSubtitle}
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

        {/* Primary KPIs Row - Persona-Specific */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {renderPrimaryKPIs()}
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* AI Insights - Takes 2 columns */}
          <div className="lg:col-span-2">
            <AIInsightsPanel insights={aiSummary.highlights} />
          </div>

          {/* Quick Actions & Secondary Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="h-full">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Activity className="h-4 w-4 text-primary" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Quick Actions */}
                <div className="flex flex-col gap-2">
                  {renderQuickActions()}
                </div>

                <div className="border-t pt-4">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">
                    Quick Stats
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {renderSecondaryKPIs()}
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
