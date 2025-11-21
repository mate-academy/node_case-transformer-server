const http = require('http');
const { convertToCase } = require('./convertToCase');

const validCases = new Set(['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER']);

function sendResponse(res, status, data) {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

function createServer() {
  return http.createServer((req, res) => {
    const [path, queryString] = req.url.split('?');
    const params = new URLSearchParams(queryString);
    const toCase = params.get('toCase');
    const text = path.slice(1);
    const errors = [];

    if (!text) {
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

    if (toCase && !validCases.has(toCase)) {
      errors.push({
        message:
          // eslint-disable-next-line max-len
          'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length) {
      return sendResponse(res, 400, { errors });
    }

    const result = convertToCase(text, toCase);

    sendResponse(res, 200, {
      originalCase: result.originalCase,
      targetCase: toCase,
      originalText: text,
      convertedText: result.convertedText,
    });
  });
}

module.exports = { createServer };
