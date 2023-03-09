const http = require('http');
const { validator } = require('./validation').default;
const { convertToCase } = require('./convertToCase/convertToCase');

const createServer = () => {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const url = new URL(req.url, `http://${req.headers.host}`);
    const text = url.pathname.slice(1);
    const targetCase = url.searchParams.get('toCase');
    const errors = validator(text, targetCase);
    const hasError = Boolean(errors.errors.length);

    if (hasError) {
      req.statusCode = 400;
      req.statusMessage = 'Bad request';
      res.end(JSON.stringify(errors));

      return;
    }

    const convertedText = convertToCase(text, targetCase);

    const requestData = JSON.stringify({
      ...convertedText,
      targetCase,
      text,
    });

    res.statusCode(200);
    res.statusMessage('OK');
    res.end(requestData);
  });

  return server;
};

module.exports = {
  createServer,
};
