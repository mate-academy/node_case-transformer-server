const http = require('http');
const { convertToCase } = require('./convertToCase');

const SUPPORTED_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const createServer = () => {
  const server = http.createServer((req, res) => {
    const [pathname, queryString] = req.url.split('?');
    const text = decodeURIComponent(pathname.slice(1));
    const params = new URLSearchParams(queryString);
    const toCase = params.get('toCase');

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
    } else if (!SUPPORTED_CASES.includes(toCase)) {
      errors.push({
        message:
          'This case is not supported. Available cases: ' +
          'SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length > 0) {
      res.writeHead(400, 'Bad request', {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({ errors }));

      return;
    }

    const { originalCase, convertedText } = convertToCase(text, toCase);

    res.writeHead(200, 'OK', { 'Content-Type': 'application/json' });

    res.end(
      JSON.stringify({
        originalCase,
        targetCase: toCase,
        originalText: text,
        convertedText,
      }),
    );
  });

  return server;
};

module.exports = { createServer };
