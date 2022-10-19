const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');

function createServer() {
  return http.createServer((req, res) => {
    const normalizedURL = new URL(req.url, `http://${req.headers.host}`);
    const wordToConvert = normalizedURL.pathname.slice(1);
    const typeConvent = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
    const messages = {
      badCase: 'This case is not supported. '
      + 'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      noText: 'Text to convert is required. '
      + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      noCase: '"toCase" query param is required. '
      + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
    };

    const errors = [];
    let body = {};

    const requestCase = normalizedURL.searchParams.get('toCase');

    if (!normalizedURL.search) {
      errors.push({ message: messages.noCase });
    }

    if (!typeConvent.includes(requestCase) && normalizedURL.search) {
      errors.push({ message: messages.badCase });
    } else if (typeConvent.includes(requestCase)) {
      body = convertToCase(wordToConvert, requestCase);
    }

    if (!wordToConvert) {
      errors.push({ message: messages.noText });
    }

    body.targetCase = requestCase;
    body.originalText = wordToConvert;

    res.setHeader('Content-Type', 'application/json');

    if (errors.length === 0) {
      res.statusCode = 200;
      res.end(JSON.stringify(body));
    } else {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.end(JSON.stringify({ errors }));
    }
  });
}

module.exports = { createServer };
