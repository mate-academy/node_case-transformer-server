const http = require('http');
const { convertToCase } = require('./convertToCase');

const caseTypes = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
const ERROR_MESSAGES = {
  hasNotText: 'Text to convert is required.'
  + ' Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  hasNoTargetCase: '"toCase" query param is required.'
  + ' Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  invalidTargetCase: 'This case is not supported.'
  + ' Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
};

function createServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const normalisedURL = new URL(req.url, `HTTP://${req.headers.host}`);
    const originalText = req.url.slice(1).split('?')[0];
    const targetCase = normalisedURL.searchParams.get('toCase');

    const errors = [];

    if (!originalText) {
      errors.push({ message: ERROR_MESSAGES.hasNotText });
    }

    if (!targetCase) {
      errors.push({ message: ERROR_MESSAGES.hasNoTargetCase });
    } else if (!caseTypes.includes(targetCase)) {
      errors.push({ message: ERROR_MESSAGES.invalidTargetCase });
    }

    if (errors.length) {
      res.statusCode = 404;
      res.message = 'Bad request';
      res.end(JSON.stringify({ errors }));
    } else {
      const {
        originalCase,
        convertedText,
      } = convertToCase(originalText, targetCase);

      res.statusCode = 200;
      res.message = 'OK';

      res.end(JSON.stringify({
        originalCase,
        targetCase,
        originalText,
        convertedText,
      }));
    }
  });

  return server;
}

module.exports = { createServer };
