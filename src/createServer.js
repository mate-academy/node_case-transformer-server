/* eslint-disable no-console */
'use strict';

const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { errorMessages } = require('./errorMessages');

function createServer() {
  const server = http.createServer((req, res) => {
    const normalizedURL = new URL(req.url, `http://${req.headers.host}`);
    const caseFromURL = normalizedURL.searchParams.get('toCase');
    const textFromURL = normalizedURL.pathname.split('/')[1];
    const caseTypes = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

    const response = {
      status: 200,
      statusMessage: 'OK',
      headers: { 'Content-Type': 'application/json' },
      body: {},
    };

    if (!caseFromURL || !textFromURL || !caseTypes.includes(caseFromURL)) {
      const errors = [];

      if (caseFromURL && !caseTypes.includes(caseFromURL)) {
        errors.push({
          message: errorMessages.wrongCaseType,
        });
      }

      if (!caseFromURL) {
        errors.push({
          message: errorMessages.caseIsRequired,
        });
      }

      if (!textFromURL) {
        errors.push({
          message: errorMessages.textIsRequired,
        });
      }

      if (errors.length > 0) {
        response.statusCode = 400;
        response.statusMessage = 'Bad request';
        response.body.errors = errors;
      }
    } else {
      const {
        originalCase,
        convertedText,
      } = convertToCase(textFromURL, caseFromURL);

      response.body = {
        originalCase,
        targetCase: caseFromURL,
        originalText: textFromURL,
        convertedText,
      };
    }

    res.writeHead(
      response.status,
      response.headers,
      response.statusMessage,
    );
    res.end(JSON.stringify(response.body));
  });

  return server;
}

module.exports = {
  createServer,
};
