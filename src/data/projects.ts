export interface ProjectMetric {
  label: string;
  value: string;
  unit?: string;
}

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  category: "AI Product" | "B2B SaaS" | "Design System" | "Mobile App" | "Brand";
  year: number;
  role: string;
  client?: string;
  cover: string;
  coverGradient: string;
  summary: string;
  highlights: string[];
  metrics?: ProjectMetric[];
  featured?: boolean;
  challenge?: string;
  process?: string[];
  outcome?: string;
  roleDetail?: string;
  tools?: string[];
  teamSize?: string;
  duration?: string;
  figmaUrl?: string;
  figmaImages?: string[];
}

export const projects: Project[] = [
  {
    slug: "ai-copilot-platform",
    title: "AI Copilot for Enterprise",
    subtitle: "企业级 AI 智能助手平台",
    category: "AI Product",
    year: 2025,
    role: "Lead Product Designer",
    client: "Internal",
    cover: "",
    coverGradient: "from-blue-600/20 via-purple-600/20 to-pink-600/20",
    summary:
      "为百万级企业用户打造的 AI Copilot，融合大模型能力与业务场景，让复杂工作自动化。",
    highlights: ["AI Agent", "B 端 SaaS", "Design System"],
    metrics: [
      { label: "日活用户", value: "120", unit: "K" },
      { label: "任务效率", value: "3.2", unit: "x" },
      { label: "NPS", value: "48" },
    ],
    featured: true,
    challenge:
      "如何让 AI 在专业 B 端场景中既强大又可控？用户对准确性和稳定性要求极高，同时需要降低学习成本。",
    process: [
      "深度访谈 20+ 不同岗位用户，绘制任务地图",
      "定义 3 层 AI 交互模式：建议 / 自动执行 / Agent 协作",
      "设计 Prompt 模板库 + 意图识别视觉反馈",
      "A/B 测试迭代 12 轮，收敛至最优交互模型",
    ],
    outcome:
      "上线 3 个月内日活突破 12 万，核心任务完成效率提升 3.2 倍，NPS 从 22 提升至 48。",
    roleDetail: "主导产品设计全流程，负责交互框架、视觉规范和设计系统建设。",
    tools: ["Figma", "Framer", "Prototype"],
    teamSize: "4 人设计团队",
    duration: "6 个月",
  },
  {
    slug: "data-dashboard-redesign",
    title: "Data Platform 2.0",
    subtitle: "数据平台体验重塑",
    category: "B2B SaaS",
    year: 2024,
    role: "Senior Product Designer",
    client: "Finance Dept",
    cover: "",
    coverGradient: "from-emerald-600/20 via-teal-600/20 to-cyan-600/20",
    summary:
      "从信息架构到交互细节的全面重构，让数据分析从 30 分钟缩短至 3 分钟。",
    highlights: ["数据可视化", "信息架构", "复杂表格"],
    metrics: [
      { label: "分析耗时", value: "-90", unit: "%" },
      { label: "使用频率", value: "2.5", unit: "x" },
    ],
    featured: true,
    challenge:
      "原有系统信息密度过高、操作路径冗长，用户每周平均使用 2-3 次，需要提升到日常工具频率。",
    process: [
      "卡片分类法 + 树状测试重建信息架构",
      "核心流程走查，消除 17 个多余点击",
      "表格组件从零重构，支持 200+ 列流畅渲染",
    ],
    outcome:
      "用户使用频率提升 2.5 倍，单次分析耗时从 30 分钟降至 3 分钟，新功能 Adoption 达到 78%。",
    roleDetail: "负责核心路径重设计，主导信息架构重构和关键组件设计。",
    tools: ["Figma", "D3.js"],
    teamSize: "2 人",
    duration: "4 个月",
  },
  {
    slug: "design-system-unify",
    title: "Unified Design System",
    subtitle: "跨业务线统一设计系统",
    category: "Design System",
    year: 2024,
    role: "Design System Lead",
    client: "Company Wide",
    cover: "",
    coverGradient: "from-orange-600/20 via-amber-600/20 to-yellow-600/20",
    summary:
      "将 8 条业务线、3 套历史框架统一为一套设计系统，提升协作效率 5 倍。",
    highlights: ["设计令牌", "组件库", "跨团队协作"],
    metrics: [
      { label: "业务接入", value: "8", unit: "条" },
      { label: "开发效率", value: "5", unit: "x" },
    ],
    featured: true,
    challenge:
      "历史设计债务积累严重，各业务线 UI 不一致，新产品线开发效率低，需要统一但不阻塞现有业务。",
    process: [
      "组建跨团队 Core Team，制定迁移路线图",
      "定义 300+ 设计令牌与语义变量系统",
      "发布 60+ React 组件，内置设计约束",
      "建立治理机制：PR 自动检查 + 季度 Review",
    ],
    outcome:
      "8 条业务线全部接入，新功能从设计到上线平均缩短 40% 时间，开发者满意度从 3.1 提升至 4.6。",
    roleDetail: "作为 Core Team 负责人，统筹规划、设计规范制定与推广落地。",
    tools: ["Figma", "Storybook", "Tokens Studio"],
    teamSize: "5 人 Core Team",
    duration: "12 个月",
  },
  {
    slug: "workflow-mobile",
    title: "Workflow Mobile",
    subtitle: "移动端审批工作流",
    category: "Mobile App",
    year: 2023,
    role: "Product Designer",
    client: "Internal Tool",
    cover: "",
    coverGradient: "from-rose-600/20 via-red-600/20 to-orange-600/20",
    summary: "让审批随时随地发生，移动端重构后 85% 审批在 5 分钟内完成。",
    highlights: ["移动优先", "微交互", "可用性"],
    metrics: [
      { label: "移动审批占比", value: "72", unit: "%" },
      { label: "审批 SLA", value: "-60", unit: "%" },
    ],
    challenge:
      "原移动端体验差，90% 审批仍在 PC 完成，但用户 24 小时在线的需求无法满足。",
    process: [
      "移动端场景研究，总结 6 种典型使用情境",
      "信息密度分层：默认紧凑 → 长按展开详情",
      "手势驱动：左滑拒绝 / 右滑通过 / 下拉批量",
    ],
    outcome: "移动端审批占比从 10% 提升至 72%，平均审批耗时从 20 分钟降至 8 分钟。",
    roleDetail: "独立负责移动端全套设计，包括交互、视觉、动效。",
    tools: ["Figma", "Principle"],
    teamSize: "1 人",
    duration: "3 个月",
  },
  {
    slug: "brand-refresh",
    title: "Brand Refresh",
    subtitle: "品牌视觉升级",
    category: "Brand",
    year: 2023,
    role: "Brand Designer",
    client: "Company Brand",
    cover: "",
    coverGradient: "from-violet-600/20 via-purple-600/20 to-fuchsia-600/20",
    summary:
      "从 Logo 到完整视觉语言系统的焕新，支撑产品矩阵统一的品牌形象。",
    highlights: ["品牌策略", "视觉系统", "跨媒介"],
    metrics: [
      { label: "品牌认知", value: "+35", unit: "%" },
    ],
    challenge:
      "品牌老化，与新一代 AI 产品形象脱节，需要在传承与创新之间找到平衡。",
    process: [
      "品牌审计 + 竞品分析，确定'智能 · 克制 · 可信'定位",
      "Logo 优化：几何简化 + 动态图形变体",
      "设计 5 种主视觉变体，适配不同场景",
    ],
    outcome:
      "品牌识别度调研提升 35%，新视觉已应用于官网、产品、PPT 模板等 20+ 接触点。",
    roleDetail: "主导品牌视觉系统设计，联合外部团队完成落地推广。",
    tools: ["Figma", "Illustrator"],
    teamSize: "2 人 + 外部 1 人",
    duration: "5 个月",
  },
  {
    slug: "ai-design-toolkit",
    title: "AI Design Toolkit",
    subtitle: "设计师的 AI 提效工具箱",
    category: "AI Product",
    year: 2025,
    role: "Product Designer",
    client: "Internal",
    cover: "",
    coverGradient: "from-indigo-600/20 via-blue-600/20 to-cyan-600/20",
    summary:
      "让设计师在 Figma 内直接调用大模型，从文案生成到配色建议，效率翻倍。",
    highlights: ["AI 插件", "创作者工具", "Prompt Design"],
    metrics: [
      { label: "节省时间", value: "40", unit: "%" },
      { label: "周活设计师", value: "2", unit: "K+" },
    ],
    challenge:
      "AI 工具很多但割裂，设计师需要在 Figma 内外反复切换，效率损失大。",
    process: [
      "Figma Plugin 架构设计，深度嵌入设计工作流",
      "6 个核心 AI 功能：文案 / 配色 / 图标 / 布局 / 原型 / 评审",
      "Prompt 模板库 + 上下文感知注入",
    ],
    outcome: "公司内部 2000+ 设计师每周活跃使用，单项目平均节省 40% 设计时间。",
    roleDetail: "产品设计负责人，定义功能范围与交互方案。",
    tools: ["Figma", "Plugin API"],
    teamSize: "3 人",
    duration: "4 个月",
  },
];

export const getProjectBySlug = (slug: string): Project | undefined => {
  return projects.find((p) => p.slug === slug);
};

export const categories = [
  "AI Product",
  "B2B SaaS",
  "Design System",
  "Mobile App",
  "Brand",
] as const;
