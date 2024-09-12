'use strict';

const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');

const caseOptions = ['SNAKE', 'KEBAB', 'UPPER', 'CAMEL', 'PASCAL'];

function createServer() {
  const server = http.createServer((request, response) => {
    const [path, queryString] = request.url.split('?');

    const params = new URLSearchParams(queryString);
    const toCase = params.get('toCase');
    const textToConvert = path.slice(1);

    const errors = [];

    if (!textToConvert) {
      errors.push({
        message:
              'Text to convert is required. '
              + 'Correct request is: '
              + '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!toCase) {
      errors.push({
        message:
              '"toCase" query param is required. '
              + 'Correct request is: '
              + '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    } else if (!caseOptions.includes(toCase)) {
      errors.push({
        message:
          'This case is not supported. '
          + 'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length > 0) {
      response.writeHead(400, { 'Content-Type': 'application/json' });

      response.end(
        JSON.stringify({ errors }),
      );

      return;
    }

    const convertedInput = convertToCase(textToConvert, toCase);

    const res = {
      originalCase: convertedInput.originalCase,
      targetCase: toCase,
      originalText: textToConvert,
      convertedText: convertedInput.convertedText,
    };

    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(res));
  });

  return server;
}

module.exports = { createServer };
