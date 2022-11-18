const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { validate } = require('./validate');
const { getUrlComponents } = require('./getUrlComponents');

const createServer = () => {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const { originalText, targetCase } = getUrlComponents(req.url);
    const errors = validate(originalText, targetCase);
    let response = {};

    if (errors.length > 0) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      response.errors = errors;
    }

    if (!errors.length) {
      // eslint-disable-next-line max-len
      const { originalCase, convertedText } = convertToCase(originalText, targetCase);

      response = {
        originalCase,
        targetCase,
        originalText,
        convertedText,
      };
    }

    res.end(JSON.stringify(response));
  });

  return server;
};

module.exports = { createServer };
