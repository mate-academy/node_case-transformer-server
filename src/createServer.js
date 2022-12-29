const http = require('http');
const { convertToCase } = require('./convertToCase');

function parseParams(req) {
  const [pathname, queryParams] = req.url.split('?');
  const text = pathname.slice(1);
  const params = new URLSearchParams(queryParams);
  const toCase = params.get('toCase');

  return { text, toCase };
}

function getErrors(text, toCase) {
  const cases = [
    'SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER',
  ];

  const ErrorMessages = Object.freeze({
    noText: 'Text to convert is required. '
      + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    noCase: '"toCase" query param is required. '
      + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    wrongCase: 'This case is not supported. '
      + 'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
  });

  const errors = [];

  if (text.length === 0) {
    errors.push({ message: ErrorMessages.noText });
  }

  if (!toCase) {
    errors.push({ message: ErrorMessages.noCase });
  }

  if (toCase && !cases.includes(toCase)) {
    errors.push({ message: ErrorMessages.wrongCase });
  }

  return errors;
}

function sendResponse(errors, res, text, toCase) {
  if (errors.length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 400;
    res.statusText = 'Bad request';

    const errorResponse = {
      errors,
    };

    res.end(JSON.stringify(errorResponse));
  } else {
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;

    const result = convertToCase(text, toCase);
    const formattedResponse = {
      originalCase: result.originalCase,
      targetCase: toCase,
      originalText: text,
      convertedText: result.convertedText,
    };

    res.end(JSON.stringify(formattedResponse));
  }
}

function createServer() {
  const server = http.createServer((req, res) => {
    const { text, toCase } = parseParams(req);
    const errors = getErrors(text, toCase);

    sendResponse(errors, res, text, toCase);
  });

  return server;
}

module.exports = { createServer };
