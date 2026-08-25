'use client';

import { useMemo, useState } from 'react';
import activities from '@/data/activities.json';
import courseContact from '@/data/course-contact.json';
import resources from '@/data/resources.json';
import { driveDestinationFor, driveFolderUrl } from '@/lib/driveCourse.mjs';
import Icon from './Icon';

const questionActivities = activities.filter((activity) => activity.type !== 'break');

function mailtoUrl(subject, body) {
  return `mailto:${courseContact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function QuestionWorkspace({ studentId, studentName }) {
  const [activityCode, setActivityCode] = useState('Geral');
  const [question, setQuestion] = useState('');
  const cleanQuestion = question.trim();
  const activity = questionActivities.find((item) => item.code === activityCode);
  const formattedQuestion = useMemo(() => [
    `DÚVIDA — ${activityCode}`,
    `Atividade: ${activity?.theme || 'Dúvida geral'}`,
    `Aluno: ${studentName}`,
    `Identificador da conta: ${studentId}`,
    '',
    cleanQuestion,
  ].join('\n'), [activity?.theme, activityCode, cleanQuestion, studentId, studentName]);
  const emailUrl = mailtoUrl(`IT-214 — Dúvida ${activityCode} — ${studentName}`, formattedQuestion);

  return (
    <section className="surface-card">
      <div className="flex items-start gap-4"><div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-cyan-50 text-cyan-800"><Icon name="question" className="h-5 w-5" /></div><div><span className="eyebrow">Dúvidas</span><h3 className="mt-4 text-xl font-black text-ink">Perguntar à equipe</h3></div></div>
      <p className="mt-4 text-sm leading-6 text-slate-600">Escreva sua dúvida e abra uma mensagem já preenchida para o e-mail da disciplina. Revise o texto e clique em enviar no seu aplicativo de e-mail.</p>
      <label className="mt-5 block text-sm font-black text-slate-700" htmlFor="question-activity">Atividade relacionada</label>
      <select className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-cyan-600 focus:ring-4 focus:ring-cyan-100" id="question-activity" value={activityCode} onChange={(event) => setActivityCode(event.target.value)}><option value="Geral">Geral · Dúvida não vinculada a uma atividade</option>{questionActivities.map((item) => <option value={item.code} key={item.code}>{item.code} · {item.theme}</option>)}</select>
      <label className="mt-4 block text-sm font-black text-slate-700" htmlFor="student-question">Sua dúvida</label>
      <textarea className="mt-2 min-h-32 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm leading-6 outline-none focus:border-cyan-600 focus:ring-4 focus:ring-cyan-100" id="student-question" maxLength={1200} value={question} onChange={(event) => setQuestion(event.target.value)} placeholder="Explique onde surgiu a dúvida e o que você já tentou." />
      {cleanQuestion ? <a className="button-dark mt-5" href={emailUrl}><Icon name="mail" className="h-4 w-4" /> Enviar dúvida por e-mail</a> : <p className="mt-4 text-xs font-bold text-slate-500">O botão será liberado depois que você escrever a pergunta.</p>}
      <p className="mt-4 text-xs leading-5 text-slate-500">O portal prepara a mensagem, mas o envio só acontece depois que você confirmar no aplicativo de e-mail. Se ele não abrir, escreva diretamente para <a className="font-black text-cyan-800 underline" href={`mailto:${courseContact.email}`}>{courseContact.email}</a>.</p>
    </section>
  );
}

function AccountWorkspace({ studentId, studentName }) {
  const requestText = `SOLICITAÇÃO DE NOVA SENHA\nAluno: ${studentName}\nIdentificador da conta: ${studentId}\n\nSolicito a redefinição da senha temporária. A nova senha deve ser entregue por canal privado.`;
  const emailUrl = mailtoUrl(`IT-214 — Solicitação de nova senha — ${studentName}`, requestText);
  return (
    <section className="surface-card">
      <div className="flex items-start gap-4"><div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-amber-50 text-amber-800"><Icon name="key" className="h-5 w-5" /></div><div><span className="eyebrow">Conta</span><h3 className="mt-4 text-xl font-black text-ink">Trocar senha temporária</h3></div></div>
      <p className="mt-4 text-sm leading-6 text-slate-600">O botão abre uma solicitação pronta para o e-mail da disciplina. Revise a mensagem e confirme o envio.</p>
      <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-xs leading-5 text-amber-900"><strong>Nunca escreva sua senha atual nem a nova senha.</strong> A equipe gera a credencial e a entrega por um canal privado.</div>
      <a className="button-dark mt-5" href={emailUrl}><Icon name="mail" className="h-4 w-4" /> Solicitar nova senha por e-mail</a>
    </section>
  );
}

function ArticleWorkspace({ latexUrl }) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const templateLabels = {
    'it214-2026-organized-latex-project': 'Projeto LaTeX IT-214',
    'it214-2026-latex-article-template': 'Elsarticle .tex',
    'elsevier-2024-elsarticle-template-bundle': 'Pacote Elsevier',
    'it214-word-paper-reference-template': 'Modelo Word',
  };
  const templateOrder = [
    'it214-2026-organized-latex-project',
    'it214-2026-latex-article-template',
    'elsevier-2024-elsarticle-template-bundle',
    'it214-word-paper-reference-template',
  ];
  const templates = templateOrder.map((id) => resources.workspaceTemplates.find((template) => template.id === id)).filter(Boolean).map((template) => ({
    ...template,
    url: `${basePath}${template.assetPath}`,
  }));

  return (
    <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-lift lg:col-span-2">
      <div className="grid lg:grid-cols-[.72fr_1.28fr]">
        <div className="bg-ink p-7 text-white sm:p-9"><span className="text-xs font-black uppercase tracking-[.17em] text-cyan-300">Modelos do artigo</span><h3 className="mt-5 text-2xl font-black">Escolha seu ponto de partida</h3><p className="mt-3 text-sm leading-6 text-slate-300">O conteúdo acadêmico esperado é o mesmo. Escolha a ferramenta adequada ao seu fluxo e mantenha fontes, figuras, referências e PDF na pasta individual.</p><ol className="mt-6 space-y-3 text-sm leading-6 text-slate-200"><li><strong className="text-white">1.</strong> Baixe um dos modelos.</li><li><strong className="text-white">2.</strong> Edite no Overleaf, VS Code ou Word.</li><li><strong className="text-white">3.</strong> Envie o arquivo editável e o PDF para o Drive.</li></ol></div>
        <div className="p-7 sm:p-9"><span className="eyebrow">Seu workspace</span><h3 className="mt-4 text-xl font-black text-ink">Pasta “Projeto LaTeX”</h3><p className="mt-4 text-sm leading-6 text-slate-600">O projeto IT-214 separa <code>capitulos/</code>, <code>referencias/</code> e <code>figuras/</code>. Para um início rápido, use o arquivo Elsarticle numérico; o pacote completo da Elsevier e o modelo Word continuam disponíveis como alternativas.</p><div className="mt-7 flex flex-wrap gap-3">{templates.map((template, index) => <a className={index === 0 ? 'button-dark' : 'button-primary'} href={template.url} download key={template.id}><Icon name="file" className="h-4 w-4" /> {templateLabels[template.id]}</a>)}<a className="button-primary" href={latexUrl} target="_blank" rel="noreferrer"><Icon name="external" className="h-4 w-4" /> Abrir projeto no Drive</a></div><p className="mt-5 text-xs leading-5 text-slate-500">O Drive armazena os arquivos, mas não compila LaTeX automaticamente. Envie também o PDF atualizado para facilitar a conferência.</p></div>
      </div>
    </section>
  );
}

export default function StudentServices({ studentId, studentName }) {
  const destination = driveDestinationFor(studentId);
  if (!destination) return null;
  const latexUrl = driveFolderUrl(destination.latexFolderId);
  return <div className="grid gap-6 lg:grid-cols-2"><QuestionWorkspace studentId={studentId} studentName={studentName} /><AccountWorkspace studentId={studentId} studentName={studentName} /><ArticleWorkspace latexUrl={latexUrl} /></div>;
}
