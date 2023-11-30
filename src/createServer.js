const http = require('http');
const { convertToCase } = require('./convertToCase');

function createServer() {
  const server = http.createServer((req, res) => {
    const [urlPart, queryString] = req.url.split('?');
    const params = new URLSearchParams(queryString);
    const toCase = params.get('toCase');

    if (
      !urlPart
      || !toCase
      || !['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'].includes(toCase)
    ) {
      res.writeHead(400, { 'Content-Type': 'application/json' });

      res.end(
        JSON.stringify({
          errors: [{ message: 'Your error message here' }],
        }),
      );

      return;
    }

    const result = convertToCase(urlPart.slice(1), toCase);

    res.writeHead(200, { 'Content-Type': 'application/json' });

    res.end(
      JSON.stringify({
        originalCase: 'ORIGINAL_CASE',
        targetCase: toCase,
        originalText: urlPart.slice(1),
        convertedText: result.convertedText,
      }),
    );
  });

  return server;
}

module.exports = { createServer };
