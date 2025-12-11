"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  User,
  Settings,
  Shield,
  LogOut,
  Moon,
  Sun,
  Monitor,
  LogIn,
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
import { createClient } from "@/lib/supabase/client";
import type { User as SupabaseUser } from "@supabase/supabase-js";

// Default demo user for when not authenticated
const demoUser = {
  name: "Dr. Sarah Chen",
  email: "sarah.chen@dha.mil",
  role: "Principal Investigator",
  department: "Medical Research",
  avatar: "/avatars/dr-sarah-chen.jpg",
};

export function UserDropdown() {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };

    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  const handleSignIn = () => {
    router.push('/login');
  };

  // Get display info from authenticated user or demo user
  const displayUser = user ? {
    name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'User',
    email: user.email || '',
    role: 'Authenticated User',
    department: 'EIDS Platform',
    avatar: user.user_metadata?.avatar_url || '/avatars/dr-sarah-chen.jpg',
  } : demoUser;

  if (loading) {
    return (
      <Button variant="ghost" className="h-10 w-10 rounded-full animate-pulse bg-muted" />
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-3 h-auto py-1.5 px-2 hover:bg-secondary/50"
          aria-label="User menu"
        >
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium">{displayUser.name}</p>
            <p className="text-xs text-muted-foreground">{displayUser.role}</p>
          </div>
          <div className="rounded-full border border-border hover:border-primary/50 transition-colors duration-200 overflow-hidden">
            {displayUser.avatar.startsWith('http') ? (
              <Image
                src={displayUser.avatar}
                alt={displayUser.name}
                width={36}
                height={36}
                className="rounded-full object-cover"
                unoptimized
              />
            ) : (
              <Image
                src={displayUser.avatar}
                alt={displayUser.name}
                width={36}
                height={36}
                className="rounded-full object-cover"
              />
            )}
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[280px]">
        {/* User Info Header */}
        <div className="flex items-center gap-3 p-3">
          {displayUser.avatar.startsWith('http') ? (
            <Image
              src={displayUser.avatar}
              alt={displayUser.name}
              width={48}
              height={48}
              className="rounded-full object-cover border border-border"
              unoptimized
            />
          ) : (
            <Image
              src={displayUser.avatar}
              alt={displayUser.name}
              width={48}
              height={48}
              className="rounded-full object-cover border border-border"
            />
          )}
          <div className="flex-1 min-w-0">
            <p className="font-semibold truncate">{displayUser.name}</p>
            <p className="text-xs text-muted-foreground truncate">
              {displayUser.email}
            </p>
            <p className="text-xs text-primary mt-0.5">{displayUser.department}</p>
          </div>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href="/profile">
            <User className="h-4 w-4 mr-2" />
            View Profile
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href="/settings">
            <Settings className="h-4 w-4 mr-2" />
            Account Settings
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href="/security">
            <Shield className="h-4 w-4 mr-2" />
            Security & Privacy
          </Link>
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

        {user ? (
          <DropdownMenuItem
            className="cursor-pointer text-red-500 focus:text-red-500"
            onClick={handleSignOut}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem
            className="cursor-pointer text-primary"
            onClick={handleSignIn}
          >
            <LogIn className="h-4 w-4 mr-2" />
            Sign In
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator />

        <div className="px-2 py-2 text-[10px] text-muted-foreground/60">
          {user ? `Signed in as ${user.email}` : 'Demo Mode - Not signed in'}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
