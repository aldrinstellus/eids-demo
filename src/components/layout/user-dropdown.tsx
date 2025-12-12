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
  Users,
  ChevronRight,
  Check,
  Sparkles,
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
import { demoPersonas, getPersonaById, type DemoPersona } from "@/data/demo-personas";
import type { User as SupabaseUser } from "@supabase/supabase-js";

const DEMO_STORAGE_KEY = "eids-demo-persona";

// Color mapping for persona accents
const personaColors: Record<string, { bg: string; border: string; glow: string; text: string }> = {
  emerald: {
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
    glow: "shadow-emerald-500/20",
    text: "text-emerald-400",
  },
  cyan: {
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/30",
    glow: "shadow-cyan-500/20",
    text: "text-cyan-400",
  },
  amber: {
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
    glow: "shadow-amber-500/20",
    text: "text-amber-400",
  },
  violet: {
    bg: "bg-violet-500/10",
    border: "border-violet-500/30",
    glow: "shadow-violet-500/20",
    text: "text-violet-400",
  },
  rose: {
    bg: "bg-rose-500/10",
    border: "border-rose-500/30",
    glow: "shadow-rose-500/20",
    text: "text-rose-400",
  },
};

export function UserDropdown() {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [demoPersona, setDemoPersona] = useState<DemoPersona | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    // Check for demo persona in localStorage
    const storedPersonaId = localStorage.getItem(DEMO_STORAGE_KEY);
    if (storedPersonaId) {
      const persona = getPersonaById(storedPersonaId);
      if (persona) {
        setDemoPersona(persona);
      }
    }

    // Check for Supabase auth
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
    // Clear demo persona from localStorage
    localStorage.removeItem(DEMO_STORAGE_KEY);
    // Clear demo persona cookie for server-side middleware
    document.cookie = "eids-demo-persona=; path=/; max-age=0; SameSite=Lax";
    setDemoPersona(null);

    // Sign out from Supabase if authenticated
    if (user) {
      await supabase.auth.signOut();
    }

    router.push('/login');
    router.refresh();
  };

  const handleSwitchPersona = (personaId: string) => {
    const persona = getPersonaById(personaId);
    if (persona) {
      localStorage.setItem(DEMO_STORAGE_KEY, personaId);
      // Also set cookie for server-side middleware
      document.cookie = `eids-demo-persona=${personaId}; path=/; max-age=86400; SameSite=Lax`;
      setDemoPersona(persona);
      // Navigate to home - the dashboard will handle persona-specific redirects
      window.location.href = "/";
    }
  };

  // Determine display state - prioritize demo persona, then auth user, then default
  const isDemoMode = demoPersona !== null;
  const isAuthenticated = user !== null;

  const displayUser = demoPersona ? {
    name: demoPersona.name,
    email: `${demoPersona.id.replace(/-/g, '.')}@dha.mil`,
    role: demoPersona.role,
    department: demoPersona.department,
    avatar: demoPersona.avatar,
    color: demoPersona.color,
  } : user ? {
    name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'User',
    email: user.email || '',
    role: 'Authenticated User',
    department: 'EIDS Platform',
    avatar: user.user_metadata?.avatar_url || '/avatars/dr-sarah-chen.jpg',
    color: 'emerald',
  } : {
    name: "Guest",
    email: "",
    role: "Not signed in",
    department: "",
    avatar: "/avatars/dr-sarah-chen.jpg",
    color: "emerald",
  };

  const colors = personaColors[displayUser.color] || personaColors.emerald;

  if (loading) {
    return (
      <Button variant="ghost" className="h-10 w-10 rounded-full animate-pulse bg-muted" />
    );
  }

  // Get initials for avatar fallback
  const initials = displayUser.name
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={`flex items-center gap-3 h-auto py-1.5 px-2 hover:bg-secondary/50 transition-all duration-300 group`}
          aria-label="User menu"
        >
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium">{displayUser.name}</p>
            <p className={`text-xs ${colors.text}`}>{displayUser.role}</p>
          </div>
          <div className={`relative rounded-full border-2 ${colors.border} transition-all duration-300 group-hover:shadow-lg ${colors.glow} overflow-hidden`}>
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
              <div className={`w-9 h-9 ${colors.bg} flex items-center justify-center`}>
                <span className={`text-sm font-bold ${colors.text}`}>{initials}</span>
              </div>
            )}
            {/* Status indicator */}
            <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-card ${isDemoMode ? 'bg-amber-400' : isAuthenticated ? 'bg-emerald-400' : 'bg-gray-400'}`} />
          </div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-[320px] p-0 overflow-hidden">
        {/* Premium header with gradient accent */}
        <div className={`relative p-4 ${colors.bg} border-b border-border`}>
          {/* Subtle glow effect */}
          <div className={`absolute inset-0 opacity-30 blur-xl ${colors.bg}`} />

          <div className="relative flex items-center gap-4">
            <div className={`relative rounded-xl border-2 ${colors.border} overflow-hidden shadow-lg ${colors.glow}`}>
              {displayUser.avatar.startsWith('http') ? (
                <Image
                  src={displayUser.avatar}
                  alt={displayUser.name}
                  width={56}
                  height={56}
                  className="object-cover"
                  unoptimized
                />
              ) : (
                <div className={`w-14 h-14 ${colors.bg} flex items-center justify-center`}>
                  <span className={`text-lg font-bold ${colors.text}`}>{initials}</span>
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-base truncate">{displayUser.name}</p>
              <p className={`text-sm ${colors.text} font-medium`}>{displayUser.role}</p>
              {displayUser.department && (
                <p className="text-xs text-muted-foreground mt-0.5">{displayUser.department}</p>
              )}
            </div>
          </div>

          {/* Mode badge */}
          <div className="absolute top-3 right-3">
            {isDemoMode ? (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                <Sparkles className="w-3 h-3" />
                DEMO
              </span>
            ) : isAuthenticated ? (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <Check className="w-3 h-3" />
                VERIFIED
              </span>
            ) : null}
          </div>
        </div>

        <div className="p-2">
          {/* Switch Persona - Only show in demo mode or for quick access */}
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="cursor-pointer rounded-lg py-2.5 px-3">
              <Users className="h-4 w-4 mr-3 text-primary" />
              <span className="flex-1">Switch Persona</span>
              <ChevronRight className="h-4 w-4 ml-auto opacity-50" />
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent className="w-[280px] p-2">
              <DropdownMenuLabel className="text-xs text-muted-foreground px-2 py-1">
                SELECT DEMO PERSONA
              </DropdownMenuLabel>
              {demoPersonas.map((persona) => {
                const pColors = personaColors[persona.color] || personaColors.emerald;
                const isActive = demoPersona?.id === persona.id;
                const pInitials = persona.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

                return (
                  <DropdownMenuItem
                    key={persona.id}
                    className={`cursor-pointer rounded-lg p-3 my-1 transition-all duration-200 ${
                      isActive ? `${pColors.bg} ${pColors.border} border` : 'hover:bg-secondary/50'
                    }`}
                    onClick={() => handleSwitchPersona(persona.id)}
                  >
                    <div className="flex items-center gap-3 w-full">
                      <Image
                        src={persona.avatar}
                        alt={persona.name}
                        width={40}
                        height={40}
                        className={`rounded-lg ${pColors.border} border object-cover flex-shrink-0`}
                        unoptimized
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{persona.name}</p>
                        <p className={`text-xs ${pColors.text}`}>{persona.role}</p>
                      </div>
                      {isActive && (
                        <Check className={`h-4 w-4 ${pColors.text} flex-shrink-0`} />
                      )}
                    </div>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuSubContent>
          </DropdownMenuSub>

          <DropdownMenuSeparator className="my-2" />

          <DropdownMenuItem asChild className="cursor-pointer rounded-lg py-2.5 px-3">
            <Link href="/profile">
              <User className="h-4 w-4 mr-3" />
              View Profile
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild className="cursor-pointer rounded-lg py-2.5 px-3">
            <Link href="/settings">
              <Settings className="h-4 w-4 mr-3" />
              Account Settings
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild className="cursor-pointer rounded-lg py-2.5 px-3">
            <Link href="/security">
              <Shield className="h-4 w-4 mr-3" />
              Security & Privacy
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator className="my-2" />

          {/* Theme Selector */}
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="cursor-pointer rounded-lg py-2.5 px-3">
              {theme === "dark" ? (
                <Moon className="h-4 w-4 mr-3" />
              ) : theme === "light" ? (
                <Sun className="h-4 w-4 mr-3" />
              ) : (
                <Monitor className="h-4 w-4 mr-3" />
              )}
              <span className="flex-1">Theme</span>
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

          <DropdownMenuSeparator className="my-2" />

          {/* Sign Out - Always show when in demo mode or authenticated */}
          {(isDemoMode || isAuthenticated) && (
            <DropdownMenuItem
              className="cursor-pointer rounded-lg py-2.5 px-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 focus:text-red-300 focus:bg-red-500/10"
              onClick={handleSignOut}
            >
              <LogOut className="h-4 w-4 mr-3" />
              {isDemoMode ? 'Exit Demo Mode' : 'Sign Out'}
            </DropdownMenuItem>
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 bg-secondary/30 border-t border-border">
          <p className="text-[10px] text-muted-foreground/60 text-center tracking-wide">
            {isDemoMode ? 'DEMO MODE • Click persona to switch' : isAuthenticated ? `Signed in as ${user?.email}` : 'Guest Mode'}
          </p>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
