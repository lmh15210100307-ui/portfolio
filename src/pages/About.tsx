import { motion } from "framer-motion";
import { LayoutGrid, Sparkles, Layers, Code, Mail, MapPin, Star, Plus, X, Upload, Trash2, Pencil } from "lucide-react";
import { useAdminStore } from "@/store/admin";
import { useReveal } from "@/hooks/useReveal";
import { useI18n } from "@/hooks/useI18n";
import { TextValue } from "@/config/i18n";
import { LifecycleItem } from "@/data/site";
import { useState, useMemo, useRef } from "react";

const iconMap: Record<string, React.ReactNode> = {
  LayoutGrid: <LayoutGrid size={20} />,
  Sparkles: <Sparkles size={20} />,
  Layers: <Layers size={20} />,
  Code: <Code size={20} />,
};

const GRADIENTS = [
  "from-blue-500 via-purple-500 to-pink-500",
  "from-emerald-500 via-teal-500 to-cyan-500",
  "from-orange-500 via-amber-500 to-yellow-500",
  "from-rose-500 via-red-500 to-orange-500",
  "from-violet-500 via-purple-500 to-fuchsia-500",
  "from-sky-500 via-blue-500 to-indigo-500",
];

function randGradient(seed: string): string {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return GRADIENTS[h % GRADIENTS.length];
}

function relativeTime(ts: number, t: ReturnType<typeof useI18n>["t"], isZh: boolean): string {
  const diff = Date.now() - ts;
  const days = Math.floor(diff / 86400000);
  if (days === 0) return t.about.lifeToday;
  if (days === 1) return t.about.lifeYesterday;
  const key = isZh ? "lifeDaysAgo" : "lifeDaysAgo";
  return t.about[key].replace("{n}", String(days));
}

function emptyLifecycle(): LifecycleItem {
  return {
    id: crypto.randomUUID(),
    title: { zh: "", en: "" },
    content: { zh: "", en: "" },
    image: undefined,
    pinned: false,
    createdAt: Date.now(),
  };
}

function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result as string);
    r.onerror = reject;
    r.readAsDataURL(file);
  });
}

export default function About() {
  const site = useAdminStore((s) => s.site);
  const { t, pick } = useI18n();
  const [mode, setMode] = useState<"resume" | "life">("resume");

  return (
    <div className="pt-24 lg:pt-32 pb-24 lg:pb-32">
      <div className="container">
        <div className="flex justify-center mb-12 lg:mb-16">
          <div className="inline-flex items-center rounded-pill border border-border bg-background-card p-1">
            <button
              onClick={() => setMode("resume")}
              className={`px-5 py-2 text-sm font-medium rounded-pill transition-colors duration-200 ${
                mode === "resume"
                  ? "bg-accent/10 text-accent border border-accent/20"
                  : "text-foreground-muted hover:text-foreground"
              }`}
            >
              {t.about.resume}
            </button>
            <button
              onClick={() => setMode("life")}
              className={`px-5 py-2 text-sm font-medium rounded-pill transition-colors duration-200 ${
                mode === "life"
                  ? "bg-accent/10 text-accent border border-accent/20"
                  : "text-foreground-muted hover:text-foreground"
              }`}
            >
              {t.about.life}
            </button>
          </div>
        </div>

        {mode === "resume" ? <ResumeView site={site} t={t} pick={pick} /> : <LifeView />}
      </div>
    </div>
  );
}

function ResumeView({ site, t, pick }: { site: any; t: any; pick: any }) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-24 lg:mb-32"
      >
        <div className="lg:col-span-5">
          <div className="aspect-square rounded-card bg-gradient-to-br from-accent/30 via-purple-500/20 to-pink-500/20 flex items-center justify-center relative overflow-hidden max-w-sm mx-auto lg:mx-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.1),transparent_60%)]" />
            <span className="relative font-display font-bold text-6xl sm:text-7xl lg:text-9xl text-foreground/20">
              {pick(site.initials)}
            </span>
          </div>
        </div>
        <div className="lg:col-span-7 flex flex-col justify-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-3">
            {t.about.tag}
          </p>
          <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl leading-tight mb-6">
            {t.about.greeting} {pick(site.name)}。 <br />
            <span className="text-foreground-muted">{t.about.bioLead} </span>
            <span className="bg-gradient-to-r from-accent via-blue-400 to-purple-400 bg-clip-text text-transparent">
              {t.about.bioHighlight}
            </span>
            。
          </h1>
          <p className="text-lg text-foreground-muted leading-relaxed max-w-2xl">
            {pick(site.bio)}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-foreground-muted">
            <span className="inline-flex items-center gap-2">
              <MapPin size={14} />
              {site.location}
            </span>
            <span className="inline-flex items-center gap-2">
              <Mail size={14} />
              {site.email}
            </span>
          </div>
        </div>
      </motion.div>

      <div className="mb-24 lg:mb-32">
        <SectionTitle label={t.about.methodTag} title={t.about.methodTitle} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {site.methodology.map((m: any, i: number) => (
            <MethodCard key={m.step} item={m} index={i} />
          ))}
        </div>
      </div>

      <div className="mb-24 lg:mb-32">
        <SectionTitle label={t.about.skillTag} title={t.about.skillTitle} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {site.skills.map((s: any, i: number) => (
            <SkillCard key={i} skill={s} index={i} />
          ))}
        </div>
      </div>

      <div>
        <SectionTitle label={t.about.expTag} title={t.about.expTitle} />
        <div className="relative">
          <div className="absolute left-4 lg:left-5 top-0 bottom-0 w-px bg-border" />
          <div className="space-y-8 lg:space-y-10">
            {site.experience.map((exp: any, i: number) => (
              <ExpItem key={i} exp={exp} index={i} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function LifeView() {
  const { t, pick, isZh } = useI18n();
  const site = useAdminStore((s) => s.site);
  const updateSite = useAdminStore((s) => s.updateSite);
  const list = site.lifecycle || [];

  const [editing, setEditing] = useState<LifecycleItem | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const sorted = useMemo(() => {
    return [...list].sort((a, b) => {
      if (!!b.pinned !== !!a.pinned) return b.pinned ? 1 : -1;
      return b.createdAt - a.createdAt;
    });
  }, [list]);

  const openNew = () => setEditing(emptyLifecycle());
  const openEdit = (item: LifecycleItem) => setEditing({ ...item, title: typeof item.title === "string" ? { zh: item.title, en: item.title } : { ...item.title }, content: typeof item.content === "string" ? { zh: item.content, en: item.content } : { ...item.content } });

  const handleSave = () => {
    if (!editing) return;
    let arr = [...list];
    const idx = arr.findIndex((x) => x.id === editing.id);
    if (idx >= 0) arr[idx] = editing;
    else arr.unshift(editing);
    updateSite({ lifecycle: arr });
    setEditing(null);
  };

  const handleDelete = (id: string) => {
    updateSite({ lifecycle: list.filter((x) => x.id !== id) });
  };

  const togglePin = (id: string) => {
    updateSite({
      lifecycle: list.map((x) => (x.id === id ? { ...x, pinned: !x.pinned } : x)),
    });
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-2">{t.about.life}</p>
          <h2 className="font-display font-bold text-2xl md:text-3xl">
            {isZh ? "生活中的一些碎片。" : "Little moments from life."}
          </h2>
        </div>
        <button
          onClick={openNew}
          className="inline-flex items-center gap-2 rounded-button bg-foreground text-background px-4 py-2 text-sm font-medium hover:bg-accent transition-colors"
        >
          <Plus size={16} /> {t.about.lifeNew}
        </button>
      </div>

      {sorted.length === 0 ? (
        <div className="rounded-card border border-border bg-background-card p-16 text-center text-foreground-muted">
          {t.about.lifeEmpty}
        </div>
      ) : (
        <div className="columns-1 md:columns-2 lg:columns-3 gap-5 [column-fill:_balance]">
          {sorted.map((item) => (
            <div key={item.id} className="mb-5 break-inside-avoid">
              <LifeCard
                item={item}
                onEdit={() => openEdit(item)}
                onDelete={() => handleDelete(item.id)}
                onTogglePin={() => togglePin(item.id)}
              />
            </div>
          ))}
        </div>
      )}

      {editing && (
        <LifeEditorModal
          item={editing}
          onChange={setEditing}
          onClose={() => setEditing(null)}
          onSave={handleSave}
          fileInputRef={fileInputRef}
        />
      )}
    </div>
  );
}

function LifeCard({
  item,
  onEdit,
  onDelete,
  onTogglePin,
}: {
  item: LifecycleItem;
  onEdit: () => void;
  onDelete: () => void;
  onTogglePin: () => void;
}) {
  const { t, pick, isZh } = useI18n();
  const gradient = randGradient(item.id);

  return (
    <div className="rounded-2xl border border-border bg-background-card overflow-hidden hover:border-accent/40 transition-all group">
      <div className="relative">
        {item.image ? (
          <img
            src={item.image}
            alt=""
            className="w-full block object-cover"
            loading="lazy"
          />
        ) : (
          <div className={`w-full aspect-[4/3] bg-gradient-to-br ${gradient}`} />
        )}
        {item.pinned && (
          <div className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-pill bg-foreground/90 text-background px-2 py-0.5 text-[10px] font-medium backdrop-blur-sm">
            <Star size={10} fill="currentColor" /> PINNED
          </div>
        )}
      </div>

      <div className="p-4">
        {pick(item.title) && (
          <h3 className="font-display font-semibold text-base mb-1.5 leading-snug">
            {pick(item.title)}
          </h3>
        )}
        {pick(item.content) && (
          <div className="text-sm text-foreground-muted leading-relaxed line-clamp-6 prose prose-sm prose-invert max-w-none">
            {pick(item.content)}
          </div>
        )}

        <div className="mt-3 flex items-center justify-between">
          <span className="font-mono text-[11px] text-foreground-subtle">
            {relativeTime(item.createdAt, t, isZh)}
          </span>
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={onTogglePin}
              className={`p-1.5 rounded hover:bg-background-elevated transition-colors ${item.pinned ? "text-amber-400" : "text-foreground-muted hover:text-foreground"}`}
              title={item.pinned ? t.about.lifeUnpin : t.about.lifePin}
            >
              <Star size={13} fill={item.pinned ? "currentColor" : "none"} />
            </button>
            <button
              onClick={onEdit}
              className="p-1.5 rounded text-foreground-muted hover:text-foreground hover:bg-background-elevated transition-colors"
              title={t.about.lifeEdit}
            >
              <Pencil size={13} />
            </button>
            <button
              onClick={onDelete}
              className="p-1.5 rounded text-foreground-muted hover:text-red-400 hover:bg-background-elevated transition-colors"
              title={t.about.lifeDelete}
            >
              <Trash2 size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface LifeEditorProps {
  item: LifecycleItem;
  onChange: (i: LifecycleItem) => void;
  onClose: () => void;
  onSave: () => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
}

function LifeEditorModal({ item, onChange, onClose, onSave, fileInputRef }: LifeEditorProps) {
  const { t } = useI18n();

  const setTitle = (lang: "zh" | "en", v: string) => {
    const cur = typeof item.title === "string" ? { zh: item.title, en: item.title } : { ...item.title };
    cur[lang] = v;
    onChange({ ...item, title: cur });
  };
  const setContent = (lang: "zh" | "en", v: string) => {
    const cur = typeof item.content === "string" ? { zh: item.content, en: item.content } : { ...item.content };
    cur[lang] = v;
    onChange({ ...item, content: cur });
  };

  const handlePickFile = () => fileInputRef.current?.click();
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const url = await readFileAsDataURL(f);
    onChange({ ...item, image: url });
    e.target.value = "";
  };

  const gradient = randGradient(item.id);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-xl rounded-card bg-background border border-border shadow-2xl my-12">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h3 className="font-display font-semibold text-lg">{t.about.lifeEdit}</h3>
          <button onClick={onClose} className="p-1 rounded hover:bg-background-elevated">
            <X size={18} />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div>
            <label className="block text-xs text-foreground-muted mb-1.5">{t.about.lifeCover}</label>
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
            {item.image ? (
              <div className="relative">
                <img src={item.image} alt="" className="w-full aspect-video object-cover rounded-button border border-border" />
                <button
                  onClick={() => onChange({ ...item, image: undefined })}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-black/70 hover:bg-black text-white"
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <button
                onClick={handlePickFile}
                className={`w-full aspect-video rounded-button border border-border border-dashed bg-gradient-to-br ${gradient} flex flex-col items-center justify-center gap-2 text-white/70 hover:text-white hover:border-white/40 transition-colors`}
              >
                <Upload size={20} />
                <span className="text-xs">{t.about.lifeCoverPH}</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-foreground-muted mb-1.5">标题 (ZH)</label>
              <input
                className="w-full rounded-button border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:border-accent"
                placeholder={t.about.lifeTitlePH}
                value={typeof item.title === "string" ? item.title : item.title.zh}
                onChange={(e) => setTitle("zh", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs text-foreground-muted mb-1.5">Title (EN)</label>
              <input
                className="w-full rounded-button border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:border-accent"
                placeholder={t.about.lifeTitlePH}
                value={typeof item.title === "string" ? item.title : item.title.en}
                onChange={(e) => setTitle("en", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-foreground-muted mb-1.5">正文 (ZH)</label>
              <textarea
                rows={4}
                className="w-full rounded-button border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:border-accent resize-none"
                placeholder={t.about.lifeContentPH}
                value={typeof item.content === "string" ? item.content : item.content.zh}
                onChange={(e) => setContent("zh", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs text-foreground-muted mb-1.5">Content (EN)</label>
              <textarea
                rows={4}
                className="w-full rounded-button border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:border-accent resize-none"
                placeholder={t.about.lifeContentPH}
                value={typeof item.content === "string" ? item.content : item.content.en}
                onChange={(e) => setContent("en", e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <label className="inline-flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={!!item.pinned}
                onChange={(e) => onChange({ ...item, pinned: e.target.checked })}
                className="w-4 h-4 rounded accent-accent"
              />
              {t.about.lifePin}
            </label>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-border bg-background-elevated/30 rounded-b-card">
          <button
            onClick={onClose}
            className="rounded-button border border-border px-4 py-2 text-sm hover:bg-background-elevated"
          >
            {t.about.cancel}
          </button>
          <button
            onClick={onSave}
            className="rounded-button bg-foreground text-background px-4 py-2 text-sm font-medium hover:bg-accent transition-colors"
          >
            {t.about.save}
          </button>
        </div>
      </div>
    </div>
  );
}

function SectionTitle({ label, title }: { label: string; title: string }) {
  return (
    <div className="mb-10 lg:mb-14">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-3">
        {label}
      </p>
      <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl">
        {title}
      </h2>
    </div>
  );
}

function MethodCard({
  item,
  index,
}: {
  item: { step: string; title: TextValue; desc: TextValue };
  index: number;
}) {
  const ref = useReveal<HTMLDivElement>();
  const { pick } = useI18n();
  return (
    <div
      ref={ref}
      className="reveal group rounded-card border border-border bg-background-card p-6 lg:p-7 hover:border-accent transition-all duration-500"
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="font-mono text-xs text-accent mb-4">{item.step}</div>
      <h3 className="font-display font-semibold text-lg lg:text-xl mb-3">
        {pick(item.title)}
      </h3>
      <p className="text-sm text-foreground-muted leading-relaxed">
        {pick(item.desc)}
      </p>
    </div>
  );
}

function SkillCard({
  skill,
  index,
}: {
  skill: { category: TextValue; icon: string; items: TextValue[] };
  index: number;
}) {
  const ref = useReveal<HTMLDivElement>();
  const { pick } = useI18n();
  return (
    <div
      ref={ref}
      className="reveal rounded-card border border-border bg-background-card p-6 lg:p-7"
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-9 h-9 rounded-button bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
          {iconMap[skill.icon]}
        </div>
        <h3 className="font-display font-semibold text-lg">{pick(skill.category)}</h3>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {skill.items.map((item, j) => (
          <span
            key={j}
            className="text-xs font-mono text-foreground-muted rounded-pill border border-border px-2.5 py-1"
          >
            {pick(item)}
          </span>
        ))}
      </div>
    </div>
  );
}

function ExpItem({
  exp,
  index,
}: {
  exp: { year: string; role: TextValue; company: TextValue; desc: TextValue };
  index: number;
}) {
  const ref = useReveal<HTMLDivElement>();
  const { pick } = useI18n();
  return (
    <div ref={ref} className="reveal relative pl-12 lg:pl-16">
      <div className="absolute left-2.5 lg:left-3.5 top-2 w-3 h-3 rounded-full bg-accent ring-4 ring-background" />
      <span className="font-mono text-xs text-foreground-subtle block mb-1">
        {exp.year}
      </span>
      <h3 className="font-display font-semibold text-lg lg:text-xl">
        {pick(exp.role)}
        <span className="text-foreground-muted font-normal text-base ml-2">
          @ {pick(exp.company)}
        </span>
      </h3>
      <p className="mt-2 text-sm lg:text-base text-foreground-muted leading-relaxed">
        {pick(exp.desc)}
      </p>
    </div>
  );
}
