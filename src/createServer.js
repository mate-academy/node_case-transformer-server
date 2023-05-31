const http = require('http');
const { convertToCase } = require('./convertToCase');
const { errorMessages } = require('./errorMessages');

function createServer() {
  const server = http.createServer((req, res) => {
    const normalizedURL = new URL(req.url, `http://${req.headers.host}`);
    const text = normalizedURL.pathname.slice(1);
    const toCase = normalizedURL.searchParams.get('toCase');

    res.setHeader('Content-Type', 'application/json');

    const responseError = findError(text, toCase);

    const response = {
      originalText: text,
      targetCase: toCase,
    };

    try {
      Object.assign(response, convertToCase(text, toCase));
    } catch {
      if (toCase) {
        responseError.errors.push({ message: errorMessages.caseInvalid });
      }
    }

    if (!responseError.errors.length) {
      res.statusCode = 200;
      res.end(JSON.stringify(response));

      return;
    }

    res.statusCode = 400;
    res.statusMessage = 'Bad request';
    res.end(JSON.stringify(responseError));
  });

  return server;
}

module.exports = {
  createServer,
};

function findError(text, toCase) {
  const responseError = {
    errors: [],
  };

  if (!text) {
    responseError.errors.push({ message: errorMessages.textError });
  }

  if (!toCase) {
    responseError.errors.push({ message: errorMessages.caseError });
  }

  return responseError;
}
