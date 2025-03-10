// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here

// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here

const http = require('http');
const { convertToCase } = require('../src/convertToCase/convertToCase');

function createServer() {
  const server = http.createServer((req, res) => {
    const url = new URL(req.url, 'http://${req.headers.host');
    const toCase = url.searchParams.get('toCase');
    const textToConvert = url.pathname.slice(1);
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
    } else if (
      !['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'].includes(toCase)
    ) {
      errors.push({
        message:
          // eslint-disable-next-line max-len
          'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length > 0) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify({ errors }));

      return res.end();
    }

    const result = convertToCase(textToConvert, toCase);

    const response = {
      originalText: textToConvert,
      targetCase: toCase,
      originalCase: result.originalCase,
      convertedText: result.convertedText,
    };

    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(JSON.stringify(response));
  });

  return server;
}

module.exports = {
  createServer,
};
