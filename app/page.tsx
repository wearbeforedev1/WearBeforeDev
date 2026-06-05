import HeroSection from "@/components/hero-section";
import {HeroHeader} from "@/components/header";
export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-background font-sans">
      <HeroHeader />
      <HeroSection />
    </div>
  );
}
