const http = require('http');
const { convertToCase } = require('./convertToCase');
const { getErrors } = require('./getErrors');

const createServer = () => {
  const server = http.createServer((req, res) => {
    const normalizeUrl = new URL(req.url, `http://${req.headers.host}`);

    const text = normalizeUrl.pathname.slice(1);
    const getCase = normalizeUrl.searchParams.get('toCase');

    const errors = getErrors(text, getCase);

    if (errors.length !== 0) {
      res.writeHead(400, { 'Content-Type': 'application/json' })
        .end(JSON.stringify({ errors }));

      return;
    }

    const convertedText = convertToCase(text, getCase);

    const response = {
      originalCase: convertedText.originalCase,
      targetCase: getCase,
      originalText: text,
      convertedText: convertedText.convertedText,
    };

    res.writeHead(200, { 'Content-Type': 'application/json' })
      .end(JSON.stringify(response));
  });

  return server;
};

module.exports = { createServer };
