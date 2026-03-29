// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
/* eslint-disable max-len */
const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');

function createServer() {
  const server = http.createServer((req, res) => {
    const myUrl = new URL(req.url, `http://${req.headers.host}`);
    const urlPath = myUrl.pathname.slice(1);
    const urlCase = myUrl.searchParams.get('toCase');
    const caseFunctions = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
    const errors = [];

    if (!urlPath) {
      errors.push({
        message:
          'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!urlCase) {
      errors.push({
        message:
          '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (urlCase && !caseFunctions.includes(urlCase)) {
      errors.push({
        message:
          'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length > 0) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ errors }));

      return;
    }

    const result = convertToCase(urlPath, urlCase);

    res.statusCode = 200;
    res.statusMessage = 'OK';
    res.setHeader('Content-Type', 'application/json');

    res.end(
      JSON.stringify({
        originalCase: result.originalCase,
        targetCase: urlCase,
        originalText: urlPath,
        convertedText: result.convertedText,
      }),
    );
  });

  return server;
}

function listen(server) {
  return new Promise((resolve, reject) => {
    server.listen(0, () => resolve(server.address().port));
    server.on('error', reject);
  });
}

module.exports = { createServer, listen };
