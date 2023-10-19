const http = require('http');
const serverError = require('./serverError').serverError;
const convertToCase = require('./convertToCase/convertToCase').convertToCase;

function createServer() {
  const server = http.createServer((req, res) => {
    const normalizedURL = new URL(req.url, 'http://localhost:5700');

    res.setHeader('Content-Type', 'application/json');

    const reqText = normalizedURL.pathname.slice(1);
    const reqCase = normalizedURL.searchParams.get('toCase');

    const errorsParams = serverError(reqText, reqCase);

    if (errorsParams.errors.length) {
      res.statusCode = 400;
      res.end(JSON.stringify(errorsParams));
    }

    if (!errorsParams.errors.length) {
      const { originalCase, convertedText } = convertToCase(reqText, reqCase);

      const resultConvert = {
        originalCase,
        targetCase: reqCase,
        originalText: reqText,
        convertedText,
      };

      res.status = 200;
      res.end(JSON.stringify(resultConvert));
    }
  });

  return server;
}

module.exports = {
  createServer,
};
