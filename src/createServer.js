/* eslint-disable no-console */
const http = require('http');
const { validateReq } = require('./validateReq');
const { prepareResponse } = require('./prepareResponse');

const createServer = () => {
  const server = http.createServer((req, res) => {
    const normalizedUrl = new URL(req.url, `http://${req.headers.host}`);
    const textToConvert = normalizedUrl.pathname.slice(1);
    const caseToConvert = normalizedUrl.searchParams.get('toCase');
    const errors = validateReq(textToConvert, caseToConvert);
    const response = prepareResponse(textToConvert, caseToConvert);

    res.setHeader = ('Content-Type', 'application/json');
    res.statusCode = errors.length === 0 ? 200 : 400;
    res.statusText = errors.length === 0 ? 'OK' : 'Bad request';

    if (errors.length !== 0) {
      console.log(errors);
      res.end(JSON.stringify({ errors }));
    }

    if (errors.length === 0) {
      console.log(response);
      res.end(JSON.stringify({ response }));
    }
  });

  return server;
};

module.exports = { createServer };
