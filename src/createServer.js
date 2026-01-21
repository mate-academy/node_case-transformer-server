/* eslint-disable max-len */
/* eslint-disable no-console */
const http = require('node:http');
const { convertToCase } = require('./convertToCase/convertToCase');

function createServer() {
  const server = http.createServer((req, res) => {
    const errors = [];
    let result = {};
    let reqUrl;

    try {
      reqUrl = new URL(req.url, 'http://localhost:5700');
    } catch (err) {
      errors.push({ message: 'Invalid request URL' });
    }

    if (!reqUrl) {
      return sendErrorResponse(res, errors);
    }

    const pathname = reqUrl.pathname.slice(1);
    const search = reqUrl.search.slice(1);
    const [searchKey, searchValue] = search.split('=');

    if (!pathname) {
      errors.push({
        message: `Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
      });
    }

    if (searchKey !== 'toCase') {
      errors.push({
        message: `"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
      });
    }

    let conversion = {};

    if (searchKey === 'toCase' && searchValue) {
      try {
        conversion = convertToCase(pathname, searchValue);
      } catch {
        errors.push({
          message:
            'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
        });
      }
    }

    if (errors.length > 0) {
      return sendErrorResponse(res, errors);
    }

    result = {
      ...conversion,
      targetCase: searchValue,
      originalText: pathname,
    };

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result));
  });

  return server;
}

function sendErrorResponse(res, errors) {
  res.statusCode = 400;
  res.statusMessage = 'Bad Request';
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ errors }));
}

module.exports = { createServer };
