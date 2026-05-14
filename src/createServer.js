/* eslint-disable max-len */
const http = require('node:http');
const { convertToCase } = require('./convertToCase');

const SUPPORTED_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function createServer() {
  return http.createServer((req, res) => {
    // Serwer zawsze powinien odpowiadać w formacie JSON
    res.setHeader('Content-Type', 'application/json');

    // Parsowanie URL i parametrów zapytania (query)
    const [pathPart, queryPart] = req.url.split('?');
    const textToConvert = pathPart.slice(1); // Usuwamy początkowy ukośnik (/)
    const params = new URLSearchParams(queryPart || '');
    const toCase = params.get('toCase');

    const errors = [];

    // Walidacja: brak tekstu
    if (!textToConvert) {
      errors.push({
        message:
          'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    // Walidacja: brak parametru toCase lub nieobsługiwany format
    if (!toCase) {
      errors.push({
        message:
          '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    } else if (!SUPPORTED_CASES.includes(toCase)) {
      errors.push({
        message:
          'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    // Zwracanie błędów, jeśli jakiekolwiek wystąpiły (kod 400)
    if (errors.length > 0) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.end(JSON.stringify({ errors }));

      return;
    }

    // Sukces - wykonanie logiki biznesowej i zwrócenie wyniku (kod 200)
    try {
      const { originalCase, convertedText } = convertToCase(
        textToConvert,
        toCase,
      );

      const responseData = {
        originalCase,
        targetCase: toCase,
        originalText: textToConvert,
        convertedText,
      };

      res.statusCode = 200;
      res.statusMessage = 'OK';
      res.end(JSON.stringify(responseData));
    } catch (error) {
      // Obsługa niespodziewanych błędów po stronie serwera
      res.statusCode = 500;
      res.end(JSON.stringify({ errors: [{ message: error.message }] }));
    }
  });
}

module.exports = {
  createServer,
};
