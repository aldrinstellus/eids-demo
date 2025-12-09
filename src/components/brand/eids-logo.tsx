"use client";

// EIDS Neo-Futuristic Logo - Cyber Brand Identity
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
      {/* Shield Icon with Data Bars - Cyber Glow */}
      <div className="relative group">
        {/* Glow effect behind icon */}
        <div className="absolute inset-0 blur-md bg-primary/30 rounded-full scale-75 group-hover:scale-100 transition-transform duration-300" />
        <svg viewBox="0 0 48 56" className={`${sizes[size].icon} relative z-10 drop-shadow-[0_0_8px_hsl(var(--primary-glow)/0.5)]`}>
          {/* Shield outline - Primary Cyan with glow */}
          <path
            d="M24 2 L44 10 L44 28 C44 40 24 54 24 54 C24 54 4 40 4 28 L4 10 Z"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="2.5"
            className="drop-shadow-[0_0_4px_hsl(var(--primary-glow))]"
          />
          {/* Inner shield fill - cyber glass effect */}
          <path
            d="M24 5 L41 12 L41 28 C41 38 24 50 24 50 C24 50 7 38 7 28 L7 12 Z"
            fill="hsl(var(--primary) / 0.15)"
          />
          {/* Data bars - staggered widths with glow */}
          <rect x="12" y="16" width="24" height="4" rx="1" fill="hsl(var(--primary))" />
          <rect x="12" y="24" width="18" height="4" rx="1" fill="hsl(var(--accent-cyber))" />
          <rect x="12" y="32" width="21" height="4" rx="1" fill="hsl(var(--primary))" />
          <rect x="12" y="40" width="14" height="4" rx="1" fill="hsl(var(--accent-cyber))" />
        </svg>
      </div>

      {/* Wordmark - Orbitron Display Font with Neon Effect */}
      {showText && (
        <div
          className={`font-display font-bold tracking-[0.2em] ${sizes[size].text} neon-text`}
        >
          <span className="text-foreground drop-shadow-[0_0_10px_hsl(var(--foreground)/0.3)]">E</span>
          <span className="text-primary drop-shadow-[0_0_12px_hsl(var(--primary-glow)/0.8)]">I</span>
          <span className="text-foreground drop-shadow-[0_0_10px_hsl(var(--foreground)/0.3)]">DS</span>
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
