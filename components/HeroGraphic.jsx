export default function HeroGraphic() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[560px] animate-rise" aria-hidden="true">
      <div className="absolute inset-[9%] rounded-full border border-cyan-300/20" />
      <div className="absolute inset-[20%] rounded-full border border-sky-300/10" />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 600 600" role="img">
        <path className="map-contour" d="M34 164c79-84 117 12 195-56s111-65 190-11 99 10 145 41M12 248c99-51 149 27 225-21s147-87 238-20 90 1 128 9M9 341c73-27 128 34 210-13s151-71 224-8 115 15 164-5M37 432c95-60 148 18 218-13s134-48 210 11 86 4 120 4" />
        <path className="map-contour" d="M132 24c-31 87 52 112 3 196S57 344 110 425s18 116 10 160M254 0c-7 86 50 125 3 207s-51 145 3 219 31 113 25 171M388 16c-42 82 30 124-1 197s-29 143 30 203 44 109 41 164M503 43c-41 61 18 113-7 175s-7 130 48 173 44 89 26 144" />
        <path className="flight-route" d="M82 451C143 348 174 412 233 313S354 187 514 143" />
        <circle className="flight-node" cx="82" cy="451" r="6" />
        <circle className="flight-node" cx="233" cy="313" r="6" />
        <circle className="flight-node" cx="514" cy="143" r="6" />
        <path fill="rgba(255,255,255,.95)" d="m358 230 83-35-48 75-8-28-27-12Zm32 6 6 19 23-37-29 18Z" />
      </svg>
      <div className="absolute left-[4%] top-[29%] rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-md">
        <span className="block text-[.62rem] font-bold uppercase tracking-[.18em] text-cyan-200">Sistema</span>
        <strong className="text-sm">UAM · integrado</strong>
      </div>
      <div className="absolute bottom-[13%] right-[2%] rounded-2xl border border-white/10 bg-ink/70 px-4 py-3 backdrop-blur-md">
        <span className="block text-[.62rem] font-bold uppercase tracking-[.18em] text-cyan-200">Horizonte</span>
        <strong className="text-sm">Pesquisa aplicada</strong>
      </div>
    </div>
  );
}
