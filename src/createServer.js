const http = require('http');
const { convertToCase } = require('./convertToCase');
const { setError } = require('./convertToCase/setError');

const URL_PARAMS = 'toCase';

function createServer() {
  const server = http.createServer((req, res) => {
    const [text, searchParams] = req.url.split('?');
    const textToConvert = text.slice(1);
    const params = new URLSearchParams(searchParams);
    const toCase = params.get(URL_PARAMS);

    const response = convertData(textToConvert, toCase);

    res.setHeader('Content-type', 'application/json');
    res.end(JSON.stringify(response, null, 2));
  });

  return server;
}

function convertData(text, caseName) {
  const responseError = setError({ caseName, text });

  return responseError.errors.length
    ? responseError
    : {
      ...convertToCase(text, caseName),
      originalText: text,
      targetCase: caseName,
    };
}

module.exports = {
  createServer,
};
