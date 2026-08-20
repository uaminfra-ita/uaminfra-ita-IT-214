'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import activities from '@/data/activities.json';
import courseContact from '@/data/course-contact.json';
import supportService from '@/data/support-service.json';
import { driveDestinationFor, driveFolderUrl } from '@/lib/driveCourse.mjs';
import Icon from './Icon';

const questionActivities = activities.filter((activity) => activity.type !== 'break');
const SUPPORT_CHANNEL = 'it214-support-response';
const supportEndpoint = supportService.endpoint.trim();
const supportReady = /^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/exec$/.test(supportEndpoint);

function requestId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function isGoogleScriptOrigin(origin) {
  try {
    const { hostname, protocol } = new URL(origin);
    return protocol === 'https:' && (hostname === 'script.google.com' || hostname.endsWith('.googleusercontent.com'));
  } catch {
    return false;
  }
}

function useSupportSubmission(kind, studentId) {
  const iframeName = useMemo(() => `it214-support-${kind}-${studentId}`, [kind, studentId]);
  const requestIdInput = useRef(null);
  const parentOriginInput = useRef(null);
  const pendingRequest = useRef('');
  const timeout = useRef(null);
  const [result, setResult] = useState({ state: 'idle', message: '' });

  useEffect(() => {
    function receiveResult(event) {
      const response = event.data;
      if (!isGoogleScriptOrigin(event.origin) || response?.channel !== SUPPORT_CHANNEL || response.requestId !== pendingRequest.current) return;
      window.clearTimeout(timeout.current);
      pendingRequest.current = '';
      setResult({
        state: response.ok ? 'success' : 'error',
        message: response.ok ? 'Solicitação enviada para a equipe da disciplina.' : (response.message || 'Não foi possível enviar agora. Tente novamente em alguns minutos.'),
      });
    }

    window.addEventListener('message', receiveResult);
    return () => {
      window.removeEventListener('message', receiveResult);
      window.clearTimeout(timeout.current);
    };
  }, []);

  function submit(event) {
    if (!supportReady) {
      event.preventDefault();
      setResult({ state: 'error', message: 'O envio automático ainda precisa ser ativado pela equipe docente.' });
      return;
    }

    const nextRequestId = requestId();
    pendingRequest.current = nextRequestId;
    requestIdInput.current.value = nextRequestId;
    parentOriginInput.current.value = window.location.origin;
    setResult({ state: 'sending', message: 'Enviando para a equipe…' });
    window.clearTimeout(timeout.current);
    timeout.current = window.setTimeout(() => {
      pendingRequest.current = '';
      setResult({ state: 'error', message: 'O portal não recebeu a confirmação do envio. Aguarde antes de tentar novamente e, se necessário, procure a equipe.' });
    }, 20000);
  }

  return { iframeName, parentOriginInput, requestIdInput, result, submit };
}

function SubmissionStatus({ result }) {
  if (result.state === 'idle') return null;
  const classes = result.state === 'success'
    ? 'border-emerald-200 bg-emerald-50 text-emerald-900'
    : result.state === 'error'
      ? 'border-red-200 bg-red-50 text-red-900'
      : 'border-cyan-200 bg-cyan-50 text-cyan-900';
  return <p className={`mt-4 rounded-2xl border p-4 text-sm font-bold ${classes}`} role={result.state === 'error' ? 'alert' : 'status'}>{result.message}</p>;
}

function HiddenSubmissionFields({ kind, studentId, studentName, requestIdInput, parentOriginInput }) {
  return (
    <>
      <input type="hidden" name="requestType" value={kind} />
      <input type="hidden" name="studentId" value={studentId} />
      <input type="hidden" name="studentName" value={studentName} />
      <input type="hidden" name="requestId" ref={requestIdInput} />
      <input type="hidden" name="parentOrigin" ref={parentOriginInput} />
      <label className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        Não preencha este campo
        <input name="website" type="text" tabIndex="-1" autoComplete="off" />
      </label>
    </>
  );
}

function QuestionWorkspace({ studentId, studentName }) {
  const [activityCode, setActivityCode] = useState('Geral');
  const [question, setQuestion] = useState('');
  const cleanQuestion = question.trim();
  const activity = questionActivities.find((item) => item.code === activityCode);
  const submission = useSupportSubmission('question', studentId);

  useEffect(() => {
    if (submission.result.state === 'success') setQuestion('');
  }, [submission.result.state]);

  return (
    <section className="surface-card">
      <div className="flex items-start gap-4"><div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-cyan-50 text-cyan-800"><Icon name="question" className="h-5 w-5" /></div><div><span className="eyebrow">Dúvidas</span><h3 className="mt-4 text-xl font-black text-ink">Perguntar à equipe</h3></div></div>
      <p className="mt-4 text-sm leading-6 text-slate-600">Escreva sua dúvida e envie diretamente pelo portal. A mensagem chega ao e-mail da disciplina sem abrir outro aplicativo.</p>
      <form action={supportReady ? supportEndpoint : undefined} method="post" target={submission.iframeName} onSubmit={submission.submit}>
        <HiddenSubmissionFields kind="question" studentId={studentId} studentName={studentName} requestIdInput={submission.requestIdInput} parentOriginInput={submission.parentOriginInput} />
        <input type="hidden" name="activityTitle" value={activity?.theme || 'Dúvida geral'} />
        <label className="mt-5 block text-sm font-black text-slate-700" htmlFor="question-activity">Atividade relacionada</label>
        <select className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-cyan-600 focus:ring-4 focus:ring-cyan-100" id="question-activity" name="activityCode" value={activityCode} onChange={(event) => setActivityCode(event.target.value)}><option value="Geral">Geral · Dúvida não vinculada a uma atividade</option>{questionActivities.map((item) => <option value={item.code} key={item.code}>{item.code} · {item.theme}</option>)}</select>
        <label className="mt-4 block text-sm font-black text-slate-700" htmlFor="student-question">Sua dúvida</label>
        <textarea className="mt-2 min-h-32 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm leading-6 outline-none focus:border-cyan-600 focus:ring-4 focus:ring-cyan-100" id="student-question" name="message" maxLength={1200} required value={question} onChange={(event) => setQuestion(event.target.value)} placeholder="Explique onde surgiu a dúvida e o que você já tentou." />
        <button className="button-dark mt-5 disabled:cursor-not-allowed disabled:opacity-50" type="submit" disabled={!cleanQuestion || submission.result.state === 'sending' || !supportReady}><Icon name="mail" className="h-4 w-4" /> {submission.result.state === 'sending' ? 'Enviando…' : 'Enviar dúvida'}</button>
      </form>
      <SubmissionStatus result={submission.result} />
      {!supportReady && <p className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-xs font-bold leading-5 text-amber-900">Envio automático aguardando a publicação da automação. Enquanto isso, use o contato <strong>{courseContact.email}</strong>.</p>}
      <p className="mt-4 text-xs leading-5 text-slate-500">Não inclua senhas, notas, diagnósticos ou informações pessoais na mensagem.</p>
      <iframe className="hidden" name={submission.iframeName} title="Confirmação do envio da dúvida" />
    </section>
  );
}

function AccountWorkspace({ studentId, studentName }) {
  const submission = useSupportSubmission('password-reset', studentId);
  return (
    <section className="surface-card">
      <div className="flex items-start gap-4"><div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-amber-50 text-amber-800"><Icon name="key" className="h-5 w-5" /></div><div><span className="eyebrow">Conta</span><h3 className="mt-4 text-xl font-black text-ink">Trocar senha temporária</h3></div></div>
      <p className="mt-4 text-sm leading-6 text-slate-600">Envie o pedido diretamente pelo portal. A equipe confere sua identidade e entrega a nova credencial por um canal privado.</p>
      <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-xs leading-5 text-amber-900"><strong>Nunca escreva sua senha atual nem a nova senha.</strong> O pedido contém apenas seu nome e o identificador da conta.</div>
      <form action={supportReady ? supportEndpoint : undefined} method="post" target={submission.iframeName} onSubmit={submission.submit}>
        <HiddenSubmissionFields kind="password-reset" studentId={studentId} studentName={studentName} requestIdInput={submission.requestIdInput} parentOriginInput={submission.parentOriginInput} />
        <button className="button-dark mt-5 disabled:cursor-not-allowed disabled:opacity-50" type="submit" disabled={submission.result.state === 'sending' || !supportReady}><Icon name="mail" className="h-4 w-4" /> {submission.result.state === 'sending' ? 'Enviando…' : 'Solicitar nova senha'}</button>
      </form>
      <SubmissionStatus result={submission.result} />
      {!supportReady && <p className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-xs font-bold leading-5 text-amber-900">Envio automático aguardando a publicação da automação. Enquanto isso, use o contato <strong>{courseContact.email}</strong>.</p>}
      <iframe className="hidden" name={submission.iframeName} title="Confirmação do pedido de senha" />
    </section>
  );
}

function LatexWorkspace({ latexUrl }) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const templateUrl = `${basePath}/templates/latex/artigo-it214.tex`;

  return (
    <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-lift lg:col-span-2">
      <div className="grid lg:grid-cols-[.72fr_1.28fr]">
        <div className="bg-ink p-7 text-white sm:p-9"><span className="text-xs font-black uppercase tracking-[.17em] text-cyan-300">Projeto LaTeX</span><h3 className="mt-5 text-2xl font-black">Projeto organizado no Drive</h3><p className="mt-3 text-sm leading-6 text-slate-300">Guarde o fonte, as figuras, a bibliografia e o PDF compilado na pasta individual. A equipe acompanha o mesmo conjunto de arquivos pelo painel docente.</p><ol className="mt-6 space-y-3 text-sm leading-6 text-slate-200"><li><strong className="text-white">1.</strong> Baixe o modelo e salve como <code>main.tex</code>.</li><li><strong className="text-white">2.</strong> Edite no ambiente LaTeX de sua preferência.</li><li><strong className="text-white">3.</strong> Envie o projeto e o PDF compilado para o Drive.</li></ol></div>
        <div className="p-7 sm:p-9"><span className="eyebrow">Seu workspace</span><h3 className="mt-4 text-xl font-black text-ink">Pasta “Projeto LaTeX”</h3><p className="mt-4 text-sm leading-6 text-slate-600">Mantenha <code>main.tex</code>, arquivos <code>.bib</code>, figuras e o PDF na mesma pasta. Substitua os arquivos quando publicar uma nova versão.</p><div className="mt-7 flex flex-wrap gap-3"><a className="button-dark" href={templateUrl} download="main.tex"><Icon name="file" className="h-4 w-4" /> Baixar modelo</a><a className="button-primary" href={latexUrl} target="_blank" rel="noreferrer"><Icon name="external" className="h-4 w-4" /> Abrir projeto no Drive</a></div><p className="mt-5 text-xs leading-5 text-slate-500">O Drive armazena os arquivos, mas não compila LaTeX automaticamente. Envie também o PDF atualizado para facilitar a conferência.</p></div>
      </div>
    </section>
  );
}

export default function StudentServices({ studentId, studentName }) {
  const destination = driveDestinationFor(studentId);
  if (!destination) return null;
  const latexUrl = driveFolderUrl(destination.latexFolderId);
  return <div className="grid gap-6 lg:grid-cols-2"><QuestionWorkspace studentId={studentId} studentName={studentName} /><AccountWorkspace studentId={studentId} studentName={studentName} /><LatexWorkspace latexUrl={latexUrl} /></div>;
}
