const http = require('http');

function createServer() {
  return http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello, World!');
  });
}

module.exports = { createServer };
