const http = require('http');
const {
  handleCaseTransformRequest,
} = require('./http/handleCaseTransformRequest');

function createServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');
    handleCaseTransformRequest(req, res);
  });

  return server;
}

module.exports = {
  createServer,
};
