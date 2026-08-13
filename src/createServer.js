const http = require('http');
const { convertToCase } = require('./convertToCase');

const SUPPORTED_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
const REQUEST_HINT = '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
const TEXT_REQUIRED = `Text to convert is required. Correct request is: ${REQUEST_HINT}`;
const TO_CASE_REQUIRED = `"toCase" query param is required. Correct request is: ${REQUEST_HINT}`;
const CASE_NOT_SUPPORTED =
  'This case is not supported. Available cases: ' +
  'SNAKE, KEBAB, CAMEL, PASCAL, UPPER.';

function createServer() {
  return http.createServer((req, res) => {
    const [pathname, queryString = ''] = req.url.split('?');
    const text = pathname.slice(1);
    const toCase = new URLSearchParams(queryString).get('toCase');
    const errors = [];

    if (!text) {
      errors.push({ message: TEXT_REQUIRED });
    }

    if (!toCase) {
      errors.push({ message: TO_CASE_REQUIRED });
    } else if (!SUPPORTED_CASES.includes(toCase)) {
      errors.push({ message: CASE_NOT_SUPPORTED });
    }

    res.setHeader('Content-Type', 'application/json');

    if (errors.length > 0) {
      res.writeHead(400, 'Bad request');
      res.end(JSON.stringify({ errors }));

      return;
    }

    const { originalCase, convertedText } = convertToCase(text, toCase);

    res.writeHead(200, 'OK');

    res.end(
      JSON.stringify({
        originalCase,
        targetCase: toCase,
        originalText: text,
        convertedText,
      }),
    );
  });
}

module.exports = {
  createServer,
};
