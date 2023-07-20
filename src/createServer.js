const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { isSearchParamsValid } = require('./errorhandler');

const createServer = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');

  const normalizedURL = new URL(req.url, `http://${req.headers.host}`);
  const caseName = normalizedURL.searchParams.get('toCase');
  const text = normalizedURL.pathname.slice(1);

  const error = isSearchParamsValid(text, caseName);

  if (error) {
    res.statusCode = 400;
    res.statusMessage = 'Bad request';
    res.end(JSON.stringify(error));

    return;
  }

  const {
    originalCase,
    convertedText,
  } = convertToCase(text, caseName);

  res.statusCode = 200;
  res.statusMessage = 'OK';

  res.end(JSON.stringify({
    originalCase,
    targetCase: caseName,
    originalText: text,
    convertedText,
  }));
});

module.exports = createServer;
