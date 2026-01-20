/* eslint-disable max-len */
/* eslint-disable no-console */

const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { throwError } = require('./throwError.js');
const { checkURLParams } = require('./checkURLParams.js');

const createServer = () =>
  http.createServer((req, res) => {
    try {
      const normalizeUrl = new URL(req.url, 'http://localhost:5700');
      const text = normalizeUrl.pathname.slice(1); //
      const targetCase = normalizeUrl.searchParams.get('toCase');
      const validationURLErrors = checkURLParams(text, targetCase);

      if (validationURLErrors.length > 0) {
        throwError(res, ...validationURLErrors);

        return;
      }

      const resultOfConverting = convertToCase(text, targetCase);
      const responseBody = JSON.stringify({
        targetCase,
        originalText: text,
        ...resultOfConverting,
      });

      res.setHeader('Content-type', 'application/json');
      res.statusCode = 200;
      res.end(responseBody);
    } catch (error) {
      console.error('Error processing request:', error.message);
      res.statusCode = 500;
      res.on('error', () => console.log(error.message));
    }
  });

module.exports = {
  createServer,
};
