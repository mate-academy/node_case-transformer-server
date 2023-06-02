const http = require('http');
const { errorValidation } = require('./errorValidation');
const { responceData } = require('./responceData');
const { getURL } = require('./getURL');
const { sendResponce } = require('./sendResponce');

const createServer = () => {
  const server = http.createServer((req, res) => {
    const splitUrl = req.url.split('?');
    const { textToConvert, toCase } = getURL(splitUrl);
    const errorMessage = errorValidation(textToConvert, toCase);
    const hasError = errorMessage.errors.length > 0;

    res.setHeader('Content-Type', 'application/json');

    if (hasError) {
      sendResponce(res, 404, 'Bad request', errorMessage);

      return;
    }

    sendResponce(res, 200, 'OK', responceData(textToConvert, toCase));
  });

  return server;
};

module.exports = { createServer };
