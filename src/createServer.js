/*eslint-disable*/
const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');

function createServer() {
  return http.createServer((req, res) => {
    const errors = [];
    const normalizedURL = new URL(req.url, 'http://localhost:5700/');

    const textToConvert = normalizedURL.pathname.slice(1);
    const caseToConvert = normalizedURL.searchParams.get('toCase');

    if (textToConvert === 'favicon.ico') {
      res.statusCode = 204; // No Content
      res.end();

      return;
    }

    if (!textToConvert) {
      errors.push({
        message:
          'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!caseToConvert) {
      errors.push({
        message:
          '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    const availableCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

    if (
      caseToConvert &&
      !availableCases.includes(caseToConvert.toUpperCase())
    ) {
      errors.push({
        message:
          'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length > 0) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ errors }));

      return;
    }

    try {
      const { originalCase, convertedText } = convertToCase(
        textToConvert,
        caseToConvert.toUpperCase(),
      );

      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');

      res.end(
        JSON.stringify({
          originalCase,
          targetCase: caseToConvert,
          originalText: textToConvert,
          convertedText,
        }),
      );
    } catch (error) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');

      res.end(
        JSON.stringify({
          errors: [{ message: error.message }],
        }),
      );
    }
  });
}

module.exports = { createServer };
