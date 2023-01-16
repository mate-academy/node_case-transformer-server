const http = require('http');

const { parseHttpRequest } = require('./parseHttpRequest');
const { validateHttpRequest } = require('./validateHttpRequest');

const { convertToCase } = require('../convertToCase');

function createServer() {
  return http.createServer((req, res) => {
    const { targetCase, originalText } = parseHttpRequest(req);

    const errors = validateHttpRequest(targetCase, originalText);

    const responseData = {};
   
    if (errors.length) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';

      responseData.errors = errors;
    } else {
      res.statusCode = 200;

      const { 
        originalCase,
        convertedText,
      } = convertToCase(originalText, targetCase);

      Object.assign(responseData, {
        originalCase,
        targetCase,
        originalText,
        convertedText,
      });
    }

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(responseData));
  });
}

module.exports = { createServer };
