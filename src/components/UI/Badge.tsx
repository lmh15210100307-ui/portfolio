import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "accent" | "outline";
  size?: "sm" | "md";
}

export default function Badge({
  children,
  variant = "default",
  size = "sm",
}: BadgeProps) {
  const base =
    "inline-flex items-center rounded-pill font-medium transition-colors";

  const sizes = {
    sm: "text-xs px-2.5 py-1",
    md: "text-sm px-3 py-1.5",
  };

  const variants = {
    default: "bg-background-elevated text-foreground-muted border border-border",
    accent:
      "bg-accent/10 text-accent border border-accent/30",
    outline: "border border-border text-foreground-muted hover:text-foreground hover:border-border-light",
  };

  return (
    <span className={`${base} ${sizes[size]} ${variants[variant]}`}>
      {children}
    </span>
  );
}
