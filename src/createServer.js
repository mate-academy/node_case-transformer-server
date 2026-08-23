const http = require('node:http');

const { convertToCase } = require('./convertToCase');

const SUPPORTED_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
const REQUEST_EXAMPLE = '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';

const ERROR_MESSAGES = {
  textRequired: `Text to convert is required. Correct request is: ${REQUEST_EXAMPLE}`,
  caseRequired: `"toCase" query param is required. Correct request is: ${REQUEST_EXAMPLE}`,
  unsupportedCase:
    'This case is not supported. Available cases: ' +
    'SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
};

function sendJson(response, statusCode, statusMessage, payload) {
  response.writeHead(statusCode, statusMessage, {
    'Content-Type': 'application/json',
  });
  response.end(JSON.stringify(payload));
}

function createServer() {
  return http.createServer((request, response) => {
    const url = new URL(request.url, 'http://localhost');
    const text = decodeURIComponent(url.pathname.slice(1));
    const targetCase = url.searchParams.get('toCase');
    const errors = [];

    if (!text) {
      errors.push({ message: ERROR_MESSAGES.textRequired });
    }

    if (!targetCase) {
      errors.push({ message: ERROR_MESSAGES.caseRequired });
    } else if (!SUPPORTED_CASES.includes(targetCase)) {
      errors.push({ message: ERROR_MESSAGES.unsupportedCase });
    }

    if (errors.length > 0) {
      sendJson(response, 400, 'Bad request', { errors });

      return;
    }

    const { originalCase, convertedText } = convertToCase(text, targetCase);

    sendJson(response, 200, 'OK', {
      originalCase,
      targetCase,
      originalText: text,
      convertedText,
    });
  });
}

module.exports = {
  createServer,
};
