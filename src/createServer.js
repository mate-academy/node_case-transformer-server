/* eslint-disable max-len */
// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
const http = require('http');
const convertToCase = require('./convertToCase').convertToCase;

function createServer() {
  const server = http.createServer();

  server.on('request', (req, res) => {
    const reqUrlArr = req.url.split('?');
    const textToConvert = reqUrlArr[0].slice(1);
    const params = new URLSearchParams(reqUrlArr[1]);
    const toCase = params.get('toCase');
    const errors = [];

    if (!textToConvert) {
      errors.push({
        message: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!toCase) {
      errors.push({
        message: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    } else if (!['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'].includes(toCase)) {
      errors.push({
        message: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    res.setHeader('Content-Type', 'application/json');

    if (errors.length) {
      res.statusCode = 400;
      res.statusTex = 'Bad request';

      res.end(JSON.stringify({ errors }));
    } else {
      const data = {
        ...convertToCase(textToConvert, toCase),
        originalText: textToConvert,
        targetCase: toCase,
      };

      res.end(JSON.stringify(data));
    }
  });

  return server;
};

module.exports = { createServer };
