const http = require('http');
const { convertToCase } = require('./convertToCase');
const { availiableCases } = require('./constants');

function respondWithError(res, errors) {
  res.statusCode = 400;
  res.statusMessage = 'Bad request';
  res.setHeader('Content-Type', 'application/json');

  const payload = {
    errors: errors.map(error => ({ message: error })),
  };

  res.end(JSON.stringify(payload, null, 2));
}

function createServer() {
  const server = http.createServer((req, res) => {
    const { url } = req;

    const [path, searchParams] = url.split('?');

    const originalText = path.slice(1);
    const targetCase = new URLSearchParams(searchParams).get('toCase');

    const errors = [];

    if (!originalText) {
      errors.push('Text to convert is required.'
      + ' Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".');
    }

    if (!targetCase) {
      errors.push('"toCase" query param is required.'
      + ' Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".');
    } else if (!availiableCases.includes(targetCase)) {
      errors.push('This case is not supported.'
      + ' Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.');
    }

    if (errors.length) {
      respondWithError(res, errors);

      return;
    }

    const {
      originalCase,
      convertedText,
    } = convertToCase(originalText, targetCase);

    const conversionInfo = {
      originalCase,
      targetCase,
      originalText,
      convertedText,
    };

    res.statusCode = 200;
    res.statusMessage = 'OK';
    res.setHeader('Content-Type', 'application/json');

    res.end(JSON.stringify(conversionInfo, null, 2));
  });

  return server;
}

module.exports = {
  createServer,
};
