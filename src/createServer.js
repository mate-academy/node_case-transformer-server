const http = require('http');
const serverError = require('./serverError').serverError;
const convertToCase = require('./convertToCase/convertToCase').convertToCase;

function createServer() {
  const server = http.createServer((req, res) => {
    const normalizedURL = new URL(req.url, 'http://localhost:5700');

    res.setHeader('Content-Type', 'application/json');

    const reqText = normalizedURL.pathname.slice(1);
    const reqCase = normalizedURL.searchParams.get('toCase');

    const errors = serverError(reqText, reqCase);

    if (errors.errors.length) {
      res.end(JSON.stringify(errors));
    } else {
      const { originalCase, convertedText } = convertToCase(reqText, reqCase);

      const resultConvert = {
        originalCase,
        targetCase: reqCase,
        originalText: reqText,
        convertedText,
      };

      res.end(JSON.stringify(resultConvert));
    }
  });

  return server;
}

module.exports = {
  createServer,
};
