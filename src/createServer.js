// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
const http = require('node:http');

const { convertToCase } = require('./convertToCase/convertToCase.js');
const { validateRequest } = require('./convertToCase/validateRequest.js');

const createServer = () => {
  const server = http.createServer((request, response) => {
    const { url } = request;
    let responseBody;
    
    response.setHeader('Content-Type', 'application/json');

    try {
      const [path, queryParams] = url.split('?');
      const strToConvert = path.slice(1);
      const params = new URLSearchParams(queryParams);
      const toCase = params.get('toCase');

      const errors = validateRequest(strToConvert, toCase);

      if (errors.length) {
        response.statusCode = 400;

        responseBody = {
          errors,
        };
      } else {
        const convertedText = convertToCase(strToConvert, toCase);

        responseBody = {
          originalCase: convertedText.originalCase,
          targetCase: toCase,
          originalText: strToConvert,
          convertedText: convertedText.convertedText,
        };
      }

      response.end(JSON.stringify(responseBody));
    } catch (err) {
      response.statusCode = 500;

      response.end(JSON.stringify({ errors: [{ message: err.message }] }));
    }
  });

  return server;
};

module.exports = {
  createServer,
};
