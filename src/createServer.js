// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
const http = require('http');

function createServer() {
  return http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');

    const responseData = {
      message: 'Hello, World!',
    };

    res.end(JSON.stringify(responseData));
  });
}

module.exports = { createServer };
