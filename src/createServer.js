const http = require('http');
const { convertToCase } = require('./convertToCase');
const { checkValidation } = require('./checkValidation');

const createServer = () => {
  const server = http.createServer((request, response) => {
    response.setHeader('Content-type', 'application/json');

    const [originString, queryCase] = request.url.slice(1).split('?');

    const toCase = queryCase?.split('=')[1];

    const errors = checkValidation(originString, toCase);

    if (errors.length) {
      response.statusCode = 400;
      response.statusMessage = 'Status: Bad Request';
      response.end(JSON.stringify({ errors }));
    } else {
      response.statusCode = 200;
      response.statusMessage = 'OK';

      const result = convertToCase(originString, toCase);

      result.targetCase = toCase;
      result.originalText = originString;

      response.end(JSON.stringify(result));
    }
  });

  return server;
};

module.exports = {
  createServer,
};
