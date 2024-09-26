/* eslint-disable max-len */

const http = require('http');
const { convertToCase } = require('./convertToCase/index');

function createServer() {
  const server = http.createServer((req, res) => {
    const normalizedURL = new URL(req.url, `http://${req.headers.host}`);

    const textToConvert = normalizedURL.pathname.slice(1);
    const toCase = normalizedURL.searchParams.get('toCase');

    const supportedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
    const errors = [];

    if (!textToConvert) {
      errors.push({
        message:
          'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!toCase) {
      errors.push({
        message:
          '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    } else if (!supportedCases.includes(toCase.toUpperCase())) {
      errors.push({
        message:
          'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    res.setHeader('Content-Type', 'application/json');

    if (errors.length) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.end(JSON.stringify({ errors }));

      return;
    }

    try {
      const result = convertToCase(textToConvert, toCase);

      result.targetCase = toCase;
      result.originalText = textToConvert;

      res.statusCode = 200;
      res.statusMessage = 'OK';
      res.end(JSON.stringify(result));
    } catch (err) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';

      const data = { errors: [{ message: err.message }] };

      res.end(JSON.stringify(data));
    }
  });

  return server;
}

module.exports = {
  createServer,
};
