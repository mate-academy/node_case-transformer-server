// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { detectCase } = require('./convertToCase/detectCase');
const errorsList = require('./errors');
const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const createServer = () => {
  const server = http.createServer((req, res) => {
    const fullUrl = new URL(req.url, `http://${req.headers.host}`);
    const textToConvert = fullUrl.pathname.slice(1);
    const searchParams = fullUrl.searchParams;
    const newCase = searchParams.get('toCase');
    const errors = [];

    if (!textToConvert) {
      errors.push(errorsList.MISSING_TEXT);
    }

    if (!newCase) {
      errors.push(errorsList.MISSING_QUERY);
    } else if (!cases.includes(newCase)) {
      errors.push(errorsList.UNSUPPORTED_CASE);
    }

    if (errors.length) {
      res.writeHead(400, { 'Content-Type': 'application/json' });

      return res.end(JSON.stringify({ errors }));
    }

    try {
      const converted = convertToCase(textToConvert, newCase);
      const result = {
        originalCase: detectCase(textToConvert),
        targetCase: newCase,
        originalText: textToConvert,
        convertedText: converted.convertedText,
      };

      res.writeHead(200, { 'content-type': 'application/json' });
      res.end(JSON.stringify(result));
    } catch (error) {
      res.writeHead(400, { 'content-type': 'application/json' });

      res.end(
        JSON.stringify({
          error: error.message || 'Something went wrong',
        }),
      );
    }
  });

  return server;
};

module.exports = { createServer };
