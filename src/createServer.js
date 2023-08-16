/* eslint-disable object-shorthand */
/* eslint-disable max-len */
const http = require('http');
const { convertToCase } = require('./convertToCase');

const createServer = () => {
  const supportedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

  const server = http.createServer((req, res) => {
    const normalizeUrl = new URL(req.url, `http://${req.headers.host}`);

    const text = normalizeUrl.pathname.slice(1);
    const getCase = normalizeUrl.searchParams.get('toCase');

    if (!text || !getCase || !supportedCases.includes(getCase)) {
      const errors = [];

      if (!text) {
        errors.push({
          message: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
        });
      }

      if (!getCase) {
        errors.push({
          message: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
        });
      } else if (!supportedCases.includes(getCase)) {
        errors.push({
          message: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
        });
      }

      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ errors }));

      return;
    }

    const convertedText = convertToCase(text, getCase);

    const response = {
      originalCase: convertedText.originalCase,
      targetCase: getCase,
      originalText: text,
      convertedText: convertedText.convertedText,
    };

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(response));
  });

  return server;
};

module.exports = { createServer };
