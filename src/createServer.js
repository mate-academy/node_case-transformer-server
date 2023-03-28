const http = require('http');
const { convertToCase } = require('./convertToCase/');

const errorMessages = {
  textReq: {
    message: 'Text to convert is required. '
    + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  },
  toCaseReq: {
    message: '"toCase" query param is required. '
    + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  },
  unknownCase: {
    message: 'This case is not supported. '
    + 'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
  },
};

const createServer = () => {
  return http.createServer((req, res) => {
    const normilizedURL = new URL(req.url, `http://${req.headers.host}`);
    const originalText = normilizedURL.pathname.slice(1);
    const targetCase = normilizedURL.searchParams.get('toCase');

    res.setHeader('Content-Type', 'application/json');

    const errors = [];
    const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

    if (!originalText) {
      errors.push(errorMessages.textReq);
    }

    if (!targetCase) {
      errors.push(errorMessages.toCaseReq);
    }

    if (targetCase && !cases.includes(targetCase)) {
      errors.push(errorMessages.unknownCase);
    }

    if (errors.length) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.end(JSON.stringify({ errors }));

      return;
    }

    const {
      originalCase,
      convertedText,
    } = convertToCase(originalText, targetCase);

    res.end(JSON.stringify({
      originalCase,
      targetCase,
      originalText,
      convertedText,
    }));
  });
};

module.exports = { createServer };
