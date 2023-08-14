/* eslint-disable no-console */
const http = require('http');
const { convertToCase } = require('./convertToCase');
const { error } = require('./error');

const createServer = () => {
  const server = http.createServer((req, res) => {
    const normalizedURL = new URL(req.url, `http://${req.headers.host}`);

    const AvailableCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
    const originalText = normalizedURL.pathname.slice(1);
    const targetCase = normalizedURL.searchParams.get('toCase');

    const response = {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
      body: {},
    };

    if (!originalText || !targetCase || !AvailableCases.includes(targetCase)) {
      const errors = [];

      if (!originalText) {
        errors.push({
          message: error.textIsRequired,
        });
      }

      if (!targetCase) {
        errors.push({
          message: error.caseNameIsRequired,
        });
      } else if (!AvailableCases.includes(targetCase)) {
        errors.push({ message: error.invalidCaseName });
      }

      response.status = 400;

      response.body.errors = errors;
    } else {
      response.body = {
        originalText,
        targetCase,
        ...convertToCase(originalText, targetCase),
      };
    }

    res.writeHead(response.status, response.headers);
    res.end(JSON.stringify(response.body));
  });

  return server;
};

module.exports = { createServer };
