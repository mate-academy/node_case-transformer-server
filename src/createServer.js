/* eslint-disable no-useless-escape */
const http = require('node:http');
const { convertToCase } = require('./convertToCase');

const casesToUse = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function createServer() {
  const server = http.createServer((req, res) => {
    const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
    const errors = [];

    const caseName = parsedUrl.searchParams.get('toCase');
    const text = parsedUrl.pathname.slice(1);

    if (!text) {
      errors.push({
        message:
          // eslint-disable-next-line max-len
          'Text to convert is required. Correct request is: \"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>\".',
      });
    }

    if (!caseName) {
      errors.push({
        message:
          // eslint-disable-next-line max-len
          '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (caseName && !casesToUse.includes(caseName)) {
      errors.push({
        message:
          // eslint-disable-next-line max-len
          'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length > 0) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ errors: errors }));

      return;
    }

    const result = convertToCase(text, caseName);

    res.statusCode = 200;
    res.statusMessage = 'OK';
    res.setHeader('Content-Type', 'application/json');

    res.end(
      JSON.stringify({
        originalCase: result.originalCase,
        targetCase: caseName,
        originalText: text,
        convertedText: result.convertedText,
      }),
    );
  });

  return server;
}

module.exports = {
  createServer,
};
