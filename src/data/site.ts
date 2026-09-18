export interface SiteConfig {
  name: string;
  initials: string;
  title: string;
  tagline: string;
  location: string;
  email: string;
  bio: string;
  philosophy: string;
  philosophyHighlight: string;
  social: {
    linkedin: string;
    dribbble: string;
    github: string;
    twitter: string;
  };
  skills: {
    category: string;
    icon: string;
    items: string[];
  }[];
  methodology: {
    step: string;
    title: string;
    desc: string;
  }[];
  experience: {
    year: string;
    role: string;
    company: string;
    desc: string;
  }[];
}

export const siteConfig: SiteConfig = {
  name: "NAVI",
  initials: "NV",
  title: "B 端 AI & Interaction Designer",
  tagline: "让复杂产品，像说话一样自然",
  location: "Shanghai, China",
  email: "hello@navi.design",
  bio: "6 年 B 端产品设计经验，专注于 AI 产品与企业级 SaaS。相信好的设计是技术、业务与人性的精准交汇。主导过跨业务线设计系统建设、百万级用户 AI 产品从 0 到 1，以及多次复杂产品的体验重构。",
  philosophy: "设计不是最后的修饰，而是从问题定义开始的系统性思考。我热衷于把复杂拆到原子，再把每个原子都设计好。",
  philosophyHighlight: "每个像素，每次交互，每个决定 — 皆有意。",
  social: {
    linkedin: "https://linkedin.com/in/navi-design",
    dribbble: "https://dribbble.com/navi-design",
    github: "https://github.com/navi-design",
    twitter: "https://twitter.com/navi_design",
  },
  skills: [
    {
      category: "产品设计",
      icon: "LayoutGrid",
      items: [
        "交互设计",
        "信息架构",
        "用户研究",
        "可用性测试",
        "交互原型",
        "产品思维",
      ],
    },
    {
      category: "AI & 新技术",
      icon: "Sparkles",
      items: [
        "Prompt Engineering",
        "AI Agent 设计",
        "人机协作模式",
        "智能交互",
        "多模态 UI",
        "AI 评估方法",
      ],
    },
    {
      category: "设计系统",
      icon: "Layers",
      items: [
        "设计令牌 (Tokens)",
        "组件库建设",
        "规范治理",
        "跨团队协作",
        "DesignOps",
        "Figma 高级功能",
      ],
    },
    {
      category: "技术 & 工具",
      icon: "Code",
      items: [
        "Figma",
        "Sketch",
        "React",
        "Tailwind CSS",
        "Framer",
        "AE 动效",
      ],
    },
  ],
  methodology: [
    {
      step: "01",
      title: "理解",
      desc: "深入业务，理解用户、利益相关方与数据，定义真问题而非假设。",
    },
    {
      step: "02",
      title: "框定",
      desc: "将问题结构化，找到核心矛盾与设计杠杆点，对齐团队方向。",
    },
    {
      step: "03",
      title: "探索",
      desc: "快速发散方案，用原型而非描述验证想法，包容失败。",
    },
    {
      step: "04",
      title: "打磨",
      desc: "聚焦收敛，打磨每个细节，让设计从能用变好用、爱用。",
    },
    {
      step: "05",
      title: "交付",
      desc: "清晰的交付 + 持续的数据复盘，让设计价值可度量。",
    },
  ],
  experience: [
    {
      year: "2023 — 至今",
      role: "高级产品设计师",
      company: "字节跳动",
      desc: "负责企业级 AI Copilot 产品设计，主导跨业务线设计系统统一，团队 15+ 人。",
    },
    {
      year: "2021 — 2023",
      role: "产品设计师",
      company: "美团",
      desc: "商家后台数据平台体验重构，设计首个商家 AI 助手，覆盖百万级 B 端用户。",
    },
    {
      year: "2020 — 2021",
      role: "UX 设计师",
      company: "腾讯",
      desc: "企业微信协作工具设计，参与移动端产品从 0 到 1，用户增长 10 倍。",
    },
    {
      year: "2019 — 2020",
      role: "初级设计师",
      company: "创业公司",
      desc: "B 端 SaaS 产品设计师，完整参与一个产品从 MVP 到付费的全过程。",
    },
  ],
};
