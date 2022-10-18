const http = require('http');
const { convertToCase } = require('./convertToCase');

const missingText = 'Text to convert is required. '
+ 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
const missingCase = '"toCase" query param is required. '
+ 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
const invalidCase = 'This case is not supported. '
+ 'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.';

function createServer() {
  const server = http.createServer((req, res) => {
    const errors = [];
    const normalizedUrl = new URL(req.url, `http://${req.headers.host}`);
    const originalText = normalizedUrl.pathname.slice(1);
    const params = Object.fromEntries(normalizedUrl.searchParams.entries());
    const caseName = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
    const targetCase = params.toCase;

    res.setHeader('Content-Type', 'application/json');

    if (!originalText) {
      errors.push({
        message: missingText,
      });
    };

    if (!targetCase) {
      errors.push({
        message: missingCase,
      });
    } else if (!caseName.includes(targetCase)) {
      errors.push({
        message: invalidCase,
      });
    };

    if (errors.length > 0) {
      res.statusCode = 400;
      res.statusText = 'Bad request';

      res.end(JSON.stringify({ errors }));

      return;
    };

    const {
      originalCase,
      convertedText,
    } = convertToCase(originalText, targetCase);

    res.statusCode = 200;
    res.statusText = 'OK';

    res.end(JSON.stringify({
      originalCase,
      targetCase,
      originalText,
      convertedText,
    }));
  });

  return server;
}

module.exports = { createServer };
