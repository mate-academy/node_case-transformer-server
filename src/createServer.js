const { createServer: createHttpServer } = require('http');
const { convertToCase } = require('./convertToCase');

const supportedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function sendJson(res, statusCode, statusMessage, payload) {
  res.statusCode = statusCode;
  res.statusMessage = statusMessage;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(payload));
}

function createServer() {
  return createHttpServer((req, res) => {
    const [rawPath = '', queryString = ''] = req.url.split('?');
    const originalText = decodeURIComponent(rawPath.slice(1));
    const params = new URLSearchParams(queryString);
    const targetCase = params.get('toCase');
    const errors = [];

    if (!originalText) {
      errors.push({
        message: `Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
      });
    }

    if (!targetCase) {
      errors.push({
        message: `"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
      });
    } else if (!supportedCases.includes(targetCase)) {
      errors.push({
        message: `This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.`,
      });
    }

    if (errors.length > 0) {
      sendJson(res, 400, 'Bad request', { errors });

      return;
    }

    const { originalCase, convertedText } = convertToCase(
      originalText,
      targetCase,
    );

    sendJson(res, 200, 'OK', {
      originalCase,
      targetCase,
      originalText,
      convertedText,
    });
  });
}

module.exports = {
  createServer,
};
