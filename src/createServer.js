/* eslint-disable max-len */
const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');

const CasesType = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const createServer = () => {
  const server = http.createServer((req, res) => {
    const url = new URL(req.url, 'http://localhost:5700');
    const toCase = url.searchParams.get('toCase');
    const errors = [];

    res.setHeader('Content-Type', 'application/json');

    if (!url.pathname || url.pathname === '/') {
      errors.push({
        message:
          'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!toCase) {
      errors.push({
        message:
          '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (toCase && !CasesType.includes(toCase.toUpperCase())) {
      errors.push({
        message:
          'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length > 0) {
      res.statusCode = 400;

      res.end(
        JSON.stringify({
          errors,
        }),
      );

      return;
    }

    const validText = url.pathname.trim().slice(1);
    const validCase = toCase.toUpperCase();

    const convertedData = convertToCase(validText, validCase);

    res.statusCode = 200;

    res.end(
      JSON.stringify({
        ...convertedData,
        originalText: validText,
        targetCase: validCase,
      }),
    );
  });

  return server;
};

module.exports = {
  createServer,
};
