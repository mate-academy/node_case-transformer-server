const http = require('http');
const { isValidCase } = require('./utils/checkCase');
const { convertToCase } = require('./convertToCase');
const { ERROR_LIST } = require('./utils/errorList');

const createServer = () => {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const errors = [];

    const [originalText, queryList] = req.url.split('?').map((item, ind) => {
      return ind === 0 ? item.slice(1) : item;
    });
    const targetCase = new URLSearchParams(queryList).get('toCase');

    if (!originalText) {
      errors.push({
        message: ERROR_LIST.textRequired,
      });
    }

    if (!targetCase) {
      errors.push({
        message: ERROR_LIST.caseRequired,
      });
    } else if (!isValidCase(targetCase)) {
      errors.push({
        message: ERROR_LIST.caseInvalid,
      });
    }

    if (errors.length) {
      res.statusCode = 400;
      res.end(JSON.stringify({ errors }));

      return;
    }

    const { originalCase, convertedText } = convertToCase(
      originalText,
      targetCase,
    );

    res.statusCode = 200;

    res.end(
      JSON.stringify({
        originalCase,
        targetCase,
        convertedText,
        originalText,
      }),
    );
  });

  return server;
};

module.exports = {
  createServer,
};
