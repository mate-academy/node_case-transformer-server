/* eslint-disable no-console */
const http = require('http');
const { convertToCase } = require('./convertToCase');
const { validation } = require('./validation');

function createServer() {
  return http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const normalizedURL = new URL(`http://${req.headers.host}${req.url}`);

    try {
      const originalText = normalizedURL.pathname.slice(1);
      const targetCase = normalizedURL.searchParams.get('toCase');

      const checkedRequest = validation(originalText, targetCase);

      if (checkedRequest.errors.length > 0) {
        res.statusCode = 400;
        res.end(JSON.stringify({ errors: checkedRequest.errors }));

        return;
      }

      const { originalCase, convertedText } = convertToCase(
        originalText,
        targetCase,
      );

      const resBody = {
        originalCase,
        targetCase,
        originalText,
        convertedText,
      };

      res.statusCode = 200;
      res.statusMessage = 'OK';
      res.end(JSON.stringify(resBody));
    } catch (err) {
      res.statusCode = 400;
      res.end(console.log(err));
    }
  });
}

module.exports = {
  createServer,
};
