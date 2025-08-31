/* eslint-disable max-len */
const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');

function createServer() {
  return http.createServer((req, res) => {
    const [pathPart, queryString] = req.url.split('?');
    const textToConvert = decodeURIComponent(pathPart.slice(1) || '');
    const queryParams = new URLSearchParams(queryString);
    const toCase = queryParams.get('toCase');

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
    }

    const SUPPORTED_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

    if (toCase && !SUPPORTED_CASES.includes(toCase)) {
      errors.push({
        message:
          'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length > 0) {
      res.statusCode = 400;
      res.statusMessage = 'Bad Request';
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ errors }));

      return;
    }

    try {
      // note: convertToCase signature is (text, toCase)
      const { originalCase, convertedText } = convertToCase(
        textToConvert,
        toCase,
      );

      res.statusCode = 200;
      res.statusMessage = 'OK';
      res.setHeader('Content-Type', 'application/json');

      res.end(
        JSON.stringify({
          originalCase,
          targetCase: toCase,
          originalText: textToConvert,
          convertedText,
        }),
      );
    } catch (err) {
      res.statusCode = 400;
      res.statusMessage = 'Bad Request';
      res.setHeader('Content-Type', 'application/json');

      res.end(
        JSON.stringify({
          errors: [{ message: err.message }],
        }),
      );
    }
  });
}

module.exports = { createServer };
