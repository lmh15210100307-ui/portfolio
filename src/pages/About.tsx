import { motion } from "framer-motion";
import { LayoutGrid, Sparkles, Layers, Code, Mail, MapPin } from "lucide-react";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { useAdminStore } from "@/store/admin";
import { useReveal } from "@/hooks/useReveal";

const iconMap: Record<string, React.ReactNode> = {
  LayoutGrid: <LayoutGrid size={20} />,
  Sparkles: <Sparkles size={20} />,
  Layers: <Layers size={20} />,
  Code: <Code size={20} />,
};

export default function About() {
  const site = useAdminStore((s) => s.site);
  return (
    <div className="relative">
      <div className="noise-bg" />
      <Header />
      <main className="relative z-10 pt-24 lg:pt-32 pb-24 lg:pb-32">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-24 lg:mb-32"
          >
            <div className="lg:col-span-5">
              <div className="aspect-square rounded-card bg-gradient-to-br from-accent/30 via-purple-500/20 to-pink-500/20 flex items-center justify-center relative overflow-hidden max-w-sm mx-auto lg:mx-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.1),transparent_60%)]" />
                <span className="relative font-display font-bold text-6xl sm:text-7xl lg:text-9xl text-foreground/20">
                  {site.initials}
                </span>
              </div>
            </div>
            <div className="lg:col-span-7 flex flex-col justify-center">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-3">
                About Me
              </p>
              <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl leading-tight mb-6">
                Hi, I'm {site.name}. <br />
                <span className="text-foreground-muted">I design for </span>
                <span className="bg-gradient-to-r from-accent via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  clarity &amp; impact
                </span>
                .
              </h1>
              <p className="text-lg text-foreground-muted leading-relaxed max-w-2xl">
                {site.bio}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-foreground-muted">
                <span className="inline-flex items-center gap-2">
                  <MapPin size={14} />
                  {site.location}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Mail size={14} />
                  {site.email}
                </span>
              </div>
            </div>
          </motion.div>

          <div className="mb-24 lg:mb-32">
            <SectionTitle label="Methodology" title="How I approach design" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {site.methodology.map((m, i) => (
                <MethodCard key={m.step} item={m} index={i} />
              ))}
            </div>
          </div>

          <div className="mb-24 lg:mb-32">
            <SectionTitle label="Skills" title="Toolbox & capabilities" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {site.skills.map((s, i) => (
                <SkillCard key={s.category} skill={s} index={i} />
              ))}
            </div>
          </div>

          <div>
            <SectionTitle label="Experience" title="Career path" />
            <div className="relative">
              <div className="absolute left-4 lg:left-5 top-0 bottom-0 w-px bg-border" />
              <div className="space-y-8 lg:space-y-10">
                {site.experience.map((exp, i) => (
                  <ExpItem key={i} exp={exp} index={i} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function SectionTitle({ label, title }: { label: string; title: string }) {
  return (
    <div className="mb-10 lg:mb-14">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-3">
        {label}
      </p>
      <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl">
        {title}
      </h2>
    </div>
  );
}

function MethodCard({
  item,
  index,
}: {
  item: { step: string; title: string; desc: string };
  index: number;
}) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className="reveal group rounded-card border border-border bg-background-card p-6 lg:p-7 hover:border-accent transition-all duration-500"
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="font-mono text-xs text-accent mb-4">{item.step}</div>
      <h3 className="font-display font-semibold text-lg lg:text-xl mb-3">
        {item.title}
      </h3>
      <p className="text-sm text-foreground-muted leading-relaxed">
        {item.desc}
      </p>
    </div>
  );
}

function SkillCard({
  skill,
  index,
}: {
  skill: { category: string; icon: string; items: string[] };
  index: number;
}) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className="reveal rounded-card border border-border bg-background-card p-6 lg:p-7"
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-9 h-9 rounded-button bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
          {iconMap[skill.icon]}
        </div>
        <h3 className="font-display font-semibold text-lg">{skill.category}</h3>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {skill.items.map((item) => (
          <span
            key={item}
            className="text-xs font-mono text-foreground-muted rounded-pill border border-border px-2.5 py-1"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function ExpItem({
  exp,
  index,
}: {
  exp: { year: string; role: string; company: string; desc: string };
  index: number;
}) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className="reveal relative pl-12 lg:pl-16">
      <div className="absolute left-2.5 lg:left-3.5 top-2 w-3 h-3 rounded-full bg-accent ring-4 ring-background" />
      <span className="font-mono text-xs text-foreground-subtle block mb-1">
        {exp.year}
      </span>
      <h3 className="font-display font-semibold text-lg lg:text-xl">
        {exp.role}
        <span className="text-foreground-muted font-normal text-base ml-2">
          @ {exp.company}
        </span>
      </h3>
      <p className="mt-2 text-sm lg:text-base text-foreground-muted leading-relaxed">
        {exp.desc}
      </p>
    </div>
  );
}
