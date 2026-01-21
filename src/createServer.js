const http = require('http');
const {parseParams} = require("./parseParams");
const {getErrors} = require("./getErrors");
const {sendResponse} = require("./sendResponse");


function createServer() {
  const server = http.createServer((req, res) => {
    const { text, toCase } = parseParams(req);
    const errors = getErrors(text, toCase);

    sendResponse(errors, res, text, toCase);
  });

  return server;
}

module.exports = { createServer };
