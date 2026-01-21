const http = require('http');
const { convertToCase } = require('./convertToCase');

const SUPPORTED_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function sendJson(res, statusCode, statusMessage, payload) {
  res.statusCode = statusCode;
  res.statusMessage = statusMessage;
  res.setHeader('Content-Type', 'application/json');

  res.end(JSON.stringify(payload, null, 2));
}

function validateRequest(pathname, toCase) {
  const errors = [];

  if (!pathname) {
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

  if (toCase && !SUPPORTED_CASES.includes(toCase)) {
    errors.push({
      message:
        // eslint-disable-next-line max-len
        'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
    });
  }

  return errors;
}

function createServer() {
  return http.createServer((req, res) => {
    let pathname = '';
    let toCase = '';

    try {
      const fullUrl = new URL(req.url, `http://${req.headers.host}`);

      pathname = fullUrl.pathname.slice(1);
      toCase = fullUrl.searchParams.get('toCase');
    } catch {
      sendJson(res, 400, 'Bad Request', {
        errors: [
          {
            message: 'Invalid URL',
          },
        ],
      });

      return;
    }

    const errors = validateRequest(pathname, toCase);

    if (errors.length > 0) {
      sendJson(res, 400, 'Bad Request', { errors });

      return;
    }

    try {
      const result = convertToCase(pathname, toCase);

      sendJson(res, 200, 'OK', {
        originalCase: result.originalCase,
        targetCase: toCase,
        originalText: pathname,
        convertedText: result.convertedText,
      });
    } catch {
      sendJson(res, 500, 'Internal Server Error', {
        errors: [
          {
            message: 'Something went wrong on the server.',
          },
        ],
      });
    }
  });
}

module.exports = {
  createServer,
};
