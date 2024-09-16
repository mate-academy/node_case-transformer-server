/* eslint-disable max-len */
const http = require('http');
const { convertToCase } = require('./convertToCase');
const { CASES } = require('./convertToCase/constants');

function createServer() {
  const server = http.createServer((req, res) => {
    const [textToConvert, stirngWithCase] = req.url.slice(1).split('?');
    const queryParams = new URLSearchParams(stirngWithCase);
    const toCase = queryParams.get('toCase');

    const errors = setError(textToConvert, toCase);

    if (errors.length > 0) {
      const error = { errors };

      return respond(res, 400, error);
    }

    const result = convertToCase(textToConvert, toCase);

    const response = {
      originalCase: result.originalCase,
      targetCase: toCase,
      originalText: textToConvert,
      convertedText: result.convertedText,
    };

    respond(res, 200, response);
  });

  return server;
}

function setError(text, toCase) {
  const errors = [];

  if (!text) {
    errors.push({ message: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' });
  }

  if (!toCase) {
    errors.push({ message: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' });
  }

  if (!CASES.includes(toCase) && toCase) {
    errors.push({ message: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.' });
  }

  return errors;
}

function respond(res, resStatus, data) {
  res.writeHead(resStatus, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

module.exports = {
  createServer,
};
