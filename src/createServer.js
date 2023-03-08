const http = require('http');
const { convertToCase } = require('./convertToCase');
const { getDataFromUrl } = require('./utils/getDataFromUrl');
const { setErrorMessage } = require('./utils/setErrorMessage');

const createServer = () => {
  return http.createServer((req, res) => {
    res.setHeader('Content-type', 'application/json');
    res.statusCode = 200;

    const [originalText, targetCase] = getDataFromUrl(req.url);
    const errors = setErrorMessage(originalText, targetCase);

    if (errors.length) {
      res.statusCode = 400;
      res.end(JSON.stringify({ errors }));
    } else {
      const { originalCase, convertedText }
    = convertToCase(originalText, targetCase);

      res.end(
        JSON.stringify(
          {
            originalCase,
            targetCase,
            originalText,
            convertedText,
          },
        ),
      );
    }
  });
};

module.exports = { createServer };
