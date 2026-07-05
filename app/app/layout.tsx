export default function BusinessAppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-dvh">
      {/* Ambient brand glow */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="bg-gradient-brand absolute -left-32 -top-40 size-[32rem] rounded-full opacity-[0.10] blur-[120px]" />
        <div className="bg-gradient-brand absolute -right-40 top-1/3 size-[28rem] rounded-full opacity-[0.07] blur-[120px]" />
      </div>

      <div className="mx-auto w-full max-w-3xl px-4 pb-28 pt-4 sm:px-6 lg:max-w-5xl lg:px-8">
        {children}
      </div>
    </div>
  );
}
