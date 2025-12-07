const http = require('http');
const { convertToCase } = require('./convertToCase');

const SUPPORTED_CASES = new Set(['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER']);
const BAD_REQUEST_HELP = '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>"';

function sendJSON(res, statusCode, statusMessage, payload) {
  res.statusCode = statusCode;

  if (statusMessage) {
    res.statusMessage = statusMessage;
  }

  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(payload));
}

function getParams(req) {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const toCase = url.searchParams.get('toCase');
  const text = url.pathname.startsWith('/')
    ? url.pathname.slice(1)
    : url.pathname;

  return { toCase, text };
}

function validateParams({ toCase, text }) {
  const errors = [];

  if (!text) {
    errors.push({
      message: `Text to convert is required. Correct request is: ${BAD_REQUEST_HELP}.`,
    });
  }

  if (!toCase) {
    errors.push({
      message: `"toCase" query param is required. Correct request is: ${BAD_REQUEST_HELP}.`,
    });
  } else if (!SUPPORTED_CASES.has(toCase)) {
    errors.push({
      message:
        // eslint-disable-next-line max-len
        'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
    });
  }

  return errors;
}

function createServer() {
  const server = http.createServer((req, res) => {
    try {
      const { toCase, text } = getParams(req);
      const errors = validateParams({ toCase, text });

      if (errors.length > 0) {
        return sendJSON(res, 400, 'Bad request', { errors });
      }

      const { originalCase, convertedText } = convertToCase(toCase, text);

      return sendJSON(res, 200, 'OK', {
        originalCase,
        targetCase: toCase,
        originalText: text,
        convertedText,
      });
    } catch {
      return sendJSON(res, 500, 'Internal Server Error', {
        errors: [{ message: 'Unexpected server error.' }],
      });
    }
  });

  return server;
}

module.exports = { createServer };
