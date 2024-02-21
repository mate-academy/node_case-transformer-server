// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here

const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { inputDataValidate } = require('./validations/inputDataValidate');

function createServer() {
  return http.createServer((req, res) => {
    const [pathname, queryStr] = req.url.split('?');

    const originalText = pathname.slice(1);
    const targetCase = new URLSearchParams(queryStr).get('toCase');

    const errors = inputDataValidate(originalText, targetCase);

    res.setHeader('Content-type', 'application/json');

    if (errors.length > 0) {
      res.statusCode = 400;
      res.end(JSON.stringify({ errors }));

      return;
    }

    const {
      originalCase,
      convertedText,
    } = convertToCase(originalText, targetCase);

    const result = JSON.stringify({
      originalCase,
      targetCase,
      originalText,
      convertedText,
    });

    res.end(result);
  });
}

module.exports = { createServer };
