const http = require('http');
const { convertToCase } = require('./convertToCase');
const { validateRequest } = require('./validateRequest');

const createServer = () => {
  return http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    if (req.url === '/favicon.ico') {
      return;
    }

    const url = new URL(req.url, `http://${req.headers.host}`);
    const originalText = url.pathname.slice(1);
    const targetCase = url.searchParams.get('toCase');

    const [errors, isValid] = validateRequest(originalText, targetCase);

    if (!isValid) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.end(JSON.stringify(errors));

      return;
    }

    const data = convertToCase(originalText, targetCase);

    const resData = {
      ...data,
      targetCase,
      originalText,
    };

    res.statusCode = 200;
    res.statusMessage = 'OK';
    res.end(JSON.stringify(resData));
  });
};

const server = createServer();

server.listen(3000, () => {});

module.exports = { createServer };
