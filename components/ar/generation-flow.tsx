"use client";

import * as React from "react";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Eye,
  Loader2,
  MousePointerClick,
  RefreshCw,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ShareCard } from "@/components/ar/share-card";
import { Badge } from "@/components/ui/badge";
import { arProvider, type ARProgress, type ARResult } from "@/lib/ar/provider";
import { cn } from "@/lib/utils";
import type { GarmentCategory } from "@/lib/types";

type Stage = "generating" | "review" | "share" | "track";

interface GenerationFlowProps {
  customerPhoto: string;
  garmentPhoto: string;
  category: GarmentCategory;
  customerType?: "Male" | "Female";
  onRestart: () => void;
}

const TRACK_STAGES = ["Link Opened", "AR Viewed", "Interaction", "Converted"];

export function ARGenerationFlow({
  customerPhoto,
  garmentPhoto,
  category,
  customerType,
  onRestart,
}: GenerationFlowProps) {
  const [stage, setStage] = React.useState<Stage>("generating");
  const [progress, setProgress] = React.useState<ARProgress | null>({ pct: 0, label: "Starting" });
  const [generating, setGenerating] = React.useState(true);
  const [result, setResult] = React.useState<ARResult | null>(null);
  const [selectedVariant, setSelectedVariant] = React.useState(0);
  const [conversionStage, setConversionStage] = React.useState(1);

  const generate = React.useCallback(async () => {
    setGenerating(true);
    setStage("generating");
    setProgress({ pct: 0, label: "Starting" });
    const res = await arProvider.generate(
      { customerPhoto, garmentPhoto, category, customerType },
      (p) => setProgress(p)
    );
    setResult(res);
    setGenerating(false);
    setStage("review");
  }, [customerPhoto, garmentPhoto, category, customerType]);

  React.useEffect(() => {
    // Kick off generation once when this flow mounts (user already pressed Generate).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    generate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-card/40 min-h-[24rem] rounded-3xl border p-5 backdrop-blur-sm md:p-7">
      {/* Generating */}
      {stage === "generating" && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Loader2 className="text-[var(--brand-via)] mx-auto size-10 animate-spin" />
          <p className="mt-4 text-sm font-medium">{progress?.label ?? "Working"}</p>
          <div className="bg-muted/50 mx-auto mt-4 h-2 w-full max-w-md overflow-hidden rounded-full">
            <div
              className="bg-gradient-brand h-full rounded-full transition-all duration-300"
              style={{ width: `${progress?.pct ?? 0}%` }}
            />
          </div>
          <p className="text-muted-foreground mt-2 text-xs tabular-nums">{progress?.pct ?? 0}%</p>
          <p className="text-muted-foreground mt-4 max-w-sm text-xs">
            Generating your {category} try-on. The mock engine simulates the real AI pipeline.
          </p>
        </div>
      )}

      {/* Review */}
      {stage === "review" && result && (
        <div className="grid gap-6 md:grid-cols-[1fr_1.2fr]">
          <div className="bg-muted/30 overflow-hidden rounded-2xl border">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={result.variants[selectedVariant] ?? result.resultUrl}
              alt="AR preview"
              className="aspect-[3/4] w-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold">Preview ready</h2>
              <Badge tone="success">{result.status}</Badge>
            </div>
            <p className="text-muted-foreground mt-1 text-sm">
              Provider: {result.provider} · {result.creditCost} credit used
            </p>

            <p className="text-muted-foreground mt-5 mb-2 text-xs font-medium">Variants</p>
            <div className="flex gap-2">
              {result.variants.map((v, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedVariant(i)}
                  className={cn(
                    "overflow-hidden rounded-xl border-2 transition-colors",
                    selectedVariant === i ? "border-[var(--brand-via)]" : "border-transparent"
                  )}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={v} alt={`Variant ${i + 1}`} className="size-16 object-cover" />
                </button>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <Button variant="outline" onClick={generate}>
                <RefreshCw className="size-4" /> Regenerate
              </Button>
              <Button className="bg-gradient-brand text-black" onClick={() => setStage("share")}>
                Share with customer <ArrowRight className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Share */}
      {stage === "share" && result && (
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-1 text-lg font-semibold">Share with customer</h2>
          <p className="text-muted-foreground mb-5 text-sm">
            Send the interactive preview link or let them scan the QR code.
          </p>
          <ShareCard link={`https://wearbefore.app/p/${result.id}`} />
          <div className="mt-6 flex justify-end">
            <Button className="bg-gradient-brand text-black" onClick={() => setStage("track")}>
              Track conversion <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Track */}
      {stage === "track" && result && (
        <div className="mx-auto max-w-lg">
          <h2 className="mb-1 text-lg font-semibold">Track conversion</h2>
          <p className="text-muted-foreground mb-6 text-sm">
            Live status of this preview as the customer engages.
          </p>
          <ol className="space-y-3">
            {TRACK_STAGES.map((s, i) => {
              const done = i < conversionStage;
              const Icon = i === 3 ? CheckCircle2 : i === 2 ? MousePointerClick : Eye;
              return (
                <li key={s} className="flex items-center gap-3">
                  <span
                    className={cn(
                      "grid size-9 place-items-center rounded-xl border",
                      done ? "bg-gradient-brand border-transparent text-black" : "text-muted-foreground bg-white/5"
                    )}
                  >
                    {done ? <Check className="size-4" /> : <Icon className="size-4" />}
                  </span>
                  <span className={cn("text-sm", done ? "text-foreground" : "text-muted-foreground")}>{s}</span>
                  {done && (
                    <Badge tone="success" className="ml-auto">
                      Done
                    </Badge>
                  )}
                </li>
              );
            })}
          </ol>
          <div className="mt-6 flex gap-2">
            <Button
              variant="outline"
              onClick={() => setConversionStage((s) => Math.min(4, s + 1))}
              disabled={conversionStage >= 4}
            >
              Simulate next event
            </Button>
            <Button className="bg-gradient-brand text-black" onClick={onRestart}>
              <RotateCcw className="size-4" /> New try-on
            </Button>
          </div>
        </div>
      )}

      {/* Restart escape hatch while not on track */}
      {!generating && stage !== "track" && (
        <div className="mt-6 border-t pt-4">
          <Button variant="outline" size="sm" onClick={onRestart}>
            <RotateCcw className="size-4" /> Start over
          </Button>
        </div>
      )}
    </div>
  );
}
