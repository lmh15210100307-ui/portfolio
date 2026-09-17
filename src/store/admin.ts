import { create } from "zustand";
import { projects as defaultProjects, Project } from "@/data/projects";
import { siteConfig as defaultSite, SiteConfig } from "@/data/site";
import {
  loadProjects,
  saveProjects,
  loadSite,
  saveSite,
  clearAll,
} from "@/storage/db";
import {
  loadLocalData,
  saveLocalData,
  getDefaultData,
  downloadData,
  parseImportedJSON,
} from "@/storage/cloud";

interface AdminState {
  projects: Project[];
  site: SiteConfig;
  loaded: boolean;
  loading: boolean;
  load: () => Promise<void>;
  updateProject: (slug: string, patch: Partial<Project>) => void;
  addProject: (project: Project) => void;
  deleteProject: (slug: string) => void;
  updateSite: (patch: Partial<SiteConfig>) => void;
  persist: () => Promise<void>;
  export: () => void;
  importJSON: (json: string) => Promise<void>;
  reset: () => Promise<void>;
}

export const useAdminStore = create<AdminState>((set, get) => ({
  projects: defaultProjects,
  site: defaultSite,
  loaded: false,
  loading: false,

  load: async () => {
    set({ loading: true });
    try {
      const local = loadLocalData();
      if (local) {
        set({
          projects: local.projects,
          site: local.site,
          loaded: true,
        });
        return;
      }
      const [dbProjects, dbSite] = await Promise.all([
        loadProjects(),
        loadSite(),
      ]);
      if (dbProjects && dbSite) {
        saveLocalData({ projects: dbProjects, site: dbSite, savedAt: new Date().toISOString() });
      }
      set({
        projects: dbProjects || defaultProjects,
        site: dbSite || defaultSite,
        loaded: true,
      });
    } catch {
      set({ loaded: true });
    } finally {
      set({ loading: false });
    }
  },

  updateProject: (slug, patch) => {
    set((state) => ({
      projects: state.projects.map((p) =>
        p.slug === slug ? { ...p, ...patch } : p
      ),
    }));
  },

  addProject: (project) => {
    set((state) => ({
      projects: [...state.projects, project],
    }));
  },

  deleteProject: (slug) => {
    set((state) => ({
      projects: state.projects.filter((p) => p.slug !== slug),
    }));
  },

  updateSite: (patch) => {
    set((state) => ({
      site: { ...state.site, ...patch },
    }));
  },

  persist: async () => {
    const { projects, site } = get();
    saveLocalData({ projects, site, savedAt: new Date().toISOString() });
    try {
      await Promise.all([saveProjects(projects), saveSite(site)]);
    } catch {}
  },

  export: () => {
    const { projects, site } = get();
    downloadData({ projects, site, savedAt: new Date().toISOString() });
  },

  importJSON: async (json) => {
    const data = parseImportedJSON(json);
    saveLocalData(data);
    set({ projects: data.projects, site: data.site });
  },

  reset: async () => {
    const defaultData = getDefaultData();
    localStorage.removeItem("navi_portfolio_data_v1");
    try {
      await clearAll();
    } catch {}
    set({ projects: defaultData.projects, site: defaultData.site });
  },
}));
