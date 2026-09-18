import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useAdminStore } from "@/store/admin";
import { useReveal } from "@/hooks/useReveal";
import { useI18n } from "@/hooks/useI18n";

export default function Philosophy() {
  const site = useAdminStore((s) => s.site);
  const ref = useReveal<HTMLDivElement>();
  const { t } = useI18n();

  return (
    <section className="relative py-24 lg:py-32 border-t border-border/50 overflow-hidden">
      <div className="absolute inset-0 gradient-glow opacity-40" />
      <div className="container relative">
        <div
          ref={ref}
          className="reveal max-w-4xl mx-auto text-center"
        >
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-8">
            {t.philosophy.tag}
          </p>
          <blockquote className="font-display font-semibold text-2xl md:text-4xl lg:text-5xl leading-[1.2] mb-10">
            "{site.philosophy}"
          </blockquote>
          <Link
            to="/about"
            className="group inline-flex items-center gap-2 rounded-button border border-border text-foreground-muted hover:text-foreground hover:border-accent px-6 py-3 text-sm font-medium transition-all"
          >
            {t.philosophy.cta}
            <ArrowUpRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
