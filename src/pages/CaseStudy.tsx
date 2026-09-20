import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  Target,
  Sparkles,
  BarChart3,
  Figma,
  ImageIcon,
} from "lucide-react";
import { useAdminStore } from "@/store/admin";
import Badge from "@/components/UI/Badge";
import { buildFigmaEmbedUrl, parseFigmaUrl } from "@/utils/figma";
import { useI18n } from "@/hooks/useI18n";

export default function CaseStudy() {
  const projects = useAdminStore((s) => s.projects);
  const { t, pick } = useI18n();
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? projects.find((p) => p.slug === slug) : undefined;

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background">
        <h1 className="font-display text-3xl mb-4">{t.caseStudy.notFound}</h1>
        <Link
          to="/work"
          className="inline-flex items-center gap-2 text-accent hover:underline"
        >
          <ArrowLeft size={16} /> {t.caseStudy.back}
        </Link>
      </div>
    );
  }

  const related = projects.filter(
    (p) => p.category === project.category && p.slug !== project.slug
  );

  const hasProcess = project.process && project.process.length > 0;
  const processItems = hasProcess
    ? (project.process as any[]).map((p) => pick(p))
    : t.caseStudy.defaultProcess;

  return (
    <div className="pt-24 lg:pt-32">
        <div
          className={`relative py-20 lg:py-32 bg-gradient-to-br ${project.coverGradient}`}
        >
          <div className="absolute inset-0 bg-background/60" />
          <div className="container relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link
                to="/work"
                className="inline-flex items-center gap-2 text-sm text-foreground-muted hover:text-foreground mb-8 transition-colors"
              >
                <ArrowLeft size={16} /> {t.caseStudy.all}
              </Link>
              <div className="flex flex-wrap gap-2 mb-6">
                <Badge variant="accent">{project.category}</Badge>
                <span className="font-mono text-xs text-foreground-muted self-center">
                  {project.year}
                </span>
              </div>
              <h1 className="font-display font-bold text-4xl md:text-6xl lg:text-7xl leading-tight mb-6">
                {pick(project.title)}
              </h1>
              <p className="text-lg lg:text-xl text-foreground-muted max-w-2xl">
                {pick(project.subtitle)}
              </p>
            </motion.div>
          </div>
        </div>

        <div className="container py-12 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
            <aside className="lg:col-span-4">
              <div className="space-y-8 lg:sticky lg:top-28">
                <InfoRow label={t.caseStudy.role} value={pick(project.role)} />
                <InfoRow
                  label={t.caseStudy.client}
                  value={pick(project.client) || t.caseStudy.internal}
                />
                <InfoRow label={t.caseStudy.duration} value={project.duration || "—"} />
                <InfoRow label={t.caseStudy.team} value={project.teamSize || "—"} />
                <div className="pt-6 border-t border-border">
                  <p className="font-mono text-xs uppercase tracking-wider text-foreground-subtle mb-3">
                    {t.caseStudy.tools}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {(project.tools || []).map((tool) => (
                      <Badge key={tool} variant="outline" size="sm">
                        {tool}
                      </Badge>
                    ))}
                  </div>
                </div>
                {project.figmaUrl && parseFigmaUrl(project.figmaUrl) && (
                  <a
                    href={project.figmaUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 rounded-button border border-border bg-background-card hover:border-accent hover:bg-accent/5 px-3 py-2.5 transition-all group"
                  >
                    <Figma size={16} className="text-accent" />
                    <span className="text-sm font-medium">{t.caseStudy.viewInFigma}</span>
                    <ArrowUpRight
                      size={14}
                      className="ml-auto text-foreground-muted group-hover:text-accent transition-colors"
                    />
                  </a>
                )}
              </div>
            </aside>

            <article className="lg:col-span-8 space-y-16 lg:space-y-20">
              {project.metrics && project.metrics.length > 0 && (
                <section>
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                    {project.metrics.map((m, idx) => (
                      <div
                        key={idx}
                        className="rounded-card border border-border bg-background-card p-6 lg:p-8"
                      >
                        <BarChart3
                          size={18}
                          className="text-accent mb-4"
                        />
                        <div className="font-display font-bold text-3xl lg:text-4xl">
                          {m.value}
                          {m.unit && (
                            <span className="text-sm font-mono text-foreground-muted ml-1.5">
                              {m.unit}
                            </span>
                          )}
                        </div>
                        <div className="text-xs font-mono uppercase tracking-wider text-foreground-muted mt-1">
                          {pick(m.label)}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              <section>
                <SectionHeader
                  icon={<Target size={18} className="text-accent" />}
                  label={t.caseStudy.challenge}
                  title={t.caseStudy.challengeTitle}
                />
                <p className="text-lg lg:text-xl leading-relaxed text-foreground/90">
                  {pick(project.challenge) || pick(project.summary)}
                </p>
              </section>

              <section>
                <SectionHeader
                  icon={<Sparkles size={18} className="text-accent" />}
                  label={t.caseStudy.process}
                  title={t.caseStudy.processTitle}
                />
                <div className="space-y-4">
                  {processItems.map((step: string, i: number) => (
                    <div
                      key={i}
                      className="flex gap-4 items-start rounded-button border border-border bg-background-card p-4 lg:p-5"
                    >
                      <div className="font-mono text-sm text-foreground-subtle pt-0.5 min-w-[2rem]">
                        0{i + 1}
                      </div>
                      <p className="text-sm lg:text-base leading-relaxed">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <SectionHeader
                  icon={<CheckCircle2 size={18} className="text-accent" />}
                  label={t.caseStudy.outcome}
                  title={t.caseStudy.outcomeTitle}
                />
                <p className="text-lg lg:text-xl leading-relaxed text-foreground/90">
                  {pick(project.outcome) || t.caseStudy.outcomeFallback}
                </p>
              </section>

              <section>
                <SectionHeader label={t.caseStudy.roleLabel} title={t.caseStudy.roleTitle} />
                <p className="text-lg leading-relaxed text-foreground/90">
                  {pick(project.roleDetail) || pick(project.role)}
                </p>
              </section>

              {project.figmaUrl && parseFigmaUrl(project.figmaUrl) && (
                <section>
                  <SectionHeader
                    icon={<Figma size={18} className="text-accent" />}
                    label={t.caseStudy.design}
                    title={t.caseStudy.designTitle}
                  />
                  <div className="rounded-card border border-border overflow-hidden bg-background-card">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                      <div className="flex items-center gap-2">
                        <Figma size={16} className="text-accent" />
                        <span className="text-sm font-medium">
                          {parseFigmaUrl(project.figmaUrl)?.fileName || t.caseStudy.figmaFile}
                        </span>
                      </div>
                      <a
                        href={project.figmaUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 text-xs text-accent hover:underline"
                      >
                        {t.caseStudy.openNewTab} <ArrowUpRight size={12} />
                      </a>
                    </div>
                    <div className="aspect-video w-full bg-black/20">
                      <iframe
                        src={buildFigmaEmbedUrl(project.figmaUrl) || undefined}
                        className="w-full h-full"
                        allow="fullscreen"
                        loading="lazy"
                      />
                    </div>
                    <p className="text-xs text-foreground-subtle mt-2 font-mono px-4 py-2">
                      {parseFigmaUrl(project.figmaUrl)?.fileKey}
                      {parseFigmaUrl(project.figmaUrl)?.nodeId &&
                        ` · node ${parseFigmaUrl(project.figmaUrl)?.nodeId}`}
                    </p>
                  </div>
                </section>
              )}

              {project.figmaImages && project.figmaImages.length > 0 && (
                <section>
                  <SectionHeader
                    icon={<ImageIcon size={18} className="text-accent" />}
                    label={t.caseStudy.screens}
                    title={t.caseStudy.screensTitle}
                  />
                  <div className="space-y-4">
                    {project.figmaImages.map((img, i) => (
                      <figure
                        key={i}
                        className="protected-media rounded-card border border-border overflow-hidden bg-background-card"
                      >
                        <img
                          src={img}
                          alt={`${t.caseStudy.screens} ${i + 1}`}
                          className="w-full h-auto select-none"
                          loading="lazy"
                          draggable={false}
                        />
                        <figcaption className="px-4 py-2 border-t border-border text-xs font-mono text-foreground-subtle">
                          {t.caseStudy.screens} {i + 1}
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                </section>
              )}
            </article>
          </div>
        </div>

        {related.length > 0 && (
          <section className="border-t border-border/50 py-20 lg:py-28">
            <div className="container">
              <h2 className="font-display font-bold text-3xl md:text-4xl mb-10">
                  {t.caseStudy.moreInCategory} · {project.category}
                </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {related.slice(0, 3).map((r) => (
                  <Link
                    key={r.slug}
                    to={`/work/${r.slug}`}
                    className="group rounded-card overflow-hidden border border-border bg-background-card hover:border-accent transition-all duration-500"
                  >
                    <div
                      className={`aspect-[4/3] bg-gradient-to-br ${r.coverGradient}`}
                    />
                    <div className="p-5">
                      <h3 className="font-display font-semibold mb-1 group-hover:text-accent transition-colors">
                        {pick(r.title)}
                      </h3>
                      <p className="text-sm text-foreground-muted line-clamp-1">
                        {pick(r.summary)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
    </div>
  );
}

function SectionHeader({
  icon,
  label,
  title,
}: {
  icon?: React.ReactNode;
  label: string;
  title: string;
}) {
  return (
    <div className="mb-6 lg:mb-8">
      <div className="flex items-center gap-2 mb-3">
        {icon}
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-foreground-muted">
          {label}
        </span>
      </div>
      <h2 className="font-display font-bold text-2xl lg:text-3xl">{title}</h2>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-wider text-foreground-subtle mb-1">
        {label}
      </p>
      <p className="text-sm lg:text-base text-foreground">{value}</p>
    </div>
  );
}
