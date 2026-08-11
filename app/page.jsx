import course from '@/data/course.json';
import activities from '@/data/activities.json';
import Image from 'next/image';
import HeroGraphic from '@/components/HeroGraphic';
import Icon from '@/components/Icon';
import NextMilestone from '@/components/NextMilestone';

export default function HomePage() {
  return (
    <>
      <section className="hero-shell overflow-hidden text-white">
        <div className="route-grid absolute inset-0 opacity-40" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1.05fr_.95fr] lg:py-28">
          <div className="animate-rise">
            <h1 className="max-w-3xl text-5xl font-black leading-[.95] tracking-[-0.05em] sm:text-6xl lg:text-7xl">
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
      </section>

      <section id="disciplina" className="section-shell">
        <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <div className="eyebrow">Visão geral</div>
            <h2 className="section-title mt-5">Uma disciplina orientada a sistemas.</h2>
            <p className="section-copy mt-5">{course.shortDescription}</p>
            <NextMilestone activities={activities} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {course.modules.map((module) => (
              <article className="surface-card group" key={module.number}>
                <span className="text-sm font-black tracking-[.18em] text-cyan-700">{module.number}</span>
                <h3 className="mt-5 text-xl font-bold text-ink group-hover:text-cyan-700">{module.title}</h3>
                <p className="mt-2 text-xs font-black uppercase tracking-[.14em] text-cyan-700">{module.meetings}</p>
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
                  <div className="grid h-20 w-20 place-items-center overflow-hidden rounded-2xl bg-ink text-sm font-black tracking-wider text-cyan-300">
                    {member.image ? <Image src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}${member.image}`} alt={`Retrato de ${member.name}`} width={160} height={160} className="h-full w-full object-cover object-center" /> : member.initials}
                  </div>
                  <span className="text-xs font-bold text-slate-300">0{index + 1}</span>
                </div>
                <h3 className="mt-8 text-lg font-bold leading-tight text-ink">{member.name}</h3>
                <p className="mt-2 text-sm font-semibold text-cyan-700">{member.role}</p>
                {member.linkedin && <a className="mt-5 inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-2 text-xs font-black text-slate-600 transition hover:border-cyan-400 hover:text-cyan-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-700" href={member.linkedin} target="_blank" rel="noreferrer" aria-label={`Abrir LinkedIn de ${member.name}`}><Icon name="linkedin" className="h-4 w-4" /> LinkedIn</a>}
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
