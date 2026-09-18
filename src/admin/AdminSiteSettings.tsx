import { useAdminStore } from "@/store/admin";
import { useI18n } from "@/hooks/useI18n";
import { Palette, Eye, EyeOff, Search, Share2, Type, Check } from "lucide-react";
import { useState } from "react";

function presetsEqual(a: { accent: string; bg: string }, b: { accent: string; bg: string }) {
  return a.accent.toLowerCase() === b.accent.toLowerCase() && a.bg.toLowerCase() === b.bg.toLowerCase();
}

function applyThemePreset(accent: string, bg: string) {
  const root = document.documentElement;
  root.style.setProperty("--accent", accent);
  root.style.setProperty("--accent-hover", accent);
  root.style.setProperty("--background", bg);
  root.style.setProperty("--background-card", "#141B2D");
  root.style.setProperty("--background-elevated", "#1E2740");
  root.style.setProperty("--foreground", "#F0F2F8");
  root.style.setProperty("--foreground-muted", "#7B85A0");
  root.style.setProperty("--foreground-subtle", "#3D4560");
  root.style.setProperty("--border", "#222C44");
  root.style.setProperty("--border-light", "#2E3A58");
  root.style.setProperty("--glow", accent + "26");
  try {
    localStorage.setItem("navi_portfolio_theme_override", JSON.stringify({ accent, bg }));
  } catch {}
}

export default function AdminSiteSettings() {
  const { t, pick, isZh } = useI18n();
  const site = useAdminStore((s) => s.site);
  const updateSite = useAdminStore((s) => s.updateSite);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 1600);
  };

  const presets = t.adminSiteSettings.themePresets;

  const currentAccent = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim();
  const currentBg = getComputedStyle(document.documentElement).getPropertyValue("--background").trim();
  const currentPreset = presets.find((p) => presetsEqual({ accent: p.accent, bg: p.bg }, { accent: currentAccent || "#6C8CFF", bg: currentBg || "#0A0E1A" }));

  const setNav = (key: "home" | "work" | "about" | "contact", v: boolean) => {
    updateSite({ navVisibility: { ...site.navVisibility, [key]: v } });
  };

  const setSeo = (key: "title" | "description", lang: "zh" | "en", v: string) => {
    const cur = { ...site.seo };
    const curVal = cur[key];
    const next = typeof curVal === "string" ? { zh: curVal, en: curVal } : { ...curVal };
    next[lang] = v;
    cur[key] = next;
    updateSite({ seo: cur });
  };

  const socialKeys = ["linkedin", "dribbble", "github", "twitter"] as const;

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-2">
          {t.adminSiteSettings.title}
        </p>
        <h2 className="font-display font-bold text-2xl md:text-3xl">{t.adminSiteSettings.subtitle}</h2>
      </div>

      <section>
        <div className="flex items-center gap-2 mb-3">
          <Palette size={16} className="text-accent" />
          <h3 className="font-display font-semibold text-lg">{t.adminSiteSettings.themeColor}</h3>
        </div>
        <p className="text-xs text-foreground-muted mb-4">{t.adminSiteSettings.themeColorHint}</p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {presets.map((p) => {
            const active = currentPreset?.key === p.key;
            return (
              <button
                key={p.key}
                onClick={() => {
                  applyThemePreset(p.accent, p.bg);
                  showToast(`Applied ${p.name}`);
                }}
                className={`group relative rounded-card border p-3 text-left transition-all ${active ? "border-accent" : "border-border hover:border-border-light"}`}
                style={{ background: `linear-gradient(135deg, ${p.bg}, ${p.accent}15)` }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="w-6 h-6 rounded-full ring-2 ring-white/10"
                    style={{ background: p.accent }}
                  />
                  <div
                    className="flex-1 h-6 rounded-button overflow-hidden"
                    style={{ background: p.bg }}
                  />
                </div>
                <div className="text-sm font-medium">{p.name}</div>
                <div className="font-mono text-[10px] text-foreground-muted">{p.key}</div>
                {active && (
                  <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-accent flex items-center justify-center">
                    <Check size={12} className="text-white" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </section>

      <section>
        <div className="flex items-center gap-2 mb-3">
          <Eye size={16} className="text-accent" />
          <h3 className="font-display font-semibold text-lg">{t.adminSiteSettings.navVisibility}</h3>
        </div>
        <p className="text-xs text-foreground-muted mb-4">{t.adminSiteSettings.navVisibilityHint}</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {(["home", "work", "about", "contact"] as const).map((key) => {
            const on = site.navVisibility[key];
            return (
              <button
                key={key}
                onClick={() => setNav(key, !on)}
                className={`flex items-center justify-between rounded-button border px-4 py-3 text-sm transition-all ${
                  on ? "border-accent/30 bg-accent/5 text-foreground" : "border-border text-foreground-muted"
                }`}
              >
                <span className="font-medium">{t.nav[key]}</span>
                {on ? <Eye size={14} /> : <EyeOff size={14} />}
              </button>
            );
          })}
        </div>
      </section>

      <section>
        <div className="flex items-center gap-2 mb-3">
          <Type size={16} className="text-accent" />
          <h3 className="font-display font-semibold text-lg">{t.adminSiteSettings.tagline}</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input
            className="rounded-button border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:border-accent"
            placeholder={t.adminSiteSettings.taglinePH}
            value={typeof site.tagline === "string" ? site.tagline : site.tagline.zh}
            onChange={(e) => {
              const cur = typeof site.tagline === "string" ? { zh: site.tagline, en: site.tagline } : { ...site.tagline };
              cur.zh = e.target.value;
              updateSite({ tagline: cur });
            }}
          />
          <input
            className="rounded-button border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:border-accent"
            placeholder={t.adminSiteSettings.taglinePH}
            value={typeof site.tagline === "string" ? site.tagline : site.tagline.en}
            onChange={(e) => {
              const cur = typeof site.tagline === "string" ? { zh: site.tagline, en: site.tagline } : { ...site.tagline };
              cur.en = e.target.value;
              updateSite({ tagline: cur });
            }}
          />
        </div>
      </section>

      <section>
        <div className="flex items-center gap-2 mb-3">
          <Search size={16} className="text-accent" />
          <h3 className="font-display font-semibold text-lg">{t.adminSiteSettings.seo}</h3>
        </div>
        <div className="rounded-card border border-border bg-background-card p-5 space-y-4">
          <div>
            <label className="block text-xs text-foreground-muted mb-1.5">{t.adminSiteSettings.seoTitle} (ZH)</label>
            <input
              className="w-full rounded-button border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:border-accent"
              placeholder={t.adminSiteSettings.seoTitlePH}
              value={typeof site.seo.title === "string" ? site.seo.title : site.seo.title.zh}
              onChange={(e) => setSeo("title", "zh", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs text-foreground-muted mb-1.5">{t.adminSiteSettings.seoTitle} (EN)</label>
            <input
              className="w-full rounded-button border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:border-accent"
              placeholder={t.adminSiteSettings.seoTitlePH}
              value={typeof site.seo.title === "string" ? site.seo.title : site.seo.title.en}
              onChange={(e) => setSeo("title", "en", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs text-foreground-muted mb-1.5">{t.adminSiteSettings.seoDesc} (ZH)</label>
            <textarea
              rows={2}
              className="w-full rounded-button border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:border-accent resize-none"
              placeholder={t.adminSiteSettings.seoDescPH}
              value={typeof site.seo.description === "string" ? site.seo.description : site.seo.description.zh}
              onChange={(e) => setSeo("description", "zh", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs text-foreground-muted mb-1.5">{t.adminSiteSettings.seoDesc} (EN)</label>
            <textarea
              rows={2}
              className="w-full rounded-button border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:border-accent resize-none"
              placeholder={t.adminSiteSettings.seoDescPH}
              value={typeof site.seo.description === "string" ? site.seo.description : site.seo.description.en}
              onChange={(e) => setSeo("description", "en", e.target.value)}
            />
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-center gap-2 mb-3">
          <Share2 size={16} className="text-accent" />
          <h3 className="font-display font-semibold text-lg">{t.adminSiteSettings.social}</h3>
        </div>
        <div className="rounded-card border border-border bg-background-card p-5 space-y-3">
          {socialKeys.map((k) => (
            <div key={k} className="grid grid-cols-[100px_1fr] items-center gap-3">
              <span className="font-mono text-xs text-foreground-muted">{k}</span>
              <input
                className="rounded-button border border-border bg-background px-3 py-2 text-sm font-mono focus:outline-none focus:border-accent"
                placeholder={`https://...`}
                value={site.social[k]}
                onChange={(e) => updateSite({ social: { ...site.social, [k]: e.target.value } })}
              />
            </div>
          ))}
        </div>
      </section>

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-background-card border border-border px-4 py-2 rounded-button text-sm z-50 shadow-xl">
          {toast}
        </div>
      )}

      {isZh ? null : null}
      {pick(site.name) ? null : null}
    </div>
  );
}
