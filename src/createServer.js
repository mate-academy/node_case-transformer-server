const http = require('http');

const request = require('./request');
const sendResponse = require('./sendResponse');
const inputValidation = require('./validation');
const newResponse = require('./newResponse');

const createServer = () => {
  const server = http.createServer((req, res) => {
    const { toCase, inputText } = request(req);
    const errorNotifications = inputValidation(toCase, inputText);

    if (errorNotifications.errors.length > 0) {
      return sendResponse(400, errorNotifications, res);
    }

    const response = newResponse(inputText, toCase);

    return sendResponse(200, response, res);
  });

  return server;
};

module.exports = createServer;
