/* eslint-disable no-console */
/* eslint-disable max-len */
const http = require('http');
const { convertToCase } = require('./convertToCase');

function createServer() {
  return http.createServer((req, res) => {
    try {
      const url = new URL(req.url, `http://${req.headers.host}`);
      const textToConvert = decodeURIComponent(url.pathname.slice(1));
      const toCase = url.searchParams.get('toCase');

      console.log(
        `Received request to convert: '${textToConvert}' to '${toCase}'`,
      );

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

      if (
        toCase &&
        !['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'].includes(toCase)
      ) {
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

      const result = convertToCase(textToConvert, toCase);

      res.writeHead(200, { 'Content-Type': 'application/json' });

      res.end(
        JSON.stringify({
          originalCase: result.originalCase,
          targetCase: toCase,
          originalText: textToConvert,
          convertedText: result.convertedText,
        }),
      );
    } catch (error) {
      console.error('Error processing request:', error);
      res.writeHead(500, { 'Content-Type': 'application/json' });

      res.end(
        JSON.stringify({ errors: [{ message: 'Internal server error' }] }),
      );
    }
  });
}

module.exports = { createServer };
