// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
const http = require('node:http');
const { makeRequest } = require('./convertToCase/makeRequest');

const server = http.createServer(makeRequest);

const createServer = () => server;

module.exports = {
  createServer,
};
