/* eslint-disable max-len */
// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
const http = require('http');
const url = require('url');
const { convertToCase } = require('./convertToCase');

const createServer = () => {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-type', 'application/json');

    const normalizedUrl = new url.URL(req.url, `http://${req.headers.host}`);
    const targetText = normalizedUrl.pathname.slice(1);

    const errors = {
      errors: [],
    };

    if (!targetText) {
      errors.errors.push({
        message: `Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
      });
    }

    const toCase = normalizedUrl.searchParams.get('toCase');

    if (!toCase) {
      errors.errors.push({
        message: `"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
      });
    } else {
      const caseTypes = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

      if (!caseTypes.includes(toCase)) {
        errors.errors.push({
          message: `This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.`,
        });
      }
    }

    if (errors.errors.length) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';

      res.end(JSON.stringify(errors));
    } else {
      const result = convertToCase(targetText, toCase);

      const response = {
        originalCase: result.originalCase,
        targetCase: toCase,
        originalText: targetText,
        convertedText: result.convertedText,
      };

      res.statusCode = 200;
      res.statusMessage = 'OK';

      res.end(JSON.stringify(response));
    }
  });

  return server;
};

module.exports = {
  createServer,
};
