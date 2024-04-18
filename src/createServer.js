const http = require('http');
const { convertToCase } = require('./convertToCase/convertToCase');
const { validateCase } = require('./validateRequest');

const createServer = () => {
  return http.createServer((req, res) => {
    res.setHeader('Content-type', 'application/json');

    const url = new URL(req.url, `http://${req.headers.server}`);

    const originalText = url.pathname.slice(1).split('?')[0];
    const targetCase = url.searchParams.get('toCase');

    const errors = validateCase(originalText, targetCase);

    if (errors.length) {
      req.statusCode = 400;
      req.statusMessage = 'Bad request';

      return res.end(JSON.stringify(errors));
    } else {
      req.statusCode = 200;
      req.statusMessage = 'OK';

      const { originalCase, convertedText } = convertToCase(
        originalText,
        targetCase,
      );

      res.end(
        JSON.stringify({
          originalCase,
          targetCase,
          originalText,
          convertedText,
        }),
      );
    }
  });
};

module.exports = {
  createServer,
};
