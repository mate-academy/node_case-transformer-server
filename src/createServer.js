const http = require('http');
const { detectCase } = require('./convertToCase/detectCase');
const { convertToCase } = require('./convertToCase/convertToCase');

function createServer() {
  const server = http.createServer((req, res) => {
    const normalizedURL = new URL(req.url, `http:${req.headers.host}`);

    const text = normalizedURL.pathname.toString().slice(1);
    const search = normalizedURL.searchParams.toString().split('=')[1];

    const originalCase = detectCase(text);
    const targetCase = search;
    const originalText = text;
    const convertedText = convertToCase(originalText, targetCase);
    const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
    const isCase = cases.some(item => item === targetCase);

    const errors = [];

    if (detectCase(text) === null) {
      // eslint-disable-next-line max-len
      errors.push({ message: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER' });
    };

    if (originalText.length === 0) {
      // eslint-disable-next-line max-len
      errors.push({ message: 'Text to convert is required. Correct request is: /<TEXT_TO_CONVERT>?toCase=<CASE_NAME>' });
    }

    if (!isCase) {
      // eslint-disable-next-line max-len
      errors.push({ message: 'toCase query param is required. Correct request is: /<TEXT_TO_CONVERT>?toCase=<CASE_NAME>' });
    }

    if (errors.length) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.setHeader('Content-Type', 'application/json');

      return res.end(JSON.stringify({ errors }));
    }

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');

    res.end(JSON.stringify({
      originalCase,
      targetCase,
      originalText,
      convertedText,
    }));
  });

  return server;
}

module.exports = {
  createServer,
};
