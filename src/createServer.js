// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');

const createServer = () => {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const normalizedUrl = new URL(req.url, `http://${req.headers.host}`);
    const availableCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
    const requestText = normalizedUrl.pathname.slice(1);
    const requestCase = normalizedUrl.searchParams.get('toCase');

    const errorArray = [];

    if (!requestText) {
      // eslint-disable-next-line max-len
      errorArray.push({ message: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' });
    }

    if (!requestCase) {
      // eslint-disable-next-line max-len
      errorArray.push({ message: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' });
    } else if (!availableCases.includes(requestCase)) {
      // eslint-disable-next-line max-len
      errorArray.push({ message: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.' });
    }

    if (errorArray.length) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.end(JSON.stringify({ errors: errorArray }));
    } else {
      res.statusCode = 200;

      const result = convertToCase(requestText, requestCase);

      res.end(JSON.stringify({
        convertedText: result.convertedText,
        originalCase: result.originalCase,
        originalText: requestText,
        targetCase: requestCase,
      }));
    }
  });

  return server;
};

module.exports = {
  createServer,
};
