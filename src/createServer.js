/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
const http = require('http');
const { convertToCase } = require('./convertToCase');

function createServer() {
  return http.createServer((req, res) => {
    const errorRes = { errors: [] };

    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;

    const splitUrl = req.url.slice(1).split('?toCase=');

    if (splitUrl[0] === '') {
      errorRes.errors.push({
        message: `Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
      });
    }

    if (splitUrl.length === 1) {
      errorRes.errors.push({
        message: `"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
      });
    }

    if (
      !['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'].includes(splitUrl[1]) &&
      splitUrl.length !== 1
    ) {
      errorRes.errors.push({
        message: `This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.`,
      });
    }

    if (errorRes.errors.length > 0) {
      res.statusCode = 400;
      res.end(JSON.stringify(errorRes));
    } else {
      const { convertedText, originalCase } = convertToCase(
        ...splitUrl.slice(0, 2),
      );

      res.end(
        JSON.stringify({
          originalCase,
          targetCase: splitUrl[1],
          originalText: splitUrl[0],
          convertedText,
        }),
      );
    }
  });
}

module.exports = {
  createServer,
};
