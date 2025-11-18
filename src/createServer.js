const http = require('http');

function createServer() {
  return http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
      originalCase: 'UPPER',
      originalText: 'HELLO_WORLD',
      targetCase: 'UPPER',
      convertedText: 'HELLO_WORLD',
      message: 'Hello, World!',
    }));
  });
}

module.exports = { createServer };
