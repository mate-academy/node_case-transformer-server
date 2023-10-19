const http = require('http');
const { convertToCase } = require('./convertToCase');

function createServer() {
  const server = http.createServer((req, res) => {
    // Parsowanie URL i parametrów
    const urlParts = req.url.split('?');

    if (urlParts.length !== 2) {
      // Błąd: Brak parametrów
      res.writeHead(400, { 'Content-Type': 'application/json' });

      res.end(JSON.stringify({ errors: [{ message:
         'Brak parametrów w URL.' }] }));

      return;
    }

    const [textToConvert, queryString] = urlParts;
    const params = new URLSearchParams(queryString);
    const toCase = params.get('toCase');

    // Sprawdzanie poprawności parametrów
    if (!textToConvert || !toCase) {
      // Błąd: Brak textToConvert lub toCase
      res.writeHead(400, { 'Content-Type': 'application/json' });

      res.end(JSON.stringify({ errors: [{ message:
        'Brak textToConvert lub toCase.' }] }));

      return;
    }

    // Obsługa nieobsługiwanych przypadków
    const supportedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

    if (!supportedCases.includes(toCase)) {
      // Błąd: toCase nie jest obsługiwane
      res.writeHead(400, { 'Content-Type': 'application/json' });

      res.end(JSON.stringify({ errors: [{ message:
        'Ten przypadek nie jest obsługiwany.' }] }));

      return;
    }

    // Wywołanie logiki biznesowej
    const result = convertToCase(toCase, textToConvert);

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
