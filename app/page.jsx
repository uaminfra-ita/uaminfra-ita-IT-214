import course from '@/data/course.json';
import activities from '@/data/activities.json';
import HeroGraphic from '@/components/HeroGraphic';
import Icon from '@/components/Icon';

export default function HomePage() {
  const today = new Date().toISOString().slice(0, 10);
  const nextCheckpoint = activities.find(
    (activity) => activity.checkpoint && activity.date >= today,
  );

  return (
    <>
      <section className="hero-shell overflow-hidden text-white">
        <div className="route-grid absolute inset-0 opacity-40" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1.05fr_.95fr] lg:py-28">
          <div className="animate-rise">
            <div className="eyebrow border-white/20 bg-white/10 text-cyan-100">
              <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_16px_#67e8f9]" />
              Pós-graduação · {course.term}
            </div>
            <h1 className="mt-7 max-w-3xl text-5xl font-black leading-[.95] tracking-[-0.05em] sm:text-6xl lg:text-7xl">
              Mobilidade aérea
              <span className="block text-cyan-300">em perspectiva.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-200 sm:text-xl">
              {course.description}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a className="button-primary" href="#disciplina">
                Conheça a disciplina <Icon name="arrow" className="h-4 w-4" />
              </a>
              <a className="button-ghost" href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/atividades/`}>
                Ver cronograma
              </a>
            </div>
          </div>
          <HeroGraphic />
        </div>
        <div className="relative border-t border-white/10">
          <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-white/10 px-5 sm:grid-cols-4 sm:px-8">
            {[
              ['16', 'encontros'],
              ['04', 'eixos formativos'],
              ['04', 'checkpoints'],
              ['08', 'pesquisadores'],
            ].map(([value, label]) => (
              <div className="px-4 py-6 first:pl-0 sm:px-8" key={label}>
                <strong className="block text-2xl font-bold text-white">{value}</strong>
                <span className="text-xs uppercase tracking-[.16em] text-slate-400">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="disciplina" className="section-shell">
        <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <div className="eyebrow">Visão geral</div>
            <h2 className="section-title mt-5">Uma disciplina orientada a sistemas.</h2>
            <p className="section-copy mt-5">{course.shortDescription}</p>
            {nextCheckpoint && (
              <div className="mt-8 rounded-3xl bg-ink p-6 text-white shadow-lift">
                <span className="text-xs font-bold uppercase tracking-[.18em] text-cyan-300">Próximo marco</span>
                <h3 className="mt-3 text-xl font-bold">{nextCheckpoint.checkpoint} · {nextCheckpoint.theme}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">{nextCheckpoint.deliverable}</p>
              </div>
            )}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {course.modules.map((module) => (
              <article className="surface-card group" key={module.number}>
                <span className="text-sm font-black tracking-[.18em] text-cyan-700">{module.number}</span>
                <h3 className="mt-5 text-xl font-bold text-ink group-hover:text-cyan-700">{module.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{module.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="section-shell">
          <div className="max-w-3xl">
            <div className="eyebrow">Equipe docente</div>
            <h2 className="section-title mt-5">Orientação técnica e acadêmica.</h2>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {course.staff.map((member, index) => (
              <article className="staff-card" key={member.name}>
                <div className="flex items-center justify-between">
                  <div className="grid h-14 w-14 place-items-center rounded-2xl bg-ink text-sm font-black tracking-wider text-cyan-300">
                    {member.initials}
                  </div>
                  <span className="text-xs font-bold text-slate-300">0{index + 1}</span>
                </div>
                <h3 className="mt-8 text-lg font-bold leading-tight text-ink">{member.name}</h3>
                <p className="mt-2 text-sm font-semibold text-cyan-700">{member.role}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="overflow-hidden rounded-[2rem] bg-cyan-300 p-8 text-ink shadow-lift sm:p-12">
          <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <span className="text-xs font-black uppercase tracking-[.2em]">IT-214 · 2026/2</span>
              <h2 className="mt-4 max-w-3xl text-3xl font-black tracking-tight sm:text-4xl">Da leitura crítica à apresentação de um artigo completo.</h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-700">{course.schedule}. Consulte a sequência de encontros e prepare cada entrega com antecedência.</p>
            </div>
            <a className="button-dark" href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/atividades/`}>
              Explorar atividades <Icon name="arrow" className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
