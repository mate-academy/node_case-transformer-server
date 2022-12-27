const { detectCase } = require('./convertToCase/detectCase');
const { convertToCase } = require('./convertToCase/convertToCase');

const http = require('http');

// const PORT = process.env.PORT || 8080;

const createServer = () => {
  const server = http.createServer((req, res) => {
    let answerBody = {};

    try {
      res.statusCode = 200;

      const normalizedURL = new URL(req.url, `http://${req.headers.host}`);

      const toCase = normalizedURL.searchParams.get('toCase');

      const text = normalizedURL.pathname.slice(1);
      const originalData = convertToCase(text, toCase);

      answerBody = {
        originalCase: detectCase(text),
        targetCase: toCase,
        originalText: text,
        convertedText: originalData.convertedText,
      };
    } catch (error) {
      res.statusCode = 400;

      answerBody = {
        errors: [
          {
            message: String(error),
          },
        ],
      };
    }

    res.setHeader('Content-Type', 'application/json');

    res.end(JSON.stringify(answerBody));
  });

  return server;
};

module.exports = { createServer };
