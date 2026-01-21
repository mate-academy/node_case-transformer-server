const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { inputValidation } = require('./convertToCase/inputValidation');

const createServer = () => {
  const server = http.createServer((req, res) => {
    try {
      const [path, queryString] = req.url.split('?');
      const params = new URLSearchParams(queryString);

      const targetCase = params.get('toCase');
      const originalText = path.slice(1);

      const errors = inputValidation(originalText, targetCase);

      if (errors.length) {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ errors }));

        return;
      }

      const convertedTextandCase = convertToCase(originalText, targetCase);

      res.setHeader('Content-Type', 'application/json');

      res.write(
        JSON.stringify({
          originalCase: convertedTextandCase.originalCase,
          targetCase: targetCase,
          originalText: originalText,
          convertedText: convertedTextandCase.convertedText,
        }),
      );

      res.end();
    } catch (error) {
      if (error.message.includes('not found')) {
        res.statusCode = 404;
      } else {
        res.statusCode = 500;
      }
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ errors: [{ message: error.message }] }));
    }
  });

  return server;
};

module.exports = {
  createServer,
};
