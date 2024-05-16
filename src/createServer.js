const http = require('http');

const { convertToCase } = require('./convertToCase');
const { detectCase } = require('./convertToCase/detectCase');
const { findError } = require('./findError');
const { getTextAndCase } = require('./getTextAndCase');

const createServer = () => {
  const server = http.createServer((req, res) => {
    const [text, toCase] = getTextAndCase(req);

    res.setHeader('Content-Type', 'application/json');

    const error = findError(text, toCase);

    if (error.errors.length > 0) {
      res.statusCode = 400;
      res.statusMessage = 'Bad Request';
      res.end(JSON.stringify(error));

      return;
    }

    const convertedText = convertToCase(text, toCase).convertedText;

    const response = {
      originalCase: detectCase(text),
      targetCase: toCase,
      originalText: text,
      convertedText,
    };

    res.statusCode = 200;
    res.end(JSON.stringify(response));
  });

  return server;
};

createServer();

module.exports = { createServer };
