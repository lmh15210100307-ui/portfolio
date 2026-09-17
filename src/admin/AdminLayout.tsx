import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FolderKanban,
  UserCog,
  Download,
  Upload,
  Trash2,
  Eye,
  Save,
} from "lucide-react";
import { useAdminStore } from "@/store/admin";
import { useState, useEffect } from "react";

const navItems = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/admin/projects", label: "Projects", icon: FolderKanban },
  { to: "/admin/profile", label: "Profile", icon: UserCog },
];

export default function AdminLayout() {
  const { projects, site, persist, load, loaded, export: exportData, importJSON, reset } = useAdminStore();
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
    showToast("✓ 已保存到浏览器");
  };

  const handleExport = () => {
    exportData();
    showToast("✓ 已导出 JSON 文件");
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
        showToast("✓ 导入成功");
      } catch {
        showToast("✗ 文件格式错误");
      }
    };
    input.click();
  };

  const handleReset = async () => {
    if (!confirm("确定重置所有数据？这会恢复到初始示例内容")) return;
    await reset();
    showToast("✓ 已重置");
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
              <p className="font-display font-semibold text-sm">Portfolio</p>
              <p className="font-mono text-[10px] uppercase tracking-wider text-foreground-subtle">
                Admin Panel
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
                `flex items-center gap-3 rounded-button px-3 py-2.5 text-sm transition-all ${
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
            {saving ? "Saving..." : "Save"}
          </button>
          <button
            onClick={handleExport}
            className="w-full flex items-center gap-2 rounded-button px-3 py-2 text-sm text-foreground-muted hover:text-foreground hover:bg-background-elevated transition-colors"
          >
            <Download size={16} /> Export
          </button>
          <button
            onClick={handleImport}
            className="w-full flex items-center gap-2 rounded-button px-3 py-2 text-sm text-foreground-muted hover:text-foreground hover:bg-background-elevated transition-colors"
          >
            <Upload size={16} /> Import
          </button>
          <button
            onClick={() => window.open("/", "_blank")}
            className="w-full flex items-center gap-2 rounded-button px-3 py-2 text-sm text-foreground-muted hover:text-foreground hover:bg-background-elevated transition-colors"
          >
            <Eye size={16} /> View Site
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
              <h1 className="font-display font-semibold text-sm truncate">Admin</h1>
              <p className="font-mono text-[10px] text-foreground-subtle truncate">
                {projects.length} projects
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <button
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-1 rounded-button bg-foreground text-background px-3 py-1.5 text-xs font-medium hover:bg-accent transition-colors disabled:opacity-50"
            >
              <Save size={12} /> {saving ? "..." : "Save"}
            </button>
            <button
              onClick={() => navigate("/")}
              className="text-xs text-foreground-muted hover:text-foreground px-2 py-1.5"
            >
              Site
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
                `flex items-center gap-2 rounded-pill px-3 py-1.5 text-xs whitespace-nowrap transition-all ${
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

        <main className="p-4 lg:p-8">
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
