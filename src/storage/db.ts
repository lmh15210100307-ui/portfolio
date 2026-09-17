import type { Project } from "@/data/projects";
import type { SiteConfig } from "@/data/site";

const DB_NAME = "navi_portfolio";
const DB_VERSION = 1;
const PROJECTS_STORE = "projects";
const SITE_STORE = "site";

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(PROJECTS_STORE)) {
        db.createObjectStore(PROJECTS_STORE, { keyPath: "slug" });
      }
      if (!db.objectStoreNames.contains(SITE_STORE)) {
        db.createObjectStore(SITE_STORE, { keyPath: "name" });
      }
    };
  });
}

export async function saveProjects(projects: Project[]): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(PROJECTS_STORE, "readwrite");
    const store = tx.objectStore(PROJECTS_STORE);
    projects.forEach((p) => store.put(p));
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export async function loadProjects(): Promise<Project[] | null> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(PROJECTS_STORE, "readonly");
    const store = tx.objectStore(PROJECTS_STORE);
    const request = store.getAll();
    request.onsuccess = () => {
      const data = request.result as Project[];
      resolve(data && data.length > 0 ? data : null);
    };
    request.onerror = () => reject(request.error);
  });
}

export async function saveSite(site: SiteConfig): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(SITE_STORE, "readwrite");
    const store = tx.objectStore(SITE_STORE);
    store.put(site);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export async function loadSite(): Promise<SiteConfig | null> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(SITE_STORE, "readonly");
    const store = tx.objectStore(SITE_STORE);
    const request = store.get("NAVI");
    request.onsuccess = () => resolve((request.result as SiteConfig) || null);
    request.onerror = () => reject(request.error);
  });
}

export async function clearAll(): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx1 = db.transaction(PROJECTS_STORE, "readwrite");
    tx1.objectStore(PROJECTS_STORE).clear();
    const tx2 = db.transaction(SITE_STORE, "readwrite");
    tx2.objectStore(SITE_STORE).clear();
    tx2.oncomplete = () => resolve();
    tx2.onerror = () => reject(tx2.error);
  });
}
