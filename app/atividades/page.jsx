import PageHero from '@/components/PageHero';
import ActivityTimeline from '@/components/ActivityTimeline';
import activities from '@/data/activities.json';

export const metadata = { title: 'Atividades' };

export default function ActivitiesPage() {
  return (
    <>
      <PageHero title="Atividades e entregáveis" description="Uma visão semanal dos encontros, exercícios aplicados e checkpoints que conduzem ao artigo científico completo." />
      <div className="section-shell">
        <ActivityTimeline activities={activities} />
      </div>
    </>
  );
}
