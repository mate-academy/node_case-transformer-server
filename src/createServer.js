// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here

const http = require('http');
const { getUrlParams } = require('./getUrlParams.js');
const { checkUrl } = require('./checkUrl');
const { convertToCase } = require('./convertToCase/convertToCase');

const createServer = () => {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const [text, query] = req.url.split('?');
    const { originalText, targetCase } = getUrlParams(text, query);

    const errors = checkUrl(originalText, targetCase);

    if (errors.length) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';

      res.end(
        JSON.stringify({
          errors,
        }),
      );

      return;
    }

    res.statusCode = 200;
    res.statusMessage = 'OK';

    const { originalCase, convertedText } = convertToCase(
      originalText,
      targetCase,
    );

    res.end(
      JSON.stringify({
        originalCase,
        targetCase,
        originalText,
        convertedText,
      }),
    );
  });

  return server;
};

module.exports = { createServer };
