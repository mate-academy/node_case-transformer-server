/* eslint-disable no-console */
'use strict';

const http = require('http');
const { requestErrors } = require('./requestErrors');
const { convertToCase } = require('./convertToCase/convertToCase');

const createServer = () => http.createServer((req, res) => {
  const [textWithSlash, query] = req.url.split('?');
  const originalText = textWithSlash.slice(1);
  const targetCase = new URLSearchParams(query).get('toCase');

  const errors = requestErrors(originalText, targetCase);

  res.setHeader('Content-Type', 'application/json');

  if (errors.length) {
    res.statusCode = 400;

    return res.end(JSON.stringify({ errors }));
  }

  res.statusCode = 200;

  const {
    originalCase, convertedText,
  } = convertToCase(originalText, targetCase);

  const response = {
    originalCase, originalText, targetCase, convertedText,
  };

  res.end(JSON.stringify(response));
});

module.exports = {
  createServer,
};
