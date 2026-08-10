export default function PageHero({ eyebrow, title, description, children }) {
  return (
    <section className="page-hero">
      <div className="route-grid absolute inset-0 opacity-30" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
        <div className="eyebrow border-white/15 bg-white/10 text-cyan-200">{eyebrow}</div>
        <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <h1 className="max-w-4xl text-4xl font-black tracking-[-0.045em] sm:text-6xl">{title}</h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">{description}</p>
          </div>
          {children}
        </div>
      </div>
    </section>
  );
}
