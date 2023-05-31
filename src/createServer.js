const http = require('http');
const { convertToCase } = require('./convertToCase');
const paramsCheck = require('./paramsCheck');
const getParameters = require('./getParameters');
const sendResponse = require('./sendResponse');

const createServer = () => {
  const server = http.createServer((request, response) => {
    response.setHeader('Content-Type', 'application/json');

    const { text, toCase } = getParameters(request.url, `http://${request.headers.host}`);

    const errorMessages = paramsCheck(text, toCase);

    if (errorMessages.length) {
      const errorObjects = errorMessages.map(message => ({ message }));

      return sendResponse(response, 400, { errors: errorObjects });
    }

    const {
      convertedText,
      originalCase,
    } = convertToCase(text, toCase);

    const responseBody = {
      originalCase,
      targetCase: toCase,
      originalText: text,
      convertedText,
    };

    sendResponse(response, 200, responseBody);
  });

  return server;
};

module.exports.createServer = createServer;
