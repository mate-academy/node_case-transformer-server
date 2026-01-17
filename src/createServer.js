/* eslint-disable max-len */
const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const {
  TEXT_REQUIRED,
  TO_CASE_REQUIRED,
  CASE_NOT_SUPPORTED,
} = require('./constants/errorMessages');

const availableCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function createServer() {
  return http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const url = new URL(req.url, `http://${req.headers.host}`);
    const text = url.pathname.slice(1);
    const toCase = url.searchParams.get('toCase');

    const errors = [];

    if (!text) {
      errors.push({ message: TEXT_REQUIRED });
    }

    if (!toCase) {
      errors.push({ message: TO_CASE_REQUIRED });
    }

    if (toCase && !availableCases.includes(toCase)) {
      errors.push({ message: CASE_NOT_SUPPORTED });
    }

    if (errors.length > 0) {
      res.statusCode = 400;
      res.statusMessage = 'Bad Request';
      res.end(JSON.stringify({ errors }));

      return;
    }

    const { originalCase, convertedText } = convertToCase(text, toCase);

    res.statusCode = 200;
    res.statusMessage = 'OK';

    res.end(
      JSON.stringify({
        originalCase,
        targetCase: toCase,
        originalText: text,
        convertedText,
      }),
    );
  });
}

module.exports = {
  createServer,
};
