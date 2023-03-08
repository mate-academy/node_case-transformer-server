// import http from 'http';
// import { convertToCase } from './convertToCase/convertToCase';
// import { checkErrorMessage } from './checkErrorMessage';
const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { checkErrorMessage } = require('./checkErrorMessage');

function createServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const normalizedURL = new URL(req.url, `http://${req.headers.host}`);
    const text = normalizedURL.pathname.slice(1);
    const toCase = normalizedURL.searchParams.get('toCase');
    const errors = checkErrorMessage(text, toCase);

    if (errors.errors.length) {
      req.statusCode = 404;
      req.statusMessage = 'Bad request';
      res.end(JSON.stringify(errors));
    } else {
      res.statusMessage = 'ok';

      const convertedText = convertToCase(text, toCase);

      res.end(JSON.stringify({
        ...convertedText,
        targetCase: toCase,
        originalText: text,
      }));
    }
  });

  return server;
}

module.exports = {
  createServer,
};
