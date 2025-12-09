"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Settings,
  Shield,
  Activity,
  Search,
  Plus,
  Edit,
  Trash2,
  RefreshCw,
  Download,
  AlertTriangle,
  CheckCircle,
  Info,
  Clock,
  Server,
  Database,
  Cpu,
  Zap,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Mock data
const users = [
  { id: 1, name: "Dr. Sarah Chen", email: "sarah.chen@va.gov", role: "Admin", status: "active", lastLogin: "2024-01-15 09:23" },
  { id: 2, name: "James Wilson", email: "james.wilson@va.gov", role: "Analyst", status: "active", lastLogin: "2024-01-15 08:45" },
  { id: 3, name: "Maria Garcia", email: "maria.garcia@va.gov", role: "Reviewer", status: "active", lastLogin: "2024-01-14 16:30" },
  { id: 4, name: "Robert Johnson", email: "robert.johnson@va.gov", role: "Viewer", status: "inactive", lastLogin: "2024-01-10 11:20" },
  { id: 5, name: "Emily Davis", email: "emily.davis@va.gov", role: "Analyst", status: "active", lastLogin: "2024-01-15 07:15" },
];

const auditLogs = [
  { id: 1, action: "User Login", user: "Dr. Sarah Chen", timestamp: "2024-01-15 09:23:45", severity: "info", details: "Successful login from 10.0.0.1" },
  { id: 2, action: "Application Approved", user: "James Wilson", timestamp: "2024-01-15 09:15:30", severity: "success", details: "APP-2024-001 approved for processing" },
  { id: 3, action: "Permission Changed", user: "System", timestamp: "2024-01-15 08:45:12", severity: "warning", details: "Role upgraded for user maria.garcia@va.gov" },
  { id: 4, action: "Failed Login Attempt", user: "Unknown", timestamp: "2024-01-15 08:30:00", severity: "error", details: "3 failed attempts from 192.168.1.100" },
  { id: 5, action: "Data Export", user: "Emily Davis", timestamp: "2024-01-15 08:00:00", severity: "info", details: "Exported Q4 analytics report" },
];

const systemMetrics = {
  uptime: "99.97%",
  responseTime: "145ms",
  activeUsers: 847,
  apiCalls: "1.2M",
  cpuUsage: 34,
  memoryUsage: 62,
  diskUsage: 45,
  networkIO: "2.4 GB/s",
};

const apiEndpoints = [
  { endpoint: "/api/applications", calls: 45230, avgTime: "89ms", status: "healthy" },
  { endpoint: "/api/ai/analyze", calls: 12450, avgTime: "1.2s", status: "healthy" },
  { endpoint: "/api/documents", calls: 8920, avgTime: "156ms", status: "healthy" },
  { endpoint: "/api/users", calls: 3240, avgTime: "45ms", status: "healthy" },
  { endpoint: "/api/analytics", calls: 2180, avgTime: "320ms", status: "degraded" },
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"users" | "audit" | "system" | "api">("users");
  const [searchQuery, setSearchQuery] = useState("");

  const tabs = [
    { id: "users", label: "User Management", icon: Users },
    { id: "audit", label: "Audit Log", icon: Shield },
    { id: "system", label: "System Health", icon: Activity },
    { id: "api", label: "API Metrics", icon: Zap },
  ];

  const severityStyles = {
    info: "bg-primary/20 text-primary border-primary/30",
    success: "bg-success/20 text-success border-success/30",
    warning: "bg-warning/20 text-warning border-warning/30",
    error: "bg-destructive/20 text-destructive border-destructive/30",
  };

  const severityIcons = {
    info: Info,
    success: CheckCircle,
    warning: AlertTriangle,
    error: AlertTriangle,
  };

  return (
    <div className="container mx-auto py-8 px-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Administration</h1>
            <p className="text-muted-foreground">
              Manage users, monitor system health, and view audit logs
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Logs
            </Button>
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Tab Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex gap-2 mb-6 border-b pb-4"
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "ghost"}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className="gap-2"
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </Button>
          );
        })}
      </motion.div>

      {/* User Management Tab */}
      {activeTab === "users" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>User Management</CardTitle>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search users..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 h-9 w-64 rounded-md border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add User
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b text-left">
                      <th className="pb-3 font-medium text-sm text-muted-foreground">Name</th>
                      <th className="pb-3 font-medium text-sm text-muted-foreground">Email</th>
                      <th className="pb-3 font-medium text-sm text-muted-foreground">Role</th>
                      <th className="pb-3 font-medium text-sm text-muted-foreground">Status</th>
                      <th className="pb-3 font-medium text-sm text-muted-foreground">Last Login</th>
                      <th className="pb-3 font-medium text-sm text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, index) => (
                      <motion.tr
                        key={user.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.05 }}
                        className="border-b last:border-0"
                      >
                        <td className="py-3 font-medium">{user.name}</td>
                        <td className="py-3 text-sm text-muted-foreground">{user.email}</td>
                        <td className="py-3">
                          <Badge variant="outline">{user.role}</Badge>
                        </td>
                        <td className="py-3">
                          <Badge
                            className={cn(
                              user.status === "active"
                                ? "bg-success/20 text-success border-success/30"
                                : "bg-muted text-muted-foreground"
                            )}
                          >
                            {user.status}
                          </Badge>
                        </td>
                        <td className="py-3 text-sm text-muted-foreground">{user.lastLogin}</td>
                        <td className="py-3">
                          <div className="flex gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Audit Log Tab */}
      {activeTab === "audit" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Audit Log
                </CardTitle>
                <div className="flex gap-2">
                  <select className="h-9 px-3 rounded-md border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                    <option>All Severities</option>
                    <option>Info</option>
                    <option>Success</option>
                    <option>Warning</option>
                    <option>Error</option>
                  </select>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {auditLogs.map((log, index) => {
                  const SeverityIcon = severityIcons[log.severity as keyof typeof severityIcons];
                  return (
                    <motion.div
                      key={log.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.05 }}
                      className="flex items-start gap-4 p-4 rounded-lg bg-muted/30"
                    >
                      <div className={cn("p-2 rounded-lg", severityStyles[log.severity as keyof typeof severityStyles])}>
                        <SeverityIcon className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">{log.action}</p>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {log.timestamp}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{log.details}</p>
                        <p className="text-xs text-muted-foreground mt-1">User: {log.user}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* System Health Tab */}
      {activeTab === "system" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-success/20">
                  <Server className="h-5 w-5 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{systemMetrics.uptime}</p>
                  <p className="text-xs text-muted-foreground">System Uptime</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/20">
                  <Activity className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{systemMetrics.responseTime}</p>
                  <p className="text-xs text-muted-foreground">Avg Response Time</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-accent/20">
                  <Users className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{systemMetrics.activeUsers}</p>
                  <p className="text-xs text-muted-foreground">Active Users</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-warning/20">
                  <Zap className="h-5 w-5 text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{systemMetrics.apiCalls}</p>
                  <p className="text-xs text-muted-foreground">API Calls (24h)</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Resource Usage */}
          <Card>
            <CardHeader>
              <CardTitle>Resource Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm flex items-center gap-2">
                      <Cpu className="h-4 w-4" /> CPU
                    </span>
                    <span className="text-sm font-medium">{systemMetrics.cpuUsage}%</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${systemMetrics.cpuUsage}%` }}
                      transition={{ duration: 1, delay: 0.3 }}
                      className="h-full bg-success rounded-full"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm flex items-center gap-2">
                      <Activity className="h-4 w-4" /> Memory
                    </span>
                    <span className="text-sm font-medium">{systemMetrics.memoryUsage}%</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${systemMetrics.memoryUsage}%` }}
                      transition={{ duration: 1, delay: 0.4 }}
                      className="h-full bg-primary rounded-full"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm flex items-center gap-2">
                      <Database className="h-4 w-4" /> Disk
                    </span>
                    <span className="text-sm font-medium">{systemMetrics.diskUsage}%</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${systemMetrics.diskUsage}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full bg-accent rounded-full"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm flex items-center gap-2">
                      <Server className="h-4 w-4" /> Network I/O
                    </span>
                    <span className="text-sm font-medium">{systemMetrics.networkIO}</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "68%" }}
                      transition={{ duration: 1, delay: 0.6 }}
                      className="h-full bg-warning rounded-full"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* API Metrics Tab */}
      {activeTab === "api" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  API Endpoint Metrics
                </CardTitle>
                <Badge variant="outline" className="text-success border-success/30">
                  All Systems Operational
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b text-left">
                      <th className="pb-3 font-medium text-sm text-muted-foreground">Endpoint</th>
                      <th className="pb-3 font-medium text-sm text-muted-foreground">Calls (24h)</th>
                      <th className="pb-3 font-medium text-sm text-muted-foreground">Avg Response</th>
                      <th className="pb-3 font-medium text-sm text-muted-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {apiEndpoints.map((api, index) => (
                      <motion.tr
                        key={api.endpoint}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.05 }}
                        className="border-b last:border-0"
                      >
                        <td className="py-3 font-mono text-sm">{api.endpoint}</td>
                        <td className="py-3 text-sm">{api.calls.toLocaleString()}</td>
                        <td className="py-3 text-sm font-mono">{api.avgTime}</td>
                        <td className="py-3">
                          <Badge
                            className={cn(
                              api.status === "healthy"
                                ? "bg-success/20 text-success border-success/30"
                                : "bg-warning/20 text-warning border-warning/30"
                            )}
                          >
                            {api.status}
                          </Badge>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
