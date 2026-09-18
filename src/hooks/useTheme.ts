import { useState, useEffect } from "react";
import { THEMES, DEFAULT_THEME, getTheme, Theme } from "@/config/themes";

const STORAGE_KEY = "navi_portfolio_theme";

function resolveInitialTheme(): string {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && THEMES.some((t) => t.id === saved)) return saved;
  } catch {}
  return DEFAULT_THEME;
}

function applyTheme(id: string) {
  const theme = getTheme(id);
  const root = document.documentElement;
  root.setAttribute("data-theme", id);
  if (theme.mode === "light") {
    root.classList.remove("dark");
    root.classList.add("light");
  } else {
    root.classList.remove("light");
    root.classList.add("dark");
  }
  Object.entries(theme.colors).forEach(([key, val]) => {
    root.style.setProperty(key, val);
  });
}

export function useTheme() {
  const [themeId, setThemeId] = useState<string>(resolveInitialTheme);

  useEffect(() => {
    applyTheme(themeId);
    try {
      localStorage.setItem(STORAGE_KEY, themeId);
    } catch {}
  }, [themeId]);

  const theme: Theme = getTheme(themeId);

  return {
    themeId,
    theme,
    setTheme: setThemeId,
    themes: THEMES,
    isDark: theme.mode === "dark",
  };
}
