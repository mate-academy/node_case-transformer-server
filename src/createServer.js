/* eslint-disable max-len */
// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
const http = require('http');
const { convertToCase } = require('./convertToCase');

const createServer = () => {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const normalizedURL = new URL(req.url, `http://${req.headers.host}`);
    const caseName = normalizedURL.searchParams.get('toCase');
    const text = normalizedURL.pathname.slice(1);
    const convertedToCase = convertToCase(text, caseName);
    const findError = (text1, caseName1) => {
      const validCaseNames = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
      const containerFoundErrors = [];
      const containerErrors = [
        { error: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' },
        { error: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' },
        { error: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.' },
      ];

      if (!text1) {
        containerFoundErrors.push(containerErrors[0]);
      }

      if (!caseName1) {
        containerFoundErrors.push(containerErrors[1]);
      }

      if (!validCaseNames.includes(caseName1)) {
        containerFoundErrors.push(containerErrors[2]);
      }

      return containerFoundErrors;
    };

    const errors = findError(text, caseName);
    // console.log(error)

    if (errors.length > 0) {
      res.statusCode = 404;
      // res.statusMessage = 'something went wrong';
      res.end(JSON.stringify(errors));

      return;
    }

    const requestData = JSON.stringify(convertedToCase);

    res.end(requestData);
    // res.end(convertedToCase);
  });

  return server;
};

module.exports = { createServer };
