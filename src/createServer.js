/* eslint-disable max-len */
const http = require('http');
const convertToCase = require('./convertToCase').convertToCase;

function createServer() {
  const server = http.createServer();

  server.on('request', (req, res) => {
    const normalizedUrl = new URL(req.url, `http://${req.headers.host}`);

    const textToConvert = normalizedUrl.pathname.slice(1);
    const { toCase } = Object.fromEntries(normalizedUrl.searchParams.entries());

    const errors = [];

    if (!textToConvert) {
      errors.push({
        message: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!toCase) {
      errors.push({
        message: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    } else if (!['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'].includes(toCase)) {
      errors.push({
        message: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    res.setHeader('Content-Type', 'application/json');

    if (errors.length) {
      res.statusCode = 400;

      res.end(JSON.stringify({ errors }));
    } else {
      res.end(JSON.stringify({
        ...convertToCase(
          textToConvert,
          toCase,
        ),
        originalText: textToConvert,
        targetCase: toCase,
      }));
    }

    res.end();
  });

  return server;
};

module.exports = {
  createServer,
};
