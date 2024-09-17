const http = require('http');
const validateParams = require('./validateParams');
const parseRequest = require('./parseRequest');
const sendResponce = require('./sendResponce');
const newResponse = require('./newResponse');

const createServer = () => {
  const server = http.createServer((req, res) => {
    const { toCase, textToConvert } = parseRequest(req);
    const errorNotifications = validateParams(toCase, textToConvert);

    if (errorNotifications.errors.length > 0) {
      return sendResponce(400, errorNotifications, res);
    }

    const response = newResponse(textToConvert, toCase);

    return sendResponce(200, response, res);
  });

  return server;
};

module.exports = {
  createServer,
};
