/* eslint-disable max-len */
const http = require('http');
const { convertToCase } = require('./convertToCase');

const validCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function createServer() {
  return http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const [pathPart, queryString] = req.url.split('?');
    const text = pathPart ? pathPart.slice(1) : '';
    const params = new URLSearchParams(queryString);
    const toCase = params.get('toCase');

    const errors = [];

    if (!text) {
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
    } else if (!validCases.includes(toCase)) {
      errors.push({
        message:
          'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length > 0) {
      res.statusCode = 400;
      res.statusMessage = 'Bad Request';
      res.end(JSON.stringify({ errors }));

      return;
    }

    try {
      const result = convertToCase(toCase, text);

      const response = {
        originalCase: result.originalCase,
        targetCase: toCase,
        convertedText: result.convertedText,
        originalText: text,
      };

      res.statusCode = 200;
      res.statusMessage = 'OK';
      res.end(JSON.stringify(response));
    } catch (error) {
      res.statusCode = 500;
      res.statusMessage = 'Internal Server Error';

      res.end(
        JSON.stringify({
          errors: [{ message: error.message }],
        }),
      );
    }
  });
}

module.exports = { createServer };
