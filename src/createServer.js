const paramsCheck = require('./paramsCheck');
const sendError = require('./sendError');
const http = require('http');
const { convertToCase } = require('./convertToCase');

const extractParamsFromRequest = (request) => {
  const { pathname, searchParams } = new URL(request.url, `http://${request.headers.host}`);
  const text = pathname.slice(1);
  const toCase = searchParams.get('toCase');
  
  return { text, toCase };
};

const createServer = () => {
  const server = http.createServer((request, response) => {
    response.setHeader('Content-Type', 'application/json');

    const { text, toCase } = extractParamsFromRequest(request);

    const errorMessages = paramsCheck(text, toCase);

    if (errorMessages.length) {
      return sendError(response, 400, errorMessages);
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

    response.statusCode = 200;
    response.end(JSON.stringify(responseBody));
  });

  return server;
};

module.exports = {
  createServer
};
