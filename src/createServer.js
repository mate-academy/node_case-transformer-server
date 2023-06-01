const http = require('http');
const { getData } = require('./getData');
const { validateData } = require('./validateData');
const { convertToCase } = require('./convertToCase/convertToCase');

function createServer() {
  const server = http.createServer((request, response) => {
    const [textToConvert, caseName] = getData(request);
    const errors = validateData(textToConvert, caseName);

    response.setHeader('Content-Type', 'application/json');

    if (errors.length) {
      response.statusCode = 400;
      response.statusMessage = 'Something went wrong.';

      return response.end(JSON.stringify({ errors }));
    }

    const {
      convertedText,
      originalCase,
    } = convertToCase(textToConvert, caseName);

    return response.end(JSON.stringify({
      originalText: textToConvert,
      convertedText,
      originalCase,
      targetCase: caseName,
    }));
  });

  return server;
}

module.exports = {
  createServer,
};
