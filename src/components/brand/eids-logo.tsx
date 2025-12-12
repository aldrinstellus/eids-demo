"use client";

// EIDS Logo - Official DHS-Style Seal
// Enterprise Integrated Data System - Defense Health Agency
// Accurate DHS seal design: spread-wing eagle, shield, olive branch, arrows

interface EIDSLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  variant?: "default" | "dark"; // dark variant for login page
}

export function EIDSLogo({ size = "md", showText = true, variant = "default" }: EIDSLogoProps) {
  const sizes = {
    sm: { icon: "w-8 h-8", text: "text-lg", gap: "gap-2" },
    md: { icon: "w-10 h-10", text: "text-xl", gap: "gap-2.5" },
    lg: { icon: "w-14 h-14", text: "text-3xl", gap: "gap-3" },
    xl: { icon: "w-12 h-12", text: "text-2xl", gap: "gap-3" },
  };

  // Color schemes for different variants
  const colors = {
    default: {
      stroke: "hsl(var(--primary))",
      fill: "hsl(var(--primary) / 0.08)",
      eagle: "hsl(var(--primary))",
      shield: "hsl(var(--primary))",
      accent: "hsl(var(--primary) / 0.6)",
      textPrimary: "text-foreground",
      textAccent: "text-primary",
    },
    dark: {
      stroke: "#10b981", // emerald-500
      fill: "rgba(16, 185, 129, 0.08)",
      eagle: "#10b981", // emerald-500
      shield: "#10b981",
      accent: "rgba(16, 185, 129, 0.6)",
      textPrimary: "text-white",
      textAccent: "text-emerald-400",
    },
  };

  const colorScheme = colors[variant];

  return (
    <div className={`flex items-center ${sizes[size].gap}`}>
      {/* Official DHS-Style Seal */}
      <div className="relative group">
        <svg viewBox="0 0 48 48" className={`${sizes[size].icon} relative z-10`}>
          {/* Outer circle - Seal border */}
          <circle
            cx="24"
            cy="24"
            r="22"
            fill="none"
            stroke={colorScheme.stroke}
            strokeWidth="1.5"
          />
          {/* Inner circle - Background */}
          <circle
            cx="24"
            cy="24"
            r="20"
            fill={colorScheme.fill}
          />

          {/* Eagle - Spread wings, DHS style */}
          <g fill={colorScheme.eagle}>
            {/* Left wing - spread feathers */}
            <path d="M24 18 L20 16 L16 15 L12 16 L9 19 L11 20 L14 19 L17 19 L20 20 L24 22" />
            {/* Right wing - spread feathers */}
            <path d="M24 18 L28 16 L32 15 L36 16 L39 19 L37 20 L34 19 L31 19 L28 20 L24 22" />
            {/* Eagle body */}
            <ellipse cx="24" cy="24" rx="5" ry="7" />
            {/* Eagle head */}
            <circle cx="24" cy="15" r="3.5" />
            {/* Beak - pointing right */}
            <path d="M27 15 L30 15.5 L27 16.5 Z" />
            {/* Tail feathers */}
            <path d="M21 30 L24 35 L27 30 L24 31 Z" />
          </g>

          {/* Shield on eagle's chest */}
          <g>
            <path
              d="M21 21 L21 28 Q24 31 27 28 L27 21 Z"
              fill={colorScheme.fill}
              stroke={colorScheme.shield}
              strokeWidth="0.8"
            />
            {/* Vertical stripes on shield */}
            <line x1="23" y1="21" x2="23" y2="28" stroke={colorScheme.accent} strokeWidth="0.5" />
            <line x1="25" y1="21" x2="25" y2="28" stroke={colorScheme.accent} strokeWidth="0.5" />
          </g>

          {/* Olive branch - left talon */}
          <g stroke={colorScheme.eagle} strokeWidth="0.6" fill="none">
            <path d="M18 32 Q15 34 13 33" />
            <ellipse cx="14" cy="32" rx="1.5" ry="0.8" fill={colorScheme.eagle} />
            <ellipse cx="16" cy="33" rx="1.5" ry="0.8" fill={colorScheme.eagle} />
            <ellipse cx="13" cy="34" rx="1.5" ry="0.8" fill={colorScheme.eagle} />
          </g>

          {/* Arrows - right talon */}
          <g stroke={colorScheme.eagle} strokeWidth="0.6">
            <line x1="30" y1="32" x2="35" y2="35" />
            <line x1="31" y1="33" x2="36" y2="34" />
            <line x1="30" y1="34" x2="34" y2="36" />
            {/* Arrow heads */}
            <path d="M35 35 L36 34 L35 33" fill="none" />
            <path d="M36 34 L37 33.5 L36 32.5" fill="none" />
            <path d="M34 36 L35 35 L34 34" fill="none" />
          </g>

          {/* Stars around seal - 8 stars for decoration */}
          <g fill={colorScheme.stroke}>
            <circle cx="24" cy="5" r="1" />
            <circle cx="10" cy="12" r="0.8" />
            <circle cx="38" cy="12" r="0.8" />
            <circle cx="6" cy="24" r="0.8" />
            <circle cx="42" cy="24" r="0.8" />
            <circle cx="10" cy="36" r="0.8" />
            <circle cx="38" cy="36" r="0.8" />
            <circle cx="24" cy="43" r="1" />
          </g>
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
export function EIDSIcon({ className = "w-8 h-8" }: { className?: string }) {
  const color = "#10b981"; // emerald-500
  const fillBg = "rgba(16, 185, 129, 0.08)";
  const accent = "rgba(16, 185, 129, 0.6)";

  return (
    <svg viewBox="0 0 48 48" className={className}>
      {/* Outer circle - Seal border */}
      <circle cx="24" cy="24" r="22" fill="none" stroke={color} strokeWidth="1.5" />
      {/* Inner circle - Background */}
      <circle cx="24" cy="24" r="20" fill={fillBg} />

      {/* Eagle - Spread wings, DHS style */}
      <g fill={color}>
        {/* Left wing */}
        <path d="M24 18 L20 16 L16 15 L12 16 L9 19 L11 20 L14 19 L17 19 L20 20 L24 22" />
        {/* Right wing */}
        <path d="M24 18 L28 16 L32 15 L36 16 L39 19 L37 20 L34 19 L31 19 L28 20 L24 22" />
        {/* Body */}
        <ellipse cx="24" cy="24" rx="5" ry="7" />
        {/* Head */}
        <circle cx="24" cy="15" r="3.5" />
        {/* Beak */}
        <path d="M27 15 L30 15.5 L27 16.5 Z" />
        {/* Tail */}
        <path d="M21 30 L24 35 L27 30 L24 31 Z" />
      </g>

      {/* Shield on chest */}
      <g>
        <path d="M21 21 L21 28 Q24 31 27 28 L27 21 Z" fill={fillBg} stroke={color} strokeWidth="0.8" />
        <line x1="23" y1="21" x2="23" y2="28" stroke={accent} strokeWidth="0.5" />
        <line x1="25" y1="21" x2="25" y2="28" stroke={accent} strokeWidth="0.5" />
      </g>

      {/* Olive branch - left */}
      <g stroke={color} strokeWidth="0.6" fill="none">
        <path d="M18 32 Q15 34 13 33" />
        <ellipse cx="14" cy="32" rx="1.5" ry="0.8" fill={color} />
        <ellipse cx="16" cy="33" rx="1.5" ry="0.8" fill={color} />
        <ellipse cx="13" cy="34" rx="1.5" ry="0.8" fill={color} />
      </g>

      {/* Arrows - right */}
      <g stroke={color} strokeWidth="0.6">
        <line x1="30" y1="32" x2="35" y2="35" />
        <line x1="31" y1="33" x2="36" y2="34" />
        <line x1="30" y1="34" x2="34" y2="36" />
        <path d="M35 35 L36 34 L35 33" fill="none" />
        <path d="M36 34 L37 33.5 L36 32.5" fill="none" />
        <path d="M34 36 L35 35 L34 34" fill="none" />
      </g>

      {/* Stars around seal */}
      <g fill={color}>
        <circle cx="24" cy="5" r="1" />
        <circle cx="10" cy="12" r="0.8" />
        <circle cx="38" cy="12" r="0.8" />
        <circle cx="6" cy="24" r="0.8" />
        <circle cx="42" cy="24" r="0.8" />
        <circle cx="10" cy="36" r="0.8" />
        <circle cx="38" cy="36" r="0.8" />
        <circle cx="24" cy="43" r="1" />
      </g>
    </svg>
  );
}
