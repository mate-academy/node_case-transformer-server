/* eslint-disable max-len */
const http = require('http');
const { convertToCase } = require('./convertToCase/index.js');

function createServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const [path, queryString] = req.url.split('?');
    const textToConvert = path.slice(1);
    const params = new URLSearchParams(queryString);
    const toCase = params.get('toCase');

    const errors = [];
    const supportedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

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
    } else if (!supportedCases.includes(toCase)) {
      errors.push({
        message:
          'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length > 0) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';

      return res.end(JSON.stringify({ errors }));
    }

    try {
      const result = convertToCase(textToConvert, toCase);

      const responsePayload = {
        originalCase: result.originalCase,
        targetCase: toCase,
        originalText: textToConvert,
        convertedText: result.convertedText,
      };

      res.statusCode = 200;
      res.statusMessage = 'OK';
      res.end(JSON.stringify(responsePayload));
    } catch (error) {
      res.statusCode = 500;

      res.end(
        JSON.stringify({ errors: [{ message: 'Internal server error' }] }),
      );
    }
  });

  return server;
}

module.exports = {
  createServer,
};
