const http = require('http');
const { handleRequest } = require('./convertToCase/handleRequest');

require('dotenv').config();

const BASE_URL = process.env.BASE_URL;
const PORT = process.env.PORT;

const createServer = () => {
  const server = http.createServer((req, res) => {
    const normalizedUrl = new URL(req.url, BASE_URL + PORT);

    const responseBody = handleRequest(normalizedUrl);
    const responseBodyJson = JSON.stringify(responseBody);

    if ('errors' in responseBody) {
      res.statusCode = 400;
    } else {
      res.statusCode = 200;
    }

    res.setHeader('Content-Type', 'application/json');
    res.end(responseBodyJson);
  });

  return server;
};

module.exports = {
  createServer,
};
