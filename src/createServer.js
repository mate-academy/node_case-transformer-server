const { convertToCase } = require('./convertToCase/convertToCase');
const http = require('http');

const SUPPORTED_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function createServer() {
  const server = http.createServer((req, res) => {
    const { pathname, searchParams } = new URL(req.url, `http://${req.headers.host}`);
    const originalText = pathname.slice(1);
    const targetCase = searchParams.get('toCase');

    const errors = [];

    if (!originalText) {
      errors.push({ message: 'Text to convert is required. '
        + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' });
    }

    if (!targetCase) {
      errors.push({ message: '"toCase" query param is required. '
        + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' });
    } else if (!SUPPORTED_CASES.includes(targetCase)) {
      errors.push({ message: 'This case is not supported. '
        + 'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.' });
    }

    if (errors.length) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ errors }));

      return;
    }

    const converted = convertToCase(originalText, targetCase);

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ ...converted, targetCase, originalText }));
  });

  return server;
}

module.exports = { createServer };
