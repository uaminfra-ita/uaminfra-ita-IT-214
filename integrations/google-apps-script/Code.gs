const CONFIG = Object.freeze({
  courseEmail: 'uam.infra@gmail.com',
  courseCode: 'IT-214',
  allowedParentOrigins: [
    'https://uaminfra-ita.github.io',
    'http://localhost:3000',
  ],
  maximumQuestionLength: 1200,
  maximumRequestsPerStudentPerHour: 4,
  maximumRequestsPerHour: 40,
});

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, service: 'IT-214 student support' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(event) {
  const parameters = event && event.parameter ? event.parameter : {};
  const requestId = cleanSingleLine_(parameters.requestId, 100);
  const parentOrigin = allowedParentOrigin_(parameters.parentOrigin);

  try {
    if (cleanSingleLine_(parameters.website, 200)) return response_({ ok: true, requestId }, parentOrigin);

    const request = validateRequest_(parameters);
    enforceRateLimit_(request.studentId);
    sendRequestEmail_(request);
    return response_({ ok: true, requestId: request.requestId }, parentOrigin);
  } catch (error) {
    console.error(error && error.stack ? error.stack : error);
    return response_({
      ok: false,
      requestId,
      message: publicErrorMessage_(error),
    }, parentOrigin);
  }
}

function validateRequest_(parameters) {
  const requestType = cleanSingleLine_(parameters.requestType, 30);
  const requestId = cleanSingleLine_(parameters.requestId, 100);
  const studentId = cleanSingleLine_(parameters.studentId, 80);
  const studentName = cleanSingleLine_(parameters.studentName, 100);
  const activityCode = cleanSingleLine_(parameters.activityCode || 'Geral', 20);
  const activityTitle = cleanSingleLine_(parameters.activityTitle || 'Dúvida geral', 160);
  const message = cleanMultiline_(parameters.message, CONFIG.maximumQuestionLength);

  if (requestType !== 'question' && requestType !== 'password-reset') throw new Error('INVALID_REQUEST');
  if (!requestId || !/^[A-Za-z0-9-]{10,100}$/.test(requestId)) throw new Error('INVALID_REQUEST');
  if (!/^[a-f0-9]{16}$/.test(studentId)) throw new Error('INVALID_REQUEST');
  if (!studentName || studentName.length < 3) throw new Error('INVALID_REQUEST');
  if (requestType === 'question' && !message) throw new Error('EMPTY_QUESTION');

  return { requestType, requestId, studentId, studentName, activityCode, activityTitle, message };
}

function enforceRateLimit_(studentId) {
  const lock = LockService.getScriptLock();
  lock.waitLock(5000);
  try {
    const cache = CacheService.getScriptCache();
    incrementLimit_(cache, 'global-hour', CONFIG.maximumRequestsPerHour);
    incrementLimit_(cache, `student-${studentId}`, CONFIG.maximumRequestsPerStudentPerHour);
  } finally {
    lock.releaseLock();
  }
}

function incrementLimit_(cache, key, maximum) {
  const current = Number(cache.get(key) || 0);
  if (current >= maximum) throw new Error('RATE_LIMIT');
  cache.put(key, String(current + 1), 3600);
}

function sendRequestEmail_(request) {
  if (MailApp.getRemainingDailyQuota() < 1) throw new Error('DAILY_QUOTA');

  const isQuestion = request.requestType === 'question';
  const subject = isQuestion
    ? `${CONFIG.courseCode} — Dúvida ${request.activityCode} — ${request.studentName}`
    : `${CONFIG.courseCode} — Solicitação de nova senha — ${request.studentName}`;
  const lines = isQuestion
    ? [
      `DÚVIDA — ${request.activityCode}`,
      `Atividade: ${request.activityTitle}`,
      `Aluno: ${request.studentName}`,
      `Identificador da conta: ${request.studentId}`,
      `Protocolo: ${request.requestId}`,
      '',
      request.message,
    ]
    : [
      'SOLICITAÇÃO DE NOVA SENHA',
      `Aluno: ${request.studentName}`,
      `Identificador da conta: ${request.studentId}`,
      `Protocolo: ${request.requestId}`,
      '',
      'O aluno solicitou a redefinição da senha temporária pelo portal.',
      'Confirme a identidade e entregue a nova senha por um canal privado.',
    ];

  MailApp.sendEmail({
    to: CONFIG.courseEmail,
    subject,
    body: lines.join('\n'),
    name: 'Portal IT-214',
  });
}

function response_(result, parentOrigin) {
  const serializedResult = JSON.stringify({ channel: 'it214-support-response', ...result }).replace(/</g, '\\u003c');
  const serializedOrigin = JSON.stringify(parentOrigin);
  const html = `<!doctype html><html><head><meta charset="utf-8"></head><body><script>window.top.postMessage(${serializedResult}, ${serializedOrigin});</script></body></html>`;
  return HtmlService.createHtmlOutput(html).setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function allowedParentOrigin_(value) {
  const origin = cleanSingleLine_(value, 120);
  return CONFIG.allowedParentOrigins.includes(origin) ? origin : CONFIG.allowedParentOrigins[0];
}

function cleanSingleLine_(value, maximumLength) {
  return String(value || '').replace(/[\r\n\t\u0000-\u001f\u007f]+/g, ' ').trim().slice(0, maximumLength);
}

function cleanMultiline_(value, maximumLength) {
  return String(value || '').replace(/\r/g, '').replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, '').trim().slice(0, maximumLength);
}

function publicErrorMessage_(error) {
  const code = error && error.message;
  if (code === 'RATE_LIMIT') return 'Muitas solicitações foram enviadas recentemente. Aguarde uma hora antes de tentar novamente.';
  if (code === 'DAILY_QUOTA') return 'O limite diário de mensagens foi atingido. Procure a equipe por outro canal.';
  if (code === 'EMPTY_QUESTION') return 'Escreva sua dúvida antes de enviar.';
  return 'A solicitação não pôde ser enviada. Confira os campos e tente novamente.';
}
