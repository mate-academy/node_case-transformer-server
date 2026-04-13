const http = require('http');
const { convertToCase } = require('./convertToCase');

function createServer() {
  const server = http.createServer((req, res) => {
    const normalizedUrl = new URL(req.url, 'http://localhost:5700');

    const textToConvert = normalizedUrl.pathname.slice(1);
    const toCase = normalizedUrl.searchParams.get('toCase');

    const errors = {
      errors: [],
    };

    if (!textToConvert) {
      errors.errors.push({
        message: `Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
      });
    }

    if (!toCase) {
      errors.errors.push({
        message: `"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
      });
    }

    const SUPPORTED_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

    if (toCase && !SUPPORTED_CASES.includes(toCase)) {
      errors.errors.push({
        message: `This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.`,
      });
    }

    if (errors.errors.length > 0) {
      res.writeHead(400, 'Bad request', { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(errors));

      return;
    }

    const result = convertToCase(textToConvert, toCase);

    result.originalText = textToConvert;
    result.targetCase = toCase;

    res.writeHead(200, 'OK', { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(result));
  });

  return server;
}

module.exports = { createServer };
