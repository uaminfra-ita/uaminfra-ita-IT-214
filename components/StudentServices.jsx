'use client';

import { useMemo, useState } from 'react';
import activities from '@/data/activities.json';
import {
  githubDevUrl,
  githubIssueUrl,
  latexWorkflowUrl,
  repositoryHistoryUrl,
  repositoryPathUrl,
  repositoryUploadUrl,
} from '@/lib/githubCourse.mjs';
import usePublicRepositoryTree, { pathsBelow } from '@/lib/usePublicRepositoryTree';
import Icon from './Icon';

const questionActivities = activities.filter((activity) => activity.type !== 'break');

function QuestionWorkspace({ studentId }) {
  const [activityCode, setActivityCode] = useState(questionActivities[0]?.code || 'Geral');
  const [question, setQuestion] = useState('');
  const cleanQuestion = question.trim();
  const activity = questionActivities.find((item) => item.code === activityCode);
  const issueUrl = useMemo(() => githubIssueUrl({
    title: `[Dúvida ${activityCode}] ${cleanQuestion.slice(0, 72) || 'Nova pergunta'}`,
    body: `## Atividade\n${activityCode} — ${activity?.theme || 'Dúvida geral'}\n\n## Pergunta\n${cleanQuestion || 'Descreva a dúvida aqui.'}\n\n## Identificador da conta\n${studentId}\n\n> Esta conversa é pública. Não inclua notas, senhas, e-mail ou informações pessoais.`,
  }), [activity?.theme, activityCode, cleanQuestion, studentId]);

  return (
    <section className="surface-card">
      <div className="flex items-start gap-4"><div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-cyan-50 text-cyan-800"><Icon name="question" className="h-5 w-5" /></div><div><span className="eyebrow">Dúvidas</span><h3 className="mt-4 text-xl font-black text-ink">Perguntar à equipe</h3></div></div>
      <p className="mt-4 text-sm leading-6 text-slate-600">Escreva a pergunta aqui. O GitHub abrirá uma issue pública já preenchida para você revisar e enviar.</p>
      <label className="mt-5 block text-sm font-black text-slate-700" htmlFor="question-activity">Atividade relacionada</label>
      <select className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-cyan-600 focus:ring-4 focus:ring-cyan-100" id="question-activity" value={activityCode} onChange={(event) => setActivityCode(event.target.value)}>{questionActivities.map((item) => <option value={item.code} key={item.code}>{item.code} · {item.theme}</option>)}</select>
      <label className="mt-4 block text-sm font-black text-slate-700" htmlFor="student-question">Sua dúvida</label>
      <textarea className="mt-2 min-h-32 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm leading-6 outline-none focus:border-cyan-600 focus:ring-4 focus:ring-cyan-100" id="student-question" maxLength={1200} value={question} onChange={(event) => setQuestion(event.target.value)} placeholder="Explique onde surgiu a dúvida e o que você já tentou." />
      {cleanQuestion ? <a className="button-dark mt-5" href={issueUrl} target="_blank" rel="noreferrer"><Icon name="external" className="h-4 w-4" /> Revisar e publicar dúvida</a> : <p className="mt-4 text-xs font-bold text-slate-500">O botão será liberado depois que você escrever a pergunta.</p>}
    </section>
  );
}

function AccountWorkspace({ studentId }) {
  const requestUrl = githubIssueUrl({
    title: `[Acesso] Solicitação de nova senha — ${studentId}`,
    body: `Solicito a redefinição da senha temporária da conta ${studentId}.\n\nNão incluí senha, e-mail ou dados pessoais nesta issue pública. A nova senha deve ser entregue pela equipe docente em canal privado.`,
  });
  return (
    <section className="surface-card">
      <div className="flex items-start gap-4"><div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-amber-50 text-amber-800"><Icon name="key" className="h-5 w-5" /></div><div><span className="eyebrow">Conta</span><h3 className="mt-4 text-xl font-black text-ink">Trocar senha temporária</h3></div></div>
      <p className="mt-4 text-sm leading-6 text-slate-600">O pedido fica registrado no GitHub. A equipe gera uma nova senha e a entrega por canal privado após atualizar o portal.</p>
      <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-xs leading-5 text-amber-900"><strong>Nunca escreva sua senha atual ou a nova senha no GitHub.</strong> Issues, commits e arquivos deste repositório são públicos.</div>
      <a className="button-dark mt-5" href={requestUrl} target="_blank" rel="noreferrer"><Icon name="external" className="h-4 w-4" /> Solicitar nova senha</a>
    </section>
  );
}

function LatexWorkspace({ studentId }) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const { paths, loading, error } = usePublicRepositoryTree();
  const projectPath = `projetos/${studentId}`;
  const projectFiles = pathsBelow(paths, projectPath);
  const hasProject = projectFiles.some((path) => path.endsWith('/main.tex'));
  const templateUrl = `${basePath}/templates/latex/artigo-it214.tex`;

  return (
    <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-lift lg:col-span-2">
      <div className="grid lg:grid-cols-[.72fr_1.28fr]">
        <div className="bg-ink p-7 text-white sm:p-9"><span className="text-xs font-black uppercase tracking-[.17em] text-cyan-300">Projeto LaTeX</span><h3 className="mt-5 text-2xl font-black">Artigo versionado no GitHub</h3><p className="mt-3 text-sm leading-6 text-slate-300">Edite no navegador, faça commits e acompanhe o histórico. Cada envio para a branch de trabalhos dispara a compilação do PDF.</p><ol className="mt-6 space-y-3 text-sm leading-6 text-slate-200"><li><strong className="text-white">1.</strong> Baixe o modelo e salve como <code>main.tex</code>.</li><li><strong className="text-white">2.</strong> Envie para sua pasta pública.</li><li><strong className="text-white">3.</strong> Continue editando no github.dev e consulte o PDF em Actions.</li></ol></div>
        <div className="p-7 sm:p-9"><div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"><div><span className="eyebrow">Seu workspace</span><h3 className="mt-4 text-xl font-black text-ink"><code className="text-base">{projectPath}/main.tex</code></h3></div><span className={`w-fit rounded-full px-3 py-1.5 text-xs font-black ${hasProject ? 'bg-emerald-50 text-emerald-800' : 'bg-slate-100 text-slate-600'}`}>{loading ? 'Consultando…' : hasProject ? 'Projeto criado' : 'Aguardando primeiro arquivo'}</span></div>
          {error && <p className="mt-4 rounded-2xl bg-amber-50 p-4 text-xs font-bold text-amber-900">Não foi possível consultar o status agora. Os links do GitHub continuam disponíveis.</p>}
          <div className="mt-7 flex flex-wrap gap-3"><a className="button-dark" href={templateUrl} download="main.tex"><Icon name="file" className="h-4 w-4" /> Baixar modelo</a><a className="button-primary" href={repositoryUploadUrl(projectPath)} target="_blank" rel="noreferrer"><Icon name="upload" className="h-4 w-4" /> Enviar arquivos</a>{hasProject && <a className="button-dark" href={githubDevUrl(`${projectPath}/main.tex`)} target="_blank" rel="noreferrer"><Icon name="code" className="h-4 w-4" /> Editar no navegador</a>}</div>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">{hasProject ? <><a className="rounded-2xl border border-slate-200 p-4 text-sm font-black text-ink transition hover:border-cyan-400" href={repositoryPathUrl(projectPath)} target="_blank" rel="noreferrer">Ver arquivos</a><a className="rounded-2xl border border-slate-200 p-4 text-sm font-black text-ink transition hover:border-cyan-400" href={repositoryHistoryUrl(projectPath)} target="_blank" rel="noreferrer">Ver histórico</a></> : <><div className="rounded-2xl border border-dashed border-slate-300 p-4 text-sm font-bold text-slate-500">Arquivos após o primeiro envio</div><div className="rounded-2xl border border-dashed border-slate-300 p-4 text-sm font-bold text-slate-500">Histórico após o primeiro commit</div></>}<a className="rounded-2xl border border-slate-200 p-4 text-sm font-black text-ink transition hover:border-cyan-400" href={latexWorkflowUrl()} target="_blank" rel="noreferrer">Compilações e PDFs</a></div>
          <p className="mt-5 text-xs leading-5 text-slate-500">O editor github.dev salva alterações somente quando você cria um commit. O PDF compilado aparece como artefato do workflow “Compilar projetos LaTeX”.</p>
        </div>
      </div>
    </section>
  );
}

export default function StudentServices({ studentId }) {
  return <div className="grid gap-6 lg:grid-cols-2"><QuestionWorkspace studentId={studentId} /><AccountWorkspace studentId={studentId} /><LatexWorkspace studentId={studentId} /></div>;
}
