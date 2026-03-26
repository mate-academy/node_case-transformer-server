const http = require('http');
const { convertToCase } = require('./convertToCase');

const SUPPORTED_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
const JSON_CONTENT_TYPE = 'application/json';
const CORRECT_REQUEST_EXAMPLE = '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';

function sendJson(res, statusCode, statusMessage, payload) {
  res.writeHead(statusCode, statusMessage, {
    'Content-Type': JSON_CONTENT_TYPE,
  });

  res.end(JSON.stringify(payload));
}

function createServer() {
  return http.createServer((req, res) => {
    const [pathname = '', queryString = ''] = req.url.split('?');
    const originalText = pathname.slice(1);
    const params = new URLSearchParams(queryString);
    const toCase = params.get('toCase');
    const errors = [];

    if (!originalText) {
      errors.push({
        message: `Text to convert is required. Correct request is: ${CORRECT_REQUEST_EXAMPLE}`,
      });
    }

    if (!toCase) {
      errors.push({
        message: `"toCase" query param is required. Correct request is: ${CORRECT_REQUEST_EXAMPLE}`,
      });
    } else if (!SUPPORTED_CASES.includes(toCase)) {
      errors.push({
        message: [
          'This case is not supported.',
          'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
        ].join(' '),
      });
    }

    if (errors.length > 0) {
      sendJson(res, 400, 'Bad request', { errors });

      return;
    }

    const { originalCase, convertedText } = convertToCase(originalText, toCase);

    sendJson(res, 200, 'OK', {
      originalCase,
      targetCase: toCase,
      originalText,
      convertedText,
    });
  });
}

module.exports = {
  createServer,
};
