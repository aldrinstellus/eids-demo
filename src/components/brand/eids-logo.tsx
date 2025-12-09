"use client";

// EIDS Military Stencil Logo - Brand Colors (Cyan/Blue)
// Enterprise Integrated Data System - Defense Health Agency

interface EIDSLogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

export function EIDSLogo({ size = "md", showText = true }: EIDSLogoProps) {
  const sizes = {
    sm: { icon: "w-8 h-9", text: "text-lg", gap: "gap-2" },
    md: { icon: "w-10 h-11", text: "text-xl", gap: "gap-2.5" },
    lg: { icon: "w-14 h-16", text: "text-3xl", gap: "gap-3" },
  };

  return (
    <div className={`flex items-center ${sizes[size].gap}`}>
      {/* Shield Icon with Data Bars */}
      <div className="relative">
        <svg viewBox="0 0 48 56" className={sizes[size].icon}>
          {/* Shield outline - Primary Cyan */}
          <path
            d="M24 2 L44 10 L44 28 C44 40 24 54 24 54 C24 54 4 40 4 28 L4 10 Z"
            fill="none"
            stroke="hsl(199 89% 48%)"
            strokeWidth="2.5"
          />
          {/* Inner shield fill - subtle */}
          <path
            d="M24 5 L41 12 L41 28 C41 38 24 50 24 50 C24 50 7 38 7 28 L7 12 Z"
            fill="hsl(199 89% 48% / 0.1)"
          />
          {/* Data bars - staggered widths for visual interest */}
          <rect x="12" y="16" width="24" height="4" rx="1" fill="hsl(199 89% 48%)" />
          <rect x="12" y="24" width="18" height="4" rx="1" fill="hsl(217 91% 60%)" />
          <rect x="12" y="32" width="21" height="4" rx="1" fill="hsl(199 89% 48%)" />
          <rect x="12" y="40" width="14" height="4" rx="1" fill="hsl(217 91% 60%)" />
        </svg>
      </div>

      {/* Wordmark */}
      {showText && (
        <div
          className={`font-black tracking-[0.15em] ${sizes[size].text}`}
          style={{ fontFamily: "'Inter', 'SF Pro Display', system-ui, sans-serif" }}
        >
          <span className="text-foreground">E</span>
          <span className="text-primary">I</span>
          <span className="text-foreground">DS</span>
        </div>
      )}
    </div>
  );
}

// Icon-only variant for favicon/small spaces
export function EIDSIcon({ className = "w-8 h-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 56" className={className}>
      <path
        d="M24 2 L44 10 L44 28 C44 40 24 54 24 54 C24 54 4 40 4 28 L4 10 Z"
        fill="none"
        stroke="hsl(199 89% 48%)"
        strokeWidth="2.5"
      />
      <path
        d="M24 5 L41 12 L41 28 C41 38 24 50 24 50 C24 50 7 38 7 28 L7 12 Z"
        fill="hsl(199 89% 48% / 0.1)"
      />
      <rect x="12" y="16" width="24" height="4" rx="1" fill="hsl(199 89% 48%)" />
      <rect x="12" y="24" width="18" height="4" rx="1" fill="hsl(217 91% 60%)" />
      <rect x="12" y="32" width="21" height="4" rx="1" fill="hsl(199 89% 48%)" />
      <rect x="12" y="40" width="14" height="4" rx="1" fill="hsl(217 91% 60%)" />
    </svg>
  );
}
