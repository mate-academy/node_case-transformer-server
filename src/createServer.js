// src/createServer.js
const http = require('http');
const { convertToCase } = require('./convertToCase');

const SUPPORTED_CASES = new Set(['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER']);

function buildErrorPayload(messages) {
  return JSON.stringify({
    errors: messages.map((m) => ({ message: m })),
  });
}

function createServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const [rawPath = '', rawQuery = ''] = (req.url || '').split('?');

    const rawText = rawPath.startsWith('/') ? rawPath.slice(1) : rawPath;
    const text = rawText ? decodeURIComponent(rawText) : '';

    const params = new URLSearchParams(rawQuery);
    const toCase = params.get('toCase');

    const errors = [];

    if (!text) {
      errors.push(
        'Text to convert is required. Correct request is: ' +
          '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      );
    }

    if (!toCase) {
      errors.push(
        '"toCase" query param is required. Correct request is: ' +
          '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      );
    } else if (!SUPPORTED_CASES.has(toCase)) {
      errors.push(
        'This case is not supported. Available cases: ' +
          'SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      );
    }

    if (errors.length > 0) {
      res.statusCode = 400;
      res.statusMessage = 'Bad Request';
      res.end(buildErrorPayload(errors));

      return;
    }

    try {
      const result = convertToCase(text, toCase);

      const payload = {
        originalCase: result.originalCase,
        targetCase: toCase,
        originalText: text,
        convertedText: result.convertedText,
      };

      res.statusCode = 200;
      res.statusMessage = 'OK';
      res.end(JSON.stringify(payload));
    } catch (err) {
      res.statusCode = 500;
      res.statusMessage = 'Internal Server Error';

      res.end(
        JSON.stringify({
          errors: [{ message: 'Internal server error.' }],
        }),
      );
    }
  });

  return server;
}

module.exports = { createServer };
