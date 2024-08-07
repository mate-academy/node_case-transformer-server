/* eslint-disable max-len */
const { findErrors } = require('./findErrors');
const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');

function createServer() {
  const server = http.createServer((req, res) => {
    const myUrl = new URL(req.url, `http://${req.headers.host}`); // створюємо url-ку
    const { pathname } = myUrl; // виймаємо лише потрібні дані

    const textToConvert = pathname.substr(1); // текст, що потрібно змінити
    const caseName = myUrl.searchParams.get('toCase'); // дія для зміни тексту

    const errors = findErrors(textToConvert, caseName);

    if (errors.length > 0) {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ errors }));

      return;
    }

    const { originalCase, convertedText } = convertToCase(
      // застосування функції обробки даних
      textToConvert,
      caseName,
    );

    const responseBody = {
      originalCase: originalCase,
      targetCase: caseName,
      originalText: textToConvert,
      convertedText,
    };

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(responseBody)); // вивід на екран значення
    res.end();
  });

  return server;
}

// createServer().listen(8080);

module.exports = {
  createServer,
};
