const http = require('http');
const { handleRequest } = require('./convertToCase/handleRequest');

require('dotenv').config();

const createServer = http.createServer((req, res) => {
  // console.log(req.url);
  const responseBody = handleRequest(req.url);
  const responseBodyJson = JSON.stringify(responseBody);

  res.statusCode = 200;
  res.end(responseBodyJson);
});

module.exports = {
  createServer,
};
