const http = require('http');

const { convertToCase } = require('./convertToCase/convertToCase');
const { validator } = require('./validator');

const createServer = () => {
  return http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');

    const normalizer = new URL(`http://${req.headers.host}${req.url}`);
    const pathname = normalizer.pathname.slice(1);
    const toCase = normalizer.searchParams.get('toCase');

    const getErrorMassages = validator(pathname, toCase);

    if (getErrorMassages.errors.length) {
      res.end(JSON.stringify(getErrorMassages));
    } else {
      const getConvertObj = convertToCase(pathname, toCase);

      const endR = {
        originalCase: getConvertObj.originalCase,
        targetCase: toCase,
        convertedText: getConvertObj.convertedText,
        originalText: pathname,
      };

      res.end(JSON.stringify(endR));
    }
  });
};

module.exports = { createServer };
