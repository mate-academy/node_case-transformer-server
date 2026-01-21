const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');

const supportedCases = new Set(['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER']);

const createServer = () => {
  return http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const textToConvert = url.pathname.slice(1);
    const toCase = url.searchParams.get('toCase');

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
          '"toCase" query param is required. Correct request is: ' +
          '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    } else if (!supportedCases.has(toCase)) {
      errors.push({
        message:
          'This case is not supported. ' +
          'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length > 0) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ errors }));

      return;
    }

    const { originalCase, convertedText } = convertToCase(
      textToConvert,
      toCase,
    );

    res.writeHead(200, { 'Content-Type': 'application/json' });

    res.end(
      JSON.stringify({
        originalCase,
        targetCase: toCase,
        originalText: textToConvert,
        convertedText,
      }),
    );
  });
};

module.exports = { createServer };
