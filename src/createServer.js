/* eslint-disable max-len */
const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');

function createServer() {
  const server = http.createServer((req, res) => {
    const parsedUrl = new URL(req.url, `http://${req.headers.host}`);

    const textToConvert = parsedUrl.pathname.slice(1);
    const toCase = parsedUrl.searchParams.get('toCase');

    const errors = [];

    // Білий список підтримуваних регістрів
    const allowedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

    // 1. Перевірка наявності тексту
    if (!textToConvert) {
      errors.push({
        message:
          'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    // 2. Перевірка параметра toCase та його валідності
    if (!toCase) {
      errors.push({
        message:
          '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    } else if (!allowedCases.includes(toCase)) {
      errors.push({
        message:
          'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    // 3. Якщо є хоча б одна помилка — повертаємо 400 і обриваємо виконання
    if (errors.length > 0) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ errors }));

      return;
    }

    // 4. Викликаємо бізнес-логіку ТІЛЬКИ якщо валідація пройдена успішно (try/catch більше не потрібен)
    const result = convertToCase(textToConvert, toCase);

    res.writeHead(200, { 'Content-Type': 'application/json' });

    // 5. Віддаємо плоский об'єкт
    res.end(
      JSON.stringify({
        originalCase: result.originalCase,
        targetCase: toCase,
        convertedText: result.convertedText,
        originalText: textToConvert,
      }),
    );
  });

  return server;
}

module.exports = {
  createServer,
};
