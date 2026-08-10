'use client';

import { useEffect, useMemo, useState } from 'react';
import accessRecords from '@/data/access.json';
import Icon from './Icon';

const SESSION_KEY = 'it214:student-session';
const accentClasses = {
  cyan: 'from-cyan-300 to-sky-300',
  blue: 'from-blue-400 to-cyan-300',
  emerald: 'from-emerald-400 to-cyan-300',
  amber: 'from-amber-300 to-orange-300',
  violet: 'from-violet-400 to-sky-300',
};

async function digest(value) {
  const bytes = new TextEncoder().encode(value);
  const buffer = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(buffer), (byte) => byte.toString(16).padStart(2, '0')).join('');
}

function isActivityComplete(activity, completedCodes) {
  return completedCodes.includes(activity.code) || Boolean(activity.checkpoint && completedCodes.includes(activity.checkpoint));
}

function StudentDashboard({ workspace, activities, onLogout }) {
  const [presenting, setPresenting] = useState(false);
  const regularActivities = activities.filter((activity) => activity.meeting);
  const completed = regularActivities.filter((activity) => isActivityComplete(activity, workspace.completedCodes)).length;
  const progress = Math.round((completed / regularActivities.length) * 100);
  const featured = workspace.profile.featuredFiles.length
    ? workspace.files.filter((file) => workspace.profile.featuredFiles.includes(file.name))
    : workspace.files.slice(0, 6);

  if (presenting) {
    return (
      <div className={`min-h-[70vh] rounded-[2rem] bg-gradient-to-br ${accentClasses[workspace.profile.accent]} p-6 shadow-lift sm:p-12`}>
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div>
            <span className="text-xs font-black uppercase tracking-[.2em] text-ink/60">Modo apresentação · IT-214</span>
            <h1 className="mt-4 max-w-4xl text-4xl font-black tracking-[-.04em] text-ink sm:text-6xl">{workspace.profile.headline || workspace.name}</h1>
            {workspace.profile.bio && <p className="mt-5 max-w-3xl text-lg leading-8 text-ink/70">{workspace.profile.bio}</p>}
          </div>
          <button type="button" className="button-dark" onClick={() => setPresenting(false)}>Sair da apresentação</button>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.length > 0 ? featured.map((file) => (
            <a className="rounded-3xl bg-white/85 p-6 text-ink shadow-lg backdrop-blur transition hover:-translate-y-1" href={file.url} target="_blank" rel="noreferrer" key={file.relativePath}>
              <Icon name="file" className="h-7 w-7" />
              <strong className="mt-8 block break-words text-lg">{file.name}</strong>
              <span className="mt-2 block text-xs font-black uppercase tracking-[.14em] text-slate-500">{file.category === 'OTHER' ? 'Outro arquivo' : file.category}</span>
            </a>
          )) : (
            <div className="rounded-3xl border border-ink/15 bg-white/50 p-8 sm:col-span-2 lg:col-span-3">
              <p className="font-bold text-ink">Nenhum arquivo em destaque ainda.</p>
              <p className="mt-2 text-sm text-ink/65">Envie uma entrega ou configure featuredFiles no profile.json.</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <section className={`overflow-hidden rounded-[2rem] bg-gradient-to-r ${accentClasses[workspace.profile.accent]} p-7 text-ink shadow-lift sm:p-10`}>
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div>
            <span className="text-xs font-black uppercase tracking-[.18em] text-ink/60">Área individual</span>
            <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">{workspace.name}</h1>
            <p className="mt-3 max-w-2xl text-base font-medium leading-7 text-ink/70">{workspace.profile.headline || 'Organize suas entregas, leituras e materiais para apresentação.'}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="button" className="button-dark" onClick={() => setPresenting(true)}><Icon name="presentation" className="h-4 w-4" /> Apresentar</button>
            <button type="button" className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-5 py-3 text-sm font-black hover:bg-white/30" onClick={onLogout}><Icon name="logout" className="h-4 w-4" /> Sair</button>
          </div>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[.72fr_1.28fr]">
        <div className="space-y-6">
          <section className="surface-card">
            <div className="flex items-end justify-between">
              <div><span className="text-xs font-black uppercase tracking-[.16em] text-slate-400">Progresso</span><strong className="mt-2 block text-4xl font-black text-ink">{progress}%</strong></div>
              <span className="text-sm font-bold text-slate-500">{completed}/{regularActivities.length}</span>
            </div>
            <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-cyan-400 transition-all" style={{ width: `${progress}%` }} /></div>
          </section>

          <section className="surface-card">
            <h2 className="text-lg font-black text-ink">Enviar e personalizar</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">Use o prefixo da atividade no nome do arquivo. Exemplo: E03_quadro_regulatorio.pdf.</p>
            <div className="mt-5 grid gap-3">
              <a className="button-dark" href={workspace.uploadUrl} target="_blank" rel="noreferrer"><Icon name="upload" className="h-4 w-4" /> Enviar pelo navegador</a>
              <a className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700 hover:border-cyan-400" href={workspace.folderUrl} target="_blank" rel="noreferrer"><Icon name="external" className="h-4 w-4" /> Abrir minha pasta</a>
            </div>
          </section>

          <section className="surface-card">
            <h2 className="text-lg font-black text-ink">Leituras individuais</h2>
            {workspace.readings.length ? (
              <div className="mt-4 space-y-3">{workspace.readings.map((reading) => <a className="block rounded-2xl bg-slate-50 p-4 text-sm font-bold hover:bg-mist" href={reading.url} target="_blank" rel="noreferrer" key={reading.title}>{reading.title}</a>)}</div>
            ) : <p className="mt-2 text-sm leading-6 text-slate-500">Nenhuma leitura individual atribuída no momento.</p>}
          </section>
        </div>

        <div className="space-y-6">
          <section className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
            <div className="flex items-center justify-between gap-4"><div><span className="text-xs font-black uppercase tracking-[.16em] text-cyan-700">Cronograma pessoal</span><h2 className="mt-2 text-2xl font-black text-ink">Entregas semanais</h2></div><span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500">{workspace.completedCodes.length} arquivos classificados</span></div>
            <div className="mt-6 divide-y divide-slate-100">
              {regularActivities.map((activity) => {
                const done = isActivityComplete(activity, workspace.completedCodes);
                return <div className="flex gap-4 py-4" key={activity.code}><span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-xs font-black ${done ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-400'}`}>{done ? <Icon name="check" className="h-4 w-4" /> : activity.meeting}</span><div><div className="flex flex-wrap items-center gap-2"><strong className="text-sm text-ink">{activity.code} · {activity.theme}</strong>{activity.checkpoint && <span className="rounded-full bg-cyan-100 px-2 py-0.5 text-[.6rem] font-black text-cyan-800">{activity.checkpoint}</span>}</div><p className="mt-1 text-xs leading-5 text-slate-500">{activity.deliverable}</p></div></div>;
              })}
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
            <div><span className="text-xs font-black uppercase tracking-[.16em] text-cyan-700">Repositório</span><h2 className="mt-2 text-2xl font-black text-ink">Meus arquivos</h2></div>
            {workspace.files.length ? (
              <div className="mt-6 grid gap-3 sm:grid-cols-2">{workspace.files.map((file) => <a className="group rounded-2xl border border-slate-200 p-4 transition hover:border-cyan-400 hover:bg-mist" href={file.url} target="_blank" rel="noreferrer" key={file.relativePath}><div className="flex items-start justify-between gap-3"><Icon name="file" className="h-5 w-5 shrink-0 text-cyan-700" /><span className="rounded-full bg-slate-100 px-2 py-1 text-[.6rem] font-black text-slate-500">{file.category === 'OTHER' ? 'OUTRO' : file.category}</span></div><strong className="mt-4 block break-words text-sm leading-5 text-ink">{file.name}</strong></a>)}</div>
            ) : <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-7 text-center"><p className="font-bold text-ink">Sua pasta ainda está vazia.</p><p className="mt-2 text-sm text-slate-500">O primeiro upload aparecerá aqui após a publicação do site.</p></div>}
          </section>
        </div>
      </div>
    </div>
  );
}

export default function StudentPortal({ workspaces, activities }) {
  const [studentSlug, setStudentSlug] = useState(null);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(SESSION_KEY);
      if (saved && workspaces.some((workspace) => workspace.slug === saved)) setStudentSlug(saved);
    } catch {
      // Session storage can be unavailable in restrictive browser modes.
    }
  }, [workspaces]);

  const workspace = useMemo(() => workspaces.find((item) => item.slug === studentSlug), [studentSlug, workspaces]);

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setLoading(true);
    const normalizedLogin = login.trim().toLowerCase();
    const record = accessRecords.find((item) => item.login.toLowerCase() === normalizedLogin);
    const candidate = record ? await digest(`${record.salt}:${password}`) : '';
    if (!record || candidate !== record.hash) {
      setError('Login ou senha inválidos. Confira os dados fornecidos pela equipe docente.');
      setLoading(false);
      return;
    }
    setStudentSlug(record.slug);
    setPassword('');
    setLoading(false);
    try { sessionStorage.setItem(SESSION_KEY, record.slug); } catch { /* no-op */ }
  }

  function handleLogout() {
    setStudentSlug(null);
    setLogin('');
    try { sessionStorage.removeItem(SESSION_KEY); } catch { /* no-op */ }
  }

  if (workspace) return <StudentDashboard workspace={workspace} activities={activities} onLogout={handleLogout} />;

  return (
    <div className="mx-auto grid max-w-5xl overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-lift lg:grid-cols-[.9fr_1.1fr]">
      <div className="relative overflow-hidden bg-ink p-8 text-white sm:p-12">
        <div className="route-grid absolute inset-0 opacity-30" aria-hidden="true" />
        <div className="relative">
          <div className="grid h-14 w-14 place-items-center rounded-2xl bg-cyan-300 text-ink"><Icon name="lock" className="h-7 w-7" /></div>
          <h1 className="mt-10 text-3xl font-black tracking-tight sm:text-4xl">Seu espaço no semestre.</h1>
          <p className="mt-4 text-base leading-7 text-slate-300">Acompanhe entregas, acesse leituras individuais e prepare seus arquivos para apresentação.</p>
          <div className="mt-10 border-t border-white/10 pt-6 text-xs leading-5 text-slate-400">Este acesso organiza a navegação. Os arquivos continuam armazenados em um repositório público do GitHub.</div>
        </div>
      </div>
      <form className="p-8 sm:p-12" onSubmit={handleSubmit}>
        <span className="text-xs font-black uppercase tracking-[.18em] text-cyan-700">Acesso individual</span>
        <h2 className="mt-3 text-2xl font-black text-ink">Entrar na área do aluno</h2>
        <div className="mt-8 space-y-5">
          <label className="block"><span className="mb-2 block text-sm font-bold text-slate-700">Login</span><input className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-ink outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100" value={login} onChange={(event) => setLogin(event.target.value)} autoComplete="username" required /></label>
          <label className="block"><span className="mb-2 block text-sm font-bold text-slate-700">Senha provisória</span><input type="password" className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-ink outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" required /></label>
        </div>
        {error && <p className="mt-4 rounded-2xl bg-red-50 p-4 text-sm font-semibold text-red-700" role="alert">{error}</p>}
        <button className="button-dark mt-6 w-full disabled:cursor-wait disabled:opacity-60" type="submit" disabled={loading}>{loading ? 'Verificando…' : 'Acessar painel'} <Icon name="arrow" className="h-4 w-4" /></button>
      </form>
    </div>
  );
}
