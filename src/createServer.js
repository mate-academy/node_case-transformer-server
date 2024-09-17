const { convertToCase } = require('./convertToCase/convertToCase.js');
const http = require('http');
const { isValideUrl } = require('./validation.js');

const createServer = () => {
  return http.createServer((req, res) => {
    const normaizeUrl = new URL(req.url, `http://${req.headers.host}`);
    const originalText = normaizeUrl.pathname.slice(1);
    const targetCase = normaizeUrl.searchParams.get('toCase');
    const errors = isValideUrl(originalText, targetCase);

    res.setHeader('Content-Type', 'application/json');

    if (errors.length) {
      res.statusCode = 400;
      res.statusText = 'Bad request';
      res.end(JSON.stringify({ errors }));

      return;
    }

    const convertedText = convertToCase(originalText, targetCase);

    res.end(JSON.stringify({
      ...convertedText,
      originalText,
      targetCase,
    }));
  });
};

module.exports.createServer = createServer;
