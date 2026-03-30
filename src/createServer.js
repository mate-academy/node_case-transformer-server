const http = require('http');
const { convertToCase } = require('./convertToCase');

function sendError(res, errors) {
  res.statusCode = 400;
  res.statusMessage = 'Bad request';

  const body = { errors };

  res.end(JSON.stringify(body));
}

function createServer() {
  const validCaseValues = ['SNAKE', 'KEBAB', 'PASCAL', 'CAMEL', 'UPPER'];
  const server = http.createServer((req, res) => {
    const errors = [];

    if (req.url === '/favicon.ico') {
      res.statusCode = 204;
      res.end();

      return;
    }

    const [path, queryString] = (req.url || '').split('?');
    const text = path && path.startsWith('/') ? path.slice(1) : '';
    const params = new URLSearchParams(queryString || '');
    const toCase = params.get('toCase');

    res.setHeader('Content-Type', 'application/json');

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
    } else {
      if (!validCaseValues.includes(toCase)) {
        errors.push({
          message:
            // eslint-disable-next-line max-len
            'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
        });
      }
    }

    if (errors.length > 0) {
      sendError(res, errors);

      return;
    }

    const result = convertToCase(text, toCase);

    res.statusCode = 200;
    res.statusMessage = 'OK';

    const body = {
      originalCase: result.originalCase,
      targetCase: toCase,
      originalText: text,
      convertedText: result.convertedText,
    };

    res.end(JSON.stringify(body));
  });

  return server;
}

module.exports = { createServer };
