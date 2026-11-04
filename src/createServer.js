// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here

const http = require('node:http');
const { convertToCase } = require('./convertToCase/convertToCase');

function createServer() {
  const server = http.createServer((req, res) => {
    const url = req.url;
    const textToConvert = url.slice(1).split('?')[0];
    const targetCase = new URLSearchParams(url.split('?')[1]).get('toCase');
    const supportedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

    const errors = [];

    if (!textToConvert) {
      errors.push({
        message:
          // eslint-disable-next-line max-len
          'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!targetCase) {
      errors.push({
        message:
          // eslint-disable-next-line max-len
          '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!supportedCases.includes(targetCase) && targetCase) {
      errors.push({
        message: `This case is not supported. Available cases: ${supportedCases.join(', ')}.`,
      });
    }

    if (errors.length > 0) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ errors }));

      return;
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });

    res.end(
      JSON.stringify({
        originalCase: convertToCase.originalCase,
        targetCase: targetCase,
        originalText: textToConvert,
        convertedText: convertToCase(textToConvert, targetCase),
      }),
    );
  });

  return server;
}

module.exports = {
  createServer,
};
