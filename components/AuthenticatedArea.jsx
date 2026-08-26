'use client';

import { useEffect, useState } from 'react';
import access from '@/data/access.json';
import activities from '@/data/activities.json';
import resources from '@/data/resources.json';
import course from '@/data/course.json';
import { nextScheduledActivity } from '@/lib/courseDates.mjs';
import { studentGuidanceFor } from '@/lib/driveCourse.mjs';
import Icon from './Icon';
import SubmissionWorkspace, { StaffSubmissionOverview } from './SubmissionWorkspace';
import StudentServices from './StudentServices';

const SESSION_KEY = 'it214-pilot-session';
const staffRoles = new Set(['instructor', 'admin']);
const roleLabels = { student: 'Aluno', instructor: 'Instrutor', admin: 'Professor' };

function formatDate(date) {
  return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short', timeZone: 'America/Sao_Paulo' }).format(new Date(`${date}T12:00:00-03:00`));
}

function toBase64Url(bytes) {
  let binary = '';
  bytes.forEach((byte) => { binary += String.fromCharCode(byte); });
  return btoa(binary).replaceAll('+', '-').replaceAll('/', '_').replaceAll('=', '');
}

function fromBase64Url(value) {
  const normalized = value.replaceAll('-', '+').replaceAll('_', '/');
  const binary = atob(normalized.padEnd(Math.ceil(normalized.length / 4) * 4, '='));
  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
}

async function digestEmail(email) {
  const bytes = new TextEncoder().encode(email.trim().toLowerCase());
  return toBase64Url(new Uint8Array(await crypto.subtle.digest('SHA-256', bytes)));
}

async function verifyPassword(password, credential) {
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits({
    name: 'PBKDF2',
    hash: 'SHA-256',
    salt: fromBase64Url(credential.salt),
    iterations: credential.iterations,
  }, key, 256);
  return toBase64Url(new Uint8Array(bits)) === credential.passwordHash;
}

function LoadingPanel() {
  return <div className="surface-card mx-auto max-w-4xl text-center"><div className="mx-auto h-9 w-9 animate-spin rounded-full border-4 border-cyan-100 border-t-cyan-600" /><p className="mt-4 text-sm font-bold text-slate-600">Preparando o acesso…</p></div>;
}

function StatusMessage({ title, children, tone = 'slate' }) {
  const tones = {
    slate: 'border-slate-200 bg-white text-slate-700',
    amber: 'border-amber-200 bg-amber-50 text-amber-900',
    red: 'border-red-200 bg-red-50 text-red-900',
  };
  return <div className={`mx-auto max-w-4xl rounded-3xl border p-8 shadow-lift ${tones[tone]}`}><h2 className="text-2xl font-black">{title}</h2><div className="mt-3 text-sm leading-6">{children}</div></div>;
}

function LoginPanel({ onAuthenticate }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function submit(event) {
    event.preventDefault();
    setError('');
    setSubmitting(true);
    const authenticated = await onAuthenticate(email, password);
    setSubmitting(false);
    if (!authenticated) setError('Não foi possível entrar. Confira e-mail e senha ou procure a equipe docente.');
  }

  return (
    <section className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-lift">
      <div className="grid lg:grid-cols-[.85fr_1.15fr]">
        <div className="relative overflow-hidden bg-ink p-8 text-white sm:p-12">
          <div className="route-grid absolute inset-0 opacity-30" aria-hidden="true" />
          <div className="relative">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-cyan-300 text-ink"><Icon name="lock" className="h-7 w-7" /></div>
            <span className="mt-10 block text-xs font-black uppercase tracking-[.18em] text-cyan-300">Ambiente da disciplina</span>
            <h2 className="mt-3 text-3xl font-black tracking-tight">Seu espaço na disciplina.</h2>
            <p className="mt-4 text-base leading-7 text-slate-300">Acesse o cronograma, as leituras e a visão correspondente ao seu papel na turma.</p>
          </div>
        </div>
        <form className="p-8 sm:p-12" onSubmit={submit}>
          <h2 className="text-2xl font-black text-ink">Entrar na disciplina</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">Use a conta fornecida pela equipe docente. O cadastro público está desativado.</p>
          <label className="mt-7 block text-sm font-black text-slate-700" htmlFor="student-email">E-mail</label>
          <input className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-cyan-600 focus:ring-4 focus:ring-cyan-100" id="student-email" type="email" autoComplete="username" required value={email} onChange={(event) => setEmail(event.target.value)} />
          <label className="mt-5 block text-sm font-black text-slate-700" htmlFor="student-password">Senha</label>
          <input className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-cyan-600 focus:ring-4 focus:ring-cyan-100" id="student-password" type="password" autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} />
          {error && <p className="mt-4 rounded-2xl bg-red-50 p-4 text-sm font-semibold text-red-800" role="alert">{error}</p>}
          <button className="button-dark mt-7 w-full justify-center disabled:cursor-wait disabled:opacity-60" type="submit" disabled={submitting}>{submitting ? 'Entrando…' : 'Entrar'}</button>
          <p className="mt-5 text-xs leading-5 text-slate-500">Os arquivos ficam no Google Drive e obedecem às permissões definidas pela equipe docente.</p>
        </form>
      </div>
    </section>
  );
}

function DashboardHeader({ name, role, onLogout }) {
  return <div className="flex flex-col gap-5 rounded-3xl bg-ink p-7 text-white sm:flex-row sm:items-center sm:justify-between"><div><span className="text-xs font-black uppercase tracking-[.17em] text-cyan-300">{role === 'student' ? 'Painel do aluno' : 'Painel docente'}</span><h2 className="mt-2 text-3xl font-black">Olá, {name}.</h2></div><button className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-black transition hover:bg-white/10" type="button" onClick={onLogout}><Icon name="logout" className="h-4 w-4" /> Encerrar sessão</button></div>;
}

function IndividualGuidance({ studentId }) {
  const guidance = studentGuidanceFor(studentId);
  if (!guidance) return <section className="surface-card"><span className="eyebrow">Materiais individuais</span><h3 className="mt-5 text-xl font-black text-ink">Nenhuma indicação individual</h3><p className="mt-3 text-sm leading-6 text-slate-600">Quando a equipe preparar uma orientação acadêmica para seu tema, o acesso aparecerá aqui.</p></section>;

  return (
    <section className="surface-card border-cyan-200 bg-cyan-50/40">
      <span className="eyebrow">Orientação inicial</span>
      <h3 className="mt-5 text-xl font-black text-ink">O que sugerimos para seu artigo</h3>
      <p className="mt-3 text-sm leading-6 text-slate-700">Este material reúne o que a equipe docente e os monitores sugerem com base apenas no tema que você propôs. Ele expressa a visão acadêmica da equipe neste momento: não é uma verdade absoluta nem um recorte obrigatório.</p>
      <p className="mt-3 text-sm leading-6 text-slate-600">A orientação será revista conforme sua pergunta, seu método, suas evidências e sua própria escrita evoluírem. As decisões intelectuais e a autoria do artigo continuam sendo suas.</p>
      <a className="button-dark mt-6" href={guidance.documentUrl} target="_blank" rel="noreferrer"><Icon name="external" className="h-4 w-4" /> Abrir orientação no Drive</a>
      <p className="mt-4 text-xs leading-5 text-slate-500">O documento usa as permissões da sua pasta individual no Google Drive.</p>
    </section>
  );
}

function StudentDashboard({ profile, membership, onLogout }) {
  const nextActivity = nextScheduledActivity(activities);
  const upcoming = nextActivity ? activities.filter((item) => item.status === 'scheduled' && item.date >= nextActivity.date).slice(0, 4) : [];
  const readings = resources.generalArticles.slice(0, 3);
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <DashboardHeader name={profile.full_name} role={membership.role} onLogout={onLogout} />
      <SubmissionWorkspace studentId={profile.id} />
      <StudentServices studentId={profile.id} studentName={profile.full_name} />
      <div className="grid gap-6 lg:grid-cols-[1.05fr_.95fr]">
        <section className="surface-card"><span className="eyebrow">Próximo encontro</span>{nextActivity ? <><h3 className="mt-5 text-2xl font-black text-ink">{nextActivity.theme}</h3><p className="mt-3 text-sm font-bold text-cyan-800">{formatDate(nextActivity.date)} · 09h–12h</p><p className="mt-4 text-sm leading-6 text-slate-600">{nextActivity.objective}</p>{nextActivity.presentationSlug && <a className="button-dark mt-6" href={`${basePath}/apresentacoes/${nextActivity.presentationSlug}/`}><Icon name="presentation" className="h-4 w-4" /> Abrir apresentação</a>}</> : <><h3 className="mt-5 text-2xl font-black text-ink">Sem encontros futuros</h3><p className="mt-3 text-sm leading-6 text-slate-600">O cronograma regular deste período foi concluído.</p></>}</section>
        <IndividualGuidance studentId={profile.id} />
      </div>
      <section className="surface-card"><span className="eyebrow">Próximas aulas</span><h3 className="mt-4 text-2xl font-black text-ink">Sequência da disciplina</h3><div className="mt-6 grid gap-3 sm:grid-cols-2">{upcoming.map((item) => <div className="rounded-2xl border border-slate-200 p-4" key={item.code}><div className="flex items-center justify-between gap-3"><strong className="text-ink">{item.code} · {item.theme}</strong><span className="text-xs font-black text-cyan-800">{formatDate(item.date)}</span></div><p className="mt-2 text-xs leading-5 text-slate-500">{item.deliverable}</p></div>)}</div></section>
      <section className="surface-card"><span className="eyebrow">Leituras gerais</span><div className="mt-6 grid gap-4 lg:grid-cols-3">{readings.map((resource) => <a className="rounded-2xl border border-slate-200 p-4 transition hover:border-cyan-400" href={`${basePath}${resource.assetPath}`} target="_blank" rel="noreferrer" key={resource.id}><strong className="block text-sm leading-5 text-ink">{resource.title}</strong><span className="mt-3 inline-flex items-center gap-1 text-xs font-black text-cyan-800">Abrir PDF <Icon name="external" className="h-3.5 w-3.5" /></span></a>)}</div></section>
    </div>
  );
}

function StaffDashboard({ profile, membership, roster, onLogout }) {
  const students = roster.filter((item) => item.role === 'student');
  const staff = roster.filter((item) => staffRoles.has(item.role));
  const nextActivity = nextScheduledActivity(activities);
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <DashboardHeader name={profile.full_name} role={membership.role} onLogout={onLogout} />
      <StaffSubmissionOverview students={students} />
      <div className="grid gap-4 sm:grid-cols-3"><div className="surface-card"><span className="text-4xl font-black text-cyan-700">{students.length}</span><p className="mt-2 text-sm font-bold text-slate-600">alunos cadastrados</p></div><div className="surface-card"><span className="text-4xl font-black text-cyan-700">{staff.length}</span><p className="mt-2 text-sm font-bold text-slate-600">docentes cadastrados</p></div><div className="surface-card"><span className="text-xl font-black text-ink">{nextActivity?.code || '—'}</span><p className="mt-2 text-sm font-bold text-slate-600">{nextActivity ? `${nextActivity.theme} · ${formatDate(nextActivity.date)}` : 'Sem encontros futuros'}</p></div></div>
      <section className="surface-card"><span className="eyebrow">Turma 2026/2</span><h3 className="mt-4 text-2xl font-black text-ink">Usuários cadastrados</h3><div className="mt-6 overflow-x-auto"><table className="w-full min-w-[560px] text-left text-sm"><thead><tr className="border-b border-slate-200 text-xs uppercase tracking-wider text-slate-400"><th className="pb-3">Nome</th><th className="pb-3">Papel</th><th className="pb-3">Estado</th></tr></thead><tbody>{roster.map((item) => <tr className="border-b border-slate-100 last:border-0" key={item.user_id}><td className="py-4 font-black text-ink">{item.full_name}</td><td className="py-4 text-slate-600">{roleLabels[item.role]}</td><td className="py-4"><span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-800">Ativo</span></td></tr>)}</tbody></table></div></section>
      <StatusMessage title="Escopo atual"><p>Entregas e projetos LaTeX são organizados em pastas individuais do Google Drive. Dúvidas e solicitações de nova senha chegam pelo e-mail público da disciplina. Revisão acadêmica, notas e aprovação permanecem fora do portal estático.</p></StatusMessage>
    </div>
  );
}

export default function AuthenticatedArea() {
  const [account, setAccount] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const storedId = sessionStorage.getItem(SESSION_KEY);
    setAccount(access.users.find((user) => user.id === storedId) || null);
    setReady(true);
  }, []);

  async function authenticate(email, password) {
    const emailHash = await digestEmail(email);
    const user = access.users.find((candidate) => candidate.emailHash === emailHash);
    if (!user || !(await verifyPassword(password, user.credential))) return false;
    sessionStorage.setItem(SESSION_KEY, user.id);
    setAccount(user);
    return true;
  }

  function logout() {
    sessionStorage.removeItem(SESSION_KEY);
    setAccount(null);
  }

  if (!ready) return <LoadingPanel />;
  if (!account) return <LoginPanel onAuthenticate={authenticate} />;
  if (account.status !== 'active') return <StatusMessage title="Conta sem acesso à disciplina" tone="amber"><p>Esta conta está desativada para {course.code} {course.term}. Procure a equipe docente.</p><button className="button-dark mt-5" type="button" onClick={logout}>Encerrar sessão</button></StatusMessage>;

  const profile = { full_name: account.displayName };
  const membership = { role: account.role };
  if (staffRoles.has(account.role)) {
    const roster = access.users.filter((user) => user.status === 'active').map((user) => ({ user_id: user.id, full_name: user.displayName, role: user.role, status: user.status })).sort((a, b) => a.full_name.localeCompare(b.full_name, 'pt-BR'));
    return <StaffDashboard profile={profile} membership={membership} roster={roster} onLogout={logout} />;
  }
  return <StudentDashboard profile={{ ...profile, id: account.id }} membership={membership} onLogout={logout} />;
}
