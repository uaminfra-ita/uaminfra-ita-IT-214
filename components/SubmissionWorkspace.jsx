'use client';

import { useMemo, useState } from 'react';
import activities from '@/data/activities.json';
import {
  githubIssueSearchUrl,
  latexWorkflowUrl,
  repositoryHistoryUrl,
  repositoryPathUrl,
  repositoryUploadUrl,
} from '@/lib/githubCourse.mjs';
import usePublicRepositoryTree, { pathsBelow } from '@/lib/usePublicRepositoryTree';
import Icon from './Icon';

const submissionActivities = activities.filter((activity) => activity.submission);
const openSubmissionActivities = submissionActivities.filter((activity) => activity.submission.status === 'open');

const staffFilters = [
  { value: 'all', label: 'Toda a turma' },
  { value: 'with-deliveries', label: 'Com alguma entrega' },
  { value: 'pending-open', label: 'Com pendência aberta' },
  { value: 'latex', label: 'Com projeto LaTeX' },
  { value: 'not-started', label: 'Sem nenhuma entrega' },
];

function statusLabel(status) {
  return { open: 'Recebendo entregas', scheduled: 'Em breve', closed: 'Encerrada' }[status] || status;
}

function formatDueDate(dueAt) {
  if (!dueAt) return 'Prazo ainda não definido';
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
    timeZone: 'America/Sao_Paulo',
  }).format(new Date(dueAt));
}

function normalizeSearch(value) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
}

function buildStudentSummary(student, paths) {
  const deliveryRoot = `entregas/${student.user_id}`;
  const projectRoot = `projetos/${student.user_id}`;
  const activityStatus = submissionActivities.map((activity) => {
    const files = pathsBelow(paths, `${deliveryRoot}/${activity.code}`);
    return { activity, files, submitted: files.length > 0 };
  });
  const deliveryFiles = pathsBelow(paths, deliveryRoot);
  const projectFiles = pathsBelow(paths, projectRoot);
  const deliveredActivities = activityStatus.filter((item) => item.submitted);
  const pendingOpenActivities = activityStatus.filter((item) => item.activity.submission.status === 'open' && !item.submitted);

  return {
    ...student,
    deliveryRoot,
    projectRoot,
    activityStatus,
    deliveryFiles,
    projectFiles,
    deliveredActivities,
    pendingOpenActivities,
    hasProject: projectFiles.some((file) => file.endsWith('/main.tex')),
  };
}

function matchesStaffFilter(student, filter) {
  if (filter === 'with-deliveries') return student.deliveredActivities.length > 0;
  if (filter === 'pending-open') return student.pendingOpenActivities.length > 0;
  if (filter === 'latex') return student.hasProject;
  if (filter === 'not-started') return student.deliveredActivities.length === 0;
  return true;
}

export default function SubmissionWorkspace({ studentId }) {
  const openActivity = submissionActivities.find((activity) => activity.submission.status === 'open');
  const [activityCode, setActivityCode] = useState(openActivity?.code || submissionActivities[0]?.code || '');
  const { paths, loading, error, refresh } = usePublicRepositoryTree();
  const activity = useMemo(() => submissionActivities.find((item) => item.code === activityCode), [activityCode]);
  if (!activity) return null;
  const isOpen = activity.submission.status === 'open';
  const activityPath = `entregas/${studentId}/${activity.code}`;
  const submittedFiles = pathsBelow(paths, activityPath);

  return (
    <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-lift">
      <div className="grid lg:grid-cols-[.72fr_1.28fr]">
        <div className="bg-ink p-7 text-white sm:p-9">
          <span className="text-xs font-black uppercase tracking-[.17em] text-cyan-300">Minhas atividades</span>
          <h3 className="mt-5 text-2xl font-black">Escolha o que deseja entregar</h3>
          <p className="mt-3 text-sm leading-6 text-slate-300">O GitHub recebe os arquivos na pasta da atividade e registra cada atualização como um commit.</p>
          <div className="mt-7 max-h-[36rem] space-y-3 overflow-y-auto pr-1">
            {submissionActivities.map((item) => {
              const selected = item.code === activityCode;
              const open = item.submission.status === 'open';
              const count = pathsBelow(paths, `entregas/${studentId}/${item.code}`).length;
              return <button className={`w-full rounded-2xl border p-4 text-left transition ${selected ? 'border-cyan-300 bg-white/10' : 'border-white/10 hover:border-white/30'} ${!open ? 'opacity-70' : ''}`} key={item.code} type="button" onClick={() => setActivityCode(item.code)}><span className="flex items-center justify-between gap-3"><strong className="text-sm">{item.code} · {item.theme}</strong>{open && <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-300" aria-label="Aberta" />}</span><span className="mt-2 flex items-center justify-between gap-3 text-xs font-bold text-cyan-200"><span>{statusLabel(item.submission.status)}</span>{count > 0 && <span>{count} arquivo(s)</span>}</span></button>;
            })}
          </div>
        </div>
        <div className="p-7 sm:p-9">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"><div><span className="eyebrow">{activity.code}</span><h3 className="mt-4 text-2xl font-black text-ink">{activity.deliverable}</h3></div><span className={`w-fit rounded-full px-3 py-1.5 text-xs font-black ${isOpen ? 'bg-emerald-50 text-emerald-800' : 'bg-slate-100 text-slate-600'}`}>{statusLabel(activity.submission.status)}</span></div>
          <div className="mt-6 grid gap-3 sm:grid-cols-3"><div className="rounded-2xl bg-slate-50 p-4"><span className="text-xs font-black uppercase tracking-wider text-slate-400">Prazo</span><p className="mt-2 text-sm font-bold text-ink">{formatDueDate(activity.submission.dueAt)}</p></div><div className="rounded-2xl bg-slate-50 p-4"><span className="text-xs font-black uppercase tracking-wider text-slate-400">Arquivos</span><p className="mt-2 text-sm font-bold text-ink">Até {activity.submission.maxFiles}</p></div><div className="rounded-2xl bg-slate-50 p-4"><span className="text-xs font-black uppercase tracking-wider text-slate-400">Tamanho</span><p className="mt-2 text-sm font-bold text-ink">Até {activity.submission.maxFileSizeMb} MB cada</p></div></div>
          <p className="mt-4 text-xs leading-5 text-slate-500"><strong>Formatos aceitos:</strong> {activity.submission.acceptedExtensions.join(', ')}. Os limites são conferidos pela equipe no commit.</p>
          {isOpen ? <div className="mt-7 rounded-3xl border border-cyan-200 bg-cyan-50 p-6"><Icon name="upload" className="h-8 w-8 text-cyan-800" /><h4 className="mt-4 text-lg font-black text-ink">Enviar pelo GitHub</h4><p className="mt-2 text-sm leading-6 text-slate-700">Anexe os arquivos, confira a pasta e confirme “Commit changes”. Para uma nova versão, repita o envio com os arquivos atualizados.</p><div className="mt-6 flex flex-wrap gap-3"><a className="button-dark" href={repositoryUploadUrl(activityPath)} target="_blank" rel="noreferrer"><Icon name="external" className="h-4 w-4" /> Enviar atividade</a>{submittedFiles.length > 0 && <a className="button-primary" href={repositoryPathUrl(activityPath)} target="_blank" rel="noreferrer"><Icon name="file" className="h-4 w-4" /> Ver minha entrega</a>}</div></div> : <div className="mt-7 rounded-3xl border border-slate-200 bg-slate-50 p-7"><Icon name="lock" className="h-7 w-7 text-slate-400" /><h4 className="mt-4 text-lg font-black text-ink">Envio não liberado</h4><p className="mt-2 text-sm leading-6 text-slate-600">A equipe abrirá esta atividade no momento adequado.</p></div>}
          <div className="mt-5 flex flex-wrap items-center gap-3 text-xs font-bold text-slate-500" aria-live="polite"><span>{loading ? 'Consultando a branch pública…' : error ? 'Status indisponível no momento.' : submittedFiles.length > 0 ? `${submittedFiles.length} arquivo(s) localizado(s) nesta atividade.` : 'Nenhum arquivo localizado nesta atividade.'}</span><button className="rounded-full border border-slate-200 px-3 py-1.5 text-cyan-800 hover:border-cyan-400" type="button" onClick={refresh} disabled={loading}>Atualizar status</button></div>
        </div>
      </div>
    </section>
  );
}

export function StaffSubmissionOverview({ students }) {
  const { paths, loading, error, refresh } = usePublicRepositoryTree();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [activityCode, setActivityCode] = useState(openSubmissionActivities[0]?.code || submissionActivities[0]?.code || '');
  const [copiedId, setCopiedId] = useState('');
  const summaries = useMemo(
    () => students.map((student) => buildStudentSummary(student, paths)).sort((a, b) => a.full_name.localeCompare(b.full_name, 'pt-BR')),
    [paths, students],
  );
  const normalizedQuery = normalizeSearch(query);
  const visibleStudents = summaries.filter((student) => {
    const searchable = normalizeSearch(`${student.full_name} ${student.user_id}`);
    return searchable.includes(normalizedQuery) && matchesStaffFilter(student, filter);
  });
  const selectedActivity = submissionActivities.find((activity) => activity.code === activityCode);
  const studentsWithDelivery = summaries.filter((student) => student.deliveredActivities.length > 0).length;
  const studentsWithLatex = summaries.filter((student) => student.hasProject).length;
  const studentsPendingOpen = summaries.filter((student) => student.pendingOpenActivities.length > 0).length;
  const selectedActivityDeliveries = summaries.filter((student) => student.activityStatus.find((item) => item.activity.code === activityCode)?.submitted).length;

  async function copyStudentId(studentId) {
    try {
      await navigator.clipboard.writeText(studentId);
      setCopiedId(studentId);
      window.setTimeout(() => setCopiedId(''), 1800);
    } catch {
      setCopiedId('');
    }
  }

  return (
    <section className="surface-card">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <span className="eyebrow">Central de acompanhamento</span>
          <h3 className="mt-4 text-2xl font-black text-ink">Controle nominal de entregas e projetos</h3>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">Pesquise pelo nome do aluno. O painel traduz o nome para o identificador técnico e abre a pasta pública correta sem expor nomes nos caminhos do Git.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <a className="button-dark" href={githubIssueSearchUrl('is:issue is:open "[Dúvida"')} target="_blank" rel="noreferrer">Dúvidas abertas</a>
          <a className="button-primary" href={latexWorkflowUrl()} target="_blank" rel="noreferrer">Compilações LaTeX</a>
        </div>
      </div>

      <div className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl bg-slate-50 p-4"><span className="text-2xl font-black text-ink">{studentsWithDelivery}/{summaries.length}</span><p className="mt-1 text-xs font-bold text-slate-500">alunos com alguma entrega</p></div>
        <div className="rounded-2xl bg-slate-50 p-4"><span className="text-2xl font-black text-ink">{studentsPendingOpen}</span><p className="mt-1 text-xs font-bold text-slate-500">com pendência em atividade aberta</p></div>
        <div className="rounded-2xl bg-slate-50 p-4"><span className="text-2xl font-black text-ink">{studentsWithLatex}</span><p className="mt-1 text-xs font-bold text-slate-500">projetos LaTeX iniciados</p></div>
        <div className="rounded-2xl bg-cyan-50 p-4"><span className="text-2xl font-black text-cyan-900">{selectedActivityDeliveries}/{summaries.length}</span><p className="mt-1 text-xs font-bold text-cyan-800">entregaram {selectedActivity?.code || 'a atividade'}</p></div>
      </div>

      <div className="mt-7 grid gap-4 lg:grid-cols-[1.2fr_.8fr_.8fr]">
        <label className="text-sm font-black text-slate-700" htmlFor="staff-student-search">Localizar aluno
          <input className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm font-normal outline-none transition focus:border-cyan-600 focus:ring-4 focus:ring-cyan-100" id="staff-student-search" type="search" placeholder="Digite o nome ou ID" value={query} onChange={(event) => setQuery(event.target.value)} />
        </label>
        <label className="text-sm font-black text-slate-700" htmlFor="staff-progress-filter">Filtrar turma
          <select className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-normal outline-none focus:border-cyan-600 focus:ring-4 focus:ring-cyan-100" id="staff-progress-filter" value={filter} onChange={(event) => setFilter(event.target.value)}>{staffFilters.map((item) => <option value={item.value} key={item.value}>{item.label}</option>)}</select>
        </label>
        <label className="text-sm font-black text-slate-700" htmlFor="staff-activity-filter">Conferir atividade
          <select className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-normal outline-none focus:border-cyan-600 focus:ring-4 focus:ring-cyan-100" id="staff-activity-filter" value={activityCode} onChange={(event) => setActivityCode(event.target.value)}>{submissionActivities.map((activity) => <option value={activity.code} key={activity.code}>{activity.code} · {activity.theme}</option>)}</select>
        </label>
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[1080px] text-left text-sm">
          <thead><tr className="border-b border-slate-200 text-xs uppercase tracking-wider text-slate-400"><th className="pb-3">Aluno</th><th className="pb-3">Identificador técnico</th><th className="pb-3">Progresso</th><th className="pb-3">{selectedActivity?.code || 'Atividade'}</th><th className="pb-3">LaTeX</th><th className="pb-3">Ações nominais</th></tr></thead>
          <tbody>
            {visibleStudents.map((student) => {
              const selectedStatus = student.activityStatus.find((item) => item.activity.code === activityCode);
              const progress = Math.round((student.deliveredActivities.length / submissionActivities.length) * 100);
              const firstName = student.full_name.split(' ')[0];
              return (
                <tr className="border-b border-slate-100 align-top last:border-0" key={student.user_id}>
                  <td className="py-4 pr-5"><strong className="block text-ink">{student.full_name}</strong><span className="mt-1 block text-xs text-slate-500">{student.deliveryFiles.length} arquivo(s) em atividades</span></td>
                  <td className="py-4 pr-5"><code className="rounded bg-slate-100 px-2 py-1 text-xs text-slate-600">{student.user_id}</code><button className="ml-2 text-xs font-black text-cyan-800" type="button" onClick={() => copyStudentId(student.user_id)}>{copiedId === student.user_id ? 'Copiado' : 'Copiar'}</button></td>
                  <td className="py-4 pr-5"><span className="font-black text-ink">{student.deliveredActivities.length}/{submissionActivities.length}</span><div className="mt-2 h-2 w-28 overflow-hidden rounded-full bg-slate-100"><span className="block h-full rounded-full bg-cyan-500" style={{ width: `${progress}%` }} /></div><span className="mt-2 block text-xs text-slate-500">{student.deliveredActivities.map((item) => item.activity.code).join(', ') || 'Nenhuma atividade'}</span></td>
                  <td className="py-4 pr-5">{selectedStatus?.submitted ? <><span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-800">Recebida</span><span className="mt-2 block text-xs text-slate-500">{selectedStatus.files.length} arquivo(s)</span></> : <span className={`rounded-full px-3 py-1 text-xs font-black ${selectedActivity?.submission.status === 'open' ? 'bg-amber-50 text-amber-800' : 'bg-slate-100 text-slate-600'}`}>{selectedActivity?.submission.status === 'open' ? 'Pendente' : 'Sem arquivo'}</span>}</td>
                  <td className="py-4 pr-5"><span className={`rounded-full px-3 py-1 text-xs font-black ${student.hasProject ? 'bg-emerald-50 text-emerald-800' : 'bg-slate-100 text-slate-600'}`}>{student.hasProject ? `${student.projectFiles.length} arquivo(s)` : 'Não iniciado'}</span></td>
                  <td className="py-4"><div className="flex flex-col items-start gap-2">{student.deliveryFiles.length > 0 ? <><a className="font-black text-cyan-800" href={repositoryPathUrl(student.deliveryRoot)} target="_blank" rel="noreferrer">Entregas de {firstName}</a><a className="text-xs font-bold text-slate-500" href={repositoryHistoryUrl(student.deliveryRoot)} target="_blank" rel="noreferrer">Histórico de atividades</a></> : <span className="text-slate-400">Sem entregas</span>}{student.hasProject ? <a className="font-black text-cyan-800" href={repositoryHistoryUrl(student.projectRoot)} target="_blank" rel="noreferrer">Projeto de {firstName}</a> : <span className="text-slate-400">Sem projeto</span>}</div></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {visibleStudents.length === 0 && <div className="mt-5 rounded-2xl bg-slate-50 p-6 text-center text-sm font-bold text-slate-600">Nenhum aluno corresponde à busca e ao filtro selecionados.</div>}
      <div className="mt-5 flex flex-wrap items-center gap-3 text-xs font-bold text-slate-500" aria-live="polite"><span>{loading ? 'Atualizando a turma…' : error ? 'A API pública do GitHub está indisponível; use os links diretos.' : `${visibleStudents.length} de ${summaries.length} aluno(s) exibido(s).`}</span><button className="rounded-full border border-slate-200 px-3 py-1.5 text-cyan-800 hover:border-cyan-400" type="button" onClick={refresh} disabled={loading}>Atualizar dados</button><a className="text-cyan-800" href={githubIssueSearchUrl('is:issue is:open "[Acesso]"')} target="_blank" rel="noreferrer">Pedidos de nova senha</a></div>
    </section>
  );
}
