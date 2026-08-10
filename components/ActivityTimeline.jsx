'use client';

import { useMemo, useState } from 'react';
import Icon from './Icon';

const filters = [
  { id: 'all', label: 'Tudo' },
  { id: 'class', label: 'Encontros' },
  { id: 'checkpoint', label: 'Checkpoints' },
  { id: 'break', label: 'Calendário' },
];

function formatDate(value) {
  return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short', timeZone: 'UTC' }).format(new Date(`${value}T12:00:00Z`));
}

export default function ActivityTimeline({ activities }) {
  const [filter, setFilter] = useState('all');
  const today = new Date().toISOString().slice(0, 10);
  const visible = useMemo(() => activities.filter((item) => {
    if (filter === 'all') return true;
    if (filter === 'checkpoint') return Boolean(item.checkpoint);
    return item.type === filter || (filter === 'class' && item.type === 'checkpoint');
  }), [activities, filter]);

  return (
    <>
      <div className="mb-10 flex flex-wrap gap-2" role="group" aria-label="Filtrar cronograma">
        {filters.map((item) => (
          <button key={item.id} type="button" onClick={() => setFilter(item.id)} className={`rounded-full px-4 py-2 text-sm font-bold transition ${filter === item.id ? 'bg-ink text-white' : 'border border-slate-200 bg-white text-slate-600 hover:border-cyan-400'}`} aria-pressed={filter === item.id}>
            {item.label}
          </button>
        ))}
      </div>

      <div className="relative">
        <div className="absolute bottom-0 left-[27px] top-0 w-px bg-slate-200 sm:left-[108px]" aria-hidden="true" />
        <div className="space-y-6">
          {visible.map((activity) => {
            const isPast = activity.date < today;
            const isNext = activity.date >= today && !visible.some((other) => other.date >= today && other.date < activity.date);
            return (
              <article className="relative grid gap-5 pl-[72px] sm:grid-cols-[80px_1fr] sm:pl-0" key={activity.code}>
                <time className="hidden pt-6 text-right text-xs font-black uppercase tracking-[.12em] text-slate-500 sm:block" dateTime={activity.date}>{formatDate(activity.date)}</time>
                <div className="relative rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_18px_55px_-42px_rgba(7,20,38,.5)] sm:ml-8 sm:p-8">
                  <span className={`absolute -left-[58px] top-6 grid h-9 w-9 place-items-center rounded-full border-4 border-slate-50 text-xs font-black sm:-left-[51px] ${isPast ? 'bg-slate-300 text-slate-600' : isNext ? 'bg-cyan-300 text-ink shadow-[0_0_0_7px_rgba(45,212,191,.15)]' : 'bg-ink text-white'}`}>
                    {activity.meeting || '—'}
                  </span>
                  <time className="mb-3 block text-xs font-black uppercase tracking-[.12em] text-slate-500 sm:hidden" dateTime={activity.date}>{formatDate(activity.date)}</time>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`rounded-full px-3 py-1 text-[.65rem] font-black uppercase tracking-[.14em] ${activity.type === 'break' ? 'bg-amber-100 text-amber-800' : activity.checkpoint ? 'bg-cyan-100 text-cyan-800' : 'bg-sky-100 text-sky-800'}`}>{activity.type === 'break' ? 'Calendário' : activity.checkpoint || activity.code}</span>
                    {isNext && <span className="rounded-full bg-ink px-3 py-1 text-[.65rem] font-black uppercase tracking-[.14em] text-white">Próximo</span>}
                  </div>
                  <h2 className="mt-4 text-xl font-black tracking-tight text-ink sm:text-2xl">{activity.theme}</h2>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{activity.objective}</p>
                  <div className="mt-5 flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
                    <Icon name={activity.type === 'break' ? 'calendar' : 'check'} className="mt-0.5 h-5 w-5 shrink-0 text-cyan-700" />
                    <div><span className="block text-[.65rem] font-black uppercase tracking-[.16em] text-slate-400">Entregável</span><p className="mt-1 text-sm font-semibold leading-6 text-slate-700">{activity.deliverable}</p></div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </>
  );
}
