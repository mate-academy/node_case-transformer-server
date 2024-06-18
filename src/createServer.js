const http = require('http');
const path = require('path');
const { convertToCase } = require('./convertToCase/convertToCase.js');

const createServer = () => {
  const server = http.createServer((req, res) => {
    const normalizedURL = new URL(
      path.normalize(req.url),
      `http://${req.headers.host}`,
    );
    const pathName = normalizedURL.pathname.slice(1);
    const toCase = normalizedURL.searchParams.get('toCase');
    const errors = [];

    if (!pathName) {
      errors.push({
        message:
          // eslint-disable-next-line max-len
          'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!toCase) {
      errors.push({
        message:
          // eslint-disable-next-line max-len
          '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    const SUPPORTED_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

    if (toCase && !SUPPORTED_CASES.includes(toCase)) {
      errors.push({
        message:
          // eslint-disable-next-line max-len
          'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length) {
      res.statusCode = 400;
      res.statusText = 'Bad Request';
      res.setHeader('Content-Type', 'application/json');

      return res.end(JSON.stringify({ errors }));
    }

    const result = convertToCase(pathName, toCase);

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.statusText = 'OK';

    return res.end(
      JSON.stringify({
        originalCase: result.originalCase,
        targetCase: toCase,
        originalText: pathName,
        convertedText: result.convertedText,
      }),
    );
  });

  return server;
};

module.exports = {
  createServer,
};
