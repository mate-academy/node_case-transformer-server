// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here

const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { getError } = require('./getError');

function createServer() {
  return http.createServer((req, res) => {
    const normalizedUrl = new URL(req.url, `http://${req.headers.host}`);
    const originalText = normalizedUrl.pathname.slice(1);
    const targetCase = normalizedUrl.searchParams.get('toCase');
    const errors = getError(originalText, targetCase);

    res.setHeader('Content-type', 'application/json');

    if (errors.length > 0) {
      res.statusCode = 400;
      res.statusText = 'Bad request';

      return res.end(JSON.stringify({ errors }));
    }

    const { originalCase, convertedText } = convertToCase(
      originalText,
      targetCase,
    );

    const resData = {
      originalCase,
      originalText,
      targetCase,
      convertedText,
    };

    res.statusCode = 200;
    res.statusText = 'OK';

    res.end(JSON.stringify(resData));
  });
}

module.exports = { createServer };
