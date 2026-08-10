import PageHero from '@/components/PageHero';
import ActivityTimeline from '@/components/ActivityTimeline';
import activities from '@/data/activities.json';

export const metadata = { title: 'Atividades' };

export default function ActivitiesPage() {
  return (
    <>
      <PageHero title="Atividades e entregáveis" description="Uma visão semanal dos encontros, exercícios aplicados e checkpoints que conduzem ao artigo científico completo.">
        <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-sm">
          <strong className="block text-2xl text-cyan-300">16 encontros</strong>
          <span className="text-xs uppercase tracking-[.14em] text-slate-400">agosto — novembro</span>
        </div>
      </PageHero>
      <div className="section-shell">
        <ActivityTimeline activities={activities} />
      </div>
    </>
  );
}
