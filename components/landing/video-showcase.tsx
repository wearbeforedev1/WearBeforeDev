"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, Shirt } from "lucide-react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { BrandGradientText } from "@/components/brand/brand";
import { Badge } from "@/components/ui/badge";

const DEMO_VIDEO_URL = process.env.NEXT_PUBLIC_DEMO_VIDEO_URL ?? "";

export function VideoShowcase() {
  const [playing, setPlaying] = React.useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  function handlePlay() {
    if (DEMO_VIDEO_URL) {
      setPlaying(true);
      return;
    }
    setPlaying(true);
  }

  React.useEffect(() => {
    if (playing && DEMO_VIDEO_URL && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [playing]);

  return (
    <section id="how-it-works" className="relative scroll-mt-28 py-20 md:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
      />

      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <Badge tone="brand" className="mb-4">
            Product demo
          </Badge>
          <h2 className="text-3xl font-semibold tracking-tight text-balance md:text-4xl lg:text-5xl">
            From raw fabric to <BrandGradientText>finished look</BrandGradientText> in seconds
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-balance text-base md:text-lg">
            Watch how a shopkeeper snaps a customer&apos;s photo, selects a swatch, and shows them
            exactly how they&apos;ll look once the garment is made — right there on the shop floor.
          </p>
        </div>

        <div className="mt-12 lg:mt-16">
          <div className="border-gradient-brand glow-brand relative mx-auto max-w-5xl overflow-hidden rounded-3xl p-1">
            <div className="bg-card/60 relative overflow-hidden rounded-[calc(1.5rem-4px)] backdrop-blur-sm">
              <div className="relative aspect-video w-full">
                {playing && DEMO_VIDEO_URL ? (
                  <video
                    ref={videoRef}
                    src={DEMO_VIDEO_URL}
                    controls
                    autoPlay
                    playsInline
                    className="size-full object-cover"
                  />
                ) : (
                  <>
                    <Image
                      src="https://images.unsplash.com/photo-1441984904996-e0b6a687ef46?q=80&w=1920&auto=format&fit=crop"
                      alt="Fashion retail shop interior"
                      fill
                      className="object-cover opacity-60"
                      priority={false}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />

                    {/* Floating step preview */}
                    <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3 sm:inset-x-8 sm:bottom-8">
                      <div className="hidden flex-col gap-2 sm:flex">
                        {[
                          { step: "01", text: "Customer photo captured" },
                          { step: "02", text: "Linen swatch selected" },
                          { step: "03", text: "AI preview generated" },
                        ].map((item) => (
                          <div
                            key={item.step}
                            className="glass flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm"
                          >
                            <span className="bg-gradient-brand grid size-7 place-items-center rounded-lg text-xs font-semibold text-black">
                              {item.step}
                            </span>
                            <span className="font-medium">{item.text}</span>
                          </div>
                        ))}
                      </div>

                      <button
                        onClick={handlePlay}
                        className="group mx-auto flex flex-col items-center gap-3 sm:mx-0"
                        aria-label="Play product demo"
                      >
                        <span className="bg-gradient-brand grid size-20 place-items-center rounded-full text-black shadow-2xl transition-transform duration-300 group-hover:scale-105 sm:size-24">
                          <Play className="size-8 fill-current sm:size-10" />
                        </span>
                        <span className="text-sm font-medium text-white/90">
                          {DEMO_VIDEO_URL ? "Play 90-second demo" : "See how it works"}
                        </span>
                      </button>

                      <div className="glass hidden rounded-2xl border p-3 sm:block">
                        <div className="flex items-center gap-2 text-xs font-medium">
                          <Shirt className="size-4 text-[var(--brand-to)]" />
                          Live in-store preview
                        </div>
                        <div className="mt-2 aspect-[3/4] w-28 overflow-hidden rounded-xl border bg-white/5">
                          <Image
                            src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=400&auto=format&fit=crop"
                            alt="AI try-on preview example"
                            width={112}
                            height={149}
                            className="size-full object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={playing && !DEMO_VIDEO_URL}
        onClose={() => setPlaying(false)}
        title="WearBefore in 90 seconds"
        description="A quick walkthrough of the in-store try-on flow."
        className="max-w-3xl"
      >
        <div className="space-y-5">
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              {
                step: "1",
                title: "Capture",
                body: "Shopkeeper takes a full-body photo of the customer on any smartphone.",
                emoji: "📸",
              },
              {
                step: "2",
                title: "Select",
                body: "Pick the raw fabric — jute, linen, cotton — and the colour swatch.",
                emoji: "🧵",
              },
              {
                step: "3",
                title: "Preview",
                body: "WearBefore generates a photoreal preview of the finished garment on them.",
                emoji: "✨",
              },
            ].map((item) => (
              <div key={item.step} className="bg-muted/30 rounded-xl border p-4 text-center">
                <span className="text-2xl">{item.emoji}</span>
                <p className="mt-2 text-sm font-semibold">
                  Step {item.step} · {item.title}
                </p>
                <p className="text-muted-foreground mt-1 text-xs">{item.body}</p>
              </div>
            ))}
          </div>
          <div className="bg-muted/30 flex flex-col items-center gap-3 rounded-xl border p-6 text-center">
            <p className="text-muted-foreground text-sm">
              Drop your demo video URL into{" "}
              <code className="text-foreground rounded bg-white/5 px-1.5 py-0.5 text-xs">
                NEXT_PUBLIC_DEMO_VIDEO_URL
              </code>{" "}
              to replace this walkthrough with a real recording.
            </p>
            <Button
              className="bg-gradient-brand text-black"
              render={<Link href="/app" onClick={() => setPlaying(false)} />}
              nativeButton={false}
            >
              Open the try-on studio
            </Button>
          </div>
        </div>
      </Modal>
    </section>
  );
}
