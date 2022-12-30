// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here

const http = require('http');
const { getParams } = require('./ServerFunctions/getParams');
const { getErrors } = require('./ServerFunctions/getErrors');
const {
  getSuccessfulResponse,
} = require('./ServerFunctions/getSuccessfulResponse');
const { getFailedResponse } = require('./ServerFunctions/getFailedResponse');

const createServer = () => {
  const server = http.createServer((request, response) => {
    response.setHeader('Content-Type', 'application/json');

    const [textToConvert, caseToChange] = getParams(request.url.split('?'));

    const errors = getErrors(textToConvert, caseToChange);

    if (errors.length) {
      getFailedResponse(response, errors);

      return;
    }

    getSuccessfulResponse(response, textToConvert, caseToChange);
  });

  return server;
};

module.exports = { createServer };
