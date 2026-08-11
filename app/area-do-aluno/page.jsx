import PageHero from '@/components/PageHero';
import AuthenticatedArea from '@/components/AuthenticatedArea';

export const metadata = { title: 'Área do aluno' };

export default function StudentAreaPage() {
  return (
    <>
      <PageHero title="Área do aluno" description="Acesso piloto às informações acadêmicas da disciplina, com painéis separados para alunos e equipe docente." />
      <div className="section-shell">
        <AuthenticatedArea />
      </div>
    </>
  );
}
