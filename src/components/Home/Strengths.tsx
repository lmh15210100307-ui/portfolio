import { useReveal } from "@/hooks/useReveal";
import { useI18n } from "@/hooks/useI18n";

export default function Strengths() {
  const { t } = useI18n();
  const strengths = t.strengths.items;

  return (
    <section className="relative py-24 lg:py-32 border-t border-border/50">
      <div className="container">
        <div className="max-w-2xl mb-16 lg:mb-20">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-3">
            {t.strengths.tag}
          </p>
          <h2 className="font-display font-bold text-3xl md:text-5xl leading-tight">
            {t.strengths.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {strengths.map((s, i) => (
            <StrengthCard key={i} strength={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StrengthCard({
  strength,
  index,
}: {
  strength: { title: string; desc: string };
  index: number;
}) {
  const ref = useReveal<HTMLDivElement>();
  const metrics = ["6+", "12", "8"];
  const labelsZh = ["AI 产品", "重构项目", "业务接入"];
  const labelsEn = ["AI 产品", "Refactors", "Adoptions"];
  const { isZh } = useI18n();
  const labels = isZh ? labelsZh : labelsEn;

  return (
    <div
      ref={ref}
      className="reveal group rounded-card border border-border bg-background-card p-8 lg:p-10 hover:border-accent transition-all duration-500 hover:-translate-y-1"
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="flex items-start justify-between mb-8">
        <span className="font-mono text-xs text-foreground-subtle">
          0{index + 1}
        </span>
        <span className="font-display font-bold text-5xl lg:text-6xl text-accent">
          {metrics[index]}
          <span className="text-sm font-mono text-foreground-muted ml-1 font-normal">
            {labels[index]}
          </span>
        </span>
      </div>
      <h3 className="font-display font-semibold text-xl lg:text-2xl mb-4 leading-tight">
        {strength.title}
      </h3>
      <p className="text-sm lg:text-base text-foreground-muted leading-relaxed">
        {strength.desc}
      </p>
    </div>
  );
}
