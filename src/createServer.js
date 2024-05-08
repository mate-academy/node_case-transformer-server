const http = require('http');
const { convertToCase } = require('./convertToCase');

const PORT = process.env.PORT;
const createServer = () => {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const urlParts = req.url.split('?');

    if (urlParts.length !== 2) {
      res.statusCode = 400;

      return res.end(
        JSON.stringify({ errors: [{ message: 'Invalid request format.' }] }),
      );
    }

    const [textToConvert, queryString] = urlParts;
    const params = new URLSearchParams(queryString);
    const toCase = params.get('toCase');

    if (!textToConvert) {
      res.statusCode = 400;

      return res.end(
        JSON.stringify({
          errors: [{ message: 'Text to convert is required.' }],
        }),
      );
    }

    if (!toCase) {
      res.statusCode = 400;

      return res.end(
        JSON.stringify({
          errors: [{ message: '"toCase" query param is required.' }],
        }),
      );
    }

    const supportedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

    if (!supportedCases.includes(toCase.toUpperCase())) {
      res.statusCode = 400;

      return res.end(
        JSON.stringify({
          errors: [{ message: 'This case is not supported.' }],
        }),
      );
    }

    const { originalCase, convertedText } = convertToCase(
      textToConvert,
      toCase.toUpperCase(),
    );

    res.statusCode = 200;

    res.end(
      JSON.stringify({
        originalCase,
        targetCase: toCase.toUpperCase(),
        originalText: textToConvert,
        convertedText,
      }),
    );
  });

  server.listen(PORT, () => {});
};

module.exports = { createServer };
