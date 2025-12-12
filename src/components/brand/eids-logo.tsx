"use client";

// EIDS Logo - Enterprise Blend
// Enterprise Integrated Data System - Defense Health Agency
// Clean, professional design with subtle modern accents

interface EIDSLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  variant?: "default" | "dark"; // dark variant for login page
}

export function EIDSLogo({ size = "md", showText = true, variant = "default" }: EIDSLogoProps) {
  const sizes = {
    sm: { icon: "w-8 h-9", text: "text-lg", gap: "gap-2" },
    md: { icon: "w-10 h-11", text: "text-xl", gap: "gap-2.5" },
    lg: { icon: "w-14 h-16", text: "text-3xl", gap: "gap-3" },
    xl: { icon: "w-12 h-14", text: "text-2xl", gap: "gap-3" },
  };

  // Color schemes for different variants
  const colors = {
    default: {
      stroke: "hsl(var(--primary))",
      fill: "hsl(var(--primary) / 0.12)",
      bar1: "hsl(var(--primary))",
      bar2: "hsl(var(--accent))",
      textPrimary: "text-foreground",
      textAccent: "text-primary",
    },
    dark: {
      stroke: "#10b981", // emerald-500
      fill: "rgba(16, 185, 129, 0.12)",
      bar1: "#10b981", // emerald-500
      bar2: "#06b6d4", // cyan-500
      textPrimary: "text-white",
      textAccent: "text-emerald-400",
    },
  };

  const colorScheme = colors[variant];

  return (
    <div className={`flex items-center ${sizes[size].gap}`}>
      {/* Shield Icon with Data Bars - Clean professional look */}
      <div className="relative group">
        <svg viewBox="0 0 48 56" className={`${sizes[size].icon} relative z-10`}>
          {/* Shield outline - Primary Teal, clean stroke */}
          <path
            d="M24 2 L44 10 L44 28 C44 40 24 54 24 54 C24 54 4 40 4 28 L4 10 Z"
            fill="none"
            stroke={colorScheme.stroke}
            strokeWidth="2.5"
          />
          {/* Inner shield fill - subtle tint */}
          <path
            d="M24 5 L41 12 L41 28 C41 38 24 50 24 50 C24 50 7 38 7 28 L7 12 Z"
            fill={colorScheme.fill}
          />
          {/* Data bars - clean, professional colors */}
          <rect x="12" y="16" width="24" height="4" rx="1.5" fill={colorScheme.bar1} />
          <rect x="12" y="24" width="18" height="4" rx="1.5" fill={colorScheme.bar2} />
          <rect x="12" y="32" width="21" height="4" rx="1.5" fill={colorScheme.bar1} />
          <rect x="12" y="40" width="14" height="4" rx="1.5" fill={colorScheme.bar2} />
        </svg>
      </div>

      {/* Wordmark - Clean Inter font, professional */}
      {showText && (
        <div className={`font-semibold tracking-wide ${sizes[size].text}`}>
          <span className={colorScheme.textPrimary}>E</span>
          <span className={colorScheme.textAccent}>I</span>
          <span className={colorScheme.textPrimary}>DS</span>
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
