const { handleRequest } =  require('./convertToCase/handleRequest');
const http = require('http');

const createServer = () => {
  return http.createServer(handleRequest);
};

module.exports = {
  createServer,
};
