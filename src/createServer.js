/* eslint-disable no-console */
const http = require('http');
const { convertToCase } = require('./convertToCase');
const { getErrorObj } = require('./getErrorObj');

const createServer = () => {
  return http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const normalizedUrl = new URL(req.url, 'http://localhost:5700');
    const originData = normalizedUrl.pathname.replace('/', '');
    const toCase = normalizedUrl.searchParams.get('toCase');
    const errorObj = getErrorObj(originData, toCase);

    if (errorObj.errors.length) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';

      res.end(JSON.stringify(errorObj));

      return;
    }

    const changedData = convertToCase(originData, toCase);

    res.statusCode = 200;
    res.statusMessage = 'OK';

    res.end(JSON.stringify({
      originalCase: changedData.originalCase,
      targetCase: toCase,
      originalText: originData,
      convertedText: changedData.convertedText,
    }));
  });
};

module.exports = {
  createServer,
};
