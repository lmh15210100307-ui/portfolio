import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, X, ImageIcon, Figma } from "lucide-react";
import { useAdminStore } from "@/store/admin";
import { categories, Project } from "@/data/projects";
import { readFileAsDataURL, slugify } from "@/utils/upload";
import { parseFigmaUrl, isValidFigmaUrl } from "@/utils/figma";
import {
  fetchFigmaFile,
  fetchFigmaImages,
  proxyImageToDataUrl,
  type FigmaFrame,
} from "@/utils/figmaApi";
import { useI18n } from "@/hooks/useI18n";
import { TextValue, pickText } from "@/config/i18n";

const emptyText: TextValue = { zh: "", en: "" };

const emptyProject: Project = {
  slug: "",
  title: { ...emptyText },
  subtitle: { ...emptyText },
  category: "AI 产品",
  year: new Date().getFullYear(),
  role: { ...emptyText },
  client: { ...emptyText },
  cover: "",
  coverGradient: "from-blue-600/20 via-purple-600/20 to-pink-600/20",
  summary: { ...emptyText },
  highlights: [],
  metrics: [],
  featured: false,
  challenge: { ...emptyText },
  process: [],
  outcome: { ...emptyText },
  roleDetail: { ...emptyText },
  tools: [],
  teamSize: "",
  duration: "",
};

function TextInputZhEn({
  value,
  onChange,
  label,
  placeholderZh,
  placeholderEn,
  rows,
}: {
  value: TextValue | undefined;
  onChange: (v: TextValue) => void;
  label?: string;
  placeholderZh?: string;
  placeholderEn?: string;
  rows?: number;
}) {
  const vObj: { zh: string; en: string } =
    value && typeof value === "object"
      ? value
      : { zh: (value as string) || "", en: (value as string) || "" };
  const inputCls =
    "w-full rounded-button border border-border bg-background-elevated px-3 py-2 text-sm focus:border-accent focus:outline-none";
  const handleZh = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    onChange({ zh: e.target.value, en: vObj.en });
  const handleEn = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    onChange({ zh: vObj.zh, en: e.target.value });
  const wrap = "space-y-1.5";
  const hintZh = (
    <span className="text-[10px] font-mono text-foreground-subtle uppercase">zh</span>
  );
  const hintEn = (
    <span className="text-[10px] font-mono text-foreground-subtle uppercase">en</span>
  );

  const renderZh = rows && rows > 1 ? (
    <div className={wrap}>
      {hintZh}
      <textarea rows={rows} className={inputCls + " resize-none"} value={vObj.zh} onChange={handleZh} placeholder={placeholderZh} />
    </div>
  ) : (
    <div className={wrap}>
      {hintZh}
      <input className={inputCls} value={vObj.zh} onChange={handleZh} placeholder={placeholderZh} />
    </div>
  );
  const renderEn = rows && rows > 1 ? (
    <div className={wrap}>
      {hintEn}
      <textarea rows={rows} className={inputCls + " resize-none"} value={vObj.en} onChange={handleEn} placeholder={placeholderEn} />
    </div>
  ) : (
    <div className={wrap}>
      {hintEn}
      <input className={inputCls} value={vObj.en} onChange={handleEn} placeholder={placeholderEn} />
    </div>
  );

  return (
    <div>
      {label && (
        <label className="block font-mono text-[10px] uppercase tracking-wider text-foreground-subtle mb-1.5">
          {label}
        </label>
      )}
      <div className="grid grid-cols-2 gap-2">{renderZh}{renderEn}</div>
    </div>
  );
}

export default function AdminProjects() {
  const { projects, addProject, deleteProject, persist } = useAdminStore();
  const { t, pick } = useI18n();
  const [editing, setEditing] = useState<Project | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleNew = () => {
    setEditing({ ...emptyProject });
    setShowForm(true);
  };

  const handleEdit = (p: Project) => {
    setEditing({ ...p });
    setShowForm(true);
  };

  const handleDelete = async (slug: string) => {
    if (!confirm(t.adminProjects.confirmDelete)) return;
    deleteProject(slug);
    await persist();
  };

  const handleSave = async (p: Project) => {
    if (!p.slug) p.slug = slugify(pick(p.title as TextValue) || "untitled");
    const exists = projects.find((x) => x.slug === p.slug);
    if (exists && editing?.slug !== p.slug) {
      alert(t.adminProjects.slugExists);
      return;
    }
    if (!editing?.slug) {
      addProject(p);
    }
    await persist();
    setShowForm(false);
    setEditing(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-display font-bold text-2xl">{t.adminProjects.title}</h2>
          <p className="text-sm text-foreground-muted">{t.adminProjects.subtitle}</p>
        </div>
        <button
          onClick={handleNew}
          className="inline-flex items-center gap-2 rounded-button bg-accent hover:bg-accent-hover text-background px-4 py-2.5 text-sm font-medium transition-colors"
        >
          <Plus size={16} /> {t.adminProjects.newProject}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {projects.map((p) => (
          <div
            key={p.slug}
            className="rounded-card border border-border bg-background-card overflow-hidden"
          >
            <div
              className={`relative h-40 bg-gradient-to-br ${p.coverGradient} flex items-center justify-center group`}
            >
              {p.cover ? (
                <img src={p.cover} alt={pick(p.title as TextValue)} className="w-full h-full object-cover" />
              ) : (
                <span className="font-display font-bold text-6xl opacity-30">
                  {pick(p.title as TextValue).charAt(0) || "?"}
                </span>
              )}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button onClick={() => handleEdit(p)} className="p-2 rounded-button bg-background border border-border hover:border-accent">
                  <Pencil size={14} />
                </button>
                <button onClick={() => handleDelete(p.slug)} className="p-2 rounded-button bg-background border border-border hover:border-red-500 text-red-400">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
            <div className="p-5">
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-xs text-foreground-subtle">
                  {p.category} · {p.year}
                </span>
                {p.featured && (
                  <span className="font-mono text-[10px] uppercase text-accent">
                    {t.adminProjects.featured}
                  </span>
                )}
              </div>
              <h3 className="font-display font-semibold text-lg mb-1">{pick(p.title as TextValue)}</h3>
              <p className="text-sm text-foreground-muted line-clamp-2">{pick(p.summary as TextValue)}</p>
            </div>
          </div>
        ))}

        {projects.length === 0 && (
          <div className="col-span-full rounded-card border border-dashed border-border p-12 text-center text-foreground-muted">
            <ImageIcon size={32} className="mx-auto mb-3 opacity-50" />
            <p>{t.adminProjects.emptyHint}</p>
          </div>
        )}
      </div>

      {showForm && editing && (
        <ProjectModal
          project={editing}
          onClose={() => { setShowForm(false); setEditing(null); }}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

function ProjectModal({ project, onClose, onSave }: { project: Project; onClose: () => void; onSave: (p: Project) => void; }) {
  const { t, pick } = useI18n();
  const [form, setForm] = useState<Project>(project);

  const set = <K extends keyof Project>(key: K, value: Project[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = await readFileAsDataURL(file);
    set("cover", url);
  };

  const gradients = t.adminProjects.gradients;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start lg:items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-3xl bg-background border border-border rounded-card shadow-2xl my-8">
        <div className="sticky top-0 flex items-center justify-between p-5 border-b border-border bg-background rounded-t-card">
          <h3 className="font-display font-semibold text-lg">
            {project.slug ? t.adminProjects.editProject : t.adminProjects.newProject}
          </h3>
          <button onClick={onClose} className="p-2 rounded-button hover:bg-background-card text-foreground-muted hover:text-foreground">
            <X size={18} />
          </button>
        </div>

        <div className="p-5 lg:p-6 space-y-5 max-h-[60vh] overflow-y-auto">
          <CoverUploader
            cover={form.cover}
            gradient={form.coverGradient}
            gradients={gradients}
            onUpload={handleCoverUpload}
            onGradientChange={(g) => set("coverGradient", g)}
            onClear={() => set("cover", "")}
          />

          <div className="grid grid-cols-2 gap-3">
            <TextInputZhEn
              label={t.adminProjects.fields.title}
              value={form.title as TextValue}
              onChange={(v) => set("title", v)}
              placeholderZh={t.adminProjects.ph.title}
              placeholderEn="AI Copilot Platform"
            />
            <Field label={t.adminProjects.fields.slug}>
              <input
                className="w-full rounded-button border border-border bg-background-elevated px-3 py-2 text-sm focus:border-accent focus:outline-none font-mono"
                value={form.slug}
                onChange={(e) => set("slug", e.target.value)}
                placeholder="ai-copilot-platform"
              />
            </Field>
          </div>

          <TextInputZhEn
            label={t.adminProjects.fields.subtitle}
            value={form.subtitle as TextValue}
            onChange={(v) => set("subtitle", v)}
            placeholderZh={t.adminProjects.ph.subtitle}
            placeholderEn="Enterprise-grade AI copilot platform"
          />

          <div className="grid grid-cols-3 gap-3">
            <Field label={t.adminProjects.fields.category}>
              <select
                className="w-full rounded-button border border-border bg-background-elevated px-3 py-2 text-sm focus:border-accent focus:outline-none appearance-none cursor-pointer"
                value={form.category}
                onChange={(e) => set("category", e.target.value as Project["category"])}
              >
                {categories.map((c) => (<option key={c} value={c}>{c}</option>))}
              </select>
            </Field>
            <Field label={t.adminProjects.fields.year}>
              <input type="number" className="w-full rounded-button border border-border bg-background-elevated px-3 py-2 text-sm focus:border-accent focus:outline-none" value={form.year} onChange={(e) => set("year", Number(e.target.value))} />
            </Field>
            <Field label={t.adminProjects.fields.featured}>
              <label className="flex items-center h-[38px] gap-2 cursor-pointer">
                <input type="checkbox" checked={!!form.featured} onChange={(e) => set("featured", e.target.checked)} className="w-4 h-4 rounded accent-accent" />
                <span className="text-sm">{t.adminProjects.fields.featuredHint}</span>
              </label>
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <TextInputZhEn
              label={t.adminProjects.fields.role}
              value={form.role as TextValue}
              onChange={(v) => set("role", v)}
              placeholderZh={t.adminProjects.ph.role}
              placeholderEn="Lead Product Designer"
            />
            <TextInputZhEn
              label={t.adminProjects.fields.client}
              value={(form.client as TextValue) || emptyText}
              onChange={(v) => set("client", v)}
              placeholderZh="内部项目"
              placeholderEn="Internal"
            />
          </div>

          <TextInputZhEn
            label={t.adminProjects.fields.summary}
            value={form.summary as TextValue}
            onChange={(v) => set("summary", v)}
            placeholderZh={t.adminProjects.ph.summary}
            placeholderEn="One-line description of the project"
            rows={2}
          />

          <div className="grid grid-cols-2 gap-3">
            <Field label={t.adminProjects.fields.teamSize}>
              <input className="w-full rounded-button border border-border bg-background-elevated px-3 py-2 text-sm focus:border-accent focus:outline-none" value={form.teamSize || ""} onChange={(e) => set("teamSize", e.target.value)} placeholder={t.adminProjects.ph.teamSize} />
            </Field>
            <Field label={t.adminProjects.fields.duration}>
              <input className="w-full rounded-button border border-border bg-background-elevated px-3 py-2 text-sm focus:border-accent focus:outline-none" value={form.duration || ""} onChange={(e) => set("duration", e.target.value)} placeholder={t.adminProjects.ph.duration} />
            </Field>
          </div>

          <TextInputZhEn
            label={t.adminProjects.fields.challenge}
            value={(form.challenge as TextValue) || emptyText}
            onChange={(v) => set("challenge", v)}
            placeholderZh={t.adminProjects.ph.challenge}
            placeholderEn="What was the core problem or challenge?"
            rows={3}
          />

          <TextValueList label={t.adminProjects.fields.process} items={(form.process as TextValue[]) || []} onChange={(arr) => set("process", arr)} placeholderZh={t.adminProjects.ph.process} placeholderEn="Each step of the design process" />
          <TextValueList label={t.adminProjects.fields.highlights} items={(form.highlights as TextValue[]) || []} onChange={(arr) => set("highlights", arr)} placeholderZh={t.adminProjects.ph.highlights} placeholderEn="2-3 key highlights" />
          <DynamicList label={t.adminProjects.fields.tools} items={form.tools || []} onChange={(arr) => set("tools", arr)} placeholder="Figma, React, Framer..." />

          <TextInputZhEn
            label={t.adminProjects.fields.outcome}
            value={(form.outcome as TextValue) || emptyText}
            onChange={(v) => set("outcome", v)}
            placeholderZh={t.adminProjects.ph.outcome}
            placeholderEn="Final results and impact"
            rows={3}
          />

          <TextInputZhEn
            label={t.adminProjects.fields.roleDetail}
            value={(form.roleDetail as TextValue) || emptyText}
            onChange={(v) => set("roleDetail", v)}
            placeholderZh={t.adminProjects.ph.roleDetail}
            placeholderEn="What you specifically did"
            rows={2}
          />

          <MetricsEditor metrics={form.metrics || []} onChange={(m) => set("metrics", m)} />
          <FigmaMediaField url={form.figmaUrl || ""} images={form.figmaImages || []} onChangeUrl={(v) => set("figmaUrl", v)} onChangeImages={(arr) => set("figmaImages", arr)} />
        </div>

        <div className="sticky bottom-0 flex justify-end gap-2 p-5 border-t border-border bg-background rounded-b-card">
          <button onClick={onClose} className="rounded-button border border-border px-4 py-2 text-sm hover:bg-background-card">{t.adminProjects.cancel}</button>
          <button
            onClick={() => {
              if (!form.slug) form.slug = slugify(pick(form.title as TextValue));
              if (!form.slug) { alert(t.adminProjects.titleRequired); return; }
              onSave({ ...form });
            }}
            className="rounded-button bg-accent hover:bg-accent-hover text-background px-5 py-2 text-sm font-medium"
          >
            {t.adminProjects.saveProject}
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode; }) {
  return (
    <div>
      <label className="block font-mono text-[10px] uppercase tracking-wider text-foreground-subtle mb-1.5">{label}</label>
      {children}
    </div>
  );
}

function DynamicList({ label, items, onChange, placeholder }: { label: string; items: string[]; onChange: (arr: string[]) => void; placeholder?: string; }) {
  const { t } = useI18n();
  return (
    <div>
      <label className="block font-mono text-[10px] uppercase tracking-wider text-foreground-subtle mb-2">{label}</label>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex gap-2">
            <input className="flex-1 rounded-button border border-border bg-background-elevated px-3 py-2 text-sm focus:border-accent focus:outline-none" value={item} onChange={(e) => { const arr = [...items]; arr[i] = e.target.value; onChange(arr); }} placeholder={placeholder} />
            <button onClick={() => onChange(items.filter((_, j) => j !== i))} className="px-2 text-foreground-muted hover:text-red-400"><X size={16} /></button>
          </div>
        ))}
        <button onClick={() => onChange([...items, ""])} className="text-xs text-accent hover:text-accent-hover flex items-center gap-1 py-1">
          <Plus size={12} /> {t.adminProjects.addItem}
        </button>
      </div>
    </div>
  );
}

function TextValueList({ label, items, onChange, placeholderZh, placeholderEn }: { label: string; items: TextValue[]; onChange: (arr: TextValue[]) => void; placeholderZh?: string; placeholderEn?: string; }) {
  const { t } = useI18n();
  const toObj = (v: TextValue): { zh: string; en: string } =>
    typeof v === "string" ? { zh: v, en: v } : v;
  return (
    <div>
      <label className="block font-mono text-[10px] uppercase tracking-wider text-foreground-subtle mb-2">{label}</label>
      <div className="space-y-2">
        {items.map((item, i) => {
          const v = toObj(item);
          return (
            <div key={i} className="flex gap-2 items-start">
              <div className="flex-1 grid grid-cols-2 gap-1.5">
                <input
                  className="rounded-button border border-border bg-background-elevated px-2 py-2 text-sm focus:border-accent focus:outline-none"
                  value={v.zh}
                  onChange={(e) => { const arr = items.map((x) => toObj(x)); arr[i] = { ...arr[i], zh: e.target.value }; onChange(arr); }}
                  placeholder={placeholderZh}
                />
                <input
                  className="rounded-button border border-border bg-background-elevated px-2 py-2 text-sm focus:border-accent focus:outline-none"
                  value={v.en}
                  onChange={(e) => { const arr = items.map((x) => toObj(x)); arr[i] = { ...arr[i], en: e.target.value }; onChange(arr); }}
                  placeholder={placeholderEn}
                />
              </div>
              <button onClick={() => onChange(items.filter((_, j) => j !== i))} className="px-2 text-foreground-muted hover:text-red-400 pt-1"><X size={16} /></button>
            </div>
          );
        })}
        <button onClick={() => onChange([...items, { zh: "", en: "" }])} className="text-xs text-accent hover:text-accent-hover flex items-center gap-1 py-1">
          <Plus size={12} /> {t.adminProjects.addItem}
        </button>
      </div>
    </div>
  );
}

function MetricsEditor({ metrics, onChange }: { metrics: Project["metrics"]; onChange: (m: NonNullable<Project["metrics"]>) => void; }) {
  const { t } = useI18n();
  const items = metrics || [];
  const toObj = (v: TextValue): { zh: string; en: string } =>
    typeof v === "string" ? { zh: v, en: v } : v;
  const update = (i: number, key: "label" | "value" | "unit", val: string | TextValue) => {
    const arr = items.map((m) => ({ ...m }));
    if (key === "label") {
      arr[i].label = typeof val === "string" ? { zh: val, en: val } : val;
    } else {
      arr[i][key] = val as string;
    }
    onChange(arr);
  };
  const remove = (i: number) => onChange(items.filter((_, j) => j !== i));
  const add = () => onChange([...items, { label: { zh: "", en: "" }, value: "", unit: "" }]);

  return (
    <div>
      <label className="block font-mono text-[10px] uppercase tracking-wider text-foreground-subtle mb-2">{t.adminProjects.metrics.label}</label>
      <div className="space-y-2">
        {items.map((m, i) => {
          const lbl = toObj(m.label as TextValue);
          return (
            <div key={i} className="flex gap-2 items-start">
              <div className="flex-1 grid grid-cols-2 gap-1.5">
                <input className="rounded-button border border-border bg-background-elevated px-2 py-2 text-sm focus:border-accent focus:outline-none" placeholder={t.adminProjects.metrics.phLabel + " (zh)"} value={lbl.zh} onChange={(e) => update(i, "label", { zh: e.target.value, en: lbl.en })} />
                <input className="rounded-button border border-border bg-background-elevated px-2 py-2 text-sm focus:border-accent focus:outline-none" placeholder="Metric (en)" value={lbl.en} onChange={(e) => update(i, "label", { zh: lbl.zh, en: e.target.value })} />
              </div>
              <input className="w-20 rounded-button border border-border bg-background-elevated px-3 py-2 text-sm focus:border-accent focus:outline-none font-mono text-center" placeholder="120K" value={m.value} onChange={(e) => update(i, "value", e.target.value)} />
              <button onClick={() => remove(i)} className="px-2 text-foreground-muted hover:text-red-400 pt-1"><X size={16} /></button>
            </div>
          );
        })}
        <button onClick={add} className="text-xs text-accent hover:text-accent-hover flex items-center gap-1 py-1">
          <Plus size={12} /> {t.adminProjects.metrics.add}
        </button>
      </div>
    </div>
  );
}

function CoverUploader({ cover, gradient, gradients, onUpload, onGradientChange, onClear }: { cover: string; gradient: string; gradients: { label: string; value: string }[]; onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void; onGradientChange: (g: string) => void; onClear: () => void; }) {
  const { t } = useI18n();
  return (
    <div>
      <label className="block font-mono text-[10px] uppercase tracking-wider text-foreground-subtle mb-2">{t.adminProjects.cover.label}</label>
      <div className={`relative h-40 rounded-button bg-gradient-to-br ${gradient} border border-border flex items-center justify-center overflow-hidden`}>
        {cover ? (
          <>
            <img src={cover} alt="cover" className="w-full h-full object-cover" />
            <button onClick={onClear} className="absolute top-2 right-2 p-1.5 rounded-button bg-black/60 hover:bg-black/80"><X size={14} /></button>
          </>
        ) : (
          <label className="cursor-pointer flex flex-col items-center gap-2 text-foreground-muted hover:text-foreground">
            <ImageIcon size={28} />
            <span className="text-xs">{t.adminProjects.cover.hint}</span>
            <input type="file" accept="image/*" onChange={onUpload} className="hidden" />
          </label>
        )}
      </div>
      <div className="mt-2">
        <p className="text-[10px] font-mono uppercase text-foreground-subtle mb-1.5">{t.adminProjects.cover.gradientHint}</p>
        <div className="flex gap-2 flex-wrap">
          {gradients.map((g) => (
            <button key={g.value} onClick={() => onGradientChange(g.value)} className={`h-8 px-3 rounded-button bg-gradient-to-br ${g.value} border text-[10px] font-mono ${gradient === g.value ? "border-accent text-foreground" : "border-border text-foreground-muted"}`}>
              {g.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function FigmaMediaField({ url, images, onChangeUrl, onChangeImages }: { url: string; images: string[]; onChangeUrl: (v: string) => void; onChangeImages: (arr: string[]) => void; }) {
  const { t } = useI18n();
  const parsed = url ? parseFigmaUrl(url) : null;
  const valid = url ? isValidFigmaUrl(url) : false;
  const [token, setToken] = useState<string>(() => localStorage.getItem("figma_token") || "");
  const [showToken, setShowToken] = useState(false);
  const [importOpen, setImportOpen] = useState(false);

  const saveToken = (v: string) => {
    setToken(v);
    if (v) localStorage.setItem("figma_token", v);
    else localStorage.removeItem("figma_token");
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    const urls: string[] = [];
    for (const f of files) { const u = await readFileAsDataURL(f); urls.push(u); }
    onChangeImages([...images, ...urls]);
    e.target.value = "";
  };

  const removeImage = (i: number) => { onChangeImages(images.filter((_, j) => j !== i)); };
  const moveImage = (i: number, dir: -1 | 1) => { const j = i + dir; if (j < 0 || j >= images.length) return; const arr = [...images]; [arr[i], arr[j]] = [arr[j], arr[i]]; onChangeImages(arr); };

  return (
    <div className="border-t border-border pt-5 space-y-5">
      <label className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-foreground-subtle">
        <Figma size={12} /> {t.adminProjects.figma.title}
      </label>

      {!token ? (
        <div className="rounded-button border border-border bg-background-card p-4">
          <p className="text-sm mb-3">
            <strong className="text-foreground">{t.adminProjects.figma.enableTitle}</strong>
            <span className="text-foreground-muted ml-2">
              {t.adminProjects.figma.tokenHint}
              <a href="https://www.figma.com/settings/developers#personal-access-tokens" target="_blank" rel="noreferrer" className="text-accent hover:underline font-mono text-xs">
                {t.adminProjects.figma.goSettings}
              </a>
            </span>
          </p>
          <div className="flex gap-2">
            <input type={showToken ? "text" : "password"} className="flex-1 rounded-button border border-border bg-background-elevated px-3 py-2 text-sm font-mono focus:border-accent focus:outline-none" placeholder="figd_xxxxxxxxxxxxxxxxxxxxxxxxx" value={token} onChange={(e) => saveToken(e.target.value)} />
            <button type="button" onClick={() => setShowToken(!showToken)} className="px-3 text-xs text-foreground-muted hover:text-foreground">
              {showToken ? t.adminProjects.figma.hide : t.adminProjects.figma.show}
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between rounded-button border border-green-500/30 bg-green-500/5 px-3 py-2">
          <span className="text-xs font-mono text-green-400">{t.adminProjects.figma.saved}</span>
          <button type="button" onClick={() => saveToken("")} className="text-xs text-foreground-muted hover:text-red-400">{t.adminProjects.figma.clear}</button>
        </div>
      )}

      <div>
        <p className="text-[11px] text-foreground-subtle mb-2">{t.adminProjects.figma.fileUrl}</p>
        <div className="flex gap-2">
          <input className={`flex-1 rounded-button border bg-background-elevated px-3 py-2 text-sm focus:outline-none font-mono ${url && !valid ? "border-red-500 focus:border-red-400" : valid ? "border-green-500/50 focus:border-green-400" : "border-border focus:border-accent"}`} value={url} onChange={(e) => onChangeUrl(e.target.value)} placeholder="https://www.figma.com/file/xxxxx/...?node-id=1234-5678" />
          {valid && token && (
            <button type="button" onClick={() => setImportOpen(true)} className="rounded-button bg-accent hover:bg-accent-hover text-background px-4 py-2 text-sm font-medium whitespace-nowrap inline-flex items-center gap-1.5">
              <Figma size={14} /> {t.adminProjects.figma.importBtn}
            </button>
          )}
        </div>
        {url && valid && parsed && (
          <div className="mt-2 text-xs flex items-center gap-2 text-green-400 font-mono">
            <Figma size={12} />
            {parsed.fileKey}
            {parsed.nodeId && ` · ${t.adminProjects.figma.node} ${parsed.nodeId}`}
            <a href={url} target="_blank" rel="noreferrer" className="text-accent hover:underline ml-2">{t.adminProjects.figma.openInFigma} ↗</a>
          </div>
        )}
      </div>

      <div>
        <p className="text-[11px] text-foreground-subtle mb-2">{t.adminProjects.figma.manualHint}</p>
        {images.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-3">
            {images.map((img, i) => (
              <div key={i} className="relative group aspect-video rounded-button overflow-hidden border border-border bg-background-card">
                <img src={img} alt={`figma-${i}`} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                  <button type="button" onClick={() => moveImage(i, -1)} disabled={i === 0} className="p-1.5 rounded-button bg-background border border-border disabled:opacity-30">←</button>
                  <button type="button" onClick={() => moveImage(i, 1)} disabled={i === images.length - 1} className="p-1.5 rounded-button bg-background border border-border disabled:opacity-30">→</button>
                  <button type="button" onClick={() => removeImage(i)} className="p-1.5 rounded-button bg-red-500/80 hover:bg-red-500"><X size={12} /></button>
                </div>
                <span className="absolute top-1 left-1 font-mono text-[10px] bg-black/60 px-1.5 py-0.5 rounded">{i + 1}</span>
              </div>
            ))}
          </div>
        )}
        <label className="flex items-center justify-center gap-2 rounded-button border border-dashed border-border bg-background-elevated hover:border-accent hover:text-accent transition-colors cursor-pointer py-4 text-sm text-foreground-muted">
          <Plus size={14} />
          <span>{t.adminProjects.figma.uploadShot}</span>
          <input type="file" accept="image/png,image/jpeg,image/webp" multiple onChange={handleFileUpload} className="hidden" />
        </label>
      </div>

      {importOpen && parsed && token && (
        <FigmaImportModal fileKey={parsed.fileKey} initialNodeId={parsed.nodeId} token={token} onClose={() => setImportOpen(false)} onImport={(imgs) => { onChangeImages([...images, ...imgs]); setImportOpen(false); }} />
      )}
    </div>
  );
}

function FigmaImportModal({ fileKey, initialNodeId, token, onClose, onImport }: { fileKey: string; initialNodeId?: string; token: string; onClose: () => void; onImport: (images: string[]) => void; }) {
  const { t } = useI18n();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [frames, setFrames] = useState<FigmaFrame[]>([]);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [fetching, setFetching] = useState(false);
  const [progress, setProgress] = useState("");

  useEffect(() => {
    fetchFigmaFile(`https://www.figma.com/file/${fileKey}${initialNodeId ? `?node-id=${initialNodeId.replace(":", "-")}` : ""}`, token)
      .then((info) => { setFrames(info?.frames || []); })
      .catch((e) => setError(e.message || t.adminProjects.figma.loadFailed))
      .finally(() => setLoading(false));
  }, [fileKey, initialNodeId, token, t]);

  const toggle = (id: string) => {
    setSelected((prev) => { const n = new Set(prev); if (n.has(id)) n.delete(id); else n.add(id); return n; });
  };
  const toggleAll = () => { if (selected.size === frames.length) setSelected(new Set()); else setSelected(new Set(frames.map((f) => f.id))); };

  const handleImport = async () => {
    const ids = Array.from(selected);
    if (ids.length === 0) return;
    setFetching(true);
    setProgress(t.adminProjects.figma.progressFetch.replace("{n}", String(ids.length)));
    try {
      const imageMap = await fetchFigmaImages(fileKey, ids, token);
      const result: string[] = [];
      const entries = Object.entries(imageMap);
      for (let i = 0; i < entries.length; i++) {
        const [, figmaUrl] = entries[i];
        if (!figmaUrl) continue;
        setProgress(t.adminProjects.figma.progressImg.replace("{i}", String(i + 1)).replace("{total}", String(entries.length)));
        try { const dataUrl = await proxyImageToDataUrl(figmaUrl); result.push(dataUrl); } catch { /* skip */ }
      }
      onImport(result);
    } catch (e) {
      setError((e as Error).message || t.adminProjects.figma.importFailed);
    } finally {
      setFetching(false);
      setProgress("");
    }
  };

  return (
    <div className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-background border border-border rounded-card shadow-2xl max-h-[85vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Figma size={18} className="text-accent" />
            <h3 className="font-display font-semibold">{t.adminProjects.figma.modalTitle}</h3>
          </div>
          <button type="button" onClick={onClose} className="p-2 rounded-button hover:bg-background-card text-foreground-muted"><X size={18} /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {loading && <div className="text-center py-12 text-foreground-muted">{t.adminProjects.figma.loading}</div>}
          {error && (
            <div className="rounded-button border border-red-500/50 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
              <p className="text-xs mt-2 opacity-80">{t.adminProjects.figma.errorHint}</p>
            </div>
          )}
          {!loading && !error && frames.length === 0 && (
            <div className="text-center py-12 text-foreground-muted text-sm">{t.adminProjects.figma.noFrames}</div>
          )}
          {!loading && !error && frames.length > 0 && (
            <>
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs text-foreground-muted">{t.adminProjects.figma.found.replace("{n}", String(frames.length)).replace("{s}", String(selected.size))}</p>
                <button type="button" onClick={toggleAll} className="text-xs text-accent hover:underline">
                  {selected.size === frames.length ? t.adminProjects.figma.deselectAll : t.adminProjects.figma.selectAll}
                </button>
              </div>
              <div className="space-y-1">
                {frames.map((f) => (
                  <label key={f.id} className={`flex items-center gap-3 rounded-button border px-3 py-2.5 cursor-pointer transition-colors ${selected.has(f.id) ? "border-accent bg-accent/10" : "border-border hover:border-border/80"}`}>
                    <input type="checkbox" checked={selected.has(f.id)} onChange={() => toggle(f.id)} className="accent-accent w-4 h-4" />
                    <Figma size={14} className="text-accent flex-shrink-0" />
                    <span className="text-sm truncate flex-1">{f.name}</span>
                    <span className="font-mono text-[10px] text-foreground-subtle">{f.type}</span>
                  </label>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="flex items-center justify-between p-4 border-t border-border">
          <p className="text-xs text-foreground-muted font-mono">{progress || fileKey}</p>
          <div className="flex gap-2">
            <button type="button" onClick={onClose} disabled={fetching} className="rounded-button border border-border px-4 py-2 text-sm hover:bg-background-card disabled:opacity-50">{t.adminProjects.cancel}</button>
            <button type="button" onClick={handleImport} disabled={selected.size === 0 || fetching} className="rounded-button bg-accent hover:bg-accent-hover disabled:opacity-50 disabled:hover:bg-accent text-background px-4 py-2 text-sm font-medium">
              {fetching ? t.adminProjects.figma.importing : t.adminProjects.figma.importN.replace("{n}", String(selected.size))}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
