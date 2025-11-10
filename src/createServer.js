const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { detectCase } = require('./convertToCase/detectCase');
const { inputValidation } = require('./utils/inputValidation');

const createServer = () => {
  const server = http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const text = url.pathname.slice(1);
    const caseName = url.searchParams.get('toCase') || null;

    const errors = inputValidation(text, caseName);

    if (errors.length !== 0) {
      return res.writeHead(400, { 'Content-Type': 'application/json' }).end(
        JSON.stringify({
          errors,
        }),
      );
    }

    const result = convertToCase(text, caseName);

    res.writeHead(200, { 'Content-Type': 'application/json' }).end(
      JSON.stringify({
        originalCase: result.originalCase,
        targetCase: detectCase(result.convertedText),
        originalText: text,
        convertedText: result.convertedText,
      }),
    );
  });

  return server;
};

module.exports = {
  createServer,
};
