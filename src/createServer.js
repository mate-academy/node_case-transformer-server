/* eslint-disable no-useless-escape */
/* eslint-disable quotes */
const http = require('http');
const { convertToCase } = require('./convertToCase');

// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
const PORT = process.argv.PORT || 3006;

const caseName = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const errorMessage = {
  missingText: `Text to convert is required. Correct request is: \"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>\".`,
  missingCase: `"toCase" query param is required. Correct request is: \"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
  invalidCase: `This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.`,
};

const createServer = () => (
  http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });

    const errors = [];

    const url = new URL(req.url, `http://localhost:${PORT}`);
    const path = url.pathname;
    const originalText = path.slice(1);
    const targetCase = url.searchParams.get('toCase');

    if (!originalText) {
      errors.push({
        message: errorMessage.missingText,
      });
    }

    if (!targetCase) {
      errors.push({
        message: errorMessage.missingCase,
      });
    } else if (!caseName.includes(targetCase)) {
      errors.push({
        message: errorMessage.invalidCase,
      });
    } else {
      try {
        const {
          originalCase,
          convertedText,
        } = convertToCase(originalText, targetCase);

        res.end(JSON.stringify({
          convertedText,
          originalCase,
          originalText,
          targetCase,
        }));

        return;
      } catch (error) {
        errors.push({
          message: error.message,
        });
      }
    }

    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ errors }));
  })
);

module.exports = {
  createServer,
};
