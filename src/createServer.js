const http = require('http');
const { convertToCase } = require('./convertToCase');
const { serverErrors } = require('./serverErrors');

function createServer() {
  const server = http.createServer((req, res) => {
    const caseNames = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

    const [originalText, searchString] = req.url.slice(1).split('?');
    const searchParams = new URLSearchParams(searchString);
    const targetCase = searchParams.get('toCase');
    const errors = [];

    res.setHeader('content-type', 'application/json');

    if (!originalText) {
      errors.push({ message: serverErrors.noText });
    }

    if (!targetCase) {
      errors.push({ message: serverErrors.noTargetCase });
    }

    if (targetCase && !caseNames.includes(targetCase)) {
      errors.push({ message: serverErrors.invalidTargetCase });
    }

    if (errors.length > 0) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.end(JSON.stringify({ errors }));

      return;
    }

    const {
      originalCase,
      convertedText,
    } = convertToCase(originalText, targetCase);

    const result = {
      originalCase,
      targetCase,
      originalText,
      convertedText,
    };

    res.statusCode = 200;
    res.statusMessage = 'OK';
    res.end(JSON.stringify(result));
  });

  return server;
}

module.exports = { createServer };
