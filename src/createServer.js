/* eslint-disable max-len */
const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');

function createServer() {
  const server = http.createServer((req, res) => {
    const parsedUrl = new URL(req.url, `http://${req.headers.host}`);

    const textToConvert = parsedUrl.pathname.slice(1);
    const toCase = parsedUrl.searchParams.get('toCase');

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
          // Виправлено "search" на "query"
          '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    let result = null;

    if (toCase) {
      try {
        result = convertToCase(textToConvert, toCase);
      } catch (error) {
        // Підміняємо системну помилку на ту, яку вимагає специфікація API
        errors.push({
          message:
            'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
        });
      }
    }

    if (errors.length > 0) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ errors }));

      return;
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });

    res.end(
      JSON.stringify({
        originalCase: result.originalCase,
        targetCase: toCase,
        convertedText: result.convertedText,
        originalText: textToConvert,
      }),
    );
  });

  return server;
}

module.exports = {
  createServer,
};
