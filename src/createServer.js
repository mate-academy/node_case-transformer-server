const http = require('node:http');
const { convertToCase } = require('./convertToCase/convertToCase');

const ERROR_MESSAGES = {
  TEXT_REQUIRED:
    'Text to convert is required. Correct request is: ' +
    '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  TO_CASE_REQUIRED:
    '"toCase" query param is required. Correct request is: ' +
    '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  CASE_NOT_SUPPORTED:
    'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, ' +
    'PASCAL, UPPER.',
};

function createServer() {
  const server = http.createServer((req, res) => {
    const normalizedUrl = new URL(req.url, `http://${req.headers.host}`);
    const pathname = normalizedUrl.pathname;
    const originalText = pathname.replace('/', '');
    const toCase = normalizedUrl.searchParams.get('toCase');

    const errors = [];

    if (pathname.length < 2) {
      errors.push({ message: ERROR_MESSAGES.TEXT_REQUIRED });
    }

    if (!toCase) {
      errors.push({ message: ERROR_MESSAGES.TO_CASE_REQUIRED });
    }

    let originalCase, convertedText;

    if (toCase) {
      try {
        const result = convertToCase(originalText, toCase);

        ({ originalCase, convertedText } = result);
      } catch (error) {
        errors.push({ message: ERROR_MESSAGES.CASE_NOT_SUPPORTED });
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
        originalCase,
        convertedText,
        originalText,
        targetCase: toCase,
      }),
    );
  });

  return server;
}

module.exports = {
  createServer,
};
