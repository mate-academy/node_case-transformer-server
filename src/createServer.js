const { createServer: httpCreateServer } = require('node:http');
const { convertToCase } = require('./convertToCase');

// en Arrow Function (pile-funktion), () er argumenter, ingen her, { body }
const createServer = () => {
  return httpCreateServer((req, res) => {
    // 1. Split URL og Query, url=/word?toCase=SNAKE  , web-adr ikke med i url
    const [path, query] = req.url.split('?');
    const text = path.slice(1); // Fjerner "/"  -> word
    const params = new URLSearchParams(query);
    const targetCase = params.get('toCase');

    // 2. Validering (som krævet af testen)
    const errors = [];

    if (!text) {
      errors.push({
        message:
          'Text to convert is required. Correct request is: ' +
          '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!targetCase) {
      errors.push({
        message:
          '"toCase" query param is required. Correct request is: ' +
          '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    } else if (
      !['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'].includes(targetCase)
    ) {
      errors.push({
        message:
          'This case is not supported. Available cases: ' +
          'SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    res.setHeader('Content-Type', 'application/json');

    if (errors.length > 0) {
      res.statusCode = 400;

      return res.end(JSON.stringify({ errors }));
    }

    // convertToCase(text, toCase);  ->{ originalCase, convertedText };
    const { originalCase, convertedText } = convertToCase(text, targetCase);
    // ændres nemlig ikke senere

    // Send svar
    const response = {
      originalCase,
      targetCase,
      convertedText,
      originalText: text,
    };

    res.end(JSON.stringify(response));
  });
};

// EKSPORTÉR ALT HER,
module.exports = {
  createServer,
};
