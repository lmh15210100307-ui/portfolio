import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useAdminStore } from "@/store/admin";
import { useI18n } from "@/hooks/useI18n";

const keywords = ["AI", "B2B SaaS", "Design Systems", "Interaction", "Product"];

export default function Hero() {
  const site = useAdminStore((s) => s.site);
  const { t, pick } = useI18n();
  return (
    <section className="relative min-h-screen flex items-center pt-24 lg:pt-32 pb-20 lg:pb-32 overflow-hidden">
      <div className="absolute top-1/4 -left-40 gradient-glow" />
      <div className="absolute bottom-0 right-0 gradient-glow opacity-60" />

      <div className="container relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-2 mb-6 lg:mb-8"
        >
          <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
          <span className="font-mono text-[11px] sm:text-sm text-foreground-muted tracking-wide truncate">
            {t.hero.status} · {site.location}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="font-display font-bold leading-[1.05] tracking-tight"
        >
          <span className="block text-[clamp(2.25rem,12vw,8rem)]">
            {t.hero.line1}
          </span>
          <span className="block text-[clamp(2.25rem,12vw,8rem)] text-foreground-muted">
            {t.hero.line2}
          </span>
          <span className="block text-[clamp(2.25rem,12vw,8rem)] relative break-words">
            <span className="bg-gradient-to-r from-accent via-blue-400 to-purple-400 bg-clip-text text-transparent">
              {t.hero.line3}
            </span>
            <span className="inline-block w-[clamp(2rem,6vw,5rem)] h-[clamp(2rem,6vw,5rem)] align-middle ml-1 sm:ml-3 flex-shrink-0">
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1.2, repeat: Infinity }}
                className="block w-full h-1/3 bg-accent rounded-sm"
                style={{ marginTop: "15%" }}
              />
            </span>
          </span>
          <span className="block text-[clamp(2.25rem,12vw,8rem)]">
            {t.hero.line4}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          className="mt-8 max-w-xl text-lg lg:text-xl text-foreground-muted leading-relaxed"
        >
          {pick(site.tagline)}. {pick(site.name)} — {pick(site.title)}.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
          className="mt-8 lg:mt-10 flex flex-wrap gap-1.5 lg:gap-2 max-w-full"
        >
          {keywords.map((k, i) => (
            <span
              key={k}
              className="inline-flex items-center rounded-pill px-3 py-1.5 text-xs font-mono text-foreground-muted border border-border bg-background-card/50"
            >
              <span className="text-foreground-subtle mr-1.5">0{i + 1}</span>
              {k}
            </span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
          className="mt-12 flex flex-wrap items-center gap-4"
        >
          <a
            href="#work"
            className="group inline-flex items-center gap-2 rounded-button bg-foreground text-background px-6 py-3 font-medium text-sm hover:bg-accent hover:text-foreground transition-all"
          >
            {t.hero.ctaWork}
            <ArrowUpRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
          <a
            href={`mailto:${site.email}`}
            className="group inline-flex items-center gap-2 rounded-button border border-border text-foreground px-6 py-3 font-medium text-sm hover:border-accent hover:text-accent transition-all"
          >
            {t.hero.ctaContact}
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground-subtle">
            {t.hero.scroll}
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            className="w-px h-8 bg-gradient-to-b from-foreground-subtle to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}
