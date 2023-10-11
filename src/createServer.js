/* eslint-disable no-console */
const http = require('http');
const url = require('url');
const { convertToCase } = require('./convertToCase/convertToCase');
const { checkCaseAndText } = require('./checkCaseAndText');

function createServer() {
  return http.createServer((req, res) => {
    res.setHeader('Content-type', 'application/json');

    const normalizedUrl = new url.URL(req.url, `http://${req.headers.host}`);

    if (normalizedUrl.pathname !== '/favicon.ico') {
      const originalText = normalizedUrl.pathname.slice(1);
      const targetCase = normalizedUrl.searchParams.get('toCase');

      const isErrors = checkCaseAndText(originalText, targetCase);

      if (isErrors.errors.length) {
        res.statusCode = 404;
        res.statusMessage = 'Bad request';
        res.end(JSON.stringify(isErrors));

        return;
      }

      const { convertedText, originalCase } = convertToCase(
        originalText, targetCase,
      );

      res.statusCode = 200;
      res.statusMessage = 'OK';

      res.end(JSON.stringify({
        originalCase,
        targetCase,
        originalText,
        convertedText,
      }));
    }
  });
}

module.exports = { createServer };
