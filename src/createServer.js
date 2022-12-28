// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
const http = require('http');
const { convertToCase } = require('./convertToCase');
const { errorMessages } = require('./errosMessages');

function createServer() {
  const server = http.createServer((req, res) => {
    const normalizedURL = new URL(req.url, `http://${req.headers.host}`);
    const originalText = normalizedURL.pathname.slice(1);
    const targetCase = normalizedURL.searchParams.get('toCase');
    const cases = ['SNAKE', 'KEBAB', 'UPPER', 'PASCAL', 'CAMEL'];
    const { isNotCase, isNotText, caseNotSupported } = errorMessages;

    const errors = [];

    res.setHeader('Content-Type', 'application/json');

    if (originalText.length === 0) {
      errors.push({
        message: isNotText,
      });
    }

    if (targetCase && !(cases.includes(targetCase))) {
      errors.push({
        message: caseNotSupported,
      });
    }

    if (!targetCase) {
      errors.push({
        message: isNotCase,
      });
    }

    if (errors.length > 0) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';

      res.end(JSON.stringify({ errors }));

      return;
    }

    const {
      originalCase,
      convertedText,
    } = convertToCase(originalText, targetCase);

    res.statusCode = 200;
    res.statusMessage = 'OK';

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
