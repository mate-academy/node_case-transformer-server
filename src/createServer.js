const http = require('http');
const url = require('url');
const { convertToCase } = require('./convertToCase/convertToCase');

const createServer = () =>
  http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const normalizedUrl = new url.URL(req.url, `http://${req.headers.host}`);

    const targetCase = normalizedUrl.searchParams.get('toCase');
    const originalText = normalizedUrl.pathname.replace('/', '');

    const errors = [];

    if (!originalText) {
      errors.push({
        message:
          // eslint-disable-next-line max-len
          'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!targetCase) {
      errors.push({
        message:
          // eslint-disable-next-line max-len
          `"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
      });
    }

    if (
      targetCase &&
      !['SNAKE', 'KEBAB', 'UPPER', 'PASCAL', 'CAMEL'].includes(targetCase)
    ) {
      errors.push({
        message: `This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.`,
      });
    }

    if (errors.length) {
      res.statusCode = 400;

      res.end(JSON.stringify({ errors }));

      return;
    }

    const { convertedText, originalCase } = convertToCase(
      originalText,
      targetCase,
    );

    if (!errors.length) {
      res.statusCode = 200;

      res.end(
        JSON.stringify({
          originalCase,
          targetCase,
          originalText,
          convertedText,
        }),
      );
    }
  });

module.exports = { createServer };
