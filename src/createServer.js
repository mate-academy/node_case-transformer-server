const http = require('node:http');
const { convertToCase } = require('./convertToCase/convertToCase');

function createServer() {
  const server = http.createServer((req, res) => {
    const partOfRequest = new URL(req.url, 'http://localhost');

    const pathname = partOfRequest.pathname;
    const searchParams = partOfRequest.searchParams;

    const toCase = searchParams.get('toCase');
    const text = pathname.slice(1);

    const availableCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
    const errors = [];

    if (!text) {
      errors.push({
        message:
          'Text to convert is required. Correct request is: ' +
          '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!toCase) {
      errors.push({
        message:
          '"toCase" query param is required. Correct request is: ' +
          '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    } else if (!availableCases.includes(toCase)) {
      errors.push({
        message:
          'This case is not supported. ' +
          'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    res.setHeader('Content-Type', 'application/json');

    if (errors.length) {
      res.statusCode = 400;
      res.end(JSON.stringify({ errors }));

      return;
    }

    const result = convertToCase(text, toCase);

    res.statusCode = 200;
    res.statusMessage = 'OK';

    res.end(
      JSON.stringify({
        originalCase: result.originalCase,
        targetCase: toCase,
        convertedText: result.convertedText,
        originalText: text,
      }),
    );
  });

  return server;
}

module.exports = { createServer };
