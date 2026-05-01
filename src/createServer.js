// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
const http = require('http');
const { convertToCase } = require('./convertToCase');

const SUPPORTED_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function createServer() {
  return http.createServer((req, res) => {
    const [rawPath, queryString] = req.url.split('?');
    const text = rawPath.slice(1);

    const params = new URLSearchParams(queryString);
    const toCase = params.get('toCase');

    const errors = [];

    if (!text) {
      errors.push(
        // eslint-disable-next-line max-len
        {
          message:
            // eslint-disable-next-line max-len
            'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
        },
      );
    }

    if (!toCase) {
      errors.push({
        message:
          // eslint-disable-next-line max-len
          '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    } else if (!SUPPORTED_CASES.includes(toCase)) {
      errors.push({
        message:
          // eslint-disable-next-line max-len
          'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length > 0) {
      res.writeHead(400, 'Bad request', {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({ errors: errors }));
    } else {
      const result = convertToCase(text, toCase);

      const { originalCase, convertedText } = result;

      const response = {
        originalCase: originalCase,
        targetCase: toCase,
        originalText: text,
        convertedText: convertedText,
      };

      res.writeHead(200, 'OK', {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify(response));
    }
  });
}

module.exports = { createServer };
