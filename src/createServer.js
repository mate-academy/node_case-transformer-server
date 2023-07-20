const http = require('http');
const { convertToCase } = require('./convertToCase');
const { validationService } = require('./validate.service');

function createServer() {
  return http.createServer((req, res) => {
    const requestData = new URL(req.url, `http://${req.headers.host}`);
    const textToConvert = requestData.pathname.slice(1);
    const convertType = requestData.searchParams.get('toCase');

    res.setHeader('Content-Type', 'application/json');

    const { isDataUnValid, errors } = validationService(
      textToConvert, convertType,
    );

    if (isDataUnValid) {
      res.statusCode = 400;

      const errorMessage = JSON.stringify({ errors });

      res.end(errorMessage);

      return;
    }

    const { originalCase, convertedText } = convertToCase(
      textToConvert, convertType,
    );

    const createResponse = JSON.stringify({
      originalCase,
      targetCase: convertType,
      originalText: textToConvert,
      convertedText,
    });

    res.statusCode = 200;
    res.end(createResponse);
  });
}

module.exports = { createServer };
