"use client";

import Image from "next/image";
import {
  User,
  Settings,
  Shield,
  LogOut,
  Moon,
  Sun,
  Monitor,
  ChevronRight,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";

const user = {
  name: "Dr. Sarah Chen",
  email: "sarah.chen@dha.mil",
  role: "Principal Investigator",
  department: "Medical Research",
  avatar: "/avatars/dr-sarah-chen.jpg",
};

export function UserDropdown() {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-3 h-auto py-1.5 px-2 hover:bg-secondary/50"
          aria-label="User menu"
        >
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium">{user.name}</p>
            <p className="text-xs text-muted-foreground">{user.role}</p>
          </div>
          <div className="rounded-full border border-border hover:border-primary/50 transition-colors duration-200 overflow-hidden">
            <Image
              src={user.avatar}
              alt={user.name}
              width={36}
              height={36}
              className="rounded-full object-cover"
            />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[280px]">
        {/* User Info Header */}
        <div className="flex items-center gap-3 p-3">
          <Image
            src={user.avatar}
            alt={user.name}
            width={48}
            height={48}
            className="rounded-full object-cover border border-border"
          />
          <div className="flex-1 min-w-0">
            <p className="font-semibold truncate">{user.name}</p>
            <p className="text-xs text-muted-foreground truncate">
              {user.email}
            </p>
            <p className="text-xs text-primary mt-0.5">{user.department}</p>
          </div>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="cursor-pointer">
          <User className="h-4 w-4 mr-2" />
          View Profile
        </DropdownMenuItem>

        <DropdownMenuItem className="cursor-pointer">
          <Settings className="h-4 w-4 mr-2" />
          Account Settings
        </DropdownMenuItem>

        <DropdownMenuItem className="cursor-pointer">
          <Shield className="h-4 w-4 mr-2" />
          Security & Privacy
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Theme Selector */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="cursor-pointer">
            {theme === "dark" ? (
              <Moon className="h-4 w-4 mr-2" />
            ) : theme === "light" ? (
              <Sun className="h-4 w-4 mr-2" />
            ) : (
              <Monitor className="h-4 w-4 mr-2" />
            )}
            Theme
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
              <DropdownMenuRadioItem value="light" className="cursor-pointer">
                <Sun className="h-4 w-4 mr-2" />
                Light
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="dark" className="cursor-pointer">
                <Moon className="h-4 w-4 mr-2" />
                Dark
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="system" className="cursor-pointer">
                <Monitor className="h-4 w-4 mr-2" />
                System
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive">
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <div className="px-2 py-2 text-[10px] text-muted-foreground/60">
          Session expires in 7h 23m
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
