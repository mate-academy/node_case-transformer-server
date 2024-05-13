/* eslint-disable max-len */
const http = require('http');
const { convertToCase } = require('./convertToCase');

const CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const STATUS_CODE = {
  OK: 200,
  ERROR: 400,
};

const ERROR_MESSAGES = {
  TO_CASE_REQUIRED: `"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
  TEXT_REQUIRED: `Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
  CASE_NOT_SUPPORTED: `This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.`,
};

function validateRequest(targetCase, originalText) {
  const errors = [];

  if (!targetCase) {
    errors.push({ message: ERROR_MESSAGES.TO_CASE_REQUIRED });
  }

  if (!originalText) {
    errors.push({ message: ERROR_MESSAGES.TEXT_REQUIRED });
  }

  if (targetCase && !CASES.includes(targetCase.toUpperCase())) {
    errors.push({ message: ERROR_MESSAGES.CASE_NOT_SUPPORTED });
  }

  return errors;
}

function createServer() {
  const server = http.createServer((req, res) => {
    const urlParts = req.url.slice(1).split('?');
    const originalText = urlParts[0];
    const targetCase = new URLSearchParams(urlParts[1]).get('toCase');
    const errors = validateRequest(targetCase, originalText);

    res.setHeader('Content-Type', 'application/json');

    if (errors.length) {
      res.statusCode = STATUS_CODE.ERROR;
      res.end(JSON.stringify({ errors }));

      return;
    }

    const { originalCase, convertedText } = convertToCase(
      originalText,
      targetCase,
    );

    res.statusCode = STATUS_CODE.OK;

    res.end(
      JSON.stringify({
        originalCase,
        targetCase: targetCase,
        originalText,
        convertedText,
      }),
    );
  });

  return server;
}

module.exports = { createServer };
