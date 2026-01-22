const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { validateParams } = require('./validation');

const createServer = () => {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    try {
      const url = req.url.slice(1).split('?');
      const text = url[0];
      const caseName = new URLSearchParams(url[1]).get('toCase');

      validateParams(text, caseName);

      const result = convertToCase(text, caseName);

      res.statusCode = 200;
      res.statusMessage = 'OK';

      res.end(
        JSON.stringify({
          originalCase: result.originalCase,
          targetCase: caseName,
          originalText: text,
          convertedText: result.convertedText,
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

module.exports = {
  createServer,
};
