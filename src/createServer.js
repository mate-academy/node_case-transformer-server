/* eslint-disable max-len */
// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
const http = require('http');
const { convertToCase } = require('./convertToCase/index');
const handleErrors = require('./validation').handleErrors;

function createServer() {
  const server = http.createServer((req, res) => {
    const urlParams = req.url.split('?');

    const [path, query] = urlParams;
    const queryParams = new URLSearchParams(query);
    const toCase = queryParams.get('toCase');
    const stringToConvert = path.slice(1);

    const errors = handleErrors(req.url);

    if (errors.length > 0) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ errors }));

      return;
    }

    const convertedText = convertToCase(stringToConvert, toCase);

    res.writeHead(200, { 'Content-Type': 'application/json' });

    const result = {
      convertedText: convertedText.convertedText,
      originalCase: convertedText.originalCase,
      originalText: stringToConvert,
      targetCase: toCase,
    };

    res.end(JSON.stringify(result));
  });

  return server;
}

module.exports.createServer = createServer;
