const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const {
  NO_TEXT_ERR_MESSAGE,
  NO_CASE_ERR_MESSAGE,
  NO_AVAILABLE_CASE_ERR_MESSAGE,
  AVAILABLE_CASES,
} = require('./variables');

function createServer() {
  const server = http.createServer((req, res) => {
    const normalizedUrl = new URL(req.url, 'http://localhost:5007');
    const textToConvert = normalizedUrl.pathname.slice(1);
    const toCase = normalizedUrl.searchParams.get('toCase');
    const err = { errors: [] };

    if (!textToConvert) {
      err.errors.push({ message: NO_TEXT_ERR_MESSAGE });
    }

    if (!toCase) {
      err.errors.push({ message: NO_CASE_ERR_MESSAGE });
    }

    if (toCase && !AVAILABLE_CASES.includes(toCase)) {
      err.errors.push({ message: NO_AVAILABLE_CASE_ERR_MESSAGE });
    }

    if (!err.errors.length) {
      const result = convertToCase(textToConvert, toCase);

      result.targetCase = toCase;
      result.originalText = textToConvert;

      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(result));
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 400;
      res.end(JSON.stringify(err));
    }
  });

  return server;
}

module.exports = { createServer };
