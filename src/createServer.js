const http = require('http');

const { determineResponse } = require('./determineResponse');

const ORIGIN = 'http://localhost:5700';

function createServer() {
  return http.createServer((req, res) => {
    const parsedUrl = new URL(ORIGIN + req.url);

    const textToConvert = parsedUrl.pathname.slice(1);
    const convertToFormat = parsedUrl.searchParams.get('toCase');

    res.setHeader('Content-Type', 'application/json');

    const responseArgs = determineResponse(textToConvert, convertToFormat);

    res.statusCode = responseArgs.statusCode;
    res.end(JSON.stringify(responseArgs.response));
  });
}

module.exports = { createServer };
