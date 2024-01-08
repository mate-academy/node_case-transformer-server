/* eslint-disable no-console */
const http = require('http');
const { convertToCase } = require('./convertToCase/index');
const { validateQueries } = require('./validateQueries');

const createServer = (PORT = process.env.PORT || 8080) => {
  const server = http.createServer((req, res) => {
    const normalizedUrl = new URL(req.url, `http://localhost:${PORT}`);
    const textToConvert = normalizedUrl.pathname.slice(1);
    const caseType = normalizedUrl.searchParams.get('toCase');
    const errors = validateQueries(textToConvert, caseType);

    res.setHeader('Content-type', 'application/json');

    if (errors) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';
      res.end(JSON.stringify(errors));
    }

    if (!errors) {
      const convertedMessage = convertToCase(textToConvert, caseType);

      res.statusCode = 200;
      res.statusMessage = 'OK';

      res.end(JSON.stringify({
        originalCase: convertedMessage.originalCase,
        targetCase: caseType,
        originalText: textToConvert,
        convertedText: convertedMessage.convertedText,
      }));
    }
  });

  server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

module.exports = { createServer };
