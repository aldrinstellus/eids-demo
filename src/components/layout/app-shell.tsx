"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { ChatFAB } from "@/components/chat/chat-fab";

// Routes that should NOT show the main app shell (header, footer, breadcrumb)
const STANDALONE_ROUTES = ["/login", "/auth"];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Check if current route is a standalone route (no shell)
  const isStandalone = STANDALONE_ROUTES.some(route =>
    pathname === route || pathname.startsWith(`${route}/`)
  );

  // For standalone routes, render children without shell
  if (isStandalone) {
    return <>{children}</>;
  }

  // For regular routes, render with full app shell
  return (
    <>
      {/* Skip link for accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Header />
      <main id="main-content" className="flex-1">
        <div className="container mx-auto px-6 pt-4">
          <Breadcrumb />
        </div>
        {children}
      </main>
      <Footer />
      <ChatFAB />
    </>
  );
}
