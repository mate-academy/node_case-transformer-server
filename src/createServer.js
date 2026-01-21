const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { validateInput } = require('./inputValidator');

const createServer = () => {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
    const query = parsedUrl.searchParams.get('toCase') || '';
    const word = parsedUrl.pathname.slice(1);

    const errors = validateInput(word, query);

    if (errors.length > 0) {
      res.statusCode = 400;
      res.end(JSON.stringify({ errors }));

      return;
    }

    try {
      const convertedWord = convertToCase(word, query);
      const result = {
        originalText: word,
        targetCase: query.toUpperCase(),
        originalCase: convertedWord.originalCase,
        convertedText: convertedWord.convertedText,
      };

      res.statusCode = 200;
      res.statusMessage = 'OK';
      res.end(JSON.stringify(result));
    } catch (error) {
      res.statusCode = 400;
      res.end(JSON.stringify({ errors: [{ message: error.message }] }));
    }
  });

  return server;
};

module.exports = { createServer };
