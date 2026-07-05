import { Mail, MapPin, MessageSquare, Phone } from "lucide-react";
import { HeroHeader } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BrandGradientText, GlowBackdrop } from "@/components/brand/brand";

const CHANNELS = [
  { icon: Mail, label: "Email", value: "hello@wearbefore.com" },
  { icon: Phone, label: "Phone", value: "+91 98765 43210" },
  { icon: MapPin, label: "Office", value: "Bengaluru, India" },
];

export default function ContactPage() {
  return (
    <div className="relative min-h-dvh overflow-hidden">
      <HeroHeader />
      <GlowBackdrop />
      <main className="mx-auto max-w-5xl px-6 pb-24 pt-36">
        <div className="text-center">
          <Badge tone="brand" className="mb-4">Contact</Badge>
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
            Let&apos;s build your <BrandGradientText>AR storefront</BrandGradientText>
          </h1>
          <p className="text-muted-foreground mx-auto mt-4 max-w-xl text-balance">
            Questions about plans, enterprise, or a custom AR model? Our team usually replies within a day.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="bg-card/40 rounded-3xl border p-7">
            <div className="grid gap-4 sm:grid-cols-2">
              <input placeholder="First name" className="bg-muted/40 h-11 w-full rounded-xl border px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/40" />
              <input placeholder="Last name" className="bg-muted/40 h-11 w-full rounded-xl border px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/40" />
            </div>
            <input placeholder="Work email" type="email" className="bg-muted/40 mt-4 h-11 w-full rounded-xl border px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/40" />
            <input placeholder="Company" className="bg-muted/40 mt-4 h-11 w-full rounded-xl border px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/40" />
            <textarea placeholder="How can we help?" rows={4} className="bg-muted/40 mt-4 w-full rounded-xl border px-4 py-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/40" />
            <Button className="bg-gradient-brand mt-4 text-black">
              <MessageSquare className="size-4" /> Send message
            </Button>
          </div>

          <div className="space-y-4">
            {CHANNELS.map((c) => (
              <div key={c.label} className="bg-card/40 flex items-center gap-4 rounded-2xl border p-5">
                <span className="grid size-11 place-items-center rounded-xl border bg-white/5">
                  <c.icon className="size-5" />
                </span>
                <div>
                  <p className="text-muted-foreground text-xs">{c.label}</p>
                  <p className="text-sm font-medium">{c.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
