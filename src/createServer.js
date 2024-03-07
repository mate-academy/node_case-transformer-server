/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const { convertToCase } = require('./convertToCase/convertToCase');
const http = require('http');
const url = require('url');

function createServer() {
  return http.createServer((req, res) => {
    const normalizedUrl = new URL(req.url, `http://${req.headers.host}`);
    const pathname = normalizedUrl.pathname.slice(1);
    const queryParams = normalizedUrl.searchParams.get('toCase');

    res.setHeader('Content-Type', 'application/json');

    const errors = cathError(pathname, queryParams);

    if (errors.length === 0) {
      const { originalCase, convertedText } = convertToCase(pathname, queryParams);

      res.end(JSON.stringify({
        originalCase,
        convertedText,
        originalText: pathname,
        targetCase: queryParams,
      }));
    } else {
      res.statusCode = 400;
      res.end(JSON.stringify({ errors }));
    }
  });
};

function cathError(pathname, queryParams) {
  const errors = [];
  const cases = ['SNAKE', 'KEBAB', 'UPPER', 'PASCAL', 'CAMEL'];

  if (!pathname) {
    errors.push({ message: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' });
  }

  if (!queryParams) {
    errors.push({ message: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' });

    return errors;
  }

  if (!cases.includes(queryParams)) {
    errors.push({ message: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.' });
  }

  return errors;
}

module.exports = { createServer };
