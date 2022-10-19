const http = require('http');
const { convertToCase } = require('./convertToCase');

function createServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const normaliseUrl = new URL(req.url, `http://${req.headers.host}`);
    const { pathname, searchParams } = normaliseUrl;
    const text = pathname.slice(1);
    const params = new URLSearchParams(searchParams);
    const toCase = params.get('toCase');
    const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
    const errors = [];

    if (text === '') {
      errors.push({
        message: 'Text to convert is required.'
        + ' Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!toCase) {
      errors.push({
        message: '"toCase" query param is required.'
        + ' Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!cases.includes(toCase) && toCase) {
      errors.push({
        message: 'This case is not supported.'
        + ' Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length !== 0) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';

      res.end(JSON.stringify({
        errors,
      }));

      return;
    }

    const result = convertToCase(text, toCase);

    res.statusCode = 200;
    res.statusMessage = 'OK';

    res.end(JSON.stringify({
      originalCase: result.originalCase,
      targetCase: toCase,
      originalText: text,
      convertedText: result.convertedText,
    }));
  });

  return server;
}

module.exports = { createServer };
