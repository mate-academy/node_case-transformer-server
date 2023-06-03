const http = require('http');
const { getData } = require('./getData');
const { validateData } = require('./validateData');
const { convertToCase } = require('./convertToCase/convertToCase');

function sendResponse(res, statusCode, statusMessage, data) {
  res.statusCode = statusCode;
  res.statusMessage = statusMessage;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(data));
}

function createServer() {
  const server = http.createServer((request, response) => {
    const [textToConvert, caseName] = getData(request);
    const errors = validateData(textToConvert, caseName);

    if (errors.length) {
      sendResponse(response, 400, 'Something went wrong.', { errors });

      return;
    }

    const {
      convertedText,
      originalCase,
    } = convertToCase(textToConvert, caseName);

    sendResponse(response, 200, 'OK', {
      originalText: textToConvert,
      convertedText,
      originalCase,
      targetCase: caseName,
    });
  });

  return server;
}

module.exports = {
  createServer,
};
