const http = require('http');
const { convertToCase } = require('./convertToCase');

const SUPPORTED_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function createServer() {
  return http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const [rawPath, queryString] = (req.url || '').split('?');
    const rawText = rawPath.startsWith('/') ? rawPath.slice(1) : rawPath;
    const originalText = decodeURIComponent(rawText);

    const params = new URLSearchParams(queryString || '');
    const toCase = params.get('toCase');

    const errors = [];

    if (!originalText) {
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
    } else if (!SUPPORTED_CASES.includes(toCase)) {
      errors.push({
        message:
          'This case is not supported. Available cases: ' +
          'SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length > 0) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.end(JSON.stringify({ errors }));

      return;
    }

    const { originalCase, convertedText } = convertToCase(originalText, toCase);

    res.statusCode = 200;
    res.statusMessage = 'OK';

    const responseBody = {
      originalCase,
      targetCase: toCase,
      originalText,
      convertedText,
    };

    res.end(JSON.stringify(responseBody));
  });
}

module.exports = {
  createServer,
};
