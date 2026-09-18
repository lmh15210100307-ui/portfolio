export type Lang = "zh" | "en";

export type TextValue = string | { zh: string; en: string };

export function pickText(v: TextValue | undefined, lang: Lang, fallback = ""): string {
  if (!v) return fallback;
  if (typeof v === "string") return v;
  return v[lang] || v.zh || fallback;
}

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
  adminProjects: {
    title: string;
    subtitle: string;
    newProject: string;
    editProject: string;
    featured: string;
    emptyHint: string;
    confirmDelete: string;
    slugExists: string;
    titleRequired: string;
    cancel: string;
    saveProject: string;
    addItem: string;
    gradients: { label: string; value: string }[];
    fields: {
      title: string;
      slug: string;
      subtitle: string;
      category: string;
      year: string;
      featured: string;
      featuredHint: string;
      role: string;
      client: string;
      summary: string;
      teamSize: string;
      duration: string;
      challenge: string;
      process: string;
      highlights: string;
      tools: string;
      outcome: string;
      roleDetail: string;
    };
    ph: {
      title: string;
      subtitle: string;
      role: string;
      summary: string;
      teamSize: string;
      duration: string;
      challenge: string;
      process: string;
      highlights: string;
      outcome: string;
      roleDetail: string;
    };
    metrics: {
      label: string;
      phLabel: string;
      add: string;
    };
    cover: {
      label: string;
      hint: string;
      gradientHint: string;
    };
    figma: {
      title: string;
      enableTitle: string;
      tokenHint: string;
      goSettings: string;
      hide: string;
      show: string;
      saved: string;
      clear: string;
      fileUrl: string;
      importBtn: string;
      node: string;
      openInFigma: string;
      manualHint: string;
      uploadShot: string;
      modalTitle: string;
      loadFailed: string;
      loading: string;
      errorHint: string;
      noFrames: string;
      found: string;
      selectAll: string;
      deselectAll: string;
      progressFetch: string;
      progressImg: string;
      importing: string;
      importFailed: string;
      importN: string;
    };
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
    adminProjects: {
      title: "作品集",
      subtitle: "管理你的项目案例，点击添加新项目",
      newProject: "新建项目",
      editProject: "编辑项目",
      featured: "精选",
      emptyHint: "还没有项目，点击「新建项目」开始吧",
      confirmDelete: "确定删除此项目？",
      slugExists: "项目链接标识已存在，请修改标题",
      titleRequired: "请填写项目标题",
      cancel: "取消",
      saveProject: "保存项目",
      addItem: "添加一项",
      gradients: [
        { label: "AI · 紫色", value: "from-blue-600/20 via-purple-600/20 to-pink-600/20" },
        { label: "数据 · 青色", value: "from-emerald-600/20 via-teal-600/20 to-cyan-600/20" },
        { label: "设计 · 琥珀", value: "from-orange-600/20 via-amber-600/20 to-yellow-600/20" },
        { label: "移动 · 玫红", value: "from-rose-600/20 via-red-600/20 to-orange-600/20" },
        { label: "品牌 · 紫罗兰", value: "from-violet-600/20 via-purple-600/20 to-fuchsia-600/20" },
      ],
      fields: {
        title: "项目标题 *",
        slug: "链接标识（自动）",
        subtitle: "副标题",
        category: "分类",
        year: "年份",
        featured: "精选项目",
        featuredHint: "首页展示",
        role: "你的角色",
        client: "合作方（可选）",
        summary: "一句话简介",
        teamSize: "团队规模",
        duration: "项目时长",
        challenge: "挑战背景",
        process: "设计流程",
        highlights: "项目亮点",
        tools: "使用工具",
        outcome: "项目成果",
        roleDetail: "我的职责详情",
      },
      ph: {
        title: "AI 智能助手平台",
        subtitle: "企业级 AI 智能助手平台",
        role: "首席产品设计师",
        summary: "一句话描述这个项目",
        teamSize: "4 人设计团队",
        duration: "6 个月",
        challenge: "面临的核心问题和挑战是什么？",
        process: "设计流程的每一步",
        highlights: "2-3 个核心亮点标签",
        outcome: "最终成果和影响",
        roleDetail: "你具体做了什么",
      },
      metrics: {
        label: "成果数据",
        phLabel: "指标描述 (如 日活用户)",
        add: "添加数据",
      },
      cover: {
        label: "封面图",
        hint: "点击上传封面图",
        gradientHint: "或选择渐变背景",
      },
      figma: {
        title: "Figma 设计 — 链接 + 导入 + 截图",
        enableTitle: "开启 Figma 一键导入",
        tokenHint: "在 Figma 开发者设置中生成个人访问 Token ",
        goSettings: "前往设置",
        hide: "隐藏",
        show: "显示",
        saved: "✓ Figma Token 已保存",
        clear: "清除",
        fileUrl: "Figma 文件链接",
        importBtn: "导入",
        node: "节点",
        openInFigma: "在 Figma 中打开",
        manualHint: "或手动上传导出的截图（PNG / JPG）",
        uploadShot: "上传截图",
        modalTitle: "从 Figma 导入画板",
        loadFailed: "加载 Figma 文件失败",
        loading: "正在加载 Figma 文件...",
        errorHint: "请确认 Token 有文件读取权限，且文件链接正确。",
        noFrames: "没有找到画板，试试在 Figma 链接里加上具体的 node-id。",
        found: "找到 {n} 个画板 · 已选 {s} 个",
        selectAll: "全选",
        deselectAll: "取消全选",
        progressFetch: "正在获取 {n} 个画板...",
        progressImg: "正在加载图片 {i}/{total}",
        importing: "正在导入...",
        importFailed: "导入失败",
        importN: "导入 {n} 个画板",
      },
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
    adminProjects: {
      title: "Projects",
      subtitle: "Manage your case studies. Click to add a new project.",
      newProject: "New Project",
      editProject: "Edit Project",
      featured: "Featured",
      emptyHint: "No projects yet. Click \"New Project\" to get started.",
      confirmDelete: "Delete this project?",
      slugExists: "Slug already exists. Please change the title.",
      titleRequired: "Please enter a project title",
      cancel: "Cancel",
      saveProject: "Save Project",
      addItem: "Add item",
      gradients: [
        { label: "AI · Purple", value: "from-blue-600/20 via-purple-600/20 to-pink-600/20" },
        { label: "Data · Cyan", value: "from-emerald-600/20 via-teal-600/20 to-cyan-600/20" },
        { label: "Design · Amber", value: "from-orange-600/20 via-amber-600/20 to-yellow-600/20" },
        { label: "Mobile · Rose", value: "from-rose-600/20 via-red-600/20 to-orange-600/20" },
        { label: "Brand · Violet", value: "from-violet-600/20 via-purple-600/20 to-fuchsia-600/20" },
      ],
      fields: {
        title: "Project Title *",
        slug: "Slug (auto)",
        subtitle: "Subtitle",
        category: "Category",
        year: "Year",
        featured: "Featured",
        featuredHint: "Show on homepage",
        role: "Your Role",
        client: "Client (optional)",
        summary: "One-line Summary",
        teamSize: "Team Size",
        duration: "Duration",
        challenge: "Challenge",
        process: "Process",
        highlights: "Highlights",
        tools: "Tools",
        outcome: "Outcome",
        roleDetail: "Your Role Detail",
      },
      ph: {
        title: "AI Copilot Platform",
        subtitle: "Enterprise-grade AI copilot platform",
        role: "Lead Product Designer",
        summary: "One-line description of the project",
        teamSize: "4-person design team",
        duration: "6 months",
        challenge: "What was the core problem or challenge?",
        process: "Each step of the design process",
        highlights: "2-3 key highlights",
        outcome: "Final results and impact",
        roleDetail: "What you specifically did",
      },
      metrics: {
        label: "Metrics",
        phLabel: "Metric (e.g. DAU)",
        add: "Add metric",
      },
      cover: {
        label: "Cover Image",
        hint: "Click to upload cover image",
        gradientHint: "or choose a gradient background",
      },
      figma: {
        title: "Figma Design — Link + Import + Screenshots",
        enableTitle: "Enable one-click Figma import",
        tokenHint: "Generate a personal access token in Figma developer settings ",
        goSettings: "Go to settings",
        hide: "Hide",
        show: "Show",
        saved: "✓ Figma Token saved",
        clear: "Clear",
        fileUrl: "Figma file URL",
        importBtn: "Import",
        node: "Node",
        openInFigma: "Open in Figma",
        manualHint: "or manually upload exported screenshots (PNG / JPG)",
        uploadShot: "Upload screenshots",
        modalTitle: "Import frames from Figma",
        loadFailed: "Failed to load Figma file",
        loading: "Loading Figma file...",
        errorHint: "Make sure the token has file read permission and the file link is correct.",
        noFrames: "No frames found. Try adding a node-id to the Figma link.",
        found: "{n} frames found · {s} selected",
        selectAll: "Select all",
        deselectAll: "Deselect all",
        progressFetch: "Fetching {n} frames...",
        progressImg: "Loading image {i}/{total}",
        importing: "Importing...",
        importFailed: "Import failed",
        importN: "Import {n} frames",
      },
    },
  },
};

export const DEFAULT_LANG: Lang = "zh";
