const http = require('http');
const url = require('url');

const { getUrlParameters } = require('./URLParameters');
const { checkURL } = require('./catchErrors');
const { convertToCase } = require('./convertToCase/convertToCase');

const createServer = () => {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const { pathname, query } = url.parse(req.url, true);
    const { originalText, targetCase } = getUrlParameters(pathname, query);
    const errors = checkURL(originalText, targetCase);

    if (errors.length) {
      sendJsonResponse(res, 400, 'Bad request', { errors });
      return;
    }

    const { originalCase, convertedText } = convertToCase(
      originalText,
      targetCase,
    );

    sendJsonResponse(res, 200, 'OK', {
      originalCase,
      targetCase,
      originalText,
      convertedText,
    });
  });

  return server;
};

const sendJsonResponse = (res, statusCode, statusMessage, data) => {
  res.statusCode = statusCode;
  res.statusMessage = statusMessage;
  res.end(JSON.stringify(data));
};

module.exports = { createServer };
