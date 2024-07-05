/* eslint-disable max-len */
const http = require('http');
const CASE = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
const { convertToCase } = require('./convertToCase/convertToCase');
const createServer = () => {
  const server = http.createServer((req, res) => {
    const normalizedUrl = new URL(req.url, `http://localhost:5700`);
    const textToConvert = normalizedUrl.pathname.slice(1);
    const caseType = normalizedUrl.searchParams.get('toCase');
    const errors = [];

    if (!textToConvert) {
      errors.push({
        message:
          'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!caseType) {
      errors.push({
        message:
          '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    } else if (!CASE.includes(caseType)) {
      errors.push({
        message:
          'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ errors }));

      return;
    }

    const { originalCase, convertedText } = convertToCase(
      textToConvert,
      caseType,
    );

    res.writeHead(200, { 'Content-Type': 'application/json' });

    res.end(
      JSON.stringify({
        originalCase: originalCase,
        targetCase: caseType,
        originalText: textToConvert,
        convertedText: convertedText,
      }),
    );
  });

  return server;
};

module.exports = {
  createServer,
};
