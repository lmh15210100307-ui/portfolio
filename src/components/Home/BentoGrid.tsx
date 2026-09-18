import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useAdminStore } from "@/store/admin";
import { Project } from "@/data/projects";
import Badge from "@/components/UI/Badge";
import { useReveal } from "@/hooks/useReveal";
import { useI18n } from "@/hooks/useI18n";
import { TextValue } from "@/config/i18n";

function BentoCard({
  project,
  variant = "default",
}: {
  project: Project;
  variant?: "default" | "large" | "tall" | "wide";
}) {
  const ref = useReveal<HTMLDivElement>();
  const { t, pick } = useI18n();

  const gridClasses = {
    default: "col-span-1 md:col-span-2 lg:col-span-3 lg:row-span-1",
    large: "col-span-full md:col-span-6 lg:col-span-6 lg:row-span-2",
    tall: "col-span-1 md:col-span-3 lg:col-span-3 lg:row-span-2",
    wide: "col-span-full md:col-span-6 lg:col-span-6 lg:row-span-1",
  };

  return (
    <Link
      to={`/work/${project.slug}`}
      className={`group relative ${gridClasses[variant]} reveal block rounded-card overflow-hidden border border-border bg-background-card hover:border-accent transition-all duration-500 hover:-translate-y-1`}
    >
      <div
        ref={ref}
        className={`absolute inset-0 bg-gradient-to-br ${project.coverGradient} opacity-60 group-hover:opacity-80 transition-opacity duration-500`}
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.08),transparent_60%)]" />

      <div className={`relative h-full min-h-[220px] md:min-h-[260px] ${
        variant === "large" || variant === "tall"
          ? "lg:min-h-[360px]"
          : "lg:min-h-[220px]"
      } p-6 md:p-7 flex flex-col justify-between`}>
        <div className="flex items-start justify-between">
          <div className="flex flex-wrap gap-1.5">
            {(project.highlights as TextValue[]).slice(0, 2).map((h, idx) => (
              <Badge key={idx} variant="outline" size="sm">
                {pick(h)}
              </Badge>
            ))}
          </div>
          <span className="font-mono text-xs text-foreground-subtle">
            {project.year}
          </span>
        </div>

        <div className="mt-auto">
          <h3 className="font-display font-semibold text-xl md:text-2xl lg:text-3xl leading-tight mb-1.5 group-hover:text-accent transition-colors">
            {pick(project.title as TextValue)}
          </h3>
          <p className="text-sm text-foreground-muted line-clamp-2 max-w-md">
            {pick(project.subtitle as TextValue)} · {pick(project.summary as TextValue)}
          </p>

          <div className="mt-4 flex items-center gap-2 text-foreground-muted group-hover:text-foreground transition-colors">
            <span className="font-mono text-xs uppercase tracking-wider">
            {t.bento.viewCase}
            </span>
            <motion.span
              initial={{ x: 0, y: 0 }}
              whileHover={{ x: 3, y: -3 }}
              transition={{ duration: 0.2 }}
            >
              <ArrowUpRight size={16} />
            </motion.span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function BentoGrid() {
  const projects = useAdminStore((s) => s.projects);
  const { t } = useI18n();
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <section id="work" className="relative py-24 lg:py-32">
      <div className="container">
        <div className="flex items-end justify-between mb-12 lg:mb-16">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-3">
              {t.bento.tag}
            </p>
            <h2 className="font-display font-bold text-3xl md:text-5xl leading-tight">
              {t.bento.title}
            </h2>
          </div>
          <Link
            to="/work"
            className="hidden md:inline-flex items-center gap-2 text-sm text-foreground-muted hover:text-foreground transition-colors group"
          >
            {t.bento.viewAll}
            <ArrowUpRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 gap-4 md:gap-5 lg:gap-6 auto-rows-[minmax(0,auto)]">
          <BentoCard project={featured[0]} variant="large" />
          <BentoCard project={featured[1]} variant="tall" />
          <BentoCard project={featured[2]} variant="default" />
          <BentoCard project={others[0] || projects[3]} variant="default" />
          <BentoCard project={others[1] || projects[4]} variant="wide" />
        </div>

        <div className="mt-10 md:hidden">
          <Link
            to="/work"
            className="inline-flex items-center gap-2 text-sm text-foreground-muted hover:text-foreground transition-colors"
          >
            {t.bento.viewAllMobile}
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
