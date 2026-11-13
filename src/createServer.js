'use strict';

const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');

const SUPPORTED_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
const HINT = 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';

function createServer() {
  return http.createServer((req, res) => {
    const [pathname, query] = req.url.split('?');
    const originalText = pathname.slice(1);
    const targetCase = new URLSearchParams(query).get('toCase');

    const errors = [];

    if (!originalText) {
      errors.push({ message: `Text to convert is required. ${HINT}` });
    }

    if (!targetCase) {
      errors.push({ message: `"toCase" query param is required. ${HINT}` });
    } else if (!SUPPORTED_CASES.includes(targetCase)) {
      errors.push({
        message:
          'This case is not supported. ' +
          `Available cases: ${SUPPORTED_CASES.join(', ')}.`,
      });
    }

    res.setHeader('Content-Type', 'application/json');

    if (errors.length > 0) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.end(JSON.stringify({ errors }));

      return;
    }

    const { originalCase, convertedText } = convertToCase(
      originalText,
      targetCase,
    );

    res.statusCode = 200;

    res.end(
      JSON.stringify({
        originalCase,
        targetCase,
        originalText,
        convertedText,
      }),
    );
  });
}

module.exports = { createServer };
