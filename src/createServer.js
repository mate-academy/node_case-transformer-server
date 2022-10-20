const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');

function createServer() {
  const server = http.createServer((req, res) => {
    const normalizedURl = new URL(req.url, `http://${req.headers.host}`);

    const originalText = normalizedURl.pathname.replace('/', '');

    const targetCase = normalizedURl.searchParams.get('toCase');

    const errors = [];

    const allowedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

    const noTextToConvertMessage = 'Text to convert is required.'
    + ' Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';

    const emptyCaseMessage = '"toCase" query param is required. '
    + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';

    const invalidCaseMessage = 'This case is not supported. '
    + 'Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.';

    if (!originalText) {
      errors.push({
        message: noTextToConvertMessage,
      });
    }

    if (!targetCase) {
      errors.push({
        message: emptyCaseMessage,
      });
    } else if (!allowedCases.includes(targetCase)) {
      errors.push({
        message: invalidCaseMessage,
      });
    }

    res.setHeader('Content-Type', 'application/json');

    if (errors.length) {
      res.statusCode = 400;
      res.statusText = 'Bad request';

      res.end(JSON.stringify({ errors }));
    } else {
      res.statusCode = 200;

      const { originalCase, convertedText } = convertToCase(
        originalText,
        targetCase,
      );

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
