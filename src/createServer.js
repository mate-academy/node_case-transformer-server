const http = require('http');
const { convertToCase } = require('./convertToCase');

const createServer = () =>
  http.createServer((req, res) => {
    const normalizedURL = new URL(req.url, `http://${req.headers.host}`);
    const originalText = normalizedURL.pathname.slice(1);
    const targetCase = normalizedURL.searchParams.get('toCase');
    const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
    const errors = [];
    const errorMessages = {
      noText: 'Text to convert is required. '
      + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      noToCase: '"toCase" query param is required. '
      + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      unsupportedCase: 'This case is not supported. '
      + 'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
    };

    res.setHeader('Content-Type', 'application/json');

    if (!originalText) {
      errors.push({ message: errorMessages.noText });
    }

    if (!targetCase) {
      errors.push({ message: errorMessages.noToCase });
    } else if (!cases.includes(targetCase)) {
      errors.push({ message: errorMessages.unsupportedCase });
    };

    if (errors.length) {
      res.statusCode = 400;
      res.statusText = 'Bad request';

      res.end(JSON.stringify({ errors }));

      return;
    }

    const {
      originalCase,
      convertedText,
    } = convertToCase(originalText, targetCase);

    res.statusCode = 200;

    res.end(JSON.stringify({
      originalCase,
      targetCase,
      originalText,
      convertedText,
    }));
  });

module.exports = {
  createServer,
};
