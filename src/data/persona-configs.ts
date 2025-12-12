// Persona-specific configurations for role-based UI/data
// Each persona gets unique KPIs, filters, permissions, and navigation

import type { LucideIcon } from "lucide-react";
import {
  FileText,
  Clock,
  CheckCircle,
  DollarSign,
  AlertTriangle,
  Shield,
  Users,
  Server,
  Activity,
  Wallet,
  PieChart,
  TrendingUp,
  Plus,
  FileEdit,
  ListChecks,
  UserPlus,
  Calculator,
  FileSpreadsheet,
  UserCog,
  Settings,
} from "lucide-react";

// Types
export type Permission =
  | "create_application"
  | "edit_own_application"
  | "submit_application"
  | "view_all_applications"
  | "review_application"
  | "approve_application"
  | "reject_application"
  | "financial_review"
  | "assign_reviewer"
  | "manage_users"
  | "view_audit_logs"
  | "configure_system"
  | "export_data";

export interface KPIConfig {
  id: string;
  label: string;
  icon: LucideIcon;
  getValue: (personaId: string) => string | number;
  suffix?: string;
  color?: string;
  bgColor?: string;
  borderColor?: string;
  trend?: {
    value: number;
    direction: "up" | "down";
    isPositive: boolean;
  };
}

export interface QuickAction {
  label: string;
  href: string;
  icon: LucideIcon;
  variant?: "default" | "outline" | "secondary";
}

export interface ApplicationFilter {
  assigneeId?: string; // Filter to specific user's apps
  minBudget?: number; // Minimum budget threshold
  showAll?: boolean; // Override to show all
  statuses?: string[]; // Filter by status
}

export interface NavVisibility {
  dashboard: boolean;
  applications: boolean;
  newApplication: boolean;
  analytics: boolean;
  admin: boolean;
}

export interface PersonaConfig {
  personaId: string;
  permissions: Permission[];
  applicationFilter: ApplicationFilter;
  primaryKPIs: KPIConfig[];
  secondaryKPIs: KPIConfig[];
  quickActions: QuickAction[];
  navVisibility: NavVisibility;
  homeRedirect?: string; // Redirect to different page on login
  welcomeSubtitle: string;
}

// KPI value getters (hardcoded for demo - updated to match applications.json)
const kpiValues = {
  // Dr. Sarah Chen - Principal Investigator (7 apps: APP-001, APP-SC-002 to APP-SC-006)
  "dr-sarah-chen": {
    myApplications: 7,
    pendingAction: 2,
    approvalRate: 86,
    fundingReceived: "$1.125M",
    drafts: 1,
    avgProcessingDays: 2.8,
  },
  // James Rodriguez - Grants Administrator (sees all 26 apps, 12 in review status)
  "james-rodriguez": {
    pendingReview: 12,
    slaAtRisk: 3,
    complianceRate: 96,
    processedThisWeek: 15,
    totalActive: 26,
    avgProcessingDays: 3.1,
  },
  // Dr. Emily Carter - Clinician (4 apps: APP-VS-001, APP-EC-002 to APP-EC-004)
  "dr-emily-carter": {
    myApplications: 4,
    patientsCovered: 1323,
    facilitiesServed: 24,
    fundingReceived: "$3.3M",
    pendingAction: 1,
    approvalRate: 92,
  },
  // Maria Thompson - Financial Analyst (18 high-budget apps $100K+)
  "maria-thompson": {
    pendingFinancialReview: 8,
    totalCommitted: "$12.4M",
    budgetUtilization: 82,
    avgRequestAmount: "$520K",
    highValueApps: 18,
    budgetVariance: -1.8,
  },
  // David Kim - System Administrator
  "david-kim": {
    activeUsers: 847,
    systemUptime: 99.97,
    apiHealth: "Healthy",
    securityAlerts: 0,
    pendingAccessRequests: 3,
    lastBackup: "2h ago",
  },
};

// ============================================
// DR. SARAH CHEN - Principal Investigator
// ============================================
export const principalInvestigatorConfig: PersonaConfig = {
  personaId: "dr-sarah-chen",
  permissions: [
    "create_application",
    "edit_own_application",
    "submit_application",
    "export_data",
  ],
  applicationFilter: {
    assigneeId: "USR-001", // Only her own applications
    showAll: false,
  },
  primaryKPIs: [
    {
      id: "my-applications",
      label: "My Applications",
      icon: FileText,
      getValue: () => kpiValues["dr-sarah-chen"].myApplications,
      color: "text-primary",
      bgColor: "bg-primary/10",
      borderColor: "border-primary/20",
      trend: { value: 1, direction: "up", isPositive: true },
    },
    {
      id: "pending-action",
      label: "Pending My Action",
      icon: Clock,
      getValue: () => kpiValues["dr-sarah-chen"].pendingAction,
      color: "text-warning",
      bgColor: "bg-warning/10",
      borderColor: "border-warning/20",
    },
    {
      id: "approval-rate",
      label: "My Approval Rate",
      icon: CheckCircle,
      getValue: () => kpiValues["dr-sarah-chen"].approvalRate,
      suffix: "%",
      color: "text-success",
      bgColor: "bg-success/10",
      borderColor: "border-success/20",
      trend: { value: 5, direction: "up", isPositive: true },
    },
    {
      id: "funding-received",
      label: "Funding Received",
      icon: DollarSign,
      getValue: () => kpiValues["dr-sarah-chen"].fundingReceived,
      color: "text-accent",
      bgColor: "bg-accent/10",
      borderColor: "border-accent/20",
    },
  ],
  secondaryKPIs: [
    {
      id: "drafts",
      label: "Drafts",
      icon: FileEdit,
      getValue: () => kpiValues["dr-sarah-chen"].drafts,
    },
    {
      id: "avg-processing",
      label: "Avg Processing",
      icon: Clock,
      getValue: () => kpiValues["dr-sarah-chen"].avgProcessingDays,
      suffix: " days",
    },
  ],
  quickActions: [
    { label: "New Application", href: "/applications/new", icon: Plus, variant: "default" },
    { label: "Continue Draft", href: "/applications?status=draft", icon: FileEdit, variant: "outline" },
    { label: "View My Apps", href: "/applications", icon: FileText, variant: "outline" },
  ],
  navVisibility: {
    dashboard: true,
    applications: true,
    newApplication: true,
    analytics: true,
    admin: false,
  },
  welcomeSubtitle: "Manage your research applications and track funding.",
};

// ============================================
// JAMES RODRIGUEZ - Grants Administrator
// ============================================
export const grantsAdminConfig: PersonaConfig = {
  personaId: "james-rodriguez",
  permissions: [
    "view_all_applications",
    "review_application",
    "approve_application",
    "reject_application",
    "assign_reviewer",
    "export_data",
  ],
  applicationFilter: {
    showAll: true, // Sees all applications
  },
  primaryKPIs: [
    {
      id: "pending-review",
      label: "Pending Review",
      icon: Clock,
      getValue: () => kpiValues["james-rodriguez"].pendingReview,
      color: "text-warning",
      bgColor: "bg-warning/10",
      borderColor: "border-warning/20",
      trend: { value: 3, direction: "down", isPositive: true },
    },
    {
      id: "sla-at-risk",
      label: "SLA at Risk",
      icon: AlertTriangle,
      getValue: () => kpiValues["james-rodriguez"].slaAtRisk,
      color: "text-destructive",
      bgColor: "bg-destructive/10",
      borderColor: "border-destructive/20",
    },
    {
      id: "compliance-rate",
      label: "Compliance Rate",
      icon: Shield,
      getValue: () => kpiValues["james-rodriguez"].complianceRate,
      suffix: "%",
      color: "text-success",
      bgColor: "bg-success/10",
      borderColor: "border-success/20",
      trend: { value: 2, direction: "up", isPositive: true },
    },
    {
      id: "processed-this-week",
      label: "Processed This Week",
      icon: CheckCircle,
      getValue: () => kpiValues["james-rodriguez"].processedThisWeek,
      color: "text-primary",
      bgColor: "bg-primary/10",
      borderColor: "border-primary/20",
      trend: { value: 15, direction: "up", isPositive: true },
    },
  ],
  secondaryKPIs: [
    {
      id: "total-active",
      label: "Total Active",
      icon: FileText,
      getValue: () => kpiValues["james-rodriguez"].totalActive,
    },
    {
      id: "avg-processing",
      label: "Avg Processing",
      icon: Clock,
      getValue: () => kpiValues["james-rodriguez"].avgProcessingDays,
      suffix: " days",
    },
  ],
  quickActions: [
    { label: "Review Queue", href: "/applications?status=review", icon: ListChecks, variant: "default" },
    { label: "Assign Reviewer", href: "/applications", icon: UserPlus, variant: "outline" },
    { label: "Compliance Report", href: "/analytics", icon: Shield, variant: "outline" },
  ],
  navVisibility: {
    dashboard: true,
    applications: true,
    newApplication: false, // Can't create applications
    analytics: true,
    admin: false,
  },
  welcomeSubtitle: "8 applications need your attention today.",
};

// ============================================
// MARIA THOMPSON - Financial Analyst
// ============================================
export const financialAnalystConfig: PersonaConfig = {
  personaId: "maria-thompson",
  permissions: [
    "view_all_applications",
    "financial_review",
    "export_data",
  ],
  applicationFilter: {
    minBudget: 100000, // Only high-budget applications
    showAll: false,
  },
  primaryKPIs: [
    {
      id: "pending-financial-review",
      label: "Pending Financial Review",
      icon: DollarSign,
      getValue: () => kpiValues["maria-thompson"].pendingFinancialReview,
      color: "text-warning",
      bgColor: "bg-warning/10",
      borderColor: "border-warning/20",
    },
    {
      id: "total-committed",
      label: "Total Committed",
      icon: Wallet,
      getValue: () => kpiValues["maria-thompson"].totalCommitted,
      color: "text-primary",
      bgColor: "bg-primary/10",
      borderColor: "border-primary/20",
      trend: { value: 8, direction: "up", isPositive: true },
    },
    {
      id: "budget-utilization",
      label: "Budget Utilization",
      icon: PieChart,
      getValue: () => kpiValues["maria-thompson"].budgetUtilization,
      suffix: "%",
      color: "text-success",
      bgColor: "bg-success/10",
      borderColor: "border-success/20",
    },
    {
      id: "avg-request-amount",
      label: "Avg Request Amount",
      icon: TrendingUp,
      getValue: () => kpiValues["maria-thompson"].avgRequestAmount,
      color: "text-accent",
      bgColor: "bg-accent/10",
      borderColor: "border-accent/20",
    },
  ],
  secondaryKPIs: [
    {
      id: "high-value-apps",
      label: "High-Value Apps",
      icon: FileText,
      getValue: () => kpiValues["maria-thompson"].highValueApps,
    },
    {
      id: "budget-variance",
      label: "Budget Variance",
      icon: TrendingUp,
      getValue: () => kpiValues["maria-thompson"].budgetVariance,
      suffix: "%",
    },
  ],
  quickActions: [
    { label: "Financial Review", href: "/applications?filter=financial", icon: Calculator, variant: "default" },
    { label: "Budget Report", href: "/analytics", icon: FileSpreadsheet, variant: "outline" },
    { label: "High-Value Queue", href: "/applications", icon: DollarSign, variant: "outline" },
  ],
  navVisibility: {
    dashboard: true,
    applications: true,
    newApplication: false, // Can't create applications
    analytics: true,
    admin: false,
  },
  welcomeSubtitle: "$2.1M in applications pending financial review.",
};

// ============================================
// DAVID KIM - System Administrator
// ============================================
export const systemAdminConfig: PersonaConfig = {
  personaId: "david-kim",
  permissions: [
    "manage_users",
    "view_audit_logs",
    "configure_system",
    "export_data",
  ],
  applicationFilter: {
    showAll: false, // Doesn't see applications - redirected to admin
  },
  primaryKPIs: [
    {
      id: "active-users",
      label: "Active Users",
      icon: Users,
      getValue: () => kpiValues["david-kim"].activeUsers,
      color: "text-primary",
      bgColor: "bg-primary/10",
      borderColor: "border-primary/20",
      trend: { value: 23, direction: "up", isPositive: true },
    },
    {
      id: "system-uptime",
      label: "System Uptime",
      icon: Server,
      getValue: () => kpiValues["david-kim"].systemUptime,
      suffix: "%",
      color: "text-success",
      bgColor: "bg-success/10",
      borderColor: "border-success/20",
    },
    {
      id: "api-health",
      label: "API Health",
      icon: Activity,
      getValue: () => kpiValues["david-kim"].apiHealth,
      color: "text-success",
      bgColor: "bg-success/10",
      borderColor: "border-success/20",
    },
    {
      id: "security-alerts",
      label: "Security Alerts",
      icon: Shield,
      getValue: () => kpiValues["david-kim"].securityAlerts,
      color: "text-success",
      bgColor: "bg-success/10",
      borderColor: "border-success/20",
    },
  ],
  secondaryKPIs: [
    {
      id: "pending-access",
      label: "Access Requests",
      icon: UserPlus,
      getValue: () => kpiValues["david-kim"].pendingAccessRequests,
    },
    {
      id: "last-backup",
      label: "Last Backup",
      icon: Server,
      getValue: () => kpiValues["david-kim"].lastBackup,
    },
  ],
  quickActions: [
    { label: "Manage Users", href: "/admin?tab=users", icon: UserCog, variant: "default" },
    { label: "View Audit Logs", href: "/admin?tab=audit", icon: FileText, variant: "outline" },
    { label: "System Settings", href: "/admin?tab=settings", icon: Settings, variant: "outline" },
  ],
  navVisibility: {
    dashboard: false, // Redirects to admin
    applications: false, // Hidden
    newApplication: false,
    analytics: false, // System metrics in admin instead
    admin: true,
  },
  homeRedirect: "/admin", // Redirect to admin panel on login
  welcomeSubtitle: "All systems operational. 0 security alerts.",
};

// ============================================
// DR. EMILY CARTER - Clinician (Veterans Health)
// ============================================
export const clinicianConfig: PersonaConfig = {
  personaId: "dr-emily-carter",
  permissions: [
    "create_application",
    "edit_own_application",
    "submit_application",
    "export_data",
  ],
  applicationFilter: {
    assigneeId: "USR-VS-001", // Only her own veteran applications
    showAll: false,
  },
  primaryKPIs: [
    {
      id: "my-applications",
      label: "My Applications",
      icon: FileText,
      getValue: () => kpiValues["dr-emily-carter"]?.myApplications ?? 4,
      color: "text-primary",
      bgColor: "bg-primary/10",
      borderColor: "border-primary/20",
      trend: { value: 1, direction: "up", isPositive: true },
    },
    {
      id: "patients-covered",
      label: "Patients Covered",
      icon: Users,
      getValue: () => kpiValues["dr-emily-carter"]?.patientsCovered ?? 1323,
      color: "text-success",
      bgColor: "bg-success/10",
      borderColor: "border-success/20",
      trend: { value: 12, direction: "up", isPositive: true },
    },
    {
      id: "facilities-served",
      label: "Facilities Served",
      icon: Activity,
      getValue: () => kpiValues["dr-emily-carter"]?.facilitiesServed ?? 24,
      color: "text-accent",
      bgColor: "bg-accent/10",
      borderColor: "border-accent/20",
    },
    {
      id: "funding-received",
      label: "Funding Received",
      icon: DollarSign,
      getValue: () => kpiValues["dr-emily-carter"]?.fundingReceived ?? "$3.3M",
      color: "text-warning",
      bgColor: "bg-warning/10",
      borderColor: "border-warning/20",
    },
  ],
  secondaryKPIs: [
    {
      id: "pending-action",
      label: "Pending Action",
      icon: Clock,
      getValue: () => kpiValues["dr-emily-carter"]?.pendingAction ?? 1,
    },
    {
      id: "approval-rate",
      label: "Approval Rate",
      icon: CheckCircle,
      getValue: () => kpiValues["dr-emily-carter"]?.approvalRate ?? 92,
      suffix: "%",
    },
  ],
  quickActions: [
    { label: "New Application", href: "/applications/new", icon: Plus, variant: "default" },
    { label: "Patient Records", href: "/veterans/patient-records", icon: FileText, variant: "outline" },
    { label: "View My Apps", href: "/applications", icon: FileText, variant: "outline" },
  ],
  navVisibility: {
    dashboard: true,
    applications: true,
    newApplication: true,
    analytics: true,
    admin: false,
  },
  welcomeSubtitle: "Managing care for 1,323 veterans across 24 facilities.",
};

// ============================================
// CONFIG LOOKUP
// ============================================
const personaConfigs: Record<string, PersonaConfig> = {
  "dr-sarah-chen": principalInvestigatorConfig,
  "james-rodriguez": grantsAdminConfig,
  "dr-emily-carter": clinicianConfig,
  "maria-thompson": financialAnalystConfig,
  "david-kim": systemAdminConfig,
};

export function getPersonaConfig(personaId: string): PersonaConfig | undefined {
  return personaConfigs[personaId];
}

export function getDefaultConfig(): PersonaConfig {
  return principalInvestigatorConfig;
}

// Permission check helper
export function hasPermission(personaId: string, permission: Permission): boolean {
  const config = getPersonaConfig(personaId);
  return config?.permissions.includes(permission) ?? false;
}
