const http = require('http');
const { validateUrl } = require('./validateUrl');
const { convertToCase } = require('./convertToCase');

const createServer = () => {
  const server = http.createServer((req, res) => {
    const normalizedUrl = new URL(req.url, `http://${req.headers.host}`);
    const { pathname, searchParams } = normalizedUrl;

    const text = pathname.slice(1);
    const toCase = searchParams.get('toCase');

    const sendResponse = (code, message, data) => {
      res.statusCode = code;
      res.statusMessage = message;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(data));
    };

    const validationErrors = validateUrl(text, toCase);

    if (validationErrors.length) {
      sendResponse(400, 'Bad Request', { errors: validationErrors });

      return;
    }

    const responseData = {
      ...convertToCase(text, toCase),
      targetCase: toCase,
      originalText: text,
    };

    sendResponse(200, 'OK', responseData);
  });

  return server;
};

module.exports = { createServer };
