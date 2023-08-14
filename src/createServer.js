/* eslint-disable max-len */
const http = require('http');
const { convertToCase } = require('./convertToCase');

function createServer() {
  const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

  const server = http.createServer((req, res) => {
    const [text, queryString] = req.url.slice(1).split('?');
    const queryParams = new URLSearchParams(queryString);
    const toCase = queryParams.get('toCase');

    if (!text || !toCase || !cases.includes(toCase)) {
      const errors = [];

      if (!text) {
        errors.push({ message: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' });
      }

      if (!toCase) {
        errors.push({ message: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' });
      } else if (!cases.includes(toCase)) {
        errors.push({ message: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.' });
      }

      return respondWithError(res, 400, errors);
    }

    const result = convertToCase(text, toCase);

    const response = {
      originalCase: result.originalCase,
      targetCase: toCase,
      originalText: text,
      convertedText: result.convertedText,
    };

    respondWithJSON(res, 200, response);
  });

  return server;
}

function respondWithError(res, resStatus, errors) {
  const error = {
    errors,
  };

  respondWithJSON(res, resStatus, error);
}

function respondWithJSON(res, resStatus, data) {
  res.writeHead(resStatus, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

module.exports = { createServer };