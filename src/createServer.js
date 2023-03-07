const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { urlParamsPreValidation } = require('./modules/urlParamsPreValidation');
const { prepareResponseData } = require('./modules/prepareResponseData');

const createServer = () => {
  const server = http.createServer((req, res) => {
    const normalizedURL = new URL(req.url, `http://${req.headers.host}`);

    if (req.url === '/favicon.ico') {
      res.writeHead(200, { 'Content-Type': 'image/x-icon' });
      res.end();

      return;
    }

    const targetCase = normalizedURL.searchParams.get('toCase');
    const textToConvert = normalizedURL.pathname.slice(1);

    let responseData = {};

    const caughtErrors = urlParamsPreValidation(textToConvert, targetCase);

    if (!caughtErrors.errors.length) {
      let result = {};

      try {
        result = convertToCase(textToConvert, targetCase);
      } catch (error) {
        caughtErrors.errors.push({
          message: 'Something went wrong' + error.message,
        });
      }

      responseData = {
        originalCase: result.originalCase,
        targetCase,
        originalText: textToConvert,
        convertedText: result.convertedText,
      };
    }

    const {
      statusCode,
      statusText,
      contentType,
      data,
    } = prepareResponseData(caughtErrors, responseData);

    res.writeHead(statusCode, statusText, { 'Content-Type': contentType });

    res.end(JSON.stringify(data, null, '\t'));
  });

  return server;
};

module.exports = { createServer };
