import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { GlowBackdrop } from "@/components/brand/brand";

const PERKS = ["14-day free trial", "500 AR credits included", "No credit card required"];

export default function SignupPage() {
  return (
    <div className="relative flex min-h-dvh items-center justify-center overflow-hidden px-4 py-12">
      <GlowBackdrop />
      <div className="glass w-full max-w-md rounded-3xl p-8">
        <Link href="/" className="inline-flex">
          <Logo />
        </Link>
        <h1 className="mt-8 text-2xl font-semibold tracking-tight">Create your account</h1>
        <p className="text-muted-foreground mt-1 text-sm">Start generating AR try-ons in minutes.</p>

        <ul className="mt-5 space-y-1.5">
          {PERKS.map((p) => (
            <li key={p} className="flex items-center gap-2 text-sm text-muted-foreground">
              <Check className="size-4 text-[var(--brand-to)]" /> {p}
            </li>
          ))}
        </ul>

        <div className="mt-6 space-y-3">
          <input placeholder="Business name" className="bg-muted/40 h-11 w-full rounded-xl border px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/40" />
          <input placeholder="Work email" type="email" className="bg-muted/40 h-11 w-full rounded-xl border px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/40" />
          <input placeholder="Password" type="password" className="bg-muted/40 h-11 w-full rounded-xl border px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/40" />
          <Button className="bg-gradient-brand h-11 w-full text-black" render={<Link href="/app" />} nativeButton={false}>
            Create account <ArrowRight className="size-4" />
          </Button>
        </div>

        <p className="text-muted-foreground mt-6 text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-foreground hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
