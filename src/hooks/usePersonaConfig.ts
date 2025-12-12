"use client";

import { useMemo } from "react";
import { useDemoContext } from "@/contexts/demo-context";
import {
  getPersonaConfig,
  getDefaultConfig,
  hasPermission,
  type PersonaConfig,
  type Permission,
  type ApplicationFilter,
} from "@/data/persona-configs";
import applicationsData from "@/data/applications.json";

// Application type from JSON
export interface Application {
  id: string;
  name: string;
  type: string;
  status: string;
  priority: string;
  department: string;
  requestedAmount: number;
  assignee: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  description: string;
  createdAt: string;
  updatedAt: string;
  progress: number;
  currentStep: number;
  totalSteps: number;
  steps: { name: string; status: string }[];
  documents: { id: string; name: string; size: number; type: string; uploadedAt: string }[];
  aiInsights: {
    id: string;
    type: string;
    icon: string;
    message: string;
    confidence: number;
    action: string | null;
  }[];
}

/**
 * Hook to get persona-specific configuration
 * Returns the current persona's config or default if not in demo mode
 */
export function usePersonaConfig(): PersonaConfig {
  const { demoPersona } = useDemoContext();

  return useMemo(() => {
    if (demoPersona) {
      const config = getPersonaConfig(demoPersona.id);
      if (config) return config;
    }
    return getDefaultConfig();
  }, [demoPersona]);
}

/**
 * Hook to check if current persona has a specific permission
 */
export function useHasPermission(permission: Permission): boolean {
  const { demoPersona } = useDemoContext();

  return useMemo(() => {
    if (demoPersona) {
      return hasPermission(demoPersona.id, permission);
    }
    // Default persona (Dr. Sarah Chen) has limited permissions
    return hasPermission("dr-sarah-chen", permission);
  }, [demoPersona, permission]);
}

/**
 * Hook to check multiple permissions at once
 */
export function usePermissions(permissions: Permission[]): Record<Permission, boolean> {
  const { demoPersona } = useDemoContext();

  return useMemo(() => {
    const personaId = demoPersona?.id || "dr-sarah-chen";
    const result: Partial<Record<Permission, boolean>> = {};

    for (const permission of permissions) {
      result[permission] = hasPermission(personaId, permission);
    }

    return result as Record<Permission, boolean>;
  }, [demoPersona, permissions]);
}

/**
 * Filter applications based on persona's application filter config
 */
function filterApplications(
  applications: Application[],
  filter: ApplicationFilter
): Application[] {
  return applications.filter((app) => {
    // If showAll is true, include all applications
    if (filter.showAll) return true;

    // Filter by assignee if specified
    if (filter.assigneeId && app.assignee.id !== filter.assigneeId) {
      return false;
    }

    // Filter by minimum budget if specified
    if (filter.minBudget && app.requestedAmount < filter.minBudget) {
      return false;
    }

    // Filter by status if specified
    if (filter.statuses && filter.statuses.length > 0) {
      if (!filter.statuses.includes(app.status)) {
        return false;
      }
    }

    return true;
  });
}

/**
 * Hook to get filtered applications for the current persona
 * Returns only applications that match the persona's filter criteria
 */
export function usePersonaApplications(): Application[] {
  const config = usePersonaConfig();

  return useMemo(() => {
    const allApplications = applicationsData.applications as Application[];
    return filterApplications(allApplications, config.applicationFilter);
  }, [config.applicationFilter]);
}

/**
 * Hook to get application counts for KPI display
 */
export function useApplicationCounts(): {
  total: number;
  draft: number;
  active: number;
  review: number;
  completed: number;
  highPriority: number;
  totalBudget: number;
} {
  const applications = usePersonaApplications();

  return useMemo(() => {
    return {
      total: applications.length,
      draft: applications.filter((a) => a.status === "draft").length,
      active: applications.filter((a) => a.status === "active").length,
      review: applications.filter((a) => a.status === "review").length,
      completed: applications.filter((a) => a.status === "completed").length,
      highPriority: applications.filter(
        (a) => a.priority === "high" || a.priority === "critical"
      ).length,
      totalBudget: applications.reduce((sum, a) => sum + a.requestedAmount, 0),
    };
  }, [applications]);
}

/**
 * Hook to get the home redirect URL for the current persona
 * Returns undefined if no redirect is needed (standard dashboard)
 */
export function useHomeRedirect(): string | undefined {
  const config = usePersonaConfig();
  return config.homeRedirect;
}

/**
 * Hook to get navigation visibility settings
 */
export function useNavVisibility(): PersonaConfig["navVisibility"] {
  const config = usePersonaConfig();
  return config.navVisibility;
}
