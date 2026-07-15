const http = require('http');
const { convertToCase } = require('./convertToCase');

const SUPPORTED_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function createServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const [pathname, queryString] = req.url.split('?');

    const rawText = pathname.slice(1);
    const textToConvert = rawText ? decodeURIComponent(rawText) : '';

    const params = new URLSearchParams(queryString || '');
    const toCase = params.get('toCase');

    const errors = [];

    if (!textToConvert) {
      errors.push({
        message:
          'Text to convert is required. Correct request is:' +
          ' "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!toCase) {
      errors.push({
        message:
          '"toCase" query param is required. Correct request is:' +
          ' "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    } else if (!SUPPORTED_CASES.includes(toCase)) {
      errors.push({
        message:
          'This case is not supported. Available cases:' +
          ' SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length > 0) {
      res.writeHead(400, 'Bad request');
      res.end(JSON.stringify({ errors }));

      return;
    }

    try {
      const result = convertToCase(textToConvert, toCase);
      const responseBody = {
        originalCase: result.originalCase,
        targetCase: toCase,
        originalText: textToConvert,
        convertedText: result.convertedText,
      };

      res.writeHead(200, 'OK');
      res.end(JSON.stringify(responseBody));
    } catch (error) {
      res.writeHead(500, 'Internal Server Error');

      res.end(
        JSON.stringify({
          errors: [
            { message: 'An internal error occurred during case conversion.' },
          ],
        }),
      );
    }
  });

  return server;
}

module.exports = { createServer };
