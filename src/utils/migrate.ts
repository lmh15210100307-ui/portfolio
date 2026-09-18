import { TextValue } from "@/config/i18n";
import { Project, ProjectMetric } from "@/data/projects";
import { SiteConfig, LifecycleItem, ArticleItem, SeoConfig, NavVisibility } from "@/data/site";

function toBilingual(v: unknown): TextValue {
  if (v == null) return { zh: "", en: "" };
  if (typeof v === "string") return { zh: v, en: v };
  if (typeof v === "object" && v !== null) {
    const obj = v as Record<string, unknown>;
    const zh = typeof obj.zh === "string" ? obj.zh : "";
    const en = typeof obj.en === "string" ? obj.en : zh;
    return { zh, en };
  }
  return { zh: String(v), en: String(v) };
}

function toBilingualArr(arr: unknown): TextValue[] {
  if (!Array.isArray(arr)) return [];
  return arr.map((item) => toBilingual(item));
}

function migrateMetrics(metrics: unknown): ProjectMetric[] | undefined {
  if (!Array.isArray(metrics)) return undefined;
  return metrics.map((m: unknown): ProjectMetric => {
    const item = (m || {}) as Record<string, unknown>;
    return {
      label: toBilingual(item.label),
      value: typeof item.value === "string" ? item.value : String(item.value ?? ""),
      unit: item.unit != null ? String(item.unit) : undefined,
    };
  });
}

function migrateProject(p: unknown): Project {
  const src = (p || {}) as Record<string, unknown>;
  return {
    slug: typeof src.slug === "string" ? src.slug : "",
    title: toBilingual(src.title),
    subtitle: toBilingual(src.subtitle),
    category: typeof src.category === "string" ? src.category : "",
    year: typeof src.year === "number" ? src.year : new Date().getFullYear(),
    role: toBilingual(src.role),
    client: src.client != null ? toBilingual(src.client) : undefined,
    cover: typeof src.cover === "string" ? src.cover : "",
    coverGradient: typeof src.coverGradient === "string"
      ? src.coverGradient
      : "from-blue-600/20 via-purple-600/20 to-pink-600/20",
    summary: toBilingual(src.summary),
    highlights: toBilingualArr(src.highlights),
    metrics: migrateMetrics(src.metrics),
    featured: !!src.featured,
    challenge: src.challenge != null ? toBilingual(src.challenge) : undefined,
    process: toBilingualArr(src.process),
    outcome: src.outcome != null ? toBilingual(src.outcome) : undefined,
    roleDetail: src.roleDetail != null ? toBilingual(src.roleDetail) : undefined,
    tools: Array.isArray(src.tools) ? src.tools.map((x) => String(x)) : [],
    teamSize: src.teamSize != null ? String(src.teamSize) : undefined,
    duration: src.duration != null ? String(src.duration) : undefined,
    figmaUrl: typeof src.figmaUrl === "string" ? src.figmaUrl : undefined,
    figmaImages: Array.isArray(src.figmaImages)
      ? src.figmaImages.map((x) => String(x))
      : undefined,
  } as Project;
}

function migrateSite(s: unknown): SiteConfig {
  const src = (s || {}) as Record<string, unknown>;
  const social = (src.social || {}) as Record<string, unknown>;
  const skills = Array.isArray(src.skills)
    ? src.skills.map((sk: unknown) => {
        const item = (sk || {}) as Record<string, unknown>;
        return {
          category: toBilingual(item.category),
          items: toBilingualArr(item.items),
          icon: typeof item.icon === "string" ? item.icon : undefined,
        };
      })
    : [];
  const methodology = Array.isArray(src.methodology)
    ? src.methodology.map((m: unknown) => {
        const item = (m || {}) as Record<string, unknown>;
        return {
          step: typeof item.step === "string" ? item.step : "",
          title: toBilingual(item.title),
          desc: toBilingual(item.desc),
          icon: typeof item.icon === "string" ? item.icon : undefined,
        };
      })
    : [];
  const experience = Array.isArray(src.experience)
    ? src.experience.map((e: unknown) => {
        const item = (e || {}) as Record<string, unknown>;
        return {
          year: typeof item.year === "string" ? item.year : "",
          role: toBilingual(item.role),
          company: toBilingual(item.company),
          desc: toBilingual(item.desc),
        };
      })
    : [];

  const lifecycle: LifecycleItem[] = Array.isArray(src.lifecycle)
    ? src.lifecycle.map((it: unknown): LifecycleItem => {
        const o = (it || {}) as Record<string, unknown>;
        return {
          id: typeof o.id === "string" ? o.id : crypto.randomUUID(),
          title: toBilingual(o.title),
          content: toBilingual(o.content),
          image: typeof o.image === "string" ? o.image : undefined,
          pinned: !!o.pinned,
          createdAt: typeof o.createdAt === "number" ? o.createdAt : Date.now(),
        };
      })
    : [];

  const articles: ArticleItem[] = Array.isArray(src.articles)
    ? src.articles.map((a: unknown): ArticleItem => {
        const o = (a || {}) as Record<string, unknown>;
        return {
          id: typeof o.id === "string" ? o.id : crypto.randomUUID(),
          title: toBilingual(o.title),
          slug: typeof o.slug === "string" ? o.slug : "",
          excerpt: toBilingual(o.excerpt),
          content: typeof o.content === "string" ? o.content : "",
          category: typeof o.category === "string" ? o.category : "",
          cover: typeof o.cover === "string" ? o.cover : undefined,
          tags: toBilingualArr(o.tags),
          publishedAt: typeof o.publishedAt === "number" ? o.publishedAt : Date.now(),
          hidden: !!o.hidden,
        };
      })
    : [];

  const seo: SeoConfig = (() => {
    if (src.seo && typeof src.seo === "object") {
      const s = src.seo as Record<string, unknown>;
      return { title: toBilingual(s.title), description: toBilingual(s.description) };
    }
    return { title: toBilingual(src.name), description: toBilingual(src.bio) };
  })();

  const navVisibility: NavVisibility = (() => {
    if (src.navVisibility && typeof src.navVisibility === "object") {
      const n = src.navVisibility as Record<string, unknown>;
      return {
        home: n.home !== false,
        work: n.work !== false,
        about: n.about !== false,
        contact: n.contact !== false,
      };
    }
    return { home: true, work: true, about: true, contact: true };
  })();

  return {
    name: toBilingual(src.name),
    initials: toBilingual(src.initials),
    title: toBilingual(src.title),
    tagline: toBilingual(src.tagline),
    location: typeof src.location === "string" ? src.location : "",
    email: typeof src.email === "string" ? src.email : "",
    bio: toBilingual(src.bio),
    philosophy: toBilingual(src.philosophy),
    philosophyHighlight: toBilingual(src.philosophyHighlight),
    social: {
      linkedin: typeof social.linkedin === "string" ? social.linkedin : "",
      dribbble: typeof social.dribbble === "string" ? social.dribbble : "",
      github: typeof social.github === "string" ? social.github : "",
      twitter: typeof social.twitter === "string" ? social.twitter : "",
    },
    skills,
    methodology,
    experience,
    lifecycle,
    articles,
    seo,
    navVisibility,
  } as SiteConfig;
}

export interface StoredData {
  projects: Project[];
  site: SiteConfig;
  savedAt?: string;
}

function isOldFormat(data: StoredData): boolean {
  if (data.projects && data.projects.length > 0) {
    const p = data.projects[0] as unknown as Record<string, unknown>;
    if (typeof p.title === "string") return true;
    if (p.title == null) return true;
  }
  if (data.site) {
    const s = data.site as unknown as Record<string, unknown>;
    if (typeof s.name === "string") return true;
  }
  return false;
}

export function migrateToBilingual(data: StoredData): StoredData {
  if (!isOldFormat(data)) return data;
  return {
    projects: Array.isArray(data.projects)
      ? data.projects.map(migrateProject)
      : [],
    site: migrateSite(data.site),
    savedAt: data.savedAt,
  };
}

export function needsMigration(data: StoredData): boolean {
  return isOldFormat(data);
}
