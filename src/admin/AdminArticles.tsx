import { useAdminStore } from "@/store/admin";
import { useI18n } from "@/hooks/useI18n";
import { ArticleItem } from "@/data/site";
import RichEditor from "@/components/Editor/RichEditor";
import { Plus, Pencil, Trash2, X, Star, Calendar, Tag } from "lucide-react";
import { useState, useMemo } from "react";
import { TextValue } from "@/config/i18n";

function emptyArticle(): ArticleItem {
  return {
    id: crypto.randomUUID(),
    title: { zh: "", en: "" },
    slug: "",
    excerpt: { zh: "", en: "" },
    content: "",
    category: "",
    tags: [],
    publishedAt: Date.now(),
    hidden: false,
  };
}

function slugify(v: string): string {
  return v
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\u4e00-\u9fa5\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function formatDate(ts: number): string {
  const d = new Date(ts);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export default function AdminArticles() {
  const { t, pick } = useI18n();
  const site = useAdminStore((s) => s.site);
  const updateSite = useAdminStore((s) => s.updateSite);
  const articles = site.articles || [];

  const [editing, setEditing] = useState<ArticleItem | null>(null);
  const [tagInput, setTagInput] = useState("");

  const sorted = useMemo(
    () => [...articles].sort((a, b) => b.publishedAt - a.publishedAt),
    [articles]
  );

  const openNew = () => {
    setEditing(emptyArticle());
  };

  const openEdit = (a: ArticleItem) => {
    const b = (v: TextValue): { zh: string; en: string } =>
      typeof v === "string" ? { zh: v, en: v } : { zh: v.zh, en: v.en };
    setEditing({
      ...a,
      title: b(a.title),
      excerpt: b(a.excerpt),
      tags: a.tags.map((t) => b(t)),
    });
  };

  const handleSave = () => {
    if (!editing) return;
    let list = [...articles];
    const existingIdx = list.findIndex((x) => x.id === editing.id);
    if (existingIdx >= 0) {
      list[existingIdx] = editing;
    } else {
      list.unshift(editing);
    }
    updateSite({ articles: list });
    setEditing(null);
  };

  const handleDelete = (id: string) => {
    if (!window.confirm(t.adminArticles.confirmDelete)) return;
    updateSite({ articles: articles.filter((a) => a.id !== id) });
  };

  const toggleHidden = (id: string) => {
    updateSite({
      articles: articles.map((a) => (a.id === id ? { ...a, hidden: !a.hidden } : a)),
    });
  };

  return (
    <div className="max-w-6xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-2">
            {t.adminArticles.title}
          </p>
          <h2 className="font-display font-bold text-2xl md:text-3xl">{t.adminArticles.subtitle}</h2>
        </div>
        <button
          onClick={openNew}
          className="inline-flex items-center gap-2 rounded-button bg-foreground text-background px-4 py-2 text-sm font-medium hover:bg-accent transition-colors"
        >
          <Plus size={16} /> {t.adminArticles.newArticle}
        </button>
      </div>

      {sorted.length === 0 ? (
        <div className="rounded-card border border-border bg-background-card p-12 text-center text-foreground-muted">
          {t.adminArticles.emptyHint}
        </div>
      ) : (
        <div className="rounded-card border border-border bg-background-card overflow-hidden">
          <div className="divide-y divide-border">
            {sorted.map((a) => (
              <div
                key={a.id}
                className={`p-5 flex items-start gap-4 hover:bg-background-elevated/30 transition-colors ${a.hidden ? "opacity-60" : ""}`}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <h3 className="font-display font-semibold text-lg truncate">{pick(a.title) || "(无标题)"}</h3>
                    {a.hidden && (
                      <span className="font-mono text-[10px] text-foreground-subtle rounded-pill border border-border px-1.5 py-0.5">
                        {t.adminArticles.hidden}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-foreground-muted line-clamp-2 mb-2">{pick(a.excerpt)}</p>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-foreground-subtle">
                    {a.category && (
                      <span className="inline-flex items-center gap-1">
                        <Tag size={11} /> {a.category}
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1">
                      <Calendar size={11} /> {formatDate(a.publishedAt)}
                    </span>
                    {a.tags.filter((t) => pick(t)).map((t, i) => (
                      <span key={i} className="font-mono text-[10px] rounded-pill border border-border px-1.5 py-0.5">
                        #{pick(t)}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button
                    onClick={() => toggleHidden(a.id)}
                    title={a.hidden ? t.adminArticles.hiddenShow : t.adminArticles.hiddenHide}
                    className="p-2 rounded-button text-foreground-muted hover:text-foreground hover:bg-background-elevated transition-colors"
                  >
                    {a.hidden ? <Star size={15} /> : <Star size={15} />}
                  </button>
                  <button
                    onClick={() => openEdit(a)}
                    className="p-2 rounded-button text-foreground-muted hover:text-foreground hover:bg-background-elevated transition-colors"
                  >
                    <Pencil size={15} />
                  </button>
                  <button
                    onClick={() => handleDelete(a.id)}
                    className="p-2 rounded-button text-foreground-muted hover:text-red-400 hover:bg-background-elevated transition-colors"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {editing && (
        <ArticleEditorModal
          article={editing}
          onChange={(p) => setEditing(p)}
          onClose={() => setEditing(null)}
          onSave={handleSave}
          tagInput={tagInput}
          setTagInput={setTagInput}
        />
      )}
    </div>
  );
}

interface Props {
  article: ArticleItem;
  onChange: (a: ArticleItem) => void;
  onClose: () => void;
  onSave: () => void;
  tagInput: string;
  setTagInput: (s: string) => void;
}

function ArticleEditorModal({ article, onChange, onClose, onSave, tagInput, setTagInput }: Props) {
  const { t, pick, isZh } = useI18n();

  const setTitle = (lang: "zh" | "en", v: string) => {
    const cur = typeof article.title === "string" ? { zh: article.title, en: article.title } : { ...article.title };
    cur[lang] = v;
    onChange({ ...article, title: cur });
  };
  const setExcerpt = (lang: "zh" | "en", v: string) => {
    const cur = typeof article.excerpt === "string" ? { zh: article.excerpt, en: article.excerpt } : { ...article.excerpt };
    cur[lang] = v;
    onChange({ ...article, excerpt: cur });
  };
  const autoSlug = (fromZh: string) => {
    if (!article.slug) onChange({ ...article, slug: slugify(fromZh) });
  };

  const addTag = () => {
    const v = tagInput.trim();
    if (!v) return;
    const newTags: TextValue[] = [...article.tags, isZh ? { zh: v, en: v } : { zh: v, en: v }];
    onChange({ ...article, tags: newTags });
    setTagInput("");
  };
  const removeTag = (i: number) => {
    const next = article.tags.filter((_, idx) => idx !== i);
    onChange({ ...article, tags: next });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-3xl rounded-card bg-background border border-border shadow-2xl my-12">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h3 className="font-display font-semibold text-lg">{t.adminArticles.editArticle}</h3>
          <button onClick={onClose} className="p-1 rounded hover:bg-background-elevated">
            <X size={18} />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-foreground-muted mb-1.5">
                {t.adminArticles.title} (ZH)
              </label>
              <input
                className="w-full rounded-button border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:border-accent"
                placeholder={t.adminArticles.titlePH}
                value={typeof article.title === "string" ? article.title : article.title.zh}
                onChange={(e) => {
                  setTitle("zh", e.target.value);
                  autoSlug(e.target.value);
                }}
              />
            </div>
            <div>
              <label className="block text-xs text-foreground-muted mb-1.5">
                {t.adminArticles.title} (EN)
              </label>
              <input
                className="w-full rounded-button border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:border-accent"
                placeholder={t.adminArticles.titlePH}
                value={typeof article.title === "string" ? article.title : article.title.en}
                onChange={(e) => setTitle("en", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-foreground-muted mb-1.5">{t.adminArticles.slug}</label>
              <input
                className="w-full rounded-button border border-border bg-background px-3 py-2 text-sm font-mono focus:outline-none focus:border-accent"
                placeholder={t.adminArticles.slugPH}
                value={article.slug}
                onChange={(e) => onChange({ ...article, slug: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs text-foreground-muted mb-1.5">{t.adminArticles.category}</label>
              <input
                className="w-full rounded-button border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:border-accent"
                placeholder={t.adminArticles.categoryPH}
                value={article.category}
                onChange={(e) => onChange({ ...article, category: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs text-foreground-muted mb-1.5">{t.adminArticles.publishedAt}</label>
              <input
                type="date"
                className="w-full rounded-button border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:border-accent"
                value={new Date(article.publishedAt).toISOString().slice(0, 10)}
                onChange={(e) => onChange({ ...article, publishedAt: new Date(e.target.value).getTime() })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-foreground-muted mb-1.5">{t.adminArticles.excerpt} (ZH)</label>
              <textarea
                rows={2}
                className="w-full rounded-button border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:border-accent resize-none"
                placeholder={t.adminArticles.excerptPH}
                value={typeof article.excerpt === "string" ? article.excerpt : article.excerpt.zh}
                onChange={(e) => setExcerpt("zh", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs text-foreground-muted mb-1.5">{t.adminArticles.excerpt} (EN)</label>
              <textarea
                rows={2}
                className="w-full rounded-button border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:border-accent resize-none"
                placeholder={t.adminArticles.excerptPH}
                value={typeof article.excerpt === "string" ? article.excerpt : article.excerpt.en}
                onChange={(e) => setExcerpt("en", e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-foreground-muted mb-1.5">{t.adminArticles.content}</label>
            <RichEditor
              value={article.content}
              onChange={(html) => onChange({ ...article, content: html })}
              placeholder={t.adminArticles.excerptPH}
              minHeight={240}
              maxHeight={480}
            />
          </div>

          <div>
            <label className="block text-xs text-foreground-muted mb-1.5">{t.adminArticles.tags}</label>
            <div className="flex gap-2">
              <input
                className="flex-1 rounded-button border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:border-accent"
                placeholder="tag..."
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTag();
                  }
                }}
              />
              <button
                onClick={addTag}
                className="rounded-button border border-border px-3 py-2 text-sm hover:bg-background-elevated"
              >
                +
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {article.tags.map((t, i) => (
                <span
                  key={i}
                  className="font-mono text-xs text-foreground-muted rounded-pill border border-border px-2 py-0.5 inline-flex items-center gap-1"
                >
                  #{pick(t)}
                  <button onClick={() => removeTag(i)} className="hover:text-red-400">
                    <X size={10} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <label className="inline-flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={!!article.hidden}
                onChange={(e) => onChange({ ...article, hidden: e.target.checked })}
                className="w-4 h-4 rounded accent-accent"
              />
              {t.adminArticles.hidden}
              <span className="text-xs text-foreground-subtle">— {t.adminArticles.hiddenHint}</span>
            </label>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-border bg-background-elevated/30 rounded-b-card">
          <button
            onClick={onClose}
            className="rounded-button border border-border px-4 py-2 text-sm hover:bg-background-elevated"
          >
            {t.adminArticles.cancel}
          </button>
          <button
            onClick={onSave}
            className="rounded-button bg-foreground text-background px-4 py-2 text-sm font-medium hover:bg-accent transition-colors"
          >
            {t.adminArticles.save}
          </button>
        </div>
      </div>
    </div>
  );
}
