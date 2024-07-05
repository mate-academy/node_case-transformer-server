/* eslint-disable max-len */
const http = require('http');
const CASE = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
const { convertToCase } = require('./convertToCase/convertToCase');

const createServer = () => {
  const server = http.createServer((req, res) => {
    const normalizedUrl = new URL(req.url, `http://localhost:5700`);
    const textToConvert = normalizedUrl.pathname.slice(1);
    const caseType = normalizedUrl.searchParams.get('toCase');

    let statusCode = 200;
    let resolve = '';

    if (!textToConvert) {
      statusCode = 400;

      resolve = JSON.stringify({
        error: 'Bad Request',
        message:
          'Text to convert is required. Correct request is: /<TEXT_TO_CONVERT>?toCase=<CASE_NAME>',
      });
    } else if (!caseType) {
      statusCode = 400;

      resolve = JSON.stringify({
        error: 'Bad Request',
        message:
          'toCase query param is required. Correct request is: /<TEXT_TO_CONVERT>?toCase=<CASE_NAME>',
      });
    } else if (!CASE.includes(caseType)) {
      statusCode = 400;

      resolve = JSON.stringify({
        error: 'Bad Request',
        message:
          'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    } else {
      const { originalCase, convertedText } = convertToCase(
        textToConvert,
        caseType,
      );

      resolve = JSON.stringify({
        originalCase: originalCase,
        targetCase: caseType,
        originalText: textToConvert,
        convertedText: convertedText,
      });
    }

    res.writeHead(statusCode, { 'Content-Type': 'application/json' });

    res.end(resolve);
  });

  return server;
};

module.exports = {
  createServer,
};
