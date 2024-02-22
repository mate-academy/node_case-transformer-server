/* eslint-disable max-len */
const http = require('http');
const { prepareResponseContent } = require('./helpers/prepareResponseContent');
const { endResponseSuccessful } = require('./helpers/endResponse/endResponseSuccessful');
const { endResponseWithError } = require('./helpers/endResponse/endResponseWithError');

function createServer() {
  return http.createServer((request, response) => {
    response.setHeader('Content-Type', 'application/json');

    prepareResponseContent(request)
      .then(data => endResponseSuccessful(data, response))
      .catch(errors => endResponseWithError(errors, response));
  });
}

module.exports = { createServer };
