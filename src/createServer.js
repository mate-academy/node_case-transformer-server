'use strict';

const http = require('http');
const { getParamsOfUrl } = require('./getParamsOfUrl');

const { convertToCase } = require('./convertToCase/convertToCase');

function createServer() {
  const server = http.createServer((req, res) => {
    const [text, toCase] = getParamsOfUrl(req);

    const errors = [];

    /* eslint-disable */
    if (!text) {
      errors.push({ message: 'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' });
    }

    if (!toCase) {
      errors.push({ message: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' });
    } else if (!['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'].includes(toCase)) {
      errors.push({ message: `This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.` });
    }
    /* eslint-enable */

    if (errors.length > 0) {
      res.writeHead(400, { 'Content-Type': 'application/json' });

      return res.end(JSON.stringify({ errors }));
    }

    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;

    const result = convertToCase(text, toCase);

    res.end(
      JSON.stringify({
        originalCase: result.originalCase,
        targetCase: toCase,
        originalText: text,
        convertedText: result.convertedText,
      }),
    );
  });

  return server;
}

module.exports = { createServer };
