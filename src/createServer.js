const http = require('http');
const { request } = require('./request');

function createServer() {
  return http.createServer(request);
}

module.exports = { createServer };
