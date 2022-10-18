const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');

const createServer = () => http.createServer((req, res) => {
  const [convertText, queryString] = req.url.split('?');
  const originalText = convertText.slice(1);
  const params = new URLSearchParams(queryString);
  const targetCase = params.get('toCase');

  const errors = [];
  const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

  if (!originalText) {
    errors.push({message : `Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`});
  }

  if (!targetCase) {
    errors.push({message : `"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`});
  } else if (!cases.includes(targetCase)) {
    errors.push({message : `This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.`});
  }

  res.setHeader('Content-Type', 'application/json');

  if (errors.length) {
    res.statusCode = 404;
    res.statusText = 'Bad request';

    res.end(JSON.stringify({ errors }));

    return;
  }

  const {
    originalCase,
    convertedText,
  } = convertToCase(originalText, targetCase);

  res.statusCode = 200;

  res.end(JSON.stringify({
    originalCase,
    targetCase,
    originalText,
    convertedText,
  }));
});

module.exports = { createServer };
