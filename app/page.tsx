import HeroSection from "@/components/hero-section";
import { HeroHeader } from "@/components/header";
import { VideoShowcase } from "@/components/landing/video-showcase";
import { HowItWorks } from "@/components/landing/how-it-works";
import { FomoTicker } from "@/components/landing/fomo-ticker";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-background pb-11 font-sans md:pb-12">
      <HeroHeader />
      <HeroSection />
      <VideoShowcase />
      <HowItWorks />
      <FomoTicker />
    </div>
  );
}
