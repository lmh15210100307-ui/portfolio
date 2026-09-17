import { useReveal } from "@/hooks/useReveal";

const strengths = [
  {
    title: "AI-Native Design",
    desc: "深度参与 AI 产品从 0 到 1，熟悉 Prompt 设计、Agent 交互、人机协作等新模式。",
    metric: "6+",
    metricLabel: "AI 产品",
  },
  {
    title: "Complex Problem",
    desc: "擅长把复杂业务拆解为清晰的信息架构与流畅的用户路径，让 B 端产品不再难用。",
    metric: "12",
    metricLabel: "重构项目",
  },
  {
    title: "Design at Scale",
    desc: "设计系统建设经验，推动 8 条业务线统一规范，让设计效率提升 5 倍。",
    metric: "8",
    metricLabel: "业务接入",
  },
];

export default function Strengths() {
  return (
    <section className="relative py-24 lg:py-32 border-t border-border/50">
      <div className="container">
        <div className="max-w-2xl mb-16 lg:mb-20">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-3">
            What I Bring
          </p>
          <h2 className="font-display font-bold text-3xl md:text-5xl leading-tight">
            Three things I'm <br className="hidden md:block" />
            really good at.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {strengths.map((s, i) => (
            <StrengthCard key={s.title} strength={s} index={i} />
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
  strength: (typeof strengths)[number];
  index: number;
}) {
  const ref = useReveal<HTMLDivElement>();

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
          {strength.metric}
          <span className="text-sm font-mono text-foreground-muted ml-1 font-normal">
            {strength.metricLabel}
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
