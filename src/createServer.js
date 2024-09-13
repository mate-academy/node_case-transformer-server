/* eslint-disable no-console */
/* eslint-disable max-len */

const http = require('http');
const { convertToCase } = require('./convertToCase');

const CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function createServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const fileUrl = new URL(req.url || '', `http://${req.headers.host}`);

    const fileText = fileUrl.pathname.slice(1);
    const targetCase = fileUrl.searchParams.get('toCase');

    const errors = [];

    if (!fileText) {
      errors.push({
        message:
          'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!targetCase) {
      errors.push({
        message:
          '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (targetCase && !CASES.includes(targetCase)) {
      errors.push({
        message:
          'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';

      res.end(JSON.stringify({ errors }));
    } else {
      const result = convertToCase(fileText, targetCase);

      res.statusCode = 200;
      res.statusMessage = 'OK';

      res.end(
        JSON.stringify({
          originalCase: result.originalCase,
          targetCase,
          originalText: fileText,
          convertedText: result.convertedText,
        }),
      );
    }
  });

  return server;
}

module.exports = {
  createServer,
};
