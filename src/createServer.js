/* eslint-disable no-console */
// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
const http = require('http');

function createServer() {
  const serwer = http.createServer((req, res) => {

  });

  return serwer;
}

module.exports = {
  createServer,
};
