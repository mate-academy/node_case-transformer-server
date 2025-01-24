const http = require('http');
const { convertToCase } = require('../src/convertToCase/convertToCase');

function createServer() {
  return http.createServer((req, res) => {
    const urlParth = new URL(req.url, `http://${req.headers.host}`);

    const text = urlParth.pathname.slice(1);
    const toCase = urlParth.searchParams.get('toCase');

    const errors = [];

    // Перевірка: чи був переданий текст
    if (!text) {
      errors.push({
        message:
          'Text to convert is required. Correct request is:' +
          ' "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    // Перевірка: чи був переданий параметр `toCase`
    if (!toCase) {
      errors.push({
        message:
          '"toCase" query param is required. Correct request is: ' +
          '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    const supportedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

    // Перевірка: чи `toCase` входить до підтримуваних форматів
    if (toCase && !supportedCases.includes(toCase)) {
      errors.push({
        message:
          'This case is not supported. Available cases:' +
          ' SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    // Якщо були знайдені помилки, повертаємо їх клієнту
    if (errors.length > 0) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ errors }));

      return;
    }

    const result = convertToCase(text, toCase);

    // res.write(`<h1>${toCase}</h1>`);
    // res.write(`<h1>${text}</h1>`);
    // res.write(`<h1>${result}</h1>`);
    // res.end()
    res.writeHead(200, { 'Content-Type': 'application/json' });

    res.end(
      JSON.stringify({
        originalCase: result.originalCase,
        targetCase: toCase,
        originalText: text,
        convertedText: result.convertedText,
      }),
    );
  });
}

module.exports = { createServer };
