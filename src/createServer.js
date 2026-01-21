const http = require('http');
const { convertToCase } = require('./convertToCase');
const { errorHandler } = require('./errorHandler');

require('dotenv').config();

const BASE = 'http://localhost' + ':' + process.env.PORT;

function createServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const params = new URL(req.url, BASE);
    const textToConvert = req.url.slice(1).split('?')[0];
    const toCase = params.searchParams.get('toCase');
    const isError = errorHandler(res, textToConvert, toCase);

    if (isError) {
      return;
    }

    const convertedMsg = convertToCase(textToConvert, toCase);

    res.statusCode = 200;

    const JSONResponse = {
      originalCase: convertedMsg.originalCase,
      targetCase: toCase,
      originalText: textToConvert,
      convertedText: convertedMsg.convertedText,
    };

    res.end(JSON.stringify(JSONResponse));
  });

  return server;
}

module.exports = { createServer, BASE };
