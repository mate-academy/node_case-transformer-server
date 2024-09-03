const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { parseURL } = require('./parseURL');
const { validateData } = require('./validateData');
const { sendResponse } = require('./sendResponse');

const createServer = () => {
  return http.createServer((req, res) => {
    const { stringCase, queryString } = parseURL(req.url, req.headers.host);
    const validation = validateData(queryString, stringCase);

    res.writeHead(200, { 'Content-Type': 'application/json' });

    if (!validation.errors.length) {
      const result = {
        ...convertToCase(queryString, stringCase),
        originalText: queryString,
        targetCase: stringCase,
      };

      sendResponse(res, 200, result);

      return;
    }

    if (validation.errors.length) {
      sendResponse(res, 400, validation);
    }
  });
};

createServer();
module.exports.createServer = createServer;
