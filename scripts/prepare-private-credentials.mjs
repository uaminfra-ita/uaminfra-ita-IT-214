import { randomBytes } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const argumentValue = (name, fallback) => {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : fallback;
};
const inputPath = path.resolve(root, argumentValue('--input', path.join('.private', 'contas-piloto', 'usuarios.csv')));
const outputPath = path.resolve(root, argumentValue('--output', path.join('.private', 'contas-piloto', 'credenciais.csv')));
const allowedRoles = new Set(['student', 'instructor', 'admin']);

if (!fs.existsSync(inputPath)) throw new Error(`Arquivo-base ausente: ${path.relative(root, inputPath)}.`);
const lines = fs.readFileSync(inputPath, 'utf8').split(/\r?\n/).filter(Boolean);
if (lines.shift()?.trim() !== 'full_name,email,role') throw new Error('Cabeçalho esperado: full_name,email,role');

const credentials = ['full_name,email,role,temporary_password'];
for (const [index, line] of lines.entries()) {
  const [fullName, rawEmail, role] = line.split(',').map((cell) => cell.trim());
  if (!fullName || !/^\S+@\S+\.\S+$/.test(rawEmail) || !allowedRoles.has(role)) throw new Error(`Registro inválido na linha ${index + 2}.`);
  credentials.push([fullName, rawEmail.toLowerCase(), role, randomBytes(32).toString('base64url')].join(','));
}

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${credentials.join('\n')}\n`, { encoding: 'utf8', mode: 0o600 });
console.log(`Credenciais de ${credentials.length - 1} conta(s) gravadas em ${path.relative(root, outputPath)} e ignoradas pelo Git.`);
