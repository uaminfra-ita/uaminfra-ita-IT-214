'use client';

import { useEffect, useState } from 'react';
import { courseDateKey, nextScheduledActivity } from '@/lib/courseDates.mjs';

export default function NextMilestone({ activities }) {
  const [checkpoint, setCheckpoint] = useState(null);

  useEffect(() => {
    setCheckpoint(nextScheduledActivity(activities, courseDateKey(), (activity) => Boolean(activity.checkpoint)));
  }, [activities]);

  if (!checkpoint) return null;

  return (
    <div className="mt-8 rounded-3xl bg-ink p-6 text-white shadow-lift" aria-live="polite">
      <span className="text-xs font-bold uppercase tracking-[.18em] text-cyan-300">Próximo marco</span>
      <h3 className="mt-3 text-xl font-bold">{checkpoint.checkpoint} · {checkpoint.theme}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-300">{checkpoint.deliverable}</p>
    </div>
  );
}
