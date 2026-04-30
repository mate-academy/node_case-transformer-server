const http = require('http');
const { convertToCase } = require('./convertToCase');

const SUPPORTED_CASES = new Set(['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER']);

const ERROR_TEXT_REQUIRED =
  'Text to convert is required. Correct request is: ' +
  '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
const ERROR_CASE_REQUIRED =
  '"toCase" query param is required. Correct request is: ' +
  '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
const ERROR_CASE_INVALID =
  'This case is not supported. Available cases: ' +
  'SNAKE, KEBAB, CAMEL, PASCAL, UPPER.';

const createServer = () => {
  return http.createServer((req, res) => {
    const [path = '', queryString = ''] = req.url.split('?');
    const text = path.startsWith('/') ? path.slice(1) : path;
    const params = new URLSearchParams(queryString);
    const toCase = params.get('toCase');

    const errors = [];

    if (!text) {
      errors.push({ message: ERROR_TEXT_REQUIRED });
    }

    if (!toCase) {
      errors.push({ message: ERROR_CASE_REQUIRED });
    }

    if (toCase && !SUPPORTED_CASES.has(toCase)) {
      errors.push({ message: ERROR_CASE_INVALID });
    }

    res.setHeader('Content-Type', 'application/json');

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
};

module.exports = {
  createServer,
};
