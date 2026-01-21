/* const { URL } = require('url'); */
const http = require('http');
const { parse: parseQuery } = require('querystring');
const { convertToCase } = require('./convertToCase');

function createServer() {
  return http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const errors = [];
    const supportedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
    const parsedUrl = new URL(req.url, 'http://localhost:5700');
    const path = parsedUrl.pathname;
    const query = parseQuery(parsedUrl.search.substring(1));
    let originalText = '';

    if (path !== undefined && path.length > 1) {
      originalText = path.slice(1);
    } else {
      errors.push({
        message:
          'Text to convert is required. Correct request' +
          ' is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (query.toCase === undefined) {
      errors.push({
        message:
          '"toCase" query param is required. Correct request is: ' +
          '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    } else if (!supportedCases.includes(query.toCase)) {
      errors.push({
        message: `This case is not supported. Available cases: ${supportedCases.join(', ')}.`,
      });
    }

    if (errors.length === 0) {
      const { originalCase, convertedText } = convertToCase(
        originalText,
        query.toCase,
      );

      const responseData = {
        originalCase: originalCase,
        targetCase: query.toCase,
        originalText: originalText,
        convertedText: convertedText,
      };

      res.writeHead(200, 'OK');
      res.end(JSON.stringify(responseData));
    } else {
      res.writeHead(400, 'Bad request');
      res.end(JSON.stringify({ errors }));
    }
  });
}

module.exports = { createServer };
