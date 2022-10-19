const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');

function createServer() {
  return http.createServer((req, res) => {
    const splited = req.url.split('?');
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

    let searchParams = '';
    let wordToConvert = '';
    let body = {};

    if (splited.length === 2) {
      searchParams = new URLSearchParams(splited[1]);
      wordToConvert = splited[0].slice(1);

      const requestCase = searchParams.get('toCase');

      if (typeConvent.includes(requestCase)) {
        body = convertToCase(wordToConvert, requestCase);
      } else {
        errors.push({ message: messages.badCase });
      }

      body.targetCase = requestCase;
      body.originalText = wordToConvert;
    }

    res.setHeader('Content-Type', 'application/json');

    if (splited[0] === '/') {
      errors.push({ message: messages.noText });
    }

    if (splited[1] === undefined) {
      errors.push({ message: messages.noCase });
    }

    if (errors.length === 0) {
      res.statusCode = 200;
      res.end(JSON.stringify(body));
    } else {
      res.statusCode = 400;
      res.end(JSON.stringify({ errors }));
    }
  });
}

module.exports = { createServer };
