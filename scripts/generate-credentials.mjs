import { createHash, randomBytes } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const students = JSON.parse(readFileSync(path.join(root, 'data', 'students.json'), 'utf8'));
const accessPath = path.join(root, 'data', 'access.json');
const privateDirectory = path.join(root, '.private');
const credentialsPath = path.join(privateDirectory, 'credenciais-alunos.csv');
const force = process.argv.includes('--force');

if (!force && (existsSync(accessPath) || existsSync(credentialsPath))) {
  throw new Error('Credenciais já existem. Use --force somente para revogar e regenerar todas.');
}

mkdirSync(privateDirectory, { recursive: true });

const records = students.map((student) => {
  const password = randomBytes(18).toString('base64url');
  const salt = randomBytes(16).toString('hex');
  const hash = createHash('sha256').update(`${salt}:${password}`).digest('hex');
  return { name: student.name, slug: student.slug, login: student.login, password, salt, hash };
});

writeFileSync(
  accessPath,
  `${JSON.stringify(records.map(({ slug, login, salt, hash }) => ({ slug, login, salt, hash })), null, 2)}\n`,
  'utf8',
);

const csv = [
  'nome,login,senha_provisoria',
  ...records.map((record) => `"${record.name.replaceAll('"', '""')}","${record.login}","${record.password}"`),
].join('\n');
writeFileSync(credentialsPath, `\uFEFF${csv}\n`, 'utf8');

console.log(`Credenciais geradas para ${records.length} alunos.`);
console.log(`Arquivo privado: ${credentialsPath}`);
