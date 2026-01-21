const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { validateRequest } = require('./validateRequest');

function createServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const normalizedRequest = (req.url).split('?');
    const requestText = normalizedRequest[0].slice(1);
    const searchUrlPart = new URLSearchParams(normalizedRequest[1]);
    const requestCase = searchUrlPart.get('toCase');
    const error = validateRequest(requestText, requestCase);
    let response;

    if (error.errors.length) {
      res.statusCode = 400;
      response = JSON.stringify(error);
    } else {
      const modifiedText = convertToCase(requestText, requestCase);
      const responseText = {
        ...modifiedText,
        originalText: requestText,
        targetCase: requestCase,
      };

      res.statusCode = 200;
      response = JSON.stringify(responseText);
    }

    res.end(response);
  });

  return server;
}

module.exports = { createServer };
