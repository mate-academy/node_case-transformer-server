/* eslint-disable max-len */
const http = require('http');
const { convertToCase } = require('./convertToCase');

function createServer() {
  return http.createServer((req, res) => {
    const normalizedURL = new URL(req.url, `http://${req.headers.host}`);
    const pathname = normalizedURL.pathname.slice(1);
    const params = normalizedURL.searchParams.get('toCase');
    const supportedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

    if (!pathname && !params) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');

      res.end(JSON.stringify({
        errors: [
          {
            message: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
          },
          {
            message: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
          },
        ],
      }));

      return;
    }

    if (!pathname && !supportedCases.includes(params)) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');

      res.end(JSON.stringify({
        errors: [
          {
            message: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
          },
          {
            message: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
          },
        ],
      }));

      return;
    }

    if (!params) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');

      res.end(JSON.stringify({
        errors: [
          {
            message: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
          },
        ],
      }));

      return;
    }

    if (!supportedCases.includes(params)) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');

      res.end(JSON.stringify({
        errors: [
          {
            message: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
          },
        ],
      }));

      return;
    }

    if (!pathname) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');

      res.end(JSON.stringify({
        errors: [
          {
            message: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
          },
        ],
      }));

      return;
    }

    const result = convertToCase(pathname, params);
    const originalCase = result.originalCase;
    const convertedText = result.convertedText;

    res.writeHead(200, { 'Content-Type': 'application/json' });

    res.end(JSON.stringify({
      originalCase,
      targetCase: params,
      originalText: pathname,
      convertedText,
    }));
  });
}

module.exports = {
  createServer,
};
