'use client';

import { useMemo, useState } from 'react';
import activities from '@/data/activities.json';
import { courseDriveUrl, driveDestinationFor, driveFolderUrl } from '@/lib/driveCourse.mjs';
import Icon from './Icon';

const submissionActivities = activities.filter((activity) => activity.submission);
const openSubmissionActivities = submissionActivities.filter((activity) => activity.submission.status === 'open');

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

function MissingDriveDestination() {
  return (
    <section className="surface-card">
      <span className="eyebrow">Google Drive</span>
      <h3 className="mt-4 text-xl font-black text-ink">Pasta individual não configurada</h3>
      <p className="mt-3 text-sm leading-6 text-slate-600">Procure a equipe docente para vincular esta conta à pasta correta.</p>
    </section>
  );
}

export default function SubmissionWorkspace({ studentId }) {
  const openActivity = submissionActivities.find((activity) => activity.submission.status === 'open');
  const [activityCode, setActivityCode] = useState(openActivity?.code || submissionActivities[0]?.code || '');
  const activity = useMemo(() => submissionActivities.find((item) => item.code === activityCode), [activityCode]);
  const destination = driveDestinationFor(studentId);
  if (!activity) return null;
  if (!destination) return <MissingDriveDestination />;

  const isOpen = activity.submission.status === 'open';
  const activitiesUrl = driveFolderUrl(destination.activitiesFolderId);
  const suggestedName = `${activity.code} - nome-do-arquivo`;

  return (
    <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-lift">
      <div className="grid lg:grid-cols-[.72fr_1.28fr]">
        <div className="bg-ink p-7 text-white sm:p-9">
          <span className="text-xs font-black uppercase tracking-[.17em] text-cyan-300">Minhas atividades</span>
          <h3 className="mt-5 text-2xl font-black">Escolha o que deseja entregar</h3>
          <p className="mt-3 text-sm leading-6 text-slate-300">Cada conta abre diretamente sua própria pasta de atividades no Google Drive.</p>
          <div className="mt-7 max-h-[36rem] space-y-3 overflow-y-auto pr-1">
            {submissionActivities.map((item) => {
              const selected = item.code === activityCode;
              const open = item.submission.status === 'open';
              return <button className={`w-full rounded-2xl border p-4 text-left transition ${selected ? 'border-cyan-300 bg-white/10' : 'border-white/10 hover:border-white/30'} ${!open ? 'opacity-70' : ''}`} key={item.code} type="button" onClick={() => setActivityCode(item.code)}><span className="flex items-center justify-between gap-3"><strong className="text-sm">{item.code} · {item.theme}</strong>{open && <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-300" aria-label="Aberta" />}</span><span className="mt-2 block text-xs font-bold text-cyan-200">{statusLabel(item.submission.status)}</span></button>;
            })}
          </div>
        </div>
        <div className="p-7 sm:p-9">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"><div><span className="eyebrow">{activity.code}</span><h3 className="mt-4 text-2xl font-black text-ink">{activity.deliverable}</h3></div><span className={`w-fit rounded-full px-3 py-1.5 text-xs font-black ${isOpen ? 'bg-emerald-50 text-emerald-800' : 'bg-slate-100 text-slate-600'}`}>{statusLabel(activity.submission.status)}</span></div>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl bg-slate-50 p-4"><span className="text-xs font-black uppercase tracking-wider text-slate-400">Prazo</span><p className="mt-2 text-sm font-bold text-ink">{formatDueDate(activity.submission.dueAt)}</p></div>
            <div className="rounded-2xl bg-slate-50 p-4"><span className="text-xs font-black uppercase tracking-wider text-slate-400">Formato</span><p className="mt-2 text-sm font-bold text-ink">Qualquer formato</p></div>
            <div className="rounded-2xl bg-slate-50 p-4"><span className="text-xs font-black uppercase tracking-wider text-slate-400">Nome do arquivo</span><p className="mt-2 break-words text-sm font-bold text-ink">{suggestedName}</p></div>
          </div>
          {isOpen ? (
            <div className="mt-7 rounded-3xl border border-cyan-200 bg-cyan-50 p-6">
              <Icon name="upload" className="h-8 w-8 text-cyan-800" />
              <h4 className="mt-4 text-lg font-black text-ink">Enviar pelo Google Drive</h4>
              <p className="mt-2 text-sm leading-6 text-slate-700">Abra sua pasta, clique em “Novo” ou arraste o arquivo. Comece o nome com <strong>{activity.code}</strong> para a equipe localizar a atividade rapidamente.</p>
              <div className="mt-6 flex flex-wrap gap-3"><a className="button-dark" href={activitiesUrl} target="_blank" rel="noreferrer"><Icon name="external" className="h-4 w-4" /> Abrir minha pasta de atividades</a></div>
            </div>
          ) : (
            <div className="mt-7 rounded-3xl border border-slate-200 bg-slate-50 p-7"><Icon name="lock" className="h-7 w-7 text-slate-400" /><h4 className="mt-4 text-lg font-black text-ink">Envio não liberado</h4><p className="mt-2 text-sm leading-6 text-slate-600">A equipe abrirá esta atividade no momento adequado.</p></div>
          )}
          <p className="mt-5 text-xs leading-5 text-slate-500">O Drive controla o acesso real à pasta. O portal não lê, conta nem publica os arquivos enviados.</p>
        </div>
      </div>
    </section>
  );
}

export function StaffSubmissionOverview({ students }) {
  const [query, setQuery] = useState('');
  const [activityCode, setActivityCode] = useState(openSubmissionActivities[0]?.code || submissionActivities[0]?.code || '');
  const [copiedId, setCopiedId] = useState('');
  const selectedActivity = submissionActivities.find((activity) => activity.code === activityCode);
  const normalizedQuery = normalizeSearch(query);
  const rows = useMemo(() => students.map((student) => ({ ...student, destination: driveDestinationFor(student.user_id) })).sort((a, b) => a.full_name.localeCompare(b.full_name, 'pt-BR')), [students]);
  const visibleStudents = rows.filter((student) => normalizeSearch(`${student.full_name} ${student.user_id}`).includes(normalizedQuery));
  const configuredStudents = rows.filter((student) => student.destination).length;

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
        <div><span className="eyebrow">Central de acompanhamento</span><h3 className="mt-4 text-2xl font-black text-ink">Pastas individuais da turma</h3><p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">Pesquise pelo nome e abra diretamente as atividades, o projeto LaTeX ou as solicitações do aluno. A conferência dos arquivos é feita no Drive.</p></div>
        <a className="button-dark" href={courseDriveUrl()} target="_blank" rel="noreferrer"><Icon name="external" className="h-4 w-4" /> Abrir Drive da disciplina</a>
      </div>

      <div className="mt-7 grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl bg-slate-50 p-4"><span className="text-2xl font-black text-ink">{configuredStudents}/{rows.length}</span><p className="mt-1 text-xs font-bold text-slate-500">pastas vinculadas</p></div>
        <div className="rounded-2xl bg-cyan-50 p-4"><span className="text-2xl font-black text-cyan-900">{selectedActivity?.code || '—'}</span><p className="mt-1 text-xs font-bold text-cyan-800">atividade em conferência</p></div>
        <div className="rounded-2xl bg-slate-50 p-4"><span className="text-lg font-black text-ink">Conferência manual</span><p className="mt-1 text-xs font-bold text-slate-500">sem expor arquivos no GitHub</p></div>
      </div>

      <div className="mt-7 grid gap-4 lg:grid-cols-[1.2fr_.8fr]">
        <label className="text-sm font-black text-slate-700" htmlFor="staff-student-search">Localizar aluno<input className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm font-normal outline-none transition focus:border-cyan-600 focus:ring-4 focus:ring-cyan-100" id="staff-student-search" type="search" placeholder="Digite o nome ou ID" value={query} onChange={(event) => setQuery(event.target.value)} /></label>
        <label className="text-sm font-black text-slate-700" htmlFor="staff-activity-filter">Conferir atividade<select className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-normal outline-none focus:border-cyan-600 focus:ring-4 focus:ring-cyan-100" id="staff-activity-filter" value={activityCode} onChange={(event) => setActivityCode(event.target.value)}>{submissionActivities.map((activity) => <option value={activity.code} key={activity.code}>{activity.code} · {activity.theme}</option>)}</select></label>
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[920px] text-left text-sm">
          <thead><tr className="border-b border-slate-200 text-xs uppercase tracking-wider text-slate-400"><th className="pb-3">Aluno</th><th className="pb-3">Identificador</th><th className="pb-3">Atividade selecionada</th><th className="pb-3">Projeto</th><th className="pb-3">Suporte</th><th className="pb-3">Pasta geral</th></tr></thead>
          <tbody>{visibleStudents.map((student) => {
            const destination = student.destination;
            return <tr className="border-b border-slate-100 align-top last:border-0" key={student.user_id}><td className="py-4 pr-5 font-black text-ink">{student.full_name}</td><td className="py-4 pr-5"><code className="rounded bg-slate-100 px-2 py-1 text-xs text-slate-600">{student.user_id}</code><button className="ml-2 text-xs font-black text-cyan-800" type="button" onClick={() => copyStudentId(student.user_id)}>{copiedId === student.user_id ? 'Copiado' : 'Copiar'}</button></td><td className="py-4 pr-5">{destination ? <a className="font-black text-cyan-800" href={driveFolderUrl(destination.activitiesFolderId)} target="_blank" rel="noreferrer">Abrir atividades · procurar {selectedActivity?.code}</a> : <span className="text-amber-700">Não configurada</span>}</td><td className="py-4 pr-5">{destination && <a className="font-black text-cyan-800" href={driveFolderUrl(destination.latexFolderId)} target="_blank" rel="noreferrer">Projeto LaTeX</a>}</td><td className="py-4 pr-5">{destination && <a className="font-black text-cyan-800" href={driveFolderUrl(destination.supportFolderId)} target="_blank" rel="noreferrer">Dúvidas e solicitações</a>}</td><td className="py-4">{destination && <a className="font-black text-cyan-800" href={driveFolderUrl(destination.rootFolderId)} target="_blank" rel="noreferrer">Abrir pasta</a>}</td></tr>;
          })}</tbody>
        </table>
      </div>
      {visibleStudents.length === 0 && <div className="mt-5 rounded-2xl bg-slate-50 p-6 text-center text-sm font-bold text-slate-600">Nenhum aluno corresponde à busca.</div>}
      <p className="mt-5 text-xs font-bold text-slate-500">{visibleStudents.length} de {rows.length} aluno(s) exibido(s). O prefixo esperado para a conferência atual é <strong>{selectedActivity?.code}</strong>.</p>
    </section>
  );
}
