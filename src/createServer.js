// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');

const createServer = () =>
  http.createServer((req, res) => {
    const { pathname, searchParams } = new URL(
      req.url,
      `http://${req.headers.host}`,
    );
    const originalText = pathname.slice(1);
    const targetCase = searchParams.get('toCase');

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
          '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    } else if (
      !['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'].includes(targetCase)
    ) {
      errors.push({
        message:
          // eslint-disable-next-line max-len
          'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    res.setHeader('Content-Type', 'application/json');

    if (errors.length) {
      res.statusCode = 400;
      res.end(JSON.stringify({ errors }));

      return;
    }

    const { convertedText, originalCase } = convertToCase(
      originalText,
      targetCase,
    );

    res.statusCode = 200;

    res.end(
      JSON.stringify({
        originalText,
        targetCase,
        originalCase,
        convertedText,
      }),
    );
  });

module.exports = {
  createServer,
};
