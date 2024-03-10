const http = require('http');

const { convertToCase } = require('./convertToCase');

function createServer() {
  const server = http.createServer((req, res) => {
    const errors = [];

    const normalizedURL = new URL(req.url, `http://${req.headers.host}`);

    const textToConvert = normalizedURL.pathname.slice(1);

    const caseName = normalizedURL.searchParams.get('toCase');

    const invalidTextToConvert = 'Text to convert is required. '
    + 'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';

    const invalidCaseName = '"toCase" query param is required. Correct request'
    + ' is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';

    const casesVariables = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

    const caseInvalid = 'This case is not supported. Available'
    + ' cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.';

    if (!textToConvert) {
      errors.push(
        {
          message: invalidTextToConvert,
        },
      );
    }

    if (!caseName) {
      errors.push(
        {
          message: invalidCaseName,
        },
      );
    } else if (
      !casesVariables
        .includes(caseName.toUpperCase())
    ) {
      errors.push(
        {
          message: caseInvalid,
        },
      );
    }

    if (errors.length > 0) {
      res.writeHead(400, 'Bad Request', { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ errors }));
    } else {
      res.writeHead(200, 'OK', {
        'Content-Type': 'application/json',
      });

      const { originalCase, convertedText } = convertToCase(
        textToConvert, caseName,
      );

      const object = {
        originalCase,
        targetCase: caseName,
        originalText: textToConvert,
        convertedText,
      };

      res.end(JSON.stringify(object));
    }
  });

  return server;
}

module.exports = {
  createServer,
};
