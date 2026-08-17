'use client';

import { useMemo, useState } from 'react';
import activities from '@/data/activities.json';
import Icon from './Icon';

const submissionActivities = activities.filter((activity) => activity.submission);
const repository = 'https://github.com/uaminfra-ita/uaminfra-ita-IT-214';

function statusLabel(status) {
  return { open: 'Recebendo entregas', scheduled: 'Em breve', closed: 'Encerrada' }[status] || status;
}

function uploadUrl(studentId, activityCode) {
  return `${repository}/upload/student-submissions/entregas/${encodeURIComponent(studentId)}/${encodeURIComponent(activityCode)}`;
}

export default function SubmissionWorkspace({ studentId }) {
  const openActivity = submissionActivities.find((activity) => activity.submission.status === 'open');
  const [activityCode, setActivityCode] = useState(openActivity?.code || submissionActivities[0]?.code || '');
  const activity = useMemo(() => submissionActivities.find((item) => item.code === activityCode), [activityCode]);
  if (!activity) return null;
  const isOpen = activity.submission.status === 'open';

  return (
    <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-lift">
      <div className="grid lg:grid-cols-[.72fr_1.28fr]">
        <div className="bg-ink p-7 text-white sm:p-9">
          <span className="text-xs font-black uppercase tracking-[.17em] text-cyan-300">Minhas atividades</span>
          <h3 className="mt-5 text-2xl font-black">Escolha o que deseja entregar</h3>
          <p className="mt-3 text-sm leading-6 text-slate-300">O botão abre o próprio GitHub já na pasta da atividade. Anexe o arquivo e clique em “Commit changes”.</p>
          <div className="mt-7 space-y-3">
            {submissionActivities.map((item) => {
              const selected = item.code === activityCode;
              const open = item.submission.status === 'open';
              return <button className={`w-full rounded-2xl border p-4 text-left transition ${selected ? 'border-cyan-300 bg-white/10' : 'border-white/10 hover:border-white/30'} ${!open ? 'opacity-60' : ''}`} key={item.code} type="button" onClick={() => setActivityCode(item.code)}><span className="flex items-center justify-between gap-3"><strong className="text-sm">{item.code} · {item.theme}</strong>{open && <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-300" aria-label="Aberta" />}</span><span className="mt-2 block text-xs font-bold text-cyan-200">{statusLabel(item.submission.status)}</span></button>;
            })}
          </div>
        </div>
        <div className="p-7 sm:p-9">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"><div><span className="eyebrow">{activity.code}</span><h3 className="mt-4 text-2xl font-black text-ink">{activity.deliverable}</h3></div><span className={`w-fit rounded-full px-3 py-1.5 text-xs font-black ${isOpen ? 'bg-emerald-50 text-emerald-800' : 'bg-slate-100 text-slate-600'}`}>{statusLabel(activity.submission.status)}</span></div>
          {isOpen ? <div className="mt-8 rounded-3xl border border-cyan-200 bg-cyan-50 p-6"><Icon name="upload" className="h-8 w-8 text-cyan-800" /><h4 className="mt-4 text-lg font-black text-ink">Enviar pelo GitHub</h4><p className="mt-2 text-sm leading-6 text-slate-700">Você será levado ao editor oficial do GitHub, dentro da sua pasta. É só anexar o arquivo e confirmar o commit. A entrega ficará pública, como combinado para a disciplina.</p><a className="button-dark mt-6" href={uploadUrl(studentId, activity.code)} target="_blank" rel="noreferrer"><Icon name="external" className="h-4 w-4" /> Abrir envio da atividade</a></div> : <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-7"><Icon name="lock" className="h-7 w-7 text-slate-400" /><h4 className="mt-4 text-lg font-black text-ink">Envio ainda não liberado</h4><p className="mt-2 text-sm leading-6 text-slate-600">A equipe abrirá esta atividade no momento adequado.</p></div>}
        </div>
      </div>
    </section>
  );
}

export function StaffSubmissionOverview() {
  const open = submissionActivities.filter((activity) => activity.submission.status === 'open');
  return <section className="surface-card"><div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"><div><span className="eyebrow">Central de entregas</span><h3 className="mt-4 text-2xl font-black text-ink">Acompanhamento da turma</h3><p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">As entregas ficam organizadas por aluno e atividade na branch pública do repositório.</p></div><span className="w-fit rounded-full bg-cyan-50 px-3 py-1.5 text-xs font-black text-cyan-800">GitHub</span></div><div className="mt-6 grid gap-3 sm:grid-cols-2">{open.map((activity) => <a className="rounded-2xl border border-slate-200 p-4 transition hover:border-cyan-400" href={`${repository}/tree/student-submissions/entregas`} target="_blank" rel="noreferrer" key={activity.code}><strong className="text-ink">{activity.code} · {activity.deliverable}</strong><p className="mt-2 text-xs font-bold text-cyan-800">Abrir branch de entregas</p></a>)}</div></section>;
}
