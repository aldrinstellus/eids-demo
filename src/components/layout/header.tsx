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
  ChevronRight,
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
    <header className="sticky top-0 z-50 w-full glass-card border-b border-glass-border rounded-none">
      {/* Cyber scan line effect */}
      <div className="scanner-line" />

      <div className="flex h-16 items-center px-6 relative">
        {/* Logo with glow */}
        <Link href="/" className="flex items-center mr-8 group">
          <div className="relative">
            <EIDSLogo size="md" />
            {/* Glow effect on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl bg-primary/20 -z-10" />
          </div>
        </Link>

        {/* Navigation with double arrow indicators */}
        <nav aria-label="Main navigation" className="flex items-center gap-1">
          {navigation.map((item, index) => {
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
                  "relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300",
                  "hover:bg-secondary/50",
                  isActive
                    ? "bg-primary/10 text-primary glow-primary"
                    : "text-muted-foreground hover:text-foreground",
                  "fade-enter"
                )}
                style={{ animationDelay: `${index * 0.1}s` }}
                aria-current={isActive ? "page" : undefined}
              >
                {/* Double arrow indicator for active state */}
                {isActive && (
                  <span className="absolute -left-1 text-primary font-mono font-bold animate-arrow-pulse neon-text">
                    ››
                  </span>
                )}
                <Icon
                  className={cn(
                    "h-4 w-4 transition-all duration-300",
                    isActive && "text-primary drop-shadow-[0_0_8px_hsl(var(--primary-glow))]"
                  )}
                  aria-hidden="true"
                />
                <span className={cn(isActive && "ml-1")}>{item.name}</span>
                {/* Subtle chevron on hover */}
                <ChevronRight
                  className={cn(
                    "h-3 w-3 opacity-0 -ml-1 transition-all duration-300",
                    "group-hover:opacity-50 group-hover:ml-0"
                  )}
                />
              </Link>
            );
          })}
        </nav>

        {/* Right side actions */}
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />

          {/* Notification button with glow badge */}
          <Button
            variant="ghost"
            size="icon"
            aria-label="Notifications"
            className="relative hover:bg-secondary/50 hover:text-primary transition-all duration-300"
          >
            <Bell className="h-5 w-5" />
            {/* Notification indicator */}
            <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full animate-glow-pulse" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            aria-label="Help"
            className="hover:bg-secondary/50 hover:text-primary transition-all duration-300"
          >
            <HelpCircle className="h-5 w-5" />
          </Button>

          {/* User section with cyber border */}
          <div className="flex items-center gap-3 ml-2 pl-4 border-l border-glass-border">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium font-display tracking-wide">Dr. Sarah Chen</p>
              <p className="text-xs text-muted-foreground font-mono">Principal Investigator</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full cyber-border hover:glow-primary transition-all duration-300 p-0 overflow-hidden"
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
