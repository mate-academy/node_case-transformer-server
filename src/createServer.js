/* eslint-disable max-len */
/* eslint-disable indent */
const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');

function createServer() {
  const server = http.createServer((req, res) => {
    const normilizedURL = new URL(req.url, 'http://localhost:5700');

    const originalText = normilizedURL.pathname.slice(1);
    const targetCase = normilizedURL.searchParams.get('toCase');

    const errors = [];
    const caseVariant = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

    if (!originalText) {
      errors.push({
        message:
          'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!targetCase) {
      errors.push({
        message:
          '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    } else if (!caseVariant.includes(targetCase)) {
      errors.push({
        message:
          'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    let responseBody;

    if (errors.length > 0) {
      responseBody = { errors };
    } else {
      const { originalCase, convertedText } = convertToCase(
        originalText,
        targetCase,
      );

      responseBody = {
        originalCase,
        targetCase,
        originalText,
        convertedText,
      };
    }

    const code = errors.length > 0 ? 400 : 200;
    const message = errors.length > 0 ? 'Bad Request' : 'OK';

    res.setHeader('Content-Type', 'application/json');
    res.statusCode = code;
    res.statusMessage = message;

    res.end(JSON.stringify(responseBody));
  });

  return server;
}

module.exports = {
  createServer,
};
