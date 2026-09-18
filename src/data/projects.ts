import { TextValue } from "@/config/i18n";

export interface ProjectMetric {
  label: TextValue;
  value: string;
  unit?: string;
}

export interface Project {
  slug: string;
  title: TextValue;
  subtitle: TextValue;
  category: string;
  year: number;
  role: TextValue;
  client?: TextValue;
  cover: string;
  coverGradient: string;
  summary: TextValue;
  highlights: TextValue[];
  metrics?: ProjectMetric[];
  featured?: boolean;
  challenge?: TextValue;
  process?: TextValue[];
  outcome?: TextValue;
  roleDetail?: TextValue;
  tools?: string[];
  teamSize?: string;
  duration?: string;
  figmaUrl?: string;
  figmaImages?: string[];
}

const t = (zh: string, en: string): TextValue => ({ zh, en });

export const projects: Project[] = [
  {
    slug: "ai-copilot-platform",
    title: t("企业级 AI Copilot 平台", "Enterprise AI Copilot Platform"),
    subtitle: t("让 AI 真正理解业务的智能助手", "An AI assistant that truly understands the business"),
    category: "AI 产品",
    year: 2025,
    role: t("首席产品设计师", "Lead Product Designer"),
    client: t("内部项目", "Internal"),
    cover: "",
    coverGradient: "from-blue-600/20 via-purple-600/20 to-pink-600/20",
    summary: t(
      "为百万级企业用户打造的 AI Copilot，融合大模型能力与业务场景，让复杂工作自动化。",
      "An AI Copilot for millions of enterprise users, fusing LLM capabilities with business scenarios to automate complex work."
    ),
    highlights: [
      t("AI Agent", "AI Agent"),
      t("B 端 SaaS", "B2B SaaS"),
      t("设计系统", "Design System"),
    ],
    metrics: [
      { label: t("日活用户", "Daily Active Users"), value: "120", unit: "K" },
      { label: t("任务效率", "Task Efficiency"), value: "3.2", unit: "x" },
      { label: "NPS", value: "48" },
    ],
    featured: true,
    challenge: t(
      "如何让 AI 在专业 B 端场景中既强大又可控？用户对准确性和稳定性要求极高，同时需要降低学习成本。",
      "How to make AI both powerful and controllable in professional B2B scenarios? Users demand extreme accuracy and stability, while learning costs must stay low."
    ),
    process: [
      t(
        "深度访谈 20+ 不同岗位用户，绘制任务地图",
        "Deep interviews with 20+ users across roles, mapped task flows"
      ),
      t(
        "定义 3 层 AI 交互模式：建议 / 自动执行 / Agent 协作",
        "Defined 3 tiers of AI interaction: Suggest / Auto-execute / Agent collaboration"
      ),
      t(
        "设计 Prompt 模板库 + 意图识别视觉反馈",
        "Designed Prompt template library + intent recognition visual feedback"
      ),
      t(
        "A/B 测试迭代 12 轮，收敛至最优交互模型",
        "12 rounds of A/B testing, converged to the optimal interaction model"
      ),
    ],
    outcome: t(
      "上线 3 个月内日活突破 12 万，核心任务完成效率提升 3.2 倍，NPS 从 22 提升至 48。",
      "Within 3 months post-launch, DAU broke 120K, core task efficiency improved 3.2×, NPS rose from 22 to 48."
    ),
    roleDetail: t(
      "主导产品设计全流程，负责交互框架、视觉规范和设计系统建设。",
      "Led the full product design flow — interaction framework, visual system, and design system."
    ),
    tools: ["Figma", "Framer", "Prototype"],
    teamSize: "4 人设计团队",
    duration: "6 个月",
  },
  {
    slug: "data-dashboard-redesign",
    title: t("数据平台 2.0", "Data Platform 2.0"),
    subtitle: t("从 30 分钟到 3 分钟的体验重塑", "From 30 minutes to 3 minutes — reimagined"),
    category: "B2B SaaS",
    year: 2024,
    role: t("高级产品设计师", "Senior Product Designer"),
    client: t("财务部门", "Finance Team"),
    cover: "",
    coverGradient: "from-emerald-600/20 via-teal-600/20 to-cyan-600/20",
    summary: t(
      "从信息架构到交互细节的全面重构，让数据分析从 30 分钟缩短至 3 分钟。",
      "A full rebuild from IA to interaction details — cut data analysis from 30 minutes to 3 minutes."
    ),
    highlights: [
      t("数据可视化", "Data Visualization"),
      t("信息架构", "Information Architecture"),
      t("复杂表格", "Complex Tables"),
    ],
    metrics: [
      { label: t("分析耗时", "Analysis Time"), value: "-90", unit: "%" },
      { label: t("使用频率", "Usage Frequency"), value: "2.5", unit: "x" },
    ],
    featured: true,
    challenge: t(
      "原有系统信息密度过高、操作路径冗长，用户每周平均使用 2-3 次，需要提升到日常工具频率。",
      "Legacy system suffered from extreme information density and long operation paths. Users averaged only 2-3 uses/week — needed to become a daily tool."
    ),
    process: [
      t("卡片分类法 + 树状测试重建信息架构", "Card sorting + tree testing to rebuild IA"),
      t("核心流程走查，消除 17 个多余点击", "Core flow walkthrough — eliminated 17 redundant clicks"),
      t("表格组件从零重构，支持 200+ 列流畅渲染", "Table component rebuilt from scratch — smooth rendering for 200+ columns"),
    ],
    outcome: t(
      "用户使用频率提升 2.5 倍，单次分析耗时从 30 分钟降至 3 分钟，新功能 Adoption 达到 78%。",
      "Usage frequency rose 2.5×, per-analysis time dropped from 30 to 3 minutes, new feature adoption hit 78%."
    ),
    roleDetail: t(
      "负责核心路径重设计，主导信息架构重构和关键组件设计。",
      "Led core path redesign, IA restructuring, and key component design."
    ),
    tools: ["Figma", "D3.js"],
    teamSize: "2 人",
    duration: "4 个月",
  },
  {
    slug: "design-system-unify",
    title: t("统一设计系统", "Unified Design System"),
    subtitle: t("让 8 条业务线设计效率提升 5 倍", "5× design efficiency across 8 product lines"),
    category: "设计系统",
    year: 2024,
    role: t("设计系统负责人", "Design System Lead"),
    client: t("全公司", "Company-wide"),
    cover: "",
    coverGradient: "from-orange-600/20 via-amber-600/20 to-yellow-600/20",
    summary: t(
      "将 8 条业务线、3 套历史框架统一为一套设计系统，提升协作效率 5 倍。",
      "Unified 8 product lines and 3 legacy frameworks into one design system — 5× collaboration efficiency."
    ),
    highlights: [
      t("设计令牌", "Design Tokens"),
      t("组件库", "Component Library"),
      t("跨团队协作", "Cross-team Collaboration"),
    ],
    metrics: [
      { label: t("业务接入", "Adopted By"), value: "8", unit: "条" },
      { label: t("开发效率", "Dev Efficiency"), value: "5", unit: "x" },
    ],
    featured: true,
    challenge: t(
      "历史设计债务积累严重，各业务线 UI 不一致，新产品线开发效率低，需要统一但不阻塞现有业务。",
      "Severe design debt, inconsistent UI across lines, low dev efficiency for new lines. Needed unification without blocking existing business."
    ),
    process: [
      t("组建跨团队 Core Team，制定迁移路线图", "Cross-team Core Team, migration roadmap"),
      t("定义 300+ 设计令牌与语义变量系统", "Defined 300+ design tokens & semantic variables"),
      t("发布 60+ React 组件，内置设计约束", "Shipped 60+ React components with built-in constraints"),
      t("建立治理机制：PR 自动检查 + 季度 Review", "Governance: PR auto-checks + quarterly reviews"),
    ],
    outcome: t(
      "8 条业务线全部接入，新功能从设计到上线平均缩短 40% 时间，开发者满意度从 3.1 提升至 4.6。",
      "All 8 lines adopted. Time from design to launch shortened by 40% on average. Developer satisfaction rose from 3.1 to 4.6."
    ),
    roleDetail: t(
      "作为 Core Team 负责人，统筹规划、设计规范制定与推广落地。",
      "As Core Team lead — planning, spec definition, rollout, and adoption."
    ),
    tools: ["Figma", "Storybook", "Tokens Studio"],
    teamSize: "5 人 Core Team",
    duration: "12 个月",
  },
  {
    slug: "workflow-mobile",
    title: t("移动端审批工作流", "Mobile Approval Workflow"),
    subtitle: t("85% 审批在 5 分钟内完成", "85% of approvals done within 5 minutes"),
    category: "移动端",
    year: 2023,
    role: t("产品设计师", "Product Designer"),
    client: t("内部工具", "Internal Tools"),
    cover: "",
    coverGradient: "from-rose-600/20 via-red-600/20 to-orange-600/20",
    summary: t(
      "让审批随时随地发生，移动端重构后 85% 审批在 5 分钟内完成。",
      "Approvals anytime, anywhere. After the mobile rebuild, 85% of approvals complete within 5 minutes."
    ),
    highlights: [
      t("移动优先", "Mobile First"),
      t("微交互", "Micro-interactions"),
      t("可用性", "Usability"),
    ],
    metrics: [
      { label: t("移动审批占比", "Mobile Approval Share"), value: "72", unit: "%" },
      { label: t("审批 SLA", "Approval SLA"), value: "-60", unit: "%" },
    ],
    challenge: t(
      "原移动端体验差，90% 审批仍在 PC 完成，但用户 24 小时在线的需求无法满足。",
      "Poor mobile experience — 90% of approvals still on PC, but users need 24/7 availability."
    ),
    process: [
      t("移动端场景研究，总结 6 种典型使用情境", "Mobile scenario research — identified 6 key use cases"),
      t("信息密度分层：默认紧凑 → 长按展开详情", "Layered density: compact default → long-press to expand details"),
      t("手势驱动：左滑拒绝 / 右滑通过 / 下拉批量", "Gesture-driven: swipe left to reject, right to approve, pull-down for batch"),
    ],
    outcome: t(
      "移动端审批占比从 10% 提升至 72%，平均审批耗时从 20 分钟降至 8 分钟。",
      "Mobile approval share rose from 10% to 72%. Average approval time dropped from 20 to 8 minutes."
    ),
    roleDetail: t(
      "独立负责移动端全套设计，包括交互、视觉、动效。",
      "Owned the full mobile design — interaction, visual, and motion."
    ),
    tools: ["Figma", "Principle"],
    teamSize: "1 人",
    duration: "3 个月",
  },
  {
    slug: "brand-refresh",
    title: t("品牌视觉焕新", "Brand Visual Refresh"),
    subtitle: t("从 Logo 到完整视觉语言系统", "From logo to a complete visual language system"),
    category: "品牌",
    year: 2023,
    role: t("品牌设计师", "Brand Designer"),
    client: t("公司品牌", "Corporate Brand"),
    cover: "",
    coverGradient: "from-violet-600/20 via-purple-600/20 to-fuchsia-600/20",
    summary: t(
      "从 Logo 到完整视觉语言系统的焕新，支撑产品矩阵统一的品牌形象。",
      "A visual language refresh — from logo to system — supporting a unified brand across the product matrix."
    ),
    highlights: [
      t("品牌策略", "Brand Strategy"),
      t("视觉系统", "Visual System"),
      t("跨媒介", "Cross-media"),
    ],
    metrics: [
      { label: t("品牌认知", "Brand Awareness"), value: "+35", unit: "%" },
    ],
    challenge: t(
      "品牌老化，与新一代 AI 产品形象脱节，需要在传承与创新之间找到平衡。",
      "Aging brand disconnected from a new generation of AI products. Needed balance between heritage and innovation."
    ),
    process: [
      t("品牌审计 + 竞品分析，确定'智能 · 克制 · 可信'定位", "Brand audit + competitive analysis — positioned as 'Intelligent · Restrained · Trustworthy'"),
      t("Logo 优化：几何简化 + 动态图形变体", "Logo refinement: geometric simplification + dynamic variants"),
      t("设计 5 种主视觉变体，适配不同场景", "5 primary visual variants for different contexts"),
    ],
    outcome: t(
      "品牌识别度调研提升 35%，新视觉已应用于官网、产品、PPT 模板等 20+ 接触点。",
      "Brand recognition rose 35%. New visual language applied across 20+ touchpoints — website, products, PPT templates, etc."
    ),
    roleDetail: t(
      "主导品牌视觉系统设计，联合外部团队完成落地推广。",
      "Led the brand visual system design, partnered with external teams for rollout."
    ),
    tools: ["Figma", "Illustrator"],
    teamSize: "2 人 + 外部 1 人",
    duration: "5 个月",
  },
  {
    slug: "ai-design-toolkit",
    title: t("设计师 AI 提效工具箱", "AI Toolkit for Designers"),
    subtitle: t("让设计效率翻倍的 Figma 插件", "A Figma plugin that doubles design efficiency"),
    category: "AI 产品",
    year: 2025,
    role: t("产品设计师", "Product Designer"),
    client: t("内部项目", "Internal"),
    cover: "",
    coverGradient: "from-indigo-600/20 via-blue-600/20 to-cyan-600/20",
    summary: t(
      "让设计师在 Figma 内直接调用大模型，从文案生成到配色建议，效率翻倍。",
      "Lets designers call LLMs directly inside Figma — from copy generation to color suggestions — doubling efficiency."
    ),
    highlights: [
      t("AI 插件", "AI Plugin"),
      t("创作者工具", "Creator Tool"),
      t("Prompt Design", "Prompt Design"),
    ],
    metrics: [
      { label: t("节省时间", "Time Saved"), value: "40", unit: "%" },
      { label: t("周活设计师", "Weekly Active Designers"), value: "2", unit: "K+" },
    ],
    challenge: t(
      "AI 工具很多但割裂，设计师需要在 Figma 内外反复切换，效率损失大。",
      "Many AI tools but fragmented — designers constantly switched in/out of Figma, losing efficiency."
    ),
    process: [
      t("Figma Plugin 架构设计，深度嵌入设计工作流", "Figma Plugin architecture — deeply embedded in design workflow"),
      t("6 个核心 AI 功能：文案 / 配色 / 图标 / 布局 / 原型 / 评审", "6 core AI features: copy / color / icon / layout / prototype / review"),
      t("Prompt 模板库 + 上下文感知注入", "Prompt template library + context-aware injection"),
    ],
    outcome: t(
      "公司内部 2000+ 设计师每周活跃使用，单项目平均节省 40% 设计时间。",
      "2000+ internal designers use it weekly — average 40% design time saved per project."
    ),
    roleDetail: t(
      "产品设计负责人，定义功能范围与交互方案。",
      "Product design lead — defined feature scope and interaction approach."
    ),
    tools: ["Figma", "Plugin API"],
    teamSize: "3 人",
    duration: "4 个月",
  },
];

export const getProjectBySlug = (slug: string): Project | undefined => {
  return projects.find((p) => p.slug === slug);
};

export const categories = [
  "AI 产品",
  "B2B SaaS",
  "设计系统",
  "移动端",
  "品牌",
] as const;
