import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, X, ChevronDown, ImageIcon, Figma } from "lucide-react";
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
      alert("项目链接标识已存在，请修改标题");
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
          <h2 className="font-display font-bold text-2xl">作品集</h2>
          <p className="text-sm text-foreground-muted">
            管理你的项目案例，点击添加新项目
          </p>
        </div>
        <button
          onClick={handleNew}
          className="inline-flex items-center gap-2 rounded-button bg-accent hover:bg-accent-hover text-background px-4 py-2.5 text-sm font-medium transition-colors"
        >
          <Plus size={16} /> 新建项目
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
                    精选
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
            <p>还没有项目，点击"新建项目"开始吧</p>
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

  const gradients = [
    { label: "AI · 紫色", value: "from-blue-600/20 via-purple-600/20 to-pink-600/20" },
    { label: "数据 · 青色", value: "from-emerald-600/20 via-teal-600/20 to-cyan-600/20" },
    { label: "设计 · 琥珀", value: "from-orange-600/20 via-amber-600/20 to-yellow-600/20" },
    { label: "移动 · 玫红", value: "from-rose-600/20 via-red-600/20 to-orange-600/20" },
    { label: "品牌 · 紫罗兰", value: "from-violet-600/20 via-purple-600/20 to-fuchsia-600/20" },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start lg:items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-2xl bg-background border border-border rounded-card shadow-2xl my-8">
        <div className="sticky top-0 flex items-center justify-between p-5 border-b border-border bg-background rounded-t-card">
          <h3 className="font-display font-semibold text-lg">
            {project.slug ? "编辑项目" : "新建项目"}
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
            <Field label="项目标题 *">
              <input
                className="w-full rounded-button border border-border bg-background-elevated px-3 py-2 text-sm focus:border-accent focus:outline-none"
                value={form.title}
                onChange={(e) => set("title", e.target.value)}
                placeholder="AI 智能助手平台"
              />
            </Field>
            <Field label="链接标识（自动）">
              <input
                className="w-full rounded-button border border-border bg-background-elevated px-3 py-2 text-sm focus:border-accent focus:outline-none font-mono"
                value={form.slug}
                onChange={(e) => set("slug", e.target.value)}
                placeholder="ai-copilot-platform"
              />
            </Field>
          </div>

          <Field label="副标题">
            <input
              className="w-full rounded-button border border-border bg-background-elevated px-3 py-2 text-sm focus:border-accent focus:outline-none"
              value={form.subtitle}
              onChange={(e) => set("subtitle", e.target.value)}
              placeholder="企业级 AI 智能助手平台"
            />
          </Field>

          <div className="grid grid-cols-3 gap-3">
            <Field label="分类">
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
            <Field label="年份">
              <input
                type="number"
                className="w-full rounded-button border border-border bg-background-elevated px-3 py-2 text-sm focus:border-accent focus:outline-none"
                value={form.year}
                onChange={(e) => set("year", Number(e.target.value))}
              />
            </Field>
            <Field label="精选项目">
              <label className="flex items-center h-[38px] gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={!!form.featured}
                  onChange={(e) => set("featured", e.target.checked)}
                  className="w-4 h-4 rounded accent-accent"
                />
                <span className="text-sm">首页展示</span>
              </label>
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Field label="你的角色">
              <input
                className="w-full rounded-button border border-border bg-background-elevated px-3 py-2 text-sm focus:border-accent focus:outline-none"
                value={form.role}
                onChange={(e) => set("role", e.target.value)}
                placeholder="首席产品设计师"
              />
            </Field>
            <Field label="合作方（可选）">
              <input
                className="w-full rounded-button border border-border bg-background-elevated px-3 py-2 text-sm focus:border-accent focus:outline-none"
                value={form.client || ""}
                onChange={(e) => set("client", e.target.value)}
                placeholder="ByteDance"
              />
            </Field>
          </div>

          <Field label="一句话简介">
            <textarea
              rows={2}
              className="w-full rounded-button border border-border bg-background-elevated px-3 py-2 text-sm focus:border-accent focus:outline-none resize-none"
              value={form.summary}
              onChange={(e) => set("summary", e.target.value)}
              placeholder="一句话描述这个项目"
            />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="团队规模">
              <input
                className="w-full rounded-button border border-border bg-background-elevated px-3 py-2 text-sm focus:border-accent focus:outline-none"
                value={form.teamSize || ""}
                onChange={(e) => set("teamSize", e.target.value)}
                placeholder="4 人设计团队"
              />
            </Field>
            <Field label="项目时长">
              <input
                className="w-full rounded-button border border-border bg-background-elevated px-3 py-2 text-sm focus:border-accent focus:outline-none"
                value={form.duration || ""}
                onChange={(e) => set("duration", e.target.value)}
                placeholder="6 个月"
              />
            </Field>
          </div>

          <Field label="挑战背景">
            <textarea
              rows={3}
              className="w-full rounded-button border border-border bg-background-elevated px-3 py-2 text-sm focus:border-accent focus:outline-none resize-none"
              value={form.challenge || ""}
              onChange={(e) => set("challenge", e.target.value)}
              placeholder="面临的核心问题和挑战是什么？"
            />
          </Field>

          <DynamicList
            label="设计流程"
            items={form.process || []}
            onChange={(arr) => set("process", arr)}
            placeholder="设计流程的每一步"
          />

          <DynamicList
            label="项目亮点"
            items={form.highlights || []}
            onChange={(arr) => set("highlights", arr)}
            placeholder="2-3 个核心亮点标签"
          />

          <DynamicList
            label="使用工具"
            items={form.tools || []}
            onChange={(arr) => set("tools", arr)}
            placeholder="Figma, React, Framer..."
          />

          <Field label="项目成果">
            <textarea
              rows={3}
              className="w-full rounded-button border border-border bg-background-elevated px-3 py-2 text-sm focus:border-accent focus:outline-none resize-none"
              value={form.outcome || ""}
              onChange={(e) => set("outcome", e.target.value)}
              placeholder="最终成果和影响"
            />
          </Field>

          <Field label="我的职责详情">
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
            取消
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
            保存项目
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
          <Plus size={12} /> 添加一项
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
        成果数据
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
          <Plus size={12} /> 添加数据
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
        封面图
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
            <span className="text-xs">点击上传封面图</span>
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
          或选择渐变背景
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
  const [token, setToken] = useState<string>(
    () => localStorage.getItem("figma_token") || ""
  );
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
        <Figma size={12} /> Figma 设计 — 链接 + 导入 + 截图
      </label>

      {!token ? (
        <div className="rounded-button border border-border bg-background-card p-4">
          <p className="text-sm mb-3">
            <strong className="text-foreground">开启 Figma 一键导入</strong>
            <span className="text-foreground-muted ml-2">
              在 Figma 开发者设置中生成个人访问 Token{" "}
              <a
                href="https://www.figma.com/settings/developers#personal-access-tokens"
                target="_blank"
                rel="noreferrer"
                className="text-accent hover:underline font-mono text-xs"
              >
                前往设置
              </a>
            </span>
          </p>
          <div className="flex gap-2">
            <input
              type={showToken ? "text" : "password"}
              className="flex-1 rounded-button border border-border bg-background-elevated px-3 py-2 text-sm font-mono focus:border-accent focus:outline-none"
              placeholder="figd_xxxxxxxxxxxxxxxxxxxxxxxxx"
              value={token}
              onChange={(e) => saveToken(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowToken(!showToken)}
              className="px-3 text-xs text-foreground-muted hover:text-foreground"
            >
              {showToken ? "隐藏" : "显示"}
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between rounded-button border border-green-500/30 bg-green-500/5 px-3 py-2">
          <span className="text-xs font-mono text-green-400">
            ✓ Figma Token 已保存
          </span>
          <button
            type="button"
            onClick={() => saveToken("")}
            className="text-xs text-foreground-muted hover:text-red-400"
          >
            清除
          </button>
        </div>
      )}

      <div>
        <p className="text-[11px] text-foreground-subtle mb-2">
          Figma 文件链接
        </p>
        <div className="flex gap-2">
          <input
            className={`flex-1 rounded-button border bg-background-elevated px-3 py-2 text-sm focus:outline-none font-mono ${
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
          {valid && token && (
            <button
              type="button"
              onClick={() => setImportOpen(true)}
              className="rounded-button bg-accent hover:bg-accent-hover text-background px-4 py-2 text-sm font-medium whitespace-nowrap inline-flex items-center gap-1.5"
            >
              <Figma size={14} /> 导入
            </button>
          )}
        </div>
        {url && valid && parsed && (
          <div className="mt-2 text-xs flex items-center gap-2 text-green-400 font-mono">
            <Figma size={12} />
            {parsed.fileKey}
            {parsed.nodeId && ` · 节点 ${parsed.nodeId}`}
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="text-accent hover:underline ml-2"
            >
              在 Figma 中打开 ↗
            </a>
          </div>
        )}
      </div>

      <div>
        <p className="text-[11px] text-foreground-subtle mb-2">
          或手动上传导出的截图（PNG / JPG）
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
                    type="button"
                    onClick={() => moveImage(i, -1)}
                    disabled={i === 0}
                    className="p-1.5 rounded-button bg-background border border-border disabled:opacity-30"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    onClick={() => moveImage(i, 1)}
                    disabled={i === images.length - 1}
                    className="p-1.5 rounded-button bg-background border border-border disabled:opacity-30"
                  >
                    →
                  </button>
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="p-1.5 rounded-button bg-red-500/80 hover:bg-red-500"
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
          <span>上传截图</span>
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp"
            multiple
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
      </div>

      {importOpen && parsed && token && (
        <FigmaImportModal
          fileKey={parsed.fileKey}
          initialNodeId={parsed.nodeId}
          token={token}
          onClose={() => setImportOpen(false)}
          onImport={(imgs) => {
            onChangeImages([...images, ...imgs]);
            setImportOpen(false);
          }}
        />
      )}
    </div>
  );
}

function FigmaImportModal({
  fileKey,
  initialNodeId,
  token,
  onClose,
  onImport,
}: {
  fileKey: string;
  initialNodeId?: string;
  token: string;
  onClose: () => void;
  onImport: (images: string[]) => void;
}) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [frames, setFrames] = useState<FigmaFrame[]>([]);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [fetching, setFetching] = useState(false);
  const [progress, setProgress] = useState("");

  useEffect(() => {
    fetchFigmaFile(
      `https://www.figma.com/file/${fileKey}${
        initialNodeId ? `?node-id=${initialNodeId.replace(":", "-")}` : ""
      }`,
      token
    )
      .then((info) => {
        setFrames(info?.frames || []);
      })
      .catch((e) => setError(e.message || "加载 Figma 文件失败"))
      .finally(() => setLoading(false));
  }, [fileKey, initialNodeId, token]);

  const toggle = (id: string) => {
    setSelected((prev) => {
      const n = new Set(prev);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });
  };

  const toggleAll = () => {
    if (selected.size === frames.length) setSelected(new Set());
    else setSelected(new Set(frames.map((f) => f.id)));
  };

  const handleImport = async () => {
    const ids = Array.from(selected);
    if (ids.length === 0) return;
    setFetching(true);
    setProgress(`正在获取 ${ids.length} 个画板...`);
    try {
      const imageMap = await fetchFigmaImages(fileKey, ids, token);
      const result: string[] = [];
      const entries = Object.entries(imageMap);
      for (let i = 0; i < entries.length; i++) {
        const [, figmaUrl] = entries[i];
        if (!figmaUrl) continue;
        setProgress(`正在加载图片 ${i + 1}/${entries.length}`);
        try {
          const dataUrl = await proxyImageToDataUrl(figmaUrl);
          result.push(dataUrl);
        } catch {
          /* skip */
        }
      }
      onImport(result);
    } catch (e) {
      setError(e.message || "导入失败");
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
            <h3 className="font-display font-semibold">从 Figma 导入画板</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-button hover:bg-background-card text-foreground-muted"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {loading && (
            <div className="text-center py-12 text-foreground-muted">
              正在加载 Figma 文件...
            </div>
          )}

          {error && (
            <div className="rounded-button border border-red-500/50 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
              <p className="text-xs mt-2 opacity-80">
                请确认 Token 有文件读取权限，且文件链接正确。
              </p>
            </div>
          )}

          {!loading && !error && frames.length === 0 && (
            <div className="text-center py-12 text-foreground-muted text-sm">
              没有找到画板，试试在 Figma 链接里加上具体的 node-id。
            </div>
          )}

          {!loading && frames.length > 0 && (
            <>
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs text-foreground-muted">
                  找到 {frames.length} 个画板 · 已选 {selected.size} 个
                </p>
                <button
                  type="button"
                  onClick={toggleAll}
                  className="text-xs text-accent hover:underline"
                >
                  {selected.size === frames.length ? "取消全选" : "全选"}
                </button>
              </div>
              <div className="space-y-1">
                {frames.map((f) => (
                  <label
                    key={f.id}
                    className={`flex items-center gap-3 rounded-button border px-3 py-2.5 cursor-pointer transition-colors ${
                      selected.has(f.id)
                        ? "border-accent bg-accent/10"
                        : "border-border hover:border-border/80"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selected.has(f.id)}
                      onChange={() => toggle(f.id)}
                      className="accent-accent w-4 h-4"
                    />
                    <Figma size={14} className="text-accent flex-shrink-0" />
                    <span className="text-sm truncate flex-1">{f.name}</span>
                    <span className="font-mono text-[10px] text-foreground-subtle">
                      {f.type}
                    </span>
                  </label>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="flex items-center justify-between p-4 border-t border-border">
          <p className="text-xs text-foreground-muted font-mono">
            {progress || fileKey}
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              disabled={fetching}
              className="rounded-button border border-border px-4 py-2 text-sm hover:bg-background-card disabled:opacity-50"
            >
              取消
            </button>
            <button
              type="button"
              onClick={handleImport}
              disabled={selected.size === 0 || fetching}
              className="rounded-button bg-accent hover:bg-accent-hover disabled:opacity-50 disabled:hover:bg-accent text-background px-4 py-2 text-sm font-medium"
            >
              {fetching
                ? "正在导入..."
                : `导入 ${selected.size} 个画板`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
