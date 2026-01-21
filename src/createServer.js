// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');

function createServer() {
  const server = http.createServer((req, res) => {
    if (req.method !== 'GET') {
      res.writeHead(405, 'Method Not Allowed', {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({ message: 'Only GET method is supported' }));

      return;
    }

    const availableCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

    const [path, queryString] = req.url.split('?');
    const params = new URLSearchParams(queryString || '');
    const toCase = params.get('toCase');
    const text = decodeURIComponent((path || '/').slice(1));

    const errors = [];

    if (!text) {
      errors.push({
        message:
          'Text to convert is required. Correct request is: ' +
          '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!toCase) {
      errors.push({
        message:
          '"toCase" query param is required. ' +
          'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (toCase && !availableCases.includes(toCase)) {
      errors.push({
        message:
          'This case is not supported.' +
          ' Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length > 0) {
      res.writeHead(400, 'Bad request', { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ errors }));

      return;
    }

    const convertedText = convertToCase(text, toCase);

    res.writeHead(200, 'OK', { 'Content-Type': 'application/json' });

    res.end(
      JSON.stringify({
        ...convertedText,
        targetCase: toCase,
        originalText: text,
      }),
    );
  });

  return server;
}

module.exports = {
  createServer,
};
