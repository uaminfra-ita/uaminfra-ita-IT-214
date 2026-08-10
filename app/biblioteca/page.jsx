import PageHero from '@/components/PageHero';
import ResourceSection from '@/components/ResourceSection';
import course from '@/data/course.json';
import resources from '@/data/resources.json';
import activities from '@/data/activities.json';

export const metadata = { title: 'Biblioteca' };

export default function LibraryPage() {
  const checkpoints = activities.filter((activity) => activity.checkpoint);

  return (
    <>
      <PageHero eyebrow="Conhecimento compartilhado" title="Biblioteca técnica" description="Artigos, referências regulatórias e documentos da disciplina organizados para consulta durante o semestre.">
        <div className="flex flex-wrap gap-2 lg:max-w-xs lg:justify-end">
          {['Artigos', 'Documentos', 'Plano'].map((item) => (
            <span className="rounded-full border border-white/15 px-3 py-2 text-xs font-bold text-slate-300" key={item}>{item}</span>
          ))}
        </div>
      </PageHero>

      <div className="section-shell">
        <ResourceSection id="artigos" label="01" title="Artigos gerais" description="Leituras de base para compreender o ecossistema, as tecnologias e os desafios da UAM." resources={resources.generalArticles} />
        <ResourceSection id="documentos" label="02" title="Documentos técnicos e regulatórios" description="Normas, circulares, guias e documentos oficiais selecionados para cada tema." resources={resources.technicalDocuments} />
        <ResourceSection id="disciplina" label="03" title="Documentos da disciplina" description="Modelos, orientações e arquivos comuns disponibilizados pela equipe docente." resources={resources.disciplineDocuments} />

        <section id="plano" className="scroll-mt-28 border-t border-slate-200 pt-12">
          <div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr]">
            <div>
              <span className="text-xs font-black uppercase tracking-[.18em] text-cyan-700">04 · Plano da disciplina</span>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-ink">Percurso formativo {course.term}</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">{course.description}</p>
              <div className="mt-7 rounded-2xl bg-mist p-5">
                <strong className="block text-sm text-ink">Horário regular</strong>
                <span className="mt-1 block text-sm text-slate-600">{course.schedule}</span>
              </div>
            </div>
            <div>
              <div className="grid gap-4 sm:grid-cols-2">
                {course.objectives.map((objective, index) => (
                  <div className="surface-card" key={objective}>
                    <span className="text-xs font-black text-cyan-700">OBJ. 0{index + 1}</span>
                    <p className="mt-3 text-sm font-semibold leading-6 text-ink">{objective}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white">
                <div className="border-b border-slate-200 bg-slate-50 px-6 py-4">
                  <h3 className="font-bold text-ink">Marcos do artigo científico</h3>
                </div>
                <div className="divide-y divide-slate-100">
                  {checkpoints.map((checkpoint) => (
                    <div className="grid gap-2 px-6 py-5 sm:grid-cols-[90px_110px_1fr] sm:items-start" key={checkpoint.checkpoint}>
                      <strong className="text-sm text-cyan-700">{checkpoint.checkpoint}</strong>
                      <time className="text-sm font-semibold text-slate-500" dateTime={checkpoint.date}>{new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short' }).format(new Date(`${checkpoint.date}T12:00:00`))}</time>
                      <span className="text-sm leading-6 text-slate-700">{checkpoint.deliverable}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
