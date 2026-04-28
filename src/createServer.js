/* eslint-disable max-len */
const http = require('node:http');
const { convertToCase } = require('./convertToCase');

function createServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const urlParts = req.url.split('?');
    const path = urlParts[0];
    const queryString = urlParts[1];

    const textToConvert = path.slice(1);

    const params = new URLSearchParams(queryString);
    const toCase = params.get('toCase');

    const errors = [];
    const allowedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

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
    } else if (!allowedCases.includes(toCase)) {
      errors.push({
        message:
          'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length > 0) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.end(JSON.stringify({ errors }));

      return;
    }

    const conversionResult = convertToCase(textToConvert, toCase);

    const responseBody = {
      originalCase: conversionResult.originalCase,
      targetCase: toCase,
      originalText: textToConvert,
      convertedText: conversionResult.convertedText,
    };

    res.statusCode = 200;
    res.statusMessage = 'OK';
    res.end(JSON.stringify(responseBody));
  });

  return server;
}

module.exports = {
  createServer,
};
