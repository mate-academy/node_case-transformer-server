/* eslint-disable max-len */
const http = require('http');
const { convertToCase } = require('./convertToCase');
const { validCases } = require('./vars/cases');
const {
  noTextError,
  noToCaseError,
  invalidCaseError,
} = require('./vars/errors');
let result;

function createServer() {
  const server = http.createServer((req, res) => {
    const { pathname, searchParams } = new URL(
      'http://localhost:3000' + req.url,
    );
    const textToConvert = pathname.substring(1);
    const toCase = searchParams.get('toCase');
    const errors = [];

    if (!textToConvert) {
      errors.push({
        message: noTextError,
      });
    }

    if (!toCase) {
      errors.push({
        message: noToCaseError,
      });
    }

    if (toCase && !validCases.includes(toCase.toUpperCase())) {
      errors.push({
        message: invalidCaseError,
      });
    }

    if (errors.length > 0) {
      res.writeHead(400, {
        'Content-Type': 'application/json',
      });

      res.end(JSON.stringify({ errors }));

      return;
    }

    try {
      result = convertToCase(textToConvert, toCase);

      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
    } catch (err) {
      throw err;
    }

    res.end(
      JSON.stringify({
        originalCase: result.originalCase,
        targetCase: toCase.toUpperCase(),
        originalText: textToConvert,
        convertedText: result.convertedText,
      }),
    );
  });

  return server;
}

module.exports = {
  createServer,
};
