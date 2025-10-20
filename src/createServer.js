/* eslint-disable no-console */
const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');

const createServer = () => {
  const server = http.createServer((req, res) => {
    const normalizedURL = new URL(
      req.url,
      `http://${req.headers.host}`,
    );

    res.setHeader('Content-Type', 'application/json');

    const words = normalizedURL.pathname.slice(1);
    const newCase = normalizedURL.searchParams.get('toCase');
    const caseNames = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
    const errors = [];

    if (!words) {
      errors.push({ message: 'Text to convert is required. Correct '
        + 'request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' });
    }

    if (!newCase) {
      errors.push({ message: '"toCase" query param is required. Correct '
        + 'request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' });
    }

    if (!(caseNames.includes(newCase)) && newCase?.length > 1) {
      errors.push({ message: 'This case is not supported. Available cases: '
          + 'SNAKE, KEBAB, CAMEL, PASCAL, UPPER.' });
    }

    if (errors.length) {
      res.statusCode = 400;

      res.end(JSON.stringify({ errors }));

      return;
    }

    const { convertedText, originalCase } = convertToCase(words, newCase);

    res.statusCode = 200;

    res.end(JSON.stringify({
      originalCase,
      targetCase: newCase,
      originalText: words,
      convertedText,
    }));
  });

  return server;
};

module.exports = {
  createServer,
};
