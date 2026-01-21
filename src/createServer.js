const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');

function createServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const normalizedUrl = new URL(req.url, `http://${req.headers.host}`);
    const originalText = normalizedUrl.pathname.slice(1);
    const targetCase = normalizedUrl.searchParams.get('toCase');
    const allowedCases = ['UPPER', 'CAMEL', 'SNAKE', 'KEBAB', 'PASCAL'];
    const errors = [];

    if (!originalText) {
      errors.push({
        message: 'Text to convert is required. '
        + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!targetCase) {
      errors.push({
        message: '"toCase" query param is required. '
         + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!allowedCases.includes(targetCase) && targetCase) {
      errors.push({
        message: 'This case is not supported. '
        + 'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';

      res.end(JSON.stringify({ errors }));
    } else {
      res.statusCode = 200;

      const { originalCase,
        convertedText } = convertToCase(originalText, targetCase);

      const response = {
        originalCase: `${originalCase}`,
        targetCase: `${targetCase}`,
        originalText: `${originalText}`,
        convertedText: `${convertedText}`,
      };

      res.end(JSON.stringify(response));
    }
  });

  return server;
}

module.exports = { createServer };
