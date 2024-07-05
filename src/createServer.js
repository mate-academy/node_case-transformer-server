const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { validate } = require('./validate');

function createServer() {
  return http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const [params, queryParams] = req.url.split('?');

    const parsedQueryParams = new URLSearchParams(queryParams);
    const toCase = parsedQueryParams.get('toCase');

    const targetWord = params
      .split('')
      .splice(1, params.length - 1)
      .join('');

    const errors = validate(targetWord, toCase);

    if (errors.length > 0) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ errors }));

      return;
    }

    const { originalCase, convertedText } = convertToCase(targetWord, toCase);

    res.writeHead(200, { 'Content-Type': 'application/json' });

    res.end(
      JSON.stringify({
        originalCase: originalCase,
        targetCase: toCase,
        originalText: targetWord,
        convertedText: convertedText,
      }),
    );
  });
}
module.exports = { createServer };
