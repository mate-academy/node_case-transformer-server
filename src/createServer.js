const http = require('http');
const { convertToCase } = require('./convertToCase');
const { validateText, validateToCase } = require('./validateData');

function createServer() {
  const server = http.createServer((req, res) => {
    const normUrl = new URL(req.url, 'http://localhost:5700');
    const text = normUrl.pathname.slice(1);
    const toCase = normUrl.searchParams.get('toCase');
    const errorsArray = [];

    const textError = validateText(text);
    const toCaseError = validateToCase(toCase);

    if (textError) {
      errorsArray.push(textError);
    }

    if (toCaseError) {
      errorsArray.push(toCaseError);
    }

    if (errorsArray.length) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ errors: errorsArray }));

      return;
    }

    const result = convertToCase(text, toCase);
    const response = {
      originalCase: result.originalCase,
      targetCase: toCase,
      originalText: text,
      convertedText: result.convertedText,
    };

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(response));
  });

  return server;
}

module.exports = { createServer };
