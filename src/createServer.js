// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
/* eslint-disable no-console */
const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');

const createServer = () => {
  const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const errors = [];
    const input = req.url.split('?');
    const params = new URLSearchParams(input[1]);
    const toCase = params.get('toCase');
    const data = input[0].substring(1);

    if (!data) {
      errors.push({
        message: `Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
      });
    }

    if (!toCase) {
      errors.push({
        message: `"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
      });
    } else if (!cases.includes(toCase)) {
      errors.push({
        message: `This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.`,
      });
    }

    if (errors.length) {
      res.statusCode = 400;
      res.end(JSON.stringify({ errors }));

      return;
    }
    res.statusCode = 200;

    const resultObject = convertToCase(data, toCase);

    res.end(
      JSON.stringify({
        originalCase: resultObject.originalCase,
        targetCase: toCase,
        originalText: data,
        convertedText: resultObject.convertedText,
      }),
    );
  });

  return server;
};

module.exports = {
  createServer,
};
