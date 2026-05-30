// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');

const possibleData = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function createServer() {
  const server = http.createServer((req, res) => {
    if (req.method !== 'GET') {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ message: 'Not Found' }));

      return;
    }

    const splited = req.url.slice(1).split('?');
    const params = new URLSearchParams(splited[1]);
    const newRes = params.get('toCase');
    const text = splited[0];
    const errors = [];

    if (!text) {
      errors.push({
        message:
          'Text to convert is required.' +
          ' Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!newRes) {
      errors.push({
        message:
          '"toCase" query param is required.' +
          ' Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (newRes && !possibleData.includes(newRes)) {
      errors.push({
        message:
          'This case is not supported. ' +
          'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length > 0) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ errors }));

      return;
    }

    const result = convertToCase(text, newRes);

    res.statusCode = 200;
    res.statusMessage = 'OK';
    res.setHeader('Content-Type', 'application/json');

    const newResult = {
      originalCase: result.originalCase,
      targetCase: newRes,
      originalText: text,
      convertedText: result.convertedText,
    };

    res.end(JSON.stringify(newResult));
  });

  return server;
}

module.exports = {
  createServer,
};
