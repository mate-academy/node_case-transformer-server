/* eslint-disable no-console */
const http = require('http');
const { convertToCase } = require('./convertToCase');

function createServer() {
  return http.createServer((request, response) => {
    const normalizeUrl = new URL(request.url, `http://${request.headers.host}`);
    const toCase = normalizeUrl.searchParams.get('toCase');
    const text = normalizeUrl.pathname.slice(1);
    const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

    response.setHeader('Content-Type', 'application/json');

    const errors = [];

    if (!text) {
      errors.push({
        message:
          'Text to convert is required. ' +
          'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!toCase) {
      errors.push({
        message:
          '"toCase" query param is required. ' +
          'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    } else if (!cases.includes(toCase)) {
      errors.push({
        message:
          'This case is not supported. ' +
          'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length > 0) {
      response.writeHead(400, 'Bad request', {
        'Content-Type': 'application/json',
      });
      response.end(JSON.stringify({ errors }));

      return;
    }

    const result = convertToCase(text, toCase);

    response.writeHead(200, { 'Content-Type': 'application/json' });

    response.end(
      JSON.stringify({
        originalCase: result.originalCase,
        targetCase: toCase,
        originalText: text,
        convertedText: result.convertedText,
      }),
    );
  });
}

module.exports = {
  createServer,
};
