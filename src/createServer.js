// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
const http = require('http');
const { validateInputs, parseInputs } = require('./utils');

function createServer() {
  return http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const normalizedUrl = new URL(req.url, `http://${req.headers.host}`);
    const textToConvert = normalizedUrl.pathname.slice(1);
    const caseName = normalizedUrl.searchParams.get('toCase');
    const errorsPayload = validateInputs(textToConvert, caseName);

    if (errorsPayload.errors.length > 0) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.end(JSON.stringify(errorsPayload));

      return;
    }

    res.statusCode = 200;
    res.statusMessage = 'OK';
    res.end(JSON.stringify(parseInputs(textToConvert, caseName)));
  });
}

module.exports = {
  createServer,
};
