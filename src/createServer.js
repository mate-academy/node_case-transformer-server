// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
const http = require('http');
const { validate } = require('./validate');
const { convertToCase } = require('./convertToCase/convertToCase');

function createServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const splitedURL = (req.url.split('?'));
    const params = new URLSearchParams(splitedURL[1]);

    const originalText = splitedURL[0].slice((1));
    const targetCase = params.get('toCase');

    const errors = validate(originalText, targetCase);
    let respData;

    if (errors.errors.length > 0) {
      res.statusCode = 400;
      respData = JSON.stringify(errors);
    }

    if (!errors.errors.length) {
      const { originalCase, convertedText } = convertToCase(
        originalText,
        targetCase,
      );

      res.statusCode = 200;

      respData = JSON.stringify({
        originalCase,
        targetCase,
        originalText,
        convertedText,
      });
    }

    res.end(respData);
  });

  return server;
}

module.exports = {
  createServer,
};
