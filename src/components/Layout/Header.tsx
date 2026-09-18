import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, Globe } from "lucide-react";
import { useAdminStore } from "@/store/admin";
import { useTheme } from "@/hooks/useTheme";
import { useI18n } from "@/hooks/useI18n";

export default function Header() {
  const site = useAdminStore((s) => s.site);
  const { mode, toggle: toggleTheme, isDark } = useTheme();
  const { lang, toggle: toggleLang, t } = useI18n();
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
          <NavLink
            to="/"
            end
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
                {t.nav.home}
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
          <NavLink
            to="/work"
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
                {t.nav.work}
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
          <NavLink
            to="/about"
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
                {t.nav.about}
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
          <NavLink
            to="/contact"
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
                {t.nav.contact}
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

          <div className="ml-3 flex items-center gap-1">
            <button
              onClick={toggleTheme}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              title={isDark ? t.header.light : t.header.dark}
              className="w-9 h-9 flex items-center justify-center rounded-pill border border-border hover:border-accent/50 text-foreground-muted hover:text-accent transition-all"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={mode}
                  initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.2 }}
                >
                  {isDark ? <Sun size={16} /> : <Moon size={16} />}
                </motion.span>
              </AnimatePresence>
            </button>

            <button
              onClick={toggleLang}
              aria-label="Switch language"
              title={lang === "zh" ? "English" : "中文"}
              className="w-9 h-9 flex items-center justify-center rounded-pill border border-border hover:border-accent/50 text-foreground-muted hover:text-accent transition-all font-mono text-xs font-bold"
            >
              {lang === "zh" ? "EN" : (
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key="en-ico"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                  >
                    <Globe size={14} />
                  </motion.span>
                </AnimatePresence>
              )}
            </button>
          </div>
        </nav>

        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="w-9 h-9 flex items-center justify-center rounded-pill border border-border text-foreground-muted"
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            onClick={toggleLang}
            className="w-9 h-9 flex items-center justify-center rounded-pill border border-border text-foreground-muted font-mono text-xs font-bold"
          >
            {lang === "zh" ? "EN" : "中"}
          </button>
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
              <Link to="/" onClick={() => setMobileOpen(false)} className="px-4 py-3 rounded-button text-base font-medium text-foreground-muted hover:text-foreground hover:bg-background-card transition-all">{t.nav.home}</Link>
              <Link to="/work" onClick={() => setMobileOpen(false)} className="px-4 py-3 rounded-button text-base font-medium text-foreground-muted hover:text-foreground hover:bg-background-card transition-all">{t.nav.work}</Link>
              <Link to="/about" onClick={() => setMobileOpen(false)} className="px-4 py-3 rounded-button text-base font-medium text-foreground-muted hover:text-foreground hover:bg-background-card transition-all">{t.nav.about}</Link>
              <Link to="/contact" onClick={() => setMobileOpen(false)} className="px-4 py-3 rounded-button text-base font-medium text-foreground-muted hover:text-foreground hover:bg-background-card transition-all">{t.nav.contact}</Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
