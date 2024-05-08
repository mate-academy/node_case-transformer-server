const http = require('http');
const { convertToCase } = require('./convertToCase');
const { validator } = require('./validator');

const createServer = () => {
  const PORT = 5700;

  const server = http.createServer((req, res) => {
    const { pathname, searchParams } = new URL(
      `http://localhost:${PORT}${req.url}`,
    );

    const text = pathname.substring(1);
    const toCase = searchParams.get('toCase');

    const validationErrors = validator(text, toCase);

    if (validationErrors) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ errors: validationErrors.errors }));

      return;
    }

    let converted;

    try {
      converted = convertToCase(text, toCase);
    } catch (error) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ errors: error.message }));

      return;
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });

    res.end(
      JSON.stringify({
        originalCase: converted.originalCase,
        targetCase: toCase.toUpperCase(),
        convertedText: converted.convertedText,
        originalText: text,
      }),
    );
  });

  return server;
};

module.exports = {
  createServer,
};
