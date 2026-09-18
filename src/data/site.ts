import { TextValue } from "@/config/i18n";

export interface SiteConfig {
  name: TextValue;
  initials: TextValue;
  title: TextValue;
  tagline: TextValue;
  location: string;
  email: string;
  bio: TextValue;
  philosophy: TextValue;
  philosophyHighlight: TextValue;
  social: {
    linkedin: string;
    dribbble: string;
    github: string;
    twitter: string;
  };
  skills: {
    category: TextValue;
    icon: string;
    items: TextValue[];
  }[];
  methodology: {
    step: string;
    title: TextValue;
    desc: TextValue;
  }[];
  experience: {
    year: string;
    role: TextValue;
    company: TextValue;
    desc: TextValue;
  }[];
}

export const siteConfig: SiteConfig = {
  name: { zh: "NAVI", en: "NAVI" },
  initials: { zh: "NV", en: "NV" },
  title: { zh: "B 端 AI & Interaction Designer", en: "B2B AI & Interaction Designer" },
  tagline: { zh: "让复杂产品，像说话一样自然", en: "Making complex products feel as natural as conversation" },
  location: "Shanghai, China",
  email: "hello@navi.design",
  bio: {
    zh: "6 年 B 端产品设计经验，专注于 AI 产品与企业级 SaaS。相信好的设计是技术、业务与人性的精准交汇。主导过跨业务线设计系统建设、百万级用户 AI 产品从 0 到 1，以及多次复杂产品的体验重构。",
    en: "6+ years of B2B product design, focused on AI products and enterprise SaaS. I believe great design lives at the precise intersection of technology, business, and human nature. Led cross-line design systems, shipped AI products from 0 to 1 with millions of users, and rebuilt experiences for numerous complex products.",
  },
  philosophy: {
    zh: "设计不是最后的修饰，而是从问题定义开始的系统性思考。我热衷于把复杂拆到原子，再把每个原子都设计好。",
    en: "Design isn't the final polish — it's systematic thinking that starts at problem definition. I love breaking complexity down to atoms, then designing every single one well.",
  },
  philosophyHighlight: {
    zh: "每个像素，每次交互，每个决定 — 皆有意。",
    en: "Every pixel, every interaction, every decision — intentional.",
  },
  social: {
    linkedin: "https://linkedin.com/in/navi-design",
    dribbble: "https://dribbble.com/navi-design",
    github: "https://github.com/navi-design",
    twitter: "https://twitter.com/navi_design",
  },
  skills: [
    {
      category: { zh: "产品设计", en: "Product Design" },
      icon: "LayoutGrid",
      items: [
        { zh: "交互设计", en: "Interaction Design" },
        { zh: "信息架构", en: "Information Architecture" },
        { zh: "用户研究", en: "User Research" },
        { zh: "可用性测试", en: "Usability Testing" },
        { zh: "交互原型", en: "Interactive Prototyping" },
        { zh: "产品思维", en: "Product Thinking" },
      ],
    },
    {
      category: { zh: "AI & 新技术", en: "AI & New Tech" },
      icon: "Sparkles",
      items: [
        { zh: "Prompt Engineering", en: "Prompt Engineering" },
        { zh: "AI Agent 设计", en: "AI Agent Design" },
        { zh: "人机协作模式", en: "Human-AI Collaboration" },
        { zh: "智能交互", en: "Intelligent Interaction" },
        { zh: "多模态 UI", en: "Multimodal UI" },
        { zh: "AI 评估方法", en: "AI Evaluation Methods" },
      ],
    },
    {
      category: { zh: "设计系统", en: "Design Systems" },
      icon: "Layers",
      items: [
        { zh: "设计令牌 (Tokens)", en: "Design Tokens" },
        { zh: "组件库建设", en: "Component Libraries" },
        { zh: "规范治理", en: "Governance" },
        { zh: "跨团队协作", en: "Cross-team Collaboration" },
        { zh: "DesignOps", en: "DesignOps" },
        { zh: "Figma 高级功能", en: "Figma Advanced" },
      ],
    },
    {
      category: { zh: "技术 & 工具", en: "Tech & Tools" },
      icon: "Code",
      items: [
        "Figma",
        "Sketch",
        "React",
        "Tailwind CSS",
        "Framer",
        { zh: "AE 动效", en: "AE Motion" },
      ],
    },
  ],
  methodology: [
    {
      step: "01",
      title: { zh: "理解", en: "Understand" },
      desc: { zh: "深入业务，理解用户、利益相关方与数据，定义真问题而非假设。", en: "Deep dive into the business — users, stakeholders, data. Define the real problem, not assumptions." },
    },
    {
      step: "02",
      title: { zh: "框定", en: "Frame" },
      desc: { zh: "将问题结构化，找到核心矛盾与设计杠杆点，对齐团队方向。", en: "Structure the problem, find the core tension and design leverage points, align the team." },
    },
    {
      step: "03",
      title: { zh: "探索", en: "Explore" },
      desc: { zh: "快速发散方案，用原型而非描述验证想法，包容失败。", en: "Diverge rapidly. Prototype instead of describing. Embrace failure." },
    },
    {
      step: "04",
      title: { zh: "打磨", en: "Refine" },
      desc: { zh: "聚焦收敛，打磨每个细节，让设计从能用变好用、爱用。", en: "Converge with focus. Polish every detail — from usable to delightful." },
    },
    {
      step: "05",
      title: { zh: "交付", en: "Deliver" },
      desc: { zh: "清晰的交付 + 持续的数据复盘，让设计价值可度量。", en: "Clear handoff + continuous data review. Make design value measurable." },
    },
  ],
  experience: [
    {
      year: "2023 — 至今",
      role: { zh: "高级产品设计师", en: "Senior Product Designer" },
      company: { zh: "字节跳动", en: "ByteDance" },
      desc: { zh: "负责企业级 AI Copilot 产品设计，主导跨业务线设计系统统一，团队 15+ 人。", en: "Led enterprise AI Copilot product design, unified cross-business design systems, led a team of 15+." },
    },
    {
      year: "2021 — 2023",
      role: { zh: "产品设计师", en: "Product Designer" },
      company: { zh: "美团", en: "Meituan" },
      desc: { zh: "商家后台数据平台体验重构，设计首个商家 AI 助手，覆盖百万级 B 端用户。", en: "Rebuilt the merchant data platform, designed the first merchant AI assistant serving millions of B2B users." },
    },
    {
      year: "2020 — 2021",
      role: { zh: "UX 设计师", en: "UX Designer" },
      company: { zh: "腾讯", en: "Tencent" },
      desc: { zh: "企业微信协作工具设计，参与移动端产品从 0 到 1，用户增长 10 倍。", en: "Designed WeCom collaboration tools, shipped mobile product from 0 to 1, 10× user growth." },
    },
    {
      year: "2019 — 2020",
      role: { zh: "初级设计师", en: "Junior Designer" },
      company: { zh: "创业公司", en: "Startup" },
      desc: { zh: "B 端 SaaS 产品设计师，完整参与一个产品从 MVP 到付费的全过程。", en: "B2B SaaS product designer, full lifecycle from MVP to paid product." },
    },
  ],
};
