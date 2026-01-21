const http = require('node:http');
const { convertToCase } = require('./convertToCase/convertToCase');

function createServer() {
  return http.createServer((req, res) => {
    const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
    const normalizeURL = new URL(req.url, `http://${req.headers.host}`);
    const params = normalizeURL.pathname.slice(1);
    const toCase = normalizeURL.searchParams.get('toCase');
    const errors = [];

    res.setHeader('Content-Type', 'application/json');

    if (!params) {
      errors.push({
        message:
          'Text to convert is required. ' +
          'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!toCase) {
      errors.push({
        message:
          '"toCase" query param is required. ' +
          'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (toCase && !cases.includes(toCase)) {
      errors.push({
        message:
          'This case is not supported. ' +
          'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length > 0) {
      res.statusCode = 400;
      res.end(JSON.stringify({ errors }));

      return null;
    } else {
      const convertedText = convertToCase(params, toCase);

      res.statusCode = 200;

      res.end(
        JSON.stringify({
          originalCase: convertedText.originalCase,
          targetCase: toCase,
          originalText: params,
          convertedText: convertedText.convertedText,
        }),
      );
    }
  });
}

module.exports = { createServer };
