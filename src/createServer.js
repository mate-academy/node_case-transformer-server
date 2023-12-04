const http = require('http');
const { convertToCase } = require('./convertToCase');

const PORT = process.env.PORT || 3000;

const errorMessages = {
  noText: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  noToCase: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  noInToCase: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
};

const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const createServer = () => {
  return http.createServer((req, res) => {
    const myURL = new URL(req.url, `http://localhost:${PORT}`);
    const targetCase = myURL.searchParams.get('toCase');
    const originalText = myURL.pathname.slice(1);
    const errors = [];

    res.setHeader('Content-Type', 'application/json');

    if (!originalText) {
      errors.push({
        message: errorMessages.noText,
      });
    }

    if (!targetCase) {
      errors.push({
        message: errorMessages.noToCase,
      });
    } else if (!cases.includes(targetCase)) {
      errors.push({
        message: errorMessages.noInToCase,
      });
    }

    if (errors.length) {
      res.statusCode = 400;
      res.end(JSON.stringify({ errors }));

      return;
    }

    const { originalCase, convertedText } = convertToCase(originalText, targetCase);

    res.statusCode = 200;
    res.statusMessage = 'Ok';
    res.end(JSON.stringify({
      originalCase,
      targetCase,
      originalText,
      convertedText,
    }));
  })
};

module.exports = { createServer }
