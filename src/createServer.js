// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
const { convertToCase } = require('./convertToCase/convertToCase');
const http = require('http');

const createServer = (port) => {
  return http.createServer((req, res) => {
    const url = new URL(req.url, 'http://localhost:5700');
    const params = url.pathname.slice(1);
    const toCase = url.searchParams.get('toCase');

    res.setHeader('Content-type', 'application/json');

    try {
      if (!params) {
        throw new Error();
      }

      const result = convertToCase(params, toCase);

      res.writeHead(200);

      res.end(JSON.stringify(
        {
          convertedText: result.convertedText,
          originalCase: result.originalCase,
          originalText: params,
          targetCase: toCase,
        },
      ));
    } catch (error) {
      const errors = [];
      const avaivableCases = ['PASCAL', 'KEBAB', 'SNAKE', 'UPPER', 'CAMEL'];

      if (!params) {
        // eslint-disable-next-line max-len
        errors.push('Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".');
      }

      if (!toCase) {
        // eslint-disable-next-line max-len
        errors.push('"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".');
      } else {
        const isCaseValid = avaivableCases.includes(toCase);

        if (!isCaseValid) {
          // eslint-disable-next-line max-len
          errors.push('This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.');
        }
      }
      res.writeHead(400);

      const preparedErrors = errors.map(err => ({ message: err }));

      res.end(JSON.stringify({
        errors: preparedErrors,
      }));
    }
  });
};

module.exports = {
  createServer,
};
