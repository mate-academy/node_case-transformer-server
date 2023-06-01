const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { standardizeURL } = require('./standardizeUrl');
const { checkErrors } = require('./checkErrors');
const { sendResponse } = require('./sendResponse');

const createServer = () => {
  const server = http.createServer((req, res) => {
    const paramsToConvert = standardizeURL(req.url);
    const errors = checkErrors(...paramsToConvert);

    if (errors.length > 0) {
      sendResponse(res, 'Bad request', 400, { errors });

      return;
    }

    const convertedText = convertToCase(...paramsToConvert);

    sendResponse(
      res,
      'OK',
      200,
      {
        originalCase: convertedText.originalCase,
        targetCase: paramsToConvert[1],
        originalText: paramsToConvert[0],
        convertedText: convertedText.convertedText,
      },
    );
  });

  return server;
};

module.exports = {
  createServer,
};
