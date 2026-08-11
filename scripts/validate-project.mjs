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
const course = readJson('course.json');
const allResources = [...resources.generalArticles, ...resources.technicalDocuments, ...resources.disciplineDocuments];
const resourceIds = new Set(allResources.map((resource) => resource.id));
const activityIds = new Set(activities.map((activity) => activity.code));
const presentationSlugs = new Set(presentations.map((presentation) => presentation.slug));

assert.equal(activities.filter((item) => item.meeting).length, 16, 'O cronograma deve conter 16 encontros.');
assert.equal(activities.filter((item) => item.checkpoint).length, 4, 'O cronograma deve conter quatro checkpoints.');
assert.equal(activityIds.size, activities.length, 'Códigos de atividade devem ser únicos.');
assert.equal(resourceIds.size, allResources.length, 'IDs de recursos devem ser únicos.');
assert.equal(presentationSlugs.size, presentations.length, 'Slugs de apresentação devem ser únicos.');

const allowedStatuses = new Set(['scheduled', 'completed', 'cancelled', 'break']);
activities.forEach((activity) => {
  assert.match(activity.date, /^\d{4}-\d{2}-\d{2}$/, `Data inválida em ${activity.code}.`);
  assert.ok(allowedStatuses.has(activity.status), `Status inválido em ${activity.code}.`);
  assert.ok(Array.isArray(activity.resourceIds), `resourceIds ausente em ${activity.code}.`);
  activity.resourceIds.forEach((id) => assert.ok(resourceIds.has(id), `Recurso ${id} não existe para ${activity.code}.`));
  if (activity.presentationSlug) assert.ok(presentationSlugs.has(activity.presentationSlug), `Apresentação inexistente em ${activity.code}.`);
  if (activity.type === 'break') assert.equal(activity.status, 'break', `Recesso ${activity.code} precisa usar status break.`);
});

const requiredResourceFields = ['id', 'category', 'title', 'authors', 'year', 'publication', 'doi', 'publisherUrl', 'assetPath', 'audience', 'license', 'summary', 'tags', 'relatedActivityIds', 'sha256'];
const declaredPdfPaths = [];
const hashes = new Set();
allResources.forEach((resource) => {
  requiredResourceFields.forEach((field) => assert.ok(resource[field] !== undefined && resource[field] !== '', `${resource.id || 'Recurso'} sem ${field}.`));
  assert.equal(resource.audience, 'public', `${resource.id} possui asset público sem audience public.`);
  assert.ok(Array.isArray(resource.authors) && resource.authors.length > 0, `${resource.id} sem autoria.`);
  assert.ok(Array.isArray(resource.tags) && resource.tags.length > 0, `${resource.id} sem tags.`);
  assert.ok(Array.isArray(resource.relatedActivityIds) && resource.relatedActivityIds.length > 0, `${resource.id} sem relação acadêmica.`);
  resource.relatedActivityIds.forEach((id) => assert.ok(activityIds.has(id), `Atividade ${id} não existe para ${resource.id}.`));
  assert.ok(resource.publisherUrl.startsWith('https://'), `${resource.id} deve usar fonte HTTPS.`);
  assert.ok(resource.publisherUrl.includes(resource.doi), `${resource.id} possui DOI divergente da fonte.`);
  assert.ok(resource.assetPath.startsWith('/resources/articles/') && resource.assetPath.endsWith('.pdf'), `${resource.id} possui assetPath inválido.`);
  assert.match(resource.sha256, /^[A-F0-9]{64}$/, `${resource.id} possui SHA-256 inválido.`);
  assert.ok(!hashes.has(resource.sha256), `${resource.id} duplica um arquivo já declarado.`);
  hashes.add(resource.sha256);
  const relativePath = resource.assetPath.slice(1).replaceAll('/', path.sep);
  const fullPath = path.join(root, 'public', relativePath);
  assert.ok(fs.existsSync(fullPath), `PDF ausente: ${resource.assetPath}.`);
  const actualHash = createHash('sha256').update(fs.readFileSync(fullPath)).digest('hex').toUpperCase();
  assert.equal(actualHash, resource.sha256, `Checksum divergente: ${resource.assetPath}.`);
  declaredPdfPaths.push(path.relative(root, fullPath));
});

presentations.forEach((presentation) => {
  assert.ok(activityIds.has(presentation.activityId), `Atividade inexistente em ${presentation.slug}.`);
  assert.equal(presentation.durationMinutes, 90, `${presentation.slug} deve durar 90 minutos.`);
  assert.equal(presentation.slideCount, 18, `${presentation.slug} deve declarar 18 slides.`);
  assert.ok(Array.isArray(presentation.objectives) && presentation.objectives.length === 4, `${presentation.slug} precisa de quatro objetivos.`);
  presentation.resourceIds.forEach((id) => assert.ok(resourceIds.has(id), `Fonte ${id} não existe em ${presentation.slug}.`));
  assert.ok(Array.isArray(presentation.references) && presentation.references.length === 8, `${presentation.slug} precisa declarar oito referências.`);
  assert.equal(new Set(presentation.references.map((reference) => reference.url)).size, presentation.references.length, `Referências duplicadas em ${presentation.slug}.`);
  presentation.references.forEach((reference) => {
    ['shortTitle', 'citation', 'url', 'purpose'].forEach((field) => assert.ok(reference[field], `Referência de ${presentation.slug} sem ${field}.`));
    assert.ok(reference.url.startsWith('https://'), `Referência insegura em ${presentation.slug}.`);
  });
  const routeFile = path.join(root, 'app', 'apresentacoes', presentation.slug, 'page.jsx');
  assert.ok(fs.existsSync(routeFile), `Rota ausente para ${presentation.slug}.`);
  const slideCount = (fs.readFileSync(routeFile, 'utf8').match(/<Slide(?:\s|>)/g) || []).length;
  assert.equal(slideCount, presentation.slideCount, `Quantidade real de slides divergente em ${presentation.slug}.`);
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
const actualPdfPaths = repositoryFiles.filter((file) => path.extname(file).toLowerCase() === '.pdf').sort();
assert.deepEqual(actualPdfPaths, declaredPdfPaths.sort(), 'Todo PDF no repositório deve estar declarado no catálogo.');
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
const activitiesPage = fs.readFileSync(path.join(root, 'app', 'atividades', 'page.jsx'), 'utf8');
assert.ok(!activitiesPage.includes('16 encontros'), 'O quadro quantitativo de encontros deve permanecer removido.');

const authFiles = ['data/access.json', 'components/AuthenticatedArea.jsx', 'scripts/prepare-private-credentials.mjs', 'scripts/generate-static-access.mjs', 'scripts/test-static-access.mjs'];
authFiles.forEach((file) => assert.ok(fs.existsSync(path.join(root, file)), `Artefato de acesso ausente: ${file}.`));
const access = readJson('access.json');
assert.equal(access.scope, 'visual-access-only', 'O catálogo deve declarar que o acesso é apenas visual.');
assert.equal(access.users.length, 2, 'O piloto deve conter duas contas.');
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
assert.equal(access.users.find((user) => user.displayName.startsWith('Rodrigo'))?.role, 'instructor', 'Rodrigo deve ser instrutor no piloto.');
assert.equal(access.users.find((user) => user.displayName.startsWith('Gabriel'))?.role, 'student', 'Gabriel deve ser aluno no piloto.');
const authComponent = fs.readFileSync(path.join(root, 'components', 'AuthenticatedArea.jsx'), 'utf8');
assert.ok(authComponent.includes("name: 'PBKDF2'"), 'O login deve derivar a senha com PBKDF2.');
assert.ok(authComponent.includes('sessionStorage'), 'A sessão visual deve usar sessionStorage.');

const workflow = fs.readFileSync(path.join(root, '.github', 'workflows', 'deploy.yml'), 'utf8');
assert.ok(workflow.includes("node-version: '22'"), 'Deploy deve usar Node 22.');
assert.ok(!workflow.toLowerCase().includes('supabase'), 'Deploy estático não deve depender de Supabase.');
const packageJson = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
assert.ok(!Object.keys(packageJson.dependencies).some((dependency) => dependency.includes('supabase')), 'Dependências Supabase devem permanecer removidas.');

const trackedText = repositoryFiles
  .filter((file) => ['.js', '.jsx', '.mjs', '.json', '.md', '.toml', '.yml', '.yaml', '.sql'].includes(path.extname(file).toLowerCase()))
  .map((file) => fs.readFileSync(path.join(root, file), 'utf8'))
  .join('\n');
assert.ok(!/eyJ[A-Za-z0-9_-]{40,}\.[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{20,}/.test(trackedText), 'JWT potencialmente real encontrado no repositório.');
const pilotEmails = [
  ['rodrigo.furlan', '102121@ga.ita.br'].join('.'),
  ['gabriel.vieira', '102313@ga.ita.br'].join('.'),
];
pilotEmails.forEach((email) => assert.ok(!trackedText.includes(email), 'E-mail de login encontrado no repositório.'));
assert.ok(!JSON.stringify(access).includes('@'), 'Catálogo público não pode conter endereços de e-mail.');

assert.ok(fs.existsSync(path.join(root, 'AGENTS.md')), 'AGENTS.md é obrigatório.');
['architecture.md', 'authentication.md', 'security.md', 'content-governance.md', 'backend-roadmap.md', 'publishing.md'].forEach((file) => assert.ok(fs.existsSync(path.join(root, 'docs', file)), `Documento técnico ausente: ${file}.`));
const gitignore = fs.readFileSync(path.join(root, '.gitignore'), 'utf8');
assert.ok(gitignore.includes('/.private/'), '.private deve permanecer ignorado.');
assert.ok(!gitignore.split(/\r?\n/).includes('/docs'), 'docs técnicos devem ser versionados.');

console.log(`Validação concluída: ${activities.length} eventos, ${allResources.length} recursos públicos, ${presentations.length} apresentação e ${access.users.length} contas piloto consistentes.`);
