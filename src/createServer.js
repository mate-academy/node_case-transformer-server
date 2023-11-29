const http = require('http');
const { handlingData } = require('./handlingData');
const { handlingErrors } = require('./handlingErrors');

const createServer = () => {
  return http.createServer((req, res) => {
    res.setHeader('Content-type', 'application/json');

    const normalizedURL = new URL(req.url, 'http://localhost:5700');

    const caseName = normalizedURL.searchParams.get('toCase');
    const text = normalizedURL.pathname.slice(1);

    try {
      handlingData(text, caseName, res);
    } catch (error) {
      handlingErrors(text, caseName, res);
    }
  });
};

module.exports = { createServer };
