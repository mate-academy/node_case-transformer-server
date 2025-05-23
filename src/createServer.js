/* eslint-disable max-len */
const http = require('http');
const url = require('url');
const { convertToCase } = require('./convertToCase');

// Список підтриманих кейсів
const supportedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

/**
 * Creates and returns an HTTP server for case transformation.
 * @returns {http.Server} The configured HTTP server.
 */
function createServer() {
  const server = http.createServer((req, res) => {
    // Встановлюємо заголовок Content-Type для JSON
    res.setHeader('Content-Type', 'application/json');

    // Парсимо URL
    // eslint-disable-next-line node/no-deprecated-api
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const query = parsedUrl.query;

    // Отримуємо текст для конвертації (з частини шляху після '/')
    const textToConvert =
      pathname && pathname.length > 1 ? pathname.slice(1) : '';

    // Валідація
    const errors = [];

    if (!textToConvert) {
      errors.push({
        message:
          'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!query.toCase) {
      errors.push({
        message:
          '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    } else if (!supportedCases.includes(query.toCase)) {
      errors.push({
        message: `This case is not supported. Available cases: ${supportedCases.join(', ')}.`,
      });
    }

    // Якщо є помилки, повертаємо 400
    if (errors.length > 0) {
      res.writeHead(400, 'Bad Request');
      res.end(JSON.stringify({ errors }));

      return;
    }

    // Виклик бізнес-логіки
    const { originalCase, convertedText } = convertToCase(
      textToConvert,
      query.toCase,
    );

    // Формуємо відповідь
    const response = {
      originalCase,
      targetCase: query.toCase,
      originalText: textToConvert,
      convertedText,
    };

    // Повертаємо 200 OK з відповіддю
    res.writeHead(200, 'OK');
    res.end(JSON.stringify(response));
  });

  return server;
}

module.exports = { createServer };
