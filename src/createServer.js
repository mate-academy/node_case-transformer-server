const http = require('http');
const url = require('url');
const { convertToCase } = require('./convertToCase');

function createServer() {
  const server = http.createServer((req, res) => {
    // Parsowanie URL
    const parsedUrl = new url.URL(req.url, true);
    const { pathname, query } = parsedUrl;

    if (!pathname || !query.toCase) {
      // Obsługa błędów walidacji
      res.writeHead(400, { 'Content-Type': 'application/json' });

      res.end(
        JSON.stringify({
          errors: [
            {
              message:
                !pathname
                  ? 'Text to convert is required. Correct request is:'
                  + ' "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>."'
                  : '"toCase" query param is required. Correct request is: '
                  + '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>."',
            },
          ],
        }),
      );

      return;
    }

    const textToConvert = pathname.substr(1);
    const toCase = query.toCase.toUpperCase();

    // Walidacja dla obsługiwanych przypadków
    const supportedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

    if (!supportedCases.includes(toCase)) {
      res.writeHead(400, { 'Content-Type': 'application/json' });

      res.end(
        JSON.stringify({
          errors: [
            {
              message:
                'This case is not supported. Available cases: SNAKE, '
                + 'KEBAB, CAMEL, PASCAL, UPPER.',
            },
          ],
        }),
      );

      return;
    }

    // Wywołanie logiki biznesowej (funkcja convertToCase)
    const result = convertToCase(textToConvert, toCase);

    // Odpowiedź do klienta
    res.writeHead(200, { 'Content-Type': 'application/json' });

    res.end(
      JSON.stringify({
        originalCase: result.originalCase,
        targetCase: toCase,
        originalText: textToConvert,
        convertedText: result.convertedText,
      }),
    );
  });

  return server;
}

module.exports = {
  createServer,
};
