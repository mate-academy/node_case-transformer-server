/* eslint-disable max-len */
// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here

const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { handleErrors } = require('./utils/handleErorrs');

const createServer = () => {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const { pathname, searchParams } = new URL(req.url, `http://${req.headers.host}`);
    const textToConvert = pathname.slice(1);
    const targetCase = searchParams.get('toCase');

    const hasAnyErrors = handleErrors(res, textToConvert, targetCase);

    if (hasAnyErrors) {
      return;
    }

    const result = convertToCase(textToConvert, targetCase);

    const response = {
      originalCase: result.originalCase,
      targetCase,
      originalText: textToConvert,
      convertedText: result.convertedText,
    };

    res.end(JSON.stringify(response));
  });

  return server;
};

module.exports = { createServer };
