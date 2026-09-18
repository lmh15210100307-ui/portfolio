export interface ThemeColors {
  "--background": string;
  "--background-card": string;
  "--background-elevated": string;
  "--foreground": string;
  "--foreground-muted": string;
  "--foreground-subtle": string;
  "--accent": string;
  "--accent-hover": string;
  "--border": string;
  "--border-light": string;
  "--selection-bg": string;
  "--scrollbar-thumb": string;
  "--scrollbar-track": string;
  "--glow": string;
  "--mask-opacity": string;
}

export interface Theme {
  id: string;
  name: string;
  mode: "dark" | "light";
  description: string;
  swatch: string;
  colors: ThemeColors;
}

export const THEMES: Theme[] = [
  {
    id: "midnight",
    name: "午夜靛蓝",
    mode: "dark",
    description: "深邃藏青 + 电光靛蓝，科技优雅感",
    swatch: "#6C8CFF",
    colors: {
      "--background": "#0A0E1A",
      "--background-card": "#141B2D",
      "--background-elevated": "#1E2740",
      "--foreground": "#F0F2F8",
      "--foreground-muted": "#7B85A0",
      "--foreground-subtle": "#3D4560",
      "--accent": "#6C8CFF",
      "--accent-hover": "#8FA8FF",
      "--border": "#222C44",
      "--border-light": "#2E3A58",
      "--selection-bg": "#6C8CFF",
      "--scrollbar-thumb": "#222C44",
      "--scrollbar-track": "#0A0E1A",
      "--glow": "rgba(108, 140, 255, 0.15)",
      "--mask-opacity": "0.04",
    },
  },
  {
    id: "obsidian",
    name: "黑曜紫罗兰",
    mode: "dark",
    description: "极深黑 + 柔紫调，AI 与创意感",
    swatch: "#A78BFA",
    colors: {
      "--background": "#0B0B10",
      "--background-card": "#181820",
      "--background-elevated": "#25252E",
      "--foreground": "#F2F1F7",
      "--foreground-muted": "#767580",
      "--foreground-subtle": "#3C3B44",
      "--accent": "#A78BFA",
      "--accent-hover": "#C4B5FD",
      "--border": "#26262F",
      "--border-light": "#33333D",
      "--selection-bg": "#A78BFA",
      "--scrollbar-thumb": "#26262F",
      "--scrollbar-track": "#0B0B10",
      "--glow": "rgba(167, 139, 250, 0.15)",
      "--mask-opacity": "0.04",
    },
  },
  {
    id: "jade",
    name: "青玉冷杉",
    mode: "dark",
    description: "深青灰 + 翡翠绿，冷静精密感",
    swatch: "#4ADE80",
    colors: {
      "--background": "#0C1212",
      "--background-card": "#151F1F",
      "--background-elevated": "#1E2C2C",
      "--foreground": "#EAF2F0",
      "--foreground-muted": "#708884",
      "--foreground-subtle": "#384846",
      "--accent": "#4ADE80",
      "--accent-hover": "#86EFAC",
      "--border": "#20302F",
      "--border-light": "#2C3E3D",
      "--selection-bg": "#4ADE80",
      "--scrollbar-thumb": "#20302F",
      "--scrollbar-track": "#0C1212",
      "--glow": "rgba(74, 222, 128, 0.13)",
      "--mask-opacity": "0.04",
    },
  },
  {
    id: "aurora",
    name: "暖日暮光",
    mode: "dark",
    description: "暖棕底 + 珊瑚橙，温暖有呼吸感",
    swatch: "#FB923C",
    colors: {
      "--background": "#141012",
      "--background-card": "#1E191B",
      "--background-elevated": "#2A2426",
      "--foreground": "#F5EFEA",
      "--foreground-muted": "#9C8880",
      "--foreground-subtle": "#4A3F3A",
      "--accent": "#FB923C",
      "--accent-hover": "#FDBA74",
      "--border": "#2E2629",
      "--border-light": "#3D3437",
      "--selection-bg": "#FB923C",
      "--scrollbar-thumb": "#2E2629",
      "--scrollbar-track": "#141012",
      "--glow": "rgba(251, 146, 60, 0.14)",
      "--mask-opacity": "0.04",
    },
  },
  {
    id: "arctic",
    name: "北极素白",
    mode: "light",
    description: "纯净米白 + 深海蓝，极简编辑风",
    swatch: "#2563EB",
    colors: {
      "--background": "#F7F7F8",
      "--background-card": "#FFFFFF",
      "--background-elevated": "#FFFFFF",
      "--foreground": "#0D0D12",
      "--foreground-muted": "#6B6B72",
      "--foreground-subtle": "#C4C4CA",
      "--accent": "#2563EB",
      "--accent-hover": "#3B82F6",
      "--border": "#E5E5EA",
      "--border-light": "#D1D1D6",
      "--selection-bg": "#2563EB",
      "--scrollbar-thumb": "#D1D1D6",
      "--scrollbar-track": "#F7F7F8",
      "--glow": "rgba(37, 99, 235, 0.10)",
      "--mask-opacity": "0.06",
    },
  },
];

export const DEFAULT_THEME = "midnight";

export function getTheme(id: string): Theme {
  return THEMES.find((t) => t.id === id) || THEMES[0];
}
