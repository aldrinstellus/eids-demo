"use client";

import {
  HelpCircle,
  Book,
  MessageCircle,
  FileText,
  Video,
  ExternalLink,
  Keyboard,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const helpItems = [
  {
    icon: Book,
    label: "Documentation",
    description: "User guides & tutorials",
    href: "#",
  },
  {
    icon: Video,
    label: "Video Tutorials",
    description: "Step-by-step walkthroughs",
    href: "#",
  },
  {
    icon: FileText,
    label: "FAQ",
    description: "Frequently asked questions",
    href: "#",
  },
  {
    icon: Keyboard,
    label: "Keyboard Shortcuts",
    description: "Quick navigation tips",
    href: "#",
  },
];

const supportItems = [
  {
    icon: MessageCircle,
    label: "Contact Support",
    description: "Get help from our team",
    href: "#",
  },
  {
    icon: Mail,
    label: "Submit Feedback",
    description: "Share your thoughts",
    href: "#",
  },
];

export function HelpDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Help"
          className="hover:bg-secondary/50 transition-colors duration-200"
        >
          <HelpCircle className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[280px]">
        <DropdownMenuLabel className="font-semibold">
          Help & Resources
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {helpItems.map((item) => (
          <DropdownMenuItem key={item.label} asChild>
            <a
              href={item.href}
              className="flex items-start gap-3 py-2 cursor-pointer"
            >
              <div className="p-1.5 rounded-md bg-muted">
                <item.icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{item.label}</p>
                <p className="text-xs text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </a>
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />
        <DropdownMenuLabel className="text-xs text-muted-foreground font-normal">
          Support
        </DropdownMenuLabel>

        {supportItems.map((item) => (
          <DropdownMenuItem key={item.label} asChild>
            <a
              href={item.href}
              className="flex items-start gap-3 py-2 cursor-pointer"
            >
              <div className="p-1.5 rounded-md bg-muted">
                <item.icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{item.label}</p>
                <p className="text-xs text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </a>
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <a
            href="#"
            className="flex items-center justify-between py-2 text-xs text-muted-foreground cursor-pointer"
          >
            <span>EIDS Documentation Portal</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </DropdownMenuItem>

        <div className="px-2 py-2 text-[10px] text-muted-foreground/60">
          Version 2.4.1 • Last updated Dec 9, 2025
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
