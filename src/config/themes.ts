export type ThemeMode = "dark" | "light";

interface ThemeColors {
  "--background": string;
  "--background-card": string;
  "--background-elevated": string;
  "--foreground": string;
  "--foreground-muted": string;
  "--foreground-subtle": string;
  "--accent": string;
  "--accent-hover": string;
  "--border": string;
  "--border-light": string;
  "--selection-bg": string;
  "--scrollbar-thumb": string;
  "--scrollbar-track": string;
  "--glow": string;
  "--mask-opacity": string;
}

const dark: ThemeColors = {
  "--background": "#0A0E1A",
  "--background-card": "#141B2D",
  "--background-elevated": "#1E2740",
  "--foreground": "#F0F2F8",
  "--foreground-muted": "#7B85A0",
  "--foreground-subtle": "#3D4560",
  "--accent": "#6C8CFF",
  "--accent-hover": "#8FA8FF",
  "--border": "#222C44",
  "--border-light": "#2E3A58",
  "--selection-bg": "#6C8CFF",
  "--scrollbar-thumb": "#222C44",
  "--scrollbar-track": "#0A0E1A",
  "--glow": "rgba(108, 140, 255, 0.15)",
  "--mask-opacity": "0.04",
};

const light: ThemeColors = {
  "--background": "#F7F7F8",
  "--background-card": "#FFFFFF",
  "--background-elevated": "#FFFFFF",
  "--foreground": "#0D0D12",
  "--foreground-muted": "#6B6B72",
  "--foreground-subtle": "#C4C4CA",
  "--accent": "#2563EB",
  "--accent-hover": "#3B82F6",
  "--border": "#E5E5EA",
  "--border-light": "#D1D1D6",
  "--selection-bg": "#2563EB",
  "--scrollbar-thumb": "#D1D1D6",
  "--scrollbar-track": "#F7F7F8",
  "--glow": "rgba(37, 99, 235, 0.10)",
  "--mask-opacity": "0.06",
};

export const THEMES: Record<ThemeMode, ThemeColors> = { dark, light };

export function applyTheme(mode: ThemeMode) {
  const colors = THEMES[mode];
  const root = document.documentElement;
  root.classList.remove("dark", "light");
  root.classList.add(mode);
  Object.entries(colors).forEach(([k, v]) => root.style.setProperty(k, v));
}
