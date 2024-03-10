const http = require('http');

const {
  convertToCase,
} = require('./convertToCase');

function createServer() {
  const server = http.createServer((req, res) => {
    const normalizedURL = new URL(req.url, `http://${req.headers.host}`);
    const errors = [];
    const convertText = normalizedURL.pathname.slice(1);
    const caseName = normalizedURL.searchParams.get('toCase');
    const caseNames = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

    if (!convertText) {
      errors.push({
        message: 'Text to convert is required.'
          + ' Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!caseName) {
      errors.push({
        message: '"toCase" query param is required.'
          + ' Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    } else if (!caseNames.includes(caseName)) {
      errors.push({
        message: 'This case is not supported.'
          + ' Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length) {
      res.writeHead(400, 'Bad request', {
        'Content-Type': 'application/json',
      });

      res.end(JSON.stringify({
        errors,
      }));
    } else {
      res.writeHead(200, 'OK', {
        'Content-Type': 'application/json',
      });

      const {
        originalCase,
        convertedText,
      } = convertToCase(convertText, caseName);
      const result = {
        originalCase,
        targetCase: caseName,
        originalText: convertText,
        convertedText,
      };

      res.end(JSON.stringify(result));
    }
  });

  return server;
}

module.exports = {
  createServer,
};
