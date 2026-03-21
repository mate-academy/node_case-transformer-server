const http = require('node:http');

const { prepareUrl } = require('./servises/prepareUrl');
const { convertToCase } = require('./convertToCase/convertToCase');
const { prepareErrors } = require('./servises/prepareErrors');

function createServer() {
  const server = http.createServer((req, res) => {
    try {
      const params = prepareUrl(req.url, req.headers.host);

      if (params.errorArr && params.errorArr.length > 0) {
        const errorResponse = prepareErrors(params.errorArr);

        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');

        return res.end(JSON.stringify({ errors: errorResponse }));
      }

      const data = convertToCase(params.textToConvert, params.caseToConvert);

      const response = {
        originalCase: data.originalCase,
        targetCase: params.caseToConvert,
        originalText: params.textToConvert,
        convertedText: data.convertedText,
      };

      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(response));
    } catch (err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: 'Internal Server Error' }));
    }
  });

  return server;
}

module.exports = {
  createServer,
};
