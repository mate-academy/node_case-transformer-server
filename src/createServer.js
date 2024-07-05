const http = require('http');
const { convertToCase } = require('./convertToCase');
const { parseQueryParams } = require('./parseQueryParams');
const { validateInput } = require('./validateInput');

const createServer = () => {
  return http.createServer((req, res) => {
    const { path, params } = parseQueryParams(req.url);
    const text = path.slice(1);
    const caseName = params.get('toCase');

    const errors = validateInput(text, caseName);

    if (errors.length > 0) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ errors }));

      return;
    }

    const { originalCase, convertedText } = convertToCase(
      text,
      caseName.toUpperCase(),
    );

    res.writeHead(200, { 'Content-Type': 'application/json' });

    res.end(
      JSON.stringify({
        originalCase,
        targetCase: caseName.toUpperCase(),
        originalText: text,
        convertedText,
      }),
    );
  });
};

module.exports = { createServer };
