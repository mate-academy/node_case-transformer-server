const http = require('http');

const { convertToCase } = require('./convertToCase/convertToCase');

const { validation } = require('./validation');

const createServer = () => {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    try {
      const url = req.url.slice(1).split('?');
      const text = url[0];
      const queryString = url[1];
      const caseName = new URLSearchParams(queryString).get('toCase');

      res.statusCode = 200;
      res.statusMessage = 'OK';

      validation(text, caseName);

      const convertedText = convertToCase(text, caseName);

      res.end(
        JSON.stringify({
          originalCase: convertedText.originalCase,
          targetCase: caseName,
          originalText: text,
          convertedText: convertedText.convertedText,
        }),
      );
    } catch (errors) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';

      res.end(JSON.stringify({ errors }));
    }
  });

  return server;
};

module.exports = { createServer };
