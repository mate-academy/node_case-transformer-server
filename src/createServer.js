/* eslint-disable prettier/prettier */
const http = require('http');
const url = require('url');
const { convertToCase } = require('./convertToCase/convertToCase.js');

const createServer = () => {
  return http.createServer((req, res) => {
    const normalizedUrl = new url.URL(
      req.url,
      `http://${req.headers.host}`,
    );

    const toCase = normalizedUrl.searchParams.get('toCase');
    const path = normalizedUrl.pathname.slice(1);

    if (!toCase && path === '') {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');

      res.end(
        JSON.stringify({
          errors: [
            {
              message: '"toCase" query param is required. '
              + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
            },
            {
              message: 'Text to convert is required. Correct '
              + 'request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
            },
          ],
        }),
      );

      return;
    }

    if (!toCase) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');

      res.end(
        JSON.stringify({
          errors: [
            {
              message: '"toCase" query param is required. '
              + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
            },
          ],
        }),
      );

      return;
    }

    if (!['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'].includes(toCase)
    && path === '') {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');

      res.end(
        JSON.stringify({
          errors: [
            {
              message: 'Text to convert is required. Correct '
              + 'request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
            },
            {
              message: 'This case is not supported. Available '
              + 'cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
            },
          ],
        }),
      );

      return;
    }

    if (path === '') {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');

      res.end(
        JSON.stringify({
          errors: [
            {
              message: 'Text to convert is required. Correct '
              + 'request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
            },
          ],
        }),
      );

      return;
    }

    if (!['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'].includes(toCase)) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');

      res.end(
        JSON.stringify({
          errors: [
            {
              message: 'This case is not supported. Available '
              + 'cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
            },
          ],
        }),
      );

      return;
    }

    try {
      const result = convertToCase(path, toCase);

      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');

      res.end(JSON.stringify({

        originalCase: result.originalCase,
        targetCase: toCase,
        originalText: path,
        convertedText: result.convertedText,

      }));
    } catch (error) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');

      res.end(
        JSON.stringify({
          error: 'An error occurred while processing the request.',
        }),
      );
    }
  });
};

module.exports = {
  createServer,
};
