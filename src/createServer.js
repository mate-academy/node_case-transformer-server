/* eslint-disable no-console */
const http = require('http');
const { convertToCase } = require('./convertToCase/');
const { queryValidator } = require('./queryValidator');

const createServer = () => {
  return http.createServer((req, res) => {
    const [text, queryString] = req.url.slice(1).split('?');

    const caseType = new URLSearchParams(queryString).get('toCase');

    res.setHeader('Content-Type', 'application/json');

    const errors = queryValidator(text, caseType);

    if (errors.length) {
      res.statusCode = 400;
      res.statusText = 'Bad request';
      res.end(JSON.stringify({ errors }));

      return;
    }

    res.statusCode = 200;
    res.statusText = 'OK';

    const { originalCase, convertedText } = convertToCase(text, caseType);

    res.end(JSON.stringify(
      {
        originalCase,
        targetCase: caseType,
        originalText: text,
        convertedText,
      },
    ));
  });
};

module.exports = {
  createServer,
};
