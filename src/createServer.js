const http = require('http');
const { convertToCase } = require('./convertToCase');

const ALLOWED_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
const CORRECT_REQUEST = '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';

function json(res, statusCode, statusMessage, payload) {
  res.statusCode = statusCode;
  res.statusMessage = statusMessage;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(payload));
}

function normalizeText(rawPath) {
  const path = rawPath.startsWith('/') ? rawPath.slice(1) : rawPath;

  if (!path) {
    return '';
  }

  try {
    return decodeURIComponent(path);
  } catch {
    return path;
  }
}

function createServer() {
  return http.createServer((req, res) => {
    const url = req.url || '';
    const [rawPath = '', queryString = ''] = url.split('?');

    const text = normalizeText(rawPath);
    const params = new URLSearchParams(queryString);
    const toCase = params.get('toCase');

    const errors = [];

    if (!text) {
      errors.push({
        message: `Text to convert is required. Correct request is: ${CORRECT_REQUEST}`,
      });
    }

    if (!toCase) {
      errors.push({
        message: `"toCase" query param is required. Correct request is: ${CORRECT_REQUEST}`,
      });
    } else if (!ALLOWED_CASES.includes(toCase)) {
      errors.push({
        message:
          'This case is not supported. Available cases: ' +
          'SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length) {
      return json(res, 400, 'Bad request', { errors });
    }

    const { originalCase, convertedText } = convertToCase(text, toCase);

    return json(res, 200, 'OK', {
      originalCase,
      targetCase: toCase,
      originalText: text,
      convertedText,
    });
  });
}

module.exports = {
  createServer,
};
