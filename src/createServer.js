const http = require('http');
const { withValidation } = require('./withValidation');
const { convertToCase } = require('./convertToCase/convertToCase');

const createServer = () =>
  http.createServer(
    withValidation(({ text, toCase, errors }, res) => {
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 200;

      if (!text.includes('.ico') && !errors.length) {
        const { originalCase, convertedText } = convertToCase(text, toCase);

        const payload = {
          originalCase,
          originalText: text,
          targetCase: toCase,
          convertedText,
        };

        res.write(JSON.stringify(payload));
      } else {
        res.statusCode = 400;
        res.write(JSON.stringify({ errors }));
      }

      res.end();
    }),
  );

module.exports = {
  createServer,
};
