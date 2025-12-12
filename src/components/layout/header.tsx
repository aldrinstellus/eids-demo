"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FileText,
  BarChart3,
  Settings,
} from "lucide-react";
import { EIDSLogo } from "@/components/brand/eids-logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { NotificationsDropdown } from "@/components/layout/notifications-dropdown";
import { HelpDropdown } from "@/components/layout/help-dropdown";
import { UserDropdown } from "@/components/layout/user-dropdown";
import { useNavVisibility } from "@/hooks/usePersonaConfig";

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
  visibilityKey?: keyof ReturnType<typeof useNavVisibility>;
}

const navigation: NavItem[] = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard, visibilityKey: "dashboard" },
  { name: "Applications", href: "/applications", icon: FileText, visibilityKey: "applications" },
  { name: "Analytics", href: "/analytics", icon: BarChart3, visibilityKey: "analytics" },
  { name: "Admin", href: "/admin", icon: Settings, visibilityKey: "admin" },
];

export function Header() {
  const pathname = usePathname();
  const navVisibility = useNavVisibility();

  // Filter navigation based on visibility settings
  const visibleNavigation = navigation.filter((item) => {
    if (!item.visibilityKey) return true;
    return navVisibility[item.visibilityKey];
  });

  return (
    <header className="sticky top-0 z-50 w-full bg-card border-b border-border">
      <div className="flex h-16 items-center px-6 relative">
        {/* Logo - clean, professional */}
        <Link href="/" className="flex items-center mr-8">
          <EIDSLogo size="md" />
        </Link>

        {/* Navigation - clean and professional */}
        <nav aria-label="Main navigation" className="flex items-center gap-1">
          {visibleNavigation.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200",
                  "hover:bg-secondary/50",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon
                  className={cn(
                    "h-4 w-4",
                    isActive && "text-primary"
                  )}
                  aria-hidden="true"
                />
                <span>{item.name}</span>
              </Link>
            );
          })}

        </nav>

        {/* Right side actions */}
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <NotificationsDropdown />
          <HelpDropdown />

          {/* User section - clean professional */}
          <div className="ml-2 pl-4 border-l border-border">
            <UserDropdown />
          </div>
        </div>
      </div>
    </header>
  );
}
