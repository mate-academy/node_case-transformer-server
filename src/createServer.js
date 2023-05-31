const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { wrongTargetCase } = require('./errorMessages');
const { getTextAndParams } = require('./getTextAndParams');
const { getErrors } = require('./getErrors');

function createServer() {
  const server = http.createServer((req, res) => {
    const { text, targetCase } = getTextAndParams(req.url);
    const responseErrors = getErrors(text, targetCase);

    res.setHeader('Content-Type', 'application/json');

    const response = {
      originalText: text,
      targetCase,
    };

    try {
      Object.assign(response, convertToCase(text, targetCase));
    } catch {
      if (targetCase) {
        responseErrors.errors.push({ message: wrongTargetCase });
      }
    }

    if (!responseErrors.errors.length) {
      res.end(JSON.stringify(response));

      return server;
    }

    res.statusCode = 400;
    res.statusMessage = 'Bad request';
    res.end(JSON.stringify(responseErrors));
  });

  return server;
}

module.exports = { createServer };
