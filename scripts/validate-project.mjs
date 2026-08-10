import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { buildStudentWorkspaces, classifySubmission, sanitizeProfile } from '../lib/studentWorkspace.mjs';

const root = process.cwd();
const readJson = (name) => JSON.parse(fs.readFileSync(path.join(root, 'data', name), 'utf8'));
const students = readJson('students.json');
const activities = readJson('activities.json');
const access = readJson('access.json');

assert.equal(students.length, 8, 'A turma deve conter oito alunos.');
assert.equal(new Set(students.map((student) => student.slug)).size, students.length, 'Slugs devem ser únicos.');
assert.equal(access.length, students.length, 'Cada aluno deve possuir um registro de acesso.');
assert.equal(activities.filter((item) => item.meeting).length, 16, 'O cronograma deve conter 16 encontros.');
assert.equal(activities.filter((item) => item.checkpoint).length, 4, 'O cronograma deve conter quatro checkpoints.');
assert.equal(classifySubmission('E01_glossario.pdf'), 'E01');
assert.equal(classifySubmission('cp4-artigo.docx'), 'CP4');
assert.equal(classifySubmission('anotacoes.txt'), 'OTHER');

const sanitized = sanitizeProfile({
  headline: 'Teste',
  accent: 'invalid',
  featuredFiles: ['E01_teste.pdf', 'missing.pdf'],
  links: [{ label: 'Seguro', url: 'https://example.com' }, { label: 'Inválido', url: 'javascript:alert(1)' }],
}, ['E01_teste.pdf']);
assert.equal(sanitized.accent, 'cyan');
assert.deepEqual(sanitized.featuredFiles, ['E01_teste.pdf']);
assert.equal(sanitized.links.length, 1);

const workspaces = buildStudentWorkspaces(students, root);
assert.equal(workspaces.length, students.length);

const bannedExtensions = new Set(['.pdf', '.xls', '.xlsx', '.doc', '.docx', '.ppt', '.pptx', '.r']);
const ignoredDirectories = new Set(['.git', '.next', 'node_modules', 'out', '.private']);
function findBanned(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (entry.isDirectory() && ignoredDirectories.has(entry.name)) return [];
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return findBanned(fullPath);
    return bannedExtensions.has(path.extname(entry.name).toLowerCase()) ? [path.relative(root, fullPath)] : [];
  });
}

assert.deepEqual(findBanned(root), [], 'Não deve haver materiais antigos no repositório.');
assert.ok(fs.existsSync(path.join(root, 'data', 'access.json')), 'Hashes de acesso não foram gerados.');
assert.ok(!fs.existsSync(path.join(root, 'docs')), 'O build docs não deve ser versionado.');

const credentialsPath = path.join(root, '.private', 'credenciais-alunos.csv');
if (fs.existsSync(credentialsPath)) {
  const rows = fs.readFileSync(credentialsPath, 'utf8').replace(/^\uFEFF/, '').trim().split(/\r?\n/).slice(1);
  assert.equal(rows.length, students.length, 'O CSV privado deve conter uma credencial por aluno.');
  rows.forEach((row) => {
    const [, login, password] = row.slice(1, -1).split('","');
    const record = access.find((item) => item.login === login);
    assert.ok(record, `Login não encontrado nos hashes: ${login}`);
    const candidate = createHash('sha256').update(`${record.salt}:${password}`).digest('hex');
    assert.equal(candidate, record.hash, `Senha e hash divergentes para ${login}`);
    assert.notEqual(createHash('sha256').update(`${record.salt}:senha-incorreta`).digest('hex'), record.hash);
  });
}

console.log('Validação concluída: dados, perfis, entregas e limpeza estão consistentes.');
