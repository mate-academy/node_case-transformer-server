// src/createServer.js
const { createServer: createHttpServer } = require('node:http');
const { convertToCase } = require('./convertToCase');

const SUPPORTED = new Set(['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER']);

function parseUrl(reqUrl = '/') {
  const [path = '', queryString = ''] = (reqUrl || '/').split('?');
  // remove leading slash only; keep rest of the text verbatim
  const text = decodeURIComponent(path.startsWith('/') ? path.slice(1) : path);
  const params = new URLSearchParams(queryString);
  const toCase = params.get('toCase');

  return { text, toCase };
}

function respondJson(res, statusCode, statusMessage, payload) {
  res.statusCode = statusCode;
  res.statusMessage = statusMessage;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(payload));
}

function buildValidationErrors(text, toCase) {
  const errors = [];

  if (!text) {
    errors.push({
      message:
        // eslint-disable-next-line max-len
        'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  if (!toCase) {
    errors.push({
      message:
        // eslint-disable-next-line max-len
        '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  } else if (!SUPPORTED.has(toCase)) {
    errors.push({
      message:
        // eslint-disable-next-line max-len
        'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
    });
  }

  return errors;
}

function createServer() {
  const server = createHttpServer((req, res) => {
    try {
      const { text, toCase } = parseUrl(req.url);
      const errors = buildValidationErrors(text, toCase);

      if (errors.length > 0) {
        return respondJson(res, 400, 'Bad request', { errors });
      }

      // convertToCase takes (text, toCase) per the unit tests
      const result = convertToCase(text, toCase);

      return respondJson(res, 200, 'OK', {
        originalCase: result.originalCase,
        targetCase: toCase,
        originalText: text,
        convertedText: result.convertedText,
      });
    } catch {
      // Defensive fallback to keep JSON contract
      return respondJson(res, 500, 'Internal Server Error', {
        errors: [{ message: 'Unexpected server error' }],
      });
    }
  });

  return server;
}

module.exports = { createServer };
