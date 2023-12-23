/* eslint-disable no-console */
const http = require('http');
const { convertToCase } = require('./convertToCase');
const { getUrlErrors } = require('./getUrlErrors');

const createServer = () => {
  return http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const normalizedUrl = new URL(req.url, 'http://localhost:5700');
    const text = normalizedUrl.pathname.replace('/', '');
    const toCase = normalizedUrl.searchParams.get('toCase');
    const errorObject = getUrlErrors(text, toCase);

    if (errorObject.errors.length) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';

      res.end(JSON.stringify(errorObject));

      return;
    }

    const changedData = convertToCase(text, toCase);

    res.statusCode = 200;
    res.statusMessage = 'OK';

    res.end(JSON.stringify({
      originalCase: changedData.originalCase,
      targetCase: toCase,
      originalText: text,
      convertedText: changedData.convertedText,
    }));
  });
};

module.exports = {
  createServer,
};
