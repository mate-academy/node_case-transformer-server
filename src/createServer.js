// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
const http = require('http');
const fs = require('fs');
const { convertToCase } = require('./convertToCase/convertToCase');

const createServer = () => {
  return http.createServer((req, res) => {
    const fileName = req.url.slice(1);
    const urlParams = new URL(req.url, `http://${req.headers.host}`);
    const pathName = urlParams.pathname;

    if (pathName === '/favicon.ico') {
      return;
    }

    if (pathName.length  < 2) {
      res.statusCode = 400;
      res.end('Text to convert is required. Correct request is: /<TEXT_TO_CONVERT>?toCase=<CASE_NAME>.');
      return;
    }
  
    const cases = Object.fromEntries(urlParams.searchParams.entries());
  
    if (!Object.keys(cases).includes('toCase')) {
      res.statusCode = 400;
      res.end('"toCase" query param is required. Correct request is: /<TEXT_TO_CONVERT>?toCase=<CASE_NAME>');
      return;
    }

    try {
      res.end(JSON.stringify(convertToCase(pathName.slice(1), cases.toCase)));
    } catch {
      res.statusCode = 400;
      res.end('This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.');
      return;
    }    
  })
};

module.exports = { createServer };
