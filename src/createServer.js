/* eslint-disable max-len */
/* eslint-disable no-console */
const http = require('http');
const { convertToCase } = require('./convertToCase/index');
const { createError } = require('./createError');

const supportedCases = {
  SNAKE: true,
  KEBAB: true,
  CAMEL: true,
  PASCAL: true,
  UPPER: true,
};

const PORT = 8080;

function createServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const normalizedURL = new URL(req.url, `https://${req.headers.host}`);

    const queryToFormat = req.url.split('?')[0].slice(1);
    const format = Object.fromEntries(normalizedURL.searchParams.entries());
    const toCase = Object.keys(format)[0];
    const givenCase = Object.values(format)[0];
    const normalizedToCase = toCase.includes('?') ? toCase.split('?')[1] : toCase;
    const errorArray = [];

    if (!queryToFormat || queryToFormat.length === 0) {
      errorArray.push('Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>"');
    }

    if (normalizedToCase.length === 0) {
      errorArray.push('"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>"');
    }

    if (!('toCase' in format) && normalizedToCase.length > 0) {
      errorArray.push('"toCase" is spelled wrong, check your spelling');
    }

    console.log(supportedCases[givenCase]);

    if (!supportedCases[givenCase]) {
      errorArray.push('This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER');
    }

    if (errorArray.length > 0) {
      res.statusCode = 400;
      res.end(createError(errorArray));
    }

    const result = convertToCase(queryToFormat, format.toCase);
    const responseObject = {
      originalCase: result.originalCase,
      targetCase: format.toCase,
      originalText: queryToFormat,
      convertedText: result.convertedText,
    };

    res.end(JSON.stringify(responseObject, null, 2));
  });

  server.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
  });

  return server;
}

createServer();

module.exports = {
  createServer,
};
