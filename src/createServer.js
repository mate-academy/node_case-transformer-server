'use strict';

const http = require('http');
const { parseUrl } = require('./helpers/parseUrl.js');
const { genereteResponse } = require('./helpers/generateResponse.js');

const createServer = () => {
  const server = http.createServer((req, res) => {
    if (req.url === '/favicon.ico') {
      res.writeHead(204, { 'Content-Type': 'image/x-icon' });
      res.end();

      return;
    }

    const parsedUrl = parseUrl(req.url);

    if (parsedUrl.error) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(parsedUrl.error);

      return;
    }

    const response = genereteResponse(parsedUrl);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(response);
  });

  return server;
};

module.exports = { createServer };
