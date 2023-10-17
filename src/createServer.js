/* eslint-disable max-len */
const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { CASES, ERROR } = require('./constants');

const createServer = () => http.createServer((req, res) => {
  const requestUrl = new URL(req.url, 'http://' + req.headers.host);
  const targetCase = requestUrl.searchParams.get('toCase');
  const originalText = requestUrl.pathname.slice(1);

  res.setHeader('Content-Type', 'application/json');

  const errors = [];

  if (!originalText) {
    errors.push({ message: ERROR.noText });
  }

  if (!targetCase) {
    errors.push({ message: ERROR.noCase });
  }

  if (targetCase && !CASES.includes(targetCase)) {
    errors.push({ message: ERROR.invalidCase });
  }

  res.statusCode = (errors.length) ? 400 : 200;

  res.write(JSON.stringify((errors.length)
    ? { errors }
    : {
      ...convertToCase(originalText, targetCase),
      targetCase,
      originalText,
    }));

  res.end();
});

module.exports = { createServer };
