const http = require('http');

const { convertToCase } = require('./convertToCase');

const CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const createServer = () => {
  return http.createServer((req, res) => {
    const normalizedURL = new URL(req.url, `http://${req.headers.host}`);
    const textToConvert = normalizedURL.pathname.slice(1);
    const toCase = normalizedURL.searchParams.get('toCase');

    // console.log(textToConvert, toCase, 'here');

    const errors = [];

    if (!textToConvert) {
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
    } else if (!CASES.includes(toCase.toUpperCase())) {
      errors.push({
        message:
          'This case is not supported. Available cases: ' +
          'SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length > 0) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ errors }));

      return;
    }

    const result = convertToCase(textToConvert, toCase.toUpperCase());

    res.setHeader('Content-Type', 'application/json');

    res.end(
      JSON.stringify({
        originalCase: result.originalCase,
        targetCase: toCase.toUpperCase(),
        originalText: textToConvert,
        convertedText: result.convertedText,
      }),
    );
  });
};

module.exports = { createServer };
