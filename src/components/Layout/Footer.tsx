import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useAdminStore } from "@/store/admin";

export default function Footer() {
  const site = useAdminStore((s) => s.site);
  const year = new Date().getFullYear();
  return (
    <footer className="relative z-10 border-t border-border bg-background">
      <div className="container py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-card bg-accent/10 border border-accent/30 flex items-center justify-center font-display font-bold text-accent text-sm">
                {site.initials}
              </div>
              <span className="font-display font-semibold text-lg">
                {site.name}
              </span>
            </div>
            <p className="text-foreground-muted text-sm leading-relaxed max-w-sm mb-8">
              {site.philosophyHighlight}
            </p>
            <a
              href={`mailto:${site.email}`}
              className="group inline-flex items-center gap-2 font-display text-2xl lg:text-3xl font-semibold hover:text-accent transition-colors"
            >
              {site.email}
              <ArrowUpRight
                size={24}
                className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </a>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-foreground-subtle mb-4">
              Navigate
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-sm text-foreground-muted hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/work" className="text-sm text-foreground-muted hover:text-foreground transition-colors">
                  Work
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-foreground-muted hover:text-foreground transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-foreground-muted hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h4 className="text-xs font-mono uppercase tracking-wider text-foreground-subtle mb-4">
              Elsewhere
            </h4>
            <ul className="space-y-3">
              {Object.entries(site.social).map(([key, url]) => (
                <li key={key}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-2 text-sm text-foreground-muted hover:text-foreground transition-colors"
                  >
                    <span className="capitalize">{key}</span>
                    <ArrowUpRight
                      size={14}
                      className="opacity-0 -ml-1 group-hover:opacity-100 group-hover:ml-0 transition-all"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs font-mono text-foreground-subtle">
            © {year} {site.name}. Crafted with care.
          </p>
          <p className="text-xs font-mono text-foreground-subtle">
            {site.location}
          </p>
        </div>
      </div>
    </footer>
  );
}
