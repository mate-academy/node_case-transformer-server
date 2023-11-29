const http = require('http');
const { handleData } = require('./handleData');
const { handleErrors } = require('./handleErrors');

const createServer = (port) => http.createServer((req, res) => {
  const normalizedURL = new URL(req.url, 'http://localhost:5700');
  const urlText = normalizedURL.pathname.slice(1);
  const urlCase = normalizedURL.searchParams.get('toCase');

  res.setHeader('Content-type', 'application/json');

  try {
    handleData(urlText, urlCase, res);
  } catch (e) {
    handleErrors(urlText, urlCase, res);
  }
});

module.exports = { createServer };
