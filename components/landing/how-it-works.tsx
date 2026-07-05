import { ArrowRight, Scissors, Store, Wand2 } from "lucide-react";
import { BrandGradientText } from "@/components/brand/brand";

const STEPS = [
  {
    icon: Store,
    title: "Customer walks in",
    body: "They're browsing fabrics and colours but can't picture the final outfit. Your shopkeeper opens WearBefore on the counter phone.",
  },
  {
    icon: Scissors,
    title: "Photo + fabric swatch",
    body: "Snap a full-body photo, then pick the raw cloth — jute, linen, cotton, silk — and the exact shade. No finished garment needed.",
  },
  {
    icon: Wand2,
    title: "AI preview, instant yes",
    body: "WearBefore renders how they'll look in the stitched piece. They see it, love it, and place the order with confidence.",
  },
];

export function HowItWorks() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="text-muted-foreground text-sm font-medium uppercase tracking-wider">
              How it works
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
              Three steps. <BrandGradientText>One confident sale.</BrandGradientText>
            </h2>
          </div>
          <p className="text-muted-foreground max-w-md text-sm md:text-base">
            Built for the rhythm of a real garment shop — fast enough for a busy Saturday,
            polished enough to impress every customer at the counter.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {STEPS.map((step, index) => (
            <div key={step.title} className="group relative">
              {index < STEPS.length - 1 && (
                <ArrowRight
                  aria-hidden
                  className="text-muted-foreground/40 absolute -right-3 top-10 hidden size-6 md:block"
                />
              )}
              <div className="bg-card/40 hover:border-white/20 h-full rounded-2xl border p-6 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="bg-gradient-brand grid size-11 place-items-center rounded-xl text-black">
                    <step.icon className="size-5" />
                  </span>
                  <span className="text-muted-foreground text-xs font-medium tabular-nums">
                    Step {index + 1}
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
