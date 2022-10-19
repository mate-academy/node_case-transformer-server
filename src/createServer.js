// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
const http = require('http');
const { convertToCase } = require('./convertToCase');

function createServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const url = new URL(req.url, `http://${req.headers.host}`);
    const originalText = url.pathname.slice(1);
    const query = Object.fromEntries(url.searchParams.entries());
    const targetCase = query.toCase;
    const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

    const errorMessages = {
      textMissing: 'Text to convert is required. '
        + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      toCaseMissing: '"toCase" query param is required. '
        + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      invalidCase: 'This case is not supported. '
      + `Available cases: ${cases.join(', ')}.`,
    };

    const errors = [];

    if (!originalText) {
      errors.push({ message: errorMessages.textMissing });
    };

    if (!targetCase) {
      errors.push({ message: errorMessages.toCaseMissing });
    } else if (!(cases.includes(targetCase))) {
      errors.push({ message: errorMessages.invalidCase });
    };

    if (errors.length) {
      res.statusCode = 400;
      res.statusText = 'Bad request';

      res.end(JSON.stringify({
        errors,
      }));

      return;
    }

    const {
      originalCase, convertedText,
    } = convertToCase(originalText, targetCase);

    res.end(JSON.stringify({
      originalCase,
      targetCase,
      originalText,
      convertedText,
    }));
  });

  return server;
}

module.exports.createServer = createServer;
