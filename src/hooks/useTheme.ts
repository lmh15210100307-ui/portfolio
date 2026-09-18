import { create } from "zustand";
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

interface ThemeState {
  mode: ThemeMode;
  setMode: (m: ThemeMode) => void;
  toggle: () => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  mode: resolveInitialTheme(),
  setMode: (mode) => {
    applyTheme(mode);
    try {
      localStorage.setItem(STORAGE_KEY, mode);
    } catch {}
    set({ mode });
  },
  toggle: () => {
    set((state) => {
      const mode = state.mode === "dark" ? "light" : "dark";
      applyTheme(mode);
      try {
        localStorage.setItem(STORAGE_KEY, mode);
      } catch {}
      return { mode };
    });
  },
}));

// 初始化时应用主题（在 React 渲染前）
applyTheme(useThemeStore.getState().mode);

export function useTheme() {
  const mode = useThemeStore((s) => s.mode);
  const setMode = useThemeStore((s) => s.setMode);
  const toggle = useThemeStore((s) => s.toggle);

  return {
    mode,
    setMode,
    toggle,
    isDark: mode === "dark",
  };
}
