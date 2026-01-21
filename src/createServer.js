const http = require('http');
const { validationURL } = require('./validationUrl');
const { convertToCase } = require('./convertToCase/convertToCase');

const createServer = () => {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-type', 'application/json');

    const textToConvert = req.url.split('?')[0].slice(1);
    const normalizeURL = new URL(req.url, `http://${req.headers.host}`);
    const toCase = normalizeURL.searchParams.get('toCase');

    const errors = validationURL(textToConvert, toCase);

    if (errors.length) {
      res.statusCode = '400';
      res.statusMessage = 'Bad request';
      res.end(JSON.stringify({ errors }));

      return;
    }

    const data = convertToCase(textToConvert, toCase);

    res.statusCode = '200';
    res.statusMessage = 'ok';

    res.end(JSON.stringify({
      originalCase: data.originalCase,
      targetCase: toCase,
      originalText: textToConvert,
      convertedText: data.convertedText,
    }));
  });

  return server;
};

module.exports = { createServer };
