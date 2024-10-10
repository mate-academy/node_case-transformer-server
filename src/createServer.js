/* eslint-disable max-len */
const http = require('http');
const { convertToCase } = require('./convertToCase');

function validateRequest(originalText, targetCase) {
  const errors = [];

  if (!originalText) {
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
  } else if (
    !['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'].includes(targetCase)
  ) {
    errors.push({
      message:
        'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
    });
  }

  return errors;
}

function parseUrl(req) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const originalText = url.pathname.slice(1);
  const targetCase = url.searchParams.get('toCase');

  return { originalText, targetCase };
}

function sendErrorResponse(res, errors) {
  res.statusCode = 400;
  res.statusMessage = 'Bad request';
  res.end(JSON.stringify({ errors }));
}

function sendSuccessResponse(
  res,
  originalText,
  originalCase,
  targetCase,
  convertedText,
) {
  res.statusCode = 200;
  res.statusMessage = 'OK';

  res.end(
    JSON.stringify({
      originalCase,
      targetCase,
      originalText,
      convertedText,
    }),
  );
}

function handleRequest(req, res) {
  res.setHeader('Content-Type', 'application/json');

  const { originalText, targetCase } = parseUrl(req);
  const errors = validateRequest(originalText, targetCase);

  if (errors.length) {
    sendErrorResponse(res, errors);

    return;
  }

  try {
    const { originalCase, convertedText } = convertToCase(
      originalText,
      targetCase,
    );

    sendSuccessResponse(
      res,
      originalText,
      originalCase,
      targetCase,
      convertedText,
    );
  } catch (error) {
    res.statusCode = 500;
    res.statusMessage = 'Internal Server Error';

    res.end(
      JSON.stringify({
        message: 'An error occurred during text conversion.',
        error: error.message,
      }),
    );
  }
}

// Funkcja tworząca serwer
function createServer() {
  const server = http.createServer(handleRequest);

  return server;
}

module.exports = {
  createServer,
};
