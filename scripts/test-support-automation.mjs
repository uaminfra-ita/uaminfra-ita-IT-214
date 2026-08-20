import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const root = process.cwd();
const source = fs.readFileSync(path.join(root, 'integrations', 'google-apps-script', 'Code.gs'), 'utf8');
const sentMessages = [];
const cacheValues = new Map();

const context = vm.createContext({
  console: { error() {} },
  ContentService: {
    MimeType: { JSON: 'JSON' },
    createTextOutput(text) {
      return { text, setMimeType(mimeType) { this.mimeType = mimeType; return this; } };
    },
  },
  HtmlService: {
    XFrameOptionsMode: { ALLOWALL: 'ALLOWALL' },
    createHtmlOutput(html) {
      return { html, setXFrameOptionsMode(mode) { this.mode = mode; return this; } };
    },
  },
  LockService: {
    getScriptLock() { return { waitLock() {}, releaseLock() {} }; },
  },
  CacheService: {
    getScriptCache() {
      return {
        get(key) { return cacheValues.get(key) || null; },
        put(key, value) { cacheValues.set(key, value); },
      };
    },
  },
  MailApp: {
    getRemainingDailyQuota() { return 100; },
    sendEmail(message) { sentMessages.push(message); },
  },
});

vm.runInContext(source, context, { filename: 'Code.gs' });

const health = context.doGet();
assert.equal(health.mimeType, 'JSON');
assert.deepEqual(JSON.parse(health.text), { ok: true, service: 'IT-214 student support' });

const baseRequest = {
  requestId: '11111111-1111-4111-8111-111111111111',
  parentOrigin: 'https://uaminfra-ita.github.io',
  website: '',
  studentName: 'Aluno de Teste',
};

const questionResponse = context.doPost({ parameter: {
  ...baseRequest,
  requestType: 'question',
  studentId: 'aaaaaaaaaaaaaaaa',
  activityCode: 'E03',
  activityTitle: 'Atividade de teste',
  message: 'Como devo organizar a entrega?',
} });
assert.match(questionResponse.html, /"ok":true/);
assert.match(questionResponse.html, /window\.top\.postMessage/);
assert.equal(sentMessages.length, 1);
assert.equal(sentMessages[0].to, 'uam.infra@gmail.com');
assert.match(sentMessages[0].subject, /Dúvida E03/);
assert.match(sentMessages[0].body, /Como devo organizar a entrega\?/);

const valueThatMustNotBeForwarded = 'VALUE_THAT_MUST_NOT_BE_FORWARDED';
context.doPost({ parameter: {
  ...baseRequest,
  requestId: '22222222-2222-4222-8222-222222222222',
  requestType: 'password-reset',
  studentId: 'bbbbbbbbbbbbbbbb',
  message: valueThatMustNotBeForwarded,
} });
assert.equal(sentMessages.length, 2);
assert.doesNotMatch(sentMessages[1].body, new RegExp(valueThatMustNotBeForwarded));
assert.match(sentMessages[1].body, /Confirme a identidade/);

const invalidResponse = context.doPost({ parameter: {
  ...baseRequest,
  requestId: '33333333-3333-4333-8333-333333333333',
  requestType: 'question',
  studentId: 'identificador-invalido',
  message: 'Teste',
} });
assert.match(invalidResponse.html, /"ok":false/);
assert.equal(sentMessages.length, 2);

const honeypotResponse = context.doPost({ parameter: {
  ...baseRequest,
  requestId: '44444444-4444-4444-8444-444444444444',
  requestType: 'question',
  studentId: 'dddddddddddddddd',
  website: 'robô',
  message: 'Teste',
} });
assert.match(honeypotResponse.html, /"ok":true/);
assert.equal(sentMessages.length, 2);

for (let index = 0; index < 5; index += 1) {
  context.doPost({ parameter: {
    ...baseRequest,
    requestId: `55555555-5555-4555-8555-55555555555${index}`,
    requestType: 'question',
    studentId: 'eeeeeeeeeeeeeeee',
    message: 'Teste de limite',
  } });
}
assert.equal(sentMessages.filter((message) => message.body.includes('Teste de limite')).length, 4);

console.log('Automação de atendimento validada: dúvida, senha, campo-armadilha e limite de envio estão consistentes.');
