const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');

function createServer() {
  const server = http.createServer((req, res) => {
    const normalizedURL = new URL(req.url, `http://${req.headers.host}`);
    const originalText = normalizedURL.pathname.slice(1);
    const targetCase = Object.fromEntries(
      normalizedURL.searchParams.entries(),
    ).toCase;

    const supportedCases = [
      'SNAKE',
      'KEBAB',
      'CAMEL',
      'PASCAL',
      'UPPER',
    ];

    const missingText = 'Text to convert is required.'
      + ' Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';

    const missingCase = '"toCase" query param is required.'
      + ' Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';

    const notValidCase = 'This case is not supported. Available cases:'
      + ' SNAKE, KEBAB, CAMEL, PASCAL, UPPER.';

    res.setHeader('Content-Type', 'application/json');

    const errors = [];

    if (!originalText) {
      errors.push({
        message: missingText,
      });
    }

    if (!targetCase) {
      errors.push({
        message: missingCase,
      });
    } else if (!supportedCases.includes(targetCase)) {
      errors.push({
        message: notValidCase,
      });
    }

    if (errors.length) {
      res.statusCode = 400;
      res.statusText = 'Bad request';
      res.end(JSON.stringify({ errors }));

      return;
    }

    res.statusCode = 200;
    res.statusText = 'OK';

    const { originalCase, convertedText } = convertToCase(
      originalText, targetCase,
    );

    res.end(JSON.stringify({
      originalCase,
      targetCase,
      originalText,
      convertedText,
    }));
  });

  return server;
}
module.exports = { createServer };
