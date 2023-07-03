const http = require('http');
const url = require('url');
const { convertToCase } = require('./convertToCase/convertToCase');
const { isCaseValid } = require('./validation');
const { errorEnum, createErrorObject } = require('./errorGenerator');

const createServer = () => {
  const server = http.createServer((req, res) => {
    const errorsObj = { errors: [] };
    const normalizedUrl = new url.URL(req.url, `http:${req.headers.host}`);
    const originalText = normalizedUrl.pathname.slice(1);
    const targetCase = normalizedUrl.searchParams.get('toCase');

    res.setHeader('Content-Type', 'application/json');

    if (normalizedUrl.pathname === '/favicon.ico') {
      return;
    }

    if (originalText === '') {
      errorsObj.errors.push(createErrorObject(errorEnum.EMPTY_TEXT));
    }

    if (!targetCase) {
      errorsObj.errors.push(createErrorObject(errorEnum.CASE_MISSING));
    } else if (!isCaseValid(targetCase)) {
      errorsObj.errors.push(createErrorObject(errorEnum.CASE_NOT_VALID));
    }

    if (errorsObj.errors.length) {
      res.statusCode = 404;
      res.end(JSON.stringify(errorsObj));

      return;
    }

    const casesObject = {
      originalText,
      targetCase,
      ...convertToCase(originalText, targetCase),
    };

    res.statusCode = 200;
    res.end(JSON.stringify(casesObject));
  });

  return server;
};

module.exports = { createServer };
