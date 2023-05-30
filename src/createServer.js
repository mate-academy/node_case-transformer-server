const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { parseURL } = require('./parseURL');
const errorMessages = require('./errorMessages');

const createServer = () => {
  return http.createServer((req, res) => {
    const { stringCase, queryString } = parseURL(req.url, req.headers.host);
    const validation = {
      errors: [],
    };

    res.writeHead(200, { 'Content-Type': 'application/json' });

    if (!queryString) {
      validation.errors.push({
        message: errorMessages.TEXT_REQUIRED,
      });
    }

    if (!stringCase) {
      validation.errors.push({
        message: errorMessages.TOCASE_REQUIRED,
      });
    }

    let result;

    try {
      result = {
        ...convertToCase(queryString, stringCase),
        originalText: queryString,
        targetCase: stringCase,
      };
    } catch {
      if (stringCase) {
        validation.errors.push({
          message: errorMessages.INVALID_CASE,
        });
      }
    }

    if (!validation.errors.length) {
      res.end(JSON.stringify(result));
    } else {
      res.statusCode = 400;
      res.end(JSON.stringify(validation));
    }
  });
};

createServer();
module.exports.createServer = createServer;
