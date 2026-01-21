/* eslint-disable max-len */
const http = require('node:http');
const convertToCase = require('./convertToCase');
const CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function createServer() {
  const server = http.createServer((req, res) => {
    const { pathname, searchParams } = new URL(
      req.url,
      `http://${req.headers.host}`,
    );
    const requestedPath = pathname.slice(1);
    const toCase = searchParams.get('toCase');
    const errors = [];

    if (requestedPath === '') {
      errors.push({
        message:
          'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    const normalizedToCase = toCase.toUpperCase();

    if (!toCase) {
      errors.push({
        message:
          '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    } else {
      if (!CASES.includes(normalizedToCase)) {
        errors.push({
          message:
            'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
        });
      }
    }

    if (errors.length > 0) {
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 400;
      res.end(JSON.stringify({ errors }));

      return;
    }

    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;

    const { originalCase, convertedText } = convertToCase(
      requestedPath,
      toCase,
    );

    const responseData = {
      originalCase,
      targetCase: toCase,
      originalText: requestedPath,
      convertedText,
    };

    res.end(JSON.stringify(responseData));
  });

  return server;
}

module.exports = {
  createServer,
};
