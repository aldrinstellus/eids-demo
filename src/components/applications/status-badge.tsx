"use client";

import { Circle, Clock, CheckCircle, XCircle, FileEdit } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Status = "draft" | "active" | "review" | "completed" | "rejected";

interface StatusBadgeProps {
  status: Status;
  className?: string;
}

const statusConfig: Record<
  Status,
  {
    label: string;
    icon: React.ElementType;
    variant: "default" | "secondary" | "destructive" | "outline" | "success" | "warning" | "info";
  }
> = {
  draft: {
    label: "Draft",
    icon: FileEdit,
    variant: "secondary",
  },
  active: {
    label: "Active",
    icon: Circle,
    variant: "success",
  },
  review: {
    label: "In Review",
    icon: Clock,
    variant: "warning",
  },
  completed: {
    label: "Completed",
    icon: CheckCircle,
    variant: "info",
  },
  rejected: {
    label: "Rejected",
    icon: XCircle,
    variant: "destructive",
  },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status] || statusConfig.draft;
  const Icon = config.icon;

  return (
    <Badge variant={config.variant} className={cn("gap-1.5", className)}>
      <Icon className="h-3 w-3" aria-hidden="true" />
      {config.label}
    </Badge>
  );
}
