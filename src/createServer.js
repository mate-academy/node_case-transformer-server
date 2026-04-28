const http = require('node:http');
const { convertToCase } = require('./convertToCase');

const ALLOWED_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
const TEXT_REQUIRED_ERROR =
  'Text to convert is required. Correct request is: ' +
  '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
const TO_CASE_REQUIRED_ERROR =
  '"toCase" query param is required. Correct request is: ' +
  '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
const UNSUPPORTED_CASE_ERROR =
  'This case is not supported. Available cases: ' +
  'SNAKE, KEBAB, CAMEL, PASCAL, UPPER.';

function createServer() {
  const server = http.createServer((req, res) => {
    const [rawPath, queryString] = req.url.split('?');
    const params = new URLSearchParams(queryString);
    const originalText = rawPath.slice(1);
    const errorMessages = [];

    const targetCase = params.get('toCase');

    if (!originalText.length) {
      errorMessages.push(TEXT_REQUIRED_ERROR);
    }

    if (targetCase === null) {
      errorMessages.push(TO_CASE_REQUIRED_ERROR);
    }

    if (targetCase !== null && !ALLOWED_CASES.includes(targetCase)) {
      errorMessages.push(UNSUPPORTED_CASE_ERROR);
    }

    res.setHeader('Content-Type', 'application/json');

    if (errorMessages.length > 0) {
      res.statusCode = 400;

      const errors = errorMessages.map((err) => ({ message: err }));

      res.end(JSON.stringify({ errors }));

      return;
    }

    res.statusCode = 200;

    const result = convertToCase(originalText, targetCase);

    res.end(JSON.stringify({ ...result, originalText, targetCase }));
  });

  return server;
}

module.exports = {
  createServer,
};
