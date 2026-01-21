/* eslint-disable max-len */
const http = require('http');
const { convertToCase } = require('./convertToCase');

const createServer = () => {
  const server = http.createServer((req, res) => {
    const { pathname, searchParams } = new URL(
      `http://localhost:5700${req.url}`,
    );
    const text = pathname.substring(1);
    const toCase = searchParams.get('toCase');
    const supportedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
    const errors = [];

    if (!text) {
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

    if (toCase && !supportedCases.includes(toCase.toUpperCase())) {
      errors.push({
        message:
          'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length !== 0) {
      respondWithError(res, 400, errors);

      return;
    }

    let converted;

    try {
      converted = convertToCase(text, toCase);
    } catch (error) {
      return respondWithError(res, 400, error.message);
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });

    res.end(
      JSON.stringify({
        originalCase: converted.originalCase,
        targetCase: toCase.toUpperCase(),
        convertedText: converted.convertedText,
        originalText: text,
      }),
    );
  });

  return server;
};

const respondWithError = (res, statusCode, messages) => {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ errors: messages }));
};

module.exports = {
  createServer,
};
