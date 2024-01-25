const http = require('http');
const { convertToCase } = require('./convertToCase');
const { findErrors } = require('./validation');

const createServer = () => {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-type', 'application/json');

    const newURL = new URL(req.url, 'http://localhost:5700');
    const [text] = req.url.slice(1).split('?');
    const caseName = newURL.searchParams.get('toCase');

    const errorsList = findErrors(text, caseName);

    if (errorsList.length > 0) {
      res.statusCode = 400;

      return res.end(JSON.stringify({ errors: errorsList }));
    }

    const { originalCase, convertedText } = convertToCase(text, caseName);

    res.statusCode = 200;

    res.end(
      JSON.stringify({
        originalCase,
        targetCase: caseName,
        originalText: text,
        convertedText,
      }),
    );
  });

  return server;
};

module.exports = {
  createServer,
};
