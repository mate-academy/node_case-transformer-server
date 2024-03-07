/* eslint-disable no-console */
/* eslint-disable max-len */
const { convertToCase } = require('./convertToCase/convertToCase');
const http = require('http');

const SUPPORTED_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function createServer() {
  return http.createServer((req, res) => {
    try {
      const normalizedUrl = new URL(req.url, `http://${req.headers.host}`);
      const pathname = normalizedUrl.pathname.slice(1);
      const queryParams = normalizedUrl.searchParams.get('toCase');

      res.setHeader('Content-Type', 'application/json');

      const errors = catchErrors(pathname, queryParams);

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
    } catch (error) {
      console.error('Error during request processing:', error);
      res.statusCode = 500;
      res.end(JSON.stringify({ errors: [{ message: 'Internal Server Error' }] }));
    }
  });
}

function catchErrors(pathname, queryParams) {
  const errors = [];

  if (!pathname) {
    errors.push({ message: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' });
  }

  if (!queryParams) {
    errors.push({ message: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' });
  } else if (!SUPPORTED_CASES.includes(queryParams.toUpperCase())) {
    errors.push({ message: `This case is not supported. Available cases: ${SUPPORTED_CASES.join(', ')}.` });
  }

  return errors;
}

module.exports = { createServer };
