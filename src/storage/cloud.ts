import { projects as defaultProjects, Project } from "@/data/projects";
import { siteConfig as defaultSite, SiteConfig } from "@/data/site";

const STORAGE_KEY = "navi_portfolio_data_v1";

interface CloudData {
  projects: Project[];
  site: SiteConfig;
  savedAt: string;
}

export function loadLocalData(): CloudData | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as CloudData;
    if (!data.projects || !data.site) return null;
    return data;
  } catch {
    return null;
  }
}

export function saveLocalData(data: CloudData): void {
  try {
    data.savedAt = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    if (e instanceof DOMException && e.name === "QuotaExceededError") {
      const isZh = document.documentElement.lang.startsWith("zh");
      alert(isZh ? "浏览器存储空间已满，请删除大文件图片后重试" : "Storage full. Please remove large images and try again.");
    }
  }
}

export function exportDataJSON(data: CloudData): string {
  return JSON.stringify(data, null, 2);
}

export function downloadData(data: CloudData): void {
  const json = exportDataJSON(data);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `navi-portfolio-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function parseImportedJSON(text: string): CloudData {
  const data = JSON.parse(text);
  if (!data.projects || !data.site) {
    const isZh = document.documentElement.lang.startsWith("zh");
    throw new Error(isZh ? "文件格式不正确" : "Invalid file format");
  }
  return data;
}

export function resetData(): CloudData {
  localStorage.removeItem(STORAGE_KEY);
  return {
    projects: defaultProjects,
    site: defaultSite,
    savedAt: new Date().toISOString(),
  };
}

export function getDefaultData(): CloudData {
  return {
    projects: defaultProjects,
    site: defaultSite,
    savedAt: new Date().toISOString(),
  };
}

export function getSavedAt(): string | null {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    const data = JSON.parse(raw) as CloudData;
    return data.savedAt || null;
  } catch {
    return null;
  }
}
