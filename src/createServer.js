const http = require('http');
const ERROR_MESSAGES = require('./utils/errors');
const { convertToCase } = require('./convertToCase/convertToCase');

const { INVALID_TEXT, INVALID_TO_CASE, INVALID_TO_CASE_VALUE } = ERROR_MESSAGES;

const UPPER_CASE = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function validateInput(word, query) {
  const errors = [];

  if (!word) {
    errors.push({
      message: INVALID_TEXT,
    });
  }

  if (!query) {
    errors.push({
      message: INVALID_TO_CASE,
    });
  } else if (!UPPER_CASE.includes(query.toUpperCase())) {
    errors.push({
      message: INVALID_TO_CASE_VALUE,
    });
  }

  return errors;
}

const createServer = () => {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
    const targetCase = parsedUrl.searchParams.get('toCase') || '';
    const originalText = parsedUrl.pathname.slice(1);

    const errors = validateInput(originalText, targetCase);

    if (errors.length > 0) {
      res.statusCode = 400;
      res.end(JSON.stringify({ errors }));

      return;
    }

    try {
      const convertedWord = convertToCase(originalText, targetCase);
      const result = {
        originalText: originalText,
        targetCase: targetCase.toUpperCase(),
        originalCase: convertedWord.originalCase,
        convertedText: convertedWord.convertedText,
      };

      res.statusCode = 200;
      res.statusMessage = 'OK';
      res.end(JSON.stringify(result));
    } catch (error) {
      res.statusCode = 400;
      res.end(JSON.stringify({ errors: [{ message: error.message }] }));
    }
  });

  return server;
};

module.exports = { createServer };
