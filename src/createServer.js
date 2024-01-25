const http = require('http');
const { convertToCase } = require('./convertToCase');
const { findErrors } = require('./validation');

const createServer = () => {
  return http.createServer((req, res) => {
    res.setHeader('Content-type', 'application/json');

    const { url } = req;
    const normURL = new URL(url, 'http://localhost:5700');
    const [text] = url.slice(1).split('?');
    const caseName = normURL.searchParams.get('toCase');

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
};

module.exports = {
  createServer,
};
