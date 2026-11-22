// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
const http = require('node:http');
const { convertToCase } = require('./convertToCase/index.js');
const SUPPORTED_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
const oP = ' SNAKE, KEBAB, CAMEL, PASCAL, UPPER.';
const oPA = '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
const o = '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';

function createServer() {
  return http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const normalized = new URL(req.url || '', `http://${req.headers.host}`);
    const lookFor = normalized.searchParams.get('toCase');
    const text = normalized.pathname.slice(1);

    const errors = [];

    if (!text) {
      errors.push({
        message: `Text to convert is required. Correct request is: ${o}`,
      });
    }

    if (!lookFor) {
      errors.push({
        message: `"toCase" query param is required. Correct request is: ${oPA}`,
      });
    } else if (!SUPPORTED_CASES.includes(lookFor)) {
      errors.push({
        message: `This case is not supported. Available cases:${oP}`,
      });
    }

    if (errors.length) {
       res.writeHead(400, 'Bad request');
      res.end(JSON.stringify({ errors }));

      return;
    }

    const result = convertToCase(text, lookFor);

    res.writeHead(200, { 'Content-Type': 'application/json' });

    res.end(
      JSON.stringify({
        convertedText: result.convertedText,
        originalCase: result.originalCase,
        originalText: text,
        targetCase: lookFor,
      }),
    );
  });
}

module.exports = { createServer };
