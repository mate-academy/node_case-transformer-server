const http = require('http');
const { convertToCase } = require('./convertToCase');

const SUPPORTED_CASES = new Set(['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER']);

function sendJSON(res, statusCode, statusMessage, payload) {
  res.statusCode = statusCode;

  if (statusMessage) {
    res.statusMessage = statusMessage;
  }
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(payload));
}

function buildErrors(text, toCase) {
  const errors = [];

  if (!text) {
    errors.push({
      message:
        'Text to convert is required. Correct request is: ' +
        '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  }

  if (!toCase) {
    errors.push({
      message:
        '"toCase" query param is required. Correct request is: ' +
        '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    });
  } else if (!SUPPORTED_CASES.has(toCase)) {
    errors.push({
      message:
        'This case is not supported. ' +
        'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
    });
  }

  return errors;
}

function createServer() {
  const server = http.createServer((req, res) => {
    try {
      const rawUrl = req.url || '/';
      const [pathPart, queryString = ''] = rawUrl.split('?');

      // Extract and decode the text to convert (strip the leading slash)
      const textRaw = pathPart.startsWith('/') ? pathPart.slice(1) : pathPart;
      const text = decodeURIComponent(textRaw || '');

      // Parse query parameters
      const params = new URLSearchParams(queryString);
      const toCase = params.get('toCase');

      // Validate
      const errors = buildErrors(text, toCase);

      if (errors.length > 0) {
        return sendJSON(res, 400, 'Bad request', { errors });
      }

      // Business logic
      const result = convertToCase(toCase, text);

      // Respond
      return sendJSON(res, 200, 'OK', {
        originalCase: result.originalCase,
        targetCase: toCase,
        originalText: text,
        convertedText: result.convertedText,
      });
    } catch (e) {
      // Fallback for any unexpected error
      return sendJSON(res, 500, 'Internal Server Error', {
        errors: [{ message: 'Unexpected server error' }],
      });
    }
  });

  return server;
}

module.exports = { createServer };
