const http = require('http');
const url = require('url');
const createResponseObj = require('./createResponseObj').createResponseObj;

const createServer = () => {
  const server = http.createServer((req, res) => {
    const nomalizedUrl = new url.URL(req.url, `http://${req.headers.host}`);
    const textToConvert = nomalizedUrl.pathname.slice(1);
    const caseName = nomalizedUrl.searchParams.get('toCase');
    const response = createResponseObj(textToConvert, caseName);

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(response));
  });

  return server;
};

module.exports = { createServer };
