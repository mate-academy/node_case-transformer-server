const http = require('http');
const { handleErrors } = require('./handleErrors');
const { convertToCase } = require('./convertToCase/convertToCase');

const createServer = () => {
  const server = http.createServer((req, res) => {
    res.setHeader('content-type', 'application/json');

    const [queryPath, queryParams] = req.url.split('?');

    const params = new URLSearchParams(queryParams);

    const toCase = params.get('toCase');
    const text = queryPath.slice(1);

    const errors = handleErrors(toCase, text);

    if (errors.length > 0) {
      const errResponse = {
        errors,
      };

      res.setHeader('Content-Type', 'application/json');

      res.statusCode = 400;
      res.statusText = 'Bad request';

      res.end(JSON.stringify(errResponse));

      return false;
    }

    const result = convertToCase(text, toCase);

    res.statusCode = 200;

    res.end(JSON.stringify({
      originalCase: result.originalCase,
      targetCase: toCase,
      originalText: text,
      convertedText: result.convertedText,
    }));
  });

  return server;
};

module.exports = {
  createServer,
};
