// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
const http = require('node:http');
const { CASES } = require('./Cases');
const { convertToCase } = require('./convertToCase/convertToCase');

// const { detectCase } = require('./convertToCase/detectCase');

function createServer() {
  const server = http.createServer((req, res) => {
    const [path, queryString] = req.url.split('?');
    const params = new URLSearchParams(queryString || '');
    const toCase = params.get('toCase');
    const textToConvert = path.slice(1);

    const errors = [];

    if (!textToConvert) {
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
    } else if (!CASES[toCase]) {
      errors.push({
        message:
          'This case is not supported. Available cases: ' +
          Object.keys(CASES).join(', ') +
          '.',
      });
    }

    res.setHeader('Content-Type', 'application/json');

    if (errors.length > 0) {
      res.statusCode = 400;
      res.statusMessage = 'Bad Request';
      res.end(JSON.stringify({ errors }));

      return;
    }

    const { originalCase, convertedText } = convertToCase(
      textToConvert,
      toCase,
    );

    res.statusCode = 200;

    res.end(
      JSON.stringify({
        originalText: textToConvert,
        originalCase,
        targetCase: toCase,
        convertedText,
      }),
    );
  });

  return server;
}

module.exports = { createServer };
