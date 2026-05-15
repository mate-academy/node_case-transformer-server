// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here

const http = require('http');
const {convertToCase} = require('./convertToCase/convertToCase');

const cases = [
  'SNAKE',
  'KEBAB',
  'CAMEL',
  'PASCAL',
  'UPPER',
];

const createServer = () => {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const normalizedUrl = new URL(req.url,  `http://${req.headers.host}`);
    const word = normalizedUrl.pathname.slice(1);
    const toCase = normalizedUrl.searchParams.get('toCase');

    if (!word || !toCase || !cases.includes(toCase)) {
      res.statusCode = 400;

      const errors = [];

      if (!word) {
        errors.push({
          message: `Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
        });
      }
      
      if (!toCase) {
        errors.push({
          message: `"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
        });
      }
      
      if (toCase && !cases.includes(toCase)) {
        errors.push({
          message: `This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.`,
        });
      }

      res.end(JSON.stringify({
        "errors": errors,
      }));
    } else {
      const result = convertToCase(word, toCase);

      res.statusCode = 200;

      res.end(JSON.stringify({
        "originalCase": result.originalCase,
        "targetCase": toCase,
        "originalText": word,
        "convertedText": result.convertedText,
      }));
    }    
  });

  return server;
};

module.exports = {
  createServer,
};
