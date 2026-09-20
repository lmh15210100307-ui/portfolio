import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

/**
 * 前台通用布局：Header + 内容 + Footer 常驻，
 * 切换路由时不会重新挂载，避免 Header 进场动画重复播放导致跳动。
 */
export default function SiteLayout() {
  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="noise-bg" />
      <Header />
      <main className="relative z-10 flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
