/* eslint-disable max-len */
/* eslint-disable no-console */
'use strict';

const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');

const createServer = () => {
  const server = http.createServer((req, res) => {
    // 1. Завжди відповідаємо JSON
    res.setHeader('Content-Type', 'application/json');

    // 2. Розбираємо URL (наприклад: /hello-world?toCase=SNAKE)
    const [pathWithText, queryString] = req.url.split('?');
    const textToConvert = pathWithText.slice(1); // Прибираємо "/" на початку
    const params = new URLSearchParams(queryString);
    const toCase = params.get('toCase');

    // 3. Валідація
    const errors = [];
    const supportedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

    if (!textToConvert) {
      errors.push({
        message:
          'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!toCase) {
      errors.push({
        message:
          '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    } else if (!supportedCases.includes(toCase)) {
      errors.push({
        message:
          'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
      });
    }

    // 4. Перевірка на помилки валідації
    if (errors.length > 0) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.end(JSON.stringify({ errors }));

      return;
    }

    // 5. Виклик бізнес-логіки з захистом
    try {
      // УВАГА: Перевір порядок аргументів!
      // За умовою завдання: convertToCase(targetCase, textToConvert)
      const result = convertToCase(textToConvert, toCase);

      const responseBody = {
        originalCase: result.originalCase,
        targetCase: toCase,
        originalText: textToConvert,
        convertedText: result.convertedText,
      };

      res.statusCode = 200;
      res.statusMessage = 'OK';
      res.end(JSON.stringify(responseBody));
    } catch (err) {
      // Якщо бізнес-логіка впала, ми не даємо впасти всьому серверу
      console.error('Business logic error:', err.message);

      res.statusCode = 500; // Internal Server Error

      res.end(
        JSON.stringify({
          errors: [{ message: 'Internal server error occurred.' }],
        }),
      );
    }
  });

  return server;
};

// Експортуємо об'єкт із функцією
module.exports = { createServer };
