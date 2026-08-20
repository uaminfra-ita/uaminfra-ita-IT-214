import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const argumentValue = (name, fallback) => {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : fallback;
};
const sourcePath = path.resolve(root, argumentValue('--source', path.join('data', 'access.json')));
const driveSourcePath = path.resolve(root, argumentValue('--drive-source', path.join('data', 'drive-submissions.json')));
const outputDirectory = path.resolve(root, argumentValue('--output-dir', path.join('.private', 'submissions')));

if (!fs.existsSync(sourcePath)) throw new Error(`Catálogo de acesso ausente: ${path.relative(root, sourcePath)}.`);
if (!fs.existsSync(driveSourcePath)) throw new Error(`Configuração do Drive ausente: ${path.relative(root, driveSourcePath)}.`);
const access = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
const driveWorkspaces = JSON.parse(fs.readFileSync(driveSourcePath, 'utf8'));
const students = access.users
  .filter((user) => user.role === 'student' && user.status === 'active')
  .sort((a, b) => a.displayName.localeCompare(b.displayName, 'pt-BR'));

function driveFolderUrl(folderId) {
  return `https://drive.google.com/drive/folders/${folderId}`;
}

function csvCell(value) {
  return `"${String(value).replaceAll('"', '""')}"`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

const rows = students.map((student) => {
  const destination = driveWorkspaces.destinations[student.id];
  if (!destination) throw new Error(`Destino do Drive ausente para ${student.displayName}.`);
  return {
    name: student.displayName,
    id: student.id,
    deliveriesUrl: driveFolderUrl(destination.activitiesFolderId),
    projectUrl: driveFolderUrl(destination.latexFolderId),
  };
});
const csv = [
  ['nome', 'identificador_tecnico', 'atividades_drive', 'projeto_latex_drive'].map(csvCell).join(','),
  ...rows.map((row) => [row.name, row.id, row.deliveriesUrl, row.projectUrl].map(csvCell).join(',')),
].join('\n');
const generatedAt = new Intl.DateTimeFormat('pt-BR', {
  dateStyle: 'short',
  timeStyle: 'medium',
  timeZone: 'America/Sao_Paulo',
}).format(new Date());
const tableRows = rows.map((row) => `<tr><td>${escapeHtml(row.name)}</td><td><code>${escapeHtml(row.id)}</code></td><td><a href="${row.deliveriesUrl}">Abrir atividades</a></td><td><a href="${row.projectUrl}">Abrir projeto</a></td></tr>`).join('\n');
const html = `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="audience" content="instructors">
  <title>Índice privado de submissões · IT-214</title>
  <style>
    body { color: #0f172a; font: 16px/1.5 system-ui, sans-serif; margin: 0 auto; max-width: 1100px; padding: 32px; }
    h1 { margin-bottom: 8px; } p { color: #475569; }
    table { border-collapse: collapse; margin-top: 28px; width: 100%; }
    th, td { border-bottom: 1px solid #e2e8f0; padding: 14px; text-align: left; }
    th { color: #64748b; font-size: 12px; letter-spacing: .08em; text-transform: uppercase; }
    a { color: #0e7490; font-weight: 700; } code { background: #f1f5f9; border-radius: 6px; padding: 4px 7px; }
  </style>
</head>
<body>
  <main>
    <h1>Índice privado de submissões</h1>
    <p><strong>Público:</strong> instructors · <strong>Gerado:</strong> ${escapeHtml(generatedAt)}</p>
    <p>Mapa local entre nomes e IDs técnicos. Este arquivo deve permanecer em <code>.private/</code> e nunca ser publicado.</p>
    <table>
      <thead><tr><th>Aluno</th><th>ID técnico</th><th>Atividades</th><th>LaTeX</th></tr></thead>
      <tbody>${tableRows}</tbody>
    </table>
  </main>
</body>
</html>`;

fs.mkdirSync(outputDirectory, { recursive: true });
fs.writeFileSync(path.join(outputDirectory, 'submission-index.csv'), `${csv}\n`, { encoding: 'utf8', mode: 0o600 });
fs.writeFileSync(path.join(outputDirectory, 'submission-index.html'), html, { encoding: 'utf8', mode: 0o600 });
console.log(`Índice privado de ${rows.length} aluno(s) criado em ${path.relative(root, outputDirectory)}.`);
