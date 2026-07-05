const FOMO_TICKER_ITEMS = [
  { brand: "RAYMOND", metric: "2X SALES INCREASE", change: "+100%", positive: true },
  { brand: "MANYAVAR", metric: "NOW ONBOARDED", change: "LIVE", positive: true },
  { brand: "PANTALOONS", metric: "12 STORES LIVE", change: "+2.1%", positive: true },
  { brand: "JACK & JONES", metric: "27% FEWER RETURNS", change: "+27%", positive: true },
  { brand: "DUKE", metric: "MUMBAI — LIVE", change: "NEW", positive: true },
  { brand: "WEARBEFORE", metric: "34K PREVIEWS / MO", change: "+18%", positive: true },
] as const;

function TickerItem({
  brand,
  metric,
  change,
  positive,
}: (typeof FOMO_TICKER_ITEMS)[number]) {
  return (
    <span className="inline-flex shrink-0 items-center gap-3 px-6 text-sm font-medium tracking-wide">
      <span className="text-[#f5c542]">{brand}</span>
      <span className="text-white">{metric}</span>
      <span className={positive ? "text-[#22c55e]" : "text-[#ef4444]"}>{change}</span>
    </span>
  );
}

function TickerTrack({ ariaHidden }: { ariaHidden?: boolean }) {
  return (
    <div
      className="flex shrink-0 items-center"
      aria-hidden={ariaHidden}
    >
      {FOMO_TICKER_ITEMS.map((item) => (
        <TickerItem key={item.brand} {...item} />
      ))}
    </div>
  );
}

export function FomoTicker() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-30 overflow-hidden border-t border-white/10 bg-black"
      aria-label="Recent retailer updates"
    >
      <div className="flex h-10 items-center overflow-hidden md:h-11">
        <div className="marquee-scroll flex w-max items-center font-mono tabular-nums will-change-transform motion-reduce:overflow-x-auto motion-reduce:will-change-auto">
          <TickerTrack />
          <TickerTrack ariaHidden />
        </div>
      </div>
    </div>
  );
}
