const http = require('http');
const getServerErrors = require('./getServerErrors').getServerErrors;
const convertToCase = require('./convertToCase/convertToCase').convertToCase;

function createServer() {
  const server = http.createServer((req, res) => {
    const normalizedURL = new URL(req.url, 'http://localhost:5700');

    res.setHeader('Content-Type', 'application/json');

    const originalText = normalizedURL.pathname.slice(1);
    const targetCase = normalizedURL.searchParams.get('toCase');

    const serverErrors = getServerErrors(originalText, targetCase);

    if (serverErrors.errors.length) {
      res.statusCode = 400;

      return res.end(JSON.stringify(serverErrors));
    }

    const {
      originalCase,
      convertedText,
    } = convertToCase(originalText, targetCase);

    const resultConvert = {
      originalCase,
      targetCase,
      originalText,
      convertedText,
    };

    res.status = 200;
    res.end(JSON.stringify(resultConvert));
  });

  return server;
}

module.exports = {
  createServer,
};
