import Shortener from "./shortener";

export default function Home() {
  return (
    <div className="min-h-screen bg-page flex flex-col">
      <header className="pt-6 flex justify-center px-4">
        <nav className="flex items-center justify-between gap-16 min-w-[320px] bg-surface rounded-full pl-5 pr-1.5 py-1.5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-12px_rgba(0,0,0,0.08)]">
          <a href="#" className="flex items-center gap-2 font-semibold text-ink">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-ink text-surface text-[12px] font-bold">
              N
            </span>
            <span className="text-[15px]">NeatLink</span>
          </a>
          <a
            href="#shorten"
            className="bg-ink text-surface rounded-full px-5 py-2 text-[14px] font-medium hover:bg-ink/90 transition-colors whitespace-nowrap"
          >
            Get started
          </a>
        </nav>
      </header>

      <main className="flex-1 flex flex-col items-center px-6 pt-20 pb-24">
        <div className="inline-flex items-center gap-1.5 bg-badge text-accent text-[12px] font-medium px-3 py-1 rounded-full">
          100M+ URLs shortened daily
        </div>

        <h1 className="mt-6 text-center text-[56px] md:text-[88px] leading-[1.02] font-bold tracking-[-0.035em] text-ink max-w-4xl">
          Links that travel light.
        </h1>

        <p className="mt-6 text-center text-muted text-[17px] md:text-[19px] leading-relaxed max-w-xl">
          Paste a long URL. Get a short one. That&apos;s it.
        </p>

        <Shortener />
      </main>
    </div>
  );
}
