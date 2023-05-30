/* eslint-disable max-len */
const http = require('http');
const { convertToCase } = require('./convertToCase');
const errorMessages = {
  textError: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  caseError: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
  caseInvalid: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
};

function createServer() {
  const server = http.createServer((req, res) => {
    const normalizedURL = new URL(req.url, `http://${req.headers.host}`);
    const text = normalizedURL.pathname.slice(1);
    const toCase = normalizedURL.searchParams.get('toCase');
    const responseErrors = {
      errors: [],
    };

    res.setHeader('Content-Type', 'application/json');

    if (!text) {
      responseErrors.errors.push({ message: errorMessages.textError });
    }

    if (!toCase) {
      responseErrors.errors.push({ message: errorMessages.caseError });
    }

    const respond = {
      originalText: text,
      targetCase: toCase,
    };

    try {
      Object.assign(respond, convertToCase(text, toCase));
    } catch {
      if (toCase) {
        responseErrors.errors.push({ message: errorMessages.caseInvalid });
      }
    }

    if (!responseErrors.errors.length) {
      res.statusCode = 200;
      res.end(JSON.stringify(respond));
    } else {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.end(JSON.stringify(responseErrors));
    }
  });

  return server;
}

module.exports = {
  createServer,
};
