// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
/* eslint-disable max-len */

const http = require('http');
const { convertToCase } = require('./convertToCase');

function createServer() {
  const server = http.createServer((req, res) => {
    // readingURL
    console.log('req.url: ', req.url);

    const [pathname, queryString] = req.url.split('?');
    const text = pathname.slice(1);

    const params = new URLSearchParams(queryString);
    const toCase = params.get('toCase');

    const errors = [];

    const availableCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

    if (text === '') {
      errors.push({
        message: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (toCase === null) {
      errors.push({
        message: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (
      toCase !== null
      && !availableCases.includes(toCase)
    ) {
      errors.push({
        message: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    if (errors.length > 0) {
      res.setHeader('Content-Type', 'application/json');

      res.statusCode = 400;
      res.statusText = 'Bad request';

      const errorResponse = {
        errors,
      };

      console.log('Result: ', errorResponse);

      res.end(JSON.stringify(errorResponse));

      return;
    }

    const result = convertToCase(text, toCase);

    res.setHeader('Content-Type', 'application/json');

    res.statusCode = 200;

    const formattedResponse = {
      convertedText: result.convertedText,
      originalCase: result.originalCase,
      originalText: text,
      targetCase: toCase,
    };

    res.end(JSON.stringify(formattedResponse));
  });

  server.listen(8080, () => {
    console.log(`Server is running on http://localhost:${8080}`);
  });

  return server;
}

createServer();

// module.exports = {
//   createServer,
// };
