"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { DemoPersona, demoPersonas, defaultPersona, getPersonaById } from "@/data/demo-personas";

interface DemoContextType {
  // Current demo persona (null if using real auth)
  demoPersona: DemoPersona | null;
  // Whether demo mode is active
  isDemoMode: boolean;
  // Login as a demo persona
  loginAsPersona: (personaId: string) => void;
  // Exit demo mode
  exitDemoMode: () => void;
  // Get display name (either demo persona or fallback)
  getDisplayName: (fallbackName?: string) => string;
  // Get display role
  getDisplayRole: (fallbackRole?: string) => string;
}

const DemoContext = createContext<DemoContextType | undefined>(undefined);

const DEMO_STORAGE_KEY = "eids-demo-persona";

export function DemoProvider({ children }: { children: ReactNode }) {
  const [demoPersona, setDemoPersona] = useState<DemoPersona | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load demo session from localStorage on mount
  // Also ensure cookie is synced for server-side middleware
  useEffect(() => {
    const stored = localStorage.getItem(DEMO_STORAGE_KEY);
    if (stored) {
      const persona = getPersonaById(stored);
      if (persona) {
        setDemoPersona(persona);
        // Ensure cookie is set for server-side middleware
        document.cookie = `eids-demo-persona=${stored}; path=/; max-age=86400; SameSite=Lax`;
      }
    }
    setIsInitialized(true);
  }, []);

  const loginAsPersona = (personaId: string) => {
    const persona = getPersonaById(personaId);
    if (persona) {
      setDemoPersona(persona);
      localStorage.setItem(DEMO_STORAGE_KEY, personaId);
      // Also set cookie for server-side middleware
      document.cookie = `eids-demo-persona=${personaId}; path=/; max-age=86400; SameSite=Lax`;
      // Redirect to dashboard
      window.location.href = "/";
    }
  };

  const exitDemoMode = () => {
    setDemoPersona(null);
    localStorage.removeItem(DEMO_STORAGE_KEY);
    // Also clear the cookie
    document.cookie = "eids-demo-persona=; path=/; max-age=0; SameSite=Lax";
  };

  const getDisplayName = (fallbackName?: string) => {
    if (demoPersona) return demoPersona.name;
    return fallbackName || defaultPersona.name;
  };

  const getDisplayRole = (fallbackRole?: string) => {
    if (demoPersona) return demoPersona.role;
    return fallbackRole || defaultPersona.role;
  };

  // Don't render children until we've checked localStorage
  // This prevents hydration mismatch
  if (!isInitialized) {
    return null;
  }

  return (
    <DemoContext.Provider
      value={{
        demoPersona,
        isDemoMode: demoPersona !== null,
        loginAsPersona,
        exitDemoMode,
        getDisplayName,
        getDisplayRole,
      }}
    >
      {children}
    </DemoContext.Provider>
  );
}

export function useDemoContext() {
  const context = useContext(DemoContext);
  if (context === undefined) {
    throw new Error("useDemoContext must be used within a DemoProvider");
  }
  return context;
}

// Export personas for use in login page
export { demoPersonas };
