const http = require('node:http');

const { convertToCase } = require('./convertToCase');

const SUPPORTED_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
const REQUEST_EXAMPLE = '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';

const ERROR_MESSAGES = {
  missingText: [
    'Text to convert is required.',
    `Correct request is: ${REQUEST_EXAMPLE}`,
  ].join(' '),
  missingCase: [
    '"toCase" query param is required.',
    `Correct request is: ${REQUEST_EXAMPLE}`,
  ].join(' '),
  unsupportedCase: [
    'This case is not supported.',
    'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
  ].join(' '),
};

function sendJson(res, statusCode, statusMessage, payload) {
  res.statusCode = statusCode;
  res.statusMessage = statusMessage;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(payload));
}

function getRequestData(url) {
  const [path = '', queryString = ''] = url.split('?');
  const text = path.startsWith('/') ? path.slice(1) : path;
  const params = new URLSearchParams(queryString);
  const toCase = params.get('toCase');

  return {
    text,
    toCase,
  };
}

function validateRequest(text, toCase) {
  const errors = [];

  if (!text) {
    errors.push({ message: ERROR_MESSAGES.missingText });
  }

  if (!toCase) {
    errors.push({ message: ERROR_MESSAGES.missingCase });
  } else if (!SUPPORTED_CASES.includes(toCase)) {
    errors.push({ message: ERROR_MESSAGES.unsupportedCase });
  }

  return errors;
}

function createServer() {
  return http.createServer((req, res) => {
    const { text, toCase } = getRequestData(req.url || '/');
    const errors = validateRequest(text, toCase);

    if (errors.length > 0) {
      sendJson(res, 400, 'Bad request', { errors });

      return;
    }

    const { originalCase, convertedText } = convertToCase(text, toCase);

    sendJson(res, 200, 'OK', {
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
