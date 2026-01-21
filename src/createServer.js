const http = require('http');
const { convertToCase } = require('./convertToCase/');
const { checkUrlParams } = require('./checkUrlParams');

const getParamsFromUrl = (url) => {
  const normalizedUrl = new URL(url, 'http://localhost');
  const originalText = normalizedUrl.pathname.slice(1);
  const targetCase = normalizedUrl.searchParams.get('toCase');

  return {
    originalText,
    targetCase,
  };
};

const createServer = () => {
  return http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const { originalText, targetCase } = getParamsFromUrl(req.url);
    const errors = checkUrlParams(originalText, targetCase);

    if (errors.length) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.end(JSON.stringify({ errors }));

      return;
    }

    const {
      originalCase, convertedText,
    } = convertToCase(originalText, targetCase);

    res.statusCode = 200;
    res.statusMessage = 'OK';

    res.end(JSON.stringify({
      originalCase,
      targetCase,
      originalText,
      convertedText,
    }));
  });
};

module.exports = { createServer };
