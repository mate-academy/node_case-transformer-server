const http = require('http');
const { convertToCase } = require('./convertToCase');

function createServer() {
  const server = http.createServer((req, res) => {
    const allCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
    const normalizedUrl = new URL(req.url, `http//${req.headers.host}`);
    const text = normalizedUrl.pathname.slice(1);
    const entries = Object.fromEntries(normalizedUrl.searchParams.entries());
    const toCase = entries.toCase;
    const errors = [];

    if (!text) {
      errors.push({
        message: 'Text to convert is required. '
          + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".'
      });
    }

    if (!toCase) {
      errors.push({
        message: '"toCase" query param is required. '
          + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".'
      });
    } else if (!(allCases.includes(toCase))) {
      errors.push({
        message: 'This case is not supported. '
          + 'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.'
      });
    }

    if (errors.length > 0) {
      res.statusCode = 400;
      res.statusText = 'Bad request';
      res.end(JSON.stringify({ errors }));

      return;
    }

    const { originalCase, convertedText } = convertToCase(text, toCase);

    res.writeHead(200, {
      'Content-Type': 'application/json',
    });

    res.end(JSON.stringify({
      originalCase,
      toCase,
      originalText: text,
      convertedText,
    }));
  });

  return server;
}

module.exports = {
  createServer,
};
