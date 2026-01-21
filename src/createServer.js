'use strict';

const http = require('http');
const { checkForErrors } = require('./errors');
const { convertToCase } = require('./convertToCase/convertToCase');

const createServer = () =>
  http.createServer((req, res) => {
    const [text, query] = req.url.split('?');
    const originalText = text.slice(1);
    const targetCase = new URLSearchParams(query).get('toCase');

    const errors = checkForErrors(originalText, targetCase);

    res.setHeader('Content-Type', 'application/json');

    if (errors.length) {
      res.statusCode = 400;

      return res.end(JSON.stringify({ errors }));
    }

    const { originalCase, convertedText } = convertToCase(
      originalText,
      targetCase,
    );

    const response = {
      originalCase,
      originalText,
      targetCase,
      convertedText,
    };

    res.end(JSON.stringify(response));
  });

module.exports = {
  createServer,
};
