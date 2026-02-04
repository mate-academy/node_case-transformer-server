const http = require('http');
const { convertToCase } = require('./convertToCase');

const SUPPORTED_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const TEXT_REQUIRED_MESSAGE =
  'Text to convert is required. Correct request is: ' +
  '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';

const TO_CASE_REQUIRED_MESSAGE =
  '"toCase" query param is required. Correct request is: ' +
  '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';

const CASE_NOT_SUPPORTED_MESSAGE =
  'This case is not supported. Available cases: ' +
  'SNAKE, KEBAB, CAMEL, PASCAL, UPPER.';

function createServer() {
  return http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const parsedUrl = new URL(req.url, 'http://localhost');
    const text = parsedUrl.pathname.slice(1);
    const toCase = parsedUrl.searchParams.get('toCase');

    const errors = [];

    if (!text) {
      errors.push({ message: TEXT_REQUIRED_MESSAGE });
    }

    if (!toCase) {
      errors.push({ message: TO_CASE_REQUIRED_MESSAGE });
    }

    if (toCase && !SUPPORTED_CASES.includes(toCase)) {
      errors.push({ message: CASE_NOT_SUPPORTED_MESSAGE });
    }

    if (errors.length > 0) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.end(JSON.stringify({ errors }));
      return;
    }

    const result = convertToCase(text, toCase);

    res.statusCode = 200;
    res.statusMessage = 'OK';
    res.end(
      JSON.stringify({
        originalCase: result.originalCase,
        targetCase: toCase,
        originalText: text,
        convertedText: result.convertedText,
      }),
    );
  });
}

module.exports = {
  createServer,
};
