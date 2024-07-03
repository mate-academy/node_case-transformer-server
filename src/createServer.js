const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { VALID_CASES, STATUS_CODES, ERROR_MESSAGES } = require('./constants');

function createServer() {
  return http.createServer((request, response) => {
    response.setHeader('Content-Type', 'application/json');

    const url = new URL(request.url, `http://${request.headers.host}`);
    const text = url.pathname.slice(1);
    const toCase = url.searchParams.get('toCase');

    const errors = [];

    if (!text) {
      errors.push({ message: ERROR_MESSAGES.MISSING_TEXT });
    }

    if (!toCase) {
      errors.push({ message: ERROR_MESSAGES.MISSING_TO_CASE });
    } else if (!VALID_CASES.includes(toCase)) {
      errors.push({ message: ERROR_MESSAGES.INVALID_TO_CASE });
    }

    if (errors.length > 0) {
      response.statusCode = STATUS_CODES.NOT_FOUND;
      response.write(JSON.stringify({ errors }));
      response.end();
      return;
    }

    const result = convertToCase(text, toCase);

    response.statusCode = STATUS_CODES.OK;
    response.write(JSON.stringify({
      originalCase: result.originalCase,
      targetCase: toCase,
      originalText: text,
      convertedText: result.convertedText,
    }));
    response.end();
  });
}

module.exports = { createServer };
