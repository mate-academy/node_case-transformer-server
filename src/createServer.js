/* eslint-disable max-len */
// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
const http = require('http');

const { CASES_LIST } = require('./constants/CASES_LIST');
const { getErrorMessages } = require('./utils/getErrorMessages');
const { convertToCase } = require('./convertToCase/convertToCase');

function createServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const [text, params] = req.url.split('?');

    const originalText = text.slice(1);
    const targetCase = new URLSearchParams(params).get('toCase');

    if (!originalText || !targetCase || !CASES_LIST.includes(targetCase)) {
      const errorMessages = getErrorMessages(originalText, targetCase);
      const errorBody = JSON.stringify(errorMessages);

      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.end(errorBody);

      return;
    }

    const convertedQuery = convertToCase(originalText, targetCase);

    const responseBody = JSON.stringify({
      originalCase: convertedQuery.originalCase,
      targetCase,
      originalText,
      convertedText: convertedQuery.convertedText,
    });

    res.statusCode = 200;
    res.statusMessage = 'OK';
    res.end(responseBody);
  });

  return server;
}

module.exports = { createServer };
