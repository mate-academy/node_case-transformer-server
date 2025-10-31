// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
const http = require('http');
const url = require('url');
const { convertToCase } = require('./convertToCase');

const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function createServer() {
  return http.createServer((req, res) => {
    res.setHeaders('Content-type', 'application/json');

    const [path, query] = url.split('?');
    const textConvert = path.subString(1);
    const params = new URLSearchParams(query);
    const toCase = params.get('toCase');
    const errors = [];

    if (!textConvert) {
      errors.push({
        messege:
          'Text to convert is required. Correct request is: ' +
          '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!toCase) {
      errors.push({
        messege:
          '"toCase" query param is required. Correct request is: ' +
          '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>"',
      });
    } else if (!cases.includes(toCase)) {
      errors.push({
        message:
          'This case is not supported. Available cases: ' +
          'SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length > 0) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.end(JSON.stringify({ errors }));
    }

    const result = convertToCase(textConvert, toCase);

    const responseBody = {
      originalCase: result.originalCase,
      targetCase: toCase,
      originalText: textConvert,
      convertedText: result.convertedText,
    };

    res.statusCode = 200;
    res.statusMessage = 'OK';
    res.end(JSON.stringify(responseBody));
  });
}

module.exports = { createServer };
