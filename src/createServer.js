/* eslint-disable max-len */
const http = require('http');
const { convertToCase } = require('./convertToCase/index');

function createServer() {
  return http.createServer((request, response) => {
    try {
      const normalizedURL = new URL(request.url, `http://${request.headers.host}`);
      const textToConvert = normalizedURL.pathname.slice(1);
      const toCase = normalizedURL.searchParams.get('toCase');

      const errors = [];

      if (!textToConvert) {
        errors.push({ message: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' });
      }

      if (!toCase) {
        errors.push({ message: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' });
      } else if (!['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'].includes(toCase)) {
        errors.push({ message: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.' });
      }

      if (errors.length > 0) {
        response.writeHead(400, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ errors }));

        return;
      }

      const { originalCase, convertedText } = convertToCase(textToConvert, toCase);

      response.writeHead(200, { 'Content-Type': 'application/json' });

      response.end(JSON.stringify({
        originalCase,
        targetCase: toCase,
        originalText: textToConvert,
        convertedText,
      }));
    } catch (err) {
      response.writeHead(500, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ error: 'Internal server error' }));
    }
  });
}

module.exports = {
  createServer,
};
