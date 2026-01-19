/* eslint-disable max-len */
const http = require('http');
const { convertToCase } = require('./convertToCase');

const ERROR_MESSAGES = {
  NO_TEXT:
    'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  NO_CASE:
    '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  WRONG_CASE:
    'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
};

const SUPPORTED_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function createServer() {
  const server = http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const textToConvert = url.pathname.replace('/', '');
    const caseType = url.searchParams.get('toCase');

    res.setHeader('Content-Type', 'application/json');

    const validationErrors = validateRequest(textToConvert, caseType);

    if (validationErrors.length) {
      return handleError(res, validationErrors);
    }

    try {
      const { originalCase, convertedText } = convertToCase(
        textToConvert,
        caseType,
      );

      handleSuccess(res, textToConvert, originalCase, caseType, convertedText);
    } catch (error) {
      handleInternalError(res);
    }
  });

  return server;
}

function validateRequest(textToConvert, caseType) {
  const errors = [];

  if (!textToConvert) {
    errors.push({ message: ERROR_MESSAGES.NO_TEXT });
  }

  if (!caseType) {
    errors.push({ message: ERROR_MESSAGES.NO_CASE });
  }

  if (caseType && !SUPPORTED_CASES.includes(caseType.toUpperCase())) {
    errors.push({ message: ERROR_MESSAGES.WRONG_CASE });
  }

  return errors;
}

function handleError(res, errors) {
  res.statusCode = 400;
  res.statusMessage = 'Bad request';
  res.end(JSON.stringify({ errors }));
}

function handleSuccess(
  res,
  originalText,
  originalCase,
  targetCase,
  convertedText,
) {
  res.statusCode = 200;
  res.statusMessage = 'OK';

  const result = {
    originalCase,
    targetCase,
    originalText,
    convertedText,
  };

  res.end(JSON.stringify(result));
}

function handleInternalError(res) {
  res.statusCode = 500;
  res.statusMessage = 'Internal Server Error';

  res.end(
    JSON.stringify({
      errors: [
        {
          message: 'An unexpected error occurred. Please try again later.',
        },
      ],
    }),
  );
}

module.exports = { createServer };
