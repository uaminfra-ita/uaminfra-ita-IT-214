import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const outputDirectory = path.join(root, 'out');
const resources = JSON.parse(fs.readFileSync(path.join(root, 'data', 'resources.json'), 'utf8'));
const allResources = Object.values(resources).flatMap((group) => group);

assert.ok(fs.existsSync(outputDirectory), 'Diretório out ausente; execute o build antes da auditoria.');

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return walk(fullPath);
    return [path.relative(outputDirectory, fullPath)];
  });
}

const outputFiles = walk(outputDirectory);
const forbiddenName = 'sigma_c_piii.pdf';
assert.equal(
  outputFiles.some((file) => path.basename(file).toLowerCase() === forbiddenName),
  false,
  'O artefato público contém o documento privado SIGMA_c_PIII.pdf.',
);

const cataloguedExtensions = new Set(['.pdf', '.zip', '.docx', '.xlsm']);
const actualResourcePaths = outputFiles
  .filter((file) => cataloguedExtensions.has(path.extname(file).toLowerCase()))
  .sort();
const declaredResourcePaths = allResources
  .filter((resource) => cataloguedExtensions.has(path.extname(resource.assetPath).toLowerCase()))
  .map((resource) => resource.assetPath.slice(1).replaceAll('/', path.sep))
  .sort();

assert.deepEqual(actualResourcePaths, declaredResourcePaths, 'Os documentos exportados devem corresponder exatamente ao catálogo público.');

const searchableExtensions = new Set(['.html', '.js', '.json', '.txt', '.xml']);
const leakedReference = outputFiles
  .filter((file) => searchableExtensions.has(path.extname(file).toLowerCase()))
  .find((file) => fs.readFileSync(path.join(outputDirectory, file), 'utf8').toLowerCase().includes('sigma_c_piii'));
assert.equal(leakedReference, undefined, `Referência ao SIGMA encontrada no artefato público: ${leakedReference}`);

console.log(`Auditoria pública concluída: ${outputFiles.length} arquivos e ${actualResourcePaths.length} documentos declarados.`);
