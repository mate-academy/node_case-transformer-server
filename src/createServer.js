// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
const http = require('http');
const { convertToCase } = require('./convertToCase');

function createServer() {
  const server = http.createServer((req, res) => {
    // eslint-disable-next-line no-console
    console.log(req.method, req.url);

    const errors = [];

    try {
      const [text, query] = req.url.split('?');

      res.setHeader('content-type', 'application/json');

      const newText = text.slice(1);

      if (!newText) {
        const message =
          // eslint-disable-next-line max-len
          'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';

        errors.push({
          message,
        });
      }

      const newQuery = (query || '').split('=');
      const caseName = newQuery && newQuery.length === 2 ? newQuery[1] : '';
      const arrOfCaseName = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

      if (newQuery && newQuery[0] !== 'toCase') {
        const message =
          // eslint-disable-next-line max-len
          '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';

        errors.push({
          message,
        });
      } else if (!arrOfCaseName.includes(caseName)) {
        const message =
          // eslint-disable-next-line max-len
          'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.';

        errors.push({
          message,
        });
      }

      if (errors.length) {
        res.statusCode = 400;

        const err = {
          errors,
        };

        res.end(JSON.stringify(err));

        return;
      }

      const result = convertToCase(newText, caseName);

      const resObj = {
        originalCase: result.originalCase,
        targetCase: caseName,
        originalText: newText,
        convertedText: result.convertedText,
      };

      res.write(JSON.stringify(resObj));
    } catch (e) {
      res.statusCode = 500;
      res.write('Uppps...');
      // eslint-disable-next-line no-console
      console.error(e);
    }

    res.end();
  });

  return server;
}

module.exports = {
  createServer,
};
