// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');

const createServer = () => {
  const server = http.createServer((req, res) => {
    const normalizedUrl = new URL(req.url, `http:${req.headers.host}`);

    let response = {};
    const errors = [];
    const caseTypeList = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

    const textToConvert = normalizedUrl.pathname.slice(1);
    const toCase = normalizedUrl.searchParams.get('toCase');

    if (textToConvert === null || textToConvert.length === 0) {
      errors.push({
        message: 'Text to convert is required. Correct request is: '
          + '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (toCase === null || toCase.length === 0) {
      errors.push({
        message: '"toCase" query param is required. Correct request is: '
          + '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    } else if (!caseTypeList.includes(toCase)) {
      errors.push({
        message: 'This case is not supported. '
          + 'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length > 0) {
      response.errors = errors;
      res.statusCode = 404;
      res.statusText = 'Bad request';
    }

    if (textToConvert.length > 0 && caseTypeList.includes(toCase)) {
      const result = convertToCase(textToConvert, toCase);

      response = {
        targetCase: toCase,
        originalText: textToConvert,
        ...result,
      };
      res.statusCode = 200;
      res.statusText = 'OK';
    }

    res.setHeader('Content-Type', 'application/json');

    res.end(JSON.stringify(response));
  });

  return server;
};

module.exports = { createServer };
