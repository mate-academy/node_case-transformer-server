const http = require('http');
const { convertToCase } = require('./convertToCase');

function createServer() {
  const server = http.createServer((req, res) => {
    const normalizedUrl = new URL(req.url, `http://${req.headers.host}`);
    const text = normalizedUrl.pathname.slice(1);
    const params = Object.fromEntries(normalizedUrl.searchParams.entries());
    const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
    const targetCase = params.toCase;
    const errors = [];

    res.setHeader('Content-Type', 'application/json');

    if (!text) {
      errors.push({
        message: 'Text to convert is required. '
        + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    };

    if (!targetCase) {
      errors.push({
        message: '"toCase" query param is required. '
        + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    } else if (!cases.includes(targetCase)) {
      errors.push({
        message: 'This case is not supported. '
        + 'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    };

    if (errors.length > 0) {
      res.statusCode = 400;
      res.statusText = 'Bad request';

      res.end(JSON.stringify({ errors }));

      return;
    };

    const convertedText = convertToCase(text, targetCase);

    res.statusCode = 200;
    res.statusText = 'OK';

    res.end(JSON.stringify({
      originalCase: convertedText.originalCase,
      targetCase,
      originalText: text,
      convertedText: convertedText.convertedText,
    }));
  });

  return server;
}

module.exports = { createServer };
