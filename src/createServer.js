/* eslint-disable max-len */
// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
const http = require('http');
const { convertToCase } = require('./convertToCase');

function createServer() {
  return http.createServer((req, res) => {
    const [text, queryString] = req.url.split('?');
    const params = new URLSearchParams(queryString);
    const toCase = params.get('toCase');
    const textToConvert = text.slice(1);

    const SUPPORTED_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
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
    } else if (!SUPPORTED_CASES.includes(toCase)) {
      errors.push({
        message:
          'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length > 0) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ errors }));

      return;
    }

    try {
      const result = convertToCase(textToConvert, toCase);

      res.writeHead(200, { 'Content-Type': 'application/json' });

      res.end(
        JSON.stringify({
          ...result,
          originalText: textToConvert,
          targetCase: toCase,
        }),
      );
    } catch (e) {
      res.writeHead(400, { 'Content-Type': 'application/json' });

      res.end(
        JSON.stringify({
          errors: [
            {
              message:
                'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
            },
          ],
        }),
      );
    }
  });
}

module.exports = {
  createServer,
};
