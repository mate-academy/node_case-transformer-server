/* eslint-disable max-len */
const http = require('http');
const { convertToCase } = require('./convertToCase');

const createServer = () => {
  return http.createServer((req, res) => {
    const url = new URL(`http://${process.env.HOST ?? 'localhost'}${req.url}`);

    const inputText = url.pathname.slice(1); // Переименованная переменная
    const caseType = url.searchParams.get('toCase'); // Переименованная переменная

    const errors = [];

    if (!inputText) {
      errors.push({
        message:
          'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!caseType) {
      errors.push({
        message:
          '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    } else if (
      !['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'].includes(caseType)
    ) {
      errors.push({
        message: `This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.`,
      });
    }

    if (errors.length > 0) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ errors }));

      return;
    }

    const { originalCase, convertedText } = convertToCase(
      inputText, // Используем переименованную переменную
      caseType, // Используем переименованную переменную
    );

    const responseBody = {
      originalCase: originalCase,
      targetCase: caseType, // Здесь тоже переименованная переменная
      originalText: inputText, // Здесь тоже переименованная переменная
      convertedText: convertedText,
    };

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(responseBody));
  });
};

module.exports = {
  createServer,
};
