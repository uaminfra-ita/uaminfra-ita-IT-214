import PageHero from '@/components/PageHero';
import AuthenticatedArea from '@/components/AuthenticatedArea';

export const metadata = { title: 'Área do aluno' };

export default function StudentAreaPage() {
  return (
    <>
      <PageHero title="Área do aluno" description="Atividades, anexos, materiais e acompanhamento da disciplina em um único lugar." />
      <div className="section-shell">
        <AuthenticatedArea />
      </div>
    </>
  );
}
