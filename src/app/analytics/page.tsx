"use client";

import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { TrendingUp, TrendingDown, Calendar } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AnimatedCounter } from "@/components/animations/animated-counter";
import { cn } from "@/lib/utils";

import analyticsData from "@/data/analytics.json";

export default function AnalyticsPage() {
  const { byStatus, byDepartment, kpis } = analyticsData;

  const kpiCards = [
    {
      title: "Avg Processing Time",
      value: kpis.avgProcessingDays.value,
      suffix: " days",
      trend: kpis.avgProcessingDays.trend,
      isPositive: kpis.avgProcessingDays.isPositive,
      direction: kpis.avgProcessingDays.trendDirection,
    },
    {
      title: "User Satisfaction",
      value: kpis.userSatisfaction.value,
      suffix: "/5",
      trend: kpis.userSatisfaction.trend,
      isPositive: kpis.userSatisfaction.isPositive,
      direction: kpis.userSatisfaction.trendDirection,
    },
    {
      title: "Compliance Score",
      value: kpis.complianceScore.value,
      suffix: "%",
      trend: kpis.complianceScore.trend,
      isPositive: kpis.complianceScore.isPositive,
      direction: kpis.complianceScore.trendDirection,
    },
    {
      title: "AI Usage Rate",
      value: kpis.aiUsageRate.value,
      suffix: "%",
      trend: kpis.aiUsageRate.trend,
      isPositive: kpis.aiUsageRate.isPositive,
      direction: kpis.aiUsageRate.trendDirection,
    },
  ];

  return (
    <div className="container mx-auto py-8 px-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
      >
        <div>
          <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Track performance metrics and trends
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-md border bg-card">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">Last 30 days</span>
        </div>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {kpiCards.map((kpi, index) => (
          <motion.div
            key={kpi.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6">
              <p className="text-sm text-muted-foreground">{kpi.title}</p>
              <div className="flex items-end justify-between mt-2">
                <p className="text-3xl font-bold">
                  <AnimatedCounter
                    end={kpi.value}
                    suffix={kpi.suffix}
                    decimals={kpi.suffix === " days" || kpi.suffix === "/5" ? 1 : 1}
                    duration={2}
                  />
                </p>
                <div
                  className={cn(
                    "flex items-center gap-1 text-sm",
                    kpi.isPositive ? "text-success" : "text-destructive"
                  )}
                  aria-label={`${kpi.isPositive ? "Positive" : "Negative"} trend: ${kpi.direction} ${Math.abs(kpi.trend)}%`}
                >
                  <span className="sr-only">{kpi.isPositive ? "Positive trend:" : "Negative trend:"}</span>
                  {kpi.direction === "up" ? (
                    <TrendingUp className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <TrendingDown className="h-4 w-4" aria-hidden="true" />
                  )}
                  <span>{Math.abs(kpi.trend)}%</span>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status Distribution - Pie Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Applications by Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]" role="img" aria-label="Pie chart showing application status distribution. Active: 112 (45%), In Review: 62 (25%), Draft: 45 (18%), Completed: 28 (12%). Use the View data button below for detailed numbers.">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={byStatus}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="count"
                      animationDuration={1000}
                    >
                      {byStatus.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(222 47% 9%)",
                        border: "1px solid hsl(217 33% 17%)",
                        borderRadius: "8px",
                        color: "hsl(210 40% 98%)",
                      }}
                      formatter={(value, name) => [`${value} (${byStatus.find(s => s.count === value)?.percentage}%)`, name]}
                    />
                    <Legend
                      formatter={(value) => (
                        <span style={{ color: "hsl(215 20% 65%)" }}>{value}</span>
                      )}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              {/* Accessible data */}
              <details className="mt-4">
                <summary className="text-sm text-primary cursor-pointer">View data</summary>
                <ul className="mt-2 space-y-1 text-sm">
                  {byStatus.map((item) => (
                    <li key={item.status} className="flex justify-between">
                      <span>{item.status}</span>
                      <span className="font-mono">{item.count} ({item.percentage}%)</span>
                    </li>
                  ))}
                </ul>
              </details>
            </CardContent>
          </Card>
        </motion.div>

        {/* Department Distribution - Bar Chart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Applications by Department</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]" role="img" aria-label="Horizontal bar chart showing applications by department. Medical: 111 (45%), Research: 69 (28%), Training: 37 (15%), Admin: 30 (12%). Use the View data button below for detailed numbers.">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={byDepartment} layout="vertical" margin={{ left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(217 33% 17%)" />
                    <XAxis type="number" stroke="hsl(215 20% 65%)" fontSize={12} />
                    <YAxis
                      type="category"
                      dataKey="department"
                      stroke="hsl(215 20% 65%)"
                      fontSize={12}
                      width={80}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(222 47% 9%)",
                        border: "1px solid hsl(217 33% 17%)",
                        borderRadius: "8px",
                        color: "hsl(210 40% 98%)",
                      }}
                      formatter={(value) => [`${value} applications`, "Count"]}
                    />
                    <Bar dataKey="count" animationDuration={1000}>
                      {byDepartment.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              {/* Accessible data */}
              <details className="mt-4">
                <summary className="text-sm text-primary cursor-pointer">View data</summary>
                <ul className="mt-2 space-y-1 text-sm">
                  {byDepartment.map((item) => (
                    <li key={item.department} className="flex justify-between">
                      <span>{item.department}</span>
                      <span className="font-mono">{item.count} ({item.percentage}%)</span>
                    </li>
                  ))}
                </ul>
              </details>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Additional metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-6"
      >
        <Card>
          <CardHeader>
            <CardTitle>Performance Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="text-center p-4 rounded-lg bg-muted/50">
                <p className="text-2xl font-bold text-primary">
                  <AnimatedCounter end={82} suffix="%" duration={2} />
                </p>
                <p className="text-xs text-muted-foreground mt-1">First-time Approval</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted/50">
                <p className="text-2xl font-bold text-success">
                  <AnimatedCounter end={91} suffix="%" duration={2} />
                </p>
                <p className="text-xs text-muted-foreground mt-1">Doc Completeness</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted/50">
                <p className="text-2xl font-bold text-accent">
                  <AnimatedCounter end={247} duration={2} />
                </p>
                <p className="text-xs text-muted-foreground mt-1">Total Active</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted/50">
                <p className="text-2xl font-bold text-warning">
                  <AnimatedCounter end={89} duration={2} />
                </p>
                <p className="text-xs text-muted-foreground mt-1">This Week</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted/50">
                <p className="text-2xl font-bold">
                  <AnimatedCounter end={156} duration={2} />
                </p>
                <p className="text-xs text-muted-foreground mt-1">AI Insights</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted/50">
                <p className="text-2xl font-bold text-primary">
                  <AnimatedCounter end={94} suffix="%" decimals={1} duration={2} />
                </p>
                <p className="text-xs text-muted-foreground mt-1">AI Accuracy</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
