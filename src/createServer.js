const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { validateRequest } = require('./validateRequest');

function createServer() {
  const server = http.createServer((req, res) => {
    console.log(validateRequest(req.url));

    const { success, errors, targetCase, originalText } = validateRequest(
      req.url,
    );

    if (success) {
      res.setHeader('Content-Type', 'application/json');

      const { originalCase, convertedText } = convertToCase(
        originalText,
        targetCase,
      );
      const payload = {
        originalCase,
        targetCase,
        originalText,
        convertedText,
      };

      console.log(payload);

      res.end(JSON.stringify(payload));
      res.statusCode = 200;
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(errors));
    }
  });

  return server;
}

module.exports = {
  createServer,
};
