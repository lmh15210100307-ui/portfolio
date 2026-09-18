import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Work from "@/pages/Work";
import CaseStudy from "@/pages/CaseStudy";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import AdminLayout from "@/admin/AdminLayout";
import AdminOverview from "@/admin/AdminOverview";
import AdminProjects from "@/admin/AdminProjects";
import AdminProfile from "@/admin/AdminProfile";
import AdminArticles from "@/admin/AdminArticles";
import AdminMessages from "@/admin/AdminMessages";
import AdminSiteSettings from "@/admin/AdminSiteSettings";
import { useAdminStore } from "@/store/admin";
import { useSiteProtection } from "@/hooks/useSiteProtection";
import { useTheme } from "@/hooks/useTheme";

export default function App() {
  const load = useAdminStore((s) => s.load);
  useEffect(() => {
    load();
  }, [load]);

  useTheme();
  useSiteProtection();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/work/:slug" element={<CaseStudy />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminOverview />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="profile" element={<AdminProfile />} />
          <Route path="articles" element={<AdminArticles />} />
          <Route path="messages" element={<AdminMessages />} />
          <Route path="site-settings" element={<AdminSiteSettings />} />
        </Route>
      </Routes>
    </Router>
  );
}
