
const http = require('http');
const { convertToCase } = require('./convertToCase');
const { validate } = require('./validator');

const getParams = (request) => {
  const { pathname, searchParams } = new URL(request.url, `http://${request.headers.host}`);
  const text = pathname.slice(1);
  const toCase = searchParams.get('toCase');

  return [text, toCase];
};

const sendResponse = (response, statusCode, data) => {
  response.setHeader('Content-Type', 'application/json');
  response.statusCode = statusCode;

  switch (statusCode) {
    case 200:
      response.statusMessage = 'OK';
      break;
    case 400:
      response.statusMessage = 'Bad Request';
      break;
    default:
      response.statusMessage = '';
      break;
  }

  return response.end(JSON.stringify(data));
};

const createServer = () => {
  const server = http.createServer((request, response) => {
    const [text, toCase] = getParams(request);
    const errors = validate(text, toCase);

    if (errors.length) {
      return sendResponse(response, 400, { errors });
    }

    const { originalCase, convertedText } = convertToCase(text, toCase);

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

module.exports = {
  createServer,
};
