import { createHash, pbkdf2Sync, randomBytes } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const inputPath = path.resolve(root, process.argv[2] || path.join('.private', 'contas-piloto', 'credenciais.csv'));
const outputPath = path.resolve(root, process.argv[3] || path.join('data', 'access.json'));
const iterations = 210_000;
const allowedRoles = new Set(['student', 'instructor', 'admin']);

if (!fs.existsSync(inputPath)) throw new Error(`Arquivo privado ausente: ${path.relative(root, inputPath)}.`);
const lines = fs.readFileSync(inputPath, 'utf8').split(/\r?\n/).filter(Boolean);
if (lines.shift()?.trim() !== 'full_name,email,role,temporary_password') throw new Error('Cabeçalho privado inválido.');

const users = lines.map((line, index) => {
  const [displayName, rawEmail, role, password] = line.split(',').map((cell) => cell.trim());
  if (!displayName || !/^\S+@\S+\.\S+$/.test(rawEmail) || !allowedRoles.has(role) || password.length < 24) throw new Error(`Registro inválido na linha ${index + 2}.`);
  const email = rawEmail.toLowerCase();
  const salt = randomBytes(16);
  return {
    id: createHash('sha256').update(email).digest('hex').slice(0, 16),
    displayName,
    role,
    status: 'active',
    emailHash: createHash('sha256').update(email).digest('base64url'),
    credential: {
      algorithm: 'PBKDF2-SHA256',
      iterations,
      salt: salt.toString('base64url'),
      passwordHash: pbkdf2Sync(password, salt, iterations, 32, 'sha256').toString('base64url'),
    },
  };
});

if (new Set(users.map((user) => user.id)).size !== users.length) throw new Error('Contas duplicadas no lote privado.');
fs.writeFileSync(outputPath, `${JSON.stringify({ version: 1, scope: 'course-access', users }, null, 2)}\n`, 'utf8');
console.log(`Catálogo estático gerado: ${users.length} conta(s), sem e-mails ou senhas legíveis.`);
