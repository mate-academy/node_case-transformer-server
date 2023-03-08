const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { standartizeURL } = require('./standartizeUrl');
const { checkErrors } = require('./checkErrors');
const { sendResponse } = require('./sendResponse');

const createServer = () => {
  const server = http.createServer((req, res) => {
    const paramsToConvert = standartizeURL(req.url);
    const errors = checkErrors(...paramsToConvert);

    if (errors.length > 0) {
      sendResponse(res, 'Bad request', 400, JSON.stringify({ errors }));

      return;
    }

    const convertedText = convertToCase(...paramsToConvert);

    sendResponse(
      res,
      'OK',
      200,
      JSON.stringify({
        originalCase: convertedText.originalCase,
        targetCase: paramsToConvert[1],
        originalText: paramsToConvert[0],
        convertedText: convertedText.convertedText,
      }),
    );
  });

  return server;
};

module.exports = {
  createServer,
};
