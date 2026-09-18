import { create } from "zustand";
import { translations, Lang, DEFAULT_LANG, TextValue, pickText, Dict } from "@/config/i18n";

const STORAGE_KEY = "navi_portfolio_lang";

function resolveInitialLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY) as Lang | null;
    if (saved === "zh" || saved === "en") return saved;
  } catch {}
  if (typeof navigator !== "undefined" && navigator.language?.startsWith("zh")) return "zh";
  return DEFAULT_LANG;
}

interface LangState {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
}

export const useLangStore = create<LangState>((set) => ({
  lang: resolveInitialLang(),
  setLang: (lang) => {
    set({ lang });
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {}
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  },
  toggle: () => {
    set((state) => {
      const lang = state.lang === "zh" ? "en" : "zh";
      try {
        localStorage.setItem(STORAGE_KEY, lang);
      } catch {}
      document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
      return { lang };
    });
  },
}));

// 初始化时同步 html.lang
document.documentElement.lang = useLangStore.getState().lang === "zh" ? "zh-CN" : "en";

export function useI18n() {
  const lang = useLangStore((s) => s.lang);
  const setLang = useLangStore((s) => s.setLang);
  const toggle = useLangStore((s) => s.toggle);

  const t: Dict = translations[lang];
  const pick = (v: TextValue | undefined, fallback = ""): string => pickText(v, lang, fallback);

  return {
    lang,
    setLang,
    toggle,
    t,
    pick,
    isZh: lang === "zh",
  };
}
