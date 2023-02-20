const http = require('http');

const { convertToCase } = require('./convertToCase');
const { validateData } = require('./validateData');

const createServer = () => {
  const server = http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const requestPath = url.pathname.slice(1); // 'UnitedStates'
    const entries = Object.fromEntries(url.searchParams.entries());
    // { toCase: 'UPPER'}
    const query = entries.toCase; // 'UPPER'

    res.setHeader('Content-Type', 'application/json');

    const foundErrors = validateData(requestPath, query);

    if (foundErrors.length > 0) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.end(JSON.stringify({ errors: foundErrors }));

      return;
    }

    res.statusCode = 200;
    res.statusMessage = 'OK';

    const providedData = {
      targetCase: query,
      originalText: requestPath,
    };
    const convertedPart = convertToCase(requestPath, query);
    const okResponse = Object.assign({}, convertedPart, providedData);

    res.end(JSON.stringify(okResponse));
  });

  return server;
};

module.exports = { createServer };
