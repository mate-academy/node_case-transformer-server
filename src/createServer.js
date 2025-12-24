/* eslint-disable max-len */
/* eslint-disable no-console */
// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here

const http = require('http');
const { convertToCase } = require('./convertToCase');

function createServer() {
  // const port = process.env.PORT || 5701;

  const server = http.createServer((req, res) => {
    const [pathPart, query] = req.url.split('?');
    const text = pathPart.startsWith('/')
      ? decodeURIComponent(pathPart.slice(1))
      : pathPart;
    const params = new URLSearchParams(query);
    const toCase = params.get('toCase');

    const errors = [];

    if (!text) {
      errors.push({
        message:
          'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!toCase) {
      errors.push({
        message:
          '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (
      toCase &&
      !['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'].includes(toCase)
    ) {
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

    const result = convertToCase(text, toCase);

    res.statusCode = 200;
    res.statusMessage = 'OK';
    res.setHeader('Content-Type', 'application/json');

    res.end(
      JSON.stringify({
        originalCase: result.originalCase,
        targetCase: toCase,
        originalText: text,
        convertedText: result.convertedText,
      }),
    );
  });

  // server.listen(port, () => {
  //   console.log(`Server is listening on port ${port}`);
  // });

  return server;
}

module.exports = {
  createServer,
};
