import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { courseDateKey, isActivityPast, nextScheduledActivity } from '../lib/courseDates.mjs';

const root = process.cwd();
const readJson = (name) => JSON.parse(fs.readFileSync(path.join(root, 'data', name), 'utf8'));
const activities = readJson('activities.json');
const resources = readJson('resources.json');
const presentations = readJson('presentations.json');
const presentationAssets = readJson('presentation-assets.json');
const course = readJson('course.json');
const allResources = Object.values(resources).flatMap((group) => group);
const resourceIds = new Set(allResources.map((resource) => resource.id));
const activityIds = new Set(activities.map((activity) => activity.code));
const presentationSlugs = new Set(presentations.map((presentation) => presentation.slug));
const presentationAssetIds = new Set(presentationAssets.map((asset) => asset.id));

assert.equal(activities.filter((item) => item.meeting).length, 16, 'O cronograma deve conter 16 encontros.');
assert.equal(activities.filter((item) => item.meeting && item.submission).length, 16, 'Todo encontro deve declarar o estado de entrega.');
assert.equal(activities.filter((item) => item.checkpoint).length, 4, 'O cronograma deve conter quatro checkpoints.');
assert.equal(activityIds.size, activities.length, 'Códigos de atividade devem ser únicos.');
assert.equal(resourceIds.size, allResources.length, 'IDs de recursos devem ser únicos.');
assert.equal(presentationSlugs.size, presentations.length, 'Slugs de apresentação devem ser únicos.');
assert.equal(presentationAssetIds.size, presentationAssets.length, 'IDs de imagens da apresentação devem ser únicos.');

const allowedStatuses = new Set(['scheduled', 'completed', 'cancelled', 'break']);
activities.forEach((activity) => {
  assert.match(activity.date, /^\d{4}-\d{2}-\d{2}$/, `Data inválida em ${activity.code}.`);
  assert.ok(allowedStatuses.has(activity.status), `Status inválido em ${activity.code}.`);
  assert.ok(Array.isArray(activity.resourceIds), `resourceIds ausente em ${activity.code}.`);
  activity.resourceIds.forEach((id) => {
    assert.ok(resourceIds.has(id), `Recurso ${id} não existe para ${activity.code}.`);
    const resource = allResources.find((item) => item.id === id);
    assert.ok(resource.relatedActivityIds.includes(activity.code), `Relação ${activity.code} → ${id} não é recíproca.`);
  });
  if (activity.presentationSlug) assert.ok(presentationSlugs.has(activity.presentationSlug), `Apresentação inexistente em ${activity.code}.`);
  if (activity.type === 'break') assert.equal(activity.status, 'break', `Recesso ${activity.code} precisa usar status break.`);
  if (activity.submission) {
    assert.equal(activity.submission.audience, 'student', `Entrega ${activity.code} deve declarar audience student.`);
    assert.equal(activity.submission.visibility, 'public', `Entrega ${activity.code} deve ser classificada como pública.`);
    assert.ok(['open', 'scheduled', 'closed'].includes(activity.submission.status), `Estado de entrega inválido em ${activity.code}.`);
    assert.ok(Number.isInteger(activity.submission.maxFiles) && activity.submission.maxFiles > 0, `Limite de arquivos inválido em ${activity.code}.`);
    assert.ok(Number.isInteger(activity.submission.maxFileSizeMb) && activity.submission.maxFileSizeMb > 0, `Limite de tamanho inválido em ${activity.code}.`);
    assert.ok(Array.isArray(activity.submission.acceptedExtensions) && activity.submission.acceptedExtensions.length > 0, `Extensões ausentes em ${activity.code}.`);
    activity.submission.acceptedExtensions.forEach((extension) => assert.match(extension, /^\.[a-z0-9]+$/, `Extensão inválida em ${activity.code}.`));
  }
});

const requiredResourceFields = ['id', 'category', 'title', 'authors', 'year', 'publication', 'publisherUrl', 'assetPath', 'audience', 'license', 'rightsNote', 'summary', 'tags', 'relatedActivityIds', 'sha256'];
const declaredPublicResourcePaths = [];
const hashes = new Set();
allResources.forEach((resource) => {
  requiredResourceFields.forEach((field) => assert.ok(resource[field] !== undefined && resource[field] !== '', `${resource.id || 'Recurso'} sem ${field}.`));
  assert.equal(resource.audience, 'public', `${resource.id} possui asset público sem audience public.`);
  assert.ok(Array.isArray(resource.authors) && resource.authors.length > 0, `${resource.id} sem autoria.`);
  assert.ok(Array.isArray(resource.tags) && resource.tags.length > 0, `${resource.id} sem tags.`);
  assert.ok(Array.isArray(resource.relatedActivityIds) && resource.relatedActivityIds.length > 0, `${resource.id} sem relação acadêmica.`);
  resource.relatedActivityIds.forEach((id) => {
    assert.ok(activityIds.has(id), `Atividade ${id} não existe para ${resource.id}.`);
    const activity = activities.find((item) => item.code === id);
    assert.ok(activity.resourceIds.includes(resource.id), `Relação ${resource.id} → ${id} não é recíproca.`);
  });
  assert.ok(resource.publisherUrl.startsWith('https://'), `${resource.id} deve usar fonte HTTPS.`);
  if (resource.category === 'general-article') {
    assert.ok(resource.doi, `${resource.id} deve declarar DOI.`);
    assert.ok(resource.assetPath.startsWith('/resources/articles/'), `${resource.id} deve usar a pasta de artigos.`);
  } else if (resource.category === 'technical-document') {
    assert.ok(resource.documentNumber, `${resource.id} deve declarar número ou identificador documental.`);
    assert.ok(resource.assetPath.startsWith('/resources/technical/'), `${resource.id} deve usar a pasta técnica.`);
  } else if (resource.category === 'discipline-document') {
    assert.ok(resource.assetPath.startsWith('/resources/discipline/'), `${resource.id} deve usar a pasta da disciplina.`);
  } else if (resource.category === 'latex-template') {
    assert.ok(resource.assetPath.startsWith('/templates/latex/'), `${resource.id} deve usar a pasta pública de modelos LaTeX.`);
  } else {
    assert.fail(`Categoria de recurso desconhecida em ${resource.id}.`);
  }
  if (resource.doi) assert.ok(resource.publisherUrl.includes(resource.doi) || resource.id === 'nrel-2023-vertiport-electrical', `${resource.id} possui DOI divergente da fonte.`);
  if (resource.category === 'latex-template') assert.ok(resource.assetPath.endsWith('.tex'), `${resource.id} deve apontar para um arquivo .tex.`);
  else assert.ok(resource.assetPath.endsWith('.pdf'), `${resource.id} possui assetPath inválido.`);
  assert.match(resource.sha256, /^[A-F0-9]{64}$/, `${resource.id} possui SHA-256 inválido.`);
  assert.ok(!hashes.has(resource.sha256), `${resource.id} duplica um arquivo já declarado.`);
  hashes.add(resource.sha256);
  const relativePath = resource.assetPath.slice(1).replaceAll('/', path.sep);
  const fullPath = path.join(root, 'public', relativePath);
  assert.ok(fs.existsSync(fullPath), `Recurso público ausente: ${resource.assetPath}.`);
  const fileContents = fs.readFileSync(fullPath);
  const canonicalContents = resource.category === 'latex-template'
    ? Buffer.from(fileContents.toString('utf8').replaceAll('\r\n', '\n'))
    : fileContents;
  const actualHash = createHash('sha256').update(canonicalContents).digest('hex').toUpperCase();
  assert.equal(actualHash, resource.sha256, `Checksum divergente: ${resource.assetPath}.`);
  declaredPublicResourcePaths.push(path.relative(root, fullPath));
});

const declaredPresentationMediaPaths = [];
presentationAssets.forEach((asset) => {
  ['id', 'presentationSlug', 'title', 'assetPath', 'kind', 'creator', 'sourceUrl', 'creditLine', 'usageBasis', 'alt', 'sha256'].forEach((field) => {
    assert.ok(asset[field], `${asset.id || 'Imagem'} sem ${field}.`);
  });
  assert.ok(presentationSlugs.has(asset.presentationSlug), `Apresentação inexistente para ${asset.id}.`);
  assert.ok(Array.isArray(asset.slideNumbers) && asset.slideNumbers.length > 0, `${asset.id} sem slides relacionados.`);
  const presentation = presentations.find((item) => item.slug === asset.presentationSlug);
  asset.slideNumbers.forEach((slideNumber) => {
    assert.ok(Number.isInteger(slideNumber) && slideNumber >= 1 && slideNumber < presentation.slideCount, `Slide inválido em ${asset.id}.`);
  });
  assert.ok(asset.sourceUrl.startsWith('https://'), `${asset.id} deve usar fonte HTTPS.`);
  assert.ok(asset.assetPath.startsWith('/images/presentations/') && /\.(?:jpe?g|png|webp)$/i.test(asset.assetPath), `${asset.id} possui assetPath inválido.`);
  assert.match(asset.sha256, /^[A-F0-9]{64}$/, `${asset.id} possui SHA-256 inválido.`);
  const relativePath = asset.assetPath.slice(1).replaceAll('/', path.sep);
  const fullPath = path.join(root, 'public', relativePath);
  assert.ok(fs.existsSync(fullPath), `Imagem ausente: ${asset.assetPath}.`);
  assert.ok(fs.statSync(fullPath).size < 1_000_000, `Imagem não otimizada: ${asset.assetPath}.`);
  const actualHash = createHash('sha256').update(fs.readFileSync(fullPath)).digest('hex').toUpperCase();
  assert.equal(actualHash, asset.sha256, `Checksum divergente: ${asset.assetPath}.`);
  const routeFile = path.join(root, 'app', 'apresentacoes', asset.presentationSlug, 'page.jsx');
  assert.ok(fs.readFileSync(routeFile, 'utf8').includes(`assetId="${asset.id}"`) || fs.readFileSync(routeFile, 'utf8').includes(`'${asset.id}'`), `Imagem ${asset.id} não é usada na apresentação.`);
  declaredPresentationMediaPaths.push(path.relative(root, fullPath));
});

presentations.forEach((presentation) => {
  assert.ok(activityIds.has(presentation.activityId), `Atividade inexistente em ${presentation.slug}.`);
  assert.equal(presentation.durationMinutes, 90, `${presentation.slug} deve durar 90 minutos.`);
  assert.ok(Number.isInteger(presentation.slideCount) && presentation.slideCount > 0, `${presentation.slug} deve declarar uma quantidade positiva de slides.`);
  assert.ok(Array.isArray(presentation.objectives) && presentation.objectives.length === 4, `${presentation.slug} precisa de quatro objetivos.`);
  presentation.resourceIds.forEach((id) => assert.ok(resourceIds.has(id), `Fonte ${id} não existe em ${presentation.slug}.`));
  assert.ok(Array.isArray(presentation.references) && presentation.references.length >= presentation.resourceIds.length, `${presentation.slug} precisa declarar ao menos uma referência para cada recurso-base.`);
  assert.equal(new Set(presentation.references.map((reference) => reference.url)).size, presentation.references.length, `Referências duplicadas em ${presentation.slug}.`);
  presentation.references.forEach((reference) => {
    ['shortTitle', 'citation', 'url', 'purpose'].forEach((field) => assert.ok(reference[field], `Referência de ${presentation.slug} sem ${field}.`));
    assert.ok(reference.url.startsWith('https://'), `Referência insegura em ${presentation.slug}.`);
  });
  const routeFile = path.join(root, 'app', 'apresentacoes', presentation.slug, 'page.jsx');
  assert.ok(fs.existsSync(routeFile), `Rota ausente para ${presentation.slug}.`);
  const slideCount = (fs.readFileSync(routeFile, 'utf8').match(/<Slide(?:\s|>)/g) || []).length;
  assert.equal(slideCount, presentation.slideCount, `Quantidade real de slides divergente em ${presentation.slug}.`);
  assert.ok(!fs.readFileSync(routeFile, 'utf8').includes('✦'), `${presentation.slug} ainda possui placeholder visual.`);
});

assert.equal(courseDateKey(new Date('2026-08-11T02:59:59Z')), '2026-08-10', 'Virada de data em Brasília incorreta.');
assert.equal(courseDateKey(new Date('2026-08-11T03:00:00Z')), '2026-08-11', 'Início do dia em Brasília incorreto.');
assert.equal(nextScheduledActivity(activities, '2026-08-10')?.code, 'E02', 'Próxima atividade antes da E02 incorreta.');
assert.equal(isActivityPast(activities.find((item) => item.code === 'E02'), '2026-08-12'), true, 'Atividade passada não reconhecida.');
const cancelledE02 = activities.map((item) => item.code === 'E02' ? { ...item, status: 'cancelled' } : item);
assert.equal(nextScheduledActivity(cancelledE02, '2026-08-10')?.code, 'E03', 'Atividade cancelada não foi ignorada.');
assert.equal(nextScheduledActivity(activities, '2026-09-29')?.code, 'E09', 'Semana sem aula não foi ignorada.');

const ignoredDirectories = new Set(['.git', '.next', 'node_modules', 'out', '.private', '.tools']);
function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (entry.isDirectory() && ignoredDirectories.has(entry.name)) return [];
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return walk(fullPath);
    return [path.relative(root, fullPath)];
  });
}

const repositoryFiles = walk(root);
assert.equal(repositoryFiles.some((file) => path.basename(file).toLowerCase() === 'sigma_c_piii.pdf'), false, 'SIGMA_c_PIII.pdf é uma referência privada e não pode sair de .private/.');
const actualPdfPaths = repositoryFiles.filter((file) => path.extname(file).toLowerCase() === '.pdf').sort();
const declaredPdfPaths = declaredPublicResourcePaths.filter((file) => path.extname(file).toLowerCase() === '.pdf').sort();
assert.deepEqual(actualPdfPaths, declaredPdfPaths, 'Todo PDF no repositório deve estar declarado no catálogo.');
const actualLatexTemplatePaths = repositoryFiles.filter((file) => file.startsWith(`public${path.sep}templates${path.sep}latex${path.sep}`) && path.extname(file).toLowerCase() === '.tex').sort();
const declaredLatexTemplatePaths = declaredPublicResourcePaths.filter((file) => path.extname(file).toLowerCase() === '.tex').sort();
assert.deepEqual(actualLatexTemplatePaths, declaredLatexTemplatePaths, 'Todo modelo LaTeX público deve estar declarado no catálogo.');
const actualPresentationMediaPaths = repositoryFiles.filter((file) => file.startsWith(`public${path.sep}images${path.sep}presentations${path.sep}`)).sort();
assert.deepEqual(actualPresentationMediaPaths, declaredPresentationMediaPaths.sort(), 'Toda imagem de apresentação deve estar declarada no catálogo visual.');
const bannedExtensions = new Set(['.xls', '.xlsx', '.doc', '.docx', '.ppt', '.pptx', '.r']);
assert.deepEqual(repositoryFiles.filter((file) => bannedExtensions.has(path.extname(file).toLowerCase())), [], 'Arquivos Office, planilhas ou scripts R não devem ser publicados.');

const retiredPaths = ['data/students.json', 'components/StudentPortal.jsx', 'lib/studentWorkspace.mjs', 'lib/supabaseClient.js', 'scripts/generate-credentials.mjs', 'scripts/check-deploy-env.mjs', 'scripts/test-supabase-rls.mjs', 'supabase', 'students'];
retiredPaths.forEach((retiredPath) => assert.ok(!fs.existsSync(path.join(root, retiredPath)), `Artefato descontinuado ainda existe: ${retiredPath}.`));

assert.equal(course.staff.length, 4, 'A equipe deve conter quatro integrantes.');
course.staff.forEach((member) => {
  assert.ok(member.image?.startsWith('/images/team/'), `Foto ausente para ${member.name}.`);
  assert.ok(member.linkedin?.startsWith('https://www.linkedin.com/in/'), `LinkedIn inválido para ${member.name}.`);
  assert.ok(fs.existsSync(path.join(root, 'public', member.image.slice(1))), `Arquivo de foto ausente para ${member.name}.`);
});

const resourceComponent = fs.readFileSync(path.join(root, 'components', 'ResourceSection.jsx'), 'utf8');
assert.ok(!resourceComponent.includes('Licença e acesso'), 'Licença e acesso não deve ser exibida nos cartões.');
assert.ok(!resourceComponent.includes('resource.license') && !resourceComponent.includes('resource.rightsNote'), 'Metadados de licença não devem ser exibidos nos cartões.');
assert.ok(resourceComponent.includes('Fonte oficial'), 'Cartões devem oferecer acesso à fonte oficial.');
const activitiesPage = fs.readFileSync(path.join(root, 'app', 'atividades', 'page.jsx'), 'utf8');
assert.ok(!activitiesPage.includes('16 encontros'), 'O quadro quantitativo de encontros deve permanecer removido.');

const authFiles = ['data/access.json', 'components/AuthenticatedArea.jsx', 'components/SubmissionWorkspace.jsx', 'components/StudentServices.jsx', 'lib/githubCourse.mjs', 'lib/usePublicRepositoryTree.js', 'scripts/prepare-private-credentials.mjs', 'scripts/generate-static-access.mjs', 'scripts/reset-private-password.mjs', 'scripts/test-static-access.mjs'];
authFiles.forEach((file) => assert.ok(fs.existsSync(path.join(root, file)), `Artefato de acesso ausente: ${file}.`));
const access = readJson('access.json');
assert.equal(access.scope, 'course-access', 'O catálogo deve declarar o acesso da disciplina.');
assert.equal(access.users.length, 12, 'A turma deve conter doze contas.');
assert.equal(new Set(access.users.map((user) => user.id)).size, access.users.length, 'IDs de acesso devem ser únicos.');
access.users.forEach((user) => {
  assert.ok(user.displayName && ['student', 'instructor', 'admin'].includes(user.role), 'Conta com nome ou papel inválido.');
  assert.equal(user.status, 'active', 'Conta piloto deve estar ativa.');
  assert.ok(!Object.hasOwn(user, 'email') && !Object.hasOwn(user, 'password'), 'Catálogo público não pode conter e-mail ou senha legível.');
  assert.match(user.emailHash, /^[A-Za-z0-9_-]{43}$/, 'Hash de e-mail inválido.');
  assert.equal(user.credential.algorithm, 'PBKDF2-SHA256', 'Algoritmo de senha inesperado.');
  assert.ok(user.credential.iterations >= 200_000, 'PBKDF2 deve usar ao menos 200 mil iterações.');
  assert.match(user.credential.salt, /^[A-Za-z0-9_-]{22}$/, 'Salt inválido.');
  assert.match(user.credential.passwordHash, /^[A-Za-z0-9_-]{43}$/, 'Hash de senha inválido.');
});
assert.equal(access.users.filter((user) => user.role === 'student').length, 8, 'A turma deve conter oito alunos.');
assert.equal(access.users.filter((user) => user.role === 'instructor').length, 3, 'A turma deve conter três instrutores.');
assert.equal(access.users.filter((user) => user.role === 'admin').length, 1, 'A turma deve conter um professor responsável.');
assert.equal(access.users.find((user) => user.displayName === 'Rodrigo Mollo Furlan')?.role, 'instructor', 'Rodrigo deve ser instrutor.');
assert.equal(access.users.find((user) => user.displayName === 'Gabriel Luiz Goulart Rufino')?.role, 'instructor', 'Gabriel deve ser instrutor.');
assert.equal(access.users.find((user) => user.displayName === 'Marcelo Saraiva Peres')?.role, 'instructor', 'Marcelo Peres deve ser instrutor.');
assert.equal(access.users.find((user) => user.displayName === 'Marcelo Xavier Guterres')?.role, 'admin', 'Marcelo Guterres deve ser professor responsável.');
const authComponent = fs.readFileSync(path.join(root, 'components', 'AuthenticatedArea.jsx'), 'utf8');
assert.ok(authComponent.includes("name: 'PBKDF2'"), 'O login deve derivar a senha com PBKDF2.');
assert.ok(authComponent.includes('sessionStorage'), 'A sessão deve usar sessionStorage.');

const workflow = fs.readFileSync(path.join(root, '.github', 'workflows', 'deploy.yml'), 'utf8');
assert.ok(workflow.includes("node-version: '22'"), 'Deploy deve usar Node 22.');
assert.ok(!workflow.toLowerCase().includes('supabase'), 'Deploy estático não deve depender de Supabase.');
const packageJson = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
assert.ok(!Object.keys(packageJson.dependencies).some((dependency) => dependency.includes('supabase')), 'Dependências Supabase devem permanecer removidas.');
assert.equal(packageJson.scripts['reset:password'], 'node scripts/reset-private-password.mjs', 'Comando seguro de redefinição de senha ausente.');
assert.equal(packageJson.scripts['audit:out'], 'node scripts/audit-public-output.mjs', 'Auditoria do artefato público ausente.');
assert.ok(workflow.includes('npm run audit:out'), 'Deploy deve auditar o artefato antes da publicação.');
const latexWorkflow = fs.readFileSync(path.join(root, '.github', 'workflows', 'latex.yml'), 'utf8');
assert.ok(latexWorkflow.includes('contents: read'), 'Compilação LaTeX deve usar somente leitura do repositório.');
assert.ok(latexWorkflow.includes('student-submissions'), 'Compilação LaTeX deve acompanhar a branch de trabalhos.');
assert.ok(fs.readFileSync(path.join(root, 'scripts', 'compile-latex-projects.sh'), 'utf8').includes('-no-shell-escape'), 'Compilação LaTeX deve desativar shell escape.');

const trackedText = repositoryFiles
  .filter((file) => ['.js', '.jsx', '.mjs', '.json', '.md', '.toml', '.yml', '.yaml', '.sql'].includes(path.extname(file).toLowerCase()))
  .map((file) => fs.readFileSync(path.join(root, file), 'utf8'))
  .join('\n');
assert.ok(!/eyJ[A-Za-z0-9_-]{40,}\.[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{20,}/.test(trackedText), 'JWT potencialmente real encontrado no repositório.');
assert.ok(!/[\w.+-]+@(?:ga\.ita\.br|gp\.ita\.br|gmail\.com|unifesp\.br)/i.test(trackedText), 'E-mail de acesso legível encontrado no repositório.');
assert.ok(!JSON.stringify(access).includes('@'), 'Catálogo público não pode conter endereços de e-mail.');

assert.ok(fs.existsSync(path.join(root, 'AGENTS.md')), 'AGENTS.md é obrigatório.');
['architecture.md', 'authentication.md', 'security.md', 'content-governance.md', 'backend-roadmap.md', 'publishing.md'].forEach((file) => assert.ok(fs.existsSync(path.join(root, 'docs', file)), `Documento técnico ausente: ${file}.`));
const gitignore = fs.readFileSync(path.join(root, '.gitignore'), 'utf8');
assert.ok(gitignore.includes('/.private/'), '.private deve permanecer ignorado.');
assert.ok(!gitignore.split(/\r?\n/).includes('/docs'), 'docs técnicos devem ser versionados.');

console.log(`Validação concluída: ${activities.length} eventos, ${allResources.length} recursos públicos, ${presentations.length} apresentação e ${access.users.length} contas piloto consistentes.`);
