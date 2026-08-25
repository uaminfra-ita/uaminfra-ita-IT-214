import Icon from './Icon';

function assetUrl(path) {
  return `${process.env.NEXT_PUBLIC_BASE_PATH || ''}${path}`;
}

function ResourceCard({ resource }) {
  const fileUrl = assetUrl(resource.assetPath);
  const extension = resource.assetPath.split('.').pop().toUpperCase();
  const isPdf = extension === 'PDF';
  const identifier = resource.doi ? `DOI ${resource.doi}` : resource.documentNumber;

  return (
    <article className="surface-card flex h-full flex-col" id={resource.id}>
      <div className="flex items-start justify-between gap-4">
        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-cyan-50 text-cyan-700">
          <Icon name="file" className="h-6 w-6" />
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-[.65rem] font-black uppercase tracking-[.12em] text-slate-600">{resource.year}</span>
      </div>
      <h3 className="mt-5 text-lg font-black leading-6 text-ink">{resource.title}</h3>
      <p className="mt-2 text-sm font-semibold leading-6 text-cyan-800">{resource.authors.join(', ')}</p>
      <p className="mt-1 text-xs leading-5 text-slate-500">{resource.publication}</p>
      {identifier && <p className="mt-2 text-[.68rem] font-bold uppercase tracking-[.08em] text-slate-400">{identifier}</p>}
      <p className="mt-4 flex-1 text-sm leading-6 text-slate-600">{resource.summary}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {resource.tags.map((tag) => <span className="rounded-full bg-mist px-3 py-1 text-[.68rem] font-bold text-slate-600" key={tag}>{tag}</span>)}
      </div>
      <div className={`mt-5 grid gap-2 ${isPdf ? 'sm:grid-cols-3' : 'sm:grid-cols-2'}`}>
        {isPdf && <a className="button-dark !px-3 !py-2 text-xs" href={fileUrl} target="_blank" rel="noreferrer">Ler PDF</a>}
        <a className={`${isPdf ? '' : 'button-dark'} inline-flex items-center justify-center rounded-full border border-slate-200 px-3 py-2 text-xs font-black transition hover:border-cyan-400`} href={fileUrl} download>{`Baixar ${extension}`}</a>
        <a className="inline-flex items-center justify-center gap-1 rounded-full border border-slate-200 px-3 py-2 text-xs font-black text-slate-700 transition hover:border-cyan-400" href={resource.publisherUrl} target="_blank" rel="noreferrer" aria-label={`Abrir fonte oficial de ${resource.title}`}>Fonte oficial <Icon name="external" className="h-3.5 w-3.5" /></a>
      </div>
    </article>
  );
}

export default function ResourceSection({ id, label, title, description, resources }) {
  return (
    <section id={id} className="scroll-mt-28 border-t border-slate-200 py-12 first:border-0 first:pt-0">
      <div className="grid gap-8 lg:grid-cols-[.5fr_1.5fr]">
        <div>
          <span className="text-xs font-black uppercase tracking-[.18em] text-cyan-700">{label}</span>
          <h2 className="mt-3 text-2xl font-black tracking-tight text-ink">{title}</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
        </div>
        {resources.length > 0 ? (
          <div className={`grid gap-4 ${resources.length === 4 ? 'xl:grid-cols-2' : 'xl:grid-cols-3'}`}>
            {resources.map((resource) => <ResourceCard resource={resource} key={resource.id} />)}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center">
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-slate-100 text-slate-500"><Icon name="library" /></div>
            <h3 className="mt-4 font-bold text-ink">Catálogo em preparação</h3>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">Novos recursos serão adicionados pela equipe docente com público, referência e endereço oficial definidos.</p>
          </div>
        )}
      </div>
    </section>
  );
}
