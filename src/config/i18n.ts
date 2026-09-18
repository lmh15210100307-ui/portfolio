export type Lang = "zh" | "en";

export interface Dict {
  nav: { home: string; work: string; about: string; contact: string };
  hero: {
    status: string;
    line1: string;
    line2: string;
    line3: string;
    line4: string;
    ctaWork: string;
    ctaContact: string;
    scroll: string;
  };
  bento: {
    tag: string;
    title: string;
    viewAll: string;
    viewAllMobile: string;
    viewCase: string;
  };
  strengths: {
    tag: string;
    title: string;
    items: { title: string; desc: string }[];
  };
  philosophy: { tag: string; cta: string };
  work: {
    tag: string;
    title: string;
    subtitle: string;
    all: string;
    viewCase: string;
  };
  about: {
    tag: string;
    greeting: string;
    bioLead: string;
    bioHighlight: string;
    methodTag: string;
    methodTitle: string;
    skillTag: string;
    skillTitle: string;
    expTag: string;
    expTitle: string;
  };
  contact: {
    tag: string;
    title1: string;
    title2: string;
    intro: string;
    email: string;
    location: string;
    elsewhere: string;
    formTitle: string;
    subject: string;
    subjectPH: string;
    message: string;
    messagePH: string;
    send: string;
  };
  caseStudy: {
    notFound: string;
    back: string;
    all: string;
    role: string;
    client: string;
    internal: string;
    duration: string;
    team: string;
    tools: string;
    viewInFigma: string;
    openNewTab: string;
    figmaFile: string;
    challenge: string;
    challengeTitle: string;
    process: string;
    processTitle: string;
    defaultProcess: string[];
    outcome: string;
    outcomeTitle: string;
    outcomeFallback: string;
    roleLabel: string;
    roleTitle: string;
    design: string;
    designTitle: string;
    screens: string;
    screensTitle: string;
    moreInCategory: string;
  };
  header: { theme: string; light: string; dark: string };
  footer: { nav: string; elsewhere: string; copyright: string };
  admin: {
    overview: string;
    projects: string;
    profile: string;
    panel: string;
    save: string;
    saving: string;
    saveToast: string;
    export: string;
    exportToast: string;
    import: string;
    importOk: string;
    importFail: string;
    viewSite: string;
    site: string;
    welcome: string;
    projectsCount: string;
    profileCount: string;
    byYear: string;
    profileTitle: string;
    profileSub: string;
    basic: string;
    name: string;
    initials: string;
    titleRole: string;
    tagline: string;
    location: string;
    email: string;
    bio: string;
    philosophy: string;
    philosophyHighlight: string;
    social: string;
    skills: string;
    addGroup: string;
    newGroup: string;
    addSkillPH: string;
    experience: string;
    addExp: string;
    yearPH: string;
    rolePH: string;
    companyPH: string;
    descPH: string;
    saved: string;
  };
}

export const translations: Record<Lang, Dict> = {
  zh: {
    nav: { home: "首页", work: "作品", about: "关于", contact: "联系" },

    hero: {
      status: "接受委托",
      line1: "设计",
      line2: "面向",
      line3: "智能",
      line4: "企业。",
      ctaWork: "查看精选作品",
      ctaContact: "联系我",
      scroll: "滚动",
    },

    bento: {
      tag: "精选作品",
      title: "近期项目 & 设计探索。",
      viewAll: "查看全部",
      viewAllMobile: "查看全部作品",
      viewCase: "查看案例详情",
    },

    strengths: {
      tag: "我的优势",
      title: "三件我最擅长的事。",
      items: [
        { title: "AI 原生设计", desc: "深度参与 AI 产品从 0 到 1，熟悉 Prompt 设计、Agent 交互、人机协作等新模式。" },
        { title: "复杂问题拆解", desc: "擅长把复杂业务拆解为清晰的信息架构与流畅的用户路径，让 B 端产品不再难用。" },
        { title: "规模化设计", desc: "设计系统建设经验，推动 8 条业务线统一规范，让设计效率提升 5 倍。" },
      ],
    },

    philosophy: { tag: "设计哲学", cta: "阅读我的故事" },

    work: {
      tag: "作品集",
      title: "全部作品",
      subtitle: "精选产品设计作品 — 从 AI Agent 与企业 SaaS，到设计系统与移动端体验。",
      all: "全部",
      viewCase: "查看案例详情",
    },

    about: {
      tag: "关于我",
      greeting: "你好，我是",
      bioLead: "设计追求",
      bioHighlight: "清晰 & 价值",
      methodTag: "方法论",
      methodTitle: "我的设计方法",
      skillTag: "技能",
      skillTitle: "工具 & 能力",
      expTag: "经历",
      expTitle: "职业历程",
    },

    contact: {
      tag: "联系我",
      title1: "一起创造",
      title2: "有意义的东西。",
      intro: "我一直乐于有意义的合作、设计伙伴关系和有趣的交流。无论你有项目想法，还是想聊聊设计与 AI — 给我留言吧。",
      email: "邮箱",
      location: "所在地",
      elsewhere: "其他渠道",
      formTitle: "发送消息",
      subject: "主题",
      subjectPH: "项目咨询、合作邀约，或是打个招呼...",
      message: "内容",
      messagePH: "聊聊你的项目、目标、时间线...",
      send: "发送消息",
    },

    caseStudy: {
      notFound: "未找到该作品",
      back: "返回作品集",
      all: "全部作品",
      role: "角色",
      client: "合作方",
      internal: "内部项目",
      duration: "时长",
      team: "团队",
      tools: "工具",
      viewInFigma: "在 Figma 中查看",
      openNewTab: "在新标签页打开",
      figmaFile: "Figma 文件",
      challenge: "挑战",
      challengeTitle: "问题背景",
      process: "过程",
      processTitle: "如何解决",
      defaultProcess: ["研究", "设计", "原型", "上线"],
      outcome: "成果",
      outcomeTitle: "项目结果",
      outcomeFallback: "成功上线并在核心指标上取得了可衡量的效果。",
      roleLabel: "角色",
      roleTitle: "我的职责",
      design: "设计",
      designTitle: "在 Figma 中查看",
      screens: "界面",
      screensTitle: "设计截图",
      moreInCategory: "同类作品",
    },

    header: { theme: "主题", light: "亮色", dark: "深色" },
    footer: {
      nav: "导航",
      elsewhere: "其他渠道",
      copyright: "本网站所有作品、案例研究和图片均受著作权法保护。未经授权的复制、修改或商业使用均属严格禁止。",
    },

    admin: {
      overview: "概览",
      projects: "作品集",
      profile: "个人资料",
      panel: "管理后台",
      save: "保存",
      saving: "保存中...",
      saveToast: "✓ 已保存到浏览器",
      export: "导出",
      exportToast: "✓ 已导出 JSON 文件",
      import: "导入",
      importOk: "✓ 导入成功",
      importFail: "✗ 文件格式错误",
      viewSite: "预览网站",
      site: "预览",
      welcome: "欢迎回来",
      projectsCount: "共 {n} 个",
      profileCount: "{e} 段经历 · {s} 组技能",
      byYear: "作品年份分布",
      profileTitle: "个人资料 & 信息",
      profileSub: "编辑你的个人信息、技能和经历",
      basic: "基本信息",
      name: "姓名",
      initials: "缩写",
      titleRole: "标题 / 角色",
      tagline: "一句话介绍",
      location: "所在地",
      email: "邮箱",
      bio: "个人简介",
      philosophy: "设计哲学",
      philosophyHighlight: "哲学金句",
      social: "社交链接",
      skills: "技能",
      addGroup: "添加分组",
      newGroup: "新分组",
      addSkillPH: "+ 添加技能",
      experience: "工作经历",
      addExp: "添加经历",
      yearPH: "2023 — 至今",
      rolePH: "角色",
      companyPH: "公司",
      descPH: "描述",
      saved: "✓ 已保存",
    },
  },

  en: {
    nav: { home: "Home", work: "Work", about: "About", contact: "Contact" },

    hero: {
      status: "Available",
      line1: "Designing",
      line2: "for the",
      line3: "intelligent",
      line4: "enterprise.",
      ctaWork: "View Selected Work",
      ctaContact: "Get in Touch",
      scroll: "Scroll",
    },

    bento: {
      tag: "Selected Work",
      title: "Recent projects & design explorations.",
      viewAll: "View all",
      viewAllMobile: "View all projects",
      viewCase: "View Case Study",
    },

    strengths: {
      tag: "What I Bring",
      title: "Three things I'm really good at.",
      items: [
        { title: "AI-Native Design", desc: "Deep experience shipping AI products from 0 to 1 — Prompt design, Agent interactions, human-AI collaboration." },
        { title: "Complex Problems", desc: "Turning tangled business into clean IA and smooth flows — making B2B products actually pleasant to use." },
        { title: "Design at Scale", desc: "Led design systems adopted by 8 product lines, boosting team efficiency 5× with tokens, components & governance." },
      ],
    },

    philosophy: { tag: "Design Philosophy", cta: "Read my story" },

    work: {
      tag: "Portfolio",
      title: "All projects",
      subtitle: "A curated selection of product design work — from AI agents and enterprise SaaS to design systems and mobile experiences.",
      all: "All",
      viewCase: "VIEW CASE STUDY",
    },

    about: {
      tag: "About Me",
      greeting: "Hi, I'm",
      bioLead: "I design for",
      bioHighlight: "clarity & impact",
      methodTag: "Methodology",
      methodTitle: "How I approach design",
      skillTag: "Skills",
      skillTitle: "Toolbox & capabilities",
      expTag: "Experience",
      expTitle: "Career path",
    },

    contact: {
      tag: "Get in Touch",
      title1: "Let's build",
      title2: "something great.",
      intro: "I'm always open to meaningful collaborations, design partnerships, and interesting conversations. Whether you have a project in mind or just want to chat about design & AI — drop me a line.",
      email: "Email",
      location: "Location",
      elsewhere: "Elsewhere",
      formTitle: "Send a message",
      subject: "Subject",
      subjectPH: "Project inquiry, collaboration, or just saying hi...",
      message: "Message",
      messagePH: "Tell me about your project, goals, timeline...",
      send: "Send Message",
    },

    caseStudy: {
      notFound: "Project not found",
      back: "Back to Work",
      all: "All Projects",
      role: "Role",
      client: "Client",
      internal: "Internal",
      duration: "Duration",
      team: "Team",
      tools: "Tools",
      viewInFigma: "View in Figma",
      openNewTab: "Open in new tab",
      figmaFile: "Figma File",
      challenge: "Challenge",
      challengeTitle: "The problem",
      process: "Process",
      processTitle: "How we solved it",
      defaultProcess: ["Research", "Design", "Prototype", "Launch"],
      outcome: "Outcome",
      outcomeTitle: "The results",
      outcomeFallback: "A successful launch with measurable impact across key metrics.",
      roleLabel: "Role",
      roleTitle: "What I did",
      design: "Design",
      designTitle: "View in Figma",
      screens: "Screens",
      screensTitle: "Design Screenshots",
      moreInCategory: "More in",
    },

    header: { theme: "Theme", light: "Light", dark: "Dark" },
    footer: {
      nav: "Navigate",
      elsewhere: "Elsewhere",
      copyright: "All portfolio works, case studies, and images on this site are protected by copyright law. Unauthorized reproduction, modification, or commercial use is strictly prohibited.",
    },

    admin: {
      overview: "Overview",
      projects: "Projects",
      profile: "Profile",
      panel: "Admin Panel",
      save: "Save",
      saving: "Saving...",
      saveToast: "✓ Saved to browser",
      export: "Export",
      exportToast: "✓ Exported JSON",
      import: "Import",
      importOk: "✓ Imported",
      importFail: "✗ Invalid file",
      viewSite: "View Site",
      site: "Site",
      welcome: "Welcome back",
      projectsCount: "{n} total",
      profileCount: "{e} experiences · {s} skill groups",
      byYear: "Projects by Year",
      profileTitle: "Profile & Info",
      profileSub: "Edit your personal info, skills and experience",
      basic: "Basic Info",
      name: "Name",
      initials: "Initials",
      titleRole: "Title / Role",
      tagline: "Tagline",
      location: "Location",
      email: "Email",
      bio: "Bio",
      philosophy: "Philosophy",
      philosophyHighlight: "Philosophy Highlight",
      social: "Social Links",
      skills: "Skills",
      addGroup: "Add Group",
      newGroup: "New Group",
      addSkillPH: "+ add skill",
      experience: "Experience",
      addExp: "Add Experience",
      yearPH: "2023 — Now",
      rolePH: "Role",
      companyPH: "Company",
      descPH: "Description",
      saved: "✓ Saved",
    },
  },
};

export const DEFAULT_LANG: Lang = "zh";
