import Link from "next/link";
import { Eye, Globe, Sparkles, Target } from "lucide-react";
import { HeroHeader } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BrandGradientText, GlowBackdrop } from "@/components/brand/brand";

const STATS = [
  { value: "24+", label: "Fashion brands" },
  { value: "180K+", label: "Customers reached" },
  { value: "34K", label: "AR previews / mo" },
  { value: "27%", label: "Avg conversion" },
];

const VALUES = [
  { icon: Sparkles, title: "AI-first try-ons", body: "Photoreal AR previews that let shoppers see themselves in any garment before buying." },
  { icon: Target, title: "Conversion obsessed", body: "Every feature ties back to turning previews into orders for the businesses we serve." },
  { icon: Eye, title: "Insight rich", body: "Deep engagement analytics so brands understand exactly what drives a sale." },
  { icon: Globe, title: "Built for India & beyond", body: "Sarees to sherwanis to suits — designed for the diversity of modern fashion retail." },
];

export default function AboutPage() {
  return (
    <div className="relative min-h-dvh overflow-hidden">
      <HeroHeader />
      <GlowBackdrop />
      <main className="mx-auto max-w-5xl px-6 pb-24 pt-36">
        <div className="text-center">
          <Badge tone="brand" className="mb-4">About</Badge>
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
            Redefining how the world <BrandGradientText>tries on clothing</BrandGradientText>
          </h1>
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-balance">
            WearBefore gives fashion businesses an AI-powered AR try-on studio — so their customers can
            visualize any outfit instantly, and brands can turn curiosity into conversions.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="bg-card/40 rounded-2xl border p-5 text-center">
              <p className="text-3xl font-semibold tabular-nums">
                <BrandGradientText>{s.value}</BrandGradientText>
              </p>
              <p className="text-muted-foreground mt-1 text-sm">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {VALUES.map((v) => (
            <div key={v.title} className="bg-card/40 rounded-2xl border p-6">
              <span className="bg-gradient-brand mb-4 grid size-11 place-items-center rounded-xl text-black">
                <v.icon className="size-5" />
              </span>
              <h3 className="font-semibold">{v.title}</h3>
              <p className="text-muted-foreground mt-1.5 text-sm">{v.body}</p>
            </div>
          ))}
        </div>

        <div className="glow-brand mt-12 flex flex-col items-center gap-4 rounded-3xl border bg-card/40 p-10 text-center">
          <h2 className="text-2xl font-semibold">Ready to see it in action?</h2>
          <div className="flex gap-3">
            <Button className="bg-gradient-brand text-black" render={<Link href="/signup" />} nativeButton={false}>
              Start free trial
            </Button>
            <Button variant="outline" render={<Link href="/contact" />} nativeButton={false}>
              Talk to us
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
