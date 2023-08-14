/* eslint-disable no-console */
const http = require('http');
const { convertToCase } = require('./convertToCase');
const { error } = require('./error');

const createServer = () => {
  const server = http.createServer((req, res) => {
    const normalizedURL = new URL(req.url, `http://${req.headers.host}`);

    const AvailableCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
    const text = normalizedURL.pathname.slice(1);
    const caseName = normalizedURL.searchParams.get('toCase');

    const response = {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
      body: {
        data: null,
        errors: null,
      },
    };

    if (!text || !caseName || !AvailableCases.includes(caseName)) {
      const errors = [];

      if (!text) {
        errors.push({
          message: error.textIsRequired,
        });
      }

      if (!caseName) {
        errors.push({
          message: error.caseNameIsRequired,
        });
      }

      if (!AvailableCases.includes(caseName)) {
        errors.push({ message: error.invalidCaseName });
      }

      response.status = 400;

      response.body.errors = errors;
    } else {
      response.body.data = convertToCase(text, caseName);
    }

    res.writeHead(response.status, response.headers);
    res.end(JSON.stringify(response.body));
  });

  return server;
};

module.exports = { createServer };
