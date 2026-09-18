import { useState, useEffect } from "react";
import { ThemeMode, applyTheme } from "@/config/themes";

const STORAGE_KEY = "navi_portfolio_theme";

function resolveInitialTheme(): ThemeMode {
  try {
    const saved = localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
    if (saved === "dark" || saved === "light") return saved;
  } catch {}
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function useTheme() {
  const [mode, setMode] = useState<ThemeMode>(resolveInitialTheme);

  useEffect(() => {
    applyTheme(mode);
    try {
      localStorage.setItem(STORAGE_KEY, mode);
    } catch {}
  }, [mode]);

  return {
    mode,
    setMode,
    toggle: () => setMode((m) => (m === "dark" ? "light" : "dark")),
    isDark: mode === "dark",
  };
}
