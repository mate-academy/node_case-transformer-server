// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
/* eslint-disable max-len */
const http = require('http');
const { convertToCase } = require('./convertToCase');

function createServer() {
  const server = http.createServer((req, res) => {
    // /someText?toCase=SNAKE
    // /?toCase=SNAKE
    console.log('req.url: ', req.url);

    // reading URL
    const [pathname, queryParams] = req.url.split('?');
    const text = pathname.slice(1);
    const params = new URLSearchParams(queryParams);
    const toCase = params.get('toCase');

    const errors = [];

    if (text.length === 0) {
      errors.push({
        message: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (errors.length > 0) {
      const errorResponse = {
        errors,
      };

      res.setHeader('Content-Type', 'application/json');

      res.statusCode = 400;
      res.statusText = 'Bad request';

      // console.log('errorResponse: ', errorResponse);

      res.end(JSON.stringify(errorResponse));

      return;
    }

    const result = convertToCase(text, toCase);

    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;

    const formattedResponse = {
      originalCase: result.originalCase,
      targetCase: toCase,
      originalText: text,
      convertedText: result.convertedText,
    };

    // console.log('formattedResponse: ', formattedResponse);

    res.end(JSON.stringify(formattedResponse));
  });

  // server.listen(8080, () => {
  //   console.log('Server is running on http://localhost:8080');
  // });

  return server;
}

// createServer();

module.exports = {
  createServer,
};
