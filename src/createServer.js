// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
const http = require('node:http');

const { createBodyMessage } = require('./createBodyMessage/createBodyMessage');
const { receiveUrlParams } = require('./receiveUrlParams/receieveUrlParams');

function createServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const { recievedText, toCase } = receiveUrlParams(req);
    const data = createBodyMessage(recievedText, toCase, res);

    res.write(data);
    res.end();
  });

  return server;
}

module.exports = { createServer };
