"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

// Map route segments to display names
const routeLabels: Record<string, string> = {
  "": "Dashboard",
  applications: "Applications",
  analytics: "Analytics",
  "ai-insights": "AI Insights",
  profile: "Profile",
  settings: "Settings",
  security: "Security & Privacy",
  admin: "Admin",
  brand: "Brand",
};

// Get label for a route segment
function getLabel(segment: string): string {
  // Check if it's a dynamic segment (starts with [ or is a UUID/ID pattern)
  if (segment.startsWith("[") || /^[a-f0-9-]{8,}$/i.test(segment) || /^APP-\d+/.test(segment)) {
    return segment.replace(/^\[|\]$/g, ""); // Return as-is for dynamic routes
  }
  return routeLabels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");
}

interface BreadcrumbProps {
  className?: string;
  // Optional override for the current page label (useful for dynamic routes)
  currentLabel?: string;
}

export function Breadcrumb({ className, currentLabel }: BreadcrumbProps) {
  const pathname = usePathname();

  // Split pathname into segments and filter empty strings
  const segments = pathname.split("/").filter(Boolean);

  // Don't show breadcrumb on home page
  if (segments.length === 0) {
    return null;
  }

  // Build breadcrumb items
  const breadcrumbs = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");
    const isLast = index === segments.length - 1;
    const label = isLast && currentLabel ? currentLabel : getLabel(segment);

    return {
      href,
      label,
      isLast,
    };
  });

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("flex items-center text-sm text-muted-foreground", className)}
    >
      <ol className="flex items-center gap-1.5">
        {/* Home link */}
        <li>
          <Link
            href="/"
            className="flex items-center gap-1 hover:text-foreground transition-colors"
            aria-label="Home"
          >
            <Home className="h-4 w-4" />
            <span className="sr-only">Home</span>
          </Link>
        </li>

        {breadcrumbs.map((crumb, index) => (
          <li key={crumb.href} className="flex items-center gap-1.5">
            <ChevronRight className="h-4 w-4 text-muted-foreground/50" aria-hidden="true" />
            {crumb.isLast ? (
              <span className="font-medium text-foreground" aria-current="page">
                {crumb.label}
              </span>
            ) : (
              <Link
                href={crumb.href}
                className="hover:text-foreground transition-colors"
              >
                {crumb.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
