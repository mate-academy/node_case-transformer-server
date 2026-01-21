const http = require('http');
const { convertToCase } = require('./convertToCase');
const { getData } = require('./getData');
const { validateData } = require('./validateData');
const { sendResponse } = require('./sendResponse');

const createServer = () => {
  const server = http.createServer((request, response) => {
    const [text, toCase] = getData(request);
    const errors = validateData(text, toCase);

    if (errors.length > 0) {
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

module.exports.createServer = createServer;
