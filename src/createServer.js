const http = require('http');

const { convertToCase } = require('./convertToCase');
const { parseURL } = require('./parseURL');
const { validateData } = require('./validateData');

const createServer = () => {
  const server = http.createServer((req, res) => {
    const { stringCase, queryString } = parseURL(req.url, req.headers.host);
    const validation = validateData(queryString, stringCase);

    res.writeHead(200, { 'Content-Type': 'application/json' });

    if (!validation.errors.length) {
      const result = {
        ...convertToCase(queryString, stringCase),
        originalText: queryString,
        targetCase: stringCase,
      };

      res.statusCode = 200;
      res.end(JSON.stringify(result));

      return;
    }

    res.statusCode = 400;
    res.end(JSON.stringify(validation));
  })

  return server;
}

createServer();

module.exports = { createServer };
