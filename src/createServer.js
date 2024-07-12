/* eslint max-len: ["error", { "ignoreStrings": true }] */
const http = require('http');
const { convertToCase } = require('./convertToCase');

const createServer = () => {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;

    const urlParts = req.url.split('?');
    const originalText = urlParts[0].slice(1);
    const queryParams = new URLSearchParams(urlParts[1]);
    const toCase = queryParams.get('toCase');

    const errors = [];

    if (!originalText || originalText === '/') {
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
    }

    const supportedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

    if (toCase && !supportedCases.includes(toCase)) {
      errors.push({
        message:
          'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length > 0) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';

      res.end(
        JSON.stringify({
          errors: errors,
        }),
      );

      return;
    }

    const { originalCase, convertedText } = convertToCase(originalText, toCase);

    res.end(
      JSON.stringify({
        originalCase: originalCase,
        targetCase: toCase,
        originalText: originalText,
        convertedText: convertedText,
      }),
    );
  });

  return server;
};

module.exports = {
  createServer,
};
