// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
const http = require('http');
const { convertToCase } = require('./convertToCase');
const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const createServer = () => {
  return http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const original = req.url.split('?');
    const originalText = original[0].slice(1);
    const params = new URLSearchParams(original[1]);
    const toCase = params.get('toCase');
    const errorsList = {
      errors: [],
    };

    if (!originalText) {
      errorsList.errors.push({
        // eslint-disable-next-line max-len
        message: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (toCase && !cases.includes(toCase)) {
      errorsList.errors.push({
        // eslint-disable-next-line max-len
        message: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (!toCase) {
      errorsList.errors.push({
        // eslint-disable-next-line max-len
        message: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (errorsList.errors.length !== 0) {
      res.writeHead(400, errorsList);
      res.end(JSON.stringify(errorsList));

      return;
    }

    const convertedResult = convertToCase(originalText, toCase);

    const result = {
      originalCase: convertedResult.originalCase,
      targetCase: toCase,
      originalText: original[0].slice(1),
      convertedText: convertedResult.convertedText,
    };

    res.end(JSON.stringify(result));
  });
};

module.exports = { createServer };
