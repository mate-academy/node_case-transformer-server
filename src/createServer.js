const http = require('http');
const { convertToCase } = require('./convertToCase');
const { normalizeUrl } = require('./normalizeUrl');
const { detectErrors } = require('./detectErrors');

const createServer = () => {
  const server = http.createServer((req, res) => {
    const [text, toCase] = normalizeUrl(req);
    const errors = detectErrors(text, toCase);

    res.setHeader('Content-Type', 'application/json');

    if (errors.length) {
      const errorResponse = {
        errors,
      };

      res.statusCode = 400;
      res.statusText = 'Bad request';

      res.end(JSON.stringify(errorResponse));

      return;
    }

    const {
      originalCase,
      convertedText,
    } = convertToCase(text, toCase);

    const response = {
      originalCase,
      targetCase: toCase,
      originalText: text,
      convertedText,
    };

    res.statusCode = 200;
    res.statusText = 'OK';

    res.end(JSON.stringify(response));
  });

  return server;
};

module.exports = { createServer };
