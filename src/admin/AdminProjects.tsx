import { useState } from "react";
import { Plus, Pencil, Trash2, X, ChevronDown, ImageIcon, Figma } from "lucide-react";
import { useAdminStore } from "@/store/admin";
import { categories, Project } from "@/data/projects";
import { readFileAsDataURL, slugify } from "@/utils/upload";
import { parseFigmaUrl, isValidFigmaUrl } from "@/utils/figma";

const emptyProject: Project = {
  slug: "",
  title: "",
  subtitle: "",
  category: "AI Product",
  year: new Date().getFullYear(),
  role: "",
  client: "",
  cover: "",
  coverGradient: "from-blue-600/20 via-purple-600/20 to-pink-600/20",
  summary: "",
  highlights: [],
  metrics: [],
  featured: false,
  challenge: "",
  process: [],
  outcome: "",
  roleDetail: "",
  tools: [],
  teamSize: "",
  duration: "",
};

export default function AdminProjects() {
  const { projects, addProject, deleteProject, persist } = useAdminStore();
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
    if (!confirm("确定删除此项目？")) return;
    deleteProject(slug);
    await persist();
  };

  const handleSave = async (p: Project) => {
    if (!p.slug) p.slug = slugify(p.title || "untitled");
    const exists = projects.find((x) => x.slug === p.slug);
    if (exists && editing?.slug !== p.slug) {
      alert("项目 slug 已存在，请修改标题");
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
          <h2 className="font-display font-bold text-2xl">Projects</h2>
          <p className="text-sm text-foreground-muted">
            管理你的作品集，点击添加新项目
          </p>
        </div>
        <button
          onClick={handleNew}
          className="inline-flex items-center gap-2 rounded-button bg-accent hover:bg-accent-hover text-background px-4 py-2.5 text-sm font-medium transition-colors"
        >
          <Plus size={16} /> New Project
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
                <img
                  src={p.cover}
                  alt={p.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="font-display font-bold text-6xl opacity-30">
                  {p.title.charAt(0) || "?"}
                </span>
              )}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  onClick={() => handleEdit(p)}
                  className="p-2 rounded-button bg-background border border-border hover:border-accent"
                >
                  <Pencil size={14} />
                </button>
                <button
                  onClick={() => handleDelete(p.slug)}
                  className="p-2 rounded-button bg-background border border-border hover:border-red-500 text-red-400"
                >
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
                    Featured
                  </span>
                )}
              </div>
              <h3 className="font-display font-semibold text-lg mb-1">
                {p.title}
              </h3>
              <p className="text-sm text-foreground-muted line-clamp-2">
                {p.summary}
              </p>
            </div>
          </div>
        ))}

        {projects.length === 0 && (
          <div className="col-span-full rounded-card border border-dashed border-border p-12 text-center text-foreground-muted">
            <ImageIcon size={32} className="mx-auto mb-3 opacity-50" />
            <p>No projects yet. Click "New Project" to get started.</p>
          </div>
        )}
      </div>

      {showForm && editing && (
        <ProjectModal
          project={editing}
          onClose={() => {
            setShowForm(false);
            setEditing(null);
          }}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

function ProjectModal({
  project,
  onClose,
  onSave,
}: {
  project: Project;
  onClose: () => void;
  onSave: (p: Project) => void;
}) {
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

  const updateArray = (key: keyof Project, index: number, val: string) => {
    const arr = [...((form[key] as string[]) || [])];
    arr[index] = val;
    set(key, arr as never);
  };

  const addToArray = (key: keyof Project) => {
    const arr = [...((form[key] as string[]) || []), ""];
    set(key, arr as never);
  };

  const removeFromArray = (key: keyof Project, index: number) => {
    const arr = ((form[key] as string[]) || []).filter((_, i) => i !== index);
    set(key, arr as never);
  };

  const gradients = [
    { label: "AI · Purple", value: "from-blue-600/20 via-purple-600/20 to-pink-600/20" },
    { label: "Data · Teal", value: "from-emerald-600/20 via-teal-600/20 to-cyan-600/20" },
    { label: "Design · Amber", value: "from-orange-600/20 via-amber-600/20 to-yellow-600/20" },
    { label: "Mobile · Rose", value: "from-rose-600/20 via-red-600/20 to-orange-600/20" },
    { label: "Brand · Violet", value: "from-violet-600/20 via-purple-600/20 to-fuchsia-600/20" },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start lg:items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-2xl bg-background border border-border rounded-card shadow-2xl my-8">
        <div className="sticky top-0 flex items-center justify-between p-5 border-b border-border bg-background rounded-t-card">
          <h3 className="font-display font-semibold text-lg">
            {project.slug ? "Edit Project" : "New Project"}
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-button hover:bg-background-card text-foreground-muted hover:text-foreground"
          >
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
            <Field label="Title *">
              <input
                className="w-full rounded-button border border-border bg-background-elevated px-3 py-2 text-sm focus:border-accent focus:outline-none"
                value={form.title}
                onChange={(e) => set("title", e.target.value)}
                placeholder="AI Copilot Platform"
              />
            </Field>
            <Field label="Slug (auto)">
              <input
                className="w-full rounded-button border border-border bg-background-elevated px-3 py-2 text-sm focus:border-accent focus:outline-none font-mono"
                value={form.slug}
                onChange={(e) => set("slug", e.target.value)}
                placeholder="ai-copilot-platform"
              />
            </Field>
          </div>

          <Field label="Subtitle">
            <input
              className="w-full rounded-button border border-border bg-background-elevated px-3 py-2 text-sm focus:border-accent focus:outline-none"
              value={form.subtitle}
              onChange={(e) => set("subtitle", e.target.value)}
              placeholder="企业级 AI 智能助手平台"
            />
          </Field>

          <div className="grid grid-cols-3 gap-3">
            <Field label="Category">
              <select
                className="w-full rounded-button border border-border bg-background-elevated px-3 py-2 text-sm focus:border-accent focus:outline-none appearance-none cursor-pointer"
                value={form.category}
                onChange={(e) => set("category", e.target.value as Project["category"])}
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Year">
              <input
                type="number"
                className="w-full rounded-button border border-border bg-background-elevated px-3 py-2 text-sm focus:border-accent focus:outline-none"
                value={form.year}
                onChange={(e) => set("year", Number(e.target.value))}
              />
            </Field>
            <Field label="Featured">
              <label className="flex items-center h-[38px] gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={!!form.featured}
                  onChange={(e) => set("featured", e.target.checked)}
                  className="w-4 h-4 rounded accent-accent"
                />
                <span className="text-sm">Show on home</span>
              </label>
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Role">
              <input
                className="w-full rounded-button border border-border bg-background-elevated px-3 py-2 text-sm focus:border-accent focus:outline-none"
                value={form.role}
                onChange={(e) => set("role", e.target.value)}
                placeholder="Lead Product Designer"
              />
            </Field>
            <Field label="Client (optional)">
              <input
                className="w-full rounded-button border border-border bg-background-elevated px-3 py-2 text-sm focus:border-accent focus:outline-none"
                value={form.client || ""}
                onChange={(e) => set("client", e.target.value)}
                placeholder="ByteDance"
              />
            </Field>
          </div>

          <Field label="Summary (one line)">
            <textarea
              rows={2}
              className="w-full rounded-button border border-border bg-background-elevated px-3 py-2 text-sm focus:border-accent focus:outline-none resize-none"
              value={form.summary}
              onChange={(e) => set("summary", e.target.value)}
              placeholder="一句话描述这个项目"
            />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Team Size">
              <input
                className="w-full rounded-button border border-border bg-background-elevated px-3 py-2 text-sm focus:border-accent focus:outline-none"
                value={form.teamSize || ""}
                onChange={(e) => set("teamSize", e.target.value)}
                placeholder="4人设计团队"
              />
            </Field>
            <Field label="Duration">
              <input
                className="w-full rounded-button border border-border bg-background-elevated px-3 py-2 text-sm focus:border-accent focus:outline-none"
                value={form.duration || ""}
                onChange={(e) => set("duration", e.target.value)}
                placeholder="6个月"
              />
            </Field>
          </div>

          <Field label="Challenge">
            <textarea
              rows={3}
              className="w-full rounded-button border border-border bg-background-elevated px-3 py-2 text-sm focus:border-accent focus:outline-none resize-none"
              value={form.challenge || ""}
              onChange={(e) => set("challenge", e.target.value)}
              placeholder="面临的核心问题和挑战是什么？"
            />
          </Field>

          <DynamicList
            label="Process Steps"
            items={form.process || []}
            onChange={(arr) => set("process", arr)}
            placeholder="设计流程的每一步"
          />

          <DynamicList
            label="Highlights"
            items={form.highlights || []}
            onChange={(arr) => set("highlights", arr)}
            placeholder="2-3 个核心亮点标签"
          />

          <DynamicList
            label="Tools"
            items={form.tools || []}
            onChange={(arr) => set("tools", arr)}
            placeholder="Figma, React, Framer..."
          />

          <Field label="Outcome">
            <textarea
              rows={3}
              className="w-full rounded-button border border-border bg-background-elevated px-3 py-2 text-sm focus:border-accent focus:outline-none resize-none"
              value={form.outcome || ""}
              onChange={(e) => set("outcome", e.target.value)}
              placeholder="最终成果和影响"
            />
          </Field>

          <Field label="Your Role Detail">
            <textarea
              rows={2}
              className="w-full rounded-button border border-border bg-background-elevated px-3 py-2 text-sm focus:border-accent focus:outline-none resize-none"
              value={form.roleDetail || ""}
              onChange={(e) => set("roleDetail", e.target.value)}
              placeholder="你具体做了什么"
            />
          </Field>

          <MetricsEditor
            metrics={form.metrics || []}
            onChange={(m) => set("metrics", m)}
          />

          <FigmaMediaField
            url={form.figmaUrl || ""}
            images={form.figmaImages || []}
            onChangeUrl={(v) => set("figmaUrl", v)}
            onChangeImages={(arr) => set("figmaImages", arr)}
          />
        </div>

        <div className="sticky bottom-0 flex justify-end gap-2 p-5 border-t border-border bg-background rounded-b-card">
          <button
            onClick={onClose}
            className="rounded-button border border-border px-4 py-2 text-sm hover:bg-background-card"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (!form.slug) form.slug = slugify(form.title);
              if (!form.slug) {
                alert("请填写项目标题");
                return;
              }
              onSave({ ...form });
            }}
            className="rounded-button bg-accent hover:bg-accent-hover text-background px-5 py-2 text-sm font-medium"
          >
            Save Project
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block font-mono text-[10px] uppercase tracking-wider text-foreground-subtle mb-1.5">
        {label}
      </label>
      {children}
    </div>
  );
}

function DynamicList({
  label,
  items,
  onChange,
  placeholder,
}: {
  label: string;
  items: string[];
  onChange: (arr: string[]) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block font-mono text-[10px] uppercase tracking-wider text-foreground-subtle mb-2">
        {label}
      </label>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex gap-2">
            <input
              className="flex-1 rounded-button border border-border bg-background-elevated px-3 py-2 text-sm focus:border-accent focus:outline-none"
              value={item}
              onChange={(e) => {
                const arr = [...items];
                arr[i] = e.target.value;
                onChange(arr);
              }}
              placeholder={placeholder}
            />
            <button
              onClick={() => onChange(items.filter((_, j) => j !== i))}
              className="px-2 text-foreground-muted hover:text-red-400"
            >
              <X size={16} />
            </button>
          </div>
        ))}
        <button
          onClick={() => onChange([...items, ""])}
          className="text-xs text-accent hover:text-accent-hover flex items-center gap-1 py-1"
        >
          <Plus size={12} /> Add item
        </button>
      </div>
    </div>
  );
}

function MetricsEditor({
  metrics,
  onChange,
}: {
  metrics: Project["metrics"];
  onChange: (m: NonNullable<Project["metrics"]>) => void;
}) {
  const items = metrics || [];
  const update = (i: number, key: "label" | "value" | "unit", val: string) => {
    const arr = items.map((m) => ({ ...m }));
    arr[i][key] = val;
    onChange(arr);
  };
  const remove = (i: number) => onChange(items.filter((_, j) => j !== i));
  const add = () => onChange([...items, { label: "", value: "", unit: "" }]);

  return (
    <div>
      <label className="block font-mono text-[10px] uppercase tracking-wider text-foreground-subtle mb-2">
        Metrics (成果数据)
      </label>
      <div className="space-y-2">
        {items.map((m, i) => (
          <div key={i} className="flex gap-2">
            <input
              className="flex-1 rounded-button border border-border bg-background-elevated px-3 py-2 text-sm focus:border-accent focus:outline-none"
              placeholder="指标描述 (如 日活用户)"
              value={m.label}
              onChange={(e) => update(i, "label", e.target.value)}
            />
            <input
              className="w-24 rounded-button border border-border bg-background-elevated px-3 py-2 text-sm focus:border-accent focus:outline-none font-mono text-center"
              placeholder="120K"
              value={m.value}
              onChange={(e) => update(i, "value", e.target.value)}
            />
            <button
              onClick={() => remove(i)}
              className="px-2 text-foreground-muted hover:text-red-400"
            >
              <X size={16} />
            </button>
          </div>
        ))}
        <button
          onClick={add}
          className="text-xs text-accent hover:text-accent-hover flex items-center gap-1 py-1"
        >
          <Plus size={12} /> Add metric
        </button>
      </div>
    </div>
  );
}

function CoverUploader({
  cover,
  gradient,
  gradients,
  onUpload,
  onGradientChange,
  onClear,
}: {
  cover: string;
  gradient: string;
  gradients: { label: string; value: string }[];
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onGradientChange: (g: string) => void;
  onClear: () => void;
}) {
  return (
    <div>
      <label className="block font-mono text-[10px] uppercase tracking-wider text-foreground-subtle mb-2">
        Cover Image
      </label>
      <div
        className={`relative h-40 rounded-button bg-gradient-to-br ${gradient} border border-border flex items-center justify-center overflow-hidden`}
      >
        {cover ? (
          <>
            <img src={cover} alt="cover" className="w-full h-full object-cover" />
            <button
              onClick={onClear}
              className="absolute top-2 right-2 p-1.5 rounded-button bg-black/60 hover:bg-black/80"
            >
              <X size={14} />
            </button>
          </>
        ) : (
          <label className="cursor-pointer flex flex-col items-center gap-2 text-foreground-muted hover:text-foreground">
            <ImageIcon size={28} />
            <span className="text-xs">Click to upload cover image</span>
            <input
              type="file"
              accept="image/*"
              onChange={onUpload}
              className="hidden"
            />
          </label>
        )}
      </div>
      <div className="mt-2">
        <p className="text-[10px] font-mono uppercase text-foreground-subtle mb-1.5">
          Or pick a gradient background
        </p>
        <div className="flex gap-2 flex-wrap">
          {gradients.map((g) => (
            <button
              key={g.value}
              onClick={() => onGradientChange(g.value)}
              className={`h-8 px-3 rounded-button bg-gradient-to-br ${g.value} border text-[10px] font-mono ${
                gradient === g.value
                  ? "border-accent text-foreground"
                  : "border-border text-foreground-muted"
              }`}
            >
              {g.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function FigmaMediaField({
  url,
  images,
  onChangeUrl,
  onChangeImages,
}: {
  url: string;
  images: string[];
  onChangeUrl: (v: string) => void;
  onChangeImages: (arr: string[]) => void;
}) {
  const parsed = url ? parseFigmaUrl(url) : null;
  const valid = url ? isValidFigmaUrl(url) : false;

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    const urls: string[] = [];
    for (const f of files) {
      const u = await readFileAsDataURL(f);
      urls.push(u);
    }
    onChangeImages([...images, ...urls]);
    e.target.value = "";
  };

  const removeImage = (i: number) => {
    onChangeImages(images.filter((_, j) => j !== i));
  };

  const moveImage = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= images.length) return;
    const arr = [...images];
    [arr[i], arr[j]] = [arr[j], arr[i]];
    onChangeImages(arr);
  };

  return (
    <div className="border-t border-border pt-5 space-y-5">
      <label className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-foreground-subtle">
        <Figma size={12} /> Figma Design — URL + Screenshots
      </label>

      <div>
        <p className="text-[11px] text-foreground-subtle mb-2">
          Option A: Paste Figma file link (live embed)
        </p>
        <input
          className={`w-full rounded-button border bg-background-elevated px-3 py-2 text-sm focus:outline-none font-mono ${
            url && !valid
              ? "border-red-500 focus:border-red-400"
              : valid
              ? "border-green-500/50 focus:border-green-400"
              : "border-border focus:border-accent"
          }`}
          value={url}
          onChange={(e) => onChangeUrl(e.target.value)}
          placeholder="https://www.figma.com/file/xxxxx/...?node-id=1234-5678"
        />
        {url && (
          <div className="mt-2 text-xs">
            {valid && parsed ? (
              <div className="flex items-center gap-2 text-green-400">
                <Figma size={12} />
                <span className="font-mono">
                  {parsed.fileKey}
                  {parsed.nodeId && ` · node ${parsed.nodeId}`}
                </span>
                <a
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-accent hover:underline ml-2"
                >
                  Open ↗
                </a>
              </div>
            ) : (
              <p className="text-red-400">无效的 Figma 链接</p>
            )}
          </div>
        )}
      </div>

      <div>
        <p className="text-[11px] text-foreground-subtle mb-2">
          Option B: Upload exported Figma screenshots (PNG / JPG)
        </p>

        {images.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-3">
            {images.map((img, i) => (
              <div
                key={i}
                className="relative group aspect-video rounded-button overflow-hidden border border-border bg-background-card"
              >
                <img
                  src={img}
                  alt={`figma-${i}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                  <button
                    onClick={() => moveImage(i, -1)}
                    disabled={i === 0}
                    className="p-1.5 rounded-button bg-background border border-border disabled:opacity-30"
                    title="Move up"
                  >
                    ←
                  </button>
                  <button
                    onClick={() => moveImage(i, 1)}
                    disabled={i === images.length - 1}
                    className="p-1.5 rounded-button bg-background border border-border disabled:opacity-30"
                    title="Move down"
                  >
                    →
                  </button>
                  <button
                    onClick={() => removeImage(i)}
                    className="p-1.5 rounded-button bg-red-500/80 hover:bg-red-500"
                    title="Delete"
                  >
                    <X size={12} />
                  </button>
                </div>
                <span className="absolute top-1 left-1 font-mono text-[10px] bg-black/60 px-1.5 py-0.5 rounded">
                  {i + 1}
                </span>
              </div>
            ))}
          </div>
        )}

        <label className="flex items-center justify-center gap-2 rounded-button border border-dashed border-border bg-background-elevated hover:border-accent hover:text-accent transition-colors cursor-pointer py-4 text-sm text-foreground-muted">
          <Plus size={14} />
          <span>Upload screenshots</span>
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp"
            multiple
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
        <p className="text-[10px] text-foreground-subtle mt-1.5">
          从 Figma 导出 PNG/JPG 截图上传，支持多张，会按顺序展示
        </p>
      </div>
    </div>
  );
}
