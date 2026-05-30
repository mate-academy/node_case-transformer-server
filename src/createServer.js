// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here

const http = require('http');
const { convertToCase } = require('./convertToCase');
const { validateRequest } = require('./validateRequest');

function createServer() {
  return http.createServer((req, res) => {
    const [pathname, queryString] = req.url.split('?');
    const params = new URLSearchParams(queryString || '');
    const toCase = params.get('toCase');
    const text = pathname.slice(1);
    const errors = validateRequest(text, toCase);

    if (errors.length > 0) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      res.statusText = 'Bad request';

      return res.end(
        JSON.stringify({
          errors: errors,
        }),
      );
    }

    const result = convertToCase(text, toCase);

    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;

    res.end(
      JSON.stringify({
        originalCase: result.originalCase,
        targetCase: toCase,
        originalText: text,
        convertedText: result.convertedText,
      }),
    );
  });
}

module.exports = { createServer };
