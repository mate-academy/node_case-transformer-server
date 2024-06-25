const { convertToCase } = require('./convertToCase');
const http = require('http');

const createServer = () => {
  return http.createServer(async (req, res) => {
    try {
      const url = new URL(req.url, `http://${req.headers.host}`);
      const wordToCase = decodeURIComponent(url.pathname.slice(1));
      const toCase = url.searchParams.get('toCase');
      const error =
        'Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".';
      const cases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];
      const casesError = `Available cases: ${cases.join(', ')}.`;

      const errors = [];

      if (!wordToCase) {
        errors.push({
          message: `Text to convert is required. ${error}`,
        });
      }

      if (!toCase) {
        errors.push({
          message: `"toCase" query param is required. ${error}`,
        });
      }

      if (toCase && !cases.includes(toCase)) {
        errors.push({
          message: `This case is not supported. ${casesError}`,
        });
      }

      if (errors.length > 0) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ errors }));

        return;
      }

      const { originalCase, convertedText } = convertToCase(wordToCase, toCase);

      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');

      res.end(
        JSON.stringify({
          originalCase,
          targetCase: toCase,
          convertedText,
          originalText: wordToCase,
        }),
      );
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' });

      res.end(
        JSON.stringify({ errors: [{ message: 'Internal server error' }] }),
      );
    }
  });
};

module.exports = { createServer };
