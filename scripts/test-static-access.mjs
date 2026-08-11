import { createHash, pbkdf2Sync } from 'node:crypto';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const credentialsPath = path.join(root, '.private', 'contas-piloto', 'credenciais.csv');
const accessPath = path.join(root, 'data', 'access.json');
if (!fs.existsSync(credentialsPath)) throw new Error('Credenciais privadas do piloto ausentes.');

const privateRows = fs.readFileSync(credentialsPath, 'utf8').trim().split(/\r?\n/).slice(1).map((line) => {
  const [displayName, email, role, password] = line.split(',').map((cell) => cell.trim());
  return { displayName, email: email.toLowerCase(), role, password };
});
const access = JSON.parse(fs.readFileSync(accessPath, 'utf8'));

assert.equal(access.scope, 'visual-access-only');
assert.equal(access.users.length, 2);
for (const row of privateRows) {
  const emailHash = createHash('sha256').update(row.email).digest('base64url');
  const user = access.users.find((candidate) => candidate.emailHash === emailHash);
  assert.ok(user, `Conta ausente para ${row.displayName}.`);
  assert.equal(user.displayName, row.displayName);
  assert.equal(user.role, row.role);
  const derived = pbkdf2Sync(row.password, Buffer.from(user.credential.salt, 'base64url'), user.credential.iterations, 32, 'sha256').toString('base64url');
  assert.equal(derived, user.credential.passwordHash, `Senha correta rejeitada para ${row.displayName}.`);
  const invalid = pbkdf2Sync(`${row.password}-incorreta`, Buffer.from(user.credential.salt, 'base64url'), user.credential.iterations, 32, 'sha256').toString('base64url');
  assert.notEqual(invalid, user.credential.passwordHash, `Senha incorreta aceita para ${row.displayName}.`);
}

assert.equal(access.users.find((user) => user.displayName.startsWith('Rodrigo'))?.role, 'instructor');
assert.equal(access.users.find((user) => user.displayName.startsWith('Gabriel'))?.role, 'student');
console.log('Login estático validado: senhas corretas/incorretas e papéis do piloto estão consistentes.');
