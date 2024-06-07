// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
const http = require('http');
const { validateUrl } = require('./validate/validateUrl');
const { convertToCase } = require('./convertToCase/convertToCase');

function createServer() {
  return http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);

    res.setHeader('content-type', 'application/json');

    const errors = validateUrl(url);

    if (errors.length) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.end(JSON.stringify({ errors }));

      return;
    }

    const originalText = url.pathname.slice(1);
    const targetCase = url.searchParams.get('toCase');

    const result = convertToCase(originalText, targetCase);

    res.end(JSON.stringify({ ...result, originalText, targetCase }));
  });
}

module.exports = {
  createServer,
};
