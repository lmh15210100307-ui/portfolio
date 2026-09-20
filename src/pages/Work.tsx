import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useAdminStore } from "@/store/admin";
import { categories, Project } from "@/data/projects";
import { useReveal } from "@/hooks/useReveal";
import { useI18n } from "@/hooks/useI18n";

export default function Work() {
  const projects = useAdminStore((s) => s.projects);
  const { t, pick } = useI18n();
  const [filter, setFilter] = useState<string>("all");
  const filtered =
    filter === "all"
      ? projects
      : projects.filter((p) => p.category === filter);

  return (
    <div className="pt-24 lg:pt-32 pb-24 lg:pb-32">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 lg:mb-20"
        >
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-3">
            {t.work.tag}
          </p>
          <h1 className="font-display font-bold text-4xl md:text-6xl lg:text-7xl leading-tight">
            {t.work.title}
          </h1>
          <p className="mt-6 text-foreground-muted max-w-xl">
            {t.work.subtitle}
          </p>
        </motion.div>

        <div className="flex flex-wrap gap-2 mb-10 lg:mb-12">
          <FilterButton
            active={filter === "all"}
            onClick={() => setFilter("all")}
          >
            {t.work.all}
          </FilterButton>
          {categories.map((c) => (
            <FilterButton
              key={c}
              active={filter === c}
              onClick={() => setFilter(c)}
            >
              {c}
            </FilterButton>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </div>
    </div>
  );
}

function FilterButton({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-pill px-4 py-2 text-sm font-medium border transition-colors duration-200 ${
        active
          ? "bg-foreground text-background border-foreground"
          : "text-foreground-muted border-border hover:border-border-light hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const ref = useReveal<HTMLAnchorElement>();
  const { t, pick } = useI18n();
  return (
    <Link
      ref={ref}
      to={`/work/${project.slug}`}
      className="reveal group block rounded-card overflow-hidden border border-border bg-background-card hover:border-accent transition-all duration-500 hover:-translate-y-1"
    >
      <div
        className={`relative aspect-[4/3] bg-gradient-to-br ${project.coverGradient} flex items-center justify-center overflow-hidden`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.1),transparent_60%)]" />
        <span className="relative font-display font-bold text-4xl lg:text-5xl opacity-30 group-hover:opacity-60 group-hover:scale-110 transition-all duration-500">
          {pick(project.title).charAt(0)}
        </span>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-xs text-foreground-subtle">
            {project.category}
          </span>
          <span className="font-mono text-xs text-foreground-subtle">
            {project.year}
          </span>
        </div>
        <h3 className="font-display font-semibold text-lg lg:text-xl mb-1 group-hover:text-accent transition-colors">
          {pick(project.title)}
        </h3>
        <p className="text-sm text-foreground-muted line-clamp-2">
          {pick(project.summary)}
        </p>
        <div className="mt-4 flex items-center gap-1 text-xs font-mono text-foreground-muted group-hover:text-accent transition-colors">
          {t.work.viewCase}
          <ArrowUpRight size={14} />
        </div>
      </div>
    </Link>
  );
}
