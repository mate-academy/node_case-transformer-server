const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const errorMessages = require('./errorMessages');

function createServer() {
  const server = http.createServer((req, res) => {
    const [path, queryString] = req.url.split('?');
    const text = path.slice(1);
    const params = new URLSearchParams(queryString);
    const targetCase = params.get('toCase');
    const responseErrors = {
      errors: [],
    };

    res.setHeader('Content-Type', 'application/json');

    if (!text) {
      responseErrors.errors.push({ message: errorMessages.missingText });
    }

    if (!targetCase) {
      responseErrors.errors.push({ message: errorMessages.missingTargetCase });
    }

    const response = {
      originalText: text,
      targetCase,
    };

    try {
      Object.assign(response, convertToCase(text, targetCase));
    } catch {
      if (targetCase) {
        responseErrors.errors.push({ message: errorMessages.wrongTargetCase });
      }
    }

    if (!responseErrors.errors.length) {
      res.end(JSON.stringify(response));
    } else {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.end(JSON.stringify(responseErrors));
    }
  });

  return server;
}

module.exports = { createServer };
