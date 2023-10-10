const http = require('http');
const { convertToCase } = require('./convertToCase');

function createServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const erorr = {};
    erorr.errors = [];

    const [originalText, query] = req.url.slice(1).split('?');
    const params = new URLSearchParams(query);
    const targetCase = params.get('toCase');

    if (!originalText) {
      erorr.errors.push({
        message: `Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`
      });
    }


    if (!targetCase) {
      erorr.errors.push({
        message: `"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`
      });
    }

    if (targetCase) {
      try {
        convertToCase(originalText, targetCase);
      } catch (err) {
        erorr.errors.push({
          message: 'This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.'
        });
      }
    }

    if (erorr.errors.length > 0) {
      res.end(JSON.stringify(erorr));
    } else {
      const { originalCase, convertedText } = convertToCase(originalText, targetCase);
      const response = {
        originalCase,
        targetCase,
        originalText,
        convertedText,
      };

      res.end(JSON.stringify(response));
    }
  });

  return server;
}

module.exports = {
  createServer,
};
