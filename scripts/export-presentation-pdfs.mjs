// Gera um PDF por apresentação a partir do build estático em out/.
// Uso: npm run build && npm run export:pdf  (com GITHUB_PAGES=true quando o build usar o base path).
// Requer o Google Chrome ou o Chromium; o caminho pode ser informado em CHROME_PATH.
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import http from 'node:http';
import os from 'node:os';
import path from 'node:path';

const root = process.cwd();
const outputDirectory = path.join(root, 'out');
const basePath = process.env.GITHUB_PAGES === 'true' ? '/uaminfra-ita-IT-214' : '';
assert.ok(fs.existsSync(outputDirectory), 'Diretório out ausente; execute o build antes de exportar os PDFs.');

// Exporta exatamente as apresentações que o build publicou: uma pasta com index.html em out/apresentacoes.
const decksDirectory = path.join(outputDirectory, 'apresentacoes');
const presentations = fs.readdirSync(decksDirectory, { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && fs.existsSync(path.join(decksDirectory, entry.name, 'index.html')))
  .map((entry) => ({ slug: entry.name }))
  .sort((first, second) => first.slug.localeCompare(second.slug));
const only = process.argv.slice(2);
const selected = only.length ? presentations.filter((presentation) => only.includes(presentation.slug)) : presentations;
assert.ok(selected.length > 0, 'Nenhuma apresentação selecionada para exportação.');

const slideWidth = 1600;
const slideHeight = 900;
const sleep = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));
const mimeTypes = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.txt': 'text/plain; charset=utf-8',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.ico': 'image/x-icon',
  '.woff': 'font/woff', '.woff2': 'font/woff2', '.pdf': 'application/pdf',
};

function findChrome() {
  const candidates = [
    process.env.CHROME_PATH,
    '/usr/bin/google-chrome', '/usr/bin/google-chrome-stable', '/usr/bin/chromium', '/usr/bin/chromium-browser', '/snap/bin/chromium',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  ].filter(Boolean);
  const found = candidates.find((candidate) => fs.existsSync(candidate));
  assert.ok(found, 'Chrome ou Chromium não encontrado. Informe o executável em CHROME_PATH.');
  return found;
}

// Serve out/ sob o mesmo base path usado no build, para que os caminhos absolutos funcionem.
function startServer() {
  const server = http.createServer((request, response) => {
    let pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    if (basePath) {
      if (!pathname.startsWith(basePath)) { response.writeHead(404).end(); return; }
      pathname = pathname.slice(basePath.length) || '/';
    }
    let filePath = path.join(outputDirectory, pathname);
    if (!filePath.startsWith(outputDirectory)) { response.writeHead(403).end(); return; }
    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) filePath = path.join(filePath, 'index.html');
    if (!fs.existsSync(filePath)) { response.writeHead(404).end(); return; }
    response.writeHead(200, { 'Content-Type': mimeTypes[path.extname(filePath).toLowerCase()] || 'application/octet-stream' });
    fs.createReadStream(filePath).pipe(response);
  });
  return new Promise((resolve) => server.listen(0, '127.0.0.1', () => resolve(server)));
}

async function connect(port) {
  let target;
  for (let attempt = 0; attempt < 100 && !target; attempt += 1) {
    try { target = (await (await fetch(`http://127.0.0.1:${port}/json`)).json()).find((item) => item.type === 'page'); } catch { await sleep(200); }
  }
  assert.ok(target, 'Não foi possível conectar ao Chrome.');
  const socket = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => { socket.addEventListener('open', resolve); socket.addEventListener('error', reject); });
  let nextId = 0;
  const pending = new Map();
  socket.addEventListener('message', (event) => {
    const message = JSON.parse(event.data);
    if (message.id && pending.has(message.id)) { pending.get(message.id)(message); pending.delete(message.id); }
  });
  const send = (method, params = {}) => new Promise((resolve) => { nextId += 1; pending.set(nextId, resolve); socket.send(JSON.stringify({ id: nextId, method, params })); });
  const evaluate = async (expression) => (await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true })).result?.result?.value;
  return { socket, send, evaluate };
}

function countPdfPages(buffer) {
  return (buffer.toString('latin1').match(/\/Type\s*\/Page(?![a-zA-Z])/g) || []).length;
}

async function exportPresentation({ send, evaluate }, origin, presentation) {
  await send('Page.navigate', { url: `${origin}${basePath}/apresentacoes/${presentation.slug}/?print-pdf` });
  let pages = 0;
  for (let attempt = 0; attempt < 150 && pages === 0; attempt += 1) {
    await sleep(200);
    pages = (await evaluate("document.readyState === 'complete' ? document.querySelectorAll('.pdf-page').length : 0")) || 0;
  }
  assert.ok(pages > 0, `${presentation.slug}: o modo de impressão não foi iniciado.`);
  // Imagens adiadas não carregam sozinhas fora da tela; força o carregamento e espera a decodificação.
  const pendingImages = await evaluate(`(async () => {
    const images = [...document.images];
    images.forEach((image) => { image.loading = 'eager'; image.decoding = 'sync'; });
    await Promise.all(images.map((image) => image.complete && image.naturalWidth > 0 ? null : new Promise((resolve) => { image.addEventListener('load', resolve, { once: true }); image.addEventListener('error', resolve, { once: true }); setTimeout(resolve, 15000); })));
    await Promise.all(images.map((image) => image.decode ? image.decode().catch(() => null) : null));
    if (document.fonts?.ready) await document.fonts.ready;
    return images.filter((image) => !(image.complete && image.naturalWidth > 0)).length;
  })()`);
  assert.equal(pendingImages, 0, `${presentation.slug}: ${pendingImages} imagem(ns) não carregaram.`);
  await sleep(1500);
  // O papel precisa ter a largura do slide: é ela que o Chrome usa para decidir o layout (desktop ou celular) na impressão.
  const result = await send('Page.printToPDF', {
    printBackground: true, preferCSSPageSize: true, paperWidth: slideWidth / 96, paperHeight: slideHeight / 96,
    marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0,
  });
  assert.ok(result.result?.data, `${presentation.slug}: o Chrome não devolveu o PDF.`);
  const buffer = Buffer.from(result.result.data, 'base64');
  const pdfPages = countPdfPages(buffer);
  assert.equal(pdfPages, pages, `${presentation.slug}: o PDF tem ${pdfPages} páginas para ${pages} slides; algum slide está transbordando na impressão.`);
  const destination = path.join(outputDirectory, 'apresentacoes', presentation.slug, `${presentation.slug}.pdf`);
  fs.writeFileSync(destination, buffer);
  console.log(`${presentation.slug}: ${pdfPages} páginas, ${(buffer.length / 1024 / 1024).toFixed(1)} MB`);
}

const server = await startServer();
const origin = `http://127.0.0.1:${server.address().port}`;
const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'it214-pdf-'));
const debugPort = 9300 + Math.floor(Math.random() * 400);
const chrome = spawn(findChrome(), [
  '--headless=new', '--disable-gpu', '--no-first-run', '--hide-scrollbars', `--user-data-dir=${profile}`, `--remote-debugging-port=${debugPort}`,
  `--window-size=${slideWidth},${slideHeight}`, ...(process.env.CI ? ['--no-sandbox'] : []), 'about:blank',
], { stdio: 'ignore' });

let failure;
try {
  const browser = await connect(debugPort);
  await browser.send('Page.enable');
  await browser.send('Emulation.setDeviceMetricsOverride', { width: slideWidth, height: slideHeight, deviceScaleFactor: 1, mobile: false });
  for (const presentation of selected) {
    let lastError;
    for (let attempt = 1; attempt <= 3; attempt += 1) {
      try { await exportPresentation(browser, origin, presentation); lastError = undefined; break; } catch (error) { lastError = error; await sleep(1000); }
    }
    if (lastError) throw lastError;
  }
  browser.socket.close();
} catch (error) {
  failure = error;
} finally {
  chrome.kill();
  server.close();
  await sleep(400);
  fs.rmSync(profile, { recursive: true, force: true });
}

if (failure) { console.error(failure.message); process.exit(1); }
console.log(`PDFs exportados: ${selected.length} apresentações.`);
