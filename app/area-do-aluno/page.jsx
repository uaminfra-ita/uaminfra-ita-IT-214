import PageHero from '@/components/PageHero';
import StudentPortal from '@/components/StudentPortal';
import students from '@/data/students.json';
import activities from '@/data/activities.json';
import { buildStudentWorkspaces } from '@/lib/studentWorkspace.mjs';

export const metadata = { title: 'Área do aluno' };

export default function StudentAreaPage() {
  const workspaces = buildStudentWorkspaces(students);
  return (
    <>
      <PageHero eyebrow="Ambiente individual" title="Área do aluno" description="Um painel organizado para acompanhar o percurso semanal, enviar trabalhos e destacar resultados durante as apresentações." />
      <div className="section-shell">
        <StudentPortal workspaces={workspaces} activities={activities} />
      </div>
    </>
  );
}
