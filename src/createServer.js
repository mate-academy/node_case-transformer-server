const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');

function createServer() {
  const server = http.createServer((req, res) => {
    const [pathname, queryString] = req.url.split('?');
    const params = new URLSearchParams(queryString);
    const targetCase = params.get('toCase');
    const textToConvert = pathname.slice(1);

    const errors = [];

    if (!textToConvert) {
      errors.push({ message: `Text to convert is required. Correct request is: \"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>\".` });
    }

    if (!targetCase) {
      errors.push({ message: '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".' });
    }

    if (targetCase && !['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'].includes(targetCase)) {
      errors.push({ message: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.' });
    }

    if (errors.length > 0) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ errors }));
      return;
    }

    const result = convertToCase(textToConvert, targetCase);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      originalCase: result.originalCase,
      targetCase: targetCase,
      originalText: textToConvert,
      convertedText: result.convertedText
    }));
  });

  return server;
}

module.exports = {
  createServer
};
