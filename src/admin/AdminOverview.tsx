import { useAdminStore } from "@/store/admin";
import { FolderKanban, UserCog, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";

export default function AdminOverview() {
  const { projects, site } = useAdminStore();

  const categories = projects.reduce<Record<string, number>>((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {});

  const years = [...new Set(projects.map((p) => p.year))].sort((a, b) => b - a);

  return (
    <div className="max-w-4xl space-y-8">
      <section>
        <div className="rounded-card border border-border bg-gradient-to-br from-accent/10 via-background-card to-background-card p-8">
          <p className="font-mono text-xs uppercase tracking-wider text-accent mb-2">
            欢迎回来
          </p>
          <h2 className="font-display font-bold text-3xl mb-2">
            {site.name}
          </h2>
          <p className="text-foreground-muted">{site.tagline}</p>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link
          to="/admin/projects"
          className="group rounded-card border border-border bg-background-card p-6 hover:border-accent transition-all"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-button bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
              <FolderKanban size={18} />
            </div>
            <div>
              <p className="font-display font-semibold text-lg">作品集</p>
              <p className="font-mono text-xs text-foreground-subtle">
                共 {projects.length} 个
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {Object.entries(categories).map(([cat, count]) => (
              <span
                key={cat}
                className="font-mono text-xs text-foreground-muted rounded-pill border border-border px-2.5 py-0.5"
              >
                {cat} · {count}
              </span>
            ))}
          </div>
        </Link>

        <Link
          to="/admin/profile"
          className="group rounded-card border border-border bg-background-card p-6 hover:border-accent transition-all"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-button bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
              <UserCog size={18} />
            </div>
            <div>
              <p className="font-display font-semibold text-lg">个人资料</p>
              <p className="font-mono text-xs text-foreground-subtle">
                {site.experience.length} 段经历 · {site.skills.length} 组技能
              </p>
            </div>
          </div>
          <p className="text-sm text-foreground-muted line-clamp-2">{site.bio}</p>
        </Link>
      </section>

      <section>
        <h3 className="font-display font-semibold text-lg mb-4 flex items-center gap-2">
          <BarChart3 size={16} className="text-accent" /> 作品年份分布
        </h3>
        <div className="space-y-3">
          {years.map((year) => {
            const count = projects.filter((p) => p.year === year).length;
            const width = (count / projects.length) * 100;
            return (
              <div key={year} className="flex items-center gap-4">
                <span className="font-mono text-sm text-foreground-muted w-12">
                  {year}
                </span>
                <div className="flex-1 h-6 rounded-button bg-background-card overflow-hidden border border-border">
                  <div
                    className="h-full bg-accent/30 border-r border-accent transition-all"
                    style={{ width: `${width}%` }}
                  />
                </div>
                <span className="font-mono text-sm w-8 text-right">{count}</span>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
