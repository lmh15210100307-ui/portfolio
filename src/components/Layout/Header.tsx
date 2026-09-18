import { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Palette, Check } from "lucide-react";
import { useAdminStore } from "@/store/admin";
import { useTheme } from "@/hooks/useTheme";

const navItems = [
  { to: "/", label: "首页" },
  { to: "/work", label: "作品" },
  { to: "/about", label: "关于" },
  { to: "/contact", label: "联系" },
];

function ThemeSwitcher() {
  const { themeId, setTheme, themes } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1.5 rounded-pill border border-border bg-background-card/60 px-3 py-1.5 text-xs font-medium text-foreground-muted hover:text-foreground hover:border-accent/50 transition-all"
        aria-label="切换主题"
      >
        <Palette size={14} />
        <span className="hidden sm:inline">主题</span>
        <span
          className="w-3 h-3 rounded-full ring-1 ring-border"
          style={{ backgroundColor: `var(--accent)` }}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.96 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-0 mt-2 w-64 rounded-card border border-border bg-background-card p-2 shadow-xl z-50"
          >
            <div className="px-2 py-1.5 mb-1">
              <p className="text-[10px] font-mono uppercase tracking-wider text-foreground-subtle">
                配色方案
              </p>
            </div>
            <div className="space-y-0.5">
              {themes.map((t) => {
                const selected = themeId === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => {
                      setTheme(t.id);
                      setOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 rounded-button px-2.5 py-2 text-left transition-all ${
                      selected
                        ? "bg-accent/10 text-foreground"
                        : "hover:bg-background-elevated text-foreground-muted hover:text-foreground"
                    }`}
                  >
                    <div className="flex items-center -space-x-1">
                      <span
                        className="w-5 h-5 rounded-full border border-border/80"
                        style={{ backgroundColor: t.colors["--background"] }}
                      />
                      <span
                        className="w-5 h-5 rounded-full border border-border/80"
                        style={{ backgroundColor: t.colors["--background-card"] }}
                      />
                      <span
                        className="w-5 h-5 rounded-full border border-border/80"
                        style={{ backgroundColor: t.colors["--accent"] }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-medium truncate">
                          {t.name}
                        </span>
                        <span className="text-[10px] font-mono text-foreground-subtle uppercase">
                          {t.mode === "dark" ? "深色" : "浅色"}
                        </span>
                      </div>
                      <p className="text-xs text-foreground-subtle truncate">
                        {t.description}
                      </p>
                    </div>
                    {selected && (
                      <Check
                        size={14}
                        className="text-accent flex-shrink-0"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Header() {
  const site = useAdminStore((s) => s.site);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/70 backdrop-blur-xl border-b border-border/60"
          : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-16 lg:h-20">
        <Link to="/" className="group flex items-center gap-3">
          <div className="w-9 h-9 rounded-card bg-accent/10 border border-accent/30 flex items-center justify-center font-display font-bold text-accent text-sm transition-all group-hover:bg-accent group-hover:text-background">
            {site.initials}
          </div>
          <span className="font-display font-semibold text-lg hidden sm:block">
            {site.name}
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                `relative px-4 py-2 rounded-pill text-sm font-medium transition-all ${
                  isActive
                    ? "text-foreground"
                    : "text-foreground-muted hover:text-foreground"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-background-card border border-border rounded-pill -z-10"
                      transition={{ type: "spring", bounce: 0.25 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
          <div className="ml-2">
            <ThemeSwitcher />
          </div>
        </nav>

        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 -mr-2 text-foreground-muted hover:text-foreground"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden bg-background/95 backdrop-blur-xl border-b border-border"
          >
            <nav className="container py-4 flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 rounded-button text-base font-medium text-foreground-muted hover:text-foreground hover:bg-background-card transition-all"
                >
                  {item.label}
                </Link>
              ))}
              <div className="px-4 pt-2">
                <ThemeSwitcher />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
