import PageHero from '@/components/PageHero';
import Icon from '@/components/Icon';

export const metadata = { title: 'Área do aluno' };

export default function StudentAreaPage() {
  return (
    <>
      <PageHero title="Área do aluno" description="O ambiente individual está sendo migrado para uma arquitetura com autenticação e armazenamento realmente privados." />
      <div className="section-shell">
        <section className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-lift">
          <div className="grid lg:grid-cols-[.82fr_1.18fr]">
            <div className="relative overflow-hidden bg-ink p-8 text-white sm:p-12">
              <div className="route-grid absolute inset-0 opacity-30" aria-hidden="true" />
              <div className="relative">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-cyan-300 text-ink"><Icon name="lock" className="h-7 w-7" /></div>
                <span className="mt-10 block text-xs font-black uppercase tracking-[.18em] text-cyan-300">Migração de segurança</span>
                <h1 className="mt-3 text-3xl font-black tracking-tight">Privacidade antes da conveniência.</h1>
                <p className="mt-4 text-base leading-7 text-slate-300">O acesso anterior organizava apenas a navegação e não protegia arquivos em um repositório público. Por isso, foi desativado.</p>
              </div>
            </div>
            <div className="p-8 sm:p-12">
              <h2 className="text-2xl font-black text-ink">O que está sendo preparado</h2>
              <div className="mt-7 space-y-5">
                {[
                  ['Autenticação real', 'Sessões verificadas e papéis separados para alunos e docentes.'],
                  ['Entregas privadas', 'Arquivos fora do Git público, com histórico de versões e prazos.'],
                  ['Revisão rastreável', 'Feedback, solicitação de ajustes e aprovação com auditoria.'],
                ].map(([title, description], index) => (
                  <div className="flex gap-4" key={title}>
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-mist text-xs font-black text-cyan-800">0{index + 1}</span>
                    <div><h3 className="font-black text-ink">{title}</h3><p className="mt-1 text-sm leading-6 text-slate-600">{description}</p></div>
                  </div>
                ))}
              </div>
              <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-900">
                Até a conclusão da migração, a equipe docente informará o canal temporário de entrega diretamente à turma.
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
