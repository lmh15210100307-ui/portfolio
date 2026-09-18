import { useState, useEffect } from "react";
import { translations, Lang, Dict, DEFAULT_LANG, TextValue, pickText } from "@/config/i18n";

const STORAGE_KEY = "navi_portfolio_lang";

function resolveInitialLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY) as Lang | null;
    if (saved === "zh" || saved === "en") return saved;
  } catch {}
  if (typeof navigator !== "undefined" && navigator.language?.startsWith("zh")) return "zh";
  return DEFAULT_LANG;
}

export function useI18n() {
  const [lang, setLang] = useState<Lang>(resolveInitialLang);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {}
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  }, [lang]);

  const t: Dict = translations[lang];
  const pick = (v: TextValue | undefined, fallback = ""): string => pickText(v, lang, fallback);

  return {
    lang,
    setLang,
    toggle: () => setLang((l) => (l === "zh" ? "en" : "zh")),
    t,
    pick,
    isZh: lang === "zh",
  };
}
