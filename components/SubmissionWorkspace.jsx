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
  return <section className="surface-card"><div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"><div><span className="eyebrow">Central de acompanhamento</span><h3 className="mt-4 text-2xl font-black text-ink">Entregas e projetos da turma</h3><p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">A leitura usa apenas a árvore pública da branch de trabalhos. Abra o histórico para acompanhar cada commit.</p></div><div className="flex flex-wrap gap-2"><a className="button-dark" href={githubIssueSearchUrl('is:issue is:open "[Dúvida"')} target="_blank" rel="noreferrer">Dúvidas abertas</a><a className="button-primary" href={latexWorkflowUrl()} target="_blank" rel="noreferrer">Compilações LaTeX</a></div></div>
    <div className="mt-6 overflow-x-auto"><table className="w-full min-w-[760px] text-left text-sm"><thead><tr className="border-b border-slate-200 text-xs uppercase tracking-wider text-slate-400"><th className="pb-3">Aluno</th><th className="pb-3">Atividades</th><th className="pb-3">Arquivos</th><th className="pb-3">LaTeX</th><th className="pb-3">Ações</th></tr></thead><tbody>{students.map((student) => { const deliveryRoot = `entregas/${student.user_id}`; const deliveryFiles = pathsBelow(paths, deliveryRoot); const deliveredActivities = submissionActivities.filter((activity) => pathsBelow(paths, `${deliveryRoot}/${activity.code}`).length > 0).length; const projectRoot = `projetos/${student.user_id}`; const projectFiles = pathsBelow(paths, projectRoot); const hasProject = projectFiles.some((file) => file.endsWith('/main.tex')); return <tr className="border-b border-slate-100 last:border-0" key={student.user_id}><td className="py-4 font-black text-ink">{student.full_name}</td><td className="py-4 text-slate-600">{deliveredActivities}/{submissionActivities.length}</td><td className="py-4 text-slate-600">{deliveryFiles.length}</td><td className="py-4"><span className={`rounded-full px-3 py-1 text-xs font-black ${hasProject ? 'bg-emerald-50 text-emerald-800' : 'bg-slate-100 text-slate-600'}`}>{hasProject ? `${projectFiles.length} arquivo(s)` : 'Não iniciado'}</span></td><td className="py-4"><div className="flex gap-3">{deliveryFiles.length > 0 ? <a className="font-black text-cyan-800" href={repositoryPathUrl(deliveryRoot)} target="_blank" rel="noreferrer">Entregas</a> : <span className="text-slate-400">Sem entrega</span>}{hasProject ? <a className="font-black text-cyan-800" href={repositoryHistoryUrl(projectRoot)} target="_blank" rel="noreferrer">Projeto</a> : <span className="text-slate-400">Sem projeto</span>}</div></td></tr>; })}</tbody></table></div>
    <div className="mt-5 flex flex-wrap items-center gap-3 text-xs font-bold text-slate-500" aria-live="polite"><span>{loading ? 'Atualizando a turma…' : error ? 'A API pública do GitHub está indisponível; use os links diretos.' : 'Dados públicos da branch carregados.'}</span><button className="rounded-full border border-slate-200 px-3 py-1.5 text-cyan-800 hover:border-cyan-400" type="button" onClick={refresh} disabled={loading}>Atualizar</button><a className="text-cyan-800" href={githubIssueSearchUrl('is:issue is:open "[Acesso]"')} target="_blank" rel="noreferrer">Pedidos de nova senha</a></div>
  </section>;
}
