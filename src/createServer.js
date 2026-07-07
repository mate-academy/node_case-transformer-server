// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
const http = require('node:http');
const { convertToCase } = require('./convertToCase');

const textRequiredMessage =
  'Text to convert is required. Correct request is: ' +
  '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
const toCaseRequiredMessage =
  '"toCase" query param is required. Correct request is: ' +
  '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
const unsupportedCaseMessage =
  'This case is not supported. Available cases: ' +
  'SNAKE, KEBAB, CAMEL, PASCAL, UPPER.';

function createServer() {
  return http.createServer((req, res) => {
    const errors = [];

    res.setHeader('Content-Type', 'application/json');

    const [path, queryString] = req.url.split('?');

    const text = path.slice(1);

    const params = new URLSearchParams(queryString);

    const toCase = params.get('toCase');

    if (!text) {
      res.statusCode = 400;

      errors.push({
        message: textRequiredMessage,
      });
    }

    if (!toCase) {
      res.statusCode = 400;

      errors.push({
        message: toCaseRequiredMessage,
      });
    }

    const supportedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

    if (toCase && !supportedCases.includes(toCase)) {
      res.statusCode = 400;

      errors.push({
        message: unsupportedCaseMessage,
      });
    }

    if (errors.length) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request'
      res.end(JSON.stringify({ errors }));

      return;
    }

    const { originalCase, convertedText } = convertToCase(text, toCase);

    res.statusCode = 200;
    res.statusMessage = 'OK';

    res.end(
      JSON.stringify({
        originalCase: originalCase,
        targetCase: toCase,
        originalText: text,
        convertedText: convertedText,
      }),
    );
  });
}

module.exports = {
  createServer,
};
