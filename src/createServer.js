const http = require('http');

const { convertToCase } = require('./convertToCase');

const SUPPORTED_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
const REQUEST_EXAMPLE =
  'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';

function sendJson(res, statusCode, statusMessage, body) {
  res.statusCode = statusCode;
  res.statusMessage = statusMessage;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(body));
}

function createServer() {
  return http.createServer((req, res) => {
    const [path, queryString = ''] = req.url.split('?');
    const text = path.slice(1);
    const params = new URLSearchParams(queryString);
    const toCase = params.get('toCase');
    const errors = [];

    if (!text) {
      errors.push({
        message: `Text to convert is required. ${REQUEST_EXAMPLE}`,
      });
    }

    if (!toCase) {
      errors.push({
        message: `"toCase" query param is required. ${REQUEST_EXAMPLE}`,
      });
    } else if (!SUPPORTED_CASES.includes(toCase)) {
      errors.push({
        message:
          'This case is not supported. Available cases: ' +
          'SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length > 0) {
      sendJson(res, 400, 'Bad request', { errors });

      return;
    }

    const { originalCase, convertedText } = convertToCase(text, toCase);

    sendJson(res, 200, 'OK', {
      originalCase,
      targetCase: toCase,
      originalText: text,
      convertedText,
    });
  });
}

module.exports = {
  createServer,
};
