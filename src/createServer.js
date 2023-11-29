const http = require('http');
const { handleError } = require('./handleError');
const { handleRes } = require('./handleRes');

function createServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-type', 'application/json');

    const normalizedUrl = new URL(req.url, 'http://localhost:5700');
    const urlText = normalizedUrl.pathname.slice(1);
    const urlCase = normalizedUrl.searchParams.get('toCase');

    try {
      handleRes(urlText, urlCase, res);
    } catch (error) {
      handleError(urlText, urlCase, res);
    };
  });

  return server;
};

module.exports = { createServer };
