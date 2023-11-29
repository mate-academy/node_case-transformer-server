const http = require('http');
const { validate } = require('./validation');
const { convertToCase } = require('./convertToCase')

const PORT = process.env.PORT || 8080;
const BASE = `http://localhost:${PORT}`;

function createServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const normalizedURL = new URL(req.url, BASE);
    const input = normalizedURL.pathname.slice(1);
    const param = normalizedURL.searchParams.get('toCase');

    const errorOutput = validate(input, param);

    if (!errorOutput.errors.length) {
      req.statusCode = 200;

      const { originalCase, convertedText } = convertToCase(input, param);

      const response = {
        originalCase,
        targetCase: param,
        originalText: input,
        convertedText,
      }

      res.end(JSON.stringify(response));
    } else {
      req.statusCode = 400;

      res.end(JSON.stringify(errorOutput));
    }
  })

  return server;
}

module.exports = { createServer };
