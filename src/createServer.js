const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { validate } = require('./validation');

const createServer = () => {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    try {
      const url = req.url.slice(1).split('?');
      const text = url[0];
      const caseName = new URLSearchParams(url[1]).get('toCase');

      validate(text, caseName);

      const result = convertToCase(text, caseName);

      res.end(
        JSON.stringify({
          originalCase: result.originalCase,
          targetCase: caseName,
          originalText: text,
          convertedText: result.convertedText,
        }),
      );
    } catch (errors) {
      res.end(JSON.stringify({ errors }));
    }
  });

  return server;
};

module.exports = {
  createServer,
};
