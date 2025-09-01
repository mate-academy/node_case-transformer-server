const http = require('node:http');
const { convertToCase } = require('./convertToCase/index');

function createServer() {
  return http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const originalText = url.pathname.slice(1);
    const toCaseParam = url.searchParams.get('toCase');
    const targetCase = toCaseParam ? toCaseParam.toUpperCase() : '';

    const errors = [];

    if (!originalText) {
      errors.push({
        message:
          // eslint-disable-next-line max-len
          'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!toCaseParam) {
      errors.push({
        message:
          // eslint-disable-next-line max-len
          '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    } else if (
      targetCase !== 'SNAKE' &&
      targetCase !== 'KEBAB' &&
      targetCase !== 'CAMEL' &&
      targetCase !== 'PASCAL' &&
      targetCase !== 'UPPER'
    ) {
      errors.push({
        message:
          // eslint-disable-next-line max-len
          'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length > 0) {
      return sendError(res, 400, errors);
    }

    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;

    const { originalCase, convertedText } = convertToCase(
      originalText,
      targetCase,
    );

    const result = {
      originalCase,
      targetCase,
      originalText,
      convertedText,
    };

    res.end(JSON.stringify(result));
  });
}

function sendError(res, statusCode, errors) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ errors }));
}

module.exports = {
  createServer,
};
