/* eslint-disable max-len */
const http = require('http');
const { convertToCase } = require('./convertToCase');
const { validCases } = require('./cases');
const { noTextError, noToCaseError, invalidCaseError } = require('./errors');

function createServer() {
  const server = http.createServer((request, response) => {
    const { pathname, searchParams } = new URL(
      'http://localhost:3000' + request.url,
    );

    let result = {};
    const errors = [];
    const textToConvert = pathname.slice(1);
    const toCase = searchParams.get('toCase');

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
      response.writeHead(400, {
        'Content-Type': 'application/json',
      });

      response.end(JSON.stringify({ errors }));

      return;
    }

    try {
      result = convertToCase(textToConvert, toCase);

      response.writeHead(200, {
        'Content-Type': 'application/json',
      });
    } catch (error) {
      throw error;
    }

    response.end(
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
