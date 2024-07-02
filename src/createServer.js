const http = require('http');
const { convertToCase } = require('./convertToCase');

function createServer() {
  const server = http.createServer((req, res) => {
    const [pathName, queryString] = req.url.split('?');
    const params = new URLSearchParams(queryString);
    const toCase = params.get('toCase');
    const textToConvert = pathName.slice(1);

    const errors = [];

    if (!textToConvert) {
      errors.push({
        // eslint-disable-next-line
        message: `Text to convert is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".`,
      });
    }

    if (!toCase) {
      errors.push({
        message:
          // eslint-disable-next-line
          '"toCase" query param is required. Correct request is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
      });
    }

    const supportedCases = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

    if (toCase && !supportedCases.includes(toCase.toUpperCase())) {
      errors.push({
        // eslint-disable-next-line
        message: `This case is not supported. Available cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.`,
      });
    }

    if (errors.length > 0) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ errors }));

      return;
    }

    try {
      const result = convertToCase(textToConvert, toCase.toUpperCase());

      const responseJson = {
        originalCase: result.originalCase,
        targetCase: toCase.toUpperCase(),
        originalText: textToConvert,
        convertedText: result.convertedText,
      };

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(responseJson));
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' });

      res.end(
        JSON.stringify({
          errors: [
            {
              message: `Internal Server Error: ${error.message}`,
            },
          ],
        }),
      );
    }
  });

  return server;
}

module.exports = { createServer };
