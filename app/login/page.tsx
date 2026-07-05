import Link from "next/link";
import { ArrowRight, Building2, Shield } from "lucide-react";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { GlowBackdrop } from "@/components/brand/brand";

export default function LoginPage() {
  return (
    <div className="relative flex min-h-dvh items-center justify-center overflow-hidden px-4 py-12">
      <GlowBackdrop />
      <div className="glass w-full max-w-md rounded-3xl p-8">
        <Link href="/" className="inline-flex">
          <Logo />
        </Link>
        <h1 className="mt-8 text-2xl font-semibold tracking-tight">Welcome back</h1>
        <p className="text-muted-foreground mt-1 text-sm">Sign in to your WearBefore workspace.</p>

        <div className="mt-6 space-y-3">
          <input placeholder="Email" type="email" className="bg-muted/40 h-11 w-full rounded-xl border px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/40" />
          <input placeholder="Password" type="password" className="bg-muted/40 h-11 w-full rounded-xl border px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/40" />
          <Button className="bg-gradient-brand h-11 w-full text-black" render={<Link href="/app" />} nativeButton={false}>
            Sign in <ArrowRight className="size-4" />
          </Button>
        </div>

        <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
          <span className="h-px flex-1 bg-border" /> demo shortcuts <span className="h-px flex-1 bg-border" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" render={<Link href="/app" />} nativeButton={false}>
            <Building2 className="size-4" /> Business
          </Button>
          <Button variant="outline" render={<Link href="/admin" />} nativeButton={false}>
            <Shield className="size-4" /> Admin
          </Button>
        </div>

        <p className="text-muted-foreground mt-6 text-center text-sm">
          No account?{" "}
          <Link href="/signup" className="text-foreground hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
