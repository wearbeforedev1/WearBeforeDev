"use client";

import * as React from "react";
import Link from "next/link";
import {
  Camera,
  ChevronRight,
  Menu,
  Play,
  RefreshCw,
  Shirt,
  Sparkles,
  Upload,
  User,
  Zap,
} from "lucide-react";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Stepper, type Step } from "@/components/ar/stepper";
import { ARGenerationFlow } from "@/components/ar/generation-flow";
import { cn } from "@/lib/utils";
import { num } from "@/lib/format";
import { CURRENT_BUSINESS, CURRENT_USER } from "@/lib/mock/data";
import type { GarmentCategory } from "@/lib/types";

const STEPS: Step[] = [
  { id: "upload", label: "Upload" },
  { id: "select", label: "Select" },
  { id: "generate", label: "Generate" },
];

interface Garment {
  category: GarmentCategory;
  emoji: string;
  subtitle: string;
}

interface GarmentSet {
  primary: Garment[];
  all: Garment[];
}

const MALE_PRIMARY: Garment[] = [
  { category: "Shirt", emoji: "👔", subtitle: "Formal / Casual" },
  { category: "Trousers", emoji: "👖", subtitle: "Pants / Bottoms" },
  { category: "Blazer", emoji: "🧥", subtitle: "Formal jacket" },
  { category: "3-Piece Suit", emoji: "🤵", subtitle: "Coat + Vest + Pants" },
  { category: "Nehru Jacket", emoji: "🧥", subtitle: "Sleeveless coat" },
  { category: "Indo-Western", emoji: "✨", subtitle: "Fusion wear" },
];

const MALE_EXTRA: Garment[] = [
  { category: "Sherwani", emoji: "👘", subtitle: "Festive wear" },
  { category: "Kurta", emoji: "👕", subtitle: "Ethnic top" },
  { category: "Suit", emoji: "🤵", subtitle: "2-piece formal" },
];

const FEMALE_PRIMARY: Garment[] = [
  { category: "Saree", emoji: "🥻", subtitle: "Traditional drape" },
  { category: "Kurti", emoji: "👚", subtitle: "Ethnic top" },
  { category: "Gown", emoji: "👗", subtitle: "Evening wear" },
  { category: "Lehenga", emoji: "👘", subtitle: "Festive set" },
  { category: "Anarkali", emoji: "🥻", subtitle: "Flared suit" },
  { category: "Indo-Western", emoji: "✨", subtitle: "Fusion wear" },
];

const FEMALE_EXTRA: Garment[] = [
  { category: "Blazer", emoji: "🧥", subtitle: "Formal jacket" },
];

const MALE_GARMENTS: GarmentSet = {
  primary: MALE_PRIMARY,
  all: [...MALE_PRIMARY, ...MALE_EXTRA],
};

const FEMALE_GARMENTS: GarmentSet = {
  primary: FEMALE_PRIMARY,
  all: [...FEMALE_PRIMARY, ...FEMALE_EXTRA],
};

function readFile(file: File | undefined, onLoad: (url: string) => void) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => onLoad(reader.result as string);
  reader.readAsDataURL(file);
}

function PhotoCard({
  step,
  title,
  subtitle,
  icon: Icon,
  accent,
  value,
  onChange,
}: {
  step: string;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  accent: string;
  value: string | null;
  onChange: (url: string | null) => void;
}) {
  const uploadRef = React.useRef<HTMLInputElement>(null);
  const cameraRef = React.useRef<HTMLInputElement>(null);

  return (
    <div className="bg-card/40 relative overflow-hidden rounded-2xl border p-4 backdrop-blur-sm">
      <span className="text-muted-foreground absolute right-3 top-3 rounded-md border bg-white/5 px-2 py-0.5 text-[11px] font-medium">
        {step}
      </span>

      {value ? (
        <div className="group relative mx-auto aspect-[3/4] w-full max-w-[160px] overflow-hidden rounded-xl border">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt={title} className="size-full object-cover" />
          <button
            onClick={() => uploadRef.current?.click()}
            className="glass absolute inset-x-2 bottom-2 flex items-center justify-center gap-1.5 rounded-lg py-1.5 text-xs"
          >
            <RefreshCw className="size-3.5" /> Replace
          </button>
        </div>
      ) : (
        <>
          <div className="flex flex-col items-center pt-2 text-center">
            <span
              className="grid size-14 place-items-center rounded-full border"
              style={{ backgroundColor: `color-mix(in oklch, ${accent} 16%, transparent)`, borderColor: `color-mix(in oklch, ${accent} 40%, transparent)` }}
            >
              <Icon className="size-6" />
            </span>
            <p className="mt-3 text-sm font-semibold">{title}</p>
            <p className="text-muted-foreground text-xs">{subtitle}</p>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <Button variant="outline" size="sm" onClick={() => uploadRef.current?.click()}>
              <Upload className="size-4" /> Upload
            </Button>
            <Button variant="outline" size="sm" onClick={() => cameraRef.current?.click()}>
              <Camera className="size-4" /> Camera
            </Button>
          </div>
        </>
      )}

      <input
        ref={uploadRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => readFile(e.target.files?.[0], onChange)}
      />
      <input
        ref={cameraRef}
        type="file"
        accept="image/*"
        capture="environment"
        hidden
        onChange={(e) => readFile(e.target.files?.[0], onChange)}
      />
    </div>
  );
}

function GarmentTile({
  garment,
  active,
  onSelect,
}: {
  garment: Garment;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      className={cn(
        "relative flex flex-col items-center gap-2 rounded-2xl border p-3 text-center transition-all",
        active ? "border-gradient-brand bg-white/5" : "bg-card/30 hover:border-white/20 hover:bg-white/5"
      )}
    >
      <span className="grid aspect-square w-full place-items-center rounded-xl border bg-white/5 text-3xl">
        {garment.emoji}
      </span>
      <span className="text-sm font-medium leading-tight">{garment.category}</span>
      <span className="text-muted-foreground text-[11px] leading-tight">{garment.subtitle}</span>
      {active && <span className="bg-gradient-brand absolute right-2 top-2 size-2 rounded-full" />}
    </button>
  );
}

export default function TryOnPage() {
  const [customerPhoto, setCustomerPhoto] = React.useState<string | null>(null);
  const [garmentPhoto, setGarmentPhoto] = React.useState<string | null>(null);
  const [customerType, setCustomerType] = React.useState<"Male" | "Female">("Male");
  const [category, setCategory] = React.useState<GarmentCategory | null>(null);
  const [showAll, setShowAll] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [guideOpen, setGuideOpen] = React.useState(false);
  const [running, setRunning] = React.useState(false);

  const firstName = CURRENT_USER.name.split(" ")[0];
  const photosDone = !!customerPhoto && !!garmentPhoto;
  const canGenerate = photosDone && !!category;
  const currentStep = running ? 2 : !photosDone ? 0 : !category ? 1 : 2;

  function restart() {
    setRunning(false);
    setCustomerPhoto(null);
    setGarmentPhoto(null);
    setCategory(null);
    setShowAll(false);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const garmentSet = customerType === "Female" ? FEMALE_GARMENTS : MALE_GARMENTS;
  const garments = showAll ? garmentSet.all : garmentSet.primary;

  return (
    <div className="space-y-5">
      {/* Top bar */}
      <header className="flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Logo />
        </Link>
        <div className="flex items-center gap-2">
          <span className="glass flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium">
            <Zap className="size-4 text-[var(--brand-to)]" />
            {num(CURRENT_BUSINESS.creditsRemaining)} credits
          </span>
          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Menu"
            className="glass grid size-9 place-items-center rounded-full"
          >
            <Menu className="size-4.5" />
          </button>
        </div>
      </header>

      {/* Stepper */}
      <div className="bg-card/40 overflow-x-auto rounded-2xl border p-4">
        <Stepper steps={STEPS} current={currentStep} />
      </div>

      {running && customerPhoto && garmentPhoto && category ? (
        <ARGenerationFlow
          customerPhoto={customerPhoto}
          garmentPhoto={garmentPhoto}
          category={category}
          customerType={customerType}
          onRestart={restart}
        />
      ) : (
        <>
          {/* Greeting */}
          <section className="relative overflow-hidden">
            <div className="bg-gradient-brand absolute -right-10 -top-6 size-40 rounded-full opacity-20 blur-3xl" />
            <div className="relative flex items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  Welcome back, <span className="text-gradient-brand">{firstName}</span> 👋
                </h1>
                <p className="text-muted-foreground mt-1 text-sm">Let&apos;s create your perfect look.</p>
              </div>
              <div className="hidden shrink-0 sm:block">
                <span className="bg-gradient-brand grid size-16 place-items-center rounded-2xl text-2xl opacity-90">
                  🧍
                </span>
              </div>
            </div>
          </section>

          {/* Guide card */}
          <button
            onClick={() => setGuideOpen(true)}
            className="border-gradient-brand flex w-full items-center gap-4 rounded-2xl p-4 text-left"
          >
            <span className="bg-gradient-brand grid size-12 shrink-0 place-items-center rounded-xl text-black">
              <Play className="size-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold">New here?</p>
              <p className="text-muted-foreground text-xs">Watch a quick 90-second guide to get started.</p>
            </div>
            <span className="bg-gradient-brand hidden shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-black sm:flex">
              <Play className="size-4" /> Play guide
            </span>
          </button>

          {/* Photo cards */}
          <div className="grid gap-4 sm:grid-cols-2">
            <PhotoCard
              step="Step 1"
              title="Customer Photo"
              subtitle="Use a full-body image"
              icon={User}
              accent="var(--brand-via)"
              value={customerPhoto}
              onChange={setCustomerPhoto}
            />
            <PhotoCard
              step="Step 2"
              title="Garment Photo"
              subtitle="Use a clear garment image"
              icon={Shirt}
              accent="var(--brand-from)"
              value={garmentPhoto}
              onChange={setGarmentPhoto}
            />
          </div>

          {/* Customer type */}
          <div className="bg-card/40 flex flex-col gap-3 rounded-2xl border p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <span className="grid size-9 place-items-center rounded-lg border bg-white/5">
                <User className="size-4.5" />
              </span>
              <span className="text-sm font-medium">Customer Type</span>
            </div>
            <div className="bg-muted/40 grid grid-cols-2 gap-1 rounded-xl p-1 sm:w-72">
              {(["Male", "Female"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => {
                    setCustomerType(t);
                    setCategory(null);
                    setShowAll(false);
                  }}
                  className={cn(
                    "rounded-lg py-2 text-sm font-medium transition-colors",
                    customerType === t ? "bg-gradient-brand text-black" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {t === "Male" ? "♂ " : "♀ "}
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Garment grid */}
          <section className="bg-card/40 rounded-2xl border p-4">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="grid size-9 place-items-center rounded-lg border bg-white/5">
                  <Shirt className="size-4.5" />
                </span>
                <div>
                  <p className="text-sm font-semibold">Choose Garment</p>
                  <p className="text-muted-foreground text-xs">Pick the category you want to try on</p>
                </div>
              </div>
              <button
                onClick={() => setShowAll((s) => !s)}
                className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-xs font-medium"
              >
                {showAll ? "Show less" : "View all"} <ChevronRight className="size-3.5" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {garments.map((g) => (
                <GarmentTile
                  key={g.category}
                  garment={g}
                  active={category === g.category}
                  onSelect={() => setCategory(g.category)}
                />
              ))}
            </div>
          </section>
        </>
      )}

      {/* Sticky CTA */}
      {!running && (
        <div className="fixed inset-x-0 bottom-0 z-20 border-t bg-background/80 backdrop-blur-xl">
          <div className="mx-auto w-full max-w-3xl px-4 py-3 sm:px-6 lg:max-w-5xl lg:px-8">
            <Button
              size="lg"
              className="bg-gradient-brand h-12 w-full text-black"
              disabled={!canGenerate}
              onClick={() => {
                setRunning(true);
                if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <Sparkles className="size-5" /> Generate Try-On
            </Button>
            {!canGenerate && (
              <p className="text-muted-foreground mt-1.5 text-center text-xs">
                {photosDone ? "Choose a garment category to continue" : "Add both photos to continue"}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Menu sheet */}
      <Modal open={menuOpen} onClose={() => setMenuOpen(false)} title="Menu">
        <nav className="flex flex-col gap-1">
          <Link href="/" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-2.5 text-sm hover:bg-white/5">
            Home
          </Link>
          <Link href="/pricing" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-2.5 text-sm hover:bg-white/5">
            Pricing
          </Link>
          <Link href="/admin" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-2.5 text-sm hover:bg-white/5">
            Admin Console
          </Link>
          <Link href="/login" onClick={() => setMenuOpen(false)} className="text-destructive rounded-lg px-3 py-2.5 text-sm hover:bg-white/5">
            Log out
          </Link>
        </nav>
      </Modal>

      {/* Guide modal */}
      <Modal open={guideOpen} onClose={() => setGuideOpen(false)} title="Quick start guide" description="A 90-second walkthrough of creating your first AR try-on.">
        <div className="bg-muted/30 grid aspect-video place-items-center rounded-xl border">
          <span className="bg-gradient-brand grid size-14 place-items-center rounded-full text-black">
            <Play className="size-6" />
          </span>
        </div>
      </Modal>
    </div>
  );
}
