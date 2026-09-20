import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FolderKanban,
  UserCog,
  Download,
  Upload,
  Eye,
  Save,
  FileText,
  MessageSquare,
  Settings,
} from "lucide-react";
import { useAdminStore } from "@/store/admin";
import { useState, useEffect } from "react";
import { useI18n } from "@/hooks/useI18n";

export default function AdminLayout() {
  const { t } = useI18n();
  const navItems = [
    { to: "/admin", label: t.admin.overview, icon: LayoutDashboard, end: true },
    { to: "/admin/projects", label: t.admin.projects, icon: FolderKanban },
    { to: "/admin/profile", label: t.admin.profile, icon: UserCog },
    { to: "/admin/articles", label: t.admin.articles, icon: FileText },
    { to: "/admin/messages", label: t.admin.messages, icon: MessageSquare },
    { to: "/admin/site-settings", label: t.admin.siteSettings, icon: Settings },
  ];
  const { projects, persist, load, loaded, export: exportData, importJSON, reset } = useAdminStore();
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loaded) load();
  }, [loaded, load]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2000);
  };

  const handleSave = async () => {
    setSaving(true);
    await persist();
    setSaving(false);
    showToast(t.admin.saveToast);
  };

  const handleExport = () => {
    exportData();
    showToast(t.admin.exportToast);
  };

  const handleImport = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/json";
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const text = await file.text();
      try {
        await importJSON(text);
        showToast(t.admin.importOk);
      } catch {
        showToast(t.admin.importFail);
      }
    };
    input.click();
  };

  const handleReset = async () => {
    await reset();
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col lg:flex-row">
      <aside className="lg:fixed lg:inset-y-0 lg:left-0 lg:w-64 lg:border-r border-border bg-background-card z-20 hidden lg:flex lg:flex-col">
        <div className="p-5 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-card bg-accent/10 border border-accent/30 flex items-center justify-center font-display font-bold text-accent text-sm">
              NV
            </div>
            <div>
              <p className="font-display font-semibold text-sm">{t.admin.projects}</p>
              <p className="font-mono text-[10px] uppercase tracking-wider text-foreground-subtle">
                {t.admin.panel}
              </p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-button px-3 py-2.5 text-sm transition-colors duration-200 ${
                  isActive
                    ? "bg-accent/10 text-accent border border-accent/20"
                    : "text-foreground-muted hover:text-foreground hover:bg-background-elevated"
                }`
              }
            >
              <item.icon size={18} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-3 border-t border-border space-y-1">
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full flex items-center justify-center gap-2 rounded-button bg-foreground text-background px-3 py-2.5 text-sm font-medium hover:bg-accent transition-colors disabled:opacity-50"
          >
            <Save size={16} />
            {saving ? t.admin.saving : t.admin.save}
          </button>
          <button
            onClick={handleExport}
            className="w-full flex items-center gap-2 rounded-button px-3 py-2 text-sm text-foreground-muted hover:text-foreground hover:bg-background-elevated transition-colors"
          >
            <Download size={16} /> {t.admin.export}
          </button>
          <button
            onClick={handleImport}
            className="w-full flex items-center gap-2 rounded-button px-3 py-2 text-sm text-foreground-muted hover:text-foreground hover:bg-background-elevated transition-colors"
          >
            <Upload size={16} /> {t.admin.import}
          </button>
          <button
            onClick={() => window.open("/", "_blank")}
            className="w-full flex items-center gap-2 rounded-button px-3 py-2 text-sm text-foreground-muted hover:text-foreground hover:bg-background-elevated transition-colors"
          >
            <Eye size={16} /> {t.admin.viewSite}
          </button>
        </div>
      </aside>

      <div className="lg:pl-64 flex-1">
        <header className="lg:sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur-xl px-4 py-4 lg:px-6 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="w-7 h-7 rounded-card bg-accent/10 border border-accent/30 flex items-center justify-center font-display font-bold text-accent text-xs flex-shrink-0">
              NV
            </div>
            <div className="min-w-0">
              <h1 className="font-display font-semibold text-sm truncate">{t.admin.panel}</h1>
              <p className="font-mono text-[10px] text-foreground-subtle truncate">
                {t.admin.projectsCount.replace("{n}", String(projects.length))}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <button
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-1 rounded-button bg-foreground text-background px-3 py-1.5 text-xs font-medium hover:bg-accent transition-colors disabled:opacity-50"
            >
              <Save size={12} /> {saving ? "..." : t.admin.save}
            </button>
            <button
              onClick={() => navigate("/")}
              className="text-xs text-foreground-muted hover:text-foreground px-2 py-1.5"
            >
              {t.admin.site}
            </button>
          </div>
        </header>

        <nav className="lg:hidden flex gap-1 px-4 py-3 border-b border-border overflow-x-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-pill px-3 py-1.5 text-xs whitespace-nowrap transition-colors duration-200 ${
                  isActive
                    ? "bg-accent/10 text-accent border border-accent/20"
                    : "text-foreground-muted hover:text-foreground hover:bg-background-card"
                }`
              }
            >
              <item.icon size={14} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <main className="p-6 lg:p-8">
          <Outlet />
        </main>
      </div>

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-background-card border border-border px-4 py-2 rounded-button text-sm z-50 shadow-xl">
          {toast}
        </div>
      )}
    </div>
  );
}
