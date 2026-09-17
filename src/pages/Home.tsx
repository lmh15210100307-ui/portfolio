import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import Hero from "@/components/Home/Hero";
import BentoGrid from "@/components/Home/BentoGrid";
import Strengths from "@/components/Home/Strengths";
import Philosophy from "@/components/Home/Philosophy";

export default function Home() {
  return (
    <div className="relative">
      <div className="noise-bg" />
      <Header />
      <main className="relative z-10">
        <Hero />
        <BentoGrid />
        <Strengths />
        <Philosophy />
      </main>
      <Footer />
    </div>
  );
}
