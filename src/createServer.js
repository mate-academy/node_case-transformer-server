/* eslint-disable max-len */
const http = require('http');
const { convertToCase } = require('./convertToCase');

const ERROR_MESSAGES = {
  NO_TEXT:
    'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  NO_CASE:
    '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  INVALID_CASE:
    'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
};

const VALID_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function validateRequest(text, caseName) {
  const errors = [];

  if (text.length === 0) {
    errors.push({
      message: ERROR_MESSAGES.NO_TEXT,
    });
  }

  if (!caseName) {
    errors.push({
      message: ERROR_MESSAGES.NO_CASE,
    });
  } else if (!VALID_CASES.includes(caseName.toUpperCase())) {
    errors.push({
      message: ERROR_MESSAGES.INVALID_CASE,
    });
  }

  return errors;
}

function transformCase(text, caseName) {
  const result = convertToCase(text, caseName);

  result.targetCase = caseName;
  result.originalText = text;

  return result;
}

function createServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const url = new URL(req.url || '', `http://${req.headers.host}`);
    const text = url.pathname.slice(1).split('/')[0];
    const caseName = url.searchParams.get('toCase');
    const errors = validateRequest(text, caseName);

    if (errors.length > 0) {
      res.statusCode = 400;
      res.end(JSON.stringify({ errors }));

      return;
    }

    try {
      const result = transformCase(text, caseName);

      res.statusCode = 200;
      res.end(JSON.stringify(result));
    } catch (e) {
      res.statusCode = 400;

      res.end(
        JSON.stringify({
          errors: [{ message: ERROR_MESSAGES.INVALID_CASE }],
        }),
      );
    }
  });

  return server;
}

module.exports = {
  createServer,
};
