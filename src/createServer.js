const http = require('node:http');
const { convertToCase } = require('./convertToCase/convertToCase.js');

const supportedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function createServer() {
  return http.createServer((req, res) => {
    const errors = [];
    const reqUrl = new URL(req.url, `http://${req.headers.host}`);

    const text = reqUrl.pathname.slice(1);
    const toCase = reqUrl.searchParams.get('toCase');

    if (!text.trim()) {
      errors.push({
        message:
          // eslint-disable-next-line max-len, prettier/prettier
          'Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    if (!toCase) {
      errors.push({
        message:
          // eslint-disable-next-line max-len, prettier/prettier
          '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    } else if (!supportedCases.includes(toCase)) {
      errors.push({
        message: `This case is not supported. Available cases: ${supportedCases.join(', ')}.`,
      });
    }

    if (errors.length === 0) {
      try {
        const { convertedText, originalCase } = convertToCase(text, toCase);

        const result = {
          originalCase: originalCase, // тут буде значення
          targetCase: toCase,
          originalText: text,
          convertedText: convertedText, // тут буде значення
        };

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(result));
      } catch (error) {
        errors.push({ message: error.message });
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ errors }));
      }
    } else {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ errors }));
    }
  });
}

// Експортуємо функцію, щоб тести могли її використати
module.exports = { createServer };

// Якщо файл виконується напряму, запускаємо сервер
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  const server = createServer();

  server.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server running at port: ${PORT}`);
  });
}
