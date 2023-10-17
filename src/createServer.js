/* eslint-disable no-useless-escape */
/* eslint-disable max-len */
/* eslint-disable no-console */
const http = require('http');
const url = require('url');
const { convertToCase } = require('./convertToCase/convertToCase');

const createServer = () => {
  const server = http.createServer((req, res) => {
    const { pathname, searchParams } = new url.URL(
      req.url,
      `http://${req.headers.host}`,
    );
    const textToConvert = pathname.slice(1);
    const toCase = searchParams.get('toCase');

    res.setHeader('Content-Type', 'application/json');

    const errors = [];

    if (!textToConvert) {
      errors.push({ message: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' });
    }

    if (!toCase) {
      errors.push({ message: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' });
    } else if (!['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'].includes(toCase)) {
      errors.push({ message: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.' });
    }

    if (errors.length > 0) {
      res.statusCode = 400;
      res.end(JSON.stringify({ errors }));

      return server;
    }

    try {
      const convertToCaseResult = convertToCase(textToConvert, toCase);
      const result = {
        originalCase: convertToCaseResult.originalCase,
        targetCase: toCase,
        originalText: textToConvert,
        convertedText: convertToCaseResult.convertedText,
      };

      res.statusCode = 200;
      res.end(JSON.stringify(result));
    } catch (error) {
      console.error(`Error: ${error}`);
      res.statusCode = 500;
      res.end(JSON.stringify({ error: 'Internal Server Error' }));
    }
  });

  return server;
};

module.exports = {
  createServer,
};
