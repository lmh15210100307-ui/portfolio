import { useState } from "react";
import { useAdminStore } from "@/store/admin";
import { Save, Plus, Trash2 } from "lucide-react";
import { useI18n } from "@/hooks/useI18n";
import { TextValue } from "@/config/i18n";

function TextInputZhEn({
  value,
  onChange,
  label,
  rows,
}: {
  value: TextValue | undefined;
  onChange: (v: TextValue) => void;
  label: string;
  rows?: number;
}) {
  const vZh: string = value && typeof value === "object" ? value.zh : (value as string) || "";
  const vEn: string = value && typeof value === "object" ? value.en : (value as string) || "";
  const inputCls =
    "w-full rounded-button border border-border bg-background px-3 py-2 text-sm focus:border-accent focus:outline-none";

  const renderZh = rows && rows > 1 ? (
    <textarea rows={rows} className={inputCls + " resize-none"} value={vZh} onChange={(e) => onChange({ zh: e.target.value, en: vEn })} />
  ) : (
    <input className={inputCls} value={vZh} onChange={(e) => onChange({ zh: e.target.value, en: vEn })} />
  );
  const renderEn = rows && rows > 1 ? (
    <textarea rows={rows} className={inputCls + " resize-none"} value={vEn} onChange={(e) => onChange({ zh: vZh, en: e.target.value })} />
  ) : (
    <input className={inputCls} value={vEn} onChange={(e) => onChange({ zh: vZh, en: e.target.value })} />
  );

  return (
    <div>
      <label className="block font-mono text-[10px] uppercase tracking-wider text-foreground-subtle mb-1.5">
        {label}
      </label>
      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-1">
          <span className="text-[10px] font-mono text-foreground-subtle uppercase">zh</span>
          {renderZh}
        </div>
        <div className="space-y-1">
          <span className="text-[10px] font-mono text-foreground-subtle uppercase">en</span>
          {renderEn}
        </div>
      </div>
    </div>
  );
}

function toStrObj(v: TextValue | undefined): { zh: string; en: string } {
  if (!v) return { zh: "", en: "" };
  if (typeof v === "string") return { zh: v, en: v };
  return v;
}

export default function AdminProfile() {
  const { site, updateSite, persist } = useAdminStore();
  const { t } = useI18n();
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await persist();
    setSaving(false);
    setToast(true);
    setTimeout(() => setToast(false), 1500);
  };

  return (
    <div className="max-w-3xl space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display font-bold text-2xl">{t.admin.profileTitle}</h2>
          <p className="text-sm text-foreground-muted">{t.admin.profileSub}</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-button bg-foreground text-background px-4 py-2.5 text-sm font-medium hover:bg-accent transition-colors disabled:opacity-50"
        >
          <Save size={14} /> {saving ? t.admin.saving : t.admin.save}
        </button>
      </div>

      <section className="rounded-card border border-border bg-background-card p-6 space-y-5">
        <h3 className="font-display font-semibold text-lg border-b border-border pb-3">
          {t.admin.basic}
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <TextInputZhEn label={t.admin.name} value={site.name} onChange={(v) => updateSite({ name: v })} />
          <TextInputZhEn label={t.admin.initials} value={site.initials} onChange={(v) => updateSite({ initials: v })} />
        </div>
        <TextInputZhEn label={t.admin.titleRole} value={site.title} onChange={(v) => updateSite({ title: v })} />
        <TextInputZhEn label={t.admin.tagline} value={site.tagline} onChange={(v) => updateSite({ tagline: v })} />
        <div className="grid grid-cols-2 gap-3">
          <Input label={t.admin.location} value={site.location} onChange={(v) => updateSite({ location: v })} />
          <Input label={t.admin.email} value={site.email} onChange={(v) => updateSite({ email: v })} />
        </div>
        <TextInputZhEn label={t.admin.bio} rows={4} value={site.bio} onChange={(v) => updateSite({ bio: v })} />
        <TextInputZhEn label={t.admin.philosophy} rows={3} value={site.philosophy} onChange={(v) => updateSite({ philosophy: v })} />
        <TextInputZhEn label={t.admin.philosophyHighlight} value={site.philosophyHighlight} onChange={(v) => updateSite({ philosophyHighlight: v })} />
      </section>

      <section className="rounded-card border border-border bg-background-card p-6 space-y-5">
        <h3 className="font-display font-semibold text-lg border-b border-border pb-3">
          {t.admin.social}
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <Input label="LinkedIn" value={site.social.linkedin} onChange={(v) => updateSite({ social: { ...site.social, linkedin: v } })} />
          <Input label="Dribbble" value={site.social.dribbble} onChange={(v) => updateSite({ social: { ...site.social, dribbble: v } })} />
          <Input label="GitHub" value={site.social.github} onChange={(v) => updateSite({ social: { ...site.social, github: v } })} />
          <Input label="Twitter" value={site.social.twitter} onChange={(v) => updateSite({ social: { ...site.social, twitter: v } })} />
        </div>
      </section>

      <section className="rounded-card border border-border bg-background-card p-6 space-y-5">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <h3 className="font-display font-semibold text-lg">{t.admin.skills}</h3>
          <button
            onClick={() =>
              updateSite({
                skills: [
                  ...site.skills,
                  { category: { zh: t.admin.newGroup, en: t.admin.newGroup }, icon: "LayoutGrid", items: [] },
                ],
              })
            }
            className="text-xs text-accent flex items-center gap-1"
          >
            <Plus size={12} /> {t.admin.addGroup}
          </button>
        </div>
        {site.skills.map((s, i) => {
          const cat = toStrObj(s.category);
          return (
            <div
              key={i}
              className="rounded-button border border-border bg-background/50 p-4 space-y-3"
            >
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-foreground-subtle uppercase">zh</span>
                  <input
                    className="w-full rounded-button border border-border bg-background px-3 py-2 text-sm font-medium focus:border-accent focus:outline-none"
                    value={cat.zh}
                    onChange={(e) => {
                      const skills = [...site.skills];
                      skills[i].category = { zh: e.target.value, en: cat.en };
                      updateSite({ skills });
                    }}
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-foreground-subtle uppercase">en</span>
                  <input
                    className="w-full rounded-button border border-border bg-background px-3 py-2 text-sm font-medium focus:border-accent focus:outline-none"
                    value={cat.en}
                    onChange={(e) => {
                      const skills = [...site.skills];
                      skills[i].category = { zh: cat.zh, en: e.target.value };
                      updateSite({ skills });
                    }}
                  />
                </div>
              </div>
              <button
                onClick={() => updateSite({ skills: site.skills.filter((_, j) => j !== i) })}
                className="ml-auto text-foreground-muted hover:text-red-400 flex justify-end w-full"
              >
                <Trash2 size={16} />
              </button>
              <div className="flex flex-wrap gap-1.5">
                {s.items.map((item, j) => {
                  const iv = toStrObj(item);
                  return (
                    <div
                      key={j}
                      className="inline-flex items-center gap-1 rounded-pill border border-border px-2 py-1 text-xs bg-background"
                    >
                      <input
                        className="bg-transparent outline-none w-[70px]"
                        placeholder="zh"
                        value={iv.zh}
                        onChange={(e) => {
                          const skills = [...site.skills];
                          const items = [...skills[i].items];
                          items[j] = { zh: e.target.value, en: iv.en };
                          skills[i].items = items;
                          updateSite({ skills });
                        }}
                      />
                      <span className="text-foreground-subtle">/</span>
                      <input
                        className="bg-transparent outline-none w-[70px]"
                        placeholder="en"
                        value={iv.en}
                        onChange={(e) => {
                          const skills = [...site.skills];
                          const items = [...skills[i].items];
                          items[j] = { zh: iv.zh, en: e.target.value };
                          skills[i].items = items;
                          updateSite({ skills });
                        }}
                      />
                      <button
                        onClick={() => {
                          const skills = [...site.skills];
                          skills[i].items = skills[i].items.filter((_, k) => k !== j);
                          updateSite({ skills });
                        }}
                        className="text-foreground-muted hover:text-red-400"
                      >
                        ×
                      </button>
                    </div>
                  );
                })}
                <input
                  placeholder={t.admin.addSkillPH}
                  className="text-xs bg-transparent outline-none w-20 text-foreground-muted placeholder:text-foreground-subtle"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      const target = e.currentTarget;
                      if (target.value.trim()) {
                        const skills = [...site.skills];
                        skills[i].items.push({ zh: target.value.trim(), en: target.value.trim() });
                        updateSite({ skills });
                        target.value = "";
                      }
                    }
                  }}
                />
              </div>
            </div>
          );
        })}
      </section>

      <section className="rounded-card border border-border bg-background-card p-6 space-y-5">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <h3 className="font-display font-semibold text-lg">{t.admin.experience}</h3>
          <button
            onClick={() =>
              updateSite({
                experience: [
                  ...site.experience,
                  { year: "", role: { zh: "", en: "" }, company: { zh: "", en: "" }, desc: { zh: "", en: "" } },
                ],
              })
            }
            className="text-xs text-accent flex items-center gap-1"
          >
            <Plus size={12} /> {t.admin.addExp}
          </button>
        </div>
        {site.experience.map((exp, i) => {
          const role = toStrObj(exp.role);
          const company = toStrObj(exp.company);
          const desc = toStrObj(exp.desc);
          return (
            <div
              key={i}
              className="rounded-button border border-border bg-background/50 p-4 space-y-2"
            >
              <div className="flex gap-2 items-center">
                <input
                  className="w-32 rounded-button border border-border bg-background px-3 py-2 text-sm font-mono focus:border-accent focus:outline-none"
                  placeholder={t.admin.yearPH}
                  value={exp.year}
                  onChange={(e) => {
                    const arr = [...site.experience];
                    arr[i].year = e.target.value;
                    updateSite({ experience: arr });
                  }}
                />
                <button
                  onClick={() => updateSite({ experience: site.experience.filter((_, j) => j !== i) })}
                  className="ml-auto text-foreground-muted hover:text-red-400"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-foreground-subtle uppercase">role zh</span>
                  <input
                    className="w-full rounded-button border border-border bg-background px-3 py-2 text-sm font-medium focus:border-accent focus:outline-none"
                    placeholder={t.admin.rolePH}
                    value={role.zh}
                    onChange={(e) => {
                      const arr = [...site.experience];
                      arr[i].role = { zh: e.target.value, en: role.en };
                      updateSite({ experience: arr });
                    }}
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-foreground-subtle uppercase">role en</span>
                  <input
                    className="w-full rounded-button border border-border bg-background px-3 py-2 text-sm font-medium focus:border-accent focus:outline-none"
                    value={role.en}
                    onChange={(e) => {
                      const arr = [...site.experience];
                      arr[i].role = { zh: role.zh, en: e.target.value };
                      updateSite({ experience: arr });
                    }}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-foreground-subtle uppercase">company zh</span>
                  <input
                    className="w-full rounded-button border border-border bg-background px-3 py-2 text-sm focus:border-accent focus:outline-none"
                    placeholder={t.admin.companyPH}
                    value={company.zh}
                    onChange={(e) => {
                      const arr = [...site.experience];
                      arr[i].company = { zh: e.target.value, en: company.en };
                      updateSite({ experience: arr });
                    }}
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-foreground-subtle uppercase">company en</span>
                  <input
                    className="w-full rounded-button border border-border bg-background px-3 py-2 text-sm focus:border-accent focus:outline-none"
                    value={company.en}
                    onChange={(e) => {
                      const arr = [...site.experience];
                      arr[i].company = { zh: company.zh, en: e.target.value };
                      updateSite({ experience: arr });
                    }}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-foreground-subtle uppercase">desc zh</span>
                  <textarea
                    rows={2}
                    className="w-full rounded-button border border-border bg-background px-3 py-2 text-sm focus:border-accent focus:outline-none resize-none"
                    placeholder={t.admin.descPH}
                    value={desc.zh}
                    onChange={(e) => {
                      const arr = [...site.experience];
                      arr[i].desc = { zh: e.target.value, en: desc.en };
                      updateSite({ experience: arr });
                    }}
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-foreground-subtle uppercase">desc en</span>
                  <textarea
                    rows={2}
                    className="w-full rounded-button border border-border bg-background px-3 py-2 text-sm focus:border-accent focus:outline-none resize-none"
                    value={desc.en}
                    onChange={(e) => {
                      const arr = [...site.experience];
                      arr[i].desc = { zh: desc.zh, en: e.target.value };
                      updateSite({ experience: arr });
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {toast && (
        <div className="fixed bottom-6 right-6 bg-accent text-background px-4 py-2 rounded-button text-sm z-50 shadow-lg">
          {t.admin.saved}
        </div>
      )}
    </div>
  );
}

function Input({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block font-mono text-[10px] uppercase tracking-wider text-foreground-subtle mb-1.5">
        {label}
      </label>
      <input
        className="w-full rounded-button border border-border bg-background-elevated px-3 py-2 text-sm focus:border-accent focus:outline-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
