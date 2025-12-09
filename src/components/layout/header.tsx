"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FileText,
  BarChart3,
  Brain,
  HelpCircle,
  Bell,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { EIDSLogo } from "@/components/brand/eids-logo";
import { ThemeToggle } from "@/components/theme-toggle";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Applications", href: "/applications", icon: FileText },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "AI Insights", href: "/analytics/ai-insights", icon: Brain },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full bg-card border-b border-border">
      <div className="flex h-16 items-center px-6 relative">
        {/* Logo - clean, professional */}
        <Link href="/" className="flex items-center mr-8">
          <EIDSLogo size="md" />
        </Link>

        {/* Navigation - clean and professional */}
        <nav aria-label="Main navigation" className="flex items-center gap-1">
          {navigation.map((item) => {
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
                {/* Simple arrow indicator for active state */}
                {isActive && (
                  <span className="absolute -left-1 text-primary font-semibold">
                    ›
                  </span>
                )}
                <Icon
                  className={cn(
                    "h-4 w-4",
                    isActive && "text-primary"
                  )}
                  aria-hidden="true"
                />
                <span className={cn(isActive && "ml-1")}>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right side actions */}
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />

          {/* Notification button */}
          <Button
            variant="ghost"
            size="icon"
            aria-label="Notifications"
            className="relative hover:bg-secondary/50 transition-colors duration-200"
          >
            <Bell className="h-5 w-5" />
            {/* Notification indicator */}
            <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            aria-label="Help"
            className="hover:bg-secondary/50 transition-colors duration-200"
          >
            <HelpCircle className="h-5 w-5" />
          </Button>

          {/* User section - clean professional */}
          <div className="flex items-center gap-3 ml-2 pl-4 border-l border-border">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium">Dr. Sarah Chen</p>
              <p className="text-xs text-muted-foreground">Principal Investigator</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full border border-border hover:border-primary/50 transition-colors duration-200 p-0 overflow-hidden"
              aria-label="Dr. Sarah Chen"
            >
              <Image
                src="/avatars/dr-sarah-chen.jpg"
                alt="Dr. Sarah Chen"
                width={36}
                height={36}
                className="rounded-full object-cover"
              />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
