/* eslint-disable no-console */
const http = require('http');
const url = require('url');
const { convertToCase } = require('./convertToCase/convertToCase');

const CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function createServer() {
  return http.createServer((req, res) => {
    res.setHeader('Content-type', 'application/json');

    const normalizedUrl = new url.URL(req.url, `http://${req.headers.host}`);
    const errors = {
      errors: [],
    };

    if (normalizedUrl.pathname !== '/favicon.ico') {
      const originalText = normalizedUrl.pathname.slice(1);
      const targetCase = normalizedUrl.searchParams.get('toCase');

      if (!originalText) {
        errors.errors.push({ message: 'Text to convert is required. Correct '
        + 'request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' });
      }

      if (!targetCase) {
        errors.errors.push({ message: '"toCase" query param is required. '
        + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' });
      }

      if (targetCase && !CASES.includes(targetCase)) {
        errors.errors.push({ message: 'This case is not supported. Available '
        + 'cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.' });
      }

      if (errors.errors.length) {
        res.statusCode = 404;
        res.statusMessage = 'Bad request';
        res.end(JSON.stringify(errors));

        return;
      }

      const { convertedText, originalCase } = convertToCase(
        originalText, targetCase,
      );

      res.statusCode = 200;
      res.statusMessage = 'OK';

      res.end(JSON.stringify({
        originalCase,
        targetCase,
        originalText,
        convertedText,
      }));
    }
  });
}

module.exports = { createServer };
