'use client';

import { useMemo, useState } from 'react';
import activities from '@/data/activities.json';
import { driveDestinationFor, driveFolderUrl } from '@/lib/driveCourse.mjs';
import Icon from './Icon';

const questionActivities = activities.filter((activity) => activity.type !== 'break');

function copyText(value) {
  if (!navigator.clipboard) return;
  navigator.clipboard.writeText(value).catch(() => {});
}

function QuestionWorkspace({ studentId, supportUrl }) {
  const [activityCode, setActivityCode] = useState(questionActivities[0]?.code || 'Geral');
  const [question, setQuestion] = useState('');
  const cleanQuestion = question.trim();
  const activity = questionActivities.find((item) => item.code === activityCode);
  const formattedQuestion = useMemo(() => [
    `DÚVIDA — ${activityCode}`,
    `Atividade: ${activity?.theme || 'Dúvida geral'}`,
    `Identificador da conta: ${studentId}`,
    '',
    cleanQuestion,
  ].join('\n'), [activity?.theme, activityCode, cleanQuestion, studentId]);

  return (
    <section className="surface-card">
      <div className="flex items-start gap-4"><div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-cyan-50 text-cyan-800"><Icon name="question" className="h-5 w-5" /></div><div><span className="eyebrow">Dúvidas</span><h3 className="mt-4 text-xl font-black text-ink">Perguntar à equipe</h3></div></div>
      <p className="mt-4 text-sm leading-6 text-slate-600">Escreva sua dúvida, copie o texto preparado e salve-o como um Google Doc na pasta individual. A equipe docente acessa essa mesma pasta pelo painel.</p>
      <label className="mt-5 block text-sm font-black text-slate-700" htmlFor="question-activity">Atividade relacionada</label>
      <select className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-cyan-600 focus:ring-4 focus:ring-cyan-100" id="question-activity" value={activityCode} onChange={(event) => setActivityCode(event.target.value)}>{questionActivities.map((item) => <option value={item.code} key={item.code}>{item.code} · {item.theme}</option>)}</select>
      <label className="mt-4 block text-sm font-black text-slate-700" htmlFor="student-question">Sua dúvida</label>
      <textarea className="mt-2 min-h-32 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm leading-6 outline-none focus:border-cyan-600 focus:ring-4 focus:ring-cyan-100" id="student-question" maxLength={1200} value={question} onChange={(event) => setQuestion(event.target.value)} placeholder="Explique onde surgiu a dúvida e o que você já tentou." />
      {cleanQuestion ? <a className="button-dark mt-5" href={supportUrl} target="_blank" rel="noreferrer" onClick={() => copyText(formattedQuestion)}><Icon name="external" className="h-4 w-4" /> Copiar e abrir pasta de dúvidas</a> : <p className="mt-4 text-xs font-bold text-slate-500">O botão será liberado depois que você escrever a pergunta.</p>}
      <p className="mt-4 text-xs leading-5 text-slate-500">No Drive, crie um Google Doc com o nome <strong>DÚVIDA - {activityCode}</strong> e cole o texto copiado.</p>
    </section>
  );
}

function AccountWorkspace({ studentId, supportUrl }) {
  const requestText = `SOLICITAÇÃO DE NOVA SENHA\nIdentificador da conta: ${studentId}\n\nSolicito a redefinição da senha temporária. A nova senha deve ser entregue por canal privado.`;
  return (
    <section className="surface-card">
      <div className="flex items-start gap-4"><div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-amber-50 text-amber-800"><Icon name="key" className="h-5 w-5" /></div><div><span className="eyebrow">Conta</span><h3 className="mt-4 text-xl font-black text-ink">Trocar senha temporária</h3></div></div>
      <p className="mt-4 text-sm leading-6 text-slate-600">O botão copia uma solicitação segura e abre sua pasta individual. Crie ali um Google Doc chamado <strong>PEDIDO DE NOVA SENHA</strong>.</p>
      <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-xs leading-5 text-amber-900"><strong>Nunca escreva sua senha atual nem a nova senha.</strong> A equipe gera a credencial e a entrega por um canal privado.</div>
      <a className="button-dark mt-5" href={supportUrl} target="_blank" rel="noreferrer" onClick={() => copyText(requestText)}><Icon name="external" className="h-4 w-4" /> Copiar pedido e abrir pasta</a>
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

export default function StudentServices({ studentId }) {
  const destination = driveDestinationFor(studentId);
  if (!destination) return null;
  const supportUrl = driveFolderUrl(destination.supportFolderId);
  const latexUrl = driveFolderUrl(destination.latexFolderId);
  return <div className="grid gap-6 lg:grid-cols-2"><QuestionWorkspace studentId={studentId} supportUrl={supportUrl} /><AccountWorkspace studentId={studentId} supportUrl={supportUrl} /><LatexWorkspace latexUrl={latexUrl} /></div>;
}
