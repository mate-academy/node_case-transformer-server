/* eslint-disable no-console */
const http = require('http');
const { getTextAndToCase } = require('./serverFunctions/getTextAndToCase');
const { validation } = require('./serverFunctions/validation');
const { convertToCase } = require('./convertToCase/convertToCase');

function createServer() {
  const server = http.createServer((req, resp) => {
    const [originalText, targetCase] = getTextAndToCase(req);
    const errors = validation(originalText, targetCase);

    resp.setHeader('Content-Type', 'application/json');

    if (errors.length !== 0) {
      resp.statusCode = 400;
      resp.statusText = 'Bad request';
      resp.end(JSON.stringify({ errors }));

      return;
    }

    const {
      originalCase,
      convertedText,
    } = convertToCase(originalText, targetCase);

    resp.statusCode = 200;
    resp.statusText = 'OK';

    resp.end(JSON.stringify({
      originalCase,
      targetCase,
      originalText,
      convertedText,
    }));
  });

  return server;
}

createServer();
module.exports.createServer = createServer;
