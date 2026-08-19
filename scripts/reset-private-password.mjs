import { createHash, randomBytes } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const userIdIndex = process.argv.indexOf('--user-id');
const userId = userIdIndex >= 0 ? process.argv[userIdIndex + 1] : '';
const credentialsPath = path.join(root, '.private', 'contas-piloto', 'credenciais.csv');

if (!/^[a-f0-9]{16}$/.test(userId)) throw new Error('Informe um identificador válido com --user-id <id>.');
if (!fs.existsSync(credentialsPath)) throw new Error('Credenciais privadas do piloto ausentes.');

const original = fs.readFileSync(credentialsPath, 'utf8');
const lines = original.split(/\r?\n/).filter(Boolean);
if (lines.shift()?.trim() !== 'full_name,email,role,temporary_password') throw new Error('Cabeçalho privado inválido.');

let changedName = '';
const nextLines = ['full_name,email,role,temporary_password'];
const temporaryPassword = randomBytes(32).toString('base64url');
for (const line of lines) {
  const [fullName, email, role, password] = line.split(',').map((cell) => cell.trim());
  const candidateId = createHash('sha256').update(email.toLowerCase()).digest('hex').slice(0, 16);
  if (candidateId === userId) changedName = fullName;
  nextLines.push([fullName, email, role, candidateId === userId ? temporaryPassword : password].join(','));
}

if (!changedName) throw new Error(`Conta ${userId} não encontrada no lote privado.`);

function run(script) {
  return spawnSync(process.execPath, [path.join(root, script)], { cwd: root, encoding: 'utf8' });
}

try {
  fs.writeFileSync(credentialsPath, `${nextLines.join('\n')}\n`, { encoding: 'utf8', mode: 0o600 });
  const generated = run('scripts/generate-static-access.mjs');
  if (generated.status !== 0) throw new Error(generated.stderr || generated.stdout || 'Falha ao gerar o catálogo.');
  const tested = run('scripts/test-static-access.mjs');
  if (tested.status !== 0) throw new Error(tested.stderr || tested.stdout || 'Falha ao validar o catálogo.');
} catch (error) {
  fs.writeFileSync(credentialsPath, original, { encoding: 'utf8', mode: 0o600 });
  run('scripts/generate-static-access.mjs');
  throw error;
}

console.log(`Senha temporária redefinida para ${changedName} (${userId}).`);
console.log(`Nova senha: ${temporaryPassword}`);
console.log('Entregue-a somente por canal privado e nunca a publique no Git, no Drive ou em mensagem pública.');
