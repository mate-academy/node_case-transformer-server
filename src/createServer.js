const http = require('http');
const { convertToCase } = require('./convertToCase');
const { validation } = require('./validation');

const createServer = () => {
  return http.createServer((req, res) => {
    res.setHeader('Content-type', 'application/json');

    const { url } = req;
    const normalizeUrl = new URL(url, 'http://localhost:5700');
    const [path] = url.slice(1).split('?');
    // const path = decodeURIComponent(normalizeUrl.pathname.slice(1));
    const toCase = normalizeUrl.searchParams.get('toCase');

    const errorsList = validation(path, toCase);

    if (errorsList.length > 0) {
      res.statusCode = 400;

      return res.end(JSON.stringify({ errors: errorsList }));
    }

    const { originalCase, convertedText } = convertToCase(path, toCase);

    res.statusCode = 200;

    res.end(
      JSON.stringify({
        originalCase,
        targetCase: toCase,
        originalText: path,
        convertedText,
      }),
    );
  });
};

module.exports = {
  createServer,
};
