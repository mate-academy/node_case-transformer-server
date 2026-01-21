// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here

const http = require('http');
const { convertToCase } = require('./convertToCase');
const { validateURL } = require('./validateURL');
const { detectCase } = require('./convertToCase/detectCase');

const BASE = 'http://localhost:5700';

function createServer() {
  return http.createServer((req, res) => {
    const url = new URL(req.url, BASE);
    const text = url.pathname.slice(1);
    const toCase = url.searchParams.get('toCase');
    const validationResult = validateURL(text, toCase);

    res.setHeader('Content-Type', 'application/json');

    if (validationResult.length) {
      res.statusCode = 400;
      res.end(JSON.stringify({ errors: validationResult }));

      return;
    }

    const convertedString = convertToCase(text, toCase);

    res.statusCode = 200;

    res.end(
      JSON.stringify({
        originalCase: detectCase(text),
        targetCase: toCase,
        originalText: text,
        convertedText: convertedString.convertedText,
      }),
    );
  });
}

module.exports = {
  createServer,
};
