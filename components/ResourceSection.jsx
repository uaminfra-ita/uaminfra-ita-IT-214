import Icon from './Icon';

export default function ResourceSection({ id, label, title, description, resources }) {
  return (
    <section id={id} className="scroll-mt-28 border-t border-slate-200 py-12 first:border-0 first:pt-0">
      <div className="grid gap-8 lg:grid-cols-[.6fr_1.4fr]">
        <div>
          <span className="text-xs font-black uppercase tracking-[.18em] text-cyan-700">{label}</span>
          <h2 className="mt-3 text-2xl font-black tracking-tight text-ink">{title}</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
        </div>
        {resources.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {resources.map((resource) => (
              <a className="surface-card group" href={resource.url} target="_blank" rel="noreferrer" key={resource.title}>
                <div className="flex items-start justify-between gap-4">
                  <Icon name="file" className="h-6 w-6 text-cyan-700" />
                  <Icon name="external" className="h-4 w-4 text-slate-400 transition group-hover:text-cyan-700" />
                </div>
                <h3 className="mt-6 font-bold text-ink">{resource.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{resource.description}</p>
              </a>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center">
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-slate-100 text-slate-500"><Icon name="library" /></div>
            <h3 className="mt-4 font-bold text-ink">Catálogo em preparação</h3>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">Novos recursos serão adicionados pela equipe docente com referência, descrição e endereço oficial.</p>
          </div>
        )}
      </div>
    </section>
  );
}
