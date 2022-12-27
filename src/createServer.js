/* eslint-disable no-console */
// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
const http = require('http');

function createServer() {
  const server = http.createServer((req, resp) => {
    console.log('request - ', req);
    resp.end('hello');
  });

  console.log('111');

  return server;
}

createServer();
module.exports.createServer = createServer;
