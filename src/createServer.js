const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase.js');

const SUPPORTED_CASES = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

const createServer = () => {
  const server = http.createServer((req, res) => {
    const url = new URL(req.url, 'http://localhost:5700');
    const textToConvert = url.pathname.slice(1); // видаляємо початковий "/"
    const targetCase = url.searchParams.get('toCase');

    const errors = [];

    // Валідація параметрів
    if (!textToConvert) {
      errors.push({
        message:
          // eslint-disable-next-line max-len
          'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!targetCase) {
      errors.push({
        message:
          // eslint-disable-next-line max-len
          '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    } else if (!SUPPORTED_CASES.includes(targetCase)) {
      errors.push({
        message: `This case is not supported. Available cases: ${SUPPORTED_CASES.join(', ')}.`,
      });
    }

    // Якщо є помилки, відповідаємо з кодом 400
    if (errors.length > 0) {
      res.writeHead(400, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({ errors }));

      return;
    }

    // Якщо немає помилок, викликаємо бізнес-логіку
    try {
      const { originalCase, convertedText } = convertToCase(
        textToConvert,
        targetCase,
      );

      const responsePayload = {
        originalCase,
        targetCase,
        originalText: textToConvert,
        convertedText,
      };

      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify(responsePayload));
    } catch (err) {
      // Якщо виникає помилка у функції бізнес-логіки
      res.writeHead(500, {
        'Content-Type': 'application/json',
      });

      res.end(
        JSON.stringify({ errors: [{ message: 'Internal Server Error' }] }),
      );
    }
  });

  return server;
};

module.exports = {
  createServer,
};
