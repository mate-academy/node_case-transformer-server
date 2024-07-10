const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');

const CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function createServer() {
  const server = http.createServer((req, res) => {
    const normalizedUrl = new URL(req.url, `http://localhost:5700`);
    const { pathname, searchParams } = normalizedUrl;
    const errors = [];

    const TEXT_TO_CONVERT = pathname.slice(1);
    const CASE_NAME = searchParams.get('toCase');

    res.setHeader('Content-Type', 'application/json');

    if (!TEXT_TO_CONVERT) {
      errors.push({
        message:
          'Text to convert is required. Correct request is: ' +
          '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!CASE_NAME) {
      errors.push({
        message:
          '"toCase" query param is required. Correct request is: ' +
          '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    } else if (!CASES.includes(CASE_NAME)) {
      errors.push({
        message:
          'This case is not supported. Available cases: ' +
          'SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length) {
      res.statusCode = 400;
      res.end(JSON.stringify({ errors }));

      return;
    }

    const { originalCase, convertedText } = convertToCase(
      TEXT_TO_CONVERT,
      CASE_NAME,
    );

    res.statusCode = 200;

    res.end(
      JSON.stringify({
        originalCase: originalCase,
        targetCase: CASE_NAME,
        originalText: TEXT_TO_CONVERT,
        convertedText: convertedText,
      }),
    );
  });

  return server;
}

module.exports = {
  createServer,
};
